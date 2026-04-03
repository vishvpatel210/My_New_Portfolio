import React from 'react';
import Navbar from './components/Navbar';
import Hero   from './components/sections/Hero';
import About  from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import { Certificates, Stats, Timeline } from './components/sections/OtherSections';
import { Contact, Footer } from './components/sections/ContactFooter';
import Chatbot from './components/Chatbot';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Stats />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
