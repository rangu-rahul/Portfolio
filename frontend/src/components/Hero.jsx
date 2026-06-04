import profilePhoto from '../assets/profile.jpeg';

export default function Hero({ profile }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const name = profile?.name || 'Rangu Rahul';
  const title = profile?.title || 'Full Stack Python Developer';
  const bio = profile?.bio || 'Building modern web applications.';

  return (
    <section id="home" className="hero">
      <div className="hero-visual">
        <div className="hero-photo-ring">
          <img src={profilePhoto} alt="Rahul Rangu" className="hero-photo" />
        </div>
      </div>
      <div className="hero-content">
        {/* Available badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {profile?.available ? 'Looking for opportunities' : 'Currently busy'}
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
            View My Projects
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
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {profile?.linkedin && (
            <a id="hero-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {profile?.email && (
            <a id="hero-email" href={`mailto:${profile.email}`} className="social-icon" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          )}
          {/* LeetCode */}
          <a id="hero-leetcode" href="https://leetcode.com/u/rahul98_/" target="_blank" rel="noreferrer" className="social-icon" title="LeetCode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.738-.942-2.821-1.032V1.419A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </a>
          {/* GeeksForGeeks */}
          <a id="hero-gfg" href="https://www.geeksforgeeks.org/profile/rangurahul" target="_blank" rel="noreferrer" className="social-icon" title="GeeksForGeeks">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-1.108-.703 3.501 3.501 0 0 1-.894-1.407H12.8a3.504 3.504 0 0 1-.894 1.407 3.79 3.79 0 0 1-1.108.703 4.51 4.51 0 0 1-3.116.016 3.691 3.691 0 0 1-1.104-.695 3.31 3.31 0 0 1-.564-.745L4.5 14.3v-.017A3.39 3.39 0 0 1 4 12.399a3.338 3.338 0 0 1 .793-2.237 2.84 2.84 0 0 1 .585-.504A3.07 3.07 0 0 1 6.4 9.3h.022c.593 0 1.168.17 1.657.49l.298.199.023-.361a5.042 5.042 0 0 1 .356-1.55 4.51 4.51 0 0 1 .803-1.29A3.81 3.81 0 0 1 10.8 5.78a4.253 4.253 0 0 1 2.4 0 3.81 3.81 0 0 1 1.241 1.008 4.51 4.51 0 0 1 .803 1.29 5.042 5.042 0 0 1 .356 1.55l.023.361.298-.199a3.066 3.066 0 0 1 1.657-.49H17.6a3.07 3.07 0 0 1 1.022.362c.214.127.41.279.585.504A3.338 3.338 0 0 1 20 12.4a3.39 3.39 0 0 1-.5 1.882v.017l-1.55-.985c.167-.287.256-.614.25-.946a1.337 1.337 0 0 0-.32-.9 1.117 1.117 0 0 0-.43-.296 1.808 1.808 0 0 0-.676-.113h-.022c-.55 0-1.044.225-1.394.635a4.54 4.54 0 0 0-.215.27l-1.236.017-.065-.586a3.24 3.24 0 0 0-.233-.883 2.64 2.64 0 0 0-.47-.75 1.96 1.96 0 0 0-.665-.49 2.466 2.466 0 0 0-1.95 0 1.96 1.96 0 0 0-.665.49 2.64 2.64 0 0 0-.47.75 3.24 3.24 0 0 0-.233.883l-.065.586-1.236-.017a4.54 4.54 0 0 0-.215-.27c-.35-.41-.844-.635-1.394-.635H6.4c-.237 0-.463.04-.676.113a1.117 1.117 0 0 0-.43.296 1.337 1.337 0 0 0-.32.9c-.006.332.083.659.25.946l-1.55.985z" />
            </svg>
          </a>
        </div>
        {/* Stats */}
        {/* <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">2</div>
            <div className="stat-label">Projects Built</div>
          </div>
          <div className="stat">
            <div className="stat-number">6</div>
            <div className="stat-label">Months Coding</div>
          </div>
          <div className="stat">
            <div className="stat-number">5+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat">
            <div className="stat-number">1</div>
            <div className="stat-label">Internship</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
