function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatYear(year) {
  return year || 'Present';
}

export default function Experience({ experience, education }) {
  const exps = experience || [];
  const edus = education || [];

  return (
    <section id="experience">
      <div className="section">
        <p className="section-label">My Journey</p>
        <h2 className="section-title">Experience & <span>Education</span></h2>
        <div className="divider" />

        <div className="two-col">
          {/* Experience */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              💼 Work Experience
            </h3>
            {exps.length > 0 ? (
              <div className="timeline">
                {exps.map((e) => (
                  <div key={e.id} className="timeline-item">
                    <div className="timeline-card">
                      <div className="timeline-date">
                        {formatDate(e.start_date)} — {e.current ? 'Present' : formatDate(e.end_date)}
                      </div>
                      <div className="timeline-role">{e.role}</div>
                      <div className="timeline-company">
                        🏢 {e.company} {e.location && `· ${e.location}`}
                      </div>
                      <p className="timeline-desc">{e.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Add experience via Django admin.</p>
            )}
          </div>

          {/* Education */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              🎓 Education
            </h3>
            {edus.length > 0 ? (
              <div className="timeline">
                {edus.map((ed) => (
                  <div key={ed.id} className="timeline-item">
                    <div className="timeline-card">
                      <div className="timeline-date">
                        {ed.start_year} — {ed.current ? 'Present' : formatYear(ed.end_year)}
                      </div>
                      <div className="timeline-role">{ed.degree}</div>
                      <div className="timeline-company">
                        🏫 {ed.institution}
                        {ed.field && ` · ${ed.field}`}
                      </div>
                      {ed.cgpa && (
                        <p className="timeline-desc">
                          CGPA / Score: <strong style={{ color: 'var(--accent-light)' }}>{ed.cgpa}</strong>
                        </p>
                      )}
                      {ed.description && <p className="timeline-desc">{ed.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Add education via Django admin.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
