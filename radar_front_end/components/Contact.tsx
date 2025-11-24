import React, { useState } from 'react';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { CONTACT_SECTION_DETAILS } from '../constants'; // Assumed to be imported

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Basic Validation
    if (!data.email || !data.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setFormState('submitting');
    setErrorMessage('');

    try {
        // 💡 Backend Integration: Target your Node.js/Express endpoint
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setFormState('success');
            e.currentTarget.reset(); // Reset the form fields on success
        } else {
            // Attempt to read server error message
            let errorText = 'Server failed to send message.';
            try {
                const errorData = await response.json();
                errorText = errorData.message || errorText;
            } catch {
                // If JSON parsing fails, use generic error
            }
            setFormState('error');
            setErrorMessage(errorText);
        }
    } catch (err) {
        setFormState('error');
        setErrorMessage('Failed to connect to the server. Please check your connection (Node.js/Express server running on port 5000?).');
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-white relative scroll-mt-28">
       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-50 skew-y-2 transform origin-bottom-left z-0"></div>
       
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Info */}
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 rounded-md">
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to secure your infrastructure?</h2>
            <p className="text-base text-slate-500 mb-10">
              Reach out for a consultation regarding Drone Security, IoT Protection, or ISO Compliance. Our team responds within 2 hours.
            </p>

            <div className="space-y-8">
              {/* Dynamically mapped from constants */}
              {(CONTACT_SECTION_DETAILS as any[]).map((office, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="p-3 bg-blue-50 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-sm">{office.title}</h3>
                    <div className="text-slate-500 text-xs leading-relaxed">
                      {office.lines.map((line: string, i: number) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xl">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500">We've received your inquiry and will be in touch shortly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">First Name *</label>
                    <input id="firstName" name="firstName" required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                    <input id="lastName" name="lastName" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Work Email *</label>
                  <input id="email" name="email" required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="john@company.com" />
                </div>

                <div className="space-y-1">
                  <label htmlFor="interest" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interest</label>
                  <select id="interest" name="interest" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-700 text-sm">
                    <option>Drone Defense Systems</option>
                    <option>IoT Security Audit</option>
                    <option>ISO 27001 Consultation</option>
                    <option>SOC Services</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Message *</label>
                  <textarea id="message" name="message" required rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm" placeholder="Project details..."></textarea>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full py-3 bg-slate-900 hover:bg-primary text-white font-bold rounded-xl shadow-lg shadow-slate-400/20 transition-all disabled:opacity-70 flex items-center justify-center text-sm"
                >
                  {formState === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : 'Send Inquiry'}
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