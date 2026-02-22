import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
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
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>
                <span className="hi">Hi, I'm</span>
                <span className="name">Vishv Patel</span>
                <span className="role">Full-Stack Developer</span>
              </h1>
              <p className="hero-tagline">
                Building scalable and user-friendly applications with modern technologies
              </p>
              <div className="hero-buttons">
                <a 
                  href="#projects" 
                  className="btn" 
                  onClick={(e) => { e.preventDefault(); handleButtonClick(e); scrollToSection('#projects'); }}
                >
                  View Projects
                </a>
                <a 
                  href="#profile" 
                  className="btn btn-outline" 
                  onClick={(e) => { e.preventDefault(); handleButtonClick(e); scrollToSection('#profile'); }}
                >
                  About Me
                </a>
              </div>
            </div>
            <div className="hero-code-wrap">
              <div className="code-card">
                <div className="code-dots">
                  <span className="red"></span>
                  <span className="yellow"></span>
                  <span className="green"></span>
                </div>
                <div className="code-line">
                  <span className="c-kw">const</span> <span className="c-var">developer</span> <span className="c-punc">=</span> <span className="c-punc">{'{'}</span>
                </div>
                <div className="code-line">
                  &nbsp;&nbsp;<span className="c-fn">skills</span><span className="c-punc">:</span> <span className="c-punc">[</span><span className="c-str">'React'</span><span className="c-punc">,</span> <span className="c-str">'Node'</span><span className="c-punc">,</span> <span className="c-str">'UI/UX'</span><span className="c-punc">],</span>
                </div>
                <div className="code-line">
                  &nbsp;&nbsp;<span className="c-fn">passion</span><span className="c-punc">:</span> <span className="c-str">'Creating amazing web experiences'</span><span className="c-punc">,</span>
                </div>
                <div className="code-line">
                  &nbsp;&nbsp;<span className="c-fn">available</span><span className="c-punc">:</span> <span className="c-kw">true</span>
                </div>
                <div className="code-line">
                  <span className="c-punc">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <div className="arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
