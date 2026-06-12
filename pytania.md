# Sieci komputerowe i Internet

**Autor: Mateusz Banaszczyk**

---

## Pytania egzaminacyjne

---

**1.** Wskaż, która z poniższych usług pozwala komputerom posiadającym wewnętrzny adres IP na uzyskanie dostępu do komputerów znajdujących się w sieci Internet, i tym samym na korzystanie z zasobów sieci Internet:

- A. **NAT** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. DHCP
- C. NIC
- D. DNS
- E. ARP

---

**2.** Na którym interfejsie przełącznika administrator musiałby skonfigurować adres IP w taki sposób, aby można było zarządzać przełącznikiem zdalnie?

- A. VLAN 1 ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. vty 0
- C. FastEthernet0/1
- D. console 0

---

**3.** Po wydaniu w wierszu poleceń systemu operacyjnego MS Windows polecenia `ipconfig`, zauważył(a)eś, że jeden z interfejsów posiada przypisany adres IPv6: `FE80::D68C:B5FF:FECE:A0C0/64`. Biorąc pod uwagę powyższe, wskaż do jakiej grupy multicastowej tenże interfejs przystąpi na potrzeby obsługi protokołu *Neighbours Discovery*:

- A. FF02::D68C:B5FF:FECE:A0C0
- B. FE80::1:FFCE:A0C0
- C. **FF02::1:FFCE:A0C0** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 2001::D68C:B5FF:FECE:A0C0
- E. FF02::1

---

**4.** Transmisja wykorzystująca adres IPv4 z grupy od 224.0.0.0 do 239.255.255.255 to transmisja typu...

- A. broadcast
- B. unicast
- C. **multicast** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. point-to-point
- E. anycast

---

**5.** Który adres IPv6 jest najbardziej skróconą prawidłową wersją pełnego adresu `FE80:0:0:0:02AA:FF:FE9A:4CA3`?

- A. FE8::2AA:FF:FE9A:4CA3
- B. **FE80::2AA:FF:FE9A:4CA3** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. FE80:::0:2AA:FF:FE9A:4CA3
- D. FE80::0:2AA:FF:FE9A:4CA3

---

**6.** Wskaż, który adres IPv6 jest odpowiednikiem logicznym adresu IPv4 127.0.0.1:

- A. 0::/10
- B. **::1** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. FE80::1
- D. FF02:1
- E. ::

---

**7.** Mechanizm okna przesuwnego jest powiązany z protokołem:

- A. UDP
- B. **TCP** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. ARP
- D. ETHERNET
- E. IP

---

**8.** Wskaż zdanie prawdziwe w odniesieniu do informacji zaprezentowanych w wyniku wydania w ruterze polecenia `sh ip int br` (interfejsy: FastEthernet0/0 – unassigned/up, FastEthernet0/0.20 – 172.16.20.254/up, FastEthernet0/1 – unassigned/up, FastEthernet0/1.10 – 172.16.10.254/up, FastEthernet0/1.30 – 172.16.30.254/up, Serial0/0/0 – 198.160.130.6/up, Serial0/0/1 – unassigned/administratively down, Vlan1 – unassigned/administratively down):

- A. Dwa fizyczne interfejsy sieciowe nie zostały przez administratora tegoż rutera włączone poprzez odpowiednie polecenia konfiguracyjne
- B. Do tegoż rutera zostały podłączone 4 przewodowe media transmisyjne (tj. potocznie: 4 kable)
- C. **Ruter ten realizuje ruting pomiędzy trzema sieciami VLAN** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. Do rutera tego są aktualnie podłączone 2 domeny rozgłoszeniowe
- E. Interfejs FastEthernet0/1 posiada 2 adresy IP, które pochodzą z tej samej puli/klasy adresowej

---

**9.** Wskaż które adresy należą do tej samej sieci co poniższy adres IP: `128.177.198.2/20`

- A. 128.177.216.18
- B. **128.177.206.21** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. 128.177.190.34
- D. **128.177.193.221** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. 128.177.218.2

