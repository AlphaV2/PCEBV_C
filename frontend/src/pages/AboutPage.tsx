// src/pages/AboutPage.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import FoundersSection from '../components/FoundersSection';

/**
 * AboutPage.tsx
 * - Optimized Single-file About page (TypeScript + React)
 * - Semantic HTML for SEO
 * - Responsive Grid Layouts (Fixed Mission Card Overflow)
 * - Brand Color Normalization (#0071E3 Blue, #FF6A2A Orange)
 */

const HIGHLIGHTS = [
  { title: 'Legacy', desc: '35+ Years EPC Delivery Legacy' },
  { title: 'Model', desc: 'EU governance with India execution support' },
  { title: 'Disciplines', desc: 'Process, piping, mechanical, electrical, instrumentation, civil' },
  { title: 'Services', desc: 'Detail engineering, project controls and documentation' },
];

const TESTIMONIALS = [
  { name: 'Client A', quote: 'Reliable delivery and excellent documentation standards.' },
  { name: 'Client B', quote: 'Strong governance and responsive execution support.' },
];

const TRUSTED = ['Reliance', 'JURONG', 'TOYO', 'IHI', 'Worley', 'thyssenkrupp'];

export default function AboutPage(): React.ReactNode {
  return (
    <main className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(226,232,240,0.95)_42%,rgba(241,245,249,1)_100%)] text-slate-900 antialiased min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.12),transparent_55%),radial-gradient(circle_at_top_right,rgba(255,106,42,0.10),transparent_50%)]" />
      <div className="relative z-10">
      <Hero />
      <WhoWeAre />
      <MissionVisionQualityCollage />
      <FoundersSection />
      <Capabilities />
      <Testimonials />
      <TrustedLogos />
      <FinalCta />
      </div>
    </main>
  );
}

/* ----------------------------- Hero ---------------------------------- */

/* ----------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <header
      // FIXED: Added mt-[88px] lg:mt-[104px] to push the section safely below the fixed global navbar.
      className="relative bg-slate-900 bg-cover bg-center min-h-[80vh] flex items-center overflow-hidden mt-[88px] lg:mt-[104px]"
      style={{ backgroundImage: "url('/background/bg2.webp')" }}
      aria-label="About PCE BV Hero Section"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent pointer-events-none" />
      
      {/* Flex container for perfect vertical centering */}
      <div className="relative container mx-auto px-6 lg:px-12 py-12 w-full z-10">
        <div className="max-w-3xl text-white">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#0071E3] mb-4">
            About PCE BV
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
            Engineering Excellence.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-blue-300 mt-2">
              Global Standards. Trusted Partnerships.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-medium">
            Petroleum Consulting Engineers BV delivers Netherlands‑led governance with India‑based execution for multi‑discipline EPC
            projects. We specialize in detail engineering, project controls and documentation for chemicals and petrochemical plants.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#founders"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6A2A] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 hover:bg-[#e95f20] active:scale-95 transition-all"
            >
              Meet Our Founders
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#who"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* --------------------------- Who We Are ------------------------------- */

function WhoWeAre() {
  return (
    <section id="who" className="py-20 lg:py-28 bg-slate-100/80 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 sm:p-10 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.28)] backdrop-blur-sm text-center lg:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0071E3] mb-2">Who We Are</p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              <span className="block">Engineers.</span>
              <span className="block text-[#0071E3]">Problem Solvers.</span>
              <span className="block text-slate-400">Partners in Progress.</span>
            </h2>

            <div className="mt-6 text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 space-y-4 font-medium">
              <p>
                <strong className="text-slate-900 font-bold">PCE BV</strong> — Founded and registered with KVK on <strong className="text-slate-900 font-bold">30 April 2025</strong>. Co‑founders:
                <span className="font-bold text-slate-900"> Kiran V. Kulkarni</span> and <span className="font-bold text-slate-900">Nishikant V. Choudhary</span>.
                Partner company: <span className="font-bold text-slate-900">PCE PL, Mumbai</span>.
              </p>
              <p>
                Since 1991 we have over <span className="font-bold text-slate-900">34 years</span> of industry experience delivering professional
                engineering, procurement and construction services across Process, Piping, Mechanical, Electrical, Instrumentation and Civil design.
              </p>
              <p>
                We are a trusted EPC provider specialized in detail engineering, project controls and documentation services.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6A2A] px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:bg-[#e95f20] transition-colors"
              >
                Talk to an Expert
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FactCard title="Founded" body="Registered with KVK — 30 Apr 2025" />
            <FactCard title="Co‑founders" body="Kiran V. Kulkarni & Nishikant V. Choudhary" />
            <FactCard title="Partner" body="PCE PL, Mumbai (Execution)" />
            <FactCard title="Lineage" body="Since 1991 — 34+ years" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FactCard({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_-26px_rgba(15,23,42,0.35)] hover:shadow-[0_20px_50px_-26px_rgba(15,23,42,0.45)] transition-shadow">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0071E3]">{title}</h3>
      <p className="mt-2 text-sm font-bold text-slate-800 leading-snug">{body}</p>
    </article>
  );
}

/* ---------------- Mission / Vision / Quality Collage ------------------ */

function MissionVisionQualityCollage() {
  return (
    <section className="py-16 bg-[linear-gradient(180deg,rgba(241,245,249,0.96),rgba(226,232,240,0.92))] border-y border-slate-200/70">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* FIXED LAYOUT: Switched to a clean 3-column grid that naturally expands height */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            
            <div className="md:col-span-2 lg:col-span-1 rounded-[2rem] border border-slate-200/80 bg-white p-8 lg:p-10 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.35)] flex flex-col h-full">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mission</h3>
              <h2 className="mt-4 text-3xl font-black text-slate-900 tracking-tight leading-tight">Simple solutions <br/> that work.</h2>
              <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                To deliver engineering excellence in the simplest, most effective way possible. Great solutions must work reliably in the field and meet client expectations for safety, operability and cost.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 lg:p-10 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.35)] flex flex-col h-full">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vision</h3>
              <h4 className="mt-4 text-xl font-black text-slate-900 leading-tight">Precision with global standards.</h4>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">
                Simplify complex engineering challenges while ensuring compliance with international standards and delivering scalable solutions that perform across global operations.
              </p>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-[#eaf4ff] to-white p-8 lg:p-10 shadow-[0_20px_55px_-28px_rgba(0,113,227,0.35)] flex flex-col h-full">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0071E3]">Quality Policy</h3>
              <h4 className="mt-4 text-xl font-black text-slate-900 leading-tight">Committed to consistent quality.</h4>
              <p className="mt-4 text-sm text-slate-800 leading-relaxed font-medium">
                To provide the highest quality engineering and extended services for procurement and construction which consistently satisfy customer expectations. A Quality Management System and documented procedures support continual improvement and accountability.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* Founders UI consolidated: using shared `FoundersSection` component from src/components/FoundersSection.tsx */

/* ---------------------------- Capabilities ---------------------------- */

function Capabilities() {
  return (
    <section className="py-20 bg-slate-100/90 border-t border-slate-200/70">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-[#0071E3] mb-2">Core Capabilities</h2>
          <p className="text-3xl font-black text-slate-900 tracking-tight">What we deliver across projects.</p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* FIXED: Using object array instead of string splitting */}
          {HIGHLIGHTS.map((item, idx) => (
            <article key={idx} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_44px_-28px_rgba(15,23,42,0.35)] hover:shadow-[0_22px_55px_-30px_rgba(15,23,42,0.45)] transition-shadow">
              <h3 className="text-sm font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Testimonials ------------------------------ */

function Testimonials() {
  return (
    <section className="py-20 bg-slate-100/80">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Client Testimonials</h2>
          <p className="text-2xl font-black text-slate-900 tracking-tight">Selected feedback from partners.</p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t, idx) => (
            <figure key={idx} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-8 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.4)]">
              <blockquote className="text-lg font-medium text-slate-700 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">
                  {t.name.charAt(0)}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-900">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Trusted Logos ----------------------------- */

function TrustedLogos() {
  return (
    <section className="py-12 bg-slate-100/90 border-t border-slate-200/70">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trusted by industry leaders</h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {TRUSTED.map((name) => (
              <div
                key={name}
                className="text-lg sm:text-2xl font-black tracking-tighter text-slate-800 select-none"
                role="img"
                aria-label={`${name} logo`}
              >
                {name.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA ------------------------------ */

function FinalCta() {
  return (
    <section className="py-20 bg-slate-100/80">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-8 items-center justify-between rounded-[2rem] p-10 sm:p-14 lg:flex-row bg-slate-950 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.7)] relative overflow-hidden border border-white/10">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,1),transparent_50%)]" />

          <div className="text-center lg:text-left relative z-10 max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#0071E3] mb-2">Let's Build Together</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Clear structure. Strong delivery. <br className="hidden sm:block" /> One accountable team.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6A2A] px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 hover:bg-[#e95f20] transition-colors"
            >
              Talk to an Expert
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-widest text-white bg-transparent hover:bg-white/10 transition-colors"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}