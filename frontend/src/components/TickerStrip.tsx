import React from 'react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const TickerStrip: React.FC = () => {
  const { ticker } = HOMEPAGE_CONFIG;

  return (
    <section className="bg-[#C65300] py-3 overflow-hidden">
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {[...ticker.items, ...ticker.items].map((item, idx) => (
            <span key={idx} className="ticker-item">
              • {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-wrapper {
          overflow: hidden;
          width: 100%;
          contain: layout style paint;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-transform: translate3d(0, 0, 0);
        }

        .ticker-item {
          white-space: nowrap;
          padding-right: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          flex-shrink: 0;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Mobile: GPU acceleration + no jank */
        @media (max-width: 768px) {
          .ticker-track {
            animation-duration: 28s;
            animation-timing-function: linear;
          }
          .ticker-item {
            padding-right: 1.5rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default TickerStrip;