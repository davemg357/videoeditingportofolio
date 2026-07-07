import { useEffect, useRef } from 'react';

const services = [
  {
    icon: '▶️',
    colorClass: 'si-purple',
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
    icon: '🎬',
    colorClass: 'si-pink',
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
    icon: '📢',
    colorClass: 'si-amber',
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
    icon: '✈️',
    colorClass: 'si-cyan',
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
    icon: '✨',
    colorClass: 'si-green',
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
    icon: '🎵',
    colorClass: 'si-rose',
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
          {services.map((service, i) => (
            <div
              key={service.title}
              id={`service-card-${i}`}
              className={`service-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className={`service-icon-wrapper ${service.colorClass}`}>
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-features">
                {service.features.map((f) => (
                  <span key={f} className="service-feature">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
