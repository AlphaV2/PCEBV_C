import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import FoundersSection from '../components/FoundersSection';
import { useTranslatedAbout } from '../hooks/useTranslatedData';

/**
 * AboutPage.tsx
 * Compact, authoritative About page
 * - Hero preserved
 * - Overview + triangular interface visual
 * - Short timeline
 * - Founders section kept
 * - Thin client-exposure ticker near CTA
 * - Smaller CTA height
 * - Mobile-friendly and low-redundancy
 */

const TIMELINE = [
  {
    year: '1991',
    titleKey: 'about.timeline.foundation',
  },
  {
    year: '2025',
    titleKey: 'about.timeline.established',
  },
  {
    year: 'Today',
    titleKey: 'about.timeline.global',
  },
];

const CLIENT_EXPOSURE = [
  'Reliance',
  'Jurong',
  'Toyo',
  'IHI',
  'ONGC',
  'GSPC',
];

export default function AboutPage(): React.ReactNode {
  return (
    <main className="bg-[#F6F8FB] text-[#071B34] antialiased overflow-hidden min-h-screen">
      <Hero />
      <OverviewSection />
      <TimelineSection />
      <FoundersSection />
      <ClientTicker />
      <FinalCTA />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  const { t } = useTranslation();
  return (
    <header
      className="relative bg-[#071B34] bg-cover bg-center min-h-[80vh] lg:min-h-[84vh] flex items-center overflow-hidden mt-[80px] lg:mt-[96px]"
      style={{ backgroundImage: "url('/background/bg2.webp')" }}
      aria-label="About PCE BV"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#071B34]/95 via-[#071B34]/78 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071B34] via-[#071B34]/30 to-transparent opacity-90 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 30px)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-7 h-[2px] bg-[#F25C19]" />
            <span className="text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
              {t('about.badge', 'About PCE BV')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[4.3rem] leading-[0.95] tracking-[-0.05em] font-black max-w-[11ch]">
            {t('about.heroHeading', 'Engineering precision for industrial execution.')}
          </h1>

          <p className="mt-7 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            {t('about.heroDescription', 'Netherlands-led governance with India-based engineering execution support for industrial EPC projects.')}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#founders"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#F25C19] px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_30px_rgba(242,92,25,0.28)] transition-all hover:brightness-110"
            >
              {t('about.heroCtaPrimary', 'Meet Leadership')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#overview"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-white/10"
            >
              {t('about.heroCtaSecondary', 'Explore Company')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                              OVERVIEW + TRIANGLE                          */
/* -------------------------------------------------------------------------- */

function OverviewSection() {
  const { t } = useTranslation();
  const aboutCopy = useTranslatedAbout();
  return (
    <section
      id="overview"
      className="relative py-14 lg:py-16 bg-white border-y border-[#E7EDF3] scroll-mt-24"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_0.95fr] gap-14 items-start">
          {/* LEFT */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
              {t('about.overviewBadge', 'Company Overview')}
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[3.1rem] leading-[0.98] tracking-[-0.04em] font-black text-[#071B34] max-w-[11ch]">
              {t('about.overviewHeading', 'Structured around execution and accountability.')}
            </h2>

            <div className="mt-7 space-y-5 text-[#5B6472] leading-relaxed max-w-2xl">
              {aboutCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                t('about.values.precision', 'Precision'),
                t('about.values.simpleSolutions', 'Simple Solutions'),
                t('about.values.internationalStandards', 'International Standards'),
              ].map((item, index) => {
                const classes = [
                  'bg-[#FFF4EE] text-[#F25C19] border-[#F8D8C6]',
                  'bg-[#EEF4FF] text-[#2563EB] border-[#D8E6FF]',
                  'bg-[#F3F6F9] text-[#071B34] border-[#DCE4EC]',
                ];

                return (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] ${classes[index]}`}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-2">
            <div className="mb-5">
              <span className="text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
                Interface Model
              </span>
            </div>

            <InterfaceTriangle />
          </div>
        </div>
      </div>
    </section>
  );
}

function InterfaceTriangle() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="flex flex-col items-center gap-4">
        <TriangleLevel
          width="58%"
          height="7.25rem"
          color="#23A5E6"
          title="PCE BV"
          subtitle="PO and Interface Coordination"
        />
        <TriangleLevel
          width="76%"
          height="7.75rem"
          color="#0C67B5"
          title="PCE PL Middle Level Engineering"
        />
        <TriangleLevel
          width="94%"
          height="8.5rem"
          color="#0A4E99"
          title="PCE PL FEED and Detail Engineering"
        />
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-[#5B6472]">
        {t('about.interfaceStatement', 'An interface between governance, coordination, and execution.')}
      </p>
    </div>
  );
}

function TriangleLevel({
  width,
  height,
  color,
  title,
  subtitle,
}: {
  width: string;
  height: string;
  color: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative flex justify-center" style={{ width }}>
      <div
        className="absolute inset-0 shadow-[0_18px_40px_-24px_rgba(7,27,52,0.3)]"
        style={{
          background: color,
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          height,
        }}
        aria-hidden="true"
      />
      <div
        className="relative z-10 flex h-[inherit] w-full flex-col items-center justify-center text-center px-4 text-white"
        style={{ height }}
      >
        <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] leading-tight max-w-[22ch]">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-1 text-[11px] sm:text-xs font-semibold tracking-wide opacity-95 max-w-[20ch]">
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                TIMELINE                                    */
/* -------------------------------------------------------------------------- */

function TimelineSection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-14 lg:py-16 bg-[#F6F8FB] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
              {t('about.timelineBadge', 'Timeline')}
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[3rem] leading-none tracking-[-0.04em] font-black text-[#071B34]">
              {t('about.timelineHeading', 'Built through experience.')}
            </h2>
          </div>

          <p className="max-w-md text-[#5B6472] leading-relaxed">
            {t('about.timelineDescription', 'From engineering legacy to structured global EPC delivery.')}
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-[22px] left-0 right-0 h-px bg-[#DCE4EC]" />

          <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex lg:grid lg:grid-cols-3 gap-5 min-w-max lg:min-w-0">
              {TIMELINE.map((item, idx) => (
                <article key={item.year} className="w-[280px] lg:w-auto">
                  <div className="relative z-10 w-11 h-11 rounded-full border-2 border-[#071B34] bg-white flex items-center justify-center text-sm font-black text-[#071B34]">
                    {idx + 1}
                  </div>

                  <div className="mt-7 rounded-[24px] border border-[#E6ECF2] bg-white p-7 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_40px_-24px_rgba(7,27,52,0.12)]">
                    <span className="text-[10px] uppercase tracking-[0.22em] font-black text-[#F25C19]">
                      {item.year}
                    </span>

                    <h3 className="mt-3 text-xl font-black leading-snug text-[#071B34]">
                      {t(item.titleKey, item.titleKey)}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           CLIENT EXPOSURE TICKER                           */
/* -------------------------------------------------------------------------- */

function ClientTicker() {
  const repeated = [...CLIENT_EXPOSURE, ...CLIENT_EXPOSURE];
  const { t } = useTranslation();

  return (
    <section className="py-7 bg-[#F8FAFC] border-y border-[#E7EDF3]">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="rounded-2xl border border-[#DCE4EC] bg-white px-5 py-4 shadow-[0_12px_30px_-24px_rgba(7,27,52,0.18)] overflow-hidden">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <span className="block text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
                {t('about.clientExposure', 'Project Exposure')}
              </span>
              
            </div>

            <div className="relative w-full overflow-hidden">
              <div
                className="flex w-max items-center gap-8 whitespace-nowrap"
                style={{
                  animation: 'ticker 24s linear infinite',
                }}
              >
                {repeated.map((name, index) => (
                  <span
                    key={`${name}-${index}`}
                    className="text-sm sm:text-base font-black tracking-tight text-[#071B34]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 FINAL CTA                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section className="py-10 lg:py-12 bg-white border-t border-[#E7EDF3]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#071B34] px-8 py-9 lg:px-12 lg:py-10">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 30px)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
                {t('about.finalCtaBadge', 'Let’s Build Together')}
              </span>

              <h2 className="mt-3 text-2xl lg:text-[2.3rem] leading-[1.02] tracking-[-0.04em] font-black text-white">
                {t('about.finalCtaHeading', 'Structured engineering execution.')}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[#F25C19] px-7 py-3 text-xs uppercase tracking-[0.16em] font-black text-white shadow-lg transition-all hover:brightness-110"
              >
                {t('about.finalCtaPrimary', 'Contact Us')}
              </a>

              <a
                href="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm px-7 py-3 text-xs uppercase tracking-[0.16em] font-black text-white transition-all hover:bg-white/10"
              >
                {t('about.finalCtaSecondary', 'View Services')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}