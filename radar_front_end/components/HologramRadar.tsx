
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
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] perspective-1000 select-none pointer-events-none font-mono">
      
      {/* 3D Scene Container */}
      <div className="w-full h-full relative transform-style-3d group">
        
        {/* --- TACTICAL FLOOR RADAR (Rotated Plane) --- */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rotate-x-60 transform-style-3d flex items-center justify-center opacity-90">
           {/* Base Glow */}
           <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
           
           {/* Outer Ring */}
           <div className="absolute w-full h-full rounded-full border-[2px] border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.1)_100%)]"></div>
           
           {/* Inner Rings */}
           <div className="absolute w-[75%] h-[75%] rounded-full border border-blue-400/40 border-dashed animate-[spin_10s_linear_infinite_reverse]"></div>
           <div className="absolute w-[50%] h-[50%] rounded-full border border-blue-300/40"></div>
           <div className="absolute w-[25%] h-[25%] rounded-full border border-blue-300/50 bg-blue-500/20"></div>

           {/* Grid Lines */}
           <div className="absolute w-full h-[1px] bg-blue-400/30"></div>
           <div className="absolute h-full w-[1px] bg-blue-400/30"></div>

           {/* Scanning Sweep (Conic Gradient) */}
           <div className="absolute w-full h-full rounded-full animate-[spin_3s_linear_infinite]">
              <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(59,130,246,0.5)_360deg)]"></div>
           </div>

           {/* Projected Drone Shadow on Floor */}
           <div className="absolute w-24 h-24 bg-black/30 blur-md rounded-full animate-pulse transform translate-y-8 scale-x-110"></div>
           
           {/* Detected Threats (Blips on Radar) */}
           <div className="absolute top-[30%] left-[30%] w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></div>
           <div className="absolute bottom-[20%] right-[30%] w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-700 shadow-[0_0_8px_#eab308]"></div>
        </div>


        {/* --- DRONE MODEL (Floating) --- */}
        <div className="absolute top-[15%] md:top-[20%] left-1/2 -translate-x-1/2 w-64 h-64 z-20 animate-hover-drone transform-style-3d">
            {/* SVG Drone Structure */}
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible drop-shadow-2xl">
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
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                      <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                      </feMerge>
                   </filter>
                </defs>

                {/* --- Rotors (Behind) --- */}
                {/* Back Left */}
                <g transform="translate(60, 80)">
                   <circle cx="0" cy="0" r="35" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.08s_linear_infinite]" />
                   <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.08s_linear_infinite]" />
                   <line x1="0" y1="-30" x2="0" y2="30" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.08s_linear_infinite] delay-75" />
                </g>
                 {/* Back Right */}
                <g transform="translate(240, 80)">
                   <circle cx="0" cy="0" r="35" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.1s_linear_infinite]" />
                   <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.1s_linear_infinite]" />
                   <line x1="0" y1="-30" x2="0" y2="30" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.1s_linear_infinite] delay-75" />
                </g>

                {/* --- Arms --- */}
                {/* Cross X Frame */}
                <path d="M150 150 L60 80" stroke="url(#armGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M150 150 L240 80" stroke="url(#armGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M150 150 L60 220" stroke="url(#armGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M150 150 L240 220" stroke="url(#armGrad)" strokeWidth="6" strokeLinecap="round" />

                {/* --- Main Body --- */}
                <ellipse cx="150" cy="150" rx="30" ry="40" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="2" />
                {/* Cockpit / Top Cover */}
                <ellipse cx="150" cy="145" rx="20" ry="25" fill="#1e293b" />
                {/* LED Status Light */}
                <circle cx="150" cy="140" r="4" fill="#00ff66" filter="url(#neon-glow)" className="animate-pulse" />
                
                {/* --- Rotors (Front - Rendered after arms for depth) --- */}
                {/* Front Left */}
                <g transform="translate(60, 220)">
                   <circle cx="0" cy="0" r="35" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.08s_linear_infinite]" />
                   <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.08s_linear_infinite]" />
                </g>
                {/* Front Right */}
                <g transform="translate(240, 220)">
                   <circle cx="0" cy="0" r="35" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" className="animate-[spin_0.1s_linear_infinite]" />
                   <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(59,130,246,0.7)" strokeWidth="2" className="animate-[spin_0.1s_linear_infinite]" />
                </g>

                {/* --- Camera Gimbal (Bottom) --- */}
                <path d="M140 170 L140 185 L160 185 L160 170" fill="none" stroke="#334155" strokeWidth="3" />
                <circle cx="150" cy="185" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="150" cy="185" r="3" fill="#3b82f6" className="animate-pulse" />

                {/* Scanning Laser Cone from Camera */}
                <path d="M150 190 L120 280 L180 280 Z" fill="url(#laserGrad)" opacity="0.4" className="animate-pulse" />
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
        <div className="absolute top-[10%] left-[-15%] md:left-[-15%] p-2 rounded border-l-2 border-blue-500 bg-slate-900/90 backdrop-blur-sm text-[10px] text-blue-200 shadow-xl animate-float-delayed z-30">
           <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
              <span className="font-bold tracking-wider">LINK_ESTABLISHED</span>
           </div>
           <div className="text-slate-400 font-mono text-[9px]">CH: 5.8GHz / 14ms</div>
           <div className="mt-1 h-1 w-24 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${signal}%`, transition: 'width 0.5s' }}></div>
           </div>
        </div>

        {/* Top Right: Altitude & Speed */}
        <div className="absolute top-[15%] right-[-15%] md:right-[-15%] p-2 rounded border-r-2 border-blue-500 bg-slate-900/90 backdrop-blur-sm text-[10px] text-blue-200 shadow-xl animate-float text-right z-30">
           <div className="font-bold mb-1 tracking-wider text-blue-400">TELEMETRY</div>
           <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono">
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
           <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
           <div className="px-2 py-0.5 bg-red-950/80 border border-red-500/30 text-[8px] text-red-200 mt-1 rounded tracking-[0.2em] uppercase font-bold">
              Perimeter Secure
           </div>
        </div>

      </div>
    </div>
  );
};

export default HologramRadar;
