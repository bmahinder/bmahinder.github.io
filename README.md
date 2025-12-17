# 🚀 Mahinder's Portfolio

A stunning, animated dark-themed portfolio website showcasing my skills and projects as a Full Stack Developer from India.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- **🎨 Premium Dark Theme** - Modern, eye-catching design with purple/indigo gradients
- **✨ Smooth Animations** - Scroll-reveal effects, parallax scrolling, and micro-interactions
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🎯 Interactive Elements** - Cursor trail effects, animated particles, and hover animations
- **⚡ Performance Optimized** - Debounced scroll events and lazy loading
- **🔍 SEO Friendly** - Proper meta tags and semantic HTML structure

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS for all interactions
- **Google Fonts** - Inter & Outfit font families

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with design system
├── script.js           # JavaScript for interactions
└── README.md           # Project documentation
```

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in your web browser:
```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Windows
start index.html
```

### Option 2: Local Server (Recommended)
Using Python's built-in server:
```bash
# Navigate to project directory
cd portfolio

# Start server (Python 3)
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization Guide

### 1. Personal Information
Update your details in `index.html`:
- **Name**: Line 57 - `<h1 class="hero-title">`
- **Description**: Lines 58-61 - `<p class="hero-description">`
- **Contact Info**: Lines 283-309 - Contact section

### 2. Skills
Modify skill cards in `index.html` (Lines 111-178):
```html
<div class="skill-card scroll-reveal">
    <div class="skill-icon">🌐</div>
    <h3 class="skill-name">Your Skill</h3>
    <p class="skill-level">Your Level</p>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

### 3. Projects
Update project cards in `index.html` (Lines 193-301):
- Change project titles, descriptions, and tags
- Update `href` attributes with your actual project URLs
- Replace emoji icons with custom images if desired

### 4. Social Media Links
Update social links in `index.html` (Lines 311-331):
```html
<a href="https://github.com/yourusername" class="social-link" target="_blank">
```

### 5. Color Scheme
Customize colors in `style.css` (Lines 2-20):
```css
:root {
  --accent-primary: #6366f1;    /* Primary accent color */
  --accent-secondary: #8b5cf6;  /* Secondary accent color */
  --bg-primary: #0a0a0f;        /* Main background */
  /* ... more variables */
}
```

## 🎯 Sections Overview

1. **Hero Section** - Introduction with animated greeting and stats
2. **Skills Section** - Showcase of technical skills with progress bars
3. **Projects Section** - Portfolio of featured projects
4. **Contact Section** - Contact information and social media links

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🌟 Key Animations

- **Scroll Reveal** - Elements fade in as you scroll
- **Typing Effect** - Animated hero subtitle
- **Cursor Trail** - Interactive particle trail
- **Floating Particles** - Ambient background animation
- **Progress Bars** - Animated skill level indicators
- **Hover Effects** - Card transformations and glows

## 🚀 Deployment

### GitHub Pages
1. Create a repository named `yourusername.github.io`
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```
3. Visit `https://yourusername.github.io`

### Netlify
1. Drag and drop the portfolio folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Vercel
```bash
npm i -g vercel
vercel
```

## 📄 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (limited support)

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📧 Contact

- **Email**: mahinder.dev@gmail.com
- **Location**: India
- **Status**: Available for Freelance

## 📝 License

This project is open source and available for personal and commercial use.

---

**Made with ❤️ by Mahinder © 2025**

*If you found this portfolio helpful, consider giving it a ⭐!*