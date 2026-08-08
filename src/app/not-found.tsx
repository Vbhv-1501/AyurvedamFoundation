"use client";

import BodyClassManager from '@/components/BodyClassManager';

export default function NotFound() {
  return (
    <>
      <BodyClassManager className="error404 elementor-default elementor-template-full-width hello-elementor" />
      <style dangerouslySetInnerHTML={{ __html: `
        .not-found-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #1a0510;
          color: #fff;
          overflow: hidden;
          font-family: "Jost", "Mulish", sans-serif;
        }
        
        .not-found-hero {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #1a0510;
        }

        .not-found-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(20,5,8,0.75) 0%, rgba(110,26,61,0.45) 100%);
          z-index: 1;
        }

        .not-found-hero .hero-video-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 56.25vw;
          min-width: 177.77vh;
          min-height: 100vh;
          transform: translate(-50%, -50%);
          border: 0;
          opacity: 0;
          transition: opacity 1.5s ease;
          pointer-events: none;
        }

        .not-found-hero .hero-video-frame.is-ready {
          opacity: 0.7;
        }

        .not-found-hero img.hero-poster {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
          transform: translate(-50%, -50%);
        }

        .not-found-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .not-found-logo {
          max-width: 140px;
          height: auto;
          margin-bottom: 30px;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3));
          transition: transform 0.5s ease;
        }
        
        .not-found-logo:hover {
          transform: rotate(5deg) scale(1.05);
        }

        .not-found-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-inline: 1px solid rgba(244, 217, 174, .68);
          background: rgba(36, 13, 22, .45) !important;
          text-transform: uppercase;
          letter-spacing: .14em;
          font-size: 10px !important;
          font-weight: 700;
          padding: 8px 20px;
          color: #fff !important;
          margin-bottom: 24px;
        }

        .not-found-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9924e;
          box-shadow: 0 0 0 0 rgba(201,138,42,.6);
          animation: pulse 2s infinite;
        }

        .not-found-content h1 {
          font-family: "Cormorant Garamond", "Eczar", serif !important;
          font-size: clamp(3rem, 7.5vw, 6.2rem) !important;
          line-height: 0.95 !important;
          letter-spacing: -0.04em !important;
          color: #fff !important;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .not-found-content .gold {
          color: #f3c981 !important;
        }

        .not-found-content .accent-script {
          font-style: italic;
          font-weight: 500;
        }

        .not-found-content p.lead {
          font-size: clamp(1rem, 1.3vw, 1.25rem) !important;
          line-height: 1.65 !important;
          color: #EAE3DC !important;
          max-width: 560px;
          margin: 0 auto 40px;
        }

        .not-found-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6E1A3D, #C2185B, #D4AF37, #6E1A3D) !important;
          background-size: 300% auto !important;
          color: #ffffff !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          padding: 16px 36px !important;
          border-radius: 50px !important;
          animation: btnGradientMove 6s linear infinite;
          box-shadow: 0 10px 25px rgba(194, 24, 91, 0.3) !important;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none !important;
        }

        .btn-primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 35px rgba(194, 24, 91, 0.5) !important;
        }

        .btn-ghost {
          border: 1.5px solid #c9924e !important;
          color: #fff !important;
          padding: 15px 32px !important;
          border-radius: 40px !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          background: rgba(255,255,255,.05) !important;
          transition: all .3s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
        }

        .btn-ghost:hover {
          transform: translateY(-3px) !important;
          background: #c9924e !important;
          color: #1a0510 !important;
          border-color: #c9924e !important;
        }

        @keyframes btnGradientMove {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(201,138,42,.6); }
          70% { box-shadow: 0 0 0 8px rgba(201,138,42,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,138,42,0); }
        }
      ` }} />
      <div className="not-found-container ayurvedam-home-content">
        <div className="not-found-hero hero-media" id="heroVideoMedia" data-yt-id="q44gsv3ooKI">
          <img
            alt="Ayurvedam Background"
            className="hero-poster"
            decoding="async"
            fetchPriority="high"
            height="1080"
            src="https://i.ytimg.com/vi/q44gsv3ooKI/maxresdefault.jpg"
            width="1920"
          />
        </div>
        <div className="not-found-content">
          <img
            src="/uploads/2025/03/Untitled-design-6-e1742823184130.png"
            alt="Ayurvedam Foundation Logo"
            className="not-found-logo"
          />
          <div className="not-found-badge">
            <span className="dot"></span> Page Not Found
          </div>
          <h1>Lost in the <span className="gold accent-script">Wisdom</span> of Ayurveda?</h1>
          <p className="lead">
            The page you are looking for has departed, much like an unbalanced dosha. Let us guide you back to the path of wellness and learning.
          </p>
          <div className="not-found-ctas">
            <a href="/" className="btn-primary">
              🏠 Return Home
            </a>
            <a href="/contact-us" className="btn-ghost">
              Contact Us ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
