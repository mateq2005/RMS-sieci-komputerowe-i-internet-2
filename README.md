# 🌐 Sieci Komputerowe i Internet

**Autor:** Mateusz Banaszczyk

---

## 📋 Spis Treści

- [O Projekcie](#o-projekcie)
- [Struktura Projektu](#struktura-projektu)
- [Zawartość](#zawartość)
- [Jak Używać](#jak-używać)
- [Funkcjonalności](#funkcjonalności)
- [Instalacja](#instalacja)
- [Technologia](#technologia)
- [Licencja](#licencja)

---

## 💡 O Projekcie

Projekt łączy **kompleksowy poradnik edukacyjny** z **interaktywną aplikacją quizową** dedykowaną do nauki sieci komputerowych i Internetu. Materiał zawiera szczegółowe wyjaśnienia teorii oraz praktyczne pytania testowe z grafikami poglądowymi.

Aplikacja jest idealna do:
- 📚 Nauki adresacji IPv4 i IPv6
- 🧪 Testowania wiedzy poprzez quiz
- 🎓 Przygotowania do egzaminów z sieci komputerowych
- 💻 Zrozumienia fundamentów TCP/IP

---

## 📁 Struktura Projektu

```
sieci-komputerowe-i-internet-main/
├── index.html              # Główny plik aplikacji quizowej
├── style.css               # Style CSS dla interfejsu
├── script.js               # Logika aplikacji quizowej
├── pytania.json            # Baza pytań (format JSON)
├── pytania/                # Folder z grafikami i zrzutami ekranu
│   ├── 10~3.png
│   ├── 9_2~3.png
│   ├── BkAWICh~3.jpeg
│   ├── Screenshot_20260614-114541.Chrome~2.png
│   ├── Screenshot_20260614-131635.GitHub~2.png
│   ├── Zrzut ekranu (2)~3.png
│   ├── Zrzut ekranu (6) (2)~3.png
│   ├── Zrzut ekranu (9) (1)~2.png
│   ├── Zrzut ekranu (9)~3.png
│   └── firefox_yFP7OUkYTN~2.png
├── adresacja.md            # Poradnik - Adresacja IPv4 i IPv6
└── README.md               # Ten plik
```

---

## 📚 Zawartość

### 📖 Poradnik: Adresacja IPv4 i IPv6 (`adresacja.md`)

Kompleksowy przewodnik obejmujący:

1. **Obliczanie maksymalnej liczby hostów w podsieci IPv4**
   - Przeliczanie maski na CIDR
   - Wzór: Liczba hostów = 2^(32 - prefiks) - 2

2. **Wyznaczanie adresu sieci i zakresu podsieci**
   - Przynależność hosta do sieci
   - Praktyczne przykłady z obliczeniami

3. **Projektowanie podsieci VLSM**
   - Dobór maski do wymagań
   - Optymalizacja przestrzeni adresowej

4. **Obliczanie liczby bitów do podziału sieci**
   - Algorytm rozwiązania krok po kroku
   - Tabele referencyjne

5. **Skracanie (kompresja) adresów IPv6**
   - Reguły kompresji
   - Praktyczne przykłady

6. **Walidacja poprawności adresów IPv6**
   - Struktura i format
   - Identyfikacja błędów

7. **Adres loopback IPv6**
   - Odpowiedniki logiczne adresów IPv4
   - Zastosowania praktyczne

8. **Adresy multicast IPv6**
   - Grupy Neighbour Discovery
   - Obliczanie grup adresowych

9. **Obliczanie liczby podsieci IPv6**
   - Wyznaczanie prefiksu
   - Praktyczne scenariusze

10. **Identyfikacja adresów prywatnych (RFC 1918)**
    - Zakresy prywatne
    - Adresy specjalne IPv4

11. **Identyfikacja typu transmisji**
    - Unicast, Broadcast, Multicast
    - Charakterystyka każdego typu

### 🎯 Aplikacja Quizowa

Interaktywna aplikacja webowa zawierająca:

- **Ponad 100+ pytań** z zakresu sieci komputerowych
- **Pytania wielokrotnego wyboru** z obsługą odpowiedzi wielokrotnych
- **Graficzne poglądówki** w folderze `pytania/`
- **Interfejs responsywny** dostosowany do urządzeń mobilnych
- **System śledzenia postępu** z wizualnym paskiem postępu
- **Natychmiastowa informacja zwrotna** o poprawności odpowiedzi
- **Możliwość pominięcia pytań** bez kary
- **Statystyki ukończenia** z podsumowaniem wyników

---

## 🚀 Jak Używać

### 1. Nauka Poprzez Poradnik

Otwórz plik `adresacja.md` i przeczytaj poszczególne sekcje:
- Każda sekcja zawiera **opis**, **przykład**, **algorytm** i **tabelę referencyjną**
- Zapoznaj się z przykładami obliczeniowymi
- Spróbuj samodzielnie rozwiązać podane zadania

### 2. Testowanie Wiedzy w Quiz

1. Otwórz plik `index.html` w przeglądarce internetowej
2. Przeczytaj pytanie uważnie
3. Wybierz odpowiedź(-i) z dostępnych opcji
4. Zatwierdź odpowiedź lub pomiń pytanie
5. Otrzymaj natychmiastową informację zwrotną
6. Przejdź do następnego pytania
7. Na koniec zobacz podsumowanie wyników

### 3. Przeglądanie Grafik

Folder `pytania/` zawiera screenshoty i diagramy poglądowe:
- Zrzuty ekranu z konfiguracji sieciowych
- Grafiki demonstracyjne
- Diagramy techniczne

---

## ⚙️ Funkcjonalności

### Główne Cechy Aplikacji

✅ **Responsywny Interfejs**
- Działa na komputerach, tabletach i telefonach
- Nowoczesny design z animacjami

✅ **Inteligentna Baza Pytań**
- Format JSON dla łatwej edycji
- Obsługa wielokrotnych poprawnych odpowiedzi
- Łatwa rozbudowa

✅ **Śledzenie Postępu**
- Pasek postępu z procentem ukończenia
- Licznik pytań (np. "5/100")
- Tracking poprawnych odpowiedzi

✅ **System Feedback**
- Natychmiastowe potwierdzenie lub korekta
- Wizualne wskaźniki poprawności (zielony/czerwony)
- Motywujące wiadomości

✅ **Elastyczność**
- Możliwość pominięcia pytania
- Przycisk restartu dla ponownego rozwiązania
- Obsługa błędów wczytywania

✅ **Dane Statyczne**
- Brak zależności od serwera
- Całkowicie funkcjonalne offline
- Szybkie ładowanie

---

## 💻 Instalacja

### Wymagania Minimalne

- Przeglądarka internetowa (Chrome, Firefox, Safari, Edge)
- Dostęp do poradnika Markdown
- JavaScript włączony w przeglądarce

### Kroki Instalacji

#### Opcja 1: Lokalne Pliki

1. Rozpakuj archiwum ZIP
2. Otwórz plik `index.html` bezpośrednio w przeglądarce
3. Czytaj poradnik `adresacja.md` w edytorze tekstu lub notatniku

#### Opcja 2: Serwer HTTP (Rekomendowane dla najlepszych wyników)

```bash
# Przy użyciu Python 3
python -m http.server 8000

# Lub Node.js z http-server
npx http-server
```

Następnie otwórz: `http://localhost:8000`

---

## 🛠️ Technologia

### Frontend

| Technologia | Opis |
|---|---|
| **HTML5** | Struktura semantyczna |
| **CSS3** | Nowoczesne style, animacje, responsywność |
| **Vanilla JavaScript** | Brak zależności, czysta logika aplikacji |
| **JSON** | Format danych pytań |

### Architektura

- **Klasa `QuizApp`** - główna logika aplikacji
- **Dynamiczne renderowanie** - wygenerowanie zawartości na podstawie JSON
- **Event-driven** - oparte na zdarzeniach interfejsu

### Funkcje Kluczowe

```javascript
- loadQuestions()      // Wczytanie pytań z JSON
- displayQuestion()    // Wyświetlenie pytania
- submitAnswer()       // Walidacja odpowiedzi
- nextQuestion()       // Przejście do następnego
- skipQuestion()       // Pominięcie pytania
- completeQuiz()       // Zakończenie quizu
```

---

## 📊 Format Danych Pytań

Plik `pytania.json` zawiera tablicę obiektów:

```json
[
  {
    "pytanie": "Treść pytania...",
    "odpowiedzi": ["opcja 1", "opcja 2", "opcja 3", "opcja 4"],
    "poprawne_odpowiedzi": ["opcja 1", "opcja 3"]
  }
]
```

### Pola:
- **pytanie**: Tekst pytania (string)
- **odpowiedzi**: Tablica możliwych odpowiedzi (array)
- **poprawne_odpowiedzi**: Tablica poprawnych odpowiedzi (array, obsługuje wielokrotne)

---

## 🎨 Interfejs Aplikacji

### Stany Aplikacji

1. **Loading State** - Ładowanie pytań
2. **Quiz State** - Główny quiz z pytaniami
3. **Completion State** - Gratulacje i statystyki
4. **Error State** - Komunikat błędu

### Elementy UI

- **Nagłówek** - Logo i tagline "Miłej nauki!"
- **Karta Pytania** - Pytanie + opcje odpowiedzi
- **Pasek Postępu** - Wizualizacja postępu
- **Przyciski Akcji** - Zatwierdź, Następne, Pomiń
- **Feedback** - Informacja o poprawności
- **Podsumowanie** - Statystyki końcowe

---

## 📝 Przykład Pytania

```
Pytanie: "Wskaż maksymalną ilość hostów, jaką można zaadresować 
         w ramach klasy adresowej 69.226.64.0/255.255.248.0"

Opcje:
□ 2046  ← Poprawna odpowiedź
□ 512
□ 1024
□ 524286
□ 4096

Wyjaśnienie:
/21 = 32 - 21 = 11 bitów hosta
2^11 - 2 = 2048 - 2 = 2046 hostów
```

---

## 🎯 Zastosowania Edukacyjne

### Dla Studentów

- 📚 Przygotowanie do egzaminów
- 🧠 Utrwalanie wiedzy
- ✅ Samodzielne testowanie

### Dla Nauczycieli

- 📋 Materiał dodatkowy do lekcji
- 🎓 Quiz dla uczniów
- 📊 Możliwość rozszerzenia bazy pytań

### Dla Specjalistów IT

- 🔄 Odświeżanie wiedzy
- 💼 Przygotowanie do certyfikacji
- 🏆 Self-assessment

---

## 📈 Możliwości Rozszerzenia

Projekt można łatwo rozwinąć:

- ➕ Dodanie nowych pytań do `pytania.json`
- 🎨 Personalizacja wyglądu w `style.css`
- ⚙️ Dodanie nowych funkcji w `script.js`
- 📚 Rozszerzenie poradnika w `adresacja.md`
- 📸 Wzbogacenie o dodatkowe grafiki

---

## 🌟 Cechy Specjalne

- ✨ **Brak Zależności Zewnętrznych** - Pure JavaScript
- 🔒 **Prywatność** - Wszystkie dane lokalne
- 📱 **Mobile-First** - Responsywny design
- 🚀 **Wydajność** - Szybkie ładowanie
- ♿ **Dostępność** - Semantyczny HTML

---

## 📞 Informacje o Autorze

**Mateusz Banaszczyk**

- 👨‍💻 Autor poradnika i aplikacji
- 📚 Edukator z zakresu sieci komputerowych
- 🔧 Deweloper aplikacji webowych

---

## 📄 Licencja

Projekt jest dostępny na potrzeby edukacyjne.

**Copyright © 2026 mateq2005**

---

## 🤝 Wsparcie i Feedback

Jeśli masz pytania lub sugestie dotyczące:
- Treści poradnika
- Funkcjonalności aplikacji
- Dodatkowych pytań
- Błędów lub problemów

Skontaktuj się z autorem poprzez GitHub lub inne kanały komunikacji.

---

## 📚 Dodatkowe Zasoby

### Rekomendowane Tematy do Nauki

1. Model OSI i TCP/IP
2. Protokół Ethernet
3. Routing i routing statyczny
4. Protokoły transportu (TCP/UDP)
5. DNS i DHCP
6. NAT i Port Forwarding
7. Sieci bezprzewodowe
8. Bezpieczeństwo sieciowe

### Powiązane Tematy

- 🔐 Cybersecurity
- ☁️ Cloud Networking
- 🌐 Web Technologies
- 📡 IoT Networks
- 🔧 Network Administration

---

## 🎓 Podsumowanie

Projekt **"Sieci Komputerowe i Internet"** stanowi kompleksowe narzędzie do nauki i testowania wiedzy z zakresu sieci komputerowych. Łączy teorię zawartą w poradniku z praktyką poprzez interaktywną aplikację quizową, oferując efektywny sposób przyswajania skomplikowanego materiału.

**Powodzenia w nauce! 🚀**

---

*Ostatnia aktualizacja: 14 czerwca 2026*
