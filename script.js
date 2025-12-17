// ===== NAVIGATION FUNCTIONALITY =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-links a');

// Navbar scroll effect
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

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth scroll for navigation links
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
scrollRevealElements.forEach(el => observer.observe(el));

// ===== SKILL CARDS ANIMATION =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ===== PROJECT CARDS HOVER EFFECT =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
heroSubtitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===== CURSOR TRAIL EFFECT =====
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Create cursor trail circles
for (let i = 0; i < 20; i++) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(circle);
}

const allCircles = document.querySelectorAll('.circle');

allCircles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    allCircles.forEach(function (circle, index) {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 40;
        circle.style.transform = `scale(${(20 - index) / 20})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text);

            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = text;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
                    }
                }, 30);
            }

            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ===== SOCIAL LINKS ANIMATION =====
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.classList.add('fade-in');
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== PARTICLE BACKGROUND EFFECT =====
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}));

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Welcome to Mahinder\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 14px;');
console.log('%c💼 Looking for collaboration? Let\'s connect!', 'color: #6366f1; font-size: 14px;');

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate elements on load
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 100);
    });
});

// Add loaded class styles
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyle);