---

**10.** Przy włączonym IPv6 host musi wykryć adres MAC zamierzonego urządzenia przeznaczenia, z którym chce nawiązać komunikację. Który z poniższych jest adresem docelowym, jaki zostanie użyty przez hosta nadawcę w wiadomości Neighbour Solicitation (wiadomość protokołu Neighbour Discovery)?

- A. globalny adres unicast odbiorcy
- B. **adres grupowy solicited-node** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. adres łącza lokalnego odbiorcy
- D. adres grupowy all-node

---

**11.** Jaki jest cel istnienia numeru sekwencyjnego w nagłówku protokołu TCP:

- A. identyfikuje protokół warstwy sieci
- B. wskazuje aplikację, do której ma zostać przekazany segment
- C. **pozwala na ponowne złożenie segmentów w dane** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. wskazuje maksymalną ilość segmentów, jaka może zostać jednocześnie wysłana
- E. identyfikuje protokół warstwy aplikacji

---

**12.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `69.226.64.0/255.255.248.0`:

- A. **2046** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. 512
- C. 1024
- D. 524286
- E. 4096

---

**13.** Firma ma adres sieciowy `172.16.1.64` z maską podsieci `255.255.255.192`. Firma ta chce stworzyć dwie podsieci, które będą zawierały odpowiednio 10 hostów i 18 hostów. Które dwie sieci będą mogły spełnić podane warunki?

- A. 172.168.1.16/28 i 172.16.1.96/28
- B. **172.16.1.64/27 i 172.16.1.128/27** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. 172.16.1.64/29 i 172.16.1.128/29
- D. 172.16.1.128/28 i 172.16.1.192/28

---

**14.** Protokół UDP otrzymuje z warstwy aplikacji wiadomość, po czym dzieli ją na części nazywane:

- A. portami
- B. **datagramami** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. bitami
- D. pakietami
- E. ramkami

---

**15.** Transmisja, w której pojedynczy pakiet jest wysyłany do wszystkich stacji w tej samej klasie adresowej, nazywa się:

- A. Grupową (Multicast)
- B. Jednostkową (Unicast)
- C. **Rozgłoszeniem (Broadcast)** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. Do wszystkich (Allcast)
- E. Zwrotną (Ringcast)

---

**16.** Administrator używa kombinacji klawiszy Ctrl+Shift+6 na przełączniku po wprowadzeniu polecenia `ping`. Jaki jest cel użycia tych klawiszy?

- A. umożliwienie użytkownikowi uzupełnienie polecenia
- B. **przerwanie procesu wykonywania polecenia ping** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. restart procesu ping
- D. przejście do innego trybu konfiguracji

---

**17.** Które z poniższych stwierdzeń najlepiej opisuje mechanizm Tri-Band wykorzystywany w sieciach bezprzewodowych typu mesh?

- A. Tri-Band jest technologią umożliwiającą automatyczne przełączanie się urządzeń klienckich między trzema różnymi sieciami WiFi w celu zapewnienia najlepszej wydajności
- B. Tri-Band pozwala na dynamiczne przydzielanie mocy nadawczej między trzema punktami dostępowymi w sieci mesh
- C. Tri-Band jest mechanizmem umożliwiającym synchronizację trzech różnych sieci mesh w celu zapewnienia lepszego zasięgu
- D. **Tri-Band umożliwia równoczesne korzystanie przez punkty dostępowe z trzech pasm częstotliwości, co zwiększa dostępną przepustowość sieci, poprzez wykorzystanie osobnej częstotliwości na komunikację między punktami dostępowymi** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**18.** Który typ adresu używa przełącznik podczas podejmowania decyzji o przekazaniu ramki na odpowiedni port:

- A. **adres MAC odbiorcy** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. adres VLSM odbiorcy
- C. adres VLSM nadawcy
- D. adres IP odbiorcy

---

