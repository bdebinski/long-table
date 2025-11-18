// ========================================
// Gallery Page - Dynamic Loading
// ========================================

// All images from nasze_propozycje folder
const allImages = [
    'longtable_001.jpg', 'longtable_002.jpg', 'longtable_003.jpg', 'longtable_004.jpg',
    'longtable_005.jpg', 'longtable_006.jpg', 'longtable_007.jpg', 'longtable_008.jpg',
    'longtable_009.jpg', 'longtable_010.jpg', 'longtable_011.jpg', 'longtable_012.jpg',
    'longtable_013.jpg', 'longtable_014.jpg', 'longtable_015.jpg', 'longtable_016.jpg',
    'longtable_017.jpg', 'longtable_018.jpg', 'longtable_019.jpg', 'longtable_020.jpg',
    'longtable_021.jpg', 'longtable_022.jpg', 'longtable_023.jpg', 'longtable_024.jpg',
    'longtable_025.jpg', 'longtable_026.jpg', 'longtable_027.jpg', 'longtable_028.jpg',
    'longtable_029.jpg', 'longtable_030.jpg', 'longtable_031.jpg', 'longtable_032.jpg',
    'longtable_033.jpg', 'longtable_034.jpg', 'longtable_035.jpg', 'longtable_036.jpg',
    'longtable_037.jpg', 'longtable_038.jpg', 'longtable_040.jpg', 'longtable_041.jpg',
    'longtable_043.jpg', 'longtable_044.jpg', 'longtable_045.jpg', 'longtable_046.jpg',
    'longtable_047.jpg', 'longtable_048.jpg', 'longtable_053.jpg', 'longtable_061.jpg',
    'longtable_062.jpg', 'longtable_063.jpg', 'longtable_064.jpg', 'longtable_065.jpg',
    'longtable_066.jpg', 'longtable_067.jpg', 'longtable_068.jpg', 'longtable_069.jpg',
    'longtable_070.jpg', 'longtable_071.jpg', 'longtable_072.jpg', 'longtable_073.jpg',
    'longtable_075.jpg', 'longtable_076.jpg', 'longtable_078.jpg', 'longtable_079.jpg',
    'longtable_080.jpg', 'longtable_081.jpg', 'longtable_082.jpg', 'longtable_083.jpg',
    'longtable_084.jpg', 'longtable_085.jpg', 'longtable_086.jpg', 'longtable_087.jpg',
    'longtable_088.jpg', 'longtable_089.jpg', 'longtable_090.jpg', 'longtable_091.jpg',
    'longtable_092.jpg', 'longtable_093.jpg', 'longtable_094.jpg', 'longtable_095.jpg',
    'longtable_096.jpg', 'longtable_097.jpg', 'longtable_098.jpg', 'longtable_099.jpg',
    'longtable_100.jpg', 'longtable_101.jpg', 'longtable_102.jpg', 'longtable_103.jpg',
    'longtable_104.jpg', 'longtable_106.jpg', 'longtable_107.jpg', 'longtable_108.jpg',
    'longtable_109.jpg', 'longtable_110.jpg', 'longtable_111.jpg', 'longtable_112.jpg',
    'longtable_113.jpg', 'longtable_114.jpg', 'longtable_115.jpg', 'longtable_116.jpg',
    'longtable_117.jpg', 'longtable_118.jpg', 'longtable_119.jpg', 'longtable_120.jpg',
    'longtable_121.jpg', 'longtable_122.jpg', 'longtable_123.jpg', 'longtable_124.jpg',
    'longtable_125.jpg', 'longtable_126.jpg', 'longtable_127.jpg', 'longtable_128.jpg',
    'longtable_129.jpg', 'longtable_130.jpg', 'longtable_131.jpg', 'longtable_132.jpg',
    'longtable_133.jpg', 'longtable_134.jpg', 'longtable_135.jpg', 'longtable_136.jpg',
    'longtable_137.jpg', 'longtable_138.jpg', 'longtable_139.jpg', 'longtable_140.jpg',
    'longtable_141.jpg', 'longtable_142.jpg', 'longtable_143.jpg', 'longtable_144.jpg',
    'longtable_145.jpg', 'longtable_146.jpg', 'longtable_147.jpg', 'longtable_148.jpg',
    'longtable_149.jpg', 'longtable_150.jpg', 'longtable_1091.jpg', 'longtable_1100.jpg',
    'longtable_1102.jpg', 'longtable_1103.jpg', 'longtable_1104.jpg'
];

const basePath = 'images/nasze_propozycje/';
let currentIndex = 0;
const imagesPerLoad = 24; // Load 24 images at a time
let currentFilter = 'all';

const galleryGrid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load initial images
loadImages();

// Load More button event
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        loadImages();
    });
}

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Reset and reload
        currentFilter = btn.getAttribute('data-filter');
        currentIndex = 0;
        galleryGrid.innerHTML = '';
        loadImages();
    });
});

function loadImages() {
    // Show loading spinner
    if (loadingSpinner) {
        loadingSpinner.style.display = 'flex';
    }

    // Hide load more button while loading
    if (loadMoreContainer) {
        loadMoreContainer.style.display = 'none';
    }

    // Simulate loading delay for smooth UX
    setTimeout(() => {
        const endIndex = Math.min(currentIndex + imagesPerLoad, allImages.length);

        for (let i = currentIndex; i < endIndex; i++) {
            const imageName = allImages[i];
            const imagePath = basePath + imageName;

            // Create gallery item
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', getImageCategory(imageName));

            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Long Table - Zdjęcie ${i + 1}`;
            img.loading = 'lazy';

            // Add click event for lightbox
            img.addEventListener('click', () => {
                openGalleryLightbox(i);
            });

            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
        }

        currentIndex = endIndex;

        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

        // Show/hide load more button
        if (currentIndex < allImages.length) {
            if (loadMoreContainer) {
                loadMoreContainer.style.display = 'block';
            }
        } else {
            if (loadMoreContainer) {
                loadMoreContainer.style.display = 'none';
            }
        }
    }, 500);
}

function getImageCategory(imageName) {
    // Simple categorization based on image numbers
    const num = parseInt(imageName.match(/\d+/)[0]);
    if (num <= 50) return 'catering';
    if (num <= 100) return 'events';
    return 'food';
}

function openGalleryLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    if (lightbox && lightboxImage) {
        const imagePath = basePath + allImages[index];
        lightboxImage.src = imagePath;
        lightboxImage.alt = `Long Table - Zdjęcie ${index + 1}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Store current gallery index for navigation
        window.currentGalleryIndex = index;
        window.galleryImages = allImages.map(img => basePath + img);
    }
}

// Update lightbox navigation for gallery page
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
        if (window.currentGalleryIndex !== undefined) {
            window.currentGalleryIndex = (window.currentGalleryIndex - 1 + allImages.length) % allImages.length;
            document.getElementById('lightboxImage').src = window.galleryImages[window.currentGalleryIndex];
        }
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
        if (window.currentGalleryIndex !== undefined) {
            window.currentGalleryIndex = (window.currentGalleryIndex + 1) % allImages.length;
            document.getElementById('lightboxImage').src = window.galleryImages[window.currentGalleryIndex];
        }
    });
}
