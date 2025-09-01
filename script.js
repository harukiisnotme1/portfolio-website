/* Enhanced JavaScript for full functional e-commerce website */

// Global variables
let products = [];
let cart = [];
let wishlist = [];
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Setup loading screen
    setupLoadingScreen();
    
    // Initialize animations
    initializeAnimations();
    
    // Load products
    loadProducts();
    
    // Setup cart functionality
    setupCart();
    
    // Setup search functionality
    setupSearch();
    
    // Setup filters
    setupFilters();
    
    // Setup wishlist
    setupWishlist();
    
    // Setup navigation
    setupNavigation();
    
    // Setup responsive menu
    setupResponsiveMenu();
}

// Loading Screen Setup
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('loading-hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// Initialize Animations
function initializeAnimations() {
    // Hero text animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle && heroSubtitle && heroButtons) {
        // GSAP animations
        gsap.from(heroTitle, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
            ease: "power2.out"
        });
        
        gsap.from(heroSubtitle, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.7,
            ease: "power2.out"
        });
        
        gsap.from(heroButtons, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.9,
            ease: "power2.out"
        });
    }
    
    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Load Products
async function loadProducts() {
    try {
        // Simulate API call
        const mockProducts = [
            {
                id: 1,
                title: "Wireless Headphones",
                price: 59.99,
                image: "https://images.unsplash.com/photo-1512499617640-c2f99912a0f0?auto=format&fit=crop&w=400&q=80",
                category: "electronics",
                description: "Premium wireless headphones with noise cancellation"
            },
            {
                id: 2,
                title: "Smart Watch",
                price: 129.99,
                image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
                category: "electronics",
                description: "Advanced smartwatch with health tracking"
            },
            {
                id: 3,
                title: "Designer T-Shirt",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
                category: "fashion",
                description: "Premium cotton designer t-shirt"
            },
            {
                id: 4,
                title: "Home Decor Set",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
                category: "home",
                description: "Modern home decor collection"
            },
            {
                id: 5,
                title: "Running Shoes",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
                category: "sports",
                description: "Professional running shoes"
            },
            {
                id: 6,
                title: "Coffee Maker",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=400&q=80",
                category: "home",
                description: "Automatic coffee maker with timer"
            },
            {
                id: 7,
                title: "Backpack",
                price: 39.99,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
                category: "fashion",
                description: "Waterproof backpack with laptop compartment"
            },
            {
                id: 8,
                title: "Smart Speaker",
                price: 99.99,
                image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=400&q=80",
                category: "electronics",
                description: "Voice-controlled smart speaker"
            }
        ];
        
        products = mockProducts;
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Render Products
function renderProducts(filter = 'all') {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl';
        
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2">
                    <button class="wishlist-btn p-2 bg-white/80 rounded-full hover:bg-white" data-id="${product.id}">
                        <i class="far fa-heart text-gray-600 hover:text-red-500"></i>
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">${product.title}</h3>
                <p class="text-gray-600 text-sm mb-2">${product.description}</p>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-2xl font-bold text-blue-600">$${product.price}</span>
                    <div class="flex items-center">
                        <div class="flex text-yellow-400">
                            ${'★'.repeat(5)}
                        </div>
                        <span class="text-sm text-gray-600 ml-1">(4.5)</span>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button class="add-to-cart-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors" data-id="${product.id}">
                        Add to Cart
                    </button>
                    <button class="wishlist-btn p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <i class="far fa-heart text-gray-600"></i>
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', toggleWishlist);
    });
}

// Setup Cart
function setupCart() {
    const cartButton = document.getElementById('cart-button');
    const closeCart = document.getElementById('close-cart');
    const proceedButton = document.querySelector('#cart-sidebar button:last-child');
    
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }
    
    if (proceedButton) {
        proceedButton.addEventListener('click', proceedToCheckout);
    }
    
    // Update cart count
    updateCartCount();
}

// Toggle Cart
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('translate-x-full');
}

// Add to Cart
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        updateCartCount();
        
        // Show notification
        showNotification(`${product.title} added to cart!`, 'success');
    }
}

// Toggle Wishlist
function toggleWishlist(event) {
    const productId = parseInt(event.target.closest('.wishlist-btn').dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const index = wishlist.findIndex(item => item.id === productId);
        if (index === -1) {
            wishlist.push(product);
            event.target.classList.remove('far', 'text-gray-600');
            event.target.classList.add('fas', 'text-red-500');
            showNotification(`${product.title} added to wishlist!`, 'success');
        } else {
            wishlist.splice(index, 1);
            event.target.classList.remove('fas', 'text-red-500');
            event.target.classList.add('far', 'text-gray-600');
            showNotification(`${product.title} removed from wishlist!`, 'info');
        }
        
        updateWishlistCount();
    }
}

// Update Cart Count
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

// Update Wishlist Count
function updateWishlistCount() {
    const wishlistCountEl = document.getElementById('wishlist-count');
    if (wishlistCountEl) {
        wishlistCountEl.textContent = wishlist.length;
    }
}

// Setup Search
function setupSearch() {
    const searchInput = document.querySelector('input[placeholder="Search products..."]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
            renderProducts();
        });
    }
}

// Setup Filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            currentFilter = filter;
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
            filterButtons.forEach(b => b.classList.add('bg-gray-200', 'text-gray-700'));
            e.target.classList.add('active', 'bg-blue-600', 'text-white');
            
            renderProducts(filter);
        });
    });
}

// Setup Wishlist
function setupWishlist() {
    // Wishlist functionality
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', toggleWishlist);
    }
}

// Setup Navigation
function setupNavigation() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup Responsive Menu
function setupResponsiveMenu() {
    const menuButton = document.querySelector('button.md\\:hidden');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            // Implement mobile menu toggle
            const nav = document.querySelector('nav');
            nav.classList.toggle('mobile-menu-open');
        });
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility Functions
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

function generateOrderId() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Initialize everything
initializeApp();

// Export functions for global use
window.ecommerce = {
    addToCart,
    toggleWishlist,
    toggleCart,
    formatPrice,
    generateOrderId
};
