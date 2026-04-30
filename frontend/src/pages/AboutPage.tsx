// src/pages/AboutPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';

/**
 * AboutPage.tsx
 * - Copy-paste ready, single-file About page (TypeScript + React)
 * - Hero with background image + gradient overlay
 * - Mission / Vision / Quality as a collage grid (no icons)
 * - Founders with reveal animation and professional cards
 * - Compact Capabilities, Testimonials, Trusted logos, Final CTA
 *
 * Public assets expected:
 *  /background/home-hero.jpg
 *  /founderprofile/founder_image.jpeg
 *  /founderprofile/founder_image2.jpeg
 *  /founderprofile/founder-placeholder.jpg
 *
 * Tailwind CSS utilities assumed.
 */

const PLACEHOLDER = '/founderprofile/founder-placeholder.jpg';

const FOUNDERS = [
  {
    id: 'nishikant',
    name: 'Nishikant V. Choudhary',
    title: 'Managing Director — EU Operations',
    image: '/founderprofile/founder_image.jpeg',
    bio: 'EU operations lead with governance, client interface and project controls expertise; focused on compliant, high‑quality delivery.',
    tags: ['Governance', 'Project Controls', 'Client Interface'],
    linkedin: '#',
  },
  {
    id: 'kiran',
    name: 'Kiran V. Kulkarni',
    title: 'Managing Director — India Operations',
    image: '/founderprofile/founder_image2.jpeg',
    bio: 'India execution lead with deep discipline expertise in engineering delivery, vendor coordination and site support.',
    tags: ['Execution', '3D Modelling', 'Vendor Coordination'],
    linkedin: '#',
  },
];

const HIGHLIGHTS = [
  '35+ Years EPC Delivery Legacy',
  'EU governance with India execution support',
  'Process, piping, mechanical, electrical, instrumentation, civil',
  'Detail engineering, project controls and documentation',
];

const TESTIMONIALS = [
  { name: 'Client A', quote: 'Reliable delivery and excellent documentation standards.' },
  { name: 'Client B', quote: 'Strong governance and responsive execution support.' },
];

const TRUSTED = ['Reliance', 'JURONG', 'TOYO', 'IHI', 'Worley', 'thyssenkrupp'];

export default function AboutPage(): React.ReactNode {
  return (
    <main className="bg-white text-slate-900 antialiased">
      <Hero />
      <WhoWeAre />
      <MissionVisionQualityCollage />
      <FoundersSection />
      <Capabilities />
      <Testimonials />
      <TrustedLogos />
      <FinalCta />
    </main>
  );
}

/* ----------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/background/bg2.jpg')" }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
      <div className="relative container mx-auto px-6 lg:px-12 py-28 lg:py-36">
        <div className="max-w-3xl text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">About PCE BV</p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Engineering Excellence.
            <span className="block text-orange-400">Global Standards. Trusted Partnerships.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
            Petroleum Consulting Engineers BV delivers Netherlands‑led governance with India‑based execution for multi‑discipline EPC
            projects. We specialize in detail engineering, project controls and documentation for chemicals and petrochemical plants.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#founders"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 transition-transform"
            >
              Meet Our Founders
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#who"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Who We Are ------------------------------- */

function WhoWeAre() {
  return (
    <section id="who" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">Who We Are</p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              <span className="block">Engineers.</span>
              <span className="block text-orange-400">Problem Solvers.</span>
              <span className="block">Partners in Progress.</span>
            </h2>

            <div className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              <p className="mb-3">
                <strong>PCE BV</strong> — Founded and registered with KVK on <strong>30 April 2025</strong>. Co‑founders:
                <span className="font-semibold"> Kiran V. Kulkarni</span> and <span className="font-semibold">Nishikant V. Choudhary</span>.
                Partner company: <span className="font-semibold">PCE PL, Mumbai</span>.
              </p>

              <p>
                Since 1991 we have over <span className="font-semibold">34 years</span> of industry experience delivering professional
                engineering, procurement and construction services across Process, Piping, Mechanical, Electrical, Instrumentation and Civil design.
              </p>

              <p className="mt-3">
                We are a trusted EPC provider specialized in detail engineering, project controls and documentation services.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow hover:-translate-y-0.5 transition-transform"
              >
                Talk to an Expert
              </a>

              <a
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-50"
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{title}</p>
      <div className="mt-2 text-sm text-slate-800">{body}</div>
    </div>
  );
}

/* ---------------- Mission / Vision / Quality Collage ------------------ */

