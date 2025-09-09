// ========================================
// SMOOTH, PERFORMANT PORTFOLIO JS
// ========================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initScrollAnimations();
    
    // Initialize cool interactive effects
    initCursorTrail();
    initBinaryRain();
    initParticleEffects();
    initInteractiveGlow();
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================

function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    // Use Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.work-item, .stat, .about-text, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Handle scroll-based animations here if needed
    }, 16); // ~60fps
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/profile-pic.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// ========================================
// COOL INTERACTIVE EFFECTS 🔥
// ========================================

// Cursor Trail Effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transform: scale(${1 - (i / trailLength)});
            box-shadow: 0 0 10px #00ff00;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || { offsetLeft: x, offsetTop: y };
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Binary Rain Effect
function initBinaryRain() {
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-rain';
    binaryContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(binaryContainer);
    
    const binaryChars = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        createBinaryColumn(i);
    }
    
    function createBinaryColumn(index) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${index * 20}px;
            width: 20px;
            height: 100vh;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: #00ff00;
            opacity: 0.1;
            animation: binaryFall ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        let binaryString = '';
        for (let i = 0; i < 50; i++) {
            binaryString += binaryChars[Math.floor(Math.random() * binaryChars.length)] + '<br>';
        }
        column.innerHTML = binaryString;
        
        binaryContainer.appendChild(column);
    }
}

// Particle Effects
function initParticleEffects() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 2px;
            height: 2px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${2 + Math.random() * 3}s ease-out forwards;
            box-shadow: 0 0 10px #00ff00;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 5000);
    }
    
    // Create particles on mouse move
    let lastParticleTime = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastParticleTime > 100) {
            createParticle(e.clientX, e.clientY);
            lastParticleTime = now;
        }
    });
}

// Interactive Glow Effects
function initInteractiveGlow() {
    const glowElements = document.querySelectorAll('.work-item, .skill-tag, .btn, .stat');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px #00ff00, 0 0 60px rgba(0, 255, 0, 0.3)';
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
}

// Add CSS animations for the effects
const style = document.createElement('style');
style.textContent = `
    @keyframes binaryFall {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 0.1; }
        90% { opacity: 0.1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes particleFloat {
        0% { 
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    .cursor-trail {
        transition: all 0.1s ease;
    }
`;
document.head.appendChild(style);
