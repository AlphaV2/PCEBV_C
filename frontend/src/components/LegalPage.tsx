import React from 'react';

type LegalPageProps = {
  badge: string;
  title: string;
  intro: string;
  updatedAt?: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

const LegalPage: React.FC<LegalPageProps> = ({ badge, title, intro, updatedAt, sections }) => {
  return (
    <main className="min-h-screen bg-[#F6F8FB] text-[#071B34]">
      <section className="bg-[#071B34] pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container mx-auto max-w-5xl px-6 lg:px-12 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F25C19]">{badge}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[3.4rem] font-black tracking-tight max-w-2xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-white/75">{intro}</p>
          {updatedAt && <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/45">Updated {updatedAt}</p>}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-6 lg:px-12 space-y-6">
          {sections.map((section) => (
            <article key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#071B34]">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
