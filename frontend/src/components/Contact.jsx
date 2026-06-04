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
            {profile?.linkedin && (
              <a id="contact-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-item" style={{ textDecoration: 'none' }}>
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">View Profile</div>
                </div>
              </a>
            )}
            {profile?.github && (
              <a id="contact-github" href={profile.github} target="_blank" rel="noreferrer" className="contact-item" style={{ textDecoration: 'none' }}>
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">{profile.github.replace('https://github.com/', '@')}</div>
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
                  placeholder="Enter Your Name"
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
                  placeholder="Enter Your Email"
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
                placeholder="Enter Your Subject"
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
                placeholder="Enter Your Message"
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
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
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