**19.** Wskaż, które z poniższych urządzeń przesyła/przekazuje dane z jednego urządzenia w sieci komputerowej do innego urządzenia docelowego w oparciu o adres MAC:

- A. **przełącznik** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. modem
- C. ruter
- D. koncentrator

---

**20.** Wskaż, który adres IPv6 jest odpowiednikiem logicznym adresu IPv4 127.0.0.1:

*(Patrz pytanie 6 – duplikat, pominięto)*

---

**21.** Administrator sieci wprowadza polecenie `service password-encryption` w trybie konfiguracji routera. Co jest realizowane poprzez to polecenie?

- A. **To polecenie uniemożliwia oglądanie haseł bieżącej konfiguracji** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. Ta komenda automatycznie szyfruje hasła w plikach konfiguracyjnych, które są aktualnie przechowywane w pamięci NVRAM
- C. To polecenie szyfruje hasła przy przesyłaniu przez szeregowe łącza WAN
- D. To polecenie włącza mocny algorytm szyfrowania dla polecenia enable secret password

---

**22.** Wskaż które adresy należą do tej samej sieci co poniższy adres IP: `116.56.81.66/22`. Wybierz wszystkie poprawne:

- A. 116.56.93.211
- B. **116.56.81.166** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. **116.56.82.122** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. **116.56.83.213** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**23.** Jaki wpływ ma użycie polecenia konfiguracyjnego `mdix auto` na interfejs Ethernet przełącznika?

- A. automatycznie wykrywa szybkość interfejsu
- B. automatycznie wykrywa ustawienia dupleksu
- C. automatycznie przydziela interfejsowi pierwszy wykryty adres MAC
- D. **automatycznie wykrywa typ kabla miedzianego** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**24.** Administrator oddziału firmy otrzymał prefiks IPv6 `2001:db8:3000::/52` od menedżera sieci korporacyjnej. Ile podsieci administrator może stworzyć?

- A. 2048
- B. 8192
- C. **4096** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 65536

---

**25.** Wskaż, który z poniższych adresów IPv6 jest prawidłowy:

- A. 2001:0DB8:1:ACAD:1:FE55:6789:B210:6C27
- B. 2001::ACAD::FE55:6789:B210
- C. 2001:0DB8:1:ACAD:FE55:67597
- D. **2001:0DB8:1:ACAD::FE55:6789:B210** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**26.** W sieciach komputerowych opartych na protokole TCP/IP, która informacja z poniższych jest używana przez router by przekazać pakiet z jednego interfejsu sieciowego routera na drugi (tj. zrealizować proces routingu)?

- A. źródłowy adres ARP
- B. źródłowy adres sieci
- C. **docelowy adres sieci** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. port docelowy
- E. docelowy adres MAC

---

**27.** Wskaż jakie funkcje zapewnia protokół ARP:

- A. **Odwzorowanie adresów IP na adresy MAC** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. **Utrzymywanie podręcznej pamięci odwzorowania** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. Definiowanie obszaru, w którym mogą wystąpić kolizje
- D. Wyszukiwanie zakresu adresów IP w danej sieci lokalnej

---

**28.** Co zrobi przełącznik warstwy drugiej, jeżeli docelowy adres MAC w otrzymanej ramce nie znajduje się w tablicy MAC?

- A. Roześle ramkę w trybie rozgłoszenia na wszystkie porty przełącznika
- B. **Przekaże ramkę na wszystkie porty z wyjątkiem portu, na który otrzymał ramkę** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. Zainicjuje zapytanie ARP

---

**29.** Wskaż, które dwie cechy są charakterystyczne dla protokołu UDP (w porównaniu do TCP):

- A. **Posiada mały narzut danych** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. Retransmituje zagubione dane
- C. **Zapewnia niższe opóźnienie/większą szybkość** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. Zarządza przepływem danych

---

**30.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `173.14.37.224/255.255.255.224`:

- A. 510
- B. 126
- C. 14
- D. **30** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**31.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `24.216.189.40/255.255.255.248`:

- A. 14
- B. 62
- C. **6** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 30

---

**32.** Wskaż które adresy należą do tej samej sieci co poniższy adres IP: `187.4.55.199/19`:

- A. **187.4.61.19** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. 187.4.71.167
- C. 187.4.64.201
- D. **187.4.33.33** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. 187.4.5.1

---

**33.** Komputer A posiada skonfigurowany adres IP 192.168.0.1/24, komputer B natomiast adres IP 192.168.1.1/24. Aby uniemożliwić komunikację (tj. wymianę pakietów IP) między tymi dwoma hostami, można by wykorzystać:

- A. koncentrator
- B. kabel typu prosty/niekrosowany
- C. kabel typu krosowany
- D. **router** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**34.** Połączenie w ramach medium transmisyjnego, w którym możliwe jest nadawanie lub odbieranie informacji naprzemiennie, określane jest jako:

- A. połączenie asynchroniczne
- B. połączenie współdzielone
- C. pełny dupleks
- D. **pół dupleks** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**35.** Pole TTL jest elementem nagłówka protokołu:

- A. **IP** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. ARP
- C. TCP
- D. ETHERNET
- E. UDP

---

**36.** Protokół odpowiedzialny za obsługę błędów i komunikatów sterujących w ramach warstwy sieci to protokół:

- A. PING
- B. IPX
- C. **ICMP** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. NAT
- E. ARP

---

**37.** Użytkownik dzwoni do biura pomocy, aby zgłosić, że po uruchomieniu stacja robocza z systemem Windows nie jest w stanie nawiązać połączenia z siecią oraz pojawia się okno "Połączenie o ograniczonej łączności lub brak łączności". Technik prosi użytkownika o wydanie polecenia `ipconfig /all`. Użytkownik podaje, że wyświetlony adres IP to 169.254.69.196 o masce podsieci 255.255.0.0 oraz że brakuje adresu IP serwera DNS. Wiedząc, że w podsieci stosowana jest pula adresowa 192.168.0.0/24, co jest przyczyną problemu?

- A. Został skonfigurowany na stacji roboczej niewłaściwy adres serwera DNS.
- B. Adres IP serwera DHCP nie został skonfigurowany na stacji roboczej.
- C. Karta sieciowa stacji roboczej uległa całkowitemu uszkodzeniu.
- D. Uruchomiony został przez kogoś w tej sieci nieuprawniony serwer DHCP, który przydzielił nieprawidłowe dane adresowe.
- E. **Stacja robocza nie jest w stanie uzyskać adresu IP z serwera DHCP.** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**38.** Po wykonaniu zmian konfiguracyjnych, administrator wydaje polecenie `copy running-config startup-config` na przełączniku Cisco. Jaki będzie rezultat wydanej komendy?

- A. Nowa konfiguracja będzie zapisana w pamięci flash.
- B. Zmiany konfiguracyjne będą usunięte i przywrócona zostanie oryginalna konfiguracja.
- C. Bieżący IOS będzie zamieniony na nowy plik konfiguracyjny.
- D. **Nowa konfiguracja będzie załadowana po zrestartowaniu przełącznika** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**39.** Wskaż jakie dwie funkcje zapewnia protokół ARP:

- A. Definiowanie obszaru, w którym mogą wystąpić kolizje
- B. Wyszukiwanie docelowego węzła znajdującego się poza siecią lokalną
- C. **Utrzymywanie podręcznej pamięci odwzorowania** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. **Odwzorowanie adresów IP na adresy MAC** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. Wyszukiwanie zakresu adresów IP w danej sieci lokalnej

---

**40.** Wskaż adresy należące do sieci: `33.22.245.206/22`:

- A. 33.22.242.12
- B. **33.22.247.234** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. **33.22.246.121** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 33.22.101.155

---

**41.** Wskaż, który z poniższych adresów IP można przypisać komputerowi w lokalnej sieci komputerowej w sposób zapewniający jego prawidłowe działanie:

- A. 127.155.13.16/24
- B. 224.12.12.2/24
- C. 258.54.112.3/24
- D. **172.25.16.254/24** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**42.** Wskaż, które z poniższych adresów IP są adresami wewnętrznymi/prywatnymi:

- A. 127.6.3.2
- B. **192.168.134.56** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. **10.187.145.234** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. **172.23.43.12** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. 172.172.21.34
- F. 11.23.54.12

---

**43.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `13.178.126.0/255.255.254.0`:

- A. 4096
- B. 1024
- C. **510** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 65534

---

**44.** Firma ma adres sieciowy `172.16.1.64` z maską podsieci `255.255.255.192`. Firma ta chce stworzyć dwie podsieci, które będą zawierały odpowiednio 10 hostów i 18 hostów. Które dwie sieci będą mogły spełnić podane warunki?

- A. 172.16.1.128/28 i 172.16.1.192/28
- B. 172.16.1.64/29 i 172.16.1.128/29
- C. 172.168.1.16/28 i 172.16.1.96/28
- D. **172.16.1.64/27 i 172.16.1.128/27** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**45.** Urządzenie z włączonym IPv6 wysyła pakiet danych z adresem docelowym `FF02::1`. Jaki jest cel tego pakietu?

- A. wszystkie przełączniki ze skonfigurowanym IPv6 na łączu lokalnym
- B. wszystkie serwery DHCP IPv6
- C. wszystkie routery ze skonfigurowanym IPv6 na łączu lokalnym
- D. **wszystkie hosty z włączonym IPv6 dla swojego interfejsu połączenia z siecią lokalną** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. wszystkie routery ze skonfigurowanym IPv6 w sieci

---

**46.** Protokół UDP aby przesłać wiadomość otrzymaną od protokołu warstwy aplikacji do odpowiedniej aplikacji na urządzeniu docelowym, używa:

- A. numeru sekwencyjnego
- B. **numeru portu** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. adresu MAC
- D. adresu ARP
- E. adresu IP

---

**47.** Której części adresu warstwy sieci używa router podczas wyznaczania ścieżki (tj. podczas realizacji procesu routingu)?

- A. Adres publiczny
- B. Adres routera
- C. Adres serwera
- D. **Adres sieci** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. Adres hosta

---

**48.** Wskaż zdanie prawdziwe w odniesieniu do poniżej zawartej tablicy rutingu wyświetlonej w komputerze z systemem MS Windows (sieć lokalna 192.168.1.0/24):

- A. Komputer ten posiada 3 fizyczne interfejsy sieciowe
- B. **Komputer ten pracuje/działa w sieci lokalnej wykorzystującej pulę adresową 192.168.1.0/24** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. System operacyjny w tymże komputerze ma skonfigurowaną bramę domyślną o adresie IP 192.168.1.11
- D. Komputer ten pracuje/działa w sieci lokalnej wykorzystującej pulę adresową 224.0.0.0/8

---

**49.** Komputer PC1 wysyła ramkę z docelowym adresem MAC ustawionym na FF:FF:FF:FF:FF:FF – ramka ta trafia do przełącznika. Wskaż jaką akcję podejmie przełącznik odnośnie powyższej ramki:

- A. Przełącznik prześle ramkę dalej tylko tym portem, do którego przyłączony jest komputer posiadający adres MAC FF:FF:FF:FF:FF:FF
- B. Przełącznik unicestwi ramkę i nie prześle jej do żadnego urządzenia, ponieważ ramka posiada nieprawidłowy docelowy adres MAC
- C. **Przełącznik prześle ramkę do wszystkich komputerów podłączonych do tego przełącznika, za wyjątkiem komputera PC1** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. Przełącznik prześle ramkę do bramy, ponieważ urządzenie docelowe znajduje się poza siecią lokalną

---

**50.** Ile bitów musi być pożyczone z części adresu hosta, aby zaadresować router z pięcioma podłączonymi sieciami?

- A. cztery
- B. pięć
- C. **trzy** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. dwa

