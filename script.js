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

// Cursor Trail Effect - Optimized
function initCursorTrail() {
    const trail = [];
    const trailLength = 10; // Reduced for better performance
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transform: scale(${1 - (i / trailLength)});
            box-shadow: 0 0 8px #00ff00;
            will-change: transform, opacity;
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    // Throttled mouse move
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
        }, 100);
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
                
                x += (nextDot.x - x) * 0.4;
                y += (nextDot.y - y) * 0.4;
            });
        }
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Binary Rain Effect - Fixed
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
    const columns = Math.floor(window.innerWidth / 25);
    
    for (let i = 0; i < columns; i++) {
        createBinaryColumn(i);
    }
    
    function createBinaryColumn(index) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${index * 25}px;
            width: 25px;
            height: 100vh;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #00ff00;
            opacity: 0.15;
            line-height: 1.2;
            will-change: transform;
        `;
        
        let binaryString = '';
        for (let i = 0; i < 40; i++) {
            binaryString += binaryChars[Math.floor(Math.random() * binaryChars.length)] + '<br>';
        }
        column.innerHTML = binaryString;
        
        // Start animation
        let position = -100;
        const speed = 0.5 + Math.random() * 1.5;
        
        function animate() {
            position += speed;
            column.style.transform = `translateY(${position}px)`;
            
            if (position > window.innerHeight + 100) {
                position = -100;
                // Regenerate binary string
                let newBinaryString = '';
                for (let i = 0; i < 40; i++) {
                    newBinaryString += binaryChars[Math.floor(Math.random() * binaryChars.length)] + '<br>';
                }
                column.innerHTML = newBinaryString;
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        binaryContainer.appendChild(column);
    }
}

// Particle Effects - Optimized
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
    const maxParticles = 50; // Limit particles for performance
    
    function createParticle(x, y) {
        if (particles.length >= maxParticles) {
            // Remove oldest particle
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
            width: 2px;
            height: 2px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 8px #00ff00;
            will-change: transform, opacity;
        `;
        
        particleContainer.appendChild(particle);
        particles.push(particle);
        
        // Animate particle
        let frame = 0;
        const maxFrames = 120; // 2 seconds at 60fps
        const vx = (Math.random() - 0.5) * 2;
        const vy = -2 - Math.random() * 2;
        
        function animateParticle() {
            frame++;
            const progress = frame / maxFrames;
            
            particle.style.transform = `translate(${vx * frame}px, ${vy * frame}px) scale(${1 - progress})`;
            particle.style.opacity = 1 - progress;
            
            if (frame < maxFrames) {
                requestAnimationFrame(animateParticle);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                const index = particles.indexOf(particle);
                if (index > -1) {
                    particles.splice(index, 1);
                }
            }
        }
        
        animateParticle();
    }
    
    // Create particles on mouse move - throttled
    let lastParticleTime = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastParticleTime > 150) { // Increased throttle
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
    
    .cursor-trail {
        transition: all 0.1s ease;
    }
    
    .explosion-hole {
        animation: holeExpand 0.3s ease-out;
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
`;
document.head.appendChild(style);
