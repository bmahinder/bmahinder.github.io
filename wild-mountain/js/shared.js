// Product Data
const products = [
    {
        id: 'alpine-pro',
        name: 'Alpine Pro',
        price: 149.99,
        image: '../images/tracking_pants_hero_1765973253958.png',
        description: 'Our flagship model. Reinforced knees, water-resistant fabric, and 8 strategic pockets for all your gear.',
        fullDescription: 'The Alpine Pro is our most advanced tracking pant, designed for serious mountain adventurers. Features include reinforced knee panels with Cordura fabric, DWR water-resistant coating, 8 strategically placed pockets including two zippered thigh pockets, adjustable waist system, and articulated knees for maximum mobility.',
        features: ['Water-resistant DWR coating', 'Reinforced knees', '8 strategic pockets', 'Adjustable waist', 'Articulated fit'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Premium'
    },
    {
        id: 'trail-master',
        name: 'Trail Master',
        price: 129.99,
        image: '../images/pants_olive_green_1765973386563.png',
        description: 'Lightweight and breathable for long-distance hiking. Features moisture-wicking technology and UV protection.',
        fullDescription: 'Perfect for long-distance trekking, the Trail Master combines lightweight construction with durability. Made from breathable ripstop fabric with moisture-wicking properties, UPF 50+ sun protection, and strategic ventilation zones. Ideal for warm weather hiking and multi-day adventures.',
        features: ['Moisture-wicking fabric', 'UPF 50+ protection', 'Lightweight ripstop', 'Ventilation zones', 'Quick-dry technology'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Lightweight'
    },
    {
        id: 'summit-explorer',
        name: 'Summit Explorer',
        price: 179.99,
        image: '../images/pants_navy_blue_1765973461956.png',
        description: 'Designed for extreme conditions. Insulated, windproof, and built to handle the toughest mountain weather.',
        fullDescription: 'Built for extreme alpine conditions, the Summit Explorer offers maximum protection. Features include windproof softshell fabric, light insulation for cold weather, reinforced seat and knees, snow gaiters, and multiple secure pockets. Perfect for winter mountaineering and high-altitude expeditions.',
        features: ['Windproof softshell', 'Light insulation', 'Snow gaiters', 'Reinforced construction', 'Extreme weather protection'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        category: 'Extreme Weather'
    },
    {
        id: 'canyon-trekker',
        name: 'Canyon Trekker',
        price: 119.99,
        image: '../images/tracking_pants_hero_1765973253958.png',
        description: 'Versatile all-rounder for day hikes and casual outdoor activities. Comfortable stretch fabric.',
        fullDescription: 'The Canyon Trekker is your everyday adventure companion. Made from comfortable stretch fabric that moves with you, featuring a classic fit, multiple pockets, and durable construction. Perfect for day hikes, camping, and casual outdoor activities.',
        features: ['Stretch fabric', 'Classic fit', '6 pockets', 'Durable construction', 'All-day comfort'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Everyday'
    },
    {
        id: 'forest-ranger',
        name: 'Forest Ranger',
        price: 139.99,
        image: '../images/pants_olive_green_1765973386563.png',
        description: 'Rugged pants designed for bushwhacking and off-trail exploration. Abrasion-resistant fabric.',
        fullDescription: 'Navigate dense forests and rough terrain with confidence. The Forest Ranger features heavy-duty abrasion-resistant fabric, reinforced panels on high-wear areas, cargo pockets with secure closures, and a comfortable fit that won\'t restrict movement during challenging terrain.',
        features: ['Abrasion-resistant', 'Reinforced panels', 'Cargo pockets', 'Brush-resistant', 'Heavy-duty zippers'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        category: 'Rugged'
    },
    {
        id: 'peak-performance',
        name: 'Peak Performance',
        price: 159.99,
        image: '../images/pants_navy_blue_1765973461956.png',
        description: 'Technical pants for serious climbers. Gusseted crotch and stretch panels for maximum mobility.',
        fullDescription: 'Engineered for technical climbing and scrambling, the Peak Performance offers unmatched mobility. Features include 4-way stretch panels, gusseted crotch, reinforced knees and seat, integrated belt, and a streamlined fit that won\'t catch on rocks or gear.',
        features: ['4-way stretch', 'Gusseted crotch', 'Climbing-specific fit', 'Reinforced high-wear areas', 'Integrated belt'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Technical'
    }
];

// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('wildMountainCart')) || [];

// Cart Functions
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartItems = document.getElementById('cartItems');

    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    if (cartItems) {
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
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
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
    }

    localStorage.setItem('wildMountainCart', JSON.stringify(cart));
}

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

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    showToast('Item removed from cart', '🗑️');
}

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

function showToast(message, icon = '✓') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('.toast-icon');

    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

// Navigation Functions
function initNavigation() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        }
    });
}

// Cart Initialization
function initCart() {
    updateCartUI();

    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }

    document.addEventListener('click', (e) => {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartIcon = document.getElementById('cartIcon');

        if (cartSidebar && cartSidebar.classList.contains('active') &&
            !cartSidebar.contains(e.target) &&
            !cartIcon.contains(e.target)) {
            toggleCart();
        }
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                showToast('Proceeding to checkout...', '💳');
                setTimeout(() => {
                    alert('Checkout functionality would be implemented here!');
                }, 1000);
            } else {
                showToast('Your cart is empty', '🛒');
            }
        });
    }
}

// Scroll Progress Indicator
function createScrollIndicator() {
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
        will-change: width;
    `;
    document.body.appendChild(indicator);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                indicator.style.width = scrolled + '%';
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartUI,
        showToast,
        toggleCart,
        initNavigation,
        initCart,
        createScrollIndicator,
        getProductById
    };
}