function MissionVisionQualityCollage() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2 items-stretch">
            <div className="lg:row-span-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Mission</h3>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">Simple solutions that work</h2>
              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                To deliver engineering excellence in the simplest, most effective way possible. Great solutions must work reliably in the field and meet client expectations for safety, operability and cost.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Vision</h3>
              <h4 className="mt-2 text-lg font-bold text-slate-900">Precision with global standards</h4>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Simplify complex engineering challenges while ensuring compliance with international standards and delivering scalable solutions that perform across global operations.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-[#E6F4FF] p-6 shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0B5FDB]">Quality Policy</h3>
              <h4 className="mt-2 text-lg font-bold text-slate-900">Committed to consistent quality</h4>
              <p className="mt-3 text-sm text-slate-900 leading-relaxed">
                To provide the highest quality engineering and extended services for procurement and construction which consistently satisfy customer expectations. A Quality Management System and documented procedures support continual improvement and accountability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Founders Section ------------------------- */

function FoundersSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [fallbacks, setFallbacks] = useState<Record<string, string>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.intersectionRatio >= 0.2));
      },
      { threshold: [0, 0.2, 0.4, 0.6, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onImgError = (id: string) => setFallbacks((m) => ({ ...m, [id]: PLACEHOLDER }));

  return (
    <section id="founders" ref={ref} className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">Our Founders</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">Strategic leadership across EU and India operations</h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className={`transition-transform duration-700 ${visible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-6'}`}>
            <FounderCard founder={FOUNDERS[0]} fallback={fallbacks[FOUNDERS[0].id]} onError={onImgError} accent="blue" />
          </div>

          <div className="hidden md:flex flex-col justify-center items-center text-center space-y-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Highlights</div>
            <div className="text-lg font-bold text-slate-900">Focused. Accountable. Experienced.</div>
            <div className="mt-2 grid gap-3">
              <div className="p-3 rounded-lg bg-white border border-blue-100 text-left w-56">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Legacy</p>
                <p className="text-sm text-slate-700">35+ Years EPC Delivery</p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-blue-100 text-left w-56">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Model</p>
                <p className="text-sm text-slate-700">EU governance + India execution</p>
              </div>
            </div>
          </div>

          <div className={`transition-transform duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
            <FounderCard founder={FOUNDERS[1]} fallback={fallbacks[FOUNDERS[1].id]} onError={onImgError} accent="orange" />
          </div>
        </div>

        <div className="md:hidden mt-6 grid grid-cols-3 gap-3">
          <MiniFact title="Founded" value="30 Apr 2025" />
          <MiniFact title="Partner" value="PCE PL, Mumbai" />
          <MiniFact title="Lineage" value="Since 1991" />
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  founder,
  fallback,
  onError,
  accent,
}: {
  founder: (typeof FOUNDERS)[number];
  fallback?: string;
  onError: (id: string) => void;
  accent: 'blue' | 'orange';
}) {
  const btnBg = accent === 'blue' ? 'bg-[#0056A3]' : 'bg-[#FF6A2A]';
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex gap-4 items-start">
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={fallback || founder.image || PLACEHOLDER}
          alt={founder.name}
          onError={() => onError(founder.id)}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className={`text-xs font-semibold uppercase tracking-wider ${accent === 'blue' ? 'text-[#0B5FDB]' : 'text-[#FF6A2A]'}`}>
          {founder.title}
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">{founder.name}</h3>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed">{founder.bio}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {founder.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                accent === 'blue' ? 'border-blue-100 bg-[#EEF6FF] text-[#0B5FDB]' : 'border-orange-100 bg-orange-50 text-orange-700'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <a href={founder.linkedin} className={`inline-flex items-center gap-2 rounded-full ${btnBg} px-3 py-2 text-sm font-semibold text-white`}>
            <Linkedin className="h-4 w-4" /> Connect
          </a>
        </div>
      </div>
    </article>
  );
}

function MiniFact({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
      <p className="text-xs font-semibold text-blue-600 uppercase mb-1">{title}</p>
      <p className="text-sm text-slate-900">{value}</p>
    </div>
  );
}

/* ---------------------------- Capabilities ---------------------------- */

function Capabilities() {
  return (
    <section className="py-12 sm:py-14 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h3 className="text-lg font-semibold text-slate-900">Core Capabilities</h3>
          <p className="mt-2 text-sm text-slate-600">What we deliver across projects and disciplines</p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h} className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">{h.split(' — ')[0]}</h4>
              <p className="text-xs text-slate-600">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Testimonials ------------------------------ */

function Testimonials() {
  return (
    <section className="py-12 sm:py-14 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h3 className="text-lg font-semibold text-slate-900">Client Testimonials</h3>
          <p className="mt-2 text-sm text-slate-600">Selected feedback from partners and clients</p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-800 shadow-sm">
              <blockquote className="italic text-slate-800">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-slate-700">— {t.name}</figcaption>
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
    <section className="py-10 sm:py-12 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">Trusted by</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TRUSTED.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm min-w-[120px]"
                role="img"
                aria-label={name}
              >
                {name}
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
    <section className="py-12 sm:py-16 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-4 items-center justify-between rounded-2xl p-6 sm:flex-row bg-black">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Let's Build Together</p>
            <h2 className="mt-2 text-xl font-bold text-white">Clear structure. Strong delivery. One accountable team.</h2>
          </div>

          <div className="flex gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 transition-transform"
            >
              Talk to an Expert
            </a>

            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white bg-transparent hover:bg-white/5"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
