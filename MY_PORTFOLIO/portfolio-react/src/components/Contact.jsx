import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showStatus = (message, type) => {
    setStatus({ show: true, message, type });
    setTimeout(() => setStatus({ show: false, message: '', type: '' }), 3500);
  };

  const confettiBurst = () => {
    const colors = ['#39ff14', '#00d4ff', '#a855f7', '#febc2e', '#ff5f57'];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.className = 'falling-particle';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = '0px';
      const size = Math.random() * 6 + 3;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.setProperty('--fall-dur', Math.random() * 1.5 + 1 + 's');
      el.style.setProperty('--fall-delay', '0s');
      el.style.setProperty('--fall-opacity', String(Math.random() * 0.7 + 0.3));
      el.style.position = 'fixed';
      el.style.zIndex = '9000';
      el.style.borderRadius = '50%';
      el.style.pointerEvents = 'none';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2800);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = 'service_73hecqd';
    const templateID = 'template_3tffvck';
    const publicKey = 'ZLDicazH-JaUECDZF';

    const btn = e.target.querySelector('.btn-send');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const templateParams = {  
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'vishv90ptl@gmail.com'
    };

    import('@emailjs/browser').then((emailjs) => {
      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          // UI Feedback
          btn.textContent = originalText;
          btn.style.opacity = '1';
          btn.disabled = false;
          showStatus('✓  Message sent successfully!', 'success');
          
          // Form reset
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          confettiBurst();
        })
        .catch((error) => {
          console.error('FAILED...', error);
          // UI Feedback
          btn.textContent = originalText;
          btn.style.opacity = '1';
          btn.disabled = false;
          showStatus('❌ Failed to send. Please try again.', 'error');
        });
    });
  };

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-header reveal">
          <p className="section-label">// get in touch</p>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
        </div>
        <div className="contact-wrap reveal">
          <p className="section-sub">
            I'm always open to exciting opportunities. Drop me a line — I'd love to hear from you.
          </p>

          <div className="social-row">
            <a href="https://github.com/vishvpatel210" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              <span className="tooltip">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/vishv-patel-976712394/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span className="tooltip">LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@VishvPatel-k2x" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/>
              </svg>
              <span className="tooltip">YouTube</span>
            </a>
            <a href="https://x.com/Vishv_Patel0210" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="tooltip">Twitter / X</span>
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-name">Name</label>
                <input
                  type="text"
                  id="cf-name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cf-email">Email</label>
                <input
                  type="email"
                  id="cf-email"
                  name="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cf-subject">Subject</label>
              <input
                type="text"
                id="cf-subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Tell me about your project or idea…"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-submit-row">
              <button type="submit" className="btn-send" onClick={handleButtonClick}>
                Send Message
              </button>
              <span className={`form-status ${status.show ? 'show' : ''} ${status.type}`}>
                {status.message}
              </span>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <a href="mailto:vishv.patel@email.com" className="contact-email">
              <span className="mail-icon">✉</span> vishv90ptl@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
