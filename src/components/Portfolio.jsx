import { useEffect, useRef, useState } from 'react';

const allProjects = [
  {
    id: 'proj-1',
    category: 'educational',
    categoryLabel: 'Social Science',
    title: 'Coaching and Gender Norms in Youth Sports',
    desc: 'An analysis of how coaching styles influence adolescent aggression and gender stereotypes.',
    duration: '04:14',
    image: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/1y7dRYaZkzVc9gkuj1NOeDebl2UGXc9kF/view?usp=drive_link',
    featured: false,
  },
  {
    id: 'proj-2',
    category: 'documentary',
    categoryLabel: 'Documentary',
    title: 'Discovering Peace in Africa',
    desc: "A filmmaker's journey to Ethiopia to find peace and healing through cultural exploration and historic landmarks.",
    duration: '05:21',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/12iULp6esGkSuJikU5CeOUmGkSC6LMrB2/view?usp=sharing',
    featured: false,
  },
  {
    id: 'proj-3',
    category: 'educational',
    categoryLabel: 'Education',
    title: 'Psych 101: Introduction to Psychology',
    desc: 'An introductory survey course exploring the history, biological foundations, scientific research methods, and core theories of human behavior and mental processes.',
    duration: '05:37',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/1QI615NhFAhVnlYdzw74x5Gr1jrmxySCs/view?usp=sharing',
    featured: false,
  },
  {
    id: 'proj-4',
    category: 'documentary',
    categoryLabel: 'Science & Tech',
    title: 'Quantum Dot',
    desc: 'This video explores the environmental challenges of quantum dot production, their potential to revolutionize renewable energy and solar technology, their role in developing qubits for quantum computing, and their diverse applications in astronomy.',
    duration: '02:31',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/1EWmpF4FnGgKGO1RguVeuI4KjDjX8QKuP/view?usp=sharing',
    featured: false,
  },
  {
    id: 'proj-5',
    category: 'tv',
    categoryLabel: 'Reality TV',
    title: 'Why Are You Not Here?',
    desc: 'A travel-focused reality series designed to inspire African Americans to visit Ethiopia by showcasing the country in a positive light through the journey of poet and actor Bertrand Boyd.',
    duration: '02:54',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/1bCJz49J42-zf1npDXJ-5AZhsLZ-r4Mr0/view?usp=sharing',
    featured: false,
  },
  {
    id: 'proj-6',
    category: 'youtube',
    categoryLabel: 'YouTube Video',
    title: 'Prioritizing Marriage Over Parenthood',
    desc: 'A discussion on why choosing motherhood without marriage is a lifetime commitment that often leads to single parent "crash outs" and generational cycles.',
    duration: '08:24',
    image: 'https://images.unsplash.com/photo-1464798429116-8e26f96b2e60?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://drive.google.com/file/d/16OhliTJawx6si7Cf6GrNEIupLeYY-4E1/view?usp=drive_link',
    featured: false,
  },
];

const filters = [
  { value: 'all', label: 'All Work' },
  { value: 'educational', label: 'Education' },
  { value: 'documentary', label: 'Documentaries' },
  { value: 'tv', label: 'Reality TV' },
  { value: 'youtube', label: 'YouTube' },
];

const getVideoEmbedUrl = (url) => {
  if (!url) return { type: 'video', url: '/MAIN.mp4' };

  // Google Drive Link matching (supports /file/d/ID/... or ?id=ID)
  const gdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (gdMatch) {
    return {
      type: 'iframe',
      url: `https://drive.google.com/file/d/${gdMatch[1]}/preview`
    };
  }

  // YouTube Links
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return {
      type: 'iframe',
      url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
    };
  }

  // Vimeo Links
  const vimeoMatch = url.match(/vimeo\.com\/([0-9]+)/);
  if (vimeoMatch) {
    return {
      type: 'iframe',
      url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }

  // Direct files (e.g. .mp4, .webm)
  return {
    type: 'video',
    url: url
  };
};

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="portfolio section" id="portfolio" ref={sectionRef}>
      <div className="container">
        <div className={`reveal ${isRevealed ? 'revealed' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-label">Featured Work</span>
            <h2 className="section-title" style={{ margin: 0 }}>
              Recent Projects
            </h2>
          </div>
          <a
            href="https://www.fiverr.com/dawitmegerssa/merge-cut-edit-add-background-music-opener-to-your-video"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ borderRadius: '50px', padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
          >
            View All Work
          </a>
        </div>

        {/* Filter Buttons */}
        <div className={`portfolio-filter reveal ${isRevealed ? 'revealed' : ''}`}>
          {filters.map(({ value, label }) => (
            <button
              key={value}
              id={`filter-${value}`}
              className={`filter-btn${activeFilter === value ? ' active' : ''}`}
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              id={project.id}
              className={`portfolio-card reveal reveal-delay-${(i % 3) + 1} ${isRevealed ? 'revealed' : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail */}
              <div className="portfolio-card-thumbnail" style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'var(--transition-smooth)' }}
                  className="project-thumb-img"
                />

                {/* Central Play Button */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.45)',
                  transition: 'var(--transition-smooth)',
                }} className="project-thumb-overlay">
                  <div className="portfolio-play-btn" style={{ transform: 'scale(1)' }}>▶</div>
                </div>

                {/* Top-Right Category Tag */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '30px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                  {project.categoryLabel}
                </div>

                {/* Bottom-Right Duration Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(8, 11, 20, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: '700',
                  padding: '0.25rem 0.4rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {project.duration}
                </div>
              </div>

              {/* Info */}
              <div className="portfolio-card-info" style={{ padding: '1.25rem 1.5rem' }}>
                <h3 className="portfolio-card-title" style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 0.25rem 0' }}>{project.title}</h3>
                <p className="portfolio-card-desc" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`reveal ${isRevealed ? 'revealed' : ''}`} style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            id="portfolio-fiverr-cta"
            href="https://www.fiverr.com/dawitmegerssa/merge-cut-edit-add-background-music-opener-to-your-video"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            See All Projects on Fiverr
          </a>
        </div>
      </div>

      {/* Video Modal overlay */}
      {selectedProject && (
        <div 
          className="video-modal-backdrop open" 
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="video-modal-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="video-modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close video player"
            >
              ✕
            </button>
            {(() => {
              const videoData = getVideoEmbedUrl(selectedProject.videoUrl);
              if (videoData.type === 'iframe') {
                return (
                  <iframe
                    src={videoData.url}
                    className="video-modal-iframe"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={selectedProject.title}
                  />
                );
              } else {
                return (
                  <video
                    src={videoData.url}
                    controls
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                );
              }
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
