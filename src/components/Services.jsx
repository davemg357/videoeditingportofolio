import { useEffect, useRef } from 'react';

/* ── Uniform sky-blue SVG icon set ── */
const IconPlay = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const IconCamera = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z"/>
    <rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
);

const IconMegaphone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconWand = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2m0 2v2m0-2h-2m2 0h2M3 10l11 11 7-7L10 3 3 10z"/>
    <line x1="3" y1="3" x2="6" y2="6"/>
  </svg>
);

const IconSliders = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>
);

const services = [
  {
    Icon: IconPlay,
    title: 'YouTube Video Editing',
    desc: 'Professional YouTube editing that boosts watch time and keeps viewers hooked. Engaging pacing, dynamic graphics, and platform-optimized delivery.',
    features: [
      'Hook-optimized intros & outros',
      'Lower thirds & text animations',
      'Jump cut & pacing optimization',
      'Thumbnail design assistance',
    ],
  },
  {
    Icon: IconCamera,
    title: 'Short Film & Documentary',
    desc: 'Narrative-driven editing for short films and documentaries with cinematic flair, precise pacing, and emotional storytelling.',
    features: [
      'Cinematic scene pacing',
      'Dramatic cuts & transitions',
      'Sound design & score sync',
      'Color narrative grading',
    ],
  },
  {
    Icon: IconMegaphone,
    title: 'Commercial & Ad Videos',
    desc: 'High-impact commercial editing that drives conversions — product showcases, brand stories, and promotional videos that sell.',
    features: [
      'Brand-aligned color & style',
      'Product showcase sequences',
      'Social media formats (9:16, 1:1)',
      'Motion logo & brand elements',
    ],
  },
  {
    Icon: IconGlobe,
    title: 'Travel & Vlog Editing',
    desc: 'Transforming raw travel footage into captivating adventures. Dynamic cuts, ambient music sync, and stunning color grades that inspire wanderlust.',
    features: [
      'Drone footage integration',
      'Travel-style color grading',
      'Ambient soundscape design',
      'Engaging narrative pacing',
    ],
  },
  {
    Icon: IconWand,
    title: 'Motion Graphics & VFX',
    desc: 'Eye-catching animations, lower thirds, title cards, and visual effects that elevate your video beyond the ordinary.',
    features: [
      'Custom animated titles',
      'Kinetic typography',
      'Logo reveals & stings',
      'Green screen compositing',
    ],
  },
  {
    Icon: IconSliders,
    title: 'Color Grading & Audio Mix',
    desc: 'Professional color correction, cinematic LUT application, and crystal-clear audio mixing that makes your content sound and look broadcast-ready.',
    features: [
      'Primary & secondary correction',
      'Cinematic LUT application',
      'Dialogue clarity & EQ',
      'Music & SFX balancing',
    ],
  },
];

export default function Services() {
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
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <span className="section-label">What I Do</span>
          <h2 className="section-title">
            Services I <span>Offer</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', marginBottom: '0' }}>
            From YouTube content to cinematic short films — I bring your footage to life
            with professional editing, color grading, and motion graphics.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = service.Icon;
            return (
              <div
                key={service.title}
                id={`service-card-${i}`}
                className={`service-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className="service-icon-wrapper">
                  <Icon />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <div className="service-features">
                  {service.features.map((f) => (
                    <span key={f} className="service-feature">{f}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
