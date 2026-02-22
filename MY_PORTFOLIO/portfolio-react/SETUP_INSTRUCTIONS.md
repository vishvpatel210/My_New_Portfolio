# 🚀 Quick Setup Guide

## Step 1: Prerequisites
Make sure you have Node.js installed (v16 or higher):
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

## Step 2: Extract & Navigate
```bash
# Extract the portfolio-react folder
cd portfolio-react
```

## Step 3: Install Dependencies
```bash
npm install
```

This will install:
- React 18
- React DOM
- Three.js (for 3D effects)
- Vite (development server)

## Step 4: Run Development Server
```bash
npm run dev
```

The portfolio will open automatically in your browser at `http://localhost:3000`

## Step 5: Customize Your Portfolio

### Update Personal Info:
1. Open `src/components/Hero.jsx` - Change name and tagline
2. Open `src/components/Profile.jsx` - Update about text
3. Open `src/components/Projects.jsx` - Add your projects
4. Open `src/components/Contact.jsx` - Add your email and social links

### Customize Colors:
Edit `src/App.css` and modify the CSS variables:
```css
:root {
  --neon: #39ff14;     /* Change primary color */
  --blue: #00d4ff;     /* Change accent color */
}
```

## Step 6: Build for Production
```bash
npm run build
```

This creates an optimized `dist` folder ready for deployment.

## Step 7: Deploy

### Option A: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Option B: Netlify
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder

### Option C: GitHub Pages
1. Push your code to GitHub
2. Go to repo Settings → Pages
3. Select the branch and save

## 🎯 Key Features to Explore

1. **Cinematic Intro** - Rocket launch animation (skip button in bottom-right)
2. **Custom Cursor** - Move your mouse to see the premium cursor effect
3. **3D Skills Orb** - Drag to rotate the interactive skill sphere
4. **3D Project Cards** - Hover over projects for tilt effect
5. **Theme Toggle** - Switch between dark/light modes (top-right)
6. **Contact Form** - Try submitting to see confetti animation

## 📱 Testing on Mobile

```bash
# Find your local IP
ipconfig getifaddr en0  # Mac
ip addr show           # Linux

# Access from phone at:
http://YOUR_IP:3000
```

## 🐛 Troubleshooting

### Port 3000 already in use?
Change port in `vite.config.js`:
```js
server: {
  port: 3001  // Change to any available port
}
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Three.js errors?
Make sure you're using Node 16+:
```bash
node --version  # Should be v16 or higher
```

## 🎨 Customization Tips

### Add Your Photo
Replace the "VP" initials in `Profile.jsx`:
```jsx
<div className="avatar-frame">
  <img src="/your-photo.jpg" alt="Your Name" />
</div>
```

### Change Fonts
Edit the Google Fonts import in `src/index.css`

### Modify Animations
- Durations in CSS keyframes
- Three.js rotation speed in `Skills.jsx`
- Cursor behavior in `Cursor.jsx`

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [Three.js Journey](https://threejs-journey.com)
- [Vite Guide](https://vitejs.dev/guide)

---

**Need Help?** Check the main README.md for detailed documentation!
