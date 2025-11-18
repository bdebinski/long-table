#!/bin/bash

# ========================================
# Quick Start - Generator Galerii
# Szybki start dla nowych użytkowników
# ========================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo ""
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  🖼️  Generator Galerii - Quick Start${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}Dostępne opcje:${NC}"
echo ""
echo "  1) 🐍 Uruchom generator Python (zalecany)"
echo "  2) 📝 Uruchom generator Bash (prosty)"
echo "  3) 📚 Pokaż README"
echo "  4) ❌ Wyjdź"
echo ""

read -p "Wybierz opcję [1-4]: " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Uruchamiam generator Python...${NC}"
        echo ""
        python3 scripts/generate-gallery.py
        ;;
    2)
        echo ""
        echo -e "${YELLOW}Uruchamiam generator Bash...${NC}"
        echo ""
        ./scripts/generate-gallery.sh
        ;;
    3)
        echo ""
        less scripts/README.md
        ;;
    4)
        echo ""
        echo "Bye! 👋"
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo -e "${YELLOW}Nieprawidłowa opcja!${NC}"
        echo ""
        ;;
esac

echo ""
echo -e "${GREEN}✨ Gotowe!${NC}"
echo ""
echo "📖 Więcej informacji: scripts/README.md"
echo ""
