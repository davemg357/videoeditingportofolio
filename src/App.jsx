import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [splashes, setSplashes] = useState([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Cursor glow tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback((e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Splash origin: use click position if available, else center of screen
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    // Size = diagonal of the screen so it covers everything
    const size = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) * 2);

    const id = Date.now();
    const color = nextTheme === 'light'
      ? 'rgba(241, 245, 249, 0.95)'   // light cream splash
      : 'rgba(8, 11, 20, 0.95)';       // dark splash

    setSplashes((prev) => [...prev, { id, x, y, size, color }]);

    // Switch theme at the 30% mark of the animation (≈210ms)
    setTimeout(() => setTheme(nextTheme), 210);

    // Remove splash after animation ends
    setTimeout(() => setSplashes((prev) => prev.filter((s) => s.id !== id)), 750);
  }, [theme]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      {/* Theme splash ripples */}
      {splashes.map((s) => (
        <div
          key={s.id}
          className="theme-splash"
          aria-hidden="true"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: s.color,
          }}
        />
      ))}

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Showreel />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {/* Scroll to top */}
      <button
        className={`scroll-top-btn${showScrollTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        ↑
      </button>
    </>
  );
}
