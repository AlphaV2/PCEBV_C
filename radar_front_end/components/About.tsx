import React from 'react';
import { Target, ShieldCheck, Globe } from 'lucide-react';
// Assuming these are imported from your central constants file
import { TEAM, ABOUT_SECTION_CONTENT } from '../constants'; 

// --- MOCK DATA (Use actual imported data from TEAM and ABOUT_SECTION_CONTENT) ---
const MOCK_TEAM = (TEAM && TEAM.length > 0) ? [TEAM[0]] : [{ 
    id: 1, 
    name: "Founder Name Placeholder", 
    role: "Founder & Chief Security Officer", 
    image: "https://placehold.co/150x150/2563eb/ffffff?text=Founder",
    bio: "A highly experienced professional with immense expertise in the security domain. The founder spearheads all development activities and global strategy.", 
}];

const MOCK_ABOUT_SECTION_CONTENT = ABOUT_SECTION_CONTENT || [
  "Our mission focuses on creating a smarter and safer world. We firmly believe in trusting partners and are committed to solving our customers' and stakeholders' most critical challenges.",
  "We are a startup dedicated to enhanced/next generation Security solutions and innovations in the space of Cyber Security, Internet of Things (IoT), and AI-powered Drone development.",
  "We also provide specialized Information Security Consultancy Services for regulated industries, ensuring compliance, auditing, and implementation is handled efficiently.",
];
// --- END MOCK DATA ---


const About: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/150?text=Team';
  };

  return (
    <section id="about" className="py-12 md:py-16 bg-white text-slate-900 relative overflow-hidden scroll-mt-28">
       {/* Decorative background element */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/70 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Mission Text & Values */}
          <div>
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 rounded-md border border-blue-100">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-slate-900">
              Working for a <br/><span className="text-primary">Smarter & Safer</span> World.
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed font-medium">
              {MOCK_ABOUT_SECTION_CONTENT.map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Target className="text-primary mb-2" size={20} />
                <h4 className="font-bold text-slate-900 text-sm">Precision</h4>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <ShieldCheck className="text-primary mb-2" size={20} />
                <h4 className="font-bold text-slate-900 text-sm">Compliance</h4>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Globe className="text-primary mb-2" size={20} />
                <h4 className="font-bold text-slate-900 text-sm">Global Scale</h4>
              </div>
            </div>
          </div>

          {/* Right: Founder Profile Card (Sticky on Large Screens) */}
          <div className="lg:sticky top-24">
             {/* Decorative Card Background */}
             <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3 scale-105 shadow-xl"></div>
             
             <div className="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Leadership Vision</h3>
                {MOCK_TEAM.map((member) => (
                  <div key={member.id}>
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        onError={handleImageError}
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                        <p className="text-primary font-bold text-sm tracking-wide mt-1">{member.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 leading-relaxed italic mb-4 text-sm font-medium border-l-4 border-blue-100 pl-4 py-1">
                      **Vision:** "{member.bio}"
                    </p>
                    
                    <p className="text-sm text-slate-600">
                      Responsible for **Global Security Strategy**, Enterprise Security Architecture, and technology operations across all divisions.
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect with Leadership</span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer opacity-70 transition-all" alt="LinkedIn" onError={handleImageError} />
                    </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default About;