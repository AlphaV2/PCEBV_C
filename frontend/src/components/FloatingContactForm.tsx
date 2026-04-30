import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const BRAND_BLUE = HOMEPAGE_CONFIG.colors.primary_blue;
const BRAND_ORANGE = HOMEPAGE_CONFIG.colors.accent_orange;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const FloatingContactForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.name && formData.email && formData.phone) {
        const message = `Hello! I'm interested in your services.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Interest: ${formData.service || 'General Inquiry'}
Message: ${formData.message}`;

        const whatsappUrl = `https://wa.me/31611596812?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setStep(1);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 2;

  return (
    <>
     <button
  onClick={() => setIsOpen(!isOpen)}
  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 
  w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] md:w-[88px] md:h-[88px] 
  rounded-full overflow-hidden 
  shadow-[0_8px_25px_rgba(0,0,0,0.25)] 
  hover:scale-110 hover:shadow-[0_14px_35px_rgba(0,0,0,0.35)] 
  transition-all duration-300"
  aria-label="Open contact form"
>
  <img
    src="/logo/chatbot.jpg"
    alt="Chatbot Icon"
    className="w-full h-full object-cover scale-[1.6]"
  />
</button>

      {/* Panel */}
      <div
        className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[90vw] sm:w-96 max-h-[65vh] overflow-y-auto rounded-2xl shadow-2xl transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl text-white"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          <h3 className="font-bold text-base sm:text-lg">Quick Inquiry</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        {isOpen && !submitted && (
          <div className="w-full bg-slate-200 h-2">
            <div
              className="h-2 rounded-r-lg"
              style={{
                width: `${(step / totalSteps) * 100}%`,
                backgroundColor: BRAND_ORANGE,
              }}
            />
          </div>
        )}

        {/* Content */}
        {submitted ? (
          <div className="p-6 text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Send size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Message Sent!</h4>
            <p className="text-sm text-slate-600">We'll get back to you shortly via WhatsApp or email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {step === 1 && (
              <>
                <p className="text-sm text-slate-600 mb-3">Let’s start with your basic info.</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+31 6 11 59 68 12"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-sm text-slate-600 mb-3">Now tell us about your interest.</p>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="Project Controls">Project Controls</option>
                  <option value="Detail Engineering">Detail Engineering</option>
                  <option value="Execution Support">Execution Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 mt-2"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
                </button>
              </>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-1 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Back
                </button>
              )}
              {step < totalSteps && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-3 py-1 text-sm rounded-lg text-white"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default FloatingContactForm;
