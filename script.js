/* ============================================================
   NetCalc Pro — script.js
   Kompletna implementacja kalkulatora podsieci IPv4 / IPv6
   RFC 950, RFC 1918, RFC 4291, RFC 5952
   ============================================================ */

'use strict';

/* ============================================================
   SEKCJA 1: ANIMOWANE TŁO (binary rain)
   ============================================================ */
(function initBackground() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00D4FF';
    ctx.font = '13px JetBrains Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const text = Math.random() > 0.5 ? '1' : '0';
      ctx.fillText(text, i * 18, drops[i] * 18);
      if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.4;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 80);
})();

/* ============================================================
   SEKCJA 2: NAWIGACJA ZAKŁADKAMI
   ============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
      const show = panel.id === `panel-${target}`;
      panel.classList.toggle('hidden', !show);
      panel.classList.toggle('active', show);
    });
  });
});

/* ============================================================
   SEKCJA 3: POMOCNICZE FUNKCJE IPv4
   ============================================================ */

/**
 * Parsuje wejście użytkownika i zwraca { ip: Uint32, prefix: number }
 * Obsługiwane formaty:
 *   "192.168.1.1/24"
 *   "192.168.1.1 255.255.255.0"
 *   "192.168.1.1"  (zakłada /32)
 */
function parseIPv4Input(raw) {
  raw = raw.trim();

  // Format CIDR: x.x.x.x/n
  const cidrMatch = raw.match(/^(\d+\.\d+\.\d+\.\d+)\s*\/\s*(\d+)$/);
  if (cidrMatch) {
    const ip     = ipv4ToUint32(cidrMatch[1]);
    const prefix = parseInt(cidrMatch[2], 10);
    if (ip === null) throw new Error(`Nieprawidłowy adres IP: ${cidrMatch[1]}`);
    if (prefix < 0 || prefix > 32) throw new Error(`Prefiks musi być w zakresie 0–32 (podano: ${prefix})`);
    return { ip, prefix };
  }

  // Format z maską dziesiętną: x.x.x.x y.y.y.y
  const maskMatch = raw.match(/^(\d+\.\d+\.\d+\.\d+)\s+(\d+\.\d+\.\d+\.\d+)$/);
  if (maskMatch) {
    const ip     = ipv4ToUint32(maskMatch[1]);
    const maskN  = ipv4ToUint32(maskMatch[2]);
    if (ip === null)    throw new Error(`Nieprawidłowy adres IP: ${maskMatch[1]}`);
    if (maskN === null) throw new Error(`Nieprawidłowa maska: ${maskMatch[2]}`);
    const prefix = maskToCidr(maskN);
    if (prefix === null) throw new Error(`Maska ${maskMatch[2]} nie jest ciągłą maską podsieci`);
    return { ip, prefix };
  }

  // Sam adres IP bez maski → /32
  const onlyIP = raw.match(/^(\d+\.\d+\.\d+\.\d+)$/);
  if (onlyIP) {
    const ip = ipv4ToUint32(onlyIP[1]);
    if (ip === null) throw new Error(`Nieprawidłowy adres IP: ${onlyIP[1]}`);
    return { ip, prefix: 32 };
  }

  throw new Error('Nierozpoznany format. Przykłady: 192.168.1.1/24  lub  10.0.0.1 255.255.0.0');
}

/** Konwertuje string "a.b.c.d" na 32-bitową liczbę (unsigned). Zwraca null jeśli błąd. */
function ipv4ToUint32(str) {
  const parts = str.split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(Number);
  if (nums.some(n => isNaN(n) || n < 0 || n > 255 || String(n) !== parts[nums.indexOf(n)])) return null;
  // Sprawdzenie czy każda część to prawidłowa liczba całkowita
  for (let i = 0; i < 4; i++) {
    if (!/^\d+$/.test(parts[i])) return null;
    if (nums[i] < 0 || nums[i] > 255) return null;
  }
  return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0;
}

/** Konwertuje 32-bitową liczbę na string "a.b.c.d" */
function uint32ToIPv4(n) {
  n = n >>> 0;
  return [
    (n >>> 24) & 0xFF,
    (n >>> 16) & 0xFF,
    (n >>>  8) & 0xFF,
    (n       ) & 0xFF,
  ].join('.');
}

/** Konwertuje prefiks CIDR na maskę 32-bitową */
function cidrToMask(prefix) {
  if (prefix === 0) return 0;
  return (0xFFFFFFFF << (32 - prefix)) >>> 0;
}

/** Sprawdza czy maska jest ciągłą maską podsieci i zwraca prefiks, lub null */
function maskToCidr(mask) {
  mask = mask >>> 0;
  // Maska musi mieć same jedynki od MSB, a potem same zera
  let prefix = 0;
  let counting = true;
  for (let i = 31; i >= 0; i--) {
    const bit = (mask >>> i) & 1;
    if (counting) {
      if (bit === 1) prefix++;
      else counting = false;
    } else {
      if (bit === 1) return null; // nieciągła maska
    }
  }
  return prefix;
}

/** Konwertuje 32-bitową liczbę na reprezentację binarną z kropkami */
function uint32ToBinDotted(n) {
  n = n >>> 0;
  const bytes = [
    (n >>> 24) & 0xFF,
    (n >>> 16) & 0xFF,
    (n >>>  8) & 0xFF,
    (n       ) & 0xFF,
  ];
  return bytes.map(b => b.toString(2).padStart(8, '0')).join('.');
}

/** Formatuje dużą liczbę z separatorami tysięcy */
function formatBigNum(n) {
  if (typeof n === 'bigint') return n.toLocaleString('pl-PL');
  return Number(n).toLocaleString('pl-PL');
}

/* ============================================================
   SEKCJA 4: IDENTYFIKACJA ADRESÓW IPv4
   ============================================================ */

/**
 * Zwraca obiekt z opisem klasy, typu, i typu transmisji dla adresu IPv4.
 * Obsługa: RFC 1918 (prywatne), APIPA, Loopback, Multicast, Broadcast, itp.
 */
function classifyIPv4(ip, prefix) {
  const firstOctet  = (ip >>> 24) & 0xFF;
  const secondOctet = (ip >>> 16) & 0xFF;
  const thirdOctet  = (ip >>>  8) & 0xFF;

  // Sprawdzenie zakresu adresów specjalnych i prywatnych

  // 0.0.0.0/8 — "This network" (Source address only)
  if (firstOctet === 0) {
    return { cls: 'A', type: 'Nieokreślony (This network)', txType: 'unicast', isPrivate: false, isSpecial: true };
  }

  // 127.0.0.0/8 — Loopback
  if (firstOctet === 127) {
    return { cls: 'A', type: 'Loopback (127.0.0.0/8)', txType: 'unicast', isPrivate: false, isSpecial: true };
  }

  // 169.254.0.0/16 — APIPA (Automatic Private IP Addressing)
  if (firstOctet === 169 && secondOctet === 254) {
    return { cls: 'B', type: 'APIPA / Link-Local (169.254.0.0/16)', txType: 'unicast', isPrivate: false, isSpecial: true };
  }

  // 224.0.0.0 – 239.255.255.255 — Multicast (Klasa D)
  if (firstOctet >= 224 && firstOctet <= 239) {
    return { cls: 'D', type: 'Multicast (224.0.0.0/4)', txType: 'multicast', isPrivate: false, isSpecial: true };
  }

  // 240.0.0.0 – 255.255.255.254 — Reserved (Klasa E)
  if (firstOctet >= 240 && firstOctet < 255) {
    return { cls: 'E', type: 'Zarezerwowany (Klasa E, 240.0.0.0/4)', txType: 'unicast', isPrivate: false, isSpecial: true };
  }

  // 255.255.255.255 — Limited Broadcast
  if (ip === 0xFFFFFFFF) {
    return { cls: 'E', type: 'Limited Broadcast (255.255.255.255)', txType: 'broadcast', isPrivate: false, isSpecial: true };
  }

  // RFC 1918 — Prywatne zakresy adresów
  // 10.0.0.0/8
  if (firstOctet === 10) {
    return { cls: 'A', type: 'Prywatny (RFC 1918 — 10.0.0.0/8)', txType: 'unicast', isPrivate: true, isSpecial: false };
  }
  // 172.16.0.0 – 172.31.255.255 (/12)
  if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
    return { cls: 'B', type: 'Prywatny (RFC 1918 — 172.16.0.0/12)', txType: 'unicast', isPrivate: true, isSpecial: false };
  }
  // 192.168.0.0/16
  if (firstOctet === 192 && secondOctet === 168) {
    return { cls: 'C', type: 'Prywatny (RFC 1918 — 192.168.0.0/16)', txType: 'unicast', isPrivate: true, isSpecial: false };
  }

  // 100.64.0.0/10 — Shared Address Space (CGN, RFC 6598)
  if (firstOctet === 100 && (secondOctet >= 64 && secondOctet <= 127)) {
    return { cls: 'A', type: 'Shared Address Space (CGN, RFC 6598 — 100.64.0.0/10)', txType: 'unicast', isPrivate: false, isSpecial: true };
  }

  // Klasy publiczne A/B/C
  if (firstOctet >= 1   && firstOctet <= 126)  return { cls: 'A', type: 'Publiczny — Klasa A (1–126.x.x.x)',   txType: 'unicast', isPrivate: false, isSpecial: false };
  if (firstOctet >= 128 && firstOctet <= 191)  return { cls: 'B', type: 'Publiczny — Klasa B (128–191.x.x.x)', txType: 'unicast', isPrivate: false, isSpecial: false };
  if (firstOctet >= 192 && firstOctet <= 223)  return { cls: 'C', type: 'Publiczny — Klasa C (192–223.x.x.x)', txType: 'unicast', isPrivate: false, isSpecial: false };

  return { cls: '?', type: 'Nieznany', txType: 'unicast', isPrivate: false, isSpecial: false };
}

/** Identyfikuje typ transmisji dla danego adresu docelowego */
function getTxTypeLabel(txType) {
  const map = {
    unicast:   { label: 'Unicast',   tagClass: 'tag-unicast',   desc: 'Komunikacja jeden-do-jednego' },
    multicast: { label: 'Multicast', tagClass: 'tag-multicast', desc: 'Komunikacja jeden-do-wielu (wybranych odbiorców)' },
    broadcast: { label: 'Broadcast', tagClass: 'tag-broadcast', desc: 'Komunikacja jeden-do-wszystkich w podsieci' },
  };
  return map[txType] || map.unicast;
}

/* ============================================================
   SEKCJA 5: KALKULATOR IPv4 — GŁÓWNA LOGIKA
   ============================================================ */
document.getElementById('ipv4-calc-btn').addEventListener('click', calculateIPv4);
document.getElementById('ipv4-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') calculateIPv4();
});

function calculateIPv4() {
  const raw = document.getElementById('ipv4-input').value;
  const errEl = document.getElementById('ipv4-error');
  const resEl = document.getElementById('ipv4-results');

  // Reset
  errEl.textContent = '';
  errEl.classList.remove('visible');
  resEl.classList.add('hidden');

  let parsed;
  try {
    parsed = parseIPv4Input(raw);
  } catch (e) {
    errEl.textContent = '⚠ ' + e.message;
    errEl.classList.add('visible');
    return;
  }

  const { ip, prefix } = parsed;
  const mask      = cidrToMask(prefix);
  const wildcard  = (~mask) >>> 0;
  const network   = (ip & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;

  // Liczba hostów: 2^(32-prefix) - 2 (sieć i broadcast)
  // Dla /31 i /32 specjalna obsługa (RFC 3021)
  let hostCount;
  if (prefix === 32) {
    hostCount = 1; // Host route
  } else if (prefix === 31) {
    hostCount = 2; // RFC 3021 — point-to-point links
  } else {
    hostCount = Math.pow(2, 32 - prefix) - 2;
  }

  const firstHost = prefix === 32 ? network : (network + 1) >>> 0;
  const lastHost  = prefix === 32 ? network : (broadcast - 1) >>> 0;

  const info = classifyIPv4(ip, prefix);
  const txInfo = getTxTypeLabel(info.txType);

  // Buduj tag dla typu adresu
  let typeTagClass = 'tag-public';
  if (info.isPrivate) typeTagClass = 'tag-private';
  if (info.isSpecial) typeTagClass = 'tag-special';

  // Sprawdzenie czy wprowadzony host należy do sieci
  const hostInNet = (ip & mask) === network;

  // Wypełnij wyniki
  setText('r-network',  uint32ToIPv4(network));
  setText('r-mask',     uint32ToIPv4(mask));
  setText('r-prefix',   `/${prefix}`);
  setText('r-wildcard', uint32ToIPv4(wildcard));
  setText('r-broadcast',uint32ToIPv4(broadcast));
  setText('r-first-host', prefix >= 31 ? uint32ToIPv4(network) : uint32ToIPv4(firstHost));
  setText('r-last-host',  prefix >= 31 ? uint32ToIPv4(broadcast) : uint32ToIPv4(lastHost));
  setText('r-hosts',    prefix === 32
    ? '1 (host route)'
    : prefix === 31
      ? '2 (RFC 3021, point-to-point)'
      : formatBigNum(hostCount) + ' hostów');

  document.getElementById('r-class').innerHTML =
    `<span class="tag ${typeTagClass}">${info.cls}</span> ${escHtml(info.type)}`;

  document.getElementById('r-tx-type').innerHTML =
    `<span class="tag ${txInfo.tagClass}">${txInfo.label}</span> — ${escHtml(txInfo.desc)}`;

  setText('r-mask-bin', uint32ToBinDotted(mask));

  resEl.classList.remove('hidden');
}

/* ============================================================
   SEKCJA 6: KALKULATOR VLSM
   ============================================================ */
document.getElementById('vlsm-calc-btn').addEventListener('click', calculateVLSM);

function calculateVLSM() {
  const netRaw   = document.getElementById('vlsm-network').value.trim();
  const demRaw   = document.getElementById('vlsm-demands').value;
  const errEl    = document.getElementById('vlsm-error');
  const resEl    = document.getElementById('vlsm-results');

  errEl.textContent = '';
  errEl.classList.remove('visible');
  resEl.innerHTML = '';
  resEl.classList.add('hidden');

  // Parsowanie sieci bazowej
  let base;
  try {
    base = parseIPv4Input(netRaw);
  } catch (e) {
    showErr(errEl, 'Sieć bazowa: ' + e.message);
    return;
  }

  // Parsowanie zapotrzebowań (liczby hostów)
  const demands = demRaw
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      const n = parseInt(s, 10);
      if (isNaN(n) || n < 1) throw new Error(`Nieprawidłowe zapotrzebowanie: "${s}" (musi być liczbą całkowitą ≥ 1)`);
      return n;
    });

  if (demands.length === 0) {
    showErr(errEl, 'Podaj co najmniej jedno zapotrzebowanie na hosty.');
    return;
  }

  // VLSM: sortuj malejąco, przydzielaj podsieci
  const sorted = [...demands].sort((a, b) => b - a);

  let currentNet = (base.ip & cidrToMask(base.prefix)) >>> 0;
  const baseSize = Math.pow(2, 32 - base.prefix);

  // Sprawdź czy podsieci zmieszczą się w sieci bazowej
  const totalHosts = sorted.reduce((sum, d) => {
    const blockSize = nextPowerOf2(d + 2);
    return sum + blockSize;
  }, 0);

  if (totalHosts > baseSize) {
    showErr(errEl, `Łączne zapotrzebowanie (${formatBigNum(totalHosts)} adresów) przekracza pojemność sieci bazowej (${formatBigNum(baseSize)} adresów). Użyj większej sieci bazowej.`);
    return;
  }

  const subnets = [];

  for (let i = 0; i < sorted.length; i++) {
    const demand = sorted[i];
    const blockSize = nextPowerOf2(demand + 2); // +2 na adres sieci i broadcast
    const prefix = 32 - Math.log2(blockSize);

    const mask      = cidrToMask(prefix);
    const network   = currentNet;
    const broadcast = (network + blockSize - 1) >>> 0;
    const firstHost = (network + 1) >>> 0;
    const lastHost  = (broadcast - 1) >>> 0;
    const usableHosts = blockSize - 2;

    subnets.push({
      idx:        i + 1,
      demand,
      prefix,
      network:    uint32ToIPv4(network),
      mask:       uint32ToIPv4(mask),
      firstHost:  uint32ToIPv4(firstHost),
      lastHost:   uint32ToIPv4(lastHost),
      broadcast:  uint32ToIPv4(broadcast),
      usable:     usableHosts,
      waste:      usableHosts - demand,
    });

    currentNet = (broadcast + 1) >>> 0;
  }

  // Wygeneruj tabelę
  const html = `
    <div class="vlsm-table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Potrzeba</th>
            <th>Sieć / Prefiks</th>
            <th>Maska</th>
            <th>Pierwszy host</th>
            <th>Ostatni host</th>
            <th>Broadcast</th>
            <th>Hosty</th>
            <th>Marnotrawstwo</th>
          </tr>
        </thead>
        <tbody>
          ${subnets.map(s => `
            <tr>
              <td>${s.idx}</td>
              <td>${s.demand}</td>
              <td>${s.network}/${s.prefix}</td>
              <td>${s.mask}</td>
              <td>${s.firstHost}</td>
              <td>${s.lastHost}</td>
              <td>${s.broadcast}</td>
              <td>${formatBigNum(s.usable)}</td>
              <td>${formatBigNum(s.waste)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="info-box success">
      <strong>✓ VLSM wygenerowany pomyślnie</strong>
      ${subnets.length} podsieci w sieci ${netRaw}. 
      Łącznie zaadresowano: ${formatBigNum(totalHosts)} adresów z dostępnych ${formatBigNum(baseSize)}.
    </div>
  `;

  resEl.innerHTML = html;
  resEl.classList.remove('hidden');
}

/** Zwraca najmniejszą potęgę 2 ≥ n */
function nextPowerOf2(n) {
  if (n <= 1) return 1;
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

/* ============================================================
   SEKCJA 7: PODZIAŁ SIECI NA RÓWNE PODSIECI
   ============================================================ */
document.getElementById('split-calc-btn').addEventListener('click', calculateSplit);

function calculateSplit() {
  const netRaw   = document.getElementById('split-network').value.trim();
  const countRaw = document.getElementById('split-count').value.trim();
  const errEl    = document.getElementById('split-error');
  const resEl    = document.getElementById('split-results');

  errEl.textContent = '';
  errEl.classList.remove('visible');
  resEl.innerHTML = '';
  resEl.classList.add('hidden');

  let base;
  try {
    base = parseIPv4Input(netRaw);
  } catch (e) {
    showErr(errEl, e.message);
    return;
  }

  const count = parseInt(countRaw, 10);
  if (isNaN(count) || count < 2) {
    showErr(errEl, 'Minimalna liczba podsieci to 2.');
    return;
  }

  // Ile bitów potrzeba na podsieci: ceil(log2(count))
  const subBits = Math.ceil(Math.log2(count));
  const newPrefix = base.prefix + subBits;

  if (newPrefix > 30) {
    showErr(errEl, `Nie można podzielić: nowy prefiks /${newPrefix} przekracza /30. Wybierz mniejszą liczbę podsieci lub większą sieć bazową.`);
    return;
  }

  const subnetSize = Math.pow(2, 32 - newPrefix);
  const actualCount = Math.pow(2, subBits);
  const hostsPerSubnet = subnetSize - 2;
  const baseNetwork = (base.ip & cidrToMask(base.prefix)) >>> 0;

  // Ogranicz wyświetlanie do 64 podsieci (dla czytelności)
  const displayCount = Math.min(actualCount, 64);
  const subnets = [];

  for (let i = 0; i < displayCount; i++) {
    const network   = (baseNetwork + i * subnetSize) >>> 0;
    const broadcast = (network + subnetSize - 1) >>> 0;
    subnets.push({
      idx: i + 1,
      network:   uint32ToIPv4(network),
      cidr:      `/${newPrefix}`,
      mask:      uint32ToIPv4(cidrToMask(newPrefix)),
      firstHost: uint32ToIPv4((network + 1) >>> 0),
      lastHost:  uint32ToIPv4((broadcast - 1) >>> 0),
      broadcast: uint32ToIPv4(broadcast),
    });
  }

  const html = `
    <div class="info-box">
      <strong>ℹ Wyniki podziału</strong>
      Sieć <code>${uint32ToIPv4(baseNetwork)}/${base.prefix}</code> podzielona na <strong>${actualCount}</strong> podsieci /${newPrefix}.
      Pożyczone bity: <strong>${subBits}</strong>.
      Hosty/podsieć: <strong>${formatBigNum(hostsPerSubnet)}</strong>.
      ${actualCount > 64 ? `<br>⚠ Wyświetlono pierwsze 64 z ${formatBigNum(actualCount)} podsieci.` : ''}
    </div>
    <div class="vlsm-table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Adres sieci / CIDR</th>
            <th>Maska</th>
            <th>Pierwszy host</th>
            <th>Ostatni host</th>
            <th>Broadcast</th>
          </tr>
        </thead>
        <tbody>
          ${subnets.map(s => `
            <tr>
              <td>${s.idx}</td>
              <td>${s.network}${s.cidr}</td>
              <td>${s.mask}</td>
              <td>${s.firstHost}</td>
              <td>${s.lastHost}</td>
              <td>${s.broadcast}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  resEl.innerHTML = html;
  resEl.classList.remove('hidden');
}

/* ============================================================
   SEKCJA 8: POMOCNICZE FUNKCJE IPv6
   ============================================================ */

/**
 * Rozwiń adres IPv6 do pełnej formy (8 grup po 4 cyfry szesnastkowe).
 * Obsługuje: ::, grupy skrócone, adresy IPv4-mapped (::ffff:a.b.c.d)
 * Zwraca tablicę 8 liczb (Uint16) lub rzuca Error.
 */
function expandIPv6(addr) {
  // Usuń białe znaki
  addr = addr.trim();
  if (addr === '') throw new Error('Pusty adres IPv6.');

  // Sprawdź czy adres zawiera część IPv4 (mapped lub compatible)
  // np. ::ffff:192.0.2.1 lub ::192.0.2.1
  const ipv4MappedRe = /^(.*:)(\d+\.\d+\.\d+\.\d+)$/;
  const ipv4MappedMatch = addr.match(ipv4MappedRe);
  if (ipv4MappedMatch) {
    const ipv4Part = ipv4MappedMatch[2];
    const ipv4Num  = ipv4ToUint32(ipv4Part);
    if (ipv4Num === null) throw new Error(`Nieprawidłowa część IPv4: ${ipv4Part}`);
    // Zamień IPv4 na dwie grupy IPv6
    const high = (ipv4Num >>> 16) & 0xFFFF;
    const low  = ipv4Num & 0xFFFF;
    addr = ipv4MappedMatch[1] + high.toString(16) + ':' + low.toString(16);
  }

  // Sprawdź podwójny dwukropek (::)
  const parts = addr.split('::');
  if (parts.length > 2) throw new Error('Adres IPv6 może zawierać co najwyżej jeden blok "::".');

  let leftGroups  = [];
  let rightGroups = [];

  if (parts.length === 2) {
    leftGroups  = parts[0] ? parts[0].split(':') : [];
    rightGroups = parts[1] ? parts[1].split(':') : [];
    const missing = 8 - leftGroups.length - rightGroups.length;
    if (missing < 0) throw new Error('Adres IPv6 ma zbyt wiele grup (po rozwinięciu :: byłoby > 8).');
    const middle = Array(missing).fill('0');
    leftGroups = [...leftGroups, ...middle, ...rightGroups];
  } else {
    leftGroups = parts[0].split(':');
  }

  if (leftGroups.length !== 8) throw new Error(`Adres IPv6 musi mieć 8 grup, znaleziono: ${leftGroups.length}.`);

  // Walidacja i konwersja każdej grupy
  return leftGroups.map((g, i) => {
    if (!/^[0-9a-fA-F]{1,4}$/.test(g)) {
      throw new Error(`Nieprawidłowa grupa [${i + 1}]: "${g}" — oczekiwano 1–4 cyfry hex.`);
    }
    return parseInt(g, 16);
  });
}

/** Formatuje grupy IPv6 do pełnej formy tekstowej */
function groupsToFullString(groups) {
  return groups.map(g => g.toString(16).padStart(4, '0')).join(':');
}

/**
 * Kompresuje adres IPv6 do formy skróconej (RFC 5952):
 * - usuń wiodące zera w każdej grupie
 * - zastąp NAJDŁUŻSZĄ sekwencję grup zerowych przez ::
 */
function compressIPv6(groups) {
  // Skróć wiodące zera w każdej grupie
  const short = groups.map(g => g.toString(16));

  // Znajdź najdłuższą ciągłą sekwencję grup "0"
  let bestStart = -1, bestLen = 0;
  let curStart  = -1, curLen  = 0;

  for (let i = 0; i < 8; i++) {
    if (short[i] === '0') {
      if (curStart === -1) { curStart = i; curLen = 0; }
      curLen++;
      if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
    } else {
      curStart = -1;
    }
  }

  // Zastosuj :: tylko jeśli sekwencja ma co najmniej 2 grupy zerowe
  if (bestLen < 2) {
    return short.join(':');
  }

  const left  = short.slice(0, bestStart);
  const right = short.slice(bestStart + bestLen);
  return (left.length ? left.join(':') : '') + '::' + (right.length ? right.join(':') : '');
}

/**
 * Parsuje adres IPv6 z opcjonalnym prefiksem.
 * Zwraca { groups: number[8], prefix: number|null }
 */
function parseIPv6Input(raw) {
  raw = raw.trim();
  let addrPart = raw;
  let prefix   = null;

  // Sprawdź prefiks (np. /64), ale uważaj na format [addr]/prefix
  // Adres IPv6 może zawierać ':', więc prefiks jest po ostatnim '/'
  const slashIdx = raw.lastIndexOf('/');
  if (slashIdx !== -1) {
    const prefixStr = raw.slice(slashIdx + 1);
    if (/^\d+$/.test(prefixStr)) {
      prefix   = parseInt(prefixStr, 10);
      addrPart = raw.slice(0, slashIdx);
      if (prefix < 0 || prefix > 128) throw new Error(`Prefiks IPv6 musi być w zakresie 0–128 (podano: ${prefix}).`);
    }
  }

  const groups = expandIPv6(addrPart);
  return { groups, prefix };
}

/**
 * Identyfikacja typu adresu IPv6 zgodnie z RFC 4291.
 * Zwraca { type, scope, isMapped, isLoopback, isSolicitedNode }
 */
function classifyIPv6(groups) {
  const g = groups;

  // Loopback: ::1
  if (g[0]===0 && g[1]===0 && g[2]===0 && g[3]===0 && g[4]===0 && g[5]===0 && g[6]===0 && g[7]===1) {
    return { type: 'Loopback (::1)', scope: 'Host', isMapped: false, isLoopback: true, isSolicitedNode: false };
  }

  // Unspecified: ::
  if (g.every(x => x === 0)) {
    return { type: 'Nieokreślony (Unspecified) ::', scope: 'N/D', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // IPv4-mapped: ::ffff:x.x.x.x
  if (g[0]===0 && g[1]===0 && g[2]===0 && g[3]===0 && g[4]===0 && g[5]===0xFFFF) {
    const ipv4 = uint32ToIPv4(((g[6] << 16) | g[7]) >>> 0);
    return { type: `IPv4-mapped (::ffff:${ipv4})`, scope: 'Global', isMapped: true, isLoopback: false, isSolicitedNode: false };
  }

  // IPv4-compatible (deprecated): ::x.x.x.x
  if (g[0]===0 && g[1]===0 && g[2]===0 && g[3]===0 && g[4]===0 && g[5]===0 && g[6] !== 0) {
    const ipv4 = uint32ToIPv4(((g[6] << 16) | g[7]) >>> 0);
    return { type: `IPv4-compatible (przestarzały, ::${ipv4})`, scope: 'Global', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // Multicast: ff00::/8
  if ((g[0] & 0xFF00) === 0xFF00) {
    const flags = (g[0] >> 4) & 0xF;
    const scopeCode = g[0] & 0xF;
    const scopeMap = { 1:'Interface-Local', 2:'Link-Local', 4:'Admin-Local', 5:'Site-Local', 8:'Organization-Local', 14:'Global', 0xE:'Global' };
    const scopeName = scopeMap[scopeCode] || `Scope ${scopeCode}`;

    // Solicited-Node Multicast: ff02::1:ffxx:xxxx
    const isSolNode = (g[0]===0xFF02 && g[1]===0 && g[2]===0 && g[3]===0 && g[4]===0 && g[5]===1 && g[6]===0xFF00);
    return {
      type: `Multicast (ff${flags.toString(16)}${scopeCode.toString(16)}::/16)`,
      scope: scopeName,
      isMapped: false,
      isLoopback: false,
      isSolicitedNode: isSolNode,
    };
  }

  // Link-Local Unicast: fe80::/10
  if ((g[0] & 0xFFC0) === 0xFE80) {
    return { type: 'Link-Local Unicast (fe80::/10)', scope: 'Link-Local', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // Site-Local Unicast (deprecated): fec0::/10
  if ((g[0] & 0xFFC0) === 0xFEC0) {
    return { type: 'Site-Local Unicast (przestarzały, fec0::/10)', scope: 'Site-Local', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // Unique Local Unicast (ULA): fc00::/7
  if ((g[0] & 0xFE00) === 0xFC00) {
    return { type: 'Unique Local Unicast — ULA (fc00::/7, prywatny)', scope: 'Global (lokalnie)', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // 6to4: 2002::/16
  if (g[0] === 0x2002) {
    const ipv4 = uint32ToIPv4(((g[1] << 16) | g[2]) >>> 0);
    return { type: `6to4 Anycast (2002::/16, zawiera IPv4 ${ipv4})`, scope: 'Global', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // Teredo: 2001::/32
  if (g[0] === 0x2001 && g[1] === 0x0000) {
    return { type: 'Teredo Tunneling (2001::/32)', scope: 'Global', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  // Documentation: 2001:db8::/32
  if (g[0] === 0x2001 && g[1] === 0x0DB8) {
    return { type: 'Dokumentacyjny (2001:db8::/32, RFC 3849)', scope: 'N/D', isMapped: false, isLoopback: false, isSolicitedNode: false };
  }

  return { type: 'Global Unicast', scope: 'Global', isMapped: false, isLoopback: false, isSolicitedNode: false };
}

/** Oblicza adres Solicited-Node Multicast dla podanego adresu unicast */
function getSolicitedNodeMulticast(groups) {
  // ff02::1:ff<ostatnie 24 bity adresu>
  const last24hi = (groups[6] & 0x00FF);
  const last24lo = groups[7];
  return `ff02::1:ff${last24hi.toString(16).padStart(2,'0')}:${last24lo.toString(16).padStart(4,'0')}`;
}

/** Oblicza adres sieci IPv6 na podstawie grup i prefiksu */
function ipv6NetworkAddress(groups, prefix) {
  const result = [...groups];
  // Które bity należy wyzerować (od najniższego)
  for (let i = 0; i < 8; i++) {
    const groupStart = i * 16;       // bit startowy tej grupy
    const groupEnd   = groupStart + 16; // bit końcowy (exclusive)

    if (prefix >= groupEnd) {
      // Cała grupa należy do prefiksu — zostaw bez zmian
    } else if (prefix <= groupStart) {
      // Cała grupa jest poza prefiksem — zeruj
      result[i] = 0;
    } else {
      // Częściowe zerowanie
      const bitsToKeep = prefix - groupStart;
      const mask = (0xFFFF << (16 - bitsToKeep)) & 0xFFFF;
      result[i] = groups[i] & mask;
    }
  }
  return result;
}

/* ============================================================
   SEKCJA 9: KALKULATOR IPv6 — GŁÓWNA LOGIKA
   ============================================================ */
document.getElementById('ipv6-calc-btn').addEventListener('click', calculateIPv6);
document.getElementById('ipv6-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') calculateIPv6();
});

function calculateIPv6() {
  const raw   = document.getElementById('ipv6-input').value;
  const errEl = document.getElementById('ipv6-error');
  const resEl = document.getElementById('ipv6-results');

  errEl.textContent = '';
  errEl.classList.remove('visible');
  resEl.classList.add('hidden');

  let parsed;
  try {
    parsed = parseIPv6Input(raw);
  } catch (e) {
    showErr(errEl, e.message);
    return;
  }

  const { groups, prefix } = parsed;
  const full       = groupsToFullString(groups);
  const compressed = compressIPv6(groups);
  const info       = classifyIPv6(groups);

  // Prefiks sieci
  let networkStr = '—';
  let prefixStr  = prefix !== null ? `/${prefix}` : '(brak)';
  if (prefix !== null) {
    const netGroups = ipv6NetworkAddress(groups, prefix);
    networkStr = compressIPv6(netGroups) + `/${prefix}`;
  }

  // Solicited-Node Multicast (tylko dla unicast)
  let solicitedStr = '—';
  if (!info.type.includes('Multicast') && !info.isLoopback && !groups.every(g => g === 0)) {
    solicitedStr = getSolicitedNodeMulticast(groups);
  }

  setText('r6-expanded',   full);
  setText('r6-compressed', compressed);
  setText('r6-prefix',     networkStr);
  setText('r6-prefix-len', prefixStr);
  setText('r6-type',       info.type);
  setText('r6-scope',      info.scope);
  setText('r6-solicited',  solicitedStr);

  resEl.classList.remove('hidden');
}

/* ============================================================
   SEKCJA 10: PODZIAŁ PREFIKSU IPv6
   ============================================================ */
document.getElementById('ipv6-split-btn').addEventListener('click', calculateIPv6Split);

function calculateIPv6Split() {
  const netRaw    = document.getElementById('ipv6-split-net').value.trim();
  const newPfxRaw = document.getElementById('ipv6-split-new').value.trim();
  const errEl     = document.getElementById('ipv6-split-error');
  const resEl     = document.getElementById('ipv6-split-results');

  errEl.textContent = '';
  errEl.classList.remove('visible');
  resEl.innerHTML = '';
  resEl.classList.add('hidden');

  let parsed;
  try {
    parsed = parseIPv6Input(netRaw);
  } catch (e) {
    showErr(errEl, e.message);
    return;
  }

  if (parsed.prefix === null) {
    showErr(errEl, 'Podaj prefiks bazowy (np. 2001:db8::/32).');
    return;
  }

  const newPrefix = parseInt(newPfxRaw, 10);
  if (isNaN(newPrefix) || newPrefix < 1 || newPrefix > 128) {
    showErr(errEl, 'Nowy prefiks musi być liczbą całkowitą od 1 do 128.');
    return;
  }

  if (newPrefix <= parsed.prefix) {
    showErr(errEl, `Nowy prefiks (/${newPrefix}) musi być dłuższy niż bazowy (/${parsed.prefix}).`);
    return;
  }

  const subnetBits = newPrefix - parsed.prefix;
  // Liczba podsieci = 2^subnetBits
  // Jeśli subnetBits > 60, liczba jest astronomiczna — używamy BigInt
  const subnetCount = BigInt(1) << BigInt(subnetBits);

  const baseNetwork = ipv6NetworkAddress(parsed.groups, parsed.prefix);

  // Wyświetl maksymalnie 32 podsieci
  const displayCount = subnetBits <= 5 ? Number(subnetCount) : 32;
  const showAll      = displayCount === Number(subnetCount);

  // Inkrementacja adresu IPv6 (jako BigInt)
  const baseInt = groupsToBigInt(baseNetwork);
  // Rozmiar każdej podsieci
  const blockSize = BigInt(1) << BigInt(128 - newPrefix);

  const rows = [];
  for (let i = 0; i < displayCount; i++) {
    const netInt   = baseInt + BigInt(i) * blockSize;
    const netGroups = bigIntToGroups(netInt);
    const netStr   = compressIPv6(netGroups) + `/${newPrefix}`;
    rows.push(`<tr><td>${i + 1}</td><td>${escHtml(netStr)}</td></tr>`);
  }

  const html = `
    <div class="info-box">
      <strong>ℹ Podział prefiksu IPv6</strong>
      Prefiks <code>${escHtml(netRaw)}</code> → <strong>${formatBigNum(subnetCount)}</strong> podsieci /${newPrefix}.
      Pożyczone bity: <strong>${subnetBits}</strong>.
      Hosty na podsieć: 2<sup>${128 - newPrefix}</sup> - 2 = ${formatBigNum((BigInt(1) << BigInt(128 - newPrefix)) - BigInt(2))}.
      ${!showAll ? `<br>⚠ Wyświetlono pierwsze ${displayCount} z ${formatBigNum(subnetCount)} podsieci.` : ''}
    </div>
    <div class="vlsm-table-wrap">
      <table class="data-table">
        <thead>
          <tr><th>#</th><th>Adres podsieci / Prefiks</th></tr>
        </thead>
        <tbody>${rows.join('')}</tbody>
      </table>
    </div>
  `;

  resEl.innerHTML = html;
  resEl.classList.remove('hidden');
}

/** Konwertuje tablicę 8 grup (Uint16) na BigInt (128-bit) */
function groupsToBigInt(groups) {
  let n = BigInt(0);
  for (let i = 0; i < 8; i++) {
    n = (n << BigInt(16)) | BigInt(groups[i]);
  }
  return n;
}

/** Konwertuje BigInt (128-bit) na tablicę 8 grup (Uint16) */
function bigIntToGroups(n) {
  const groups = [];
  for (let i = 7; i >= 0; i--) {
    groups[i] = Number(n & BigInt(0xFFFF));
    n >>= BigInt(16);
  }
  return groups;
}

/* ============================================================
   SEKCJA 11: NARZĘDZIA POMOCNICZE UI
   ============================================================ */

/** Ustawia tekst elementu */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/** Wyświetla błąd w elemencie */
function showErr(el, msg) {
  el.textContent = '⚠ ' + msg;
  el.classList.add('visible');
}

/** Escapuje HTML (zapobiega XSS) */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   SEKCJA 12: INTERAKTYWNE PRZYKŁADY (klik w placeholder)
   ============================================================ */
// Dla wygody — kliknięcie na pole wpisuje przykład i oblicza
const examples = [
  { id: 'ipv4-input', example: '192.168.1.100/24', calc: calculateIPv4 },
  { id: 'vlsm-network', example: '10.0.0.0/24' },
  { id: 'split-network', example: '172.16.0.0/16' },
  { id: 'ipv6-input', example: '2001:db8::1/64', calc: calculateIPv6 },
  { id: 'ipv6-split-net', example: '2001:db8::/32' },
];

examples.forEach(({ id, example, calc }) => {
  const el = document.getElementById(id);
  if (!el) return;
  // Podpowiedź: jeśli pole jest puste i kliknięte dwukrotnie — wstaw przykład
  el.addEventListener('dblclick', () => {
    if (el.value.trim() === '') {
      el.value = example;
      if (calc) calc();
    }
  });
});

// Wypełnij przykładowe wartości VLSM
document.getElementById('vlsm-demands').addEventListener('dblclick', function () {
  if (this.value.trim() === '') {
    this.value = '100\n50\n25\n10\n2';
  }
});
document.getElementById('split-count').addEventListener('dblclick', function () {
  if (this.value.trim() === '') {
    this.value = '8';
  }
});
document.getElementById('ipv6-split-new').addEventListener('dblclick', function () {
  if (this.value.trim() === '') {
    this.value = '48';
  }
});

// Wskazówka w konsoli
console.log(
  '%cNetCalc Pro%c załadowany.\n' +
  'Dwukliknij puste pole aby wstawić przykład.\n' +
  'Implementacja: RFC 950, RFC 1918, RFC 4291, RFC 5952, RFC 3021, RFC 6598',
  'color:#00D4FF;font-weight:bold;font-size:14px',
  'color:#8B949E'
);
