import { useEffect, useRef } from 'react';

/* ── Uniform sky-blue SVG icon set ── */
const IconFilm = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);

const IconCamera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z"/>
    <rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
);

const IconMegaphone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

const IconWand = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2m0 2v2m0-2h-2m2 0h2M3 10l11 11 7-7L10 3 3 10z"/>
    <line x1="3" y1="3" x2="6" y2="6"/>
  </svg>
);

const IconMusic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const highlights = [
  { Icon: IconFilm,      text: 'YouTube & Vlog Editing'      },
  { Icon: IconCamera,    text: 'Short Films & Documentaries' },
  { Icon: IconMegaphone, text: 'Commercial & Ad Videos'      },
  { Icon: IconWand,      text: 'Motion Graphics & VFX'       },
  { Icon: IconMusic,     text: 'Sound Design & Mixing'       },
  { Icon: IconGlobe,     text: 'Based in Ethiopia'           },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.15 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tools = [
    'Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve',
    'Adobe Audition', 'Photoshop', 'Lightroom', 'Figma', 'CapCut',
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
            {highlights.map(({ Icon, text }) => (
              <div key={text} className="about-highlight-item">
                <span className="icon">
                  <Icon />
                </span>
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