---

**51.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `23.24.137.124/255.255.255.224`:

- A. **30** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. 126
- C. 6
- D. 510

---

**52.** Urządzenie z włączonym protokołem IPv6 wysyła pakiet danych z adresem docelowym `FF02::2`. Jaki jest cel tego pakietu?

- A. wszystkie routery ze skonfigurowanym adresem IPv6 w sieci
- B. **wszystkie routery z aktywnym/włączonym routingiem IPv6** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. wszystkie hosty z włączonym IPv6 dla swojego interfejsu połączenia z siecią lokalną

---

**53.** Wskaż, który z poniższych adresów IPv6 jest prawidłowy:

- A. 2001:0DB8:1:ACAD:FE55:67897
- B. 2001:0DB8A:ACAD:BB55:67897
- C. 3001:ACAD:1:ACAD:AE55:5589:A210
- D. 2001:0AB8:1:ACAD:1:FE55:6789:B210:6C27
- E. 3001:0KB8:KKKK:BB55:6787
- F. **3001:ACAD::FE55:6789:B210** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**54.** Wskaż, które dwie cechy są charakterystyczne dla protokołu UDP (w porównaniu z protokołem TCP):

- A. **Pozwala uzyskać mniejsze opóźnienie transmisji danych** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. Pozwala uzyskać niezawodną transmisję danych
- C. Umożliwia retransmisję zagubionych datagramów
- D. **Pozwala uzyskać większą prędkość transmisji, ze względu na mniejszy narzut danych w nagłówkach** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**55.** Wskaż, który z poniższych adresów IPv6 jest prawidłowy:

- A. 2001:0DB8:1:ACAD:FE55:67897
- B. 2001::ACAD::FE55:6789:B210
- C. 2001:0DB8:1:ACAD:FE55:67597
- D. **2001:0DB8:1:ACAD::FE55:6789:B210** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**56.** Które z poniższych stwierdzeń najlepiej opisuje standard WiFi 6E w sieciach bezprzewodowych?

- A. WiFi 6E to standard, który wprowadza nową metodę szyfrowania danych w sieciach bezprzewodowych
- B. WiFi 6E jest rozszerzeniem standardu WiFi 5, które oferuje lepszą wydajność w paśmie 5 GHz
- C. WiFi 6E jest technologią umożliwiającą połączenia bezprzewodowe w sieciach mesh bez konieczności stosowania kabli Ethernet
- D. **WiFi 6E jest wersją standardu WiFi 6, która obsługuje pasmo częstotliwości 6 GHz, oferując większą przepustowość i mniejsze zakłócenia** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**57.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `11.77.192.0/255.255.254.0`:

- A. 4094
- B. 131070
- C. **510** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 2046

---

**58.** Potrzebujesz uruchomić stronę internetową opartą na CMS WordPress. Strona ta ma finalnie działać pod adresem `supcio.pl`, przy czym aktualnie nie możesz zakupić tejże domeny. Już ma być ta witryna przygotowywana przez zespół projektowy składający się z 3 osób. Co można zrobić, aby mimo braku możliwości wykupienia już tejże domeny DNS, umożliwić osobom w zespole projektowym pracę z tą witryną z ich służbowych komputerów?

- A. **W komputerach członków zespołu projektowego wpisać do tzw. pliku "hosts" domenę supcio.pl nakierowaną na adres IP serwera ze stroną internetową** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. W komputerach członków zespołu projektowego wpisać do tzw. pliku "dns.conf" domenę supcio.pl nakierowaną na adres IP serwera ze stroną internetową
- C. W ruterze wykorzystywanym przez firmę wpisać w sekcji ustawień dot. DNS domenę supcio.pl nakierowaną na adres IP serwera ze stroną internetową
- D. W komputerach członków zespołu projektowego w wykorzystywanej przez nich przeglądarce internetowej wpisać w sekcji ustawień dot. DNS domenę supcio.pl nakierowaną na adres IP serwera ze stroną internetową

