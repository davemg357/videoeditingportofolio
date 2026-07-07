import { useEffect, useRef } from 'react';

export default function Showreel() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="showreel section" id="showreel" ref={sectionRef} style={{ background: 'var(--color-bg-2)' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-label">Showreel</span>
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
            Featured <span>Showreel</span>
          </h2>
        </div>

        <div className="reveal" style={{ width: '100%', maxWidth: '1000px', marginInline: 'auto' }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--color-primary), #8b5cf6, var(--color-pink))',
            padding: '4px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px var(--color-primary-glow)'
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden', background: '#000' }}>
              <video
                src="/MAIN.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
