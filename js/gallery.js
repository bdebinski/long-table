// ========================================
// Gallery Page - Dynamic Loading with Auto-generated Data
// ========================================

let currentIndex = 0;
const imagesPerLoad = 24; // Load 24 images at a time
let currentFilter = 'all';
let currentImages = []; // Active images based on filter

let galleryGrid;
let loadMoreBtn;
let loadMoreContainer;
let loadingSpinner;
let filterBtns;

// Initialize gallery
function initGallery() {
    console.log('Initializing gallery...');

    // Check if galleryData is loaded
    if (typeof galleryData === 'undefined') {
        console.error('gallery-data.js not loaded!');
        return;
    }

    console.log('galleryData loaded, total images:', allGalleryImages ? allGalleryImages.length : 0);

    // Get DOM elements
    galleryGrid = document.getElementById('galleryGrid');
    loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreContainer = document.getElementById('loadMoreContainer');
    loadingSpinner = document.getElementById('loadingSpinner');
    filterBtns = document.querySelectorAll('.filter-btn');

    if (!galleryGrid) {
        console.error('galleryGrid element not found!');
        return;
    }

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
            updateCurrentImages();
            loadImages();
        });
    });

    // Setup lightbox navigation for gallery
    setupLightboxNavigation();

    // Set initial images and load
    updateCurrentImages();
    loadImages();
}

// Update current images based on filter
function updateCurrentImages() {
    if (currentFilter === 'all') {
        // Get all images from all categories
        currentImages = allGalleryImages || [];
    } else if (currentFilter === 'catering') {
        // Catering = 'all' category (nasze_propozycje)
        currentImages = galleryData['all'] || [];
    } else if (galleryData[currentFilter]) {
        // Use specific category
        currentImages = galleryData[currentFilter] || [];
    } else {
        currentImages = allGalleryImages || [];
    }
    console.log('Filter:', currentFilter, '- Images:', currentImages.length);
}

function loadImages() {
    console.log('loadImages() called - currentIndex:', currentIndex, 'total:', currentImages.length);

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
        const endIndex = Math.min(currentIndex + imagesPerLoad, currentImages.length);
        console.log('Loading images from', currentIndex, 'to', endIndex);

        for (let i = currentIndex; i < endIndex; i++) {
            const imageData = currentImages[i];
            const imagePath = imageData.path;

            // Create gallery item
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', imageData.category);

            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Long Table - ${imageData.filename}`;
            img.loading = 'lazy';

            // Add click event for lightbox
            img.addEventListener('click', () => {
                openGalleryLightbox(i);
            });

            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
        }

        console.log('Loaded', (endIndex - currentIndex), 'images');
        currentIndex = endIndex;

        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

        // Show/hide load more button
        if (currentIndex < currentImages.length) {
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

function openGalleryLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    if (lightbox && lightboxImage) {
        const imageData = currentImages[index];
        const imagePath = imageData.path;

        lightboxImage.src = imagePath;
        lightboxImage.alt = `Long Table - ${imageData.filename}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Store current gallery index for navigation
        window.currentGalleryIndex = index;
        window.galleryImages = currentImages.map(img => img.path);
    }
}

// Setup lightbox navigation for gallery page
function setupLightboxNavigation() {
    const lightboxPrevBtn = document.getElementById('lightboxPrev');
    const lightboxNextBtn = document.getElementById('lightboxNext');

    if (lightboxPrevBtn) {
        lightboxPrevBtn.addEventListener('click', () => {
            if (window.currentGalleryIndex !== undefined && currentImages.length > 0) {
                window.currentGalleryIndex = (window.currentGalleryIndex - 1 + currentImages.length) % currentImages.length;
                const imageData = currentImages[window.currentGalleryIndex];
                document.getElementById('lightboxImage').src = imageData.path;
            }
        });
    }

    if (lightboxNextBtn) {
        lightboxNextBtn.addEventListener('click', () => {
            if (window.currentGalleryIndex !== undefined && currentImages.length > 0) {
                window.currentGalleryIndex = (window.currentGalleryIndex + 1) % currentImages.length;
                const imageData = currentImages[window.currentGalleryIndex];
                document.getElementById('lightboxImage').src = imageData.path;
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}
