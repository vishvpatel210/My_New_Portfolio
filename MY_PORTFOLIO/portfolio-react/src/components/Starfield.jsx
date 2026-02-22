import React, { useEffect, useRef } from 'react';
import './Starfield.css';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const cnt = Math.floor(W * H * 0.00015);
      for (let i = 0; i < cnt; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.05 + 0.01
        });
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      stars.forEach(s => {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = H;
          s.x = Math.random() * W;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${s.alpha})`;
        ctx.fill();

        if (Math.random() < 0.005) {
          s.alpha = Math.random() * 0.6 + 0.2;
        }
      });

      requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfieldCanvas" className="starfield-canvas" />;
};

export default Starfield;
