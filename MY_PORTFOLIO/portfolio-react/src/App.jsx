import React, { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import Starfield from './components/Starfield';
import IntroOverlay from './components/IntroOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useRevealOnScroll from './hooks/useRevealOnScroll';
import './App.css';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useRevealOnScroll();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App">
      <Cursor />
      <Starfield />
      {!introComplete && <IntroOverlay onComplete={() => setIntroComplete(true)} />}
      <Navbar />
      <Hero />
      <Profile />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
