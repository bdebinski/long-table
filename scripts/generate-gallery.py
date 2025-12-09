#!/usr/bin/env python3
"""
Skrypt do automatycznego generowania danych galerii z folderów ze zdjęciami.

Użycie:
    python scripts/generate-gallery.py

Wymagania:
    - Python 3.6+
    - Pillow (opcjonalnie, dla metadanych zdjęć)
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List

# Konfiguracja - mapowanie folderów na kategorie
CATEGORY_MAPPING = {
    'fingerfood': 'fingerfood',
    'potrawy': 'food',
    'rzezbylodowe': 'ice-sculptures',
    'desery': 'desserts',
    'zestawyupominkowe': 'gifts',
    'wystroj': 'events',
}

# Wspierane rozszerzenia obrazów
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG'}

# Ścieżka bazowa (katalog projektu)
BASE_DIR = Path(__file__).parent.parent
IMAGES_DIR = BASE_DIR / 'images'
OUTPUT_JS = BASE_DIR / 'js' / 'gallery-data.js'
OUTPUT_JSON = BASE_DIR / 'gallery-data.json'


def is_image_file(filename: str) -> bool:
    """Sprawdza czy plik jest obrazem."""
    return Path(filename).suffix in IMAGE_EXTENSIONS


def scan_images(images_dir: Path) -> Dict[str, List[Dict]]:
    """
    Skanuje katalog images/ i zwraca słownik z obrazami pogrupowanymi po kategoriach.

    Returns:
        Dict z kluczami kategorii i wartościami list obrazów
    """
    categories = {}

    # NAJPIERW: Skanuj główny folder images/ (pliki bezpośrednio w images/)
    print("🔍 Skanuję główny folder images/...")
    main_images = []
    for file in sorted(images_dir.iterdir()):
        if file.is_file() and is_image_file(file.name):
            # Ignoruj pliki specjalne
            if file.name in ['index.html', 'logolt2.png', 'logo.png']:
                continue

            main_images.append({
                'filename': file.name,
                'path': f'images/{file.name}',
                'category': 'all',
                'folder': 'main',
            })

    if main_images:
        if 'all' not in categories:
            categories['all'] = []
        categories['all'].extend(main_images)
        print(f"✅ Znaleziono {len(main_images)} zdjęć w głównym folderze images/")

    # NASTĘPNIE: Skanuj podfoldery
    for category_folder, category_name in CATEGORY_MAPPING.items():
        folder_path = images_dir / category_folder

        if not folder_path.exists():
            print(f"⚠️  Folder {category_folder} nie istnieje, pomijam...")
            continue

        images = []

        # Skanuj folder (bez podfolderów)
        for file in sorted(folder_path.iterdir()):
            if file.is_file() and is_image_file(file.name):
                # Ignoruj pliki index.html
                if file.name == 'index.html':
                    continue

                images.append({
                    'filename': file.name,
                    'path': f'images/{category_folder}/{file.name}',
                    'category': category_name,
                    'folder': category_folder,
                })

        # Dodaj do odpowiedniej kategorii
        if category_name not in categories:
            categories[category_name] = []
        categories[category_name].extend(images)

    return categories


def scan_images_recursive(images_dir: Path) -> Dict[str, List[Dict]]:
    """
    Skanuje REKURSYWNIE katalog images/ (włącznie z podfolderami).
    """
    categories = {}

    for category_folder, category_name in CATEGORY_MAPPING.items():
        folder_path = images_dir / category_folder

        if not folder_path.exists():
            print(f"⚠️  Folder {category_folder} nie istnieje, pomijam...")
            continue

        images = []

        # Skanuj folder rekursywnie
        for file in folder_path.rglob('*'):
            if file.is_file() and is_image_file(file.name):
                # Ignoruj pliki index.html
                if file.name == 'index.html':
                    continue

                # Relatywna ścieżka od katalogu images
                relative_path = file.relative_to(images_dir)

                images.append({
                    'filename': file.name,
                    'path': f'images/{relative_path.as_posix()}',
                    'category': category_name,
                    'folder': category_folder,
                })

        # Dodaj do odpowiedniej kategorii
        if category_name not in categories:
            categories[category_name] = []
        categories[category_name].extend(images)

    return categories


def generate_javascript(categories: Dict[str, List[Dict]], output_file: Path):
    """Generuje plik JavaScript z danymi galerii."""

    js_content = """// ========================================
// Gallery Data - Auto-generated
// Wygenerowane przez: scripts/generate-gallery.py
// ========================================

const galleryData = {
"""

    for category, images in categories.items():
        js_content += f"    '{category}': [\n"
        for img in images:
            js_content += f"        {json.dumps(img, ensure_ascii=False)},\n"
        js_content += "    ],\n"

    js_content += "};\n\n"

    # Dodaj helper dla wszystkich obrazów
    js_content += """// Wszystkie obrazy (płaska lista)
const allGalleryImages = Object.values(galleryData).flat();

// Eksport (dla modułów)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { galleryData, allGalleryImages };
}
"""

    output_file.write_text(js_content, encoding='utf-8')
    print(f"✅ Wygenerowano plik JavaScript: {output_file}")


def generate_json(categories: Dict[str, List[Dict]], output_file: Path):
    """Generuje plik JSON z danymi galerii."""

    data = {
        'categories': categories,
        'all_images': sum([images for images in categories.values()], []),
        'stats': {
            'total_images': sum(len(images) for images in categories.values()),
            'categories_count': len(categories),
        }
    }

    output_file.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"✅ Wygenerowano plik JSON: {output_file}")


def print_statistics(categories: Dict[str, List[Dict]]):
    """Wyświetla statystyki znalezionych obrazów."""
    print("\n" + "="*60)
    print("📊 STATYSTYKI GALERII")
    print("="*60)

    total = 0
    for category, images in sorted(categories.items()):
        count = len(images)
        total += count
        print(f"  {category:20s}: {count:4d} zdjęć")

    print("="*60)
    print(f"  {'RAZEM':20s}: {total:4d} zdjęć")
    print("="*60 + "\n")


def main():
    """Główna funkcja skryptu."""
    print("\n🖼️  Generator danych galerii Long Table\n")

    # Sprawdź czy katalog images istnieje
    if not IMAGES_DIR.exists():
        print(f"❌ Katalog {IMAGES_DIR} nie istnieje!")
        return

    print(f"📁 Skanuję katalog: {IMAGES_DIR}\n")

    # Wybór trybu skanowania
    print("Tryb skanowania:")
    print("  1. Tylko główne foldery (bez podfolderów)")
    print("  2. Rekursywnie (z podfolderami)")

    try:
        mode = input("\nWybierz tryb [1/2, domyślnie 1]: ").strip() or "1"
    except EOFError:
        mode = "1"

    # Skanuj obrazy
    if mode == "2":
        print("\n🔍 Skanuję rekursywnie (z podfolderami)...\n")
        categories = scan_images_recursive(IMAGES_DIR)
    else:
        print("\n🔍 Skanuję główne foldery...\n")
        categories = scan_images(IMAGES_DIR)

    # Wyświetl statystyki
    print_statistics(categories)

    # Generuj pliki
    print("📝 Generuję pliki wyjściowe...\n")
    generate_javascript(categories, OUTPUT_JS)
    generate_json(categories, OUTPUT_JSON)

    print("\n✨ Gotowe! Możesz teraz używać danych galerii w swojej aplikacji.\n")
    print("Aby użyć w gallery.html, zaktualizuj gallery.js aby korzystał z gallery-data.js\n")


if __name__ == '__main__':
    main()
