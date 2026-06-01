import { useEffect, useRef } from 'react';

const CATEGORY_LABELS = {
  frontend: '🎨 Frontend',
  backend: '⚙️ Backend',
  database: '🗄️ Database',
  tools: '🛠️ Tools & DevOps',
  language: '📝 Languages',
  other: '🤖 AI / ML',
};

function groupByCategory(skills) {
  return skills.reduce((acc, s) => {
    const key = s.category || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});
}

function SkillBar({ name, proficiency }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && fillRef.current) {
          fillRef.current.style.width = `${proficiency}%`;
        }
      },
      { threshold: 0.3 }
    );
    if (fillRef.current) observer.observe(fillRef.current.parentElement);
    return () => observer.disconnect();
  }, [proficiency]);

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{proficiency}%</span>
      </div>
      <div className="skill-bar-track">
        <div ref={fillRef} className="skill-bar-fill" style={{ width: 0 }} />
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  const grouped = groupByCategory(skills || []);

  return (
    <section id="skills">
      <div className="section">
        <p className="section-label">What I Know</p>
        <h2 className="section-title">Skills & <span>Expertise</span></h2>
        <div className="divider" />
        <p className="section-desc">
          Technologies and tools I work with daily to craft high-quality digital experiences.
        </p>

        <div className="skills-grid">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="skill-category-card">
              <div className="skill-category-title">
                {CATEGORY_LABELS[cat] || cat}
              </div>
              {items.map((s) => (
                <SkillBar key={s.id} name={s.name} proficiency={s.proficiency} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
