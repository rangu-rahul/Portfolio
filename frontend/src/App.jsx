import { useState, useEffect, useRef } from 'react';
import { getPortfolioData } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import './index.css';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showTop, setShowTop] = useState(false);

  /* ── Load data ─────────────────────────────────────────────────── */
  useEffect(() => {
    getPortfolioData()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /* ── Active section tracking ───────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px -60px 0px' }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  /* ── Scroll to top button ──────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Render ────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div className="loading">
          <div className="spinner" />
          <p>Loading portfolio…</p>
        </div>
      </div>
    );
  }

  // If backend is unreachable, still show the page with empty data
  const profile        = data?.profile        || null;
  const skills         = data?.skills         || [];
  const projects       = data?.projects       || [];
  const experience     = data?.experience     || [];
  const education      = data?.education      || [];
  const certifications = data?.certifications || [];

  return (
    <>
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <Navbar activeSection={activeSection} />

      <main>
        <Hero profile={profile} />

        {/* About (anchor only – info is in hero bio) */}
        <div id="about" style={{ position: 'relative', zIndex: 1 }}>
          {error && (
            <div style={{
              margin: '1rem auto',
              maxWidth: 600,
              padding: '1rem',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              color: '#fca5a5',
              textAlign: 'center',
              fontSize: '0.875rem',
            }}>
              ⚠️ Could not connect to Django backend ({error}). 
              Make sure the server is running on <code>http://127.0.0.1:8000</code>.
            </div>
          )}
        </div>

        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} education={education} />
        <Certifications certifications={certifications} />
        <Contact profile={profile} />
      </main>

      <footer className="footer">
        <p>
          Designed & Built with ❤️ by <span>{profile?.name || 'You'}</span> · React + Django
        </p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </footer>

      {/* Scroll to top */}
      <button
        id="scroll-top-btn"
        className={`scroll-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
}
