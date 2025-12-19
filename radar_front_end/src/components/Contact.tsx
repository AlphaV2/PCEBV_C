import React, { useState } from "react";
import { 
  MapPin, CheckCircle2, MessageCircle, 
  Mail, Briefcase, ShieldAlert, Copy 
} from "lucide-react";
// Ensure these are exported from your constants file
import { CONTACT_OFFICES, CONTACT_EMAILS, WHATSAPP_NUMBER } from "../../constants"; 

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<"idle" | "success">("idle");

  // --- Helper: Get Strategic Icons ---
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase size={18} />;
      case 'shield': return <ShieldAlert size={18} />;
      default: return <Mail size={18} />;
    }
  };

  const handleCopy = (e: React.MouseEvent, email: string) => {
    e.preventDefault(); 
    navigator.clipboard.writeText(email);
    // Optional: Add a small toast notification here if you have one
    alert(`Copied: ${email}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const inquiryType = formData.get("inquiryType") as string; // Get dropdown value
    const message = formData.get("message") as string;

    if (!name || !email || !message || !inquiryType) {
      alert("Please fill in all required fields.");
      return;
    }

    const whatsappMessage = 
`*New Website Inquiry* 🚀
👤 *Name:* ${name}
📧 *Email:* ${email}
📌 *Topic:* ${inquiryType}
📝 *Message:* ${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    setFormState("success");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-16 bg-white relative scroll-mt-20 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT COLUMN: STRATEGIC COMMUNICATION CHANNELS --- */}
          <div>
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                  Start the Conversation.
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Select the right channel below for faster resolution, or use the quick form.
                </p>
            </div>

            {/* 🚨 STRATEGIC EMAIL GRID 🚨 */}
            <div className="mb-10">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Departments
                </h3>
                
                <div className="flex flex-col gap-3">
                    {/* Render Email Cards */}
                    {(CONTACT_EMAILS as any[]).map((contact, idx) => (
                        <div 
                           key={idx} 
                           className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                             ${contact.role.includes('Director') 
                                ? 'bg-amber-50/50 border-amber-100 hover:border-amber-300 hover:shadow-md' // Director Style
                                : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md' // Standard Style
                             }
                           `}
                        >
                            {/* Icon Box */}
                            <div className={`shrink-0 p-3 rounded-lg flex items-center justify-center
                                ${contact.role.includes('Director') ? 'bg-amber-100 text-amber-700' : 
                                  contact.role.includes('HR') ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}
                            `}>
                                {getIcon(contact.icon)}
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 min-w-0">
                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                                   ${contact.role.includes('Director') ? 'text-amber-600' : 'text-slate-400'}
                                `}>
                                    {contact.role}
                                </p>
                                <a href={`mailto:${contact.email}`} className="block text-base font-bold text-slate-900 truncate hover:underline decoration-slate-300 underline-offset-4">
                                    {contact.email}
                                </a>
                                <p className="text-xs text-slate-500 mt-0.5">{contact.desc}</p>
                            </div>

                            {/* Action Button */}
                            <button 
                                onClick={(e) => handleCopy(e, contact.email)}
                                className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Copy Email Address"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* PHYSICAL OFFICES (Secondary Priority) */}
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                Global Headquarters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(CONTACT_OFFICES as any[]).map((office, idx) => (
                    <div key={idx} className="flex gap-3">
                        <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{office.title}</h4>
                            {office.lines.map((line: string, i: number) => (
                                <p key={i} className="text-xs text-slate-500 leading-relaxed">{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM (Unchanged Logic) --- */}
          <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 h-fit">
            {formState === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Opened in WhatsApp!</h3>
                <button onClick={() => setFormState("idle")} className="mt-4 text-blue-600 text-sm font-bold hover:underline">Send another</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h3 className="font-bold text-slate-900 mb-4">Quick Enquiry</h3>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your Name</label>
                  <input name="name" required type="text" className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                  <input name="email" required type="email" className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors" placeholder="john@company.com" />
                </div>
                
                {/* 🚨 NEW: DROPDOWN MENU FOR INQUIRY TYPE 🚨 */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">I'm interested in...</label>
                  <div className="relative">
                    <select 
                        name="inquiryType" 
                        required 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                        defaultValue=""
                    >
                        <option value="" disabled hidden>Select a topic</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Product Support">Product Support</option>
                        <option value="Sales & Quotes">Sales & Quotes</option>
                        <option value="Partnership">Partnership Opportunities</option>
                        <option value="Careers">Careers</option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Message</label>
                  <textarea name="message" required className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors h-28 resize-none" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                    <MessageCircle size={18} /> Chat via WhatsApp
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;