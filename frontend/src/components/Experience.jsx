function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience({ experience }) {
  const exps = experience || [];

  return (
    <section id="experience">
      <div className="section">
        <p className="section-label">Career History</p>
        <h2 className="section-title">Work <span>Experience</span></h2>
        <div className="divider" />

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
    </section>
  );
}
