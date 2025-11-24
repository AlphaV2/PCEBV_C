import React from 'react';

const RadarAnimation: React.FC = () => {
  return (
    <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center opacity-60 pointer-events-none select-none">
      {/* Concentric circles */}
      <div className="absolute border border-blue-200/30 rounded-full w-full h-full"></div>
      <div className="absolute border border-blue-300/30 rounded-full w-[75%] h-[75%]"></div>
      <div className="absolute border border-blue-400/30 rounded-full w-[50%] h-[50%]"></div>
      <div className="absolute border border-blue-500/30 rounded-full w-[25%] h-[25%]"></div>
      
      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-blue-300/20"></div>
      <div className="absolute h-full w-[1px] bg-blue-300/20"></div>

      {/* Scanning Sweep */}
      <div className="absolute w-full h-full rounded-full animate-radar-sweep overflow-hidden">
        <div className="w-1/2 h-1/2 bg-gradient-to-br from-blue-500/0 to-blue-400/20 absolute top-0 left-1/2 origin-bottom-left transform skew-x-12"></div>
        <div className="w-full h-full radar-gradient rounded-full"></div>
      </div>

      {/* Blips */}
      <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
      <div className="absolute bottom-[30%] right-[25%] w-2 h-2 bg-green-500 rounded-full animate-pulse delay-700 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
      <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-300 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
    </div>
  );
};

export default RadarAnimation;