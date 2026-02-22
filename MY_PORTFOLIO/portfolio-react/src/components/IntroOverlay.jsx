import React, { useEffect, useRef, useState } from 'react';
import './IntroOverlay.css';

const IntroOverlay = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let stars = [];
    let rocket = { x: 0, y: 0, vy: -2.4 };
    let animId;
    let startTime = performance.now();

    const ROCKET_DUR = 1800;
    const LOGO_DELAY = 2200;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      rocket.x = W / 2;
      rocket.y = H + 80;
    };

    // Generate stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 1.5 + 0.3
      });
    }

    const drawStar = (s, t) => {
      ctx.globalAlpha = s.alpha * (0.7 + 0.3 * Math.sin(t * 0.05 + s.x));
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawRocket = (y) => {
      ctx.save();
      ctx.translate(W / 2, y);

      // Flame
      const grad = ctx.createLinearGradient(0, 18, 0, 80);
      grad.addColorStop(0, 'rgba(57,255,20,.9)');
      grad.addColorStop(0.4, 'rgba(0,212,255,.7)');
      grad.addColorStop(1, 'rgba(57,255,20,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(-12 + (Math.random() - 0.5) * 4, 70);
      ctx.lineTo(12 + (Math.random() - 0.5) * 4, 70);
      ctx.closePath();
      ctx.fill();

      // Body
      ctx.fillStyle = '#dfe5f0';
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(-10, 18);
      ctx.lineTo(10, 18);
      ctx.closePath();
      ctx.fill();

      // Window
      ctx.fillStyle = '#00d4ff';
      ctx.beginPath();
      ctx.arc(0, 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Fins
      ctx.fillStyle = '#6b7a9a';
      ctx.beginPath();
      ctx.moveTo(-10, 12);
      ctx.lineTo(-18, 18);
      ctx.lineTo(-10, 18);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10, 12);
      ctx.lineTo(18, 18);
      ctx.lineTo(10, 18);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    let t = 0;
    const loop = () => {
      t++;
      const now = performance.now();
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#08091a';
      ctx.fillRect(0, 0, W, H);

      // Stars
      const starDrift = elapsed > 600 ? Math.min((elapsed - 600) / 2000, 1) * 0.8 : 0;
      stars.forEach(s => {
        s.y -= starDrift * 0.6;
        if (s.y < -2) {
          s.y = H + 2;
          s.x = Math.random() * W;
        }
        drawStar(s, t);
      });

      // Rocket
      if (elapsed < ROCKET_DUR + 400) {
        const p = Math.min(elapsed / ROCKET_DUR, 1);
        const ey = easeOutExpo(p);
        const rocketY = H + 80 - (H + 160) * ey;
        if (rocketY < H + 10) drawRocket(rocketY);
      }

      // Show logo
      if (elapsed > LOGO_DELAY && logoRef.current && logoRef.current.style.opacity !== '1') {
        logoRef.current.style.opacity = '1';
        logoRef.current.style.transform = 'translateY(0)';
        setTimeout(() => {
          if (taglineRef.current) {
            taglineRef.current.style.opacity = '1';
            taglineRef.current.style.transform = 'translateY(0)';
          }
        }, 300);
      }

      // Auto-fade
      if (elapsed > 3200) {
        finishIntro();
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    const finishIntro = () => {
      cancelAnimationFrame(animId);
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    // Skip button handler
    const skipBtn = document.getElementById('introSkip');
    const handleSkip = () => finishIntro();
    if (skipBtn) {
      skipBtn.addEventListener('click', handleSkip);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (skipBtn) {
        skipBtn.removeEventListener('click', handleSkip);
      }
    };
  }, [onComplete]);

  return (
    <div id="introOverlay" className={`intro-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <canvas ref={canvasRef} id="introRocketCanvas" className="intro-rocket-canvas" />
      <div className="intro-text">
        <div ref={logoRef} className="logo">
          <span>VP</span>/dev
        </div>
        <div ref={taglineRef} className="tagline">Full-Stack Developer</div>
      </div>
      <div id="introSkip" className="intro-skip">Skip →</div>
    </div>
  );
};

export default IntroOverlay;
