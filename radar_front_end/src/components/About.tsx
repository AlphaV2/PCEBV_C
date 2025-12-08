import React from 'react';
import { Target, ShieldCheck, Globe, Loader2 } from 'lucide-react';
// Assuming these are imported from your central constants file
import { ABOUT_SECTION_CONTENT } from "../../constants";

// Define the Founder type based on the SQL table
interface Founder {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    linkedin_url: string | null;
}

// --- STATIC FOUNDER DATA (UPDATED) ---
const STATIC_FOUNDER: Founder = { 
    id: 1, 
    name: "Jaykumar Vishnu Choudhary", 
    role: "Founder & Cyber Forensics Specialist", 
    image_url: "/founderprofile/founder_image.jpeg", 
    bio: "A leading Cyber Forensics Specialist and Technocrat with 19+ years of experience spearheading global security programs. Expert in designing Enterprise Security Architectures, pioneering new cryptography algorithms, and ensuring regulatory compliance (ISO 27001, PCI DSS, SOX).", 
    // 🚨 Ensure you replace this placeholder with the actual link 🚨
    linkedin_url: "https://www.linkedin.com/in/jaykumarchoudhary/?originalSubdomain=in", 
};

const MOCK_ABOUT_SECTION_CONTENT = ABOUT_SECTION_CONTENT || [
    "Our mission focuses on creating a smarter and safer world. We firmly believe in trusting partners and are committed to solving our customers' and stakeholders' most critical challenges.",
    "We are a startup dedicated to enhanced/next generation Security solutions and innovations in the space of Cyber Security, Internet of Things (IoT), and AI-powered Drone development.",
    "We also provide specialized Information Security Consultancy Services for regulated industries, ensuring compliance, auditing, and implementation is handled efficiently.",
];
// --- END STATIC FALLBACK DATA ---


const About: React.FC = () => {
    // 🚨 Using static data as the dynamic fetching is postponed 🚨
    const founder = STATIC_FOUNDER;
    const member = founder;
    const loading = false; 

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/150?text=Team';
    };

    if (loading || !founder) {
        // Fallback loader if ever used dynamically later
        return (
            <section id="about" className="py-10 md:py-12 bg-white text-center min-h-[300px] flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </section>
        );
    }
    
    return (
        <section id="about" className="py-10 md:py-12 bg-white text-slate-700 relative overflow-hidden scroll-mt-28"> 
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/70 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"> 
                    
                    {/* Left: Mission Text & Values */}
                    <div>
                        <div className="inline-block px-2 py-0.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-md border border-blue-100"> 
                            Our Mission
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold mb-5 leading-tight text-slate-900"> 
                            Working for a <br/><span className="text-blue-600">Smarter & Safer</span> World.
                        </h2>
                        <div className="space-y-0.5 text-slate-700 text-sm leading-normal font-medium"> 
                            {MOCK_ABOUT_SECTION_CONTENT.map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Values Boxes - Compact */}
                        <div className="mt-6 grid grid-cols-3 gap-3"> 
                            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"> 
                                <Target className="text-blue-600 mb-1" size={14} /> 
                                <h4 className="font-bold text-slate-900 text-[11px]">Precision</h4> 
                            </div>
                            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <ShieldCheck className="text-blue-600 mb-1" size={14} />
                                <h4 className="font-bold text-slate-900 text-[11px]">Compliance</h4>
                            </div>
                            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <Globe className="text-blue-600 mb-1" size={14} />
                                <h4 className="font-bold text-slate-900 text-[11px]">Global Scale</h4>
                            </div>
                        </div>
                    </div>

                    {/* Right: Founder Profile Card (Sticky on Large Screens) */}
                    <div className="lg:sticky top-20"> 
                        {/* Decorative Card Background */}
                        <div className="absolute inset-0 bg-blue-600/10 rounded-2xl transform rotate-3 scale-105 shadow-xl"></div>
                        
                        {/* Main Card Content - Compact */}
                        <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-2xl"> 
                            <h3 className="text-lg font-bold mb-4 text-slate-900">Leadership Vision</h3>
                            
                            <div key={member.id}>
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                                    <img 
                                        src={member.image_url} 
                                        alt={member.name} 
                                        className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md"
                                        onError={handleImageError}
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3> 
                                        <p className="text-blue-600 font-bold text-xs tracking-wide mt-0.5">{member.role}</p>
                                    </div>
                                </div>
                                
                                <p className="text-slate-700 leading-snug italic mb-3 text-xs font-medium border-l-3 border-blue-100 pl-3 py-1">
                                    Vision: "{member.bio}"
                                </p>
                                
                                <p className="text-xs text-slate-600"> 
                                    Expertise Highlights: SIEM Architecture, VAPT, LA ISO 27001 Implementation, Business Continuity Management, and Enterprise Security Architecture.
                                </p>
                                
                                {/* 🚨 GLOWING BUTTON FIX APPLIED HERE 🚨 */}
                                <a 
                                    href={member.linkedin_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 pt-4 border-t border-slate-100 flex justify-center items-center gap-2 cursor-pointer transition-all relative group/link"
                                >
                                    {/* Neon Glow Effect Container */}
                                    <span className="absolute inset-0 bg-blue-600/5 transition-opacity duration-300 opacity-0 group-hover/link:opacity-100 rounded-full blur-sm"></span>

                                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest relative z-10 transition-colors group-hover/link:text-blue-700">
                                        Connect with Leadership
                                    </span>
                                    {/* LinkedIn Logo */}
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                                        className={`w-5 h-5 relative z-10 transition-all ${member.linkedin_url ? 'grayscale-0 opacity-80 group-hover/link:opacity-100 group-hover/link:scale-105' : 'grayscale opacity-30 cursor-default'}`} 
                                        alt="LinkedIn" 
                                        onError={handleImageError} 
                                    />
                                </a>
                                {/* END GLOWING BUTTON */}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;