export const AdvantageStrip = () => (
  <div className="bg-[#071B34] py-4 border-b-4 border-[#F25C19] w-full">
    <div className="container mx-auto px-6 max-w-7xl flex flex-wrap justify-center gap-12">
      {['Pay-per-Deliverable', 'Optimized Cost & Resource Efficiency'].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <span className="text-[#F25C19] font-black text-lg">✓</span>
          <span className="text-white font-bold text-[11px] tracking-widest uppercase">{item}</span>
        </div>
      ))}
    </div>
  </div>
);