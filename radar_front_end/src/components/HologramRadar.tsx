import React, { useEffect, useState } from 'react';

const HologramRadar: React.FC = () => {
  // State for random HUD metrics to make it alive
  const [altitude, setAltitude] = useState(120);
  const [battery, setBattery] = useState(98);
  const [signal, setSignal] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude(prev => prev + (Math.random() > 0.5 ? 0.5 : -0.5));
      if (Math.random() > 0.95) setBattery(prev => Math.max(0, prev - 1));
      setSignal(prev => Math.min(100, Math.max(80, prev + (Math.random() * 4 - 2))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] perspective-1000 select-none pointer-events-none font-mono">
      
      {/* 3D Scene Container */}
      <div className="w-full h-full relative transform-style-3d group">
        
        {/* --- TACTICAL FLOOR RADAR (Rotated Plane) --- */}
        <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] rotate-x-60 transform-style-3d flex items-center justify-center opacity-90">
           {/* Base Glow */}
           <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-lg"></div>
           
           {/* Outer Ring */}
           <div className="absolute w-full h-full rounded-full border-[1.5px] border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.1)_100%)]"></div>
           
           {/* Inner Rings */}
           <div className="absolute w-[70%] h-[70%] rounded-full border border-blue-400/40 border-dashed animate-[spin_10s_linear_infinite_reverse]"></div>
           <div className="absolute w-[45%] h-[45%] rounded-full border border-blue-300/40"></div>
           <div className="absolute w-[20%] h-[20%] rounded-full border border-blue-300/50 bg-blue-500/20"></div>

           {/* Grid Lines */}
           <div className="absolute w-full h-[1px] bg-blue-400/30"></div>
           <div className="absolute h-full w-[1px] bg-blue-400/30"></div>

           {/* Scanning Sweep (Conic Gradient) */}
           <div className="absolute w-full h-full rounded-full animate-[spin_3s_linear_infinite]">
              <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(59,130,246,0.5)_360deg)]"></div>
           </div>

           {/* Projected Drone Shadow on Floor */}
           <div className="absolute w-16 h-16 bg-black/30 blur-sm rounded-full animate-pulse transform translate-y-6 scale-x-110"></div>
           
           {/* Detected Threats (Blips on Radar) */}
           <div className="absolute top-[30%] left-[30%] w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_#ef4444]"></div>
           <div className="absolute bottom-[25%] right-[30%] w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-700 shadow-[0_0_5px_#eab308]"></div>
        </div>


        {/* --- DRONE MODEL (Floating) --- */}
        <div className="absolute top-[15%] md:top-[20%] left-1/2 -translate-x-1/2 w-52 h-52 z-20 animate-hover-drone transform-style-3d">
            {/* SVG Drone Structure (ViewBox kept at 300x300, letting container size it down) */}
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible drop-shadow-lg">
                <defs>
                   <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f1f5f9" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#64748b" />
                   </linearGradient>
                   <linearGradient id="armGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#475569" />
                   </linearGradient>
                   <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" /> {/* Reduced blur stdDeviation */}
                      <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                      </feMerge>
                   </filter>
                </defs>

                {/* Rotors and Body are scaled down implicitly by the w-52 h-52 container */}

                {/* --- Rotors (Behind) --- */}
                {/* Back Left */}
                <g transform="translate(60, 80)">
                   <circle cx="0" cy="0" r="30" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.08s_linear_infinite]" />
                   <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.08s_linear_infinite]" />
                   <line x1="0" y1="-25" x2="0" y2="25" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.08s_linear_infinite] delay-75" />
                </g>
                 {/* Back Right */}
                <g transform="translate(240, 80)">
                   <circle cx="0" cy="0" r="30" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.1s_linear_infinite]" />
                   <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.1s_linear_infinite]" />
                   <line x1="0" y1="-25" x2="0" y2="25" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.1s_linear_infinite] delay-75" />
                </g>

                {/* --- Arms --- (No change needed, scaled by container) */}
                <path d="M150 150 L60 80" stroke="url(#armGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M150 150 L240 80" stroke="url(#armGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M150 150 L60 220" stroke="url(#armGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M150 150 L240 220" stroke="url(#armGrad)" strokeWidth="5" strokeLinecap="round" />

                {/* --- Main Body --- */}
                <ellipse cx="150" cy="150" rx="30" ry="40" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="2" />
                {/* Cockpit / Top Cover */}
                <ellipse cx="150" cy="145" rx="20" ry="25" fill="#1e293b" />
                {/* LED Status Light */}
                <circle cx="150" cy="140" r="3" fill="#00ff66" filter="url(#neon-glow)" className="animate-pulse" /> {/* Reduced size */}
                
                {/* --- Rotors (Front) --- */}
                {/* Front Left */}
                <g transform="translate(60, 220)">
                   <circle cx="0" cy="0" r="30" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.08s_linear_infinite]" />
                   <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.08s_linear_infinite]" />
                </g>
                {/* Front Right */}
                <g transform="translate(240, 220)">
                   <circle cx="0" cy="0" r="30" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.1s_linear_infinite]" />
                   <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.1s_linear_infinite]" />
                </g>

                {/* --- Camera Gimbal (Bottom) --- */}
                <path d="M140 170 L140 185 L160 185 L160 170" fill="none" stroke="#334155" strokeWidth="2" />
                <circle cx="150" cy="185" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="150" cy="185" r="2" fill="#3b82f6" className="animate-pulse" />

                {/* Scanning Laser Cone from Camera */}
                <path d="M150 190 L125 270 L175 270 Z" fill="url(#laserGrad)" opacity="0.4" className="animate-pulse" /> {/* Adjusted path */}
                <defs>
                   <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                   </linearGradient>
                </defs>
            </svg>
        </div>

        {/* --- HUD OVERLAY (Floating Elements) --- */}
        {/* Top Left: Connection */}
        <div className="absolute top-[10%] left-[-20%] md:left-[-15%] p-1.5 rounded border-l border-blue-500 bg-slate-900/90 backdrop-blur-sm text-[9px] text-blue-200 shadow-lg animate-float-delayed z-30">
           <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_4px_#22c55e]"></div>
              <span className="font-bold tracking-wide">LINK_ESTABLISHED</span>
           </div>
           <div className="text-slate-400 font-mono text-[8px]">CH: 5.8GHz / 14ms</div>
           <div className="mt-0.5 h-1 w-20 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${signal}%`, transition: 'width 0.5s' }}></div>
           </div>
        </div>

        {/* Top Right: Altitude & Speed */}
        <div className="absolute top-[15%] right-[-20%] md:right-[-15%] p-1.5 rounded border-r border-blue-500 bg-slate-900/90 backdrop-blur-sm text-[9px] text-blue-200 shadow-lg animate-float text-right z-30">
           <div className="font-bold mb-0.5 tracking-wide text-blue-400">TELEMETRY</div>
           <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-mono text-[9px]">
              <span className="text-slate-400">ALT</span>
              <span className="text-white">{altitude.toFixed(1)}m</span>
              <span className="text-slate-400">SPD</span>
              <span className="text-white">0.0 m/s</span>
              <span className="text-slate-400">BAT</span>
              <span className={`${battery < 20 ? 'text-red-500' : 'text-green-400'}`}>{battery}%</span>
           </div>
        </div>

        {/* Bottom Center: Target Lock */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse z-20">
           <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
           <div className="px-1.5 py-0.5 bg-red-950/80 border border-red-500/30 text-[7px] text-red-200 mt-0.5 rounded tracking-[0.1em] uppercase font-bold">
              Perimeter Secure
           </div>
        </div>

      </div>
    </div>
  );
};

export default HologramRadar;