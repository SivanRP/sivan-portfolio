/* ========================================
   MODERN PORTFOLIO JAVASCRIPT - SIVAN PUSHPAGIRI
   ======================================== */

// Global variables for state management
let isMenuOpen = false;
let isScrolling = false;
let currentTheme = 'dark';
let typingIndex = 0;
let typingTexts = [
  'AI/ML Developer',
  'Python Enthusiast', 
  'Neural Network Architect',
  'Automation Specialist',
  'Problem Solver',
  'Tech Innovator'
];

// ========================================
// INITIALIZATION - THE STUFF OF LEGENDS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log('🚀 Portfolio initialized successfully!');
  
  // Initialize all features - now with MIND-BLOWING effects!
  initializeAnimations();
  initializeNavigation();
  initializeTypingAnimation();
  initializeScrollEffects();
  initializeCursorFollower();
  initializeThemeToggle();
  initializeSkillBars();
  initializeContactForm();
  initializeBackToTop();
  initializeParticleEffects();
  
  // NEW INSANE FEATURES - These will blow minds!
  initializeLetterFallEffect();
  initializeMatrixRain();
  initializeGlitchEffects();
  initializeQuantumTunnels();
  initializeNeuralNetworkPulse();
  initializeDimensionalShifts();
  initializeLiquidMorphing();
  initializeHolographicEffects();
  
  // PERSONAL TOUCHES - Adding personality and smoothness!
  initializeCursorTrail();
  initializePersonalStatus();
  
  // Add some personality to the console - now with more insanity!
  console.log('%c👋 Hey there! Thanks for checking out my code!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
  console.log('%c💡 This portfolio is built with vanilla JavaScript, CSS3, and lots of ☕', 'color: #06b6d4; font-size: 14px;');
  console.log('%c🔗 Connect with me: https://linkedin.com/in/sivanreddypushpagiri/', 'color: #10b981; font-size: 12px;');
  console.log('%c🌟 You just witnessed the power of pure creativity!', 'color: #f59e0b; font-size: 14px; font-weight: bold;');
  console.log('%c⚡ Try hovering over letters, clicking buttons, and scrolling!', 'color: #ef4444; font-size: 12px;');
});

// ========================================
// ANIMATION INITIALIZATION
// ========================================

function initializeAnimations() {
  // Initialize AOS (Animate On Scroll) library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100
    });
  }
  
  // Add custom scroll-triggered animations
  addScrollAnimations();
}

function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special animations for skill bars
        if (entry.target.classList.contains('skill-progress')) {
          animateSkillBar(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

function initializeNavigation() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const nav = document.querySelector(".glass-nav");
  
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScrollTo(target);
        // Close mobile menu if open
        if (isMenuOpen) {
          toggleMenu();
        }
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  isMenuOpen = !isMenuOpen;
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Add some fun animation
  if (isMenuOpen) {
    console.log('🍔 Menu opened!');
  } else {
    console.log('❌ Menu closed!');
  }
}

function smoothScrollTo(target) {
  const targetPosition = target.offsetTop - 80; // Account for fixed navbar
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

// ========================================
// TYPING ANIMATION
// ========================================

function initializeTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      typeSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeText, typeSpeed);
  }
  
  // Start typing animation
  typeText();
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initializeScrollEffects() {
  // Parallax effect for floating elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon, .shape');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
  
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.stat-card, .skill-card, .project-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
}

// ========================================
// CURSOR FOLLOWER
// ========================================

function initializeCursorFollower() {
  const cursor = document.querySelector('.cursor-follower');
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
  
  function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

// ========================================
// THEME TOGGLE
// ========================================

function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.querySelector('.theme-toggle i');
  
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  console.log(`🎨 Theme changed to: ${theme}`);
}

// ========================================
// SKILL BARS ANIMATION
// ========================================

function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0%';
    bar.setAttribute('data-width', width);
  });
}

function animateSkillBar(bar) {
  const targetWidth = bar.getAttribute('data-width');
  let currentWidth = 0;
  
  const animation = setInterval(() => {
    if (currentWidth >= targetWidth) {
      clearInterval(animation);
    } else {
      currentWidth += 2;
      bar.style.width = currentWidth + '%';
    }
  }, 20);
}

// ========================================
// CONTACT FORM
// ========================================

function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message sent successfully! 🚀', 'success');
    
    // Reset form
    form.reset();
    
    // Log the submission (in real app, send to server)
    console.log('📧 Contact form submitted:', data);
  });
  
  // Add floating label effect
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#10b981' : '#6366f1',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });
  
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
// BACK TO TOP BUTTON
// ========================================

function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========================================
// PARTICLE EFFECTS
// ========================================

