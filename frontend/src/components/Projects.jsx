import { useState } from 'react';

const PROJECT_ICONS = ['🚀', '🤖', '🌐', '⚡', '🎯', '💡', '🔬', '🏆'];

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Projects({ projects }) {
  const items = projects || [];
  const [selected, setSelected] = useState(null);

  const active = selected !== null ? items[selected] : null;

  return (
    <section id="projects" style={{ background: 'rgba(139,92,246,0.02)' }}>
      <div className="section">
        <p className="section-label">What I've Built</p>
        <h2 className="section-title"><span>Projects That I Have Built</span></h2>
        <div className="divider" />
        <p className="section-desc">
          Click a project card to explore the details.
        </p>

        <div className="projects-split">
          {/* ── Left: Card List ── */}
          <div className="projects-list">
            {items.length === 0 && (
              <p style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>
                No projects found. Add them via the Django admin panel.
              </p>
            )}
            {items.map((p, i) => (
              <div
                key={p.id}
                className={`project-list-card${selected === i ? ' active' : ''}`}
                onClick={() => setSelected(selected === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(selected === i ? null : i)}
              >
                <div className="plc-icon">{PROJECT_ICONS[i % PROJECT_ICONS.length]}</div>
                <div className="plc-body">
                  <div className="plc-title">{p.title}</div>
                  <div className="plc-tags">
                    {(p.tech_stack || []).slice(0, 3).map((t) => (
                      <span key={t} className="plc-tag">{t}</span>
                    ))}
                    {(p.tech_stack || []).length > 3 && (
                      <span className="plc-tag">+{p.tech_stack.length - 3}</span>
                    )}
                  </div>
                </div>
                <span className="plc-arrow">{selected === i ? '▾' : '›'}</span>
              </div>
            ))}
          </div>

          {/* ── Right: Detail Panel ── */}
          <div className={`project-detail-panel${active ? ' has-content' : ''}`}>
            {!active ? (
              <div className="pdp-placeholder">
                {/* <div className="pdp-placeholder-icon">👆</div>
                <p>Select a project to see details</p> */}
              </div>
            ) : (
              <div className="pdp-content">
                {/* Header */}
                <div className="pdp-header">
                  <div className="pdp-icon">
                    {PROJECT_ICONS[selected % PROJECT_ICONS.length]}
                  </div>
                  <div>
                    <h3 className="pdp-title">{active.title}</h3>
                    <div className="pdp-links">
                      {active.github_url && (
                        <a
                          href={active.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="pdp-link-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon /> GitHub
                        </a>
                      )}
                      {active.live_url && (
                        <a
                          href={active.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="pdp-link-btn pdp-link-btn--live"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalIcon /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="pdp-divider" />

                {/* Description */}
                <p className="pdp-desc">{active.description}</p>

                {/* Tech Stack */}
                <div className="pdp-section-label">Tech Stack</div>
                <div className="pdp-tech">
                  {(active.tech_stack || []).map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
