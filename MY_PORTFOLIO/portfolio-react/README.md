# 🚀 Premium Portfolio Website - React Version

A modern, premium Full-Stack Developer portfolio website with advanced animations, interactive 3D elements, and a stunning dark UI aesthetic. Converted from HTML to React with all original features preserved.

## ✨ Features

### 🎨 Visual & Design
- **Dark Theme** with smooth toggle to light mode
- **Neon Green & Electric Blue** color scheme
- **Custom Premium Cursor** with trailing glow effect
- **Animated Starfield Background** with twinkling stars
- **Cinematic Rocket Launch Intro** animation

### 🎭 Animations & Interactions
- **Hero Section** with staggered text reveals and floating code card
- **3D Avatar** with parallax tilt effect and floating skill badges
- **Interactive 3D Skills Orb** built with Three.js
  - Drag to rotate
  - Golden ratio sphere distribution
  - Glass morphism effects
  - Particle systems
- **Project Cards** with 3D tilt on hover
- **Smooth Scroll Reveals** with Intersection Observer
- **Ripple Effects** on button clicks
- **Confetti Burst** on form submission

### 📱 Sections
1. **Hero** - Eye-catching introduction with animated code snippet
2. **Profile** - About section with 3D avatar and skill tags
3. **Skills** - Interactive 3D orb showcasing technical proficiencies
4. **Projects** - Grid of featured projects with hover effects
5. **Contact** - Functional contact form with social links
6. **Footer** - Clean footer with copyright

### 🛠 Tech Stack
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Three.js** - 3D graphics for skills orb
- **CSS3** - Advanced animations and effects
- **Google Fonts** - Orbitron, Rajdhani, Share Tech Mono

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Setup

1. **Clone or download the project**
```bash
cd portfolio-react
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🎯 Project Structure

```
portfolio-react/
├── src/
│   ├── components/
│   │   ├── Cursor.jsx          # Custom cursor component
│   │   ├── Starfield.jsx       # Animated background
│   │   ├── IntroOverlay.jsx    # Rocket launch intro
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Profile.jsx         # About section
│   │   ├── Skills.jsx          # 3D skills orb
│   │   ├── Projects.jsx        # Projects grid
│   │   ├── Contact.jsx         # Contact form
│   │   └── Footer.jsx          # Footer
│   ├── hooks/
│   │   └── useRevealOnScroll.js # Scroll reveal hook
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── main.jsx                # React entry point
│   └── index.css               # Base styles
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies

```

## 🎨 Customization

### Personal Information
Update your details in the components:
- `Hero.jsx` - Name, tagline
- `Profile.jsx` - About text, skills
- `Skills.jsx` - Skill names and percentages
- `Projects.jsx` - Project data
- `Contact.jsx` - Email and social links

### Colors & Theme
Modify CSS variables in `App.css`:
```css
:root {
  --neon: #39ff14;    /* Primary neon green */
  --blue: #00d4ff;    /* Accent blue */
  --bg: #08091a;      /* Background dark */
  /* ... */
}
```

### Animations
- Adjust timing in CSS keyframes
- Modify Three.js parameters in `Skills.jsx`
- Customize cursor behavior in `Cursor.jsx`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## 📝 Features Breakdown

### Custom Cursor
- Smooth trailing effect
- Hover state transformations
- Click burst animation
- Disabled on touch devices

### 3D Skills Orb
- Golden ratio distribution of skill labels
- Glass morphism material
- Inner core with pulse animation
- Ambient particle system
- Mouse/touch drag rotation
- Auto-rotation when idle

### Reveal Animations
- Intersection Observer API
- Staggered delays
- Smooth fade-up transitions
- Threshold-based triggering

### Contact Form
- Client-side validation
- Animated send button
- Status messages
- Confetti celebration on success
- Ready for backend integration

## 🎯 Performance

- Optimized Three.js rendering
- Lazy-loaded components
- CSS-only animations where possible
- Efficient event listeners
- Smooth 60fps animations

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 420px, 700px, 900px
- Hamburger menu for mobile
- Touch-optimized interactions
- Adaptive grid layouts

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the MIT License.

## 🙋‍♂️ Support

For issues or questions:
1. Check existing documentation
2. Review component code comments
3. Create an issue on GitHub

## 🎉 Credits

- **Three.js** - 3D graphics library
- **Google Fonts** - Typography
- **React** - UI framework
- **Vite** - Build tool

---

**Made with ❤️ and lots of ☕**

*Feel free to customize, fork, and make it your own!*
