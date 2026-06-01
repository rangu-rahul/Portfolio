import { useState, useEffect } from 'react';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <span className="nav-logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
        &lt;Portfolio /&gt;
      </span>

      {/* Desktop links */}
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            id={`nav-${s}`}
            className={`nav-link${activeSection === s ? ' active' : ''}`}
            onClick={() => scrollTo(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <button className="nav-cta" onClick={() => scrollTo('contact')}>
          Hire Me
        </button>
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        id="hamburger-btn"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>
    </nav>
  );
}
