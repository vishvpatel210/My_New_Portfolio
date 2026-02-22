import React, { useEffect, useRef } from 'react';
import './Profile.css';
import profileImg from '../assets/profile.jpg';

const Profile = () => {
  const canvasRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    // Background dots animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let dots = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 60; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 0.5,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.35 + 0.1
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.y += d.vy;
        if (d.y < 0 || d.y > H) {
          d.y = d.vy > 0 ? 0 : H;
          d.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${d.a})`;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    };

    loop();

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    // Parallax avatar tilt
    const container = avatarRef.current;
    const section = container?.closest('.profile');
    if (!container || !section) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      container.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 12}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="profile" id="profile">
      <canvas ref={canvasRef} className="profile-bg-canvas" />
      <div className="container">
        <div className="profile-grid">
          <div className="profile-visual reveal">
            <div className="profile-photo-container">
              <div className="profile-photo-wrapper">
                <img src={profileImg} alt="Vishv Patel" className="profile-img" />
                <div className="profile-glow"></div>
              </div>
            </div>
          </div>
          <div className="profile-text reveal">
            <p className="section-label">// about me</p>
            <h2 className="section-title">
              Crafting <span>Digital Experiences</span>
            </h2>
            <p>
              I'm a passionate Full-Stack Developer with hands-on experience building modern web
              applications from the ground up. I thrive at the intersection of clean code and
              intuitive design.
            </p>
            <p>
              With a deep love for both front-end polish and back-end architecture, I bring ideas to
              life using React, Node.js, and the latest in cloud & DevOps tooling — always with a
              focus on performance and user experience.
            </p>
            <div className="about-tags">
              <span className="tag">React</span>
              <span className="tag">Node.js</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Next.js</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">MongoDB</span>
              <span className="tag">AWS</span>
              <span className="tag">Git</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
