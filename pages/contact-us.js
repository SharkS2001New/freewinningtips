import React from 'react';
import Link from 'next/link';

function ContactUs() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Get in Touch</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="contact-container">
        <div className="contact-grid">
          {/* Contact Info Card */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="contact-card-title">Call Us</h3>
            <p className="contact-card-text">Monday - Friday, 9am - 6pm EAT</p>
            <a href="tel:+254111509962" className="contact-link">+254 111 509 962</a>
          </div>

          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </div>
            <h3 className="contact-card-title">Email Us</h3>
            <p className="contact-card-text">We'll respond within 24 hours</p>
            <a href="mailto:contact@freewinningtips.com" className="contact-link">contact@freewinningtips.com</a>
          </div>

          {/* WhatsApp Card */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h3 className="contact-card-title">WhatsApp</h3>
            <p className="contact-card-text">Quick responses on WhatsApp</p>
            <a href="https://wa.me/254111509962" target="_blank" rel="noopener noreferrer" className="contact-link">Chat with us →</a>
          </div>
        </div>

        {/* Message Section */}
        <div className="contact-message-section">
          <div className="contact-message-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="contact-message-title">Send us a Message</h3>
          <p className="contact-message-text">
            Have a specific question or suggestion? We'd love to hear from you.
            Drop us a message and we'll get back to you as soon as possible.
          </p>
          <a href="mailto:contact@freewinningtips.com" className="contact-message-btn">
            Send Message
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          background: linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%);
          min-height: 100vh;
        }

        /* Hero Section */
        .contact-hero {
          background: linear-gradient(135deg, #05386B 0%, #0a5a8a 100%);
          padding: 60px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .contact-hero::before {
          content: '✉️';
          position: absolute;
          font-size: 280px;
          opacity: 0.05;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .contact-hero-content {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .contact-hero-title {
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .contact-hero-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
        }

        /* Container */
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px;
        }

        /* Contact Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        /* Contact Card */
        .contact-card {
          background: white;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
        }

        .contact-card-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #05386B, #0a5a8a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .contact-card-icon svg {
          width: 28px;
          height: 28px;
          color: white;
        }

        .contact-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 12px;
        }

        .contact-card-text {
          font-size: 14px;
          color: #6c7a89;
          margin-bottom: 16px;
        }

        .contact-link {
          display: inline-block;
          color: #05386B;
          font-weight: 600;
          text-decoration: none;
          font-size: 16px;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #0a5a8a;
          text-decoration: underline;
        }

        /* Message Section */
        .contact-message-section {
          background: white;
          border-radius: 24px;
          padding: 48px 32px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-message-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #e8f0e8, #d4e4d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .contact-message-icon svg {
          width: 40px;
          height: 40px;
          color: #2e7d32;
        }

        .contact-message-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 16px;
        }

        .contact-message-text {
          font-size: 16px;
          color: #6c7a89;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto 28px;
        }

        .contact-message-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          color: white;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .contact-message-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(46,125,50,0.3);
        }

        .contact-message-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .contact-hero-title {
            font-size: 36px;
          }

          .contact-hero-subtitle {
            font-size: 16px;
          }

          .contact-container {
            padding: 40px 20px;
          }

          .contact-grid {
            gap: 20px;
          }

          .contact-message-section {
            padding: 32px 24px;
          }

          .contact-message-title {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .contact-hero-title {
            font-size: 28px;
          }

          .contact-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactUs;