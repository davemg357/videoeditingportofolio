import { useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 'testimonial-1',
    stars: 5,
    quote: 'It is always a pleasure to work with Dawit. You might say we have history. He’s provided great video editing services for more than two years. He never disappoints.',
    name: 'Fiverr Buyer',
    role: 'Fiverr Client — Recurring Buyer',
    initials: 'FB',
  },
  {
    id: 'testimonial-2',
    stars: 5,
    quote: 'Dawit never disappoints. Tremendous value working him. Produces quality edits, on time and with creativity.',
    name: 'Fiverr Buyer',
    role: 'Fiverr Client — Content Creator',
    initials: 'FB',
  },
  {
    id: 'testimonial-3',
    stars: 5,
    quote: 'I love working with this creator. He always has great ideas and keeps me informed throughout the project. Just a great all-round Fiverr person!!',
    name: 'Fiverr Buyer',
    role: 'Fiverr Client — Travel Vlogger',
    initials: 'FB',
  },
  {
    id: 'testimonial-4',
    stars: 5,
    quote: 'Great working with Dawit! The editing pacing is excellent and the sound integration is perfect.',
    name: 'Fiverr Buyer',
    role: 'YouTube Channel Owner',
    initials: 'FB',
  },
  {
    id: 'testimonial-5',
    stars: 5,
    quote: 'Great to work with Dawit. An exceptional talent. He knows how to cut, color grade, and pace the video beautifully.',
    name: 'Fiverr Buyer',
    role: 'Commercial Video Producer',
    initials: 'FB',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <span className="section-label">Client Reviews</span>
          <h2 className="section-title">
            What Clients <span>Say</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px' }}>
            Don't just take my word for it — here's what clients from around
            the world say about working with me.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              id={t.id}
              className={`testimonial-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <span key={si}>★</span>
                ))}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-author-name">{t.name}</div>
                  <div className="testimonial-author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
