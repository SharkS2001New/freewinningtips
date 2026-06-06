import React from 'react';
import Link from 'next/link';

function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Free Winning Tips</h1>
          <p className="about-hero-subtitle">
            Your trusted partner in football betting intelligence since 2019
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-container">
        {/* Mission Section */}
        <div className="about-section about-mission">
          <div className="about-icon">🎯</div>
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-section-text">
            At Free Winning Tips, we are on a mission to revolutionize the world of football betting 
            by providing you with daily free football predictions, expertly analyzed jackpot predictions, 
            and premium tips with an astonishing 99% winning probability. With a collective experience 
            spanning over a decade in the industry, our team of dedicated experts is committed to offering 
            comprehensive and well-researched insights that guide your betting decisions and elevate your 
            chances of achieving consistent success. Learn more about{' '}
            <Link href="/how-we-predict">how we predict football matches</Link>.
          </p>
        </div>

        {/* Stats Section */}
        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">99%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Users</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">🔍</div>
            <h3 className="about-card-title">Reliable Source for Accurate Predictions</h3>
            <p className="about-card-text">
              In the crowded landscape of football betting platforms, we emerge as a beacon of reliability 
              and trustworthiness. Our unwavering commitment to excellence has garnered us a reputation as 
              one of the industry's leading providers of premium football tips. We go above and beyond to 
              ensure you receive accurate and up-to-date insights that empower you to make well-informed 
              betting choices.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">📊</div>
            <h3 className="about-card-title">Thorough & Comprehensive Analysis</h3>
            <p className="about-card-text">
              Our team of seasoned professionals conducts a meticulous examination of an extensive array 
              of factors that influence football match outcomes. From evaluating team forms and recent 
              performances to scrutinizing player injuries and head-to-head statistics, we delve deep into 
              every aspect to equip you with comprehensive insights.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🎓</div>
            <h3 className="about-card-title">Catering to All Levels of Expertise</h3>
            <p className="about-card-text">
              Whether you're a novice or a seasoned bettor, our platform is tailored to your unique needs. 
              Our daily free football predictions act as an invaluable starting point for beginners, while 
              our premium tips serve experienced bettors. Our platform is designed to nurture your betting 
              skills and enhance your overall success rate.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🏆</div>
            <h3 className="about-card-title">Unlocking Jackpot Success</h3>
            <p className="about-card-text">
              For those seeking a heightened level of guidance, our expertly analyzed jackpot predictions 
              are your gateway to triumph. Derived from concentrated analysis of matches, these predictions 
              take into account team strategies, historical data, and insider insights to significantly 
              enhance your chances of hitting the jackpot.
            </p>
          </div>
        </div>

        {/* Premium Tips Section */}
        <div className="about-premium">
          <div className="about-premium-badge">⭐ Premium Service</div>
          <h2 className="about-premium-title">Premium Tips: Gateway to Consistent Victories</h2>
          <p className="about-premium-text">
            Our premium tips boast an exceptional 99% winning probability, making them a pinnacle of success 
            in the world of football betting. The result of exhaustive research, first-hand information, and 
            a profound understanding of the game, these tips are a testament to our dedication to your success. 
            Subscribing to our premium service grants you exclusive access to high-value tips that have been 
            scrupulously selected to maximize your returns.
          </p>
        </div>

        {/* Transparency Section */}
        <div className="about-transparency">
          <div className="about-transparency-content">
            <div className="about-transparency-icon">💎</div>
            <h2 className="about-transparency-title">Transparency & Integrity at the Core</h2>
            <p className="about-transparency-text">
              At Free Winning Tips, transparency and integrity are the bedrock of our ethos. We provide an 
              unclouded track record of our past predictions and results, showcasing our proficiency and 
              fostering unwavering trust with our users. Our commitment to consistently delivering accurate 
              predictions sets us head and shoulders above the competition.
            </p>
          </div>
        </div>

        {/* Responsibility Section */}
        <div className="about-responsibility">
          <h2 className="about-responsibility-title">Our Responsibility</h2>
          <div className="responsibility-grid">
            <div className="responsibility-item">
              <div className="responsibility-number">1</div>
              <div className="responsibility-content">
                <h4>Services & Predictions</h4>
                <p>While we strive to offer valuable predictions, we cannot accept responsibility for any damages or losses that may arise. Betting involves risks — always bet responsibly.</p>
              </div>
            </div>
            <div className="responsibility-item">
              <div className="responsibility-number">2</div>
              <div className="responsibility-content">
                <h4>Accuracy of Information</h4>
                <p>We make every effort to ensure correctness, but we do not guarantee accuracy or completeness. The Website might contain errors or outdated information.</p>
              </div>
            </div>
            <div className="responsibility-item">
              <div className="responsibility-number">3</div>
              <div className="responsibility-content">
                <h4>No Warranties</h4>
                <p>Information and materials are offered "as is," without any conditions, warranties, or other terms to the fullest extent permitted by law.</p>
              </div>
            </div>
          </div>
          <div className="responsibility-note">
            <p>By using our Website, you acknowledge and agree to these terms. We encourage responsible betting practices. Remember that betting comes with risks — never bet more than you can afford to lose.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <h3 className="about-cta-title">Ready to Start Winning?</h3>
          <p className="about-cta-text">
            Join thousands of satisfied users who have transformed their betting experience with Free Winning Tips.
          </p>
          <Link href="/free-vip-tips-today" className="about-cta-btn">
            Get Started Today →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          background: linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%);
          min-height: 100vh;
        }

        /* Hero Section */
        .about-hero {
          background: linear-gradient(135deg, #05386B 0%, #0a5a8a 100%);
          padding: 80px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .about-hero::before {
          content: '⚽';
          position: absolute;
          font-size: 280px;
          opacity: 0.05;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .about-hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .about-hero-title {
          font-size: 52px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .about-hero-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
        }

        /* Container */
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px;
        }

        /* Mission Section */
        .about-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .about-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .about-section-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 20px;
        }

        .about-section-text {
          font-size: 16px;
          color: #4a5a6a;
          line-height: 1.8;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Stats Section */
        .about-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          background: white;
          border-radius: 20px;
          padding: 40px 20px;
          margin-bottom: 60px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .stat-item {
          text-align: center;
          min-width: 120px;
        }

        .stat-number {
          display: block;
          font-size: 36px;
          font-weight: 800;
          color: #2e7d32;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #6c7a89;
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: #e0e5ea;
        }

        /* Grid Cards */
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .about-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .about-card-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .about-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 16px;
        }

        .about-card-text {
          font-size: 14px;
          color: #5a6a7a;
          line-height: 1.6;
        }

        /* Premium Section */
        .about-premium {
          background: linear-gradient(135deg, #1a4a1f, #2e7d32);
          border-radius: 24px;
          padding: 48px 32px;
          text-align: center;
          margin-bottom: 60px;
        }

        .about-premium-badge {
          display: inline-block;
          background: rgba(255,215,0,0.2);
          color: #ffc107;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .about-premium-title {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
        }

        .about-premium-text {
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Transparency Section */
        .about-transparency {
          background: white;
          border-radius: 24px;
          padding: 48px 32px;
          text-align: center;
          margin-bottom: 60px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .about-transparency-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .about-transparency-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 20px;
        }

        .about-transparency-text {
          font-size: 16px;
          color: #5a6a7a;
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Responsibility Section */
        .about-responsibility {
          background: #f8fafc;
          border-radius: 24px;
          padding: 48px 32px;
          margin-bottom: 60px;
          border: 1px solid #e8edf2;
        }

        .about-responsibility-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a2a3a;
          text-align: center;
          margin-bottom: 32px;
        }

        .responsibility-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .responsibility-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .responsibility-number {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .responsibility-content h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 8px;
        }

        .responsibility-content p {
          font-size: 13px;
          color: #6c7a89;
          line-height: 1.5;
        }

        .responsibility-note {
          background: #fff3e0;
          border-left: 4px solid #ffc107;
          padding: 16px 20px;
          border-radius: 12px;
        }

        .responsibility-note p {
          font-size: 14px;
          color: #856404;
          margin: 0;
        }

        /* CTA Section */
        .about-cta {
          text-align: center;
          padding: 40px 20px;
        }

        .about-cta-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a2a3a;
          margin-bottom: 16px;
        }

        .about-cta-text {
          font-size: 16px;
          color: #6c7a89;
          margin-bottom: 28px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .about-cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          color: white;
          padding: 14px 36px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .about-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(46,125,50,0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .about-hero-title {
            font-size: 36px;
          }

          .about-hero-subtitle {
            font-size: 16px;
          }

          .about-container {
            padding: 40px 20px;
          }

          .about-section-title {
            font-size: 26px;
          }

          .about-stats {
            flex-direction: column;
          }

          .stat-divider {
            width: 60px;
            height: 1px;
          }

          .about-premium-title {
            font-size: 22px;
          }

          .about-transparency-title {
            font-size: 22px;
          }

          .about-responsibility-title {
            font-size: 22px;
          }

          .about-cta-title {
            font-size: 22px;
          }

          .responsibility-item {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .about-hero-title {
            font-size: 28px;
          }

          .about-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutUs;