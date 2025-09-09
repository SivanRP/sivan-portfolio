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
    initClickExplosions();
    initMindBlowingEffects();
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

// Cursor Trail Effect - ULTRA OPTIMIZED
function initCursorTrail() {
    const trail = [];
    const trailLength = 6; // Further reduced for performance
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let animationId;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transform: scale(${1 - (i / trailLength)});
            box-shadow: 0 0 4px #00ff00;
            will-change: transform, opacity;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    // Throttled mouse move - much more aggressive
    let mouseMoveTimeout;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        if (mouseMoveTimeout) {
            clearTimeout(mouseMoveTimeout);
        }
        mouseMoveTimeout = setTimeout(() => {
            isMoving = false;
        }, 50); // Reduced timeout
    });
    
    function updateTrail() {
        if (isMoving) {
            let x = mouseX;
            let y = mouseY;
            
            trail.forEach((trailDot, index) => {
                const nextDot = trail[index + 1] || { x: x, y: y };
                
                trailDot.x = x;
                trailDot.y = y;
                trailDot.element.style.left = x + 'px';
                trailDot.element.style.top = y + 'px';
                
                x += (nextDot.x - x) * 0.5; // Faster following
                y += (nextDot.y - y) * 0.5;
            });
        }
        
        animationId = requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
    
    // Cleanup function
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

// Matrix Code Rain - WORKING VERSION
function initBinaryRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%);
    `;
    document.body.appendChild(matrixContainer);
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const drops = [];
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * 100;
    }
    
    function drawMatrix() {
        // Clear canvas effect with semi-transparent black
        matrixContainer.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, transparent 100%)';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            const span = document.createElement('span');
            span.textContent = char;
            span.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                color: #00ff00;
                font-family: 'JetBrains Mono', monospace;
                font-size: ${fontSize}px;
                opacity: ${Math.random() * 0.5 + 0.3};
                text-shadow: 0 0 5px #00ff00;
            `;
            
            matrixContainer.appendChild(span);
            
            // Remove after animation
            setTimeout(() => {
                if (span.parentNode) {
                    span.parentNode.removeChild(span);
                }
            }, 100);
            
            // Reset drop
            if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Throttled animation
    let lastTime = 0;
    function animateMatrix(currentTime) {
        if (currentTime - lastTime > 50) { // 20fps for performance
            drawMatrix();
            lastTime = currentTime;
        }
        requestAnimationFrame(animateMatrix);
    }
    
    animateMatrix(0);
}

// Particle Effects - ULTRA OPTIMIZED
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
    
    const particles = [];
    const maxParticles = 20; // Much lower for performance
    
    function createParticle(x, y) {
        if (particles.length >= maxParticles) {
            const oldParticle = particles.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.parentNode.removeChild(oldParticle);
            }
        }
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 1px;
            height: 1px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 4px #00ff00;
            will-change: transform, opacity;
        `;
        
        particleContainer.appendChild(particle);
        particles.push(particle);
        
        // Simple CSS animation instead of JS
        particle.style.animation = 'particleFloat 2s ease-out forwards';
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            const index = particles.indexOf(particle);
            if (index > -1) {
                particles.splice(index, 1);
            }
        }, 2000);
    }
    
    // Much more throttled
    let lastParticleTime = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastParticleTime > 300) { // Much higher throttle
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

// Click Explosions with Self-Repairing Holes
function initClickExplosions() {
    const explosionContainer = document.createElement('div');
    explosionContainer.className = 'explosion-container';
    explosionContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
        overflow: hidden;
    `;
    document.body.appendChild(explosionContainer);
    
    const holes = [];
    
    document.addEventListener('click', function(e) {
        createExplosion(e.clientX, e.clientY);
        createHole(e.clientX, e.clientY);
    });
    
    function createExplosion(x, y) {
        // Create explosion particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: #00ff00;
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 15px #00ff00;
                will-change: transform, opacity;
            `;
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 50 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            explosionContainer.appendChild(particle);
            
            let frame = 0;
            const maxFrames = 60;
            
            function animateParticle() {
                frame++;
                const progress = frame / maxFrames;
                
                particle.style.transform = `translate(${vx * progress}px, ${vy * progress}px) scale(${1 - progress})`;
                particle.style.opacity = 1 - progress;
                
                if (frame < maxFrames) {
                    requestAnimationFrame(animateParticle);
                } else {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            }
            
            animateParticle();
        }
    }
    
    function createHole(x, y) {
        const hole = document.createElement('div');
        const size = 80 + Math.random() * 40;
        const id = Date.now() + Math.random();
        
        hole.className = 'explosion-hole';
        hole.style.cssText = `
            position: fixed;
            left: ${x - size/2}px;
            top: ${y - size/2}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 0.9) 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            will-change: transform, opacity;
            animation: holeExpand 0.3s ease-out;
        `;
        
        explosionContainer.appendChild(hole);
        holes.push({ element: hole, id: id, x: x, y: y, size: size });
        
        // Start self-repair after 2 seconds
        setTimeout(() => {
            repairHole(hole, id);
        }, 2000);
    }
    
    function repairHole(hole, id) {
        let frame = 0;
        const maxFrames = 60;
        
        function animateRepair() {
            frame++;
            const progress = frame / maxFrames;
            
            hole.style.opacity = 1 - progress;
            hole.style.transform = `scale(${1 + progress * 0.5})`;
            
            if (frame < maxFrames) {
                requestAnimationFrame(animateRepair);
            } else {
                if (hole.parentNode) {
                    hole.parentNode.removeChild(hole);
                }
                // Remove from holes array
                const index = holes.findIndex(h => h.id === id);
                if (index > -1) {
                    holes.splice(index, 1);
                }
            }
        }
        
        animateRepair();
    }
}

// MIND-BLOWING EFFECTS - PERFORMANCE OPTIMIZED 🔥
function initMindBlowingEffects() {
    // 1. Matrix-style glitch text effect
    initGlitchText();
    
    // 2. Holographic shimmer on hover
    initHolographicShimmer();
    
    // 3. Simple pulse effect
    initSimplePulse();
    
    // 4. Dimensional shift on click (simplified)
    initDimensionalShift();
    
    // 5. Floating orbs background
    initFloatingOrbs();
}

// Glitch Text Effect
function initGlitchText() {
    const glitchElements = document.querySelectorAll('.hero-title, .section-title');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
            this.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 2px #00ff00,
                0 -2px #ffff00
            `;
            
            setTimeout(() => {
                this.style.animation = '';
                this.style.textShadow = '';
            }, 300);
        });
    });
}

// Holographic Shimmer
function initHolographicShimmer() {
    const shimmerElements = document.querySelectorAll('.work-item, .skill-tag, .btn');
    
    shimmerElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = `
                linear-gradient(45deg, 
                    transparent 30%, 
                    rgba(0, 255, 0, 0.1) 50%, 
                    transparent 70%
                ),
                linear-gradient(-45deg, 
                    transparent 30%, 
                    rgba(0, 255, 255, 0.1) 50%, 
                    transparent 70%
                )
            `;
            this.style.backgroundSize = '200% 200%';
            this.style.animation = 'holographicShimmer 1s ease-in-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.animation = '';
        });
    });
}

// Simple Pulse Effect
function initSimplePulse() {
    const pulseContainer = document.createElement('div');
    pulseContainer.className = 'simple-pulse';
    pulseContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        background: radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.03) 0%, transparent 70%);
        animation: simplePulse 3s ease-in-out infinite;
    `;
    document.body.appendChild(pulseContainer);
}

// Dimensional Shift
function initDimensionalShift() {
    document.addEventListener('click', function(e) {
        const shift = document.createElement('div');
        shift.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(0, 255, 0, 0.1) 0%, 
                rgba(0, 255, 255, 0.1) 25%, 
                rgba(255, 0, 255, 0.1) 50%, 
                rgba(255, 255, 0, 0.1) 75%, 
                rgba(0, 255, 0, 0.1) 100%
            );
            pointer-events: none;
            z-index: 500;
            animation: dimensionalShift 0.5s ease-out;
        `;
        
        document.body.appendChild(shift);
        
        setTimeout(() => {
            if (shift.parentNode) {
                shift.parentNode.removeChild(shift);
            }
        }, 500);
    });
}

// Floating Orbs Background
function initFloatingOrbs() {
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'floating-orbs';
    orbsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(orbsContainer);
    
    // Create 3 floating orbs
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.style.cssText = `
            position: absolute;
            width: ${50 + Math.random() * 100}px;
            height: ${50 + Math.random() * 100}px;
            background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatOrb ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        orbsContainer.appendChild(orb);
    }
}

// Add CSS animations for the effects
const style = document.createElement('style');
style.textContent = `
    @keyframes holeExpand {
        0% { 
            transform: scale(0);
            opacity: 0;
        }
        100% { 
            transform: scale(1);
            opacity: 1;
        }
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
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    @keyframes holographicShimmer {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
    }
    
    @keyframes quantumTunnel {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes simplePulse {
        0%, 100% { 
            opacity: 0.03;
            transform: scale(1);
        }
        50% { 
            opacity: 0.08;
            transform: scale(1.05);
        }
    }
    
    @keyframes dimensionalShift {
        0% { 
            opacity: 0;
            transform: scale(0.9);
        }
        50% { 
            opacity: 0.5;
            transform: scale(1.05);
        }
        100% { 
            opacity: 0;
            transform: scale(1.1);
        }
    }
    
    @keyframes floatOrb {
        0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
        }
        25% { 
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.2;
        }
        50% { 
            transform: translate(-10px, -30px) scale(0.9);
            opacity: 0.15;
        }
        75% { 
            transform: translate(30px, 10px) scale(1.05);
            opacity: 0.18;
        }
    }
    
    .cursor-trail {
        transition: all 0.1s ease;
    }
    
    .explosion-hole {
        animation: holeExpand 0.3s ease-out;
    }
    
    /* Enhanced visibility and prominence */
    .hero-title, .section-title {
        text-shadow: 
            0 0 10px #00ff00,
            0 0 20px #00ff00,
            0 0 30px #00ff00,
            0 0 40px #00ff00;
    }
    
    .work-item:hover, .skill-tag:hover, .btn:hover {
        transform: scale(1.1) !important;
        box-shadow: 
            0 0 30px #00ff00,
            0 0 60px rgba(0, 255, 0, 0.5),
            0 0 90px rgba(0, 255, 0, 0.3) !important;
    }
    
    /* Performance optimizations */
    .binary-column {
        will-change: transform;
    }
    
    .cursor-trail {
        will-change: transform, opacity;
    }
    
    .particle-container > div {
        will-change: transform, opacity;
    }
    
    .neural-pulse, .liquid-morph, .data-stream {
        will-change: transform, opacity, filter;
    }
`;
document.head.appendChild(style);
