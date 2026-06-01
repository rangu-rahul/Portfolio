export default function Certifications({ certifications }) {
  const certs = certifications || [];

  if (certs.length === 0) return null;

  return (
    <section id="certifications" style={{ background: 'rgba(139,92,246,0.02)' }}>
      <div className="section">
        <p className="section-label">Achievements</p>
        <h2 className="section-title">Licenses & <span>Certifications</span></h2>
        <div className="divider" />

        <div className="cert-grid">
          {certs.map((c) => (
            <div key={c.id} className="cert-card">
              <div className="cert-icon">🏅</div>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
                {c.date && (
                  <div className="cert-date">
                    {new Date(c.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                )}
                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.75rem', color: 'var(--accent-light)', marginTop: '0.4rem', display: 'inline-block' }}
                  >
                    View Credential →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
