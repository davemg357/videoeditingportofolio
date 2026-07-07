import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    title: '✂️ Editing & Post-Production',
    skills: [
      { name: 'Adobe Premiere Pro', pct: 95 },
      { name: 'Adobe After Effects', pct: 88 },
      { name: 'DaVinci Resolve', pct: 85 },
      { name: 'Adobe Audition', pct: 80 },
      { name: 'CapCut Pro', pct: 90 },
    ],
  },
  {
    title: '🎨 Creative & Visual',
    skills: [
      { name: 'Color Grading', pct: 92 },
      { name: 'Motion Graphics', pct: 86 },
      { name: 'Sound Design', pct: 82 },
      { name: 'Storytelling & Pacing', pct: 94 },
      { name: 'Thumbnail Design', pct: 80 },
    ],
  },
];

const PremiereIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="72" fill="#161e26"/>
    <rect x="18" y="18" width="476" height="476" rx="54" stroke="#00c0ff" strokeWidth="24" fill="none"/>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#00c0ff" fontSize="220" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Pr</text>
  </svg>
);

const AfterFxIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="72" fill="#1e1426"/>
    <rect x="18" y="18" width="476" height="476" rx="54" stroke="#d400ff" strokeWidth="24" fill="none"/>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#d400ff" fontSize="220" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Ae</text>
  </svg>
);

const DaVinciIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <circle cx="256" cy="256" r="230" fill="#0c0c0e" stroke="rgba(255,255,255,0.05)" strokeWidth="12"/>
    <circle cx="256" cy="180" r="110" fill="#ff3b30" style={{ mixBlendMode: 'screen' }}/>
    <circle cx="190" cy="300" r="110" fill="#4cd964" style={{ mixBlendMode: 'screen' }}/>
    <circle cx="322" cy="300" r="110" fill="#007aff" style={{ mixBlendMode: 'screen' }}/>
  </svg>
);

const AuditionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="72" fill="#122421"/>
    <rect x="18" y="18" width="476" height="476" rx="54" stroke="#00ff88" strokeWidth="24" fill="none"/>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#00ff88" fontSize="220" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Au</text>
  </svg>
);

const PhotoshopIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="72" fill="#142230"/>
    <rect x="18" y="18" width="476" height="476" rx="54" stroke="#31a8ff" strokeWidth="24" fill="none"/>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#31a8ff" fontSize="220" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Ps</text>
  </svg>
);

const LightroomIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="72" fill="#142626"/>
    <rect x="18" y="18" width="476" height="476" rx="54" stroke="#31ffff" strokeWidth="24" fill="none"/>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#31ffff" fontSize="220" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">Lr</text>
  </svg>
);

const CapCutIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="90" fill="#0a0a0c"/>
    <g transform="translate(60, 60) scale(0.75)">
      <path d="M120 220 L300 120 L360 180 L180 280 Z" fill="#00f0ff"/>
      <path d="M180 280 L360 180 L300 380 L120 300 Z" fill="#ff007f" style={{ mixBlendMode: 'screen' }}/>
    </g>
  </svg>
);

const FigmaIcon = () => (
  <svg width="24" height="28" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '19px', height: '28px', marginInline: 'auto' }}>
    <path d="M19 19C19 8.50659 10.4934 0 0 0C0 0 0 6.33333 0 19C0 29.4934 8.50659 38 19 38C19 38 19 31.6667 19 19Z" fill="#F24E1E"/>
    <path d="M19 19C19 8.50659 27.5066 0 38 0L38 19C38 29.4934 29.4934 38 19 38C19 38 19 31.6667 19 19Z" fill="#FF7262"/>
    <path d="M19 38C19 27.5066 10.4934 19 0 19L0 38C0 48.4934 8.50659 57 19 57C19 57 19 50.6667 19 38Z" fill="#0ACF83"/>
    <path d="M38 19C38 29.4934 29.4934 38 19 38C19 38 19 27.5066 19 19C19 19 25.3333 19 38 19Z" fill="#1ABC9C"/>
    <path d="M19 19C19 29.4934 10.4934 38 0 38C0 38 0 31.6667 0 19C0 8.50659 8.50659 0 19 0C19 0 19 6.33333 19 19Z" fill="#A259FF"/>
  </svg>
);

const FinalCutIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <rect width="512" height="512" rx="90" fill="#121115"/>
    <g transform="translate(60, 60) scale(0.75)">
      <rect x="40" y="160" width="320" height="200" rx="20" fill="#1c1a21" stroke="#333" strokeWidth="6"/>
      <path d="M40 160 L360 160 L330 110 L70 110 Z" fill="#ffffff" opacity="0.95"/>
      <path d="M200 360 C120 360 40 280 40 180 C40 180 120 220 200 220 C280 220 360 180 360 180 C360 280 280 360 200 360 Z" fill="url(#fcGrad)"/>
    </g>
    <defs>
      <linearGradient id="fcGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ff3b30"/>
        <stop offset="25%" stopColor="#ff9500"/>
        <stop offset="50%" stopColor="#ffcc00"/>
        <stop offset="75%" stopColor="#4cd964"/>
        <stop offset="100%" stopColor="#007aff"/>
      </linearGradient>
    </defs>
  </svg>
);

const ResolveIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <circle cx="256" cy="256" r="230" fill="url(#resolveGrad)"/>
    <circle cx="256" cy="256" r="80" fill="#000" opacity="0.4"/>
    <defs>
      <radialGradient id="resolveGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff"/>
        <stop offset="60%" stopColor="#ff00a0"/>
        <stop offset="100%" stopColor="#0022ff"/>
      </radialGradient>
    </defs>
  </svg>
);

const techStack = [
  { icon: <PremiereIcon />, name: 'Premiere' },
  { icon: <AfterFxIcon />, name: 'After FX' },
  { icon: <DaVinciIcon />, name: 'DaVinci' },
  { icon: <AuditionIcon />, name: 'Audition' },
  { icon: <PhotoshopIcon />, name: 'Photoshop' },
  { icon: <LightroomIcon />, name: 'Lightroom' },
  { icon: <CapCutIcon />, name: 'CapCut' },
  { icon: <FigmaIcon />, name: 'Figma' },
  { icon: <FinalCutIcon />, name: 'Final Cut' },
  { icon: <ResolveIcon />, name: 'Resolve' },
];

function SkillBar({ name, pct, animated }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: animated ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            setAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <span className="section-label">My Skills</span>
          <h2 className="section-title">
            Expertise &{' '}
            <span>Proficiency</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px' }}>
            Years of dedicated practice in video post-production have built a robust,
            multi-disciplinary skill set across editing, color, and motion.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, ci) => (
            <div key={cat.title} className={`reveal reveal-delay-${ci + 1}`}>
              <h3 className="skills-category-title">{cat.title}</h3>
              {cat.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  animated={animated}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="tech-stack-section reveal reveal-delay-3">
          <p className="tools-label">Full Software Stack</p>
          <div className="tech-stack-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-item">
                <span className="tech-item-icon">{tech.icon}</span>
                <span className="tech-item-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
