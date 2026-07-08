import { useEffect, useRef, useState } from 'react';

export default function CursorTrailer() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);

  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Position references
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const followerRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const snappedElementRef = useRef(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => {
      window.removeEventListener('resize', checkTouch);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Update inner dot immediately for 0 latency feel
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check mouse speed and spawn particles if moving
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const speed = Math.hypot(dx, dy);

      if (speed > 1) {
        // Spawn sparkles
        const count = Math.min(Math.floor(speed / 4), 3);
        const primaryColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#6366f1';
        const accentColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#f59e0b';
        
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            // Random direction, spread out
            vx: (Math.random() - 0.5) * (speed * 0.15),
            vy: (Math.random() - 0.5) * (speed * 0.15) - Math.random() * 0.5,
            size: Math.random() * 4 + 2,
            life: 1.0,
            decay: Math.random() * 0.03 + 0.015,
            color: Math.random() > 0.3 ? primaryColor : accentColor,
          });
        }
      }

      lastMouseRef.current.x = e.clientX;
      lastMouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Hover listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .portfolio-card, .showreel-play-btn, .theme-toggle-btn, .contact-card, .skills-grid > div');
      if (target) {
        setIsHovered(true);
        
        // Lock onto any button, link, role=button, or theme toggle
        const isSnapTarget = target.tagName === 'BUTTON' || 
                             target.tagName === 'A' || 
                             target.classList.contains('theme-toggle-btn') || 
                             target.getAttribute('role') === 'button';
                             
        if (isSnapTarget) {
          snappedElementRef.current = target;
        }

        if (target.classList.contains('portfolio-card') || target.closest('.portfolio-card') || target.classList.contains('showreel-play-btn')) {
          setHoverText('VIEW');
        } else {
          setHoverText('');
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], .portfolio-card, .showreel-play-btn, .theme-toggle-btn, .contact-card, .skills-grid > div');
      if (target) {
        // Release button and reset style
        const isSnapTarget = target.tagName === 'BUTTON' || 
                             target.tagName === 'A' || 
                             target.classList.contains('theme-toggle-btn') || 
                             target.getAttribute('role') === 'button';
                             
        if (isSnapTarget) {
          target.style.transform = '';
          target.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
          if (snappedElementRef.current === target) {
            snappedElementRef.current = null;
          }
        }
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Initialize Canvas
    const canvas = canvasRef.current;
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation Loop
    const ctx = canvas?.getContext('2d');
    const update = () => {
      // 1. Lerp follower position
      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;
      
      const snappedEl = snappedElementRef.current;
      
      if (snappedEl) {
        const rect = snappedEl.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        
        targetX = center.x;
        targetY = center.y;

        // Apply magnetic pull to the button
        const pullX = (mouseRef.current.x - center.x) * 0.28;
        const pullY = (mouseRef.current.y - center.y) * 0.28;
        snappedEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        snappedEl.style.transition = 'none';

        if (ringRef.current) {
          const pad = 6; // padding around the button
          const width = rect.width + pad * 2;
          const height = rect.height + pad * 2;
          
          ringRef.current.style.width = `${width}px`;
          ringRef.current.style.height = `${height}px`;
          ringRef.current.style.borderRadius = window.getComputedStyle(snappedEl).borderRadius || '8px';
          ringRef.current.style.marginLeft = `-${width / 2}px`;
          ringRef.current.style.marginTop = `-${height / 2}px`;
          ringRef.current.style.borderColor = 'var(--color-primary)';
          ringRef.current.style.boxShadow = '0 0 15px var(--color-primary-glow)';
        }
      } else {
        if (ringRef.current) {
          ringRef.current.style.width = '';
          ringRef.current.style.height = '';
          ringRef.current.style.borderRadius = '';
          ringRef.current.style.marginLeft = '';
          ringRef.current.style.marginTop = '';
          ringRef.current.style.borderColor = '';
          ringRef.current.style.boxShadow = '';
        }
      }

      followerRef.current.x += (targetX - followerRef.current.x) * 0.15;
      followerRef.current.y += (targetY - followerRef.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerRef.current.x}px, ${followerRef.current.y}px, 0)`;
      }

      // 2. Clear and draw particles on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particlesRef.current.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          // Soft air friction
          p.vx *= 0.95;
          p.vy *= 0.95;
          // Float drift
          p.vy += 0.02;
          p.life = Math.max(0, p.life - p.decay);

          if (p.life <= 0) return;

          // Render
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw sparkling particles
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        });

        // Filter out dead particles
        particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Canvas for Particle Trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isMouseDown ? 'mousedown' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />

      {/* Custom Cursor Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isMouseDown ? 'mousedown' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      >
        {hoverText && <span className="custom-cursor-text">{hoverText}</span>}
      </div>
    </>
  );
}
