import React from 'react';
import Hero from '../components/Hero';
import TickerStrip from '../components/TickerStrip';
import PillarsSection from '../components/PillarsSection';
import ExecutionModelSection from '../components/ExecutionModelSection';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <main className="bg-white text-slate-900 overflow-x-hidden max-w-full">

      {/* HERO */}
      <section>
        <Hero />
      </section>

      {/* TICKER */}
      <section className="relative z-10">
        <TickerStrip />
      </section>

      {/* SERVICES — STRONGER CONTRAST (ASH → SOFT GREY DEPTH) */}
      <section className="relative py-20 bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0]">
        
        {/* smooth blend from above */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12">
          <PillarsSection />
        </div>

      </section>

      {/* EXECUTION — DARK ANCHOR (THIS FIXES THE “ALL LIGHT” ISSUE) */}
      <section className="relative py-24 bg-[#0F172A] text-white overflow-hidden">

        {/* subtle brand tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3]/10 to-transparent pointer-events-none" />

        {/* soft grid pattern */}
        <div className="absolute inset-0 opacity-[0.05] 
          bg-[radial-gradient(white_1px,transparent_1px)] 
          [background-size:28px_28px]" />

        <div className="relative container mx-auto px-6 lg:px-12">
          <ExecutionModelSection />
        </div>

      </section>

      {/* PROJECTS — LIGHT BLUE CONTRAST */}
      <section className="py-20 bg-gradient-to-b from-[#EEF4FF] to-[#E0ECFF]">
        <div className="container mx-auto px-6 lg:px-12">
          <ProjectsCarousel />
        </div>
      </section>

      {/* CONTACT — CLEAN RESET */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 lg:px-12">
          <ContactSection />
        </div>
      </section>

    </main>
  );
};

export default HomePage;