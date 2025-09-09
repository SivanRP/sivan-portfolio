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

// Binary Rain Effect - COMPLETELY REWRITTEN
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
    const binaryColumns = [];
    
    // Create columns
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        column.style.cssText = `
            position: absolute;
            top: 0;
            left: ${i * 20}px;
            width: 20px;
            height: 100vh;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: #00ff00;
            opacity: 0.3;
            line-height: 1.1;
            will-change: transform;
            overflow: hidden;
        `;
        
        binaryContainer.appendChild(column);
        binaryColumns.push({
            element: column,
            position: -Math.random() * 1000,
            speed: 1 + Math.random() * 3,
            chars: generateBinaryString(50)
        });
    }
    
    function generateBinaryString(length) {
        let str = '';
        for (let i = 0; i < length; i++) {
            str += binaryChars[Math.floor(Math.random() * binaryChars.length)] + '<br>';
        }
        return str;
    }
    
    function animateBinaryRain() {
        binaryColumns.forEach(column => {
            column.position += column.speed;
            
            if (column.position > window.innerHeight + 100) {
                column.position = -100;
                column.chars = generateBinaryString(50);
            }
            
            column.element.style.transform = `translateY(${column.position}px)`;
            column.element.innerHTML = column.chars;
        });
        
        requestAnimationFrame(animateBinaryRain);
    }
    
    animateBinaryRain();
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

// MIND-BLOWING EFFECTS 🔥
function initMindBlowingEffects() {
    // 1. Matrix-style glitch text effect
    initGlitchText();
    
    // 2. Holographic shimmer on hover
    initHolographicShimmer();
    
    // 3. Quantum tunnel effect on scroll
    initQuantumTunnel();
    
    // 4. Neural network pulse
    initNeuralPulse();
    
    // 5. Dimensional shift on click
    initDimensionalShift();
    
    // 6. Liquid morphing background
    initLiquidMorph();
    
    // 7. Data stream effect
    initDataStream();
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

// Quantum Tunnel Effect
function initQuantumTunnel() {
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            createQuantumTunnel();
        }, 100);
    });
    
    function createQuantumTunnel() {
        const tunnel = document.createElement('div');
        tunnel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, 
                transparent 0%, 
                rgba(0, 255, 0, 0.1) 30%, 
                rgba(0, 255, 255, 0.2) 60%, 
                transparent 100%
            );
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -50%) scale(0);
            animation: quantumTunnel 2s ease-out forwards;
        `;
        
        document.body.appendChild(tunnel);
        
        setTimeout(() => {
            if (tunnel.parentNode) {
                tunnel.parentNode.removeChild(tunnel);
            }
        }, 2000);
    }
}

// Neural Network Pulse
function initNeuralPulse() {
    const pulseContainer = document.createElement('div');
    pulseContainer.className = 'neural-pulse';
    pulseContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        background: radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
        animation: neuralPulse 4s ease-in-out infinite;
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

// Liquid Morph
function initLiquidMorph() {
    const morphContainer = document.createElement('div');
    morphContainer.className = 'liquid-morph';
    morphContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        background: 
            radial-gradient(ellipse at 10% 20%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 0, 255, 0.1) 0%, transparent 50%);
        animation: liquidMorph 8s ease-in-out infinite;
    `;
    document.body.appendChild(morphContainer);
}

// Data Stream Effect
function initDataStream() {
    const dataContainer = document.createElement('div');
    dataContainer.className = 'data-stream';
    dataContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(dataContainer);
    
    function createDataStream() {
        const stream = document.createElement('div');
        const x = Math.random() * window.innerWidth;
        const speed = 2 + Math.random() * 3;
        
        stream.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: -50px;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, 
                transparent 0%, 
                #00ff00 50%, 
                transparent 100%
            );
            animation: dataStream ${speed}s linear forwards;
            box-shadow: 0 0 10px #00ff00;
        `;
        
        dataContainer.appendChild(stream);
        
        setTimeout(() => {
            if (stream.parentNode) {
                stream.parentNode.removeChild(stream);
            }
        }, speed * 1000);
    }
    
    // Create streams periodically
    setInterval(createDataStream, 200);
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
    
    @keyframes neuralPulse {
        0%, 100% { 
            opacity: 0.05;
            transform: scale(1);
        }
        50% { 
            opacity: 0.15;
            transform: scale(1.1);
        }
    }
    
    @keyframes dimensionalShift {
        0% { 
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
        }
        50% { 
            opacity: 1;
            transform: scale(1.1) rotate(180deg);
        }
        100% { 
            opacity: 0;
            transform: scale(1.2) rotate(360deg);
        }
    }
    
    @keyframes liquidMorph {
        0%, 100% { 
            transform: scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
        }
        25% { 
            transform: scale(1.1) rotate(90deg);
            filter: hue-rotate(90deg);
        }
        50% { 
            transform: scale(0.9) rotate(180deg);
            filter: hue-rotate(180deg);
        }
        75% { 
            transform: scale(1.05) rotate(270deg);
            filter: hue-rotate(270deg);
        }
    }
    
    @keyframes dataStream {
        0% { 
            transform: translateY(-100px);
            opacity: 0;
        }
        10% { 
            opacity: 1;
        }
        90% { 
            opacity: 1;
        }
        100% { 
            transform: translateY(100vh);
            opacity: 0;
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
