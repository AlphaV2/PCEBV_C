import React from 'react';
import { Target, ShieldCheck, Globe, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTranslatedAbout, useTranslatedTeam } from '../hooks/useTranslatedData';

interface Founder {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    linkedin_url: string | null;
}

const STATIC_FOUNDER: Founder = {
    id: 1,
    name: "Jaykumar Vishnu Choudhary",
    role: "Founder",
    image_url: "/founderprofile/founder_image.jpeg",
    bio: 'A visionary Technocrat revolutionizing the skies with AI-driven Drones for Agriculture, Land Mapping, and Cross-Pollination. With 19+ years of experience in Global Security Strategy, Jaykumar integrates military-grade Cybersecurity into autonomous aerial systems, ensuring that our drone solutions are not only efficient but secure by design.',
    linkedin_url: "https://www.linkedin.com/in/jaykumarchoudhary/?originalSubdomain=in",
};

const About: React.FC = () => {
    const { t } = useTranslation();
    const aboutParagraphs = useTranslatedAbout(); // ✅ replaces MOCK_ABOUT_SECTION_CONTENT
    const translatedTeam = useTranslatedTeam();
    const translatedFounder = translatedTeam.find((entry) => entry.id === 'founder');

    const founder = STATIC_FOUNDER;
    const member: Founder = {
        ...founder,
        role: translatedFounder?.role || founder.role,
        bio: translatedFounder?.bio || founder.bio,
    };
    const loading = false;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/150?text=Team';
    };

    if (loading || !founder) {
        return (
            <section id="about" className="py-10 md:py-12 bg-white text-center min-h-[300px] flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </section>
        );
    }

    return (
        <section id="about" className="py-10 md:py-12 bg-white text-slate-700 relative overflow-hidden scroll-mt-28">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/70 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* Left: Mission Text & Values */}
                    <div>
                        <div className="inline-block px-2 py-0.5 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-md border border-blue-100">
                            {t('about.badge', 'Our Mission')}
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold mb-5 leading-tight text-slate-900">
                            {t('about.headingLine1', 'Working for a')}{' '}
                            <br/>
                            <span className="text-blue-600">{t('about.headingLine2', 'Smarter & Safer')}</span>{' '}
                            {t('about.headingLine3', 'World.')}
                        </h2>

                        {/* ✅ Translated paragraphs via hook */}
                        <div className="space-y-0.5 text-slate-700 text-sm leading-normal font-medium">
                            {aboutParagraphs.map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Values Boxes */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <Target className="text-blue-600 mb-1" size={14} />
                                <h4 className="font-bold text-slate-900 text-[11px]">
                                    {t('about.values.precision', 'Precision')}
                                </h4>
                            </div>
                            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <ShieldCheck className="text-blue-600 mb-1" size={14} />
                                <h4 className="font-bold text-slate-900 text-[11px]">
                                    {t('about.values.compliance', 'Compliance')}
                                </h4>
                            </div>
                            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <Globe className="text-blue-600 mb-1" size={14} />
                                <h4 className="font-bold text-slate-900 text-[11px]">
                                    {t('about.values.globalScale', 'Global Scale')}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Right: Founder Profile Card */}
                    <div className="lg:sticky top-20">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-2xl transform rotate-3 scale-105 shadow-xl"></div>
                        <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-2xl">
                            <h3 className="text-lg font-bold mb-4 text-slate-900">
                                {t('about.leadershipVision', 'Leadership Vision')}
                            </h3>

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
                                        <p className="text-blue-600 font-bold text-xs tracking-wide mt-0.5">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-700 leading-snug italic mb-3 text-xs font-medium border-l-3 border-blue-100 pl-3 py-1">
                                    {t('about.visionLabel', 'Vision')}: "{member.bio}"
                                </p>

                                <p className="text-xs text-slate-600">
                                    {t('about.expertiseLabel', 'Expertise Highlights')}: {t('about.expertise', 'SIEM Architecture, VAPT, LA ISO 27001 Implementation, Business Continuity Management, and Enterprise Security Architecture.')}
                                </p>

                                <a
                                    href={member.linkedin_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 pt-4 border-t border-slate-100 flex justify-center items-center gap-2 cursor-pointer transition-all relative group/link"
                                >
                                    <span className="absolute inset-0 bg-blue-600/5 transition-opacity duration-300 opacity-0 group-hover/link:opacity-100 rounded-full blur-sm"></span>
                                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest relative z-10 transition-colors group-hover/link:text-blue-700">
                                        {t('about.connectCta', 'Connect with Leadership')}
                                    </span>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                        className={`w-5 h-5 relative z-10 transition-all ${member.linkedin_url ? 'grayscale-0 opacity-80 group-hover/link:opacity-100 group-hover/link:scale-105' : 'grayscale opacity-30 cursor-default'}`}
                                        alt="LinkedIn"
                                        onError={handleImageError}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;