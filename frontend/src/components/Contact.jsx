import { useState } from 'react';
import { sendContactMessage } from '../api';

const INIT = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMsg('');
    try {
      const res = await sendContactMessage(form);
      setMsg(res.message || 'Message sent!');
      setStatus('success');
      setForm(INIT);
    } catch (err) {
      setMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <div className="section">
        <p className="section-label">Let's Talk</p>
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <div className="divider" />
        <p className="section-desc">
          Have a project in mind or want to collaborate? Send me a message — I'd love to hear from you!
        </p>

        <div className="contact-wrapper">
          {/* Contact Info */}
          <div className="contact-info">
            {profile?.email && (
              <a id="contact-email" href={`mailto:${profile.email}`} className="contact-item" style={{ textDecoration: 'none' }}>
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{profile.email}</div>
                </div>
              </a>
            )}
            {profile?.phone && (
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{profile.phone}</div>
                </div>
              </div>
            )}
            {profile?.location && (
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">{profile.location}</div>
                </div>
              </div>
            )}
            {profile?.github && (
              <a id="contact-github" href={profile.github} target="_blank" rel="noreferrer" className="contact-item" style={{ textDecoration: 'none' }}>
                <div className="contact-icon">🐙</div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">{profile.github.replace('https://github.com/', '@')}</div>
                </div>
              </a>
            )}
            {profile?.linkedin && (
              <a id="contact-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-item" style={{ textDecoration: 'none' }}>
                <div className="contact-icon">💼</div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">View Profile</div>
                </div>
              </a>
            )}
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={onSubmit} id="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email-input">Email Address</label>
                <input
                  id="contact-email-input"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                className="form-input"
                placeholder="Project Collaboration"
                value={form.subject}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={onChange}
                required
              />
            </div>

            {msg && (
              <div className={`form-message ${status}`}>
                {status === 'success' ? '✅ ' : '❌ '}{msg}
              </div>
            )}

            <button id="contact-submit" type="submit" className="btn-submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
