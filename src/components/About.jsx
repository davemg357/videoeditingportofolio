import { useEffect, useRef } from 'react';

export default function About() {
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

  const highlights = [
    { icon: '🎬', text: 'YouTube & Vlog Editing' },
    { icon: '🎥', text: 'Short Films & Documentaries' },
    { icon: '📢', text: 'Commercial & Ad Videos' },
    { icon: '🎨', text: 'Motion Graphics & VFX' },
    { icon: '🎵', text: 'Sound Design & Mixing' },
    { icon: '🌍', text: 'Based in Ethiopia' },
  ];

  const tools = [
    'Adobe Premiere Pro',
    'After Effects',
    'DaVinci Resolve',
    'Adobe Audition',
    'Photoshop',
    'Lightroom',
    'Figma',
    'CapCut',
  ];

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        {/* Image Side */}
        <div className="about-image-section reveal">
          <div className="about-img-wrapper">
            <img src="/profile.jpg" alt="Dawit Megerssa" />
            <div className="about-img-overlay" />
          </div>
          <div className="about-experience-badge">
            <span className="about-exp-number">5+</span>
            <span className="about-exp-label">Years of Excellence</span>
          </div>
        </div>

        {/* Text Side */}
        <div className="about-text">
          <div className="reveal">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Turning Raw Footage Into{' '}
              <span>Cinematic Magic</span>
            </h2>
          </div>

          <div className="reveal reveal-delay-1">
            <p>
              Hi, I'm <strong>Dawit Megerssa</strong> — a passionate video editor
              with over 5 years of professional experience.
              I specialize in crafting compelling visual stories that captivate audiences
              and drive results.
            </p>
            <p>
              My expertise spans YouTube content creation, cinematic travel vlogs, short films,
              and high-impact commercial advertisements. I work with Adobe Premiere Pro,
              After Effects, and DaVinci Resolve to deliver broadcast-quality results.
            </p>
            <p>
              Every frame I touch is intentional. I believe great editing is invisible —
              it's the invisible hand that makes audiences feel every emotion.
            </p>
          </div>

          <div className="about-highlights reveal reveal-delay-2">
            {highlights.map(({ icon, text }) => (
              <div key={text} className="about-highlight-item">
                <span className="icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="about-tools reveal reveal-delay-3">
            <p className="tools-label">Editing Tools & Software</p>
            <div className="tools-tags">
              {tools.map((t) => (
                <span key={t} className="tool-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-4" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              id="about-fiverr-link"
              href="https://www.fiverr.com/dawitmegerssa/merge-cut-edit-add-background-music-opener-to-your-video"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Fiverr Profile
            </a>
            <a
              id="about-hire-me"
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn btn-outline"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
