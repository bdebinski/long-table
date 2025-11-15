# Long Table - Strona Internetowa

Nowoczesna strona wizytówka dla Agencji Cateringowo-Artystycznej Long Table.

## 📁 Struktura projektu

```
long-table-project/
├── index.html          # Główny plik HTML
├── css/
│   └── style.css      # Wszystkie style
├── js/
│   └── main.js        # Interakcje JavaScript
└── README.md          # Ten plik
```

## 🚀 Jak uruchomić lokalnie

1. **Pobierz cały folder** `long-table-project`
2. **Otwórz plik** `index.html` w przeglądarce (Chrome, Firefox, Edge)
3. Strona działa od razu - nie wymaga żadnej instalacji!

## 📤 Jak wrzucić na hosting

### Opcja A: Tani hosting (home.pl, cyberfolks.pl)

1. Zaloguj się do panelu hostingu (cPanel/DirectAdmin)
2. Przejdź do "Menedżer plików"
3. Znajdź folder `public_html` lub `www`
4. Usuń domyślne pliki (jeśli są)
5. Wgraj wszystkie pliki z folderu `long-table-project`:
   - index.html
   - folder css/
   - folder js/
6. Gotowe! Strona działa na Twojej domenie

### Opcja B: Darmowy hosting (Netlify)

1. Zaloguj się na [netlify.com](https://netlify.com)
2. Kliknij "Add new site" → "Deploy manually"
3. Przeciągnij cały folder `long-table-project`
4. Gotowe! Dostaniesz darmowy URL (możesz podpiąć swoją domenę)

## 🎨 Co można łatwo zmienić

### Zmiana kolorów

Otwórz `css/style.css` i w pierwszych liniach znajdziesz:

```css
:root {
    --primary-color: #1E3A8A;      /* Główny kolor (niebieski) */
    --secondary-color: #F59E0B;    /* Kolor akcentu (złoty) */
    --dark-bg: #0F172A;            /* Tło ciemne */
    --light-bg: #F8FAFC;           /* Tło jasne */
}
```

Zmień te wartości na inne kody kolorów.

### Zmiana tekstów

Wszystkie teksty są w pliku `index.html`. Otwórz go w edytorze (Notepad++, VSCode) i edytuj bezpośrednio.

### Dodanie logo

1. Przygotuj logo w formacie PNG (najlepiej z przezroczystym tłem)
2. Utwórz folder `images/` w głównym folderze
3. Wgraj tam plik `logo.png`
4. W `index.html` znajdź linię:
   ```html
   <span class="logo-text">Long Table</span>
   ```
5. Zamień na:
   ```html
   <img src="images/logo.png" alt="Long Table" style="height: 40px;">
   ```

### Zmiana zdjęcia w tle (Hero)

Obecnie używany jest gradient. Aby dodać zdjęcie:

1. Wgraj zdjęcie do folderu `images/` (np. `hero-bg.jpg`)
2. W `css/style.css` znajdź `.hero` i dodaj:
   ```css
   .hero {
       background-image: url('../images/hero-bg.jpg');
       background-size: cover;
       background-position: center;
   }
   ```

## 📧 Formularz kontaktowy

Obecnie formularz pokazuje tylko alert po wysłaniu. Aby działał naprawdę, masz 3 opcje:

### Opcja 1: PHP (wymaga hostingu z PHP)

Stwórz plik `send-email.php`:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    $to = "office@long-table.com.pl";
    $subject = "Nowa wiadomość ze strony";
    $body = "Imię: $name\nEmail: $email\nTelefon: $phone\n\nWiadomość:\n$message";
    
    mail($to, $subject, $body);
    echo "success";
}
?>
```

### Opcja 2: EmailJS (darmowe, bez PHP)

1. Zarejestruj się na [emailjs.com](https://www.emailjs.com/)
2. Dodaj template emaila
3. W `index.html` przed `</body>` dodaj:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
4. Postępuj według instrukcji EmailJS

### Opcja 3: Formspree (najprostsze)

1. Zarejestruj się na [formspree.io](https://formspree.io/)
2. W `index.html` zamień:
   ```html
   <form class="contact-form" id="contactForm">
   ```
   na:
   ```html
   <form class="contact-form" action="https://formspree.io/f/TWOJ_ID" method="POST">
   ```

## 🔧 Wsparcie techniczne

Jeśli masz pytania dotyczące:
- **Zmian treści** - edytuj `index.html`
- **Kolorów/wyglądu** - edytuj `css/style.css`
- **Funkcji JavaScript** - edytuj `js/main.js`

## 📱 Responsywność

Strona automatycznie dostosowuje się do:
- ✅ Komputerów (Desktop)
- ✅ Tabletów
- ✅ Telefonów (Mobile)

## 🌐 SEO

Strona jest zoptymalizowana pod SEO:
- ✅ Semantyczny HTML
- ✅ Meta tagi
- ✅ Alt teksty dla obrazków (gdy je dodasz)
- ✅ Szybkie ładowanie

## ⚡ Wydajność

- Żadnych external dependencies (poza fontami Google)
- Minimalny JavaScript
- Zoptymalizowany CSS
- Szybkie ładowanie (< 1 sekunda)

## 📞 Kontakt

W razie pytań:
- Email: office@long-table.com.pl
- Tel: +48 501 494 787

---

**Wersja:** 1.0  
**Data:** 2025  
**Technologie:** HTML5, CSS3, JavaScript (Vanilla)
