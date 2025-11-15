# 🚀 DEPLOYMENT GUIDE - Szczegółowa Instrukcja Wdrożenia

## Opcja 1: Hosting Tradycyjny (home.pl, cyberfolks.pl, nazwa.pl)

### Krok 1: Przygotowanie plików
1. Pobierz cały folder `long-table-project`
2. Upewnij się że masz wszystkie pliki:
   - index.html
   - folder css/ (z plikiem style.css)
   - folder js/ (z plikiem main.js)
   - folder images/ (pusty lub z twoimi zdjęciami)

### Krok 2: Logowanie do hostingu
1. Wejdź na stronę panelu (np. panel.home.pl)
2. Zaloguj się danymi które dostałeś od hostingu
3. Znajdź "cPanel" lub "DirectAdmin" lub "Menedżer plików"

### Krok 3: Upload przez Menedżer Plików
1. Wejdź do "Menedżer Plików"
2. Przejdź do folderu `public_html` lub `www` lub `httpdocs`
3. **UWAGA:** Jeśli są tam jakieś pliki (index.html, index.php) - usuń je
4. Kliknij "Prześlij" lub "Upload"
5. Wybierz wszystkie pliki z folderu `long-table-project`:
   - index.html
   - Przeciągnij folder css/
   - Przeciągnij folder js/
   - Przeciągnij folder images/

### Krok 4: Sprawdzenie struktury
Po uploadzeniu w `public_html` powinieneś mieć:
```
public_html/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── (twoje obrazy)
```

### Krok 5: Test
1. Wejdź na swoją domenę (np. long-table.com.pl)
2. Strona powinna się załadować!

---

## Opcja 2: Upload przez FTP (FileZilla)

### Krok 1: Pobierz FileZilla
1. Idź na [filezilla-project.org](https://filezilla-project.org/)
2. Pobierz FileZilla Client
3. Zainstaluj

### Krok 2: Dane FTP
Znajdź w mailu od hostingu:
- Host: ftp.twojadomena.pl
- Username: twojlogin
- Password: twojehaslo
- Port: 21

### Krok 3: Połączenie
1. Otwórz FileZilla
2. Wpisz dane FTP w górne pola
3. Kliknij "Quickconnect"

### Krok 4: Upload
1. Po lewej stronie: znajdź folder `long-table-project` na swoim komputerze
2. Po prawej stronie: przejdź do folderu `public_html`
3. Zaznacz wszystkie pliki po lewej
4. Przeciągnij na prawą stronę
5. Poczekaj aż upload się skończy

### Krok 5: Test
Wejdź na swoją domenę - powinno działać!

---

## Opcja 3: Netlify (DARMOWY HOSTING!)

### Dlaczego Netlify?
- ✅ Całkowicie darmowy
- ✅ Szybki globalny CDN
- ✅ Automatyczny SSL (HTTPS)
- ✅ Unlimited traffic
- ✅ Deploy w 2 minuty

### Krok 1: Rejestracja
1. Idź na [netlify.com](https://www.netlify.com/)
2. Kliknij "Sign up"
3. Zarejestruj się przez GitHub/Google (lub email)

### Krok 2: Deploy
1. Po zalogowaniu kliknij "Add new site" → "Deploy manually"
2. **Przeciągnij cały folder** `long-table-project` na stronę
3. Poczekaj 30 sekund
4. **Gotowe!** Dostaniesz URL typu: `random-name-123.netlify.app`

### Krok 3: Własna domena (opcjonalnie)
1. W Netlify kliknij "Domain settings"
2. "Add custom domain"
3. Wpisz `long-table.com.pl`
4. Netlify pokaże jakie DNS recordy dodać
5. Wejdź do panelu swojej domeny i dodaj te rekordy
6. Poczekaj 2-24h na propagację DNS
7. **Gotowe!** Twoja domena wskazuje na Netlify

---

## Opcja 4: GitHub Pages (Dla programistów)

### Krok 1: Stwórz repo
```bash
cd long-table-project
git init
git add .
git commit -m "Initial commit"
```

### Krok 2: Utwórz repo na GitHub
1. Idź na [github.com](https://github.com)
2. Kliknij "New repository"
3. Nazwa: `long-table-website`
4. Public
5. Create repository

### Krok 3: Push
```bash
git remote add origin https://github.com/twojnick/long-table-website.git
git branch -M main
git push -u origin main
```

### Krok 4: Włącz GitHub Pages
1. Settings → Pages
2. Source: "Deploy from branch"
3. Branch: main → /root
4. Save
5. Po 1-2 minutach strona będzie dostępna: `twojnick.github.io/long-table-website`

---

## 🔧 Troubleshooting

### Problem: Strona nie ładuje się
**Rozwiązanie:**
1. Sprawdź czy wszystkie pliki są w `public_html` (nie w podfolderze!)
2. Sprawdź czy plik nazywa się dokładnie `index.html` (nie Index.html ani index.HTML)
3. Poczekaj 5-10 minut (propagacja DNS)

### Problem: CSS nie działa
**Rozwiązanie:**
1. Sprawdź czy folder `css/` jest w tym samym miejscu co `index.html`
2. Otwórz konsolę przeglądarki (F12) i zobacz czy są błędy 404

### Problem: JavaScript nie działa
**Rozwiązanie:**
1. Sprawdź czy folder `js/` jest w tym samym miejscu co `index.html`
2. Sprawdź konsolę (F12) czy są błędy

### Problem: Formularz nie wysyła emaili
**To normalne!** Formularz potrzebuje backendu. Zobacz README.md sekcja "Formularz kontaktowy"

---

## ✅ Checklist przed deployment

- [ ] Wszystkie pliki są w folderze projektu
- [ ] Sprawdziłem stronę lokalnie (działa)
- [ ] Zaktualizowałem teksty/numery telefonu
- [ ] Dodałem logo (jeśli mam)
- [ ] Zoptymalizowałem obrazy (TinyPNG)
- [ ] Przetestowałem na telefonie (responsywność)

---

## 🌐 Po deployment

### 1. Test prędkości
- Idź na [PageSpeed Insights](https://pagespeed.web.dev/)
- Wklej swoją domenę
- Sprawdź score (powinno być 90+)

### 2. Test responsywności
- Otwórz stronę na telefonie
- Sprawdź czy wszystko działa
- Przetestuj hamburger menu

### 3. Test formularza
- Wypełnij formularz kontaktowy
- Sprawdź czy validation działa

### 4. Google Analytics (opcjonalnie)
Jeśli chcesz śledzić statystyki:
1. Utwórz konto Google Analytics
2. Dodaj tracking code przed `</head>` w index.html

---

## 🎯 Rekomendacja

**Dla klienta biznesowego:**
→ **Netlify** - darmowy, szybki, profesjonalny

**Jeśli klient ma już hosting:**
→ **Upload przez Menedżer Plików** - najprostsze

**Jeśli znasz Git:**
→ **GitHub Pages** - dla kontroli wersji

---

## 💡 Pro Tips

1. **Backup:** Zawsze zachowaj kopię plików lokalnie
2. **DNS:** Propagacja DNS może trwać do 24h (zazwyczaj 2h)
3. **SSL:** Większość hostingów daje darmowy SSL (Let's Encrypt)
4. **Cache:** Po zmianie plików wyczyść cache przeglądarki (Ctrl+F5)

---

## 📞 Pomoc

Jeśli coś nie działa:
1. Sprawdź konsolę przeglądarki (F12)
2. Sprawdź struktur folderów
3. Sprawdź uprawnienia plików (chmod 644 dla plików, 755 dla folderów)
4. Skontaktuj się z supportem hostingu

---

**Powodzenia! 🚀**