---

**59.** Wskaż które adresy należą do tej samej sieci co poniższy adres IP: `11.56.78.139/21`:

- A. 11.56.73.13
- B. **11.56.71.212** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. 11.56.80.9
- D. **11.56.79.14** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. 11.56.68.112

---

**60.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `29.112.132.0/255.255.255.192`:

- A. 30
- B. 126
- C. 512
- D. **62** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**61.** Wskaż, który adres IPv6 jest najbardziej skróconą prawidłową wersją pełnego adresu `FE80:0:0:0:02AA:FF:FE9A:4CA3`:

- A. FE80::0:2AA:FF:FE9A:4CA3
- B. **FE80::2AA:FF:FE9A:4CA3** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. FE8::2AA:FF:FE9A:4CA3
- D. FE80:::0:2AA:FF:FE9A:4CA3

---

**62.** Wskaż które adresy należą do tej samej sieci co poniższy adres IP: `17.14.55.199/19`:

- A. **17.14.61.19** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. 17.14.64.201
- C. **17.14.33.33** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 17.14.71.167

---

**63.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `23.24.137.124/255.255.255.224`:

*(Patrz pytanie 51 – duplikat, pominięto)*

---

**64.** Który z poniższych nie jest typem rekordu usługi DNS:

- A. A
- B. **TTL** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. MX
- D. CNAME
- E. SRV

---

**65.** Administrator oddziału firmy otrzymał prefiks IPv6 `2001:db8:3000::/52` od menedżera sieci korporacyjnej. Ile podsieci administrator może stworzyć na bazie otrzymanego prefiksu?

- A. 65536
- B. 1024
- C. **4096** ✅ **[POPRAWNA ODPOWIEDŹ]**
- D. 8192

---

**66.** Jednym z rodzajów transmisji danych w sieciach komputerowych opartych na protokole TCP/IP jest transmisja typu:

- A. równoległego
- B. multipleksacyjnego
- C. onecast
- D. **jednostkowego (unicast)** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**67.** Której części adresu warstwy sieci używa router podczas wyznaczania ścieżki/trasy (tj. podczas realizacji procesu routingu)?

- A. Docelowego adresu routera
- B. Części hosta docelowego adresu IP
- C. Źródłowego adresu MAC
- D. **Części sieci docelowego adresu IP** ✅ **[POPRAWNA ODPOWIEDŹ]**

---

**68.** Wskaż maksymalną ilość hostów, jaką można zaadresować w ramach klasy adresowej `11.77.192.0/255.255.254.0`:

*(Patrz pytanie 57 – duplikat, pominięto)*

---

**69.** Wskaż które adresy należą do tej samej sieci co poniższy adres IP (adres nieokreślony w pytaniu – sieć z /22):

*(Brak pełnych danych – pytanie #288 z e-Kolos dotyczyło adresu bez podanego prefiksu)*

---

**70.** Ile domen rozgłoszeniowych jest na schemacie? (schemat z 3 ruterami i przełącznikami – link: imgur.com/BkAWICh)

- A. **3** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. 2
- C. 4
- D. 5
- E. 9

---

**71.** Wskaż, które z poniższych adresów IP są adresami wewnętrznymi/prywatnymi (z puli RFC 1918):

- A. **10.10.145.14** ✅ **[POPRAWNA ODPOWIEDŹ]**
- B. **192.168.134.122** ✅ **[POPRAWNA ODPOWIEDŹ]**
- C. 100.168.54.12
- D. **172.17.132.112** ✅ **[POPRAWNA ODPOWIEDŹ]**
- E. 127.168.131.112
- F. 172.172.21.34
- G. 172.10.10.10

---

---

*Dokument zawiera pytania zebrane ze zdjęć ekranowych testu końcowego oraz platformy e-Kolos. Duplikaty zostały wyeliminowane. Poprawne odpowiedzi oznaczone są symbolem ✅ oraz dopiskiem [POPRAWNA ODPOWIEDŹ].*
