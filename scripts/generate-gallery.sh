#!/bin/bash

# ========================================
# Skrypt do generowania listy zdjęć galerii
# Prostsza alternatywa dla wersji Python
# ========================================

set -e

# Kolory dla output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "🖼️  Generator listy zdjęć galerii Long Table"
echo ""

# Katalog bazowy
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="$PROJECT_DIR/images"
OUTPUT_FILE="$PROJECT_DIR/js/gallery-simple.js"

# Sprawdź czy katalog images istnieje
if [ ! -d "$IMAGES_DIR" ]; then
    echo -e "${RED}❌ Katalog $IMAGES_DIR nie istnieje!${NC}"
    exit 1
fi

echo "📁 Skanuję katalog: $IMAGES_DIR"
echo ""

# Funkcja do skanowania folderu
scan_folder() {
    local folder=$1
    local category=$2
    local folder_path="$IMAGES_DIR/$folder"

    if [ ! -d "$folder_path" ]; then
        echo -e "${YELLOW}⚠️  Folder $folder nie istnieje, pomijam...${NC}"
        return
    fi

    local count=0

    # Znajdź wszystkie obrazy (jpg, jpeg, png, gif, webp)
    while IFS= read -r file; do
        if [ -f "$file" ]; then
            local filename=$(basename "$file")
            local relative_path="images/$folder/$filename"

            # Dodaj do tablicy JavaScript
            echo "        { filename: '$filename', path: '$relative_path', category: '$category', folder: '$folder' }," >> "$OUTPUT_FILE.tmp"
            ((count++))
        fi
    done < <(find "$folder_path" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) ! -name "index.html" | sort)

    echo -e "  $folder: ${GREEN}$count${NC} zdjęć"
}

# Rozpocznij tworzenie pliku
cat > "$OUTPUT_FILE.tmp" << 'EOF'
// ========================================
// Gallery Simple Data - Auto-generated
// Wygenerowane przez: scripts/generate-gallery.sh
// ========================================

const gallerySimpleData = {
    'nasze_propozycje': [
EOF

# Skanuj foldery
echo "🔍 Skanuję foldery..."
echo ""

# Nasze propozycje
scan_folder "nasze_propozycje" "all"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'menu': [
EOF

scan_folder "menu" "food"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'Lodowe': [
EOF

scan_folder "Lodowe" "ice-sculptures"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'czekoladowafontanna': [
EOF

scan_folder "czekoladowafontanna" "desserts"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'zestawyupominkowe': [
EOF

scan_folder "zestawyupominkowe" "gifts"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'Pirotechnika': [
EOF

scan_folder "Pirotechnika" "events"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'AkademiaBaru': [
EOF

scan_folder "AkademiaBaru" "events"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'galeria': [
EOF

scan_folder "galeria" "all"

cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ],
    'palac': [
EOF

scan_folder "palac" "events"

# Zakończ plik
cat >> "$OUTPUT_FILE.tmp" << 'EOF'
    ]
};

// Wszystkie obrazy (płaska lista)
const allSimpleGalleryImages = Object.values(gallerySimpleData).flat();

// Eksport
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gallerySimpleData, allSimpleGalleryImages };
}
EOF

# Przenieś plik tymczasowy
mv "$OUTPUT_FILE.tmp" "$OUTPUT_FILE"

echo ""
echo -e "${GREEN}✅ Wygenerowano plik: $OUTPUT_FILE${NC}"
echo ""
echo "✨ Gotowe! Możesz teraz używać danych w swojej aplikacji."
echo ""
