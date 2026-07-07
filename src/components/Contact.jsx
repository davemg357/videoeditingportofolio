import { useEffect, useRef } from 'react';

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.56 7.36c-.11.5-.41.62-.83.38l-2.37-1.75-1.14 1.1c-.13.13-.24.24-.49.24l.17-2.41 4.39-3.97c.19-.17-.04-.26-.3-.09L9.08 13.1 6.74 12.4c-.51-.16-.52-.51.11-.75l9.15-3.53c.42-.16.79.1.64.73z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.16c-.24.67-1.2 1.23-1.66 1.27-.46.04-.92.22-2.93-.58-2.58-1.02-4.22-3.66-4.35-3.83-.13-.17-1.07-1.43-1.07-2.73 0-1.3.67-1.94.91-2.2.24-.26.63-.32.88-.32.25 0 .5 0 .72.01.23.01.53-.08.82.63.3.72 1.01 2.47 1.1 2.65.09.18.15.39.03.63-.12.24-.24.39-.48.67-.24.28-.51.62-.73.83-.24.24-.5.5-.21.99.29.49 1.29 2.13 2.77 3.45 1.9 1.69 3.5 2.21 4 2.42.5.21.79.18 1.09-.17.3-.35 1.3-1.52 1.65-2.04.35-.52.7-.43 1.18-.26.48.17 3.05 1.44 3.17 1.5.12.06.2.29-.04.96z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const contactLinks = [
  {
    icon: '📞',
    label: 'Phone / WhatsApp',
    value: '+251925777387',
    href: 'tel:+251925777387',
  },
  {
    icon: '📧',
    label: 'Email Address',
    value: 'davemg357@gmail.com',
    href: 'mailto:davemg357@gmail.com',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Addis Ababa, Ethiopia',
    href: null,
  },
  {
    icon: '⏰',
    label: 'Response Time',
    value: 'Usually within a few hours',
    href: null,
  },
];

export default function Contact() {
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
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        {/* Left Info */}
        <div className="contact-info reveal">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let's Create <span>Together</span>
          </h2>
          <p>
            Ready to bring your video project to life? Whether you need a YouTube editor,
            a cinematic travel vlog, a brand commercial, or a short film — I'd love to
            collaborate. Reach out directly on your favorite platform!
          </p>

          <div className="contact-links">
            {contactLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  id={`contact-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  href={link.href}
                  className="contact-link-item"
                >
                  <div className="contact-link-icon">{link.icon}</div>
                  <div>
                    <div className="contact-link-label">{link.label}</div>
                    <div className="contact-link-value">{link.value}</div>
                  </div>
                </a>
              ) : (
                <div key={link.label} className="contact-link-item">
                  <div className="contact-link-icon">{link.icon}</div>
                  <div>
                    <div className="contact-link-label">{link.label}</div>
                    <div className="contact-link-value">{link.value}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Contact Links & Quick Buttons Instead of Form */}
        <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="contact-form" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '0.4rem' }}>
              Start Your Project Instantly
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '0.8rem' }}>
              Choose your preferred platform to start collaborating. Click any of the links below to chat directly with me!
            </p>

            {/* Telegram Button */}
            <a
              href="https://t.me/dawitmgedefa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #0088cc, #229ed9)',
                color: '#fff',
                justifyContent: 'flex-start',
                padding: '1.1rem 2.5rem',
                borderRadius: '16px',
                fontSize: '1.05rem',
                boxShadow: '0 8px 24px rgba(34, 158, 217, 0.3)',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <TelegramIcon />
              Chat on Telegram
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/251925777387"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                color: '#fff',
                justifyContent: 'flex-start',
                padding: '1.1rem 2.5rem',
                borderRadius: '16px',
                fontSize: '1.05rem',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <WhatsAppIcon />
              Message on WhatsApp
            </a>

            {/* Email Button */}
            <a
              href="mailto:davemg357@gmail.com"
              className="btn btn-outline"
              style={{
                justifyContent: 'flex-start',
                padding: '1.1rem 2.5rem',
                borderRadius: '16px',
                fontSize: '1.05rem',
                background: 'var(--color-input-bg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <EmailIcon />
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
