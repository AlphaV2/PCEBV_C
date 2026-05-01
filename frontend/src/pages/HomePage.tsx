import React from 'react';
import Hero from '../components/Hero';
import TickerStrip from '../components/TickerStrip';
import PillarsSection from '../components/PillarsSection';
import ExecutionModelSection from '../components/ExecutionModelSection';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <main className="bg-white text-slate-900 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative">
        <Hero />
      </section>

      {/* ================= TICKER ================= */}
      <section className="relative z-10">
        <TickerStrip />
      </section>

      {/* ================= PILLARS ================= */}
      <section className="bg-[#F6F9FC] py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#0071E3]">
              Core Services
            </p>
            <h2 className="text-3xl font-bold mt-3">
              Pillars of Execution
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Structured engineering, disciplined controls, and execution-ready delivery.
            </p>
          </div>

          <PillarsSection />
        </div>
      </section>

      {/* ================= WHY US (COMPACT STRIP) ================= */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-[#0071E3]">
                Experience
              </p>
              <p className="text-lg font-semibold">
                Global EPC Expertise
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-[#0071E3]">
                Capability
              </p>
              <p className="text-lg font-semibold">
                Multi-Discipline Delivery
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-[#0071E3]">
                Execution
              </p>
              <p className="text-lg font-semibold">
                Engineering to IFC Ready
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EXECUTION MODEL ================= */}
      <section className="relative bg-white py-20">
        
        {/* subtle pattern layer */}
        <div className="absolute inset-0 opacity-[0.04] 
          bg-[radial-gradient(#0071E3_1px,transparent_1px)] 
          [background-size:24px_24px]" 
        />

        <div className="relative container mx-auto px-6 lg:px-12">

          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#0071E3]">
              How We Deliver
            </p>
            <h2 className="text-3xl font-bold mt-3">
              Execution Model
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Clear structure ensures scalable execution, disciplined governance, and delivery precision.
            </p>
          </div>

          <ExecutionModelSection />
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="bg-[#EEF4FF] py-20">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#0071E3]">
              Selected Work
            </p>
            <h2 className="text-3xl font-bold mt-3">
              Projects & Engagements
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Proven execution across petrochemical, power, and industrial engineering projects.
            </p>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#0071E3]">
              Contact
            </p>
            <h2 className="text-3xl font-bold mt-3">
              Start a Conversation
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Share your requirement. The right team will respond.
            </p>
          </div>

          <ContactSection />
        </div>
      </section>

    </main>
  );
};

export default HomePage;