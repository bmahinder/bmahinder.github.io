// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('wildMountainCart')) || [];

// Update cart count and total
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartItems = document.getElementById('cartItems');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Size: ${item.size}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-id="${item.id}">×</button>
                    <div class="cart-item-quantity">
                        <button class="cart-qty-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to cart item buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
        });

        document.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', () => updateCartQuantity(btn.dataset.id, -1));
        });

        document.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', () => updateCartQuantity(btn.dataset.id, 1));
        });
    }

    // Save to localStorage
    localStorage.setItem('wildMountainCart', JSON.stringify(cart));
}

// Add to cart
function addToCart(product, price, size, quantity, image) {
    const id = `${product}-${size}`;
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id,
            name: product,
            price: parseFloat(price),
            size,
            quantity,
            image
        });
    }

    updateCartUI();
    showToast(`${product} added to cart!`);
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    showToast('Item removed from cart', '🗑️');
}

// Update cart quantity
function updateCartQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

// Show toast notification
function showToast(message, icon = '✓') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('.toast-icon');

    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Cart icon click
    document.getElementById('cartIcon').addEventListener('click', toggleCart);

    // Close cart button
    document.getElementById('closeCart').addEventListener('click', toggleCart);

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartIcon = document.getElementById('cartIcon');

        if (cartSidebar.classList.contains('active') &&
            !cartSidebar.contains(e.target) &&
            !cartIcon.contains(e.target)) {
            toggleCart();
        }
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length > 0) {
            showToast('Proceeding to checkout...', '💳');
            setTimeout(() => {
                alert('Checkout functionality would be implemented here!');
            }, 1000);
        } else {
            showToast('Your cart is empty', '🛒');
        }
    });

    // Product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        // Size selection
        const sizeButtons = card.querySelectorAll('.size-option');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });

        // Quantity controls
        const quantityValue = card.querySelector('.quantity-value');
        const minusBtn = card.querySelector('.quantity-btn.minus');
        const plusBtn = card.querySelector('.quantity-btn.plus');

        minusBtn.addEventListener('click', () => {
            let qty = parseInt(quantityValue.textContent);
            if (qty > 1) {
                quantityValue.textContent = qty - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let qty = parseInt(quantityValue.textContent);
            if (qty < 10) {
                quantityValue.textContent = qty + 1;
            }
        });

        // Add to cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            const product = addToCartBtn.dataset.product;
            const price = addToCartBtn.dataset.price;
            const image = addToCartBtn.dataset.image;
            const selectedSize = card.querySelector('.size-option.selected').dataset.size;
            const quantity = parseInt(quantityValue.textContent);

            addToCart(product, price, selectedSize, quantity, image);

            // Reset quantity to 1
            quantityValue.textContent = '1';

            // Add animation to button
            addToCartBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                addToCartBtn.style.transform = '';
            }, 200);
        });
    });
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => observer.observe(title));

    // About section elements
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) observer.observe(aboutText);
    if (aboutImage) observer.observe(aboutImage);

    // Product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
});

// Add scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00ff88, #00d9ff);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    `;
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

// Add entrance animation to hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

console.log('🏔️ Wild Mountain e-commerce website loaded successfully!');
