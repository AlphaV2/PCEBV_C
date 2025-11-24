import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">R</div>
              <span className="text-white font-bold text-lg">RadarSniper</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Pioneering the future of aerial security and IoT resilience. We empower enterprises to operate safely in an interconnected world.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-slate-800 rounded hover:bg-primary transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-slate-800 rounded hover:bg-primary transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-slate-800 rounded hover:bg-primary transition-colors cursor-pointer"></div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Drone Defense</li>
              <li className="hover:text-white cursor-pointer transition-colors">IoT Security</li>
              <li className="hover:text-white cursor-pointer transition-colors">SOC Operations</li>
              <li className="hover:text-white cursor-pointer transition-colors">ISO Compliance</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Case Studies</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; 2024 Radar Sniper Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;