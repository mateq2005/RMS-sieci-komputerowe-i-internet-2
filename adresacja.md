# Poradnik: Adresacja IPv4 i IPv6
### Na podstawie analizy pytań egzaminacyjnych (poziom CCNA)

---

## Spis treści

1. [Obliczanie maksymalnej liczby hostów w podsieci IPv4](#1-obliczanie-maksymalnej-liczby-hostów-w-podsieci-ipv4)
2. [Wyznaczanie adresu sieci i zakresu podsieci (przynależność hosta do sieci)](#2-wyznaczanie-adresu-sieci-i-zakresu-podsieci-przynależność-hosta-do-sieci)
3. [Projektowanie podsieci VLSM – dobór maski do wymagań](#3-projektowanie-podsieci-vlsm--dobór-maski-do-wymagań)
4. [Obliczanie liczby bitów potrzebnych do podziału sieci](#4-obliczanie-liczby-bitów-potrzebnych-do-podziału-sieci)
5. [Skracanie (kompresja) adresów IPv6](#5-skracanie-kompresja-adresów-ipv6)
6. [Walidacja poprawności adresów IPv6](#6-walidacja-poprawności-adresów-ipv6)
7. [Adres loopback IPv6 i odpowiedniki logiczne adresów IPv4](#7-adres-loopback-ipv6-i-odpowiedniki-logiczne-adresów-ipv4)
8. [Adresy multicast IPv6 i grupy Neighbour Discovery](#8-adresy-multicast-ipv6-i-grupy-neighbour-discovery)
9. [Obliczanie liczby podsieci IPv6 z danego prefiksu](#9-obliczanie-liczby-podsieci-ipv6-z-danego-prefiksu)
10. [Identyfikacja adresów prywatnych (RFC 1918) i specjalnych IPv4](#10-identyfikacja-adresów-prywatnych-rfc-1918-i-specjalnych-ipv4)
11. [Identyfikacja typu transmisji na podstawie adresu docelowego](#11-identyfikacja-typu-transmisji-na-podstawie-adresu-docelowego)

---

## 1. Obliczanie maksymalnej liczby hostów w podsieci IPv4

### Opis
Zadanie polega na wyznaczeniu, ile urządzeń (hostów) można zaadresować w podsieci, znając jej maskę podsieci lub prefiks CIDR. Jest to jeden z najczęściej pojawiających się typów zadań.

### Przykład z pliku (pytanie 51)
> Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `23.24.137.124/255.255.255.224`.
>
> **Poprawna odpowiedź: 30**

### Algorytm rozwiązania krok po kroku

**Krok 1 – Przelicz maskę dziesiętną na CIDR (jeśli podana w formacie dziesiętnym)**

Zamień każdy oktet maski na zapis binarny i policz jedynki:

| Maska dziesiętna | Zapis binarny | Liczba bitów sieciowych |
|---|---|---|
| 255.255.255.224 | `11111111.11111111.11111111.11100000` | /27 |
| 255.255.255.192 | `11111111.11111111.11111111.11000000` | /26 |
| 255.255.255.248 | `11111111.11111111.11111111.11111000` | /29 |
| 255.255.254.0   | `11111111.11111111.11111110.00000000` | /23 |
| 255.255.248.0   | `11111111.11111111.11111000.00000000` | /21 |

**Krok 2 – Oblicz liczbę bitów przeznaczonych na hosty (n)**

```
n = 32 - prefiks_CIDR
```

Przykład: `/27` → n = 32 − 27 = **5 bitów** na hosty

**Krok 3 – Zastosuj wzór na liczbę hostów**

```
Liczba hostów = 2^n − 2
```

Odejmujemy 2, ponieważ:
- jeden adres to **adres sieci** (wszystkie bity hosta = 0)
- jeden adres to **adres rozgłoszeniowy** (wszystkie bity hosta = 1)

Przykład z pytania 51:
```
Maska 255.255.255.224 = /27
n = 32 - 27 = 5
Hostów = 2^5 - 2 = 32 - 2 = 30 ✅
```

**Tabela gotowych wyników – zapamiętaj!**

| Prefiks | Bity hosta (n) | Liczba hostów (2^n − 2) |
|---|---|---|
| /30 | 2 | 2 |
| /29 | 3 | 6 |
| /28 | 4 | 14 |
| /27 | 5 | **30** |
| /26 | 6 | **62** |
| /25 | 7 | 126 |
| /24 | 8 | 254 |
| /23 | 9 | 510 |
| /22 | 10 | 1022 |
| /21 | 11 | 2046 |
| /20 | 12 | 4094 |

> ⚠️ **Uwaga:** Prefiks /31 i /32 są wyjątkami – /31 służy do połączeń punkt-punkt (2 adresy, wzór daje 0), a /32 to adres hosta.

---

## 2. Wyznaczanie adresu sieci i zakresu podsieci (przynależność hosta do sieci)

### Opis
Zadanie polega na sprawdzeniu, czy wskazane adresy IP należą do tej samej podsieci co adres podany w treści pytania. Wymaga obliczenia adresu sieci poprzez operację AND na adresie IP i masce podsieci.

### Przykład z pliku (pytanie 9)
> Wskaż, które adresy należą do tej samej sieci co `128.177.198.2/20`.
>
> **Poprawna odpowiedź: 128.177.206.21 i 128.177.193.221**

### Algorytm rozwiązania krok po kroku

**Krok 1 – Wyznacz maskę podsieci z prefiksu CIDR**

Przykład: `/20` → 20 bitów jedynek → maska = `255.255.240.0`

Binarnie: `11111111.11111111.11110000.00000000`

**Krok 2 – Oblicz adres sieci referencyjnej (operacja bitowa AND)**

Wykonaj iloczyn AND dla każdego oktetu adresu i maski:

```
Adres:  128.177.198.2     →  10000000.10110001.11000110.00000010
Maska:  255.255.240.0     →  11111111.11111111.11110000.00000000
AND:    128.177.192.0     →  10000000.10110001.11000000.00000000
```

**Adres sieci referencyjnej = `128.177.192.0`**

**Krok 3 – Wyznacz zakres sieci (adres rozgłoszeniowy)**

Adres rozgłoszeniowy = adres sieci + uzupełnienie bitów hosta jedynkami:
```
Adres sieci:         128.177.192.0
Broadcast:           128.177.207.255   (bo bity hosta: 0000 11111111)
```

**Zakres sieci: `128.177.192.0` – `128.177.207.255`**

**Krok 4 – Sprawdź każdy kandydujący adres**

Wykonaj AND kandydata z maską i porównaj z adresem sieci. Jeśli wyniki są równe → adres należy do tej samej sieci.

| Kandydat | 3. oktet binarnie | Mieści się w 192–207? | Wynik |
|---|---|---|---|
| 128.177.206.21 | 206 = `11001110` → AND z `11110000` = `11000000` = 192 | ✅ TAK | Należy |
| 128.177.193.221 | 193 = `11000001` → AND z `11110000` = `11000000` = 192 | ✅ TAK | Należy |
| 128.177.216.18 | 216 = `11011000` → AND = `11010000` = 208 ≠ 192 | ❌ NIE | Nie należy |

> 💡 **Skrót praktyczny dla masek /8, /16, /24:** jeśli maska wypada na granicy oktetów, wystarczy porównać odpowiednie oktety bez rachunków binarnych. Rachunki binarne są niezbędne gdy maska „przecina" oktet (np. /20, /19, /22).

---

## 3. Projektowanie podsieci VLSM – dobór maski do wymagań

### Opis
Zadanie polega na doborze odpowiedniej maski podsieci (lub prefiksu CIDR) tak, aby pomieścić wymaganą liczbę hostów, a następnie wskazaniu prawidłowych zakresów adresowych podsieci.

### Przykład z pliku (pytanie 13)
> Firma ma adres sieciowy `172.16.1.64/26`. Chce stworzyć dwie podsieci dla odpowiednio **10 i 18 hostów**. Które dwie sieci spełnią warunki?
>
> **Poprawna odpowiedź: `172.16.1.64/27` i `172.16.1.128/27`**

### Algorytm rozwiązania krok po kroku

**Krok 1 – Dla każdego wymagania znajdź minimalną liczbę bitów hosta**

Szukamy najmniejszego `n`, dla którego `2^n − 2 ≥ wymagana_liczba_hostów`:

```
Dla 18 hostów: 2^4 - 2 = 14 ❌  |  2^5 - 2 = 30 ✅  → potrzeba n=5, prefiks /27
Dla 10 hostów: 2^4 - 2 = 14 ✅  → wystarczy n=4, prefiks /28
               ale /27 też obsłuży 10 hostów (z zapasem)
```

**Krok 2 – Wybierz maskę pasującą do OBU wymagań**

Większe zapotrzebowanie (18 hostów) dyktuje maskę minimalną:
- /28 = 14 hostów → **za mało dla 18**
- /27 = 30 hostów → **wystarczy dla obu**

**Krok 3 – Wyznacz adresy podsieci**

Krok podsieci (ang. *block size*) = `2^n = 2^5 = 32`

Zaczynając od adresu sieciowego `172.16.1.64`:
```
Podsieć 1: 172.16.1.64/27   zakres: .64  – .95   (broadcast: .95)
Podsieć 2: 172.16.1.96/27   zakres: .96  – .127  (broadcast: .127)
Podsieć 3: 172.16.1.128/27  zakres: .128 – .159  ...
```

**Krok 4 – Zweryfikuj odpowiedzi**

Odpowiedź `172.16.1.64/27` i `172.16.1.128/27` – obie są prawidłowymi podsieciami /27, każda pomieści 30 hostów. ✅

> 💡 **VLSM (Variable Length Subnet Mask)** – w praktyce do większej podsieci przydzielamy mniejszy prefiks (więcej hostów), do mniejszej – większy prefiks. Podsieci nie mogą na siebie nachodzić zakresami adresów.

---

## 4. Obliczanie liczby bitów potrzebnych do podziału sieci

### Opis
Zadanie polega na określeniu, ile bitów należy „pożyczyć" z części hosta, aby uzyskać co najmniej wymaganą liczbę podsieci.

### Przykład z pliku (pytanie 50)
> Ile bitów musi być pożyczone z części adresu hosta, aby zaadresować router z **pięcioma podłączonymi sieciami**?
>
> **Poprawna odpowiedź: trzy**

### Algorytm rozwiązania krok po kroku

**Krok 1 – Ustal wymaganą liczbę podsieci**

W pytaniu: 5 sieci (lub więcej, zależy od kontekstu).

**Krok 2 – Znajdź minimalną liczbę bitów (k) spełniającą warunek**

```
2^k ≥ wymagana_liczba_podsieci
```

| k (bity) | 2^k (podsieci) |
|---|---|
| 1 | 2 |
| 2 | 4 |
| **3** | **8** ← pierwszy wynik ≥ 5 |
| 4 | 16 |

Dla 5 podsieci: potrzeba **k = 3 bitów**. ✅

**Krok 3 – Zaktualizuj maskę podsieci**

Nowy prefiks = stary prefiks + k

Np. sieć /24 + 3 bity = **/27** (8 podsieci, każda z 30 hostami)

> ⚠️ **Pamiętaj:** Pożyczając bity z części hosta zyskujesz podsieci, ale tracisz hosty w każdej podsieci. Zawsze sprawdzaj, czy pozostała liczba bitów hosta jest wystarczająca.

---

## 5. Skracanie (kompresja) adresów IPv6

### Opis
Zadanie polega na zapisaniu pełnego 128-bitowego adresu IPv6 w możliwie najkrótszej poprawnej formie, zgodnie z zasadami RFC 5952.

### Przykład z pliku (pytanie 5 / 61)
> Który adres IPv6 jest najbardziej skróconą wersją `FE80:0:0:0:02AA:FF:FE9A:4CA3`?
>
> **Poprawna odpowiedź: `FE80::2AA:FF:FE9A:4CA3`**

### Algorytm rozwiązania krok po kroku

**Krok 1 – Usuń wiodące zera w każdej grupie (hekstet)**

Reguła: wiodące zera w obrębie grupy 4 cyfr hex są opcjonalne.

```
FE80:0000:0000:0000:02AA:00FF:FE9A:4CA3
       ↓
FE80:0:0:0:2AA:FF:FE9A:4CA3
```

**Krok 2 – Zastąp jedną ciągłą sekwencję grup złożonych wyłącznie z zer podwójnym dwukropkiem `::`**

Reguła: `::` można użyć **tylko raz** w całym adresie. Wybierz najdłuższy ciąg zer (jeśli kilka równych – zazwyczaj pierwszy).

```
FE80:0:0:0:2AA:FF:FE9A:4CA3
         ↓
FE80::2AA:FF:FE9A:4CA3
```

**Krok 3 – Weryfikacja poprawności**

Sprawdź, czy po rozwinięciu `::` adres ma łącznie 8 grup po 4 cyfry hex:
```
FE80::2AA:FF:FE9A:4CA3
= FE80:0000:0000:0000:02AA:00FF:FE9A:4CA3  ✅ (8 grup)
```

**Typowe błędy:**

| Zapis błędny | Dlaczego błędny |
|---|---|
| `FE8::2AA:FF:FE9A:4CA3` | Skrócono `FE80` do `FE8` – niedopuszczalne (można pomijać tylko **wiodące** zera) |
| `FE80:::0:2AA:FF:FE9A:4CA3` | Trzy dwukropki – zapis nieprawidłowy |
| `FE80::0:2AA:FF:FE9A:4CA3` | Niepotrzebne `0` – `::` już zastępuje wszystkie grupy zer; dodanie `:0:` tworzy błędny adres (rozwinięcie da 9 grup) |

---

## 6. Walidacja poprawności adresów IPv6

### Opis
Zadanie polega na wskazaniu spośród podanych opcji jedynego poprawnie zapisanego adresu IPv6. Sprawdzamy zgodność z zasadami struktury adresu.

### Przykład z pliku (pytanie 55)
> Wskaż, który z poniższych adresów IPv6 jest prawidłowy:
> - A. `2001:0DB8:1:ACAD:FE55:67597` ← za mało grup, cyfra 7-bitowa w hex
> - B. `2001::ACAD::FE55:6789:B210` ← dwa `::` w jednym adresie
> - C. `2001:0DB8:1:ACAD:FE55:67597` ← błędna wartość (67597 = 5 cyfr hex)
> - **D. `2001:0DB8:1:ACAD::FE55:6789:B210` ✅**

### Zasady poprawności adresu IPv6

**Reguła 1 – Struktura**
Adres IPv6 składa się z **8 grup** (hekstetów), każda zawiera **1–4 cyfry szesnastkowe** (0–9, A–F).

```
Pełny:    2001:0DB8:0001:ACAD:0000:FE55:6789:B210
Skrócony: 2001:DB8:1:ACAD::FE55:6789:B210
```

**Reguła 2 – Podwójny dwukropek `::` może wystąpić tylko raz**
Zastępuje jedną lub więcej kolejnych grup samych zer. Dwa `::` w jednym adresie → **błąd**.

**Reguła 3 – Liczba grup musi wynosić 8 (po rozwinięciu `::`)** 

**Reguła 4 – Każda grupa może mieć co najwyżej 4 cyfry hex**
`67897` → 5 cyfr → **błąd**

**Reguła 5 – Dozwolone znaki: 0–9 i A–F (wielkość liter nieistotna)**
`K`, `G` itp. → **błąd**

**Schemat weryfikacji (checklista):**

```
[ ] Czy liczba grup po rozwinięciu :: = 8?
[ ] Czy :: występuje co najwyżej raz?
[ ] Czy żadna grupa nie ma więcej niż 4 znaki?
[ ] Czy wszystkie znaki to cyfry hex (0-9, A-F)?
```

---

## 7. Adres loopback IPv6 i odpowiedniki logiczne adresów IPv4

### Opis
Zadanie polega na skojarzeniu specjalnych adresów IPv4 z ich odpowiednikami w IPv6.

### Przykład z pliku (pytanie 6)
> Wskaż, który adres IPv6 jest odpowiednikiem logicznym adresu IPv4 `127.0.0.1`.
>
> **Poprawna odpowiedź: `::1`**

### Tabela odpowiedników – zapamiętaj!

| Adres IPv4 | Znaczenie | Odpowiednik IPv6 | Opis |
|---|---|---|---|
| `127.0.0.1` | Loopback | `::1` | Adres zwrotny hosta; pełna forma: `0000:...:0001` |
| `0.0.0.0` | Adres nieokreślony | `::` | Brak adresu / nieokreślony |
| `169.254.x.x` | Link-local (APIPA) | `FE80::/10` | Automatycznie konfigurowany, tylko lokalne łącze |
| `224.0.0.0/4` | Multicast | `FF00::/8` | Adresy grupowe |

> 💡 `::1` to skrót od `0000:0000:0000:0000:0000:0000:0000:0001` – siedem grup zerowych zastąpionych przez `::`, a ostatnia grupa to `1`.

---

## 8. Adresy multicast IPv6 i grupy Neighbour Discovery

### Opis
Zadanie polega na wskazaniu odpowiedniego adresu multicast IPv6, do którego dołączy interfejs na potrzeby protokołu Neighbour Discovery (odpowiednik ARP w IPv4), lub na identyfikacji znaczenia znanych adresów grupowych.

### Przykład z pliku (pytanie 3)
> Interfejs posiada adres `FE80::D68C:B5FF:FECE:A0C0/64`. Do jakiej grupy multicastowej przystąpi na potrzeby Neighbour Discovery?
>
> **Poprawna odpowiedź: `FF02::1:FFCE:A0C0`**

### Algorytm tworzenia adresu Solicited-Node Multicast

Adres solicited-node multicast jest tworzony dla każdego adresu unicast i anycast przypisanego interfejsowi.

**Format:** `FF02::1:FF` + **ostatnie 24 bity** adresu unicast

**Krok 1 – Weź pełny adres unicast:**
```
FE80::D68C:B5FF:FECE:A0C0
= FE80:0000:0000:0000:D68C:B5FF:FECE:A0C0
```

**Krok 2 – Wyodrębnij ostatnie 24 bity (6 cyfr hex):**
```
... FECE:A0C0
         ↑
Ostatnie 24 bity = CE:A0C0
```

**Krok 3 – Dołącz do prefiksu `FF02::1:FF`:**
```
FF02::1:FF + CE:A0C0 = FF02::1:FFCE:A0C0  ✅
```

### Tabela znanych adresów multicast IPv6

| Adres | Znaczenie |
|---|---|
| `FF02::1` | Wszystkie hosty z włączonym IPv6 na łączu lokalnym |
| `FF02::2` | Wszystkie routery z aktywnym routingiem IPv6 |
| `FF02::1:FFxx:xxxx` | Solicited-node multicast (Neighbour Discovery) |
| `FF02::5` | Wszystkie routery OSPF |
| `FF02::9` | Wszystkie routery RIP |

---

## 9. Obliczanie liczby podsieci IPv6 z danego prefiksu

### Opis
Zadanie polega na obliczeniu, ile podsieci /64 (lub innego prefiksu docelowego) można wydzielić z przydzielonego prefiksu IPv6.

### Przykład z pliku (pytanie 24 / 65)
> Administrator otrzymał prefiks `2001:db8:3000::/52`. Ile podsieci może stworzyć?
>
> **Poprawna odpowiedź: 4096**

### Algorytm rozwiązania krok po kroku

**Krok 1 – Ustal prefiks wejściowy i docelowy**

- Prefiks przydzielony: `/52`
- Standardowy prefiks podsieci LAN: `/64`

**Krok 2 – Oblicz liczbę bitów do podziału**

```
Bity do podziału = prefiks_docelowy - prefiks_wejściowy
                 = 64 - 52 = 12 bitów
```

**Krok 3 – Oblicz liczbę podsieci**

```
Liczba podsieci = 2^12 = 4096  ✅
```

**Tabela pomocnicza:**

| Prefiks przydzielony | Cel | Bity | Liczba podsieci /64 |
|---|---|---|---|
| /48 | /64 | 16 | 65 536 |
| /52 | /64 | 12 | **4 096** |
| /56 | /64 | 8 | 256 |
| /60 | /64 | 4 | 16 |

> 💡 W IPv6 nie odejmujemy 2 (brak koncepcji adresu sieci i broadcast w kontekście liczenia podsieci – każda podsieć /64 jest w pełni użyteczna).

---

## 10. Identyfikacja adresów prywatnych (RFC 1918) i specjalnych IPv4

### Opis
Zadanie polega na wskazaniu, które spośród podanych adresów IPv4 należą do pul adresów prywatnych (wewnętrznych, nierutowalnych w Internecie) zdefiniowanych przez RFC 1918.

### Przykład z pliku (pytanie 71)
> Wskaż, które z poniższych adresów IP są adresami wewnętrznymi/prywatnymi:
> - `10.10.145.14` ✅
> - `192.168.134.122` ✅
> - `172.17.132.112` ✅
> - `100.168.54.12` ❌ (publiczny)
> - `172.172.21.34` ❌ (publiczny – poza zakresem 172.16–172.31)

### Zakresy adresów prywatnych RFC 1918 – zapamiętaj!

| Klasa | Zakres | Maska | Prefiks CIDR |
|---|---|---|---|
| A | `10.0.0.0` – `10.255.255.255` | 255.0.0.0 | /8 |
| B | `172.16.0.0` – `172.31.255.255` | 255.240.0.0 | /12 |
| C | `192.168.0.0` – `192.168.255.255` | 255.255.0.0 | /16 |

### Inne specjalne adresy IPv4

| Adres / zakres | Przeznaczenie |
|---|---|
| `127.0.0.0/8` | Loopback (127.0.0.1 – adres zwrotny) |
| `169.254.0.0/16` | APIPA – link-local (brak odpowiedzi DHCP) |
| `224.0.0.0/4` | Multicast (224.0.0.0 – 239.255.255.255) |
| `255.255.255.255` | Broadcast ograniczony |
| `0.0.0.0` | Adres nieokreślony |

> ⚠️ **Typowy błąd:** `172.172.x.x` **NIE jest** prywatny – zakres prywatny klasy B to **172.16 – 172.31**. Adres `172.32.x.x` i wyżej to adresy publiczne.

### Schemat weryfikacji adresu prywatnego

```
Czy pierwszy oktet = 10?           → TAK → PRYWATNY (klasa A)
Czy 172.16 ≤ adres ≤ 172.31?      → TAK → PRYWATNY (klasa B)
Czy pierwsze dwa oktety = 192.168? → TAK → PRYWATNY (klasa C)
W pozostałych przypadkach          →       PUBLICZNY (lub specjalny)
```

---

## 11. Identyfikacja typu transmisji na podstawie adresu docelowego

### Opis
Zadanie polega na rozpoznaniu typu transmisji (unicast, broadcast, multicast) na podstawie adresu docelowego pakietu IP lub ramki Ethernet.

### Przykład z pliku (pytanie 4)
> Transmisja wykorzystująca adres IPv4 z grupy od `224.0.0.0` do `239.255.255.255` to transmisja typu...
>
> **Poprawna odpowiedź: multicast**

### Tabela typów transmisji

| Typ | Adres IPv4 docelowy | Adres MAC docelowy | Odbiorcy |
|---|---|---|---|
| **Unicast** | Konkretny adres hosta | Konkretny MAC | Jeden host |
| **Broadcast** | `255.255.255.255` lub adres rozgłoszeniowy podsieci | `FF:FF:FF:FF:FF:FF` | Wszyscy w podsieci |
| **Multicast** | `224.0.0.0` – `239.255.255.255` | `01:00:5E:xx:xx:xx` | Wybrana grupa hostów |
| **Anycast** (tylko IPv6) | Adres anycast | dowolny | Najbliższy z grupy |

### Zakresy multicast – szczegóły

| Zakres IPv4 | Zastosowanie |
|---|---|
| `224.0.0.0/24` | Lokalny (np. OSPF: 224.0.0.5, RIP: 224.0.0.9) |
| `224.0.1.0` – `238.255.255.255` | Globalny multicast |
| `239.0.0.0/8` | Administracyjnie ograniczony (lokalny) |

| Adres IPv6 multicast | Zasięg | Znaczenie |
|---|---|---|
| `FF02::1` | Link-local | Wszystkie hosty IPv6 |
| `FF02::2` | Link-local | Wszystkie routery IPv6 |
| `FF05::2` | Site-local | Wszystkie routery w lokacji |

---

*Poradnik opracowany na podstawie pytań egzaminacyjnych z zakresu sieci komputerowych (poziom CCNA). Autor pytań źródłowych: Mateusz Banaszczyk.*
