import { useEffect, useRef, useState } from 'react';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${40 + Math.random() * 55}%`,
  size: `${3 + Math.random() * 4}px`,
  duration: `${7 + Math.random() * 8}s`,
  delay: `${Math.random() * 6}s`,
  opacity: 0.25 + Math.random() * 0.45,
}));

export default function Hero() {
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [typed, setTyped] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const fullText = 'Professional Video Editor';
  const typedRef = useRef(null);

  useEffect(() => {
    const TYPE_SPEED   = 65;   // ms per character typed
    const ERASE_SPEED  = 35;   // ms per character erased (faster)
    const HOLD_FULL    = 7000; // ms to hold when fully typed
    const HOLD_EMPTY   = 500;  // ms to hold when fully erased

    let timeout;

    const tick = (current, erasing) => {
      if (!erasing) {
        // Typing forward
        if (current.length < fullText.length) {
          const next = fullText.slice(0, current.length + 1);
          setTyped(next);
          timeout = setTimeout(() => tick(next, false), TYPE_SPEED);
        } else {
          // Fully typed — hold, then start erasing
          timeout = setTimeout(() => {
            setIsErasing(true);
            tick(current, true);
          }, HOLD_FULL);
        }
      } else {
        // Erasing backwards
        if (current.length > 0) {
          const next = current.slice(0, -1);
          setTyped(next);
          timeout = setTimeout(() => tick(next, true), ERASE_SPEED);
        } else {
          // Fully erased — hold, then start typing again
          timeout = setTimeout(() => {
            setIsErasing(false);
            tick('', false);
          }, HOLD_EMPTY);
        }
      }
    };

    tick('', false);
    return () => clearTimeout(timeout);
  }, []);


  return (
    <section className="hero hero-mockup" id="home" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* Animated particles */}
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--duration': p.duration,
              '--delay': p.delay,
              maxOpacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="container">
        {/* Left Column - Content */}
        <div className="hero-content" style={{ animation: 'fadeInUp 0.7s ease forwards', opacity: 1 }}>
          <div className="hero-badge">
            <span className="dot" />
            Available for video editing projects
          </div>

          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: '1.1', marginBottom: '1.2rem' }}>
            Dawit Megerssa
            <span
              ref={typedRef}
              className="shimmer-text"
              style={{ display: 'block', fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', marginTop: '0.4rem', fontWeight: '800' }}
            >
              {typed}
              <span className="typed-cursor" aria-hidden="true" />
            </span>
          </h1>

          <p className="hero-subtitle" style={{ marginInline: 0, marginBottom: '2.5rem', maxWidth: '520px' }}>
            Professional video editor with 5+ years of experience transforming raw footage
            into compelling stories. YouTube, vlogs, short films &amp; commercials.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              id="hero-cta-work"
              className="btn btn-primary"
              onClick={() => handleScroll('portfolio')}
            >
              View My Work
            </button>
            <button
              id="hero-cta-contact"
              className="btn btn-outline"
              onClick={() => handleScroll('contact')}
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Right Column - Mockup Visual */}
        <div className="hero-visual-mockup" style={{ animation: 'fadeInRight 0.8s ease 0.2s forwards' }}>
          <div className="hero-avatar-frame">
            <div className="hero-avatar-inner">
              <img src="/profile.jpg" alt="Dawit Megerssa" />
            </div>
          </div>

          {/* Orbits & Adobe Badges */}
          <div className="orbit-line orbit-line-1" />

          <div className="orbit-badge orbit-badge-pr" title="Adobe Premiere Pro">
            Pr
          </div>

          <div className="orbit-badge orbit-badge-ae" title="Adobe After Effects">
            Ae
          </div>

          <div className="orbit-badge orbit-badge-cam" title="Camera/Clapboard icon">
            🎬
          </div>

          {/* Fiverr Rating Card */}
          <div className="mockup-rating-card">
            <span style={{ fontSize: '1.8rem' }}>⭐</span>
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', fontWeight: '700', letterSpacing: '0.05em' }}>Fiverr Rating</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-text)' }}>5.0 Stars</div>
              <div className="rating-stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
