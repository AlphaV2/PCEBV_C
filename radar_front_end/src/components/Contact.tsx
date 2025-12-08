import React, { useState } from "react";
import { MapPin, Loader2, CheckCircle2 } from "lucide-react";
// Ensure this path matches your folder structure. 
import { CONTACT_SECTION_DETAILS } from "../../constants"; 

// Get API URL from .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // 1. Client-side Validation
    if (!formData.get("name") || !formData.get("email") || !formData.get("message")) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      // DEBUG: Log where we are sending data
      console.log(`Submitting form to: ${API_BASE_URL}/submit-contact.php`);

      const response = await fetch(`${API_BASE_URL}/submit-contact.php`, {
        method: "POST",
        body: formData, 
        // NOTE: Do NOT set Content-Type header manually when using FormData.
      });

      // Check if the server actually replied with a valid HTTP status
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status} - ${response.statusText}`);
      }

      // Try to parse the JSON
      const result = await response.json();
      console.log("Server Response:", result);

      if (result.status === true) {
        setFormState("success");
        formElement.reset(); // Clear the form
      } else {
        setFormState("error");
        setErrorMessage(result.message || "Server returned an error.");
      }

    } catch (err: any) {
      console.error("Submission Error:", err);
      setFormState("error");
      
      // User-friendly error messages
      if (err.message.includes("Failed to fetch")) {
        setErrorMessage("Cannot connect to server. Is XAMPP running? Is the URL in .env correct?");
      } else {
        setErrorMessage(err.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <section id="contact" className="py-10 md:py-12 bg-white relative scroll-mt-28"> {/* Reduced vertical padding */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Reduced grid gap */}
          
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3"> {/* Reduced font size and bottom margin */}
              Ready to secure your infrastructure?
            </h2>
            <p className="text-sm text-slate-500 mb-8"> {/* Reduced font size and bottom margin */}
              Reach out for a consultation regarding Drone Security, IoT Protection, or ISO Compliance.
            </p>
            <div className="space-y-6"> {/* Reduced space between items */}
              {(CONTACT_SECTION_DETAILS as any[]).map((office, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-lg"> {/* Reduced padding and rounded corners */}
                    <MapPin size={18} className="text-blue-600" /> {/* Reduced icon size */}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-0.5 text-sm">{office.title}</h3> {/* Reduced bottom margin */}
                    {office.lines.map((line: string, i: number) => (
                      <p key={i} className="text-slate-500 text-[11px] leading-snug">{line}</p> 
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-xl"> {/* Reduced padding and rounded corners */}
            {formState === "success" ? (
              <div className="text-center py-10 animate-fade-in"> {/* Reduced vertical padding */}
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto"> {/* Reduced size */}
                  <CheckCircle2 size={30} /> {/* Reduced icon size */}
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3> {/* Reduced font size */}
                <p className="text-slate-500 text-sm mt-2">We’ve received your inquiry and will be in touch shortly.</p>
                <button 
                  onClick={() => setFormState("idle")} 
                  className="mt-5 text-blue-600 text-sm font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> {/* Reduced gap */}
                  <div>
                    <label htmlFor="name" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Your Name *</label> {/* Reduced font size */}
                    <input id="name" name="name" required type="text" placeholder="John Doe"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" /> {/* Reduced padding and rounded corners */}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Phone Number</label> {/* Reduced font size */}
                    <input id="phone" name="phone" type="tel" placeholder="+1 (555) 555-5555"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" /> {/* Reduced padding and rounded corners */}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Work Email *</label> {/* Reduced font size */}
                  <input id="email" name="email" required type="email" placeholder="john@example.com"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" /> {/* Reduced padding and rounded corners */}
                </div>

                <div>
                    <label htmlFor="enquiry" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Topic *</label> {/* Reduced font size */}
                    <select
                    id="enquiry"
                    name="enquiry"
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-slate-700" 
                    >
                    {/* 🚨 Fix Applied: JSX comment removed from the className line */}
                    <option value="">Select a product or service</option>
                    <option value="Drone Defense">Drone Defense</option>
                    <option value="IoT Security">IoT Security</option>
                    <option value="ISO Compliance">ISO Compliance</option>
                    <option value="SOC Operations">SOC Operations</option>
                    <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Message *</label> {/* Reduced font size */}
                  <textarea id="message" name="message" required placeholder="How can we help you?"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm"></textarea> {/* Reduced padding, height, and rounded corners */}
                </div>

                {/* Error Message Display */}
                {errorMessage && (
                    <div className="p-2 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2"> {/* Reduced padding and font size */}
                        <span>⚠️</span> {errorMessage}
                    </div>
                )}

                {formState === "submitting" ? (
                  <button disabled className="w-full py-2.5 bg-blue-600/70 text-white rounded-lg flex items-center justify-center cursor-not-allowed font-bold text-sm"> {/* Reduced padding and rounded corners */}
                    <Loader2 className="animate-spin mr-2" size={18} /> Sending...
                  </button>
                ) : (
                  <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-blue-200 text-sm"> {/* Reduced padding and rounded corners */}
                    Send Message
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;