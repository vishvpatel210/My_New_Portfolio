import React, { useState } from 'react';

export default function SpaceSkillsPortfolio() {
  const [activeSkill, setActiveSkill] = useState(null);

  const skillsData = {
    react: {
      title: 'React',
      description: 'Building modern, responsive and interactive user interfaces with React. Expert in hooks, state management, and component architecture.',
      level: 90,
      color: '#87CEEB'
    },
    node: {
      title: 'Node.js',
      description: 'Developing scalable backend applications and RESTful APIs using Node.js and Express. Experience with authentication and database integration.',
      level: 85,
      color: '#90EE90'
    },
    'ui-ux': {
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user experiences. Proficient in Figma, design systems, and modern design principles.',
      level: 88,
      color: '#FFB347'
    },
    javascript: {
      title: 'JavaScript',
      description: 'Advanced JavaScript ES6+ development including async/await, promises, closures, and functional programming concepts.',
      level: 92,
      color: '#DC143C'
    },
    database: {
      title: 'Database',
      description: 'Working with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) databases. Skilled in schema design and optimization.',
      level: 80,
      color: '#DDA0DD'
    },
    git: {
      title: 'Git & Version Control',
      description: 'Expert in Git workflows, branching strategies, and collaborative development. Experience with GitHub and GitLab.',
      level: 87,
      color: '#C0C0C0'
    }
  };

  const planets = [
    { id: 'react', name: 'REACT', orbitSize: 220, size: 60, color: '#87CEEB', duration: 8 },
    { id: 'node', name: 'NODE.JS', orbitSize: 340, size: 70, color: '#90EE90', duration: 12 },
    { id: 'ui-ux', name: 'UI/UX', orbitSize: 460, size: 65, color: '#FFB347', duration: 16 },
    { id: 'javascript', name: 'JAVASCRIPT', orbitSize: 580, size: 75, color: '#DC143C', duration: 20 },
    { id: 'database', name: 'DATABASE', orbitSize: 700, size: 80, color: '#DDA0DD', duration: 24 },
    { id: 'git', name: 'GIT', orbitSize: 820, size: 55, color: '#C0C0C0', duration: 28 },
  ];

  return (
    <div className="skills-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .skills-section {
          min-height: 100vh;
          /* Removed custom background to let global Starfield show through */
          background: transparent; 
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          font-family: 'Rajdhani', sans-serif;
          
          /* Subtle top gradient to blend with previous section */
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 100%);
        }

        /* Removed local .stars css as we use global starfield */
        
        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 20px;
          /* Updated title color to match hero 'neon' style or keep white/green as requested */
          background: linear-gradient(135deg, #fff 0%, #4CAF50 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.1em;
          position: relative;
          z-index: 10;
          text-transform: uppercase;
          animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(76, 175, 80, 0.5)); }
          50% { filter: drop-shadow(0 0 40px rgba(76, 175, 80, 0.8)); }
        }

        .section-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          margin-bottom: 80px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          position: relative;
          z-index: 10;
        }

        .solar-system {
          position: relative;
          width: 90vw;
          max-width: 1200px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sun {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #FDB813 0%, #FF8C00 60%, #FF4500 100%);
          border-radius: 50%;
          box-shadow: 0 0 60px rgba(253, 184, 19, 0.8),
                      0 0 100px rgba(253, 184, 19, 0.6),
                      inset 0 0 40px rgba(255, 200, 50, 0.5);
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: #000;
          animation: sunPulse 4s ease-in-out infinite;
        }

        @keyframes sunPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 60px rgba(253, 184, 19, 0.8),
                       0 0 100px rgba(253, 184, 19, 0.6);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 80px rgba(253, 184, 19, 1),
                       0 0 120px rgba(253, 184, 19, 0.8);
          }
        }

        .orbit {
          position: absolute;
          border: 1px solid rgba(76, 175, 80, 0.15);
          border-radius: 50%;
          animation: orbitRotate linear infinite;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .orbit:hover {
          border-color: rgba(76, 175, 80, 0.4);
          box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
        }

        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .planet-container {
          position: absolute;
          animation: counterRotate linear infinite;
        }

        @keyframes counterRotate {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .planet {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .planet:hover {
          transform: scale(1.3);
          filter: brightness(1.4) drop-shadow(0 0 25px currentColor);
          z-index: 100;
        }

        .planet-ring {
          position: absolute;
          border: 2px solid;
          border-radius: 50%;
          opacity: 0.4;
          pointer-events: none;
          border-color: currentColor;
        }

        .planet:hover .planet-ring {
          opacity: 0.8;
          animation: ringPulse 1s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.4; }
        }

        .planet-label {
          position: absolute;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #4CAF50;
          text-align: center;
          pointer-events: none;
          white-space: nowrap;
          text-shadow: 0 0 10px rgba(76, 175, 80, 0.8),
                       0 0 20px rgba(76, 175, 80, 0.5);
          letter-spacing: 0.1em;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          animation: labelGlow 2s ease-in-out infinite;
        }

        @keyframes labelGlow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(76, 175, 80, 0.8),
                        0 0 20px rgba(76, 175, 80, 0.5);
          }
          50% { 
            text-shadow: 0 0 15px rgba(76, 175, 80, 1),
                        0 0 30px rgba(76, 175, 80, 0.7);
          }
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85); /* Slightly darker for focus */
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }

        .skill-popup {
          background: rgba(10, 22, 40, 0.95);
          border: 1px solid #4CAF50;
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 0 80px rgba(76, 175, 80, 0.2);
          backdrop-filter: blur(10px);
          position: relative;
          color: #fff;
        }

        .popup-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          color: #4CAF50;
          font-size: 1.5rem;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s ease;
        }

        .popup-close:hover {
          transform: rotate(90deg);
        }

        .popup-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #4CAF50;
          margin-bottom: 20px;
          text-align: center;
          text-shadow: 0 0 10px rgba(76, 175, 80, 0.4);
        }

        .popup-description {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          text-align: center;
          margin-bottom: 20px;
        }

        .popup-level {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        .level-bar {
          width: 200px;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .level-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        .scroll-hint {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0.6;
          animation: scrollBounce 2s ease-in-out infinite;
        }

        .scroll-hint svg {
          width: 30px;
          height: 30px;
          stroke: #4CAF50;
          fill: none;
          stroke-width: 2;
        }

        .scroll-hint-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.8rem;
          color: #4CAF50;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        @media (max-width: 768px) {
          .solar-system {
            height: 400px;
          }

          .sun {
            width: 80px;
            height: 80px;
            font-size: 0.7rem;
          }

          .planet-label {
            font-size: 0.7rem;
            bottom: -30px;
          }
        }
      `}</style>

      {/* Title */}
      <h2 className="section-title">Skills Universe</h2>
      <p className="section-subtitle">Hover over planets to explore</p>

      {/* Solar System */}
      <div className="solar-system">
        {/* Sun */}
        <div className="sun">CORE</div>

        {/* Orbits and Planets */}
        {planets.map((planet, index) => (
          <div
            key={planet.id}
            className="orbit"
            style={{
              width: `${planet.orbitSize}px`,
              height: `${planet.orbitSize}px`,
              animationDuration: `${planet.duration}s`,
            }}
          >
            <div
              className="planet-container"
              style={{
                animationDuration: `${planet.duration}s`,
                top: `-${planet.size / 2}px`,
                left: `calc(50% - ${planet.size / 2}px)`,
              }}
            >
              <div
                className="planet"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                  background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`,
                  boxShadow: `0 0 ${planet.size / 3}px ${planet.color}99, inset -5px -5px 15px rgba(0, 0, 0, 0.3)`,
                  color: planet.color,
                }}
                onClick={() => setActiveSkill(planet.id)}
              >
                <div
                  className="planet-ring"
                  style={{
                    width: `${planet.size + 20}px`,
                    height: `${planet.size + 20}px`,
                    top: '-10px',
                    left: '-10px',
                  }}
                />
                <span className="planet-label">{planet.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint">
        <span className="scroll-hint-text">Explore More</span>
        <svg viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Skill Popup */}
      {activeSkill && (
        <div className="popup-overlay" onClick={() => setActiveSkill(null)}>
          <div className="skill-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setActiveSkill(null)}>
              ✕
            </button>
            <h3 className="popup-title">{skillsData[activeSkill].title}</h3>
            <p className="popup-description">{skillsData[activeSkill].description}</p>
            <div className="popup-level">
              <span style={{ color: '#4CAF50', fontWeight: 600 }}>Proficiency:</span>
              <div className="level-bar">
                <div
                  className="level-fill"
                  style={{ width: `${skillsData[activeSkill].level}%` }}
                />
              </div>
              <span style={{ color: '#4CAF50', fontWeight: 600 }}>
                {skillsData[activeSkill].level}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
