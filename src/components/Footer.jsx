const FiverrIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    {/* Fiverr "F" mark with distinctive dot above crossbar */}
    <rect x="5"  y="9"  width="2.5" height="11" rx="1.2"/>
    <rect x="5"  y="9"  width="9"   height="2.5" rx="1.2"/>
    <rect x="5"  y="14" width="6.5" height="2"   rx="1"/>
    <circle cx="17" cy="7" r="1.8"/>
  </svg>
);



const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.56 7.36c-.11.5-.41.62-.83.38l-2.37-1.75-1.14 1.1c-.13.13-.24.24-.49.24l.17-2.41 4.39-3.97c.19-.17-.04-.26-.3-.09L9.08 13.1 6.74 12.4c-.51-.16-.52-.51.11-.75l9.15-3.53c.42-.16.79.1.64.73z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.16c-.24.67-1.2 1.23-1.66 1.27-.46.04-.92.22-2.93-.58-2.58-1.02-4.22-3.66-4.35-3.83-.13-.17-1.07-1.43-1.07-2.73 0-1.3.67-1.94.91-2.2.24-.26.63-.32.88-.32.25 0 .5 0 .72.01.23.01.53-.08.82.63.3.72 1.01 2.47 1.1 2.65.09.18.15.39.03.63-.12.24-.24.39-.48.67-.24.28-.51.62-.73.83-.24.24-.5.5-.21.99.29.49 1.29 2.13 2.77 3.45 1.9 1.69 3.5 2.21 4 2.42.5.21.79.18 1.09-.17.3-.35 1.3-1.52 1.65-2.04.35-.52.7-.43 1.18-.26.48.17 3.05 1.44 3.17 1.5.12.06.2.29-.04.96z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: <FiverrIcon />, href: 'https://www.fiverr.com/dawitmegerssa', label: 'Fiverr' },
    { icon: <TelegramIcon />, href: 'https://t.me/dawitmgedefa', label: 'Telegram' },
    { icon: <WhatsAppIcon />, href: 'https://wa.me/251925777387', label: 'WhatsApp' },
    { icon: <EmailIcon />, href: 'mailto:davemg357@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="footer-logo">Dawit M.</div>
          <p className="footer-text" style={{ marginTop: '0.4rem' }}>
            Professional Video Editor
          </p>
        </div>

        <p className="footer-text">
          © {year} Dawit Megerssa. All rights reserved.
        </p>

        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              id={`footer-social-${s.label.toLowerCase()}`}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title={s.label}
              aria-label={s.label}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
