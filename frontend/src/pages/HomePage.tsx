import React from 'react';
import Hero from '../components/Hero';
import TickerStrip from '../components/TickerStrip';
import PillarsSection from '../components/PillarsSection';
import ExecutionModelSection from '../components/ExecutionModelSection';
import FoundersSection from '../components/FoundersSection';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ContactSection from '../components/ContactSection';
import RevealSection from '../components/RevealSection';

const HomePage: React.FC = () => {
  return (
    <>
      <RevealSection delayMs={0} direction="up">
        <Hero />
      </RevealSection>

      <RevealSection delayMs={10} direction="up">
        <TickerStrip />
      </RevealSection>

      {/* Pillars - 3 Column Accordion Cards */}
      <RevealSection delayMs={20} direction="right">
        <PillarsSection />
      </RevealSection>

      {/* Execution Model Flow */}
      <RevealSection delayMs={30} direction="up">
        <ExecutionModelSection />
      </RevealSection>

      {/* Founders Section */}
      {/* <RevealSection delayMs={40} direction="left">
        <FoundersSection />
      </RevealSection> */}

      {/* Projects Carousel */}
      <RevealSection delayMs={50} direction="right">
        <ProjectsCarousel />
      </RevealSection>

      {/* Contact Section */}
      <RevealSection delayMs={60} direction="left">
        <ContactSection />
      </RevealSection>
    </>
  );
};

export default HomePage;