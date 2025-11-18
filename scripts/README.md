# 🖼️ Generator Galerii - Long Table

Automatyczne narzędzia do generowania danych galerii zdjęć na podstawie struktury folderów.

## 📁 Struktura Folderów

```
long-table/
├── images/
│   ├── nasze_propozycje/    → Kategoria: all, catering
│   ├── menu/                → Kategoria: food
│   ├── Lodowe/              → Kategoria: ice-sculptures
│   ├── czekoladowafontanna/ → Kategoria: desserts
│   ├── zestawyupominkowe/   → Kategoria: gifts
│   ├── Pirotechnika/        → Kategoria: events
│   ├── AkademiaBaru/        → Kategoria: events
│   ├── galeria/             → Kategoria: all
│   └── palac/               → Kategoria: events
├── js/
│   ├── gallery.js           → Główny skrypt galerii
│   ├── gallery-data.js      → Automatycznie generowane dane (Python)
│   └── gallery-simple.js    → Automatycznie generowane dane (Bash)
└── scripts/
    ├── generate-gallery.py   → Skrypt Python (zaawansowany)
    ├── generate-gallery.sh   → Skrypt Bash (prosty)
    ├── gallery-config.json   → Konfiguracja kategorii
    └── README.md             → Ten plik
```

## 🚀 Sposób użycia

### Opcja 1: Skrypt Python (Zalecany)

**Wymagania:**
- Python 3.6 lub nowszy

**Uruchomienie:**

```bash
# Z katalogu głównego projektu
python3 scripts/generate-gallery.py

# Lub bezpośrednio
cd scripts
./generate-gallery.py
```

**Co robi skrypt Python:**
- Skanuje wszystkie foldery w `images/` zgodnie z konfiguracją
- Kategoryzuje zdjęcia według mapowania w `CATEGORY_MAPPING`
- Generuje `js/gallery-data.js` (JavaScript)
- Generuje `gallery-data.json` (JSON)
- Wyświetla statystyki znalezionych zdjęć

**Tryby skanowania:**
1. **Tylko główne foldery** - skanuje tylko bezpośrednie pliki w folderach
2. **Rekursywnie** - skanuje także podfoldery

### Opcja 2: Skrypt Bash (Prosty)

**Wymagania:**
- Bash (Linux/macOS)
- Narzędzie `find`

**Uruchomienie:**

```bash
# Nadaj uprawnienia wykonywania (jednorazowo)
chmod +x scripts/generate-gallery.sh

# Uruchom skrypt
./scripts/generate-gallery.sh
```

**Co robi skrypt Bash:**
- Skanuje wybrane foldery w `images/`
- Generuje `js/gallery-simple.js`
- Prostszy, ale szybszy niż wersja Python

---

## 📝 Konfiguracja Kategorii

Edytuj plik `scripts/gallery-config.json` aby dostosować kategorie:

```json
{
  "categories": {
    "all": {
      "name": "Wszystkie",
      "display_name": "Wszystkie",
      "folders": ["nasze_propozycje", "galeria"]
    },
    "food": {
      "name": "Potrawy",
      "display_name": "Potrawy",
      "folders": ["menu"]
    }
  }
}
```

Lub edytuj bezpośrednio `CATEGORY_MAPPING` w skrypcie Python:

```python
CATEGORY_MAPPING = {
    'nasze_propozycje': 'all',
    'menu': 'food',
    'Lodowe': 'ice-sculptures',
    # ...
}
```

---

## 🎯 Jak dodać nowe zdjęcia

### Metoda 1: Do istniejącej kategorii

1. **Wrzuć zdjęcia** do odpowiedniego folderu:
   ```bash
   # Przykład: dodaj zdjęcia potraw
   cp mojezdj1.jpg mojezdj2.jpg images/menu/
   ```

2. **Uruchom generator:**
   ```bash
   python3 scripts/generate-gallery.py
   ```

3. **Gotowe!** Zdjęcia pojawią się automatycznie w galerii

### Metoda 2: Nowa kategoria

1. **Utwórz nowy folder** w `images/`:
   ```bash
   mkdir images/nowa_kategoria
   ```

2. **Dodaj zdjęcia** do folderu:
   ```bash
   cp *.jpg images/nowa_kategoria/
   ```

3. **Zaktualizuj konfigurację** w `generate-gallery.py`:
   ```python
   CATEGORY_MAPPING = {
       # ... istniejące ...
       'nowa_kategoria': 'nazwa-kategorii',
   }
   ```

4. **Uruchom generator:**
   ```bash
   python3 scripts/generate-gallery.py
   ```

5. **Zaktualizuj filtry w HTML** (`gallery.html`):
   ```html
   <button class="filter-btn" data-filter="nazwa-kategorii">
       Nowa Kategoria
   </button>
   ```

---

## 🔧 Integracja z gallery.js

### Aktualizacja gallery.js aby używał wygenerowanych danych

Otwórz `js/gallery.js` i zmień na początku pliku:

```javascript
// Zamiast ręcznej listy:
// const allImages = ['longtable_001.jpg', ...];

// Użyj wygenerowanych danych:
// (Najpierw dodaj <script src="gallery-data.js"></script> w gallery.html)

const allImages = galleryData.all || allGalleryImages;
const basePath = '';  // Ścieżka jest już w danych

// Lub dla bardziej zaawansowanej wersji z filtrami:
let currentCategory = 'all';
const getFilteredImages = () => {
    if (currentCategory === 'all') {
        return allGalleryImages;
    }
    return galleryData[currentCategory] || [];
};
```

### Dodaj skrypt w gallery.html

```html
<head>
    <!-- ... inne skrypty ... -->
    <script src="js/gallery-data.js"></script>
    <script src="js/gallery.js"></script>
</head>
```

---

## 📊 Format Wygenerowanych Danych

### JavaScript (gallery-data.js)

```javascript
const galleryData = {
    'all': [
        {
            filename: 'longtable_001.jpg',
            path: 'images/nasze_propozycje/longtable_001.jpg',
            category: 'all',
            folder: 'nasze_propozycje'
        },
        // ...
    ],
    'food': [
        // ...
    ]
};

const allGalleryImages = Object.values(galleryData).flat();
```

### JSON (gallery-data.json)

```json
{
  "categories": {
    "all": [ /* ... */ ],
    "food": [ /* ... */ ]
  },
  "all_images": [ /* wszystkie */ ],
  "stats": {
    "total_images": 150,
    "categories_count": 7
  }
}
```

---

## 🎨 Wspierane formaty obrazów

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

---

## 💡 Wskazówki

1. **Optymalizuj zdjęcia** przed dodaniem (kompresja, rozmiar)
2. **Używaj spójnych nazw** plików (np. `category_001.jpg`)
3. **Nie commituj** dużych zdjęć do Git (użyj Git LFS)
4. **Uruchamiaj generator** po każdej zmianie w folderach
5. **Testuj lokalnie** przed wdrożeniem

---

## 🐛 Rozwiązywanie problemów

### Skrypt Python nie znajduje obrazów

```bash
# Sprawdź czy folder istnieje
ls -la images/nasze_propozycje/

# Sprawdź uprawnienia
chmod 755 scripts/generate-gallery.py
```

### Skrypt Bash - permission denied

```bash
chmod +x scripts/generate-gallery.sh
```

### Zdjęcia nie pojawiają się w galerii

1. Sprawdź czy plik `gallery-data.js` został wygenerowany
2. Sprawdź czy jest dodany w `gallery.html`
3. Sprawdź konsolę przeglądarki (F12) pod kątem błędów

---

## 📞 Automatyzacja

### Automatyczne uruchamianie po dodaniu zdjęć (Git Hook)

Utwórz `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Auto-generuj dane galerii przed commitem

if git diff --cached --name-only | grep -q "^images/"; then
    echo "🖼️  Wykryto zmiany w images/, generuję dane galerii..."
    python3 scripts/generate-gallery.py
    git add js/gallery-data.js gallery-data.json
fi
```

Nadaj uprawnienia:
```bash
chmod +x .git/hooks/pre-commit
```

---

## ✅ Checklist - Dodawanie nowych zdjęć

- [ ] Dodaj zdjęcia do odpowiedniego folderu w `images/`
- [ ] Uruchom `python3 scripts/generate-gallery.py`
- [ ] Sprawdź wygenerowany plik `js/gallery-data.js`
- [ ] Przetestuj galerię w przeglądarce
- [ ] Commituj zmiany

---

**Pytania?** Sprawdź kod skryptów lub skonsultuj się z dokumentacją JavaScript.
