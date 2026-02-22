import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    const navbar = document.querySelector('nav');
    if (element && navbar) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20,
        behavior: 'smooth'
      });
    }
    setMobileNavOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <div className="nav-logo">
            VP<span>/dev</span>
          </div>
          <div className="nav-links">
            <a href="#profile" onClick={(e) => { e.preventDefault(); scrollToSection('#profile'); }}>About</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('#skills'); }}>Skills</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}>Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>Contact</a>
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className="knob"></div>
            </div>
          </div>
          <div className="hamburger" onClick={() => setMobileNavOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
        <span className="mobile-close" onClick={() => setMobileNavOpen(false)}>&times;</span>
        <a href="#profile" onClick={(e) => { e.preventDefault(); scrollToSection('#profile'); }}>About</a>
        <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('#skills'); }}>Skills</a>
        <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}>Projects</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>Contact</a>
      </div>
    </>
  );
};

export default Navbar;
