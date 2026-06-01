export default function Hero({ profile }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const name = profile?.name || 'Your Name';
  const title = profile?.title || 'Full Stack Developer';
  const bio = profile?.bio || 'Building modern web applications.';

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        {/* Available badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {profile?.available ? 'Available for opportunities' : 'Currently busy'}
        </div>

        <p className="hero-greeting">Hi there, I'm</p>

        <h1 className="hero-name">
          <span className="gradient-text">{name}</span>
        </h1>

        <p className="hero-tagline">
          <strong>{title}</strong>
        </p>

        <p className="hero-bio">{bio}</p>

        <div className="hero-actions">
          <button id="hero-view-work" className="btn-primary" onClick={() => scrollTo('projects')}>
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button id="hero-contact" className="btn-outline" onClick={() => scrollTo('contact')}>
            Get In Touch
          </button>
        </div>

        {/* Social links */}
        <div className="hero-socials">
          {profile?.github && (
            <a id="hero-github" href={profile.github} target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              {/* GitHub icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {profile?.linkedin && (
            <a id="hero-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
          {profile?.email && (
            <a id="hero-email" href={`mailto:${profile.email}`} className="social-icon" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">3+</div>
            <div className="stat-label">Projects Built</div>
          </div>
          <div className="stat">
            <div className="stat-number">2+</div>
            <div className="stat-label">Years Coding</div>
          </div>
          <div className="stat">
            <div className="stat-number">5+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat">
            <div className="stat-number">1</div>
            <div className="stat-label">Internship</div>
          </div>
        </div>
      </div>
    </section>
  );
}