function initializeParticleEffects() {
  // Add some interactive particles on mouse move
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // 5% chance
      createParticle(e.clientX, e.clientY);
    }
  });
}

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  Object.assign(particle.style, {
    position: 'fixed',
    left: x + 'px',
    top: y + 'px',
    width: '4px',
    height: '4px',
    background: '#6366f1',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '1000',
    animation: 'particleFloat 2s ease-out forwards'
  });
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    document.body.removeChild(particle);
  }, 2000);
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(0);
    }
  }
`;
document.head.appendChild(style);

// ========================================
// UTILITY FUNCTIONS
// ========================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    smoothScrollTo(section);
  }
}

// Add some fun console commands
window.portfolio = {
  changeTheme: () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  },
  showNotification: showNotification,
  scrollToSection: scrollToSection,
  version: '2.0.0',
  author: 'Sivan Pushpagiri'
};

console.log('%c🎉 Portfolio loaded! Try: portfolio.changeTheme() or portfolio.showNotification("Hello!")', 'color: #f59e0b; font-size: 14px;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Throttle scroll events for better performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Scroll-based animations here
}, 16)); // ~60fps

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen) {
    toggleMenu();
  }
});

// Add focus management for better accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// ========================================
// MIND-BLOWING NEW FEATURES - THE STUFF OF LEGENDS
// ========================================

// Letter Falling Effect - When you hover over letters, they literally fall down!
function initializeLetterFallEffect() {
  console.log('🎭 Initializing letter fall effect...');
  
  // Find all headings and wrap each letter in a span
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach(heading => {
    const text = heading.textContent;
    heading.innerHTML = '';
    
    // Split text into individual characters and wrap each in a span
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space for spaces
      span.className = 'letter-fall';
      span.style.animationDelay = `${index * 0.05}s`; // Stagger the animation
      heading.appendChild(span);
    });
  });
  
  // Add click effect to letters
  document.querySelectorAll('.letter-fall').forEach(letter => {
    letter.addEventListener('click', () => {
      letter.style.animation = 'letterFall 0.6s ease-in-out forwards';
      setTimeout(() => {
        letter.style.animation = '';
      }, 600);
    });
  });
}

// Matrix Rain Effect - Like the Matrix but cooler!
function initializeMatrixRain() {
  console.log('🌧️ Initializing matrix rain effect...');
  
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
  `;
  
  document.body.appendChild(matrixContainer);
  
  // Create matrix rain columns
  for (let i = 0; i < 50; i++) {
    createMatrixColumn(matrixContainer, i);
  }
}

function createMatrixColumn(container, index) {
  const column = document.createElement('div');
  column.style.cssText = `
    position: absolute;
    top: -100px;
    left: ${index * 2}%;
    width: 2px;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #00ff00, transparent);
    animation: matrixRain ${3 + Math.random() * 4}s linear infinite;
    animation-delay: ${Math.random() * 2}s;
  `;
  
  container.appendChild(column);
}

// Glitch Effects - Digital distortion madness!
function initializeGlitchEffects() {
  console.log('⚡ Initializing glitch effects...');
  
  // Add glitch effect to random elements
  setInterval(() => {
    const elements = document.querySelectorAll('.project-card, .skill-card, .stat-card');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomElement) {
      randomElement.style.animation = 'glitch 0.3s ease-in-out';
      setTimeout(() => {
        randomElement.style.animation = '';
      }, 300);
    }
  }, 5000); // Glitch every 5 seconds
}

// Quantum Tunnels - Elements that tunnel through space!
function initializeQuantumTunnels() {
  console.log('🌀 Initializing quantum tunnels...');
  
  // Add quantum tunnel effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.animation = 'quantumTunnel 0.8s ease-in-out';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.animation = '';
    });
  });
}

// Neural Network Pulse - Like a brain firing!
function initializeNeuralNetworkPulse() {
  console.log('🧠 Initializing neural network pulse...');
  
  // Add neural pulse to skill cards
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.animation = 'neuralPulse 1s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.animation = '';
    });
  });
}

// Dimensional Shifts - Elements that shift between dimensions!
function initializeDimensionalShifts() {
  console.log('🌌 Initializing dimensional shifts...');
  
  // Add dimensional shift to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.animation = 'dimensionalShift 1.5s ease-in-out';
      setTimeout(() => {
        card.style.animation = '';
      }, 1500);
    });
  });
}

// Liquid Morphing - Shapes that flow like liquid!
function initializeLiquidMorphing() {
  console.log('💧 Initializing liquid morphing...');
  
  // Add liquid morph to floating shapes
  document.querySelectorAll('.shape').forEach(shape => {
    shape.addEventListener('mouseenter', () => {
      shape.style.animation = 'liquidMorph 2s ease-in-out infinite';
    });
    
    shape.addEventListener('mouseleave', () => {
      shape.style.animation = 'float 6s ease-in-out infinite';
    });
  });
}

// Holographic Effects - Like a hologram coming to life!
function initializeHolographicEffects() {
  console.log('🌈 Initializing holographic effects...');
  
  // Add holographic shimmer to social links
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.animation = 'holographicShimmer 1s ease-in-out infinite';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.animation = '';
    });
  });
}

// Particle Explosion on Click - When you click, particles explode everywhere!
function createParticleExplosion(x, y) {
  const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle-explosion';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 50 + Math.random() * 100;
    const size = 3 + Math.random() * 5;
    
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      animation: particleExplosion 1s ease-out forwards;
      transform: translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px);
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      document.body.removeChild(particle);
    }, 1000);
  }
}

// Add click explosion effect to the entire page
document.addEventListener('click', (e) => {
  createParticleExplosion(e.clientX, e.clientY);
});

// Time Warp Effect - Smooth, elegant space-time distortion!
function initializeTimeWarp() {
  console.log('⏰ Initializing time warp effects...');
  
  // Add time warp to scroll events - but much more subtle and smooth
  let lastScrollTime = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 200) { // Reduced frequency for smoother experience
      lastScrollTime = now;
      
      // Much more subtle time warp effect
      if (Math.random() > 0.98) { // Even more rare
        const elements = document.querySelectorAll('.floating-icon, .shape');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement) {
          randomElement.style.animation = 'timeWarp 1.5s ease-in-out';
          setTimeout(() => {
            randomElement.style.animation = '';
          }, 1500);
        }
      }
    }
  });
}

// Initialize time warp
initializeTimeWarp();

// Cursor Trail Effect - Leaves a beautiful trail behind the cursor
function initializeCursorTrail() {
  console.log('✨ Initializing cursor trail effect...');
  
  let trailElements = [];
  const maxTrailLength = 10;
  
  document.addEventListener('mousemove', (e) => {
    // Create trail element
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    document.body.appendChild(trail);
    trailElements.push(trail);
    
    // Remove old trail elements
    if (trailElements.length > maxTrailLength) {
      const oldTrail = trailElements.shift();
      if (oldTrail && oldTrail.parentNode) {
        oldTrail.parentNode.removeChild(oldTrail);
      }
    }
    
    // Remove trail element after animation
    setTimeout(() => {
      if (trail && trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
    }, 500);
  });
}

// Initialize cursor trail
initializeCursorTrail();

// Personal Status Rotator - Changes my status periodically
function initializePersonalStatus() {
  console.log('🎭 Initializing personal status rotator...');
  
  const statusElement = document.querySelector('.personal-status .status-text');
  const emojiElement = document.querySelector('.personal-status .status-emoji');
  
  const statuses = [
    { emoji: '🚀', text: 'Building the future' },
    { emoji: '💡', text: 'Ideas flowing' },
    { emoji: '⚡', text: 'Coding at light speed' },
    { emoji: '🎨', text: 'Creating magic' },
    { emoji: '🧠', text: 'Solving problems' },
    { emoji: '🌟', text: 'Making dreams reality' }
  ];
  
  let currentIndex = 0;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % statuses.length;
    const status = statuses[currentIndex];
    
    // Smooth transition
    statusElement.style.opacity = '0';
    emojiElement.style.opacity = '0';
    
    setTimeout(() => {
      statusElement.textContent = status.text;
      emojiElement.textContent = status.emoji;
      statusElement.style.opacity = '1';
      emojiElement.style.opacity = '1';
    }, 200);
  }, 3000); // Change every 3 seconds
}

// Initialize personal status
initializePersonalStatus();

// Add some insane console commands
window.portfolio = {
  changeTheme: () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  },
  showNotification: showNotification,
  scrollToSection: scrollToSection,
  version: '3.0.0',
  author: 'Sivan Pushpagiri',
  // NEW INSANE COMMANDS!
  glitch: () => {
    document.querySelectorAll('*').forEach(el => {
      el.style.animation = 'glitch 0.5s ease-in-out';
      setTimeout(() => el.style.animation = '', 500);
    });
  },
  matrix: () => {
    document.body.style.filter = 'hue-rotate(120deg)';
    setTimeout(() => document.body.style.filter = '', 2000);
  },
  quantum: () => {
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.animation = 'quantumTunnel 1s ease-in-out';
      setTimeout(() => card.style.animation = '', 1000);
    });
  },
  explode: () => {
    createParticleExplosion(window.innerWidth / 2, window.innerHeight / 2);
  }
};

console.log('%c🎉 Portfolio loaded! Try these INSANE commands:', 'color: #f59e0b; font-size: 14px;');
console.log('%cportfolio.glitch() - Glitch everything!', 'color: #ef4444; font-size: 12px;');
console.log('%cportfolio.matrix() - Matrix mode!', 'color: #10b981; font-size: 12px;');
console.log('%cportfolio.quantum() - Quantum tunnel effect!', 'color: #6366f1; font-size: 12px;');
console.log('%cportfolio.explode() - Particle explosion!', 'color: #f59e0b; font-size: 12px;');

console.log('✨ All systems initialized! Portfolio is ready to BLOW MINDS! 🚀');
