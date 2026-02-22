import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (trailRef.current) trailRef.current.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Move the dot cursor instantly — no lag
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      const hoverSelector = 'a, button, .btn, .btn-send, .project-card, .social-btn, .contact-email, .project-link, .theme-toggle, .hamburger, .tag, .code-card, .avatar-badge, .intro-skip, .mobile-close';
      if (e.target.closest(hoverSelector)) {
        document.body.classList.add('c-hover');
      }
    };

    const handleMouseOut = (e) => {
      const hoverSelector = 'a, button, .btn, .btn-send, .project-card, .social-btn, .contact-email, .project-link, .theme-toggle, .hamburger, .tag, .code-card, .avatar-badge, .intro-skip, .mobile-close';
      if (e.target.closest(hoverSelector)) {
        document.body.classList.remove('c-hover');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.add('c-click');
      setTimeout(() => document.body.classList.remove('c-click'), 180);
    };

    // Single persistent RAF loop for smooth trail
    const animateTrail = () => {
      trail.current.x += (mouse.current.x - trail.current.x) * 0.13;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.13;

      if (trailRef.current) {
        trailRef.current.style.left = `${trail.current.x}px`;
        trailRef.current.style.top = `${trail.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animateTrail);
    };

    rafId.current = requestAnimationFrame(animateTrail);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
};

export default Cursor;
