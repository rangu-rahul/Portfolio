function formatYear(year) {
  return year || '';
}

export default function Education({ education }) {
  const edus = education || [];

  return (
    <section id="education">
      <div className="section">
        <p className="section-label">Academic Background</p>
        <h2 className="section-title">My <span>Education</span></h2>
        <div className="divider" />

        {edus.length > 0 ? (
          <div className="timeline">
            {edus.map((ed) => (
              <div key={ed.id} className="timeline-item">
                <div className="timeline-card">
                  <div className="timeline-date">
                    {ed.start_year} — {formatYear(ed.end_year)}
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
    </section>
  );
}
