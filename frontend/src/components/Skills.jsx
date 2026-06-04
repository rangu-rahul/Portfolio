const CATEGORY_LABELS = {
  frontend: { label: 'Frontend', icon: '🎨' },
  backend: { label: 'Backend', icon: '⚙️' },
  database: { label: 'Database', icon: '🗄️' },
  tools: { label: 'Tools & DevOps', icon: '🛠️' },
  language: { label: 'Languages', icon: '📝' },
  other: { label: 'AI / ML', icon: '🤖' },
};

function groupByCategory(skills) {
  return skills.reduce((acc, s) => {
    const key = s.category || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});
}

export default function Skills({ skills }) {
  const grouped = groupByCategory(skills || []);

  return (
    <section id="skills">
      <div className="section">
        <p className="section-label">What I Know</p>
        <h2 className="section-title">Skills </h2>
        <div className="divider" />
        <p className="section-desc">
          Technologies and tools I work with daily to craft high-quality digital experiences.
        </p>

        <div className="skills-grid">
          {Object.entries(grouped).map(([cat, items]) => {
            const meta = CATEGORY_LABELS[cat] || { label: cat, icon: '💡' };
            return (
              <div key={cat} className="skill-category-card">
                <div className="skill-category-title">
                  <span className="skill-cat-icon">{meta.icon}</span>
                  {meta.label}
                </div>
                <div className="skill-pills">
                  {items.map((s) => (
                    <span key={s.id} className="skill-pill">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
