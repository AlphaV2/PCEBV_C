import React from 'react';
import { Linkedin, Twitter, Instagram, Activity, Facebook } from 'lucide-react';
// 🚨 CENTRALIZATION: Import data from constants 🚨
import { SERVICES, NAV_LINKS, SOCIAL_LINKS, BRAND } from '../../constants'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* --- Column 1 & 2: Brand Info (Spans 2 columns) --- */}
          <div className="col-span-1 md:col-span-2">
             
             {/* Logo Section */}
             <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <img 
                  // 🚨 FIX: Path must start with / and be relative to the public folder
                  // If your file is in public/logo/company_logo.jpg, use this:
                  src="/logo/company_logo.jpg" 
                  alt="Radar Snipers" 
                  className="w-auto h-8 object-contain rounded" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback Icon */}
                <div className="fallback-icon hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Activity size={18} />
                </div>
                <span className="text-white font-bold text-base tracking-tight">RADAR SNIPER</span>
             </div>

            <p className="leading-relaxed max-w-sm mb-5 text-slate-400">
              Pioneering the future of aerial security and IoT resilience. We empower enterprises to operate safely in an interconnected world through AI-driven defense systems.
            </p>
            
            {/* Clickable Social Icons (Linked to constants.ts) */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.linkedin && (
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                  <Linkedin size={14} />
                </a>
              )}
              {SOCIAL_LINKS.twitter && (
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all duration-300">
                  <Twitter size={14} />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300">
                  <Instagram size={14} />
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300">
                  <Facebook size={14} />
                </a>
              )}
            </div>
          </div>

          {/* --- Column 3: Solutions (Dynamic from Constants) --- */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a 
                    href="#services" 
                    className="hover:text-blue-400 transition-colors duration-200 block"
                  >
                    {service.shortTitle || service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: Company (Dynamic from Constants) --- */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors duration-200 block">
                    Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- Copyright Bar --- */}
        <div className="border-t border-slate-800 pt-5 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} Radar Snipers (OPC) Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;