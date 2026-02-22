import React, { useEffect, useRef } from 'react';
import './Projects.css';
import campusThumb from '../assets/campus-thumb.png';



const Projects = () => {
  const gridRef = useRef(null);

  const projects = [
    {
      thumb: 'thumb-1',
      // Update with user's specific image
      customThumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbSycq3S0AAmAlWmtvf2nuUxZ00RGQefdNw&s', 
      tags: ['HTML', 'CSS'],
      name: 'Snitch — FrontEnd Clone',
      desc: 'This project is a frontend clone of a popular web application, built to replicate the core UI and user experience.',
      links: [
        { label: 'Live Demo', url: 'https://bespoke-blancmange-5a58b8.netlify.app/snitch/snitch' },
        { label: 'GitHub', url: 'https://github.com/vishvpatel210/Diwali-assignment/tree/main/snitch' },
        { label: 'YouTube', url: 'https://www.youtube.com/watch?v=2nEUhG8XD5w&t=2s' }
      ]
    },
    {
      thumb: 'thumb-2',
      customThumb: 'data:image/png;base64,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',
      tags: ['HTML', 'CSS'],
      name: 'HonestHome — FrontEnd Clone',
      desc: 'This project is a frontend clone of a popular web application, built to replicate the core UI and user experience.',
      links: [
        { label: 'Live Demo', url: 'https://bespoke-blancmange-5a58b8.netlify.app/honesthome/honest' },
        { label: 'GitHub', url: 'https://github.com/vishvpatel210/Diwali-assignment/tree/main/honesthome' },
        { label: 'YouTube', url: 'https://www.youtube.com/watch?v=pcn0vFIhCtQ' }
      ]
    },
    {
      thumb: 'thumb-3',
      customThumb: 'data:image/png;base64,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',
      tags: ['HTML', 'CSS'],
      name: 'Thorne - FrontEnd Clone',
      desc: 'This project is a frontend clone of a popular web application, built to replicate the core UI and user experience.',
      links: [
        { label: 'Live Demo', url: 'https://bespoke-blancmange-5a58b8.netlify.app/thorne/thorne' },
        { label: 'GitHub', url: 'https://github.com/vishvpatel210/Diwali-assignment/tree/main/thorne' },
        { label: 'YouTube', url: 'https://www.youtube.com/watch?v=nfHW3f2uX0A' }
      ]
    },
    {
      thumb: 'thumb-4',
      customThumb: 'data:image/png;base64,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',
      tags: ['HTML', 'CSS'],
      name: 'Lenskart — FrontEnd Clone',
      desc: 'This project is a frontend clone of a popular web application, built to replicate the core UI and user experience.',
      links: [
        { label: 'Live Demo', url: 'https://bespoke-blancmange-5a58b8.netlify.app/lenskart/lenskart' },
        { label: 'GitHub', url: 'https://github.com/vishvpatel210/Diwali-assignment/tree/main/lenskart' },
        { label: 'YouTube', url: 'https://www.youtube.com/watch?v=xDOeYFnTD90&t=55s' }
      ]
    },
    {
      thumb: 'thumb-5',
      tags: ['HTML', 'CSS'],
      name: 'JetBlue - FrontEnd Clone',
      desc: 'This project is a frontend clone of a popular web application, built to replicate the core UI and user experience.',
      links: [
        { label: 'Live Demo', url: 'https://bespoke-blancmange-5a58b8.netlify.app/jet%20blue/jetblue.html' },
        { label: 'GitHub', url: 'https://github.com/vishvpatel210/Diwali-assignment/tree/main/jet%20blue' },
        { label: 'YouTube', url: 'https://www.youtube.com/watch?v=8O8jn-qCytg' }
      ]
    },
    {
      thumb: 'thumb-6',
      customThumb: campusThumb,
      tags: ['HTML', 'CSS'],
      name: 'Campus — Website',
      desc: 'This project is a frontend clone of a popular web application, built to replicate the core UI and user experience.',
      links: [
        { label: 'Live Demo', url: 'https://bespoke-blancmange-5a58b8.netlify.app/campus/campus' },
        { label: 'GitHub', url: 'https://github.com/vishvpatel210/Diwali-assignment/tree/main/campus' },
        { label: 'YouTube', url: 'https://www.youtube.com/watch?v=IUIFLRPD1k4' }
      ]
    },
    
  ];

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (!cards) return;

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
      card.style.transition = 'transform .45s cubic-bezier(.4,0,.2,1)';
      setTimeout(() => (card.style.transition = ''), 460);
    };

    const handleMouseEnter = (e) => {
      e.currentTarget.style.transition = '';
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, []);

  const renderProject = (project, index) => {
    const dots = Array.from({ length: 3 }, () => {
      const top = Math.random() * 70 + 10;
      const left = Math.random() * 85 + 5;
      const delay = Math.random() * 2;
      return { top, left, delay };
    });

    const getIcon = (label) => {
      if (label === 'YouTube') return '▶ ';
      if (label === 'GitHub') return '⌂ ';
      return '◎ ';
    };

    return (
      <div
        key={index}
        className="project-card reveal"
        style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
      >
        <div className="project-thumb">
          {/* Use custom thumb if available, else standard class */}
          {project.customThumb ? (
            <div 
              className="thumb-grad" 
              style={{
                backgroundImage: `url(${project.customThumb})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          ) : (
            <div className={`thumb-grad ${project.thumb}`}></div>
          )}
          
          <div className="thumb-dots">
            {dots.map((dot, i) => (
              <span
                key={i}
                style={{
                  top: `${dot.top}%`,
                  left: `${dot.left}%`,
                  animationDelay: `${dot.delay}s`
                }}
              />
            ))}
          </div>
          <div className="thumb-overlay">
            <div className="thumb-badge">View Project</div>
          </div>
        </div>
        <div className="project-body">
          <div className="project-tags">
            {project.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-desc">{project.desc}</p>
          <div className="project-links">
            {project.links.map((link, i) => (
              <a 
                href={link.url} 
                target={link.url !== '#' ? "_blank" : "_self"}
                rel={link.url !== '#' ? "noopener noreferrer" : ""}
                key={i} 
                className="project-link"
              >
                {getIcon(link.label)}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label">// selected work</p>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            A curated collection showcasing full-stack capability and creative problem-solving.
          </p>
        </div>
        <div ref={gridRef} className="projects-grid">
          {projects.map(renderProject)}
        </div>
      </div>
    </section>
  );
};

export default Projects;
