# 🚀 Sivan Pushpagiri's Portfolio Website

> **A modern, interactive portfolio website showcasing AI/ML development skills and projects**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![AOS](https://img.shields.io/badge/AOS-Animation%20Library-4CAF50?style=for-the-badge)](https://michalsnik.github.io/aos/)

## ✨ Features

### 🎨 **Modern Design**
- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence
- **Glassmorphism Effects** - Beautiful glass-like UI elements with backdrop blur
- **Gradient Animations** - Dynamic color gradients throughout the interface
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices
- **Custom Cursor** - Interactive cursor follower for enhanced user experience

### 🎭 **Animations & Interactions**
- **Typing Animation** - Dynamic text that types and deletes different roles
- **Scroll Animations** - Elements animate in as you scroll using AOS library
- **Parallax Effects** - Floating elements move at different speeds for depth
- **Hover Effects** - Smooth transitions and transformations on hover
- **Particle System** - Interactive particles that follow mouse movement
- **Skill Bar Animations** - Animated progress bars for technical skills

### 🛠 **Technical Features**
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS Custom Properties** - Modern CSS variables for easy theming
- **Intersection Observer** - Efficient scroll-based animations
- **Throttled Events** - Optimized performance for smooth scrolling
- **Accessibility** - Keyboard navigation and screen reader support
- **SEO Optimized** - Meta tags and semantic HTML structure

### 📱 **Sections**
1. **Hero Section** - Eye-catching introduction with animated profile image
2. **About Section** - Personal story with interactive stats and tech stack
3. **Experience Section** - Skills showcase with animated progress bars
4. **Projects Section** - Featured projects with hover effects and links
5. **Contact Section** - Interactive contact form and social links
6. **Footer** - Additional links and information

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/SivanRP/portfolio-website.git
   cd portfolio-website
   ```

2. **Open in Browser**
   - Simply open `index.html` in your browser
   - Or use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Customize**
   - Update personal information in `index.html`
   - Modify colors and styles in `style.css`
   - Add your own projects and skills
   - Replace profile images in the `assets/` folder

## 🎯 Customization Guide

### 🎨 **Changing Colors**
The website uses CSS custom properties for easy theming. Edit the `:root` section in `style.css`:

```css
:root {
  --primary-color: #6366f1;    /* Main brand color */
  --secondary-color: #06b6d4;  /* Accent color */
  --accent-color: #f59e0b;     /* Highlight color */
  /* ... more variables */
}
```

### 📝 **Updating Content**

#### Personal Information
Update the hero section in `index.html`:
```html
<h1 class="title">
  <span class="name-primary">Your</span>
  <span class="name-accent">Name</span>
</h1>
```

#### Skills & Experience
Modify the experience section with your skills:
```html
<div class="skill-progress" data-width="95"></div>
<span class="skill-percentage">95%</span>
```

#### Projects
Add your projects in the projects section:
```html
<div class="project-card">
  <h3 class="project-title">Your Project</h3>
  <p class="project-description">Project description...</p>
</div>
```

### 🖼️ **Adding Images**
1. Add your images to the `assets/` folder
2. Update image paths in `index.html`
3. Recommended sizes:
   - Profile image: 400x400px
   - Project images: 600x400px
   - Icons: 64x64px

## 🛠 **Technical Details**

### File Structure
```
portfolio-website/
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── script.js           # JavaScript functionality
├── assets/             # Images and media
│   ├── profile-pic.png
│   ├── about-pic.png
│   ├── project-*.png
│   └── *.png
└── README.md           # This file
```

### Dependencies
- **AOS (Animate On Scroll)** - CDN loaded animation library
- **Font Awesome** - Icon library
- **Google Fonts** - Inter and JetBrains Mono fonts

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎮 **Interactive Features**

### Console Commands
Open browser console and try these commands:
```javascript
portfolio.changeTheme()                    // Toggle dark/light mode
portfolio.showNotification("Hello!")      // Show notification
portfolio.scrollToSection('about')        // Scroll to section
portfolio.version                         // Check version
```

### Keyboard Shortcuts
- `Escape` - Close mobile menu
- `Tab` - Navigate through interactive elements

## 🚀 **Performance Optimizations**

- **Throttled Scroll Events** - Smooth 60fps animations
- **Intersection Observer** - Efficient scroll-based animations
- **CSS Custom Properties** - Fast theme switching
- **Optimized Images** - Compressed and properly sized
- **Minimal Dependencies** - Fast loading times

## 🎨 **Design Philosophy**

This portfolio follows modern web design principles:

- **Mobile-First** - Designed for mobile, enhanced for desktop
- **Progressive Enhancement** - Works without JavaScript
- **Accessibility** - WCAG 2.1 compliant
- **Performance** - Optimized for speed and smoothness
- **User Experience** - Intuitive and engaging interactions

## 🤝 **Contributing**

Feel free to fork this project and customize it for your own use! If you make improvements, consider:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 📞 **Contact**

**Sivan Pushpagiri**
- 📧 Email: sivanrp515@gmail.com
- 💼 LinkedIn: [sivanreddypushpagiri](https://linkedin.com/in/sivanreddypushpagiri/)
- 🐙 GitHub: [SivanRP](https://github.com/SivanRP)
- 🌐 Website: [Your Website URL]

## 🙏 **Acknowledgments**

- **AOS Library** - For smooth scroll animations
- **Font Awesome** - For beautiful icons
- **Google Fonts** - For typography
- **CSS-Tricks** - For inspiration and techniques
- **MDN Web Docs** - For comprehensive documentation

---

<div align="center">

**⭐ If you like this portfolio, give it a star! ⭐**

*Built with ❤️ and lots of ☕ by Sivan Pushpagiri*

[![GitHub stars](https://img.shields.io/github/stars/SivanRP/portfolio-website?style=social)](https://github.com/SivanRP/portfolio-website)
[![GitHub forks](https://img.shields.io/github/forks/SivanRP/portfolio-website?style=social)](https://github.com/SivanRP/portfolio-website)

</div>
