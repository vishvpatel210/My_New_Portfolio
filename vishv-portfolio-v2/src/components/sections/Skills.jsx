import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '../../data/portfolioData';

const ICONS = { React:'⚛️', JavaScript:'𝐉𝐒', TypeScript:'𝐓𝐒', 'Next.js':'▲', HTML5:'🔸', CSS3:'🎨', 'Tailwind CSS':'🌊', 'Node.js':'🟢', Express:'⚡', MongoDB:'🍃', PostgreSQL:'🐘', 'REST APIs':'🔌', 'Git & GitHub':'🐙', Figma:'🎭', AWS:'☁️', Docker:'🐳', Vite:'⚡' };

export default function Skills() {
  const [tab, setTab] = useState(0);
  const [ref, inView] = useInView({ threshold:.1, triggerOnce:true });

  return (
    <section id="skills" ref={ref} style={{ padding:'var(--py) var(--px)', background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
      {/* center glow */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(100,255,218,.025) 0%,transparent 70%)', pointerEvents:'none' }}/>

      <div className="wrap">
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ marginBottom:40 }}>
          <p className="sec-label">Skills</p>
          <h2 className="sec-title">My <span className="accent">Tech</span> <span className="italic">Arsenal</span></h2>
          <p className="sec-sub">Technologies and tools I use to build world-class applications.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.15 }}
          style={{ display:'flex', gap:8, marginBottom:30, flexWrap:'wrap' }}>
          {SKILLS.map((cat, i) => (
            <button key={cat.category} onClick={() => setTab(i)}
              style={{ padding:'9px 22px', borderRadius:'999px', fontFamily:'var(--font-mono)', fontSize:'.78rem', letterSpacing:'.04em', border:'1px solid', borderColor:tab===i?cat.color:'var(--border-solid)', background:tab===i?`${cat.color}18`:'var(--surface)', color:tab===i?cat.color:'var(--text-secondary)', cursor:'pointer', transition:'all .25s', display:'flex', alignItems:'center', gap:6 }}>
              <span>{cat.icon}</span>{cat.category}
            </button>
          ))}
        </motion.div>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:12 }} transition={{ duration:.28 }}
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:14 }}>
            {SKILLS[tab].items.map((sk, i) => (
              <motion.div key={sk.name}
                initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*.07 }}
                whileHover={{ y:-5, transition:{duration:.2} }}
                style={{ background:'var(--surface)', border:'1px solid var(--border-solid)', borderRadius:'var(--r)', padding:'18px', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${SKILLS[tab].color}55`; e.currentTarget.style.boxShadow=`0 8px 28px ${SKILLS[tab].color}14`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-solid)'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                    <span style={{ fontSize:'1.15rem' }}>{ICONS[sk.name]||'💻'}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.87rem' }}>{sk.name}</span>
                  </div>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:SKILLS[tab].color, fontWeight:600 }}>{sk.pct}%</span>
                </div>
                <div style={{ height:'3px', background:'var(--bg-tertiary)', borderRadius:'999px', overflow:'hidden' }}>
                  <motion.div
                    initial={{ width:0 }} animate={inView?{width:`${sk.pct}%`}:{}} transition={{ duration:1, delay:.3+i*.04, ease:[.4,0,.2,1] }}
                    style={{ height:'100%', background:`linear-gradient(90deg,${SKILLS[tab].color},${SKILLS[tab].color}99)`, borderRadius:'999px' }}/>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All tech cloud */}
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.7 }}
          style={{ marginTop:44, padding:'22px 26px', background:'var(--surface)', borderRadius:'var(--r-lg)', border:'1px solid var(--border-solid)' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'.66rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--text-secondary)', marginBottom:14 }}>All Technologies</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {SKILLS.flatMap(c => c.items.map(s => s.name)).map(n => <span key={n} className="tag">{n}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
