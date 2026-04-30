import React from 'react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const TickerStrip: React.FC = () => {
  const { ticker } = HOMEPAGE_CONFIG;

  return (
    <section className="bg-[#FF6A2A] py-3 overflow-hidden">
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-content {
          animation: ticker-scroll ${ticker.animation_duration} linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-content {
            animation: none;
          }
        }
      `}</style>

      <div className="flex w-max ticker-content gap-6 px-6">
        {[...ticker.items, ...ticker.items].map((item, idx) => (
          <span key={idx} className="whitespace-nowrap text-sm font-semibold text-slate-900">
            • {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TickerStrip;
