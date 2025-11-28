import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800"> {/* Reduced vertical padding */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"> {/* Reduced grid gap and bottom margin */}
          
          {/* Column 1: Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-3"> {/* Reduced bottom margin */}
             <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">R</div> {/* Reduced size and used primary color */}
               <span className="text-white font-bold text-base">RadarSniper</span> {/* Reduced font size */}
            </div>
            <p className="text-xs leading-snug max-w-xs mb-4"> {/* Reduced font size, leading, and bottom margin */}
              Pioneering the future of aerial security and IoT resilience. We empower enterprises to operate safely in an interconnected world.
            </p>
            <div className="flex gap-3"> {/* Reduced gap */}
              {/* Social placeholders (using smaller 6x6 size) */}
              <div className="w-6 h-6 bg-slate-800 rounded hover:bg-blue-600 transition-colors cursor-pointer"></div>
              <div className="w-6 h-6 bg-slate-800 rounded hover:bg-blue-600 transition-colors cursor-pointer"></div>
              <div className="w-6 h-6 bg-slate-800 rounded hover:bg-blue-600 transition-colors cursor-pointer"></div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Solutions</h4> {/* Reduced font size and bottom margin */}
            <ul className="space-y-1.5 text-xs"> {/* Reduced vertical spacing and font size */}
              <li className="hover:text-white cursor-pointer transition-colors">Drone Defense</li>
              <li className="hover:text-white cursor-pointer transition-colors">IoT Security</li>
              <li className="hover:text-white cursor-pointer transition-colors">SOC Operations</li>
              <li className="hover:text-white cursor-pointer transition-colors">ISO Compliance</li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4> {/* Reduced font size and bottom margin */}
            <ul className="space-y-1.5 text-xs"> {/* Reduced vertical spacing and font size */}
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Case Studies</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800 pt-5 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium"> {/* Reduced top padding and font size */}
          <p>&copy; 2024 Radar Sniper Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0"> {/* Reduced gap and margin */}
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;