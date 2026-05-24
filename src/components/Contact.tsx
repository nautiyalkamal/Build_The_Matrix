import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CircleCheck, Globe, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Residential",
    gfa: 450, // default m2 GFA
    budget: "$2.5M - $5M",
    message: ""
  });

  const [activeStudio, setActiveStudio] = useState("Paris");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Simulated local times for our physical studios
  const [studioTimes, setStudioTimes] = useState({
    Paris: "",
    Kyoto: "",
    Oslo: ""
  });

  useEffect(() => {
    const updateStudioTimes = () => {
      const now = new Date();
      
      const parisTime = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Paris",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      
      const kyotoTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      
      const osloTime = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Oslo",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });

      setStudioTimes({
        Paris: parisTime,
        Kyoto: kyotoTime,
        Oslo: osloTime
      });
    };

    updateStudioTimes();
    const interval = setInterval(updateStudioTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  const studioDetails: Record<string, {
    coords: string;
    address: string;
    phone: string;
    email: string;
    timeLabel: string;
  }> = {
    Paris: {
      coords: "48.8566° N, 2.3522° E",
      address: "14 Rue du Faubourg Saint-Honoré, Esc B, 75008 Paris, France",
      phone: "+91 7505683585",
      email: "paris@arche.com",
      timeLabel: "CET Time"
    },
    Kyoto: {
      coords: "35.0116° N, 135.7681° E",
      address: "386-3 Rokkaku-cho, Nakagyo-ku, Kyoto 604-8134, Japan",
      phone: "+91 7505683585",
      email: "kyoto@arche.com",
      timeLabel: "JST Time"
    },
    Oslo: {
      coords: "59.9139° N, 10.7522° E",
      address: "Munkedamsveien 62A, Aker Brygge, 0250 Oslo, Norway",
      phone: "+91 7505683585",
      email: "oslo@arche.com",
      timeLabel: "CET Time"
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGfaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, gfa: parseInt(e.target.value) || 200 }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorStatus("Name and email are strictly required to authorize architectural scoping.");
      return;
    }
    
    setErrorStatus(null);
    setIsSubmitSuccess(true);
    
    // Auto-clear after timeout
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setFormData({
        name: "",
        email: "",
        category: "Residential",
        gfa: 450,
        budget: "$2.5M - $5M",
        message: ""
      });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-studio-black text-gold-light relative overflow-hidden">
      
      {/* Decorative vertical lines indicating blueprints scale margins */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.04]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.02] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.02] hidden md:block" />

      {/* Decorative large light orb */}
      <div className="absolute bottom-[-100px] left-[10%] w-[350px] h-[350px] bg-gold-beige/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-beige uppercase block mb-3 font-semibold">
              06 // COMMISSIONS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-white leading-tight">
              Begin The <br />
              <span className="italic">Choreography</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-xs md:text-sm text-gold-sand/60 font-light max-w-xl leading-relaxed">
              Accepting extremely exclusive boutique residential and cultural commissions annually. Connect with our principal representatives globally to authorize conceptual feasibility and daylight modeling layouts.
            </p>
          </div>
        </div>

        {/* Major Contact Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Block: Dynamic luxury form (Cols 1 to 7) */}
          <div className="lg:col-span-7 bg-studio-dark/40 border border-white/[0.04] p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-32 h-[1px] bg-gold-beige" />
            <div className="absolute top-0 left-0 w-[1px] h-32 bg-gold-beige" />

            <AnimatePresence mode="wait">
              {!isSubmitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="flex justify-between items-center border-b border-white/[0.05] pb-4 mb-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#7c7267] uppercase">
                      ONLINE SCENARIST / FEASIBILITY FORM
                    </span>
                    <span className="font-mono text-[9px] text-gold-beige flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      AUTO-CALCULATOR
                    </span>
                  </div>

                  {errorStatus && (
                    <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-[11px]">
                      {errorStatus}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-gold-beige uppercase">
                        OWNER'S FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Antoine Valentin"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-studio-black/60 border border-white/[0.07] focus:border-gold-beige/50 text-gold-light py-3 px-4 font-sans text-xs focus:outline-none transition-colors duration-400"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-gold-beige uppercase">
                        SECURE DIGITAL EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. antoine@luxemail.ch"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-studio-black/60 border border-white/[0.07] focus:border-gold-beige/50 text-gold-light py-3 px-4 font-sans text-xs focus:outline-none transition-colors duration-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                    {/* Project Exhibit Category */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-gold-beige uppercase">
                        STRUCTURE SEGMENT
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="bg-studio-black/60 border border-white/[0.07] focus:border-gold-beige/50 text-gold-light py-3 px-4 font-sans text-xs focus:outline-none transition-colors duration-400 cursor-pointer"
                      >
                        <option value="Residential">Residential Villa Estate</option>
                        <option value="Interior">Bespoke Interior Assembly</option>
                        <option value="Cultural">Cultural Pavilion Suite</option>
                        <option value="Hospitality">High-End Boutique Hotel</option>
                      </select>
                    </div>

                    {/* Budget Select */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest text-gold-beige uppercase">
                        QUALIFIED INVESTMENT SCALE
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="bg-studio-black/60 border border-white/[0.07] focus:border-gold-beige/50 text-gold-light py-3 px-4 font-sans text-xs focus:outline-none transition-colors duration-400 cursor-pointer"
                      >
                        <option value="$1M - $2.5M">$1.0M - $2.5M USD Feasible</option>
                        <option value="$2.5M - $5M">$2.5M - $5.0M USD Legacy</option>
                        <option value="$5M - $10M">$5.0M - $10.0M USD Masterwork</option>
                        <option value="$10M+">$10.0M+ USD Sovereign Estate</option>
                      </select>
                    </div>
                  </div>

                  {/* Interactive expected GFA (Gross Floor Area) slide modeler */}
                  <div className="flex flex-col gap-2.5 p-4 bg-studio-black/40 border border-white/[0.03] mt-2">
                    <div className="flex justify-between items-baseline font-mono text-[10px] tracking-widest text-studio-gray">
                      <span>ESTIMATED SPATIAL CODE INDEX</span>
                      <span>
                        GFA SCALE SPEC: <strong className="text-gold-beige">{formData.gfa} m²</strong>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1500}
                      step={50}
                      value={formData.gfa}
                      onChange={handleGfaChange}
                      className="accent-gold-beige w-full cursor-pointer h-1.5 bg-studio-charcoal rounded-none"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-white/30">
                      <span>100 m² (Boutique)</span>
                      <span>450 m² (Standard Villa)</span>
                      <span>1500 m² (Sovereign Palace)</span>
                    </div>
                  </div>

                  {/* Message / Scope description */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-gold-beige uppercase">
                      GEOGRAPHICAL VISION & SIGHTLINES
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Detail your landscape elevations, custom materials preference, or astronomical skylights requirement..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-studio-black/60 border border-white/[0.07] focus:border-gold-beige/50 text-gold-light py-3 px-4 font-sans text-xs focus:outline-none resize-none transition-colors duration-400"
                    />
                  </div>

                  {/* Action button */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-4 bg-gold-beige hover:bg-gold-light text-studio-black font-mono text-xs tracking-widest font-bold uppercase transition-all duration-500 rounded-none cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Architectural Request</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 text-studio-black" />
                  </button>
                </motion.form>
              ) : (
                /* Animated Success Display state (Anti-slop clean look) */
                <motion.div
                  key="submit-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-4 h-full my-auto gap-4"
                >
                  <CircleCheck className="w-16 h-16 text-gold-beige animate-bounce leading-none" />
                  <h3 className="font-serif text-2xl text-gold-light mt-2">
                    Ledger Authorized Successfully
                  </h3>
                  <p className="font-sans text-xs text-gold-sand/70 max-w-md leading-relaxed">
                    Our digital systems have securely recorded your spatial coordinates of <strong className="text-white">{formData.gfa}m² {formData.category} project</strong>. A principal designer will reach out with customized physical layout drafts via secure communication lines shortly.
                  </p>
                  <span className="font-mono text-[9px] text-[#7c7267] tracking-widest mt-4">
                    ESTATE CODE: AR-{Math.floor(Math.random() * 90000 + 10000)} // PARIS ARCHIVES DESPATCHED
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Studio physical destinations and Interactive custom map (Cols 8 to 12) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            {/* Minimalist interactive map simulator */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest text-gold-beige uppercase block">
                PHYSICAL ATELIER GRID
              </span>

              {/* Toggles for studio listings */}
              <div className="grid grid-cols-3 gap-2 border-b border-white/[0.08] pb-1.5">
                {Object.keys(studioDetails).map((studio) => (
                  <button
                    key={studio}
                    onClick={() => setActiveStudio(studio)}
                    className={`pb-2.5 font-mono text-[11px] tracking-widest uppercase transition-all duration-300 border-b cursor-pointer ${
                      activeStudio === studio
                        ? "border-gold-beige text-gold-beige font-semibold"
                        : "border-transparent text-studio-gray hover:text-gold-light"
                    }`}
                  >
                    {studio}
                  </button>
                ))}
              </div>

              {/* Display card containing exact latitude/longitude coordinates & phone lines */}
              <div className="p-6 bg-white/[0.02] border border-white/[0.04]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#7c7267]">
                    <Globe className="w-3.5 h-3.5 text-gold-beige" />
                    <span>COORDINATES:</span>
                  </div>
                  <span className="font-mono text-xs text-gold-beige font-semibold text-glow">
                    {studioDetails[activeStudio].coords}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#7c7267] uppercase block mb-1">
                      DESK MAILING ADDRESS
                    </span>
                    <span className="font-serif text-sm font-light text-gold-light">
                      {studioDetails[activeStudio].address}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.05] pt-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#7c7267] uppercase block mb-1">
                        SECURE PHONE LINE
                      </span>
                      <a href={`tel:${studioDetails[activeStudio].phone}`} className="font-mono text-xs text-gold-light hover:text-gold-beige transition-colors">
                        {studioDetails[activeStudio].phone}
                      </a>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#7c7267] uppercase block mb-1">
                        INBOX ATELIER
                      </span>
                      <a href={`mailto:${studioDetails[activeStudio].email}`} className="font-mono text-xs text-gold-light hover:text-gold-beige transition-colors">
                        {studioDetails[activeStudio].email}
                      </a>
                    </div>
                  </div>

                  {/* Local Simulated Time clock indicator */}
                  <div className="bg-studio-black border border-white/[0.04] p-3 flex justify-between items-center mt-2.5">
                    <div className="flex items-center gap-2 font-mono text-[9px] text-studio-gray tracking-wider uppercase">
                      <Clock className="w-3.5 h-3.5 text-[#7c7267]" />
                      <span>ATELIER STATUS / {studioDetails[activeStudio].timeLabel}:</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-gold-beige text-glow animate-pulse">
                      {studioTimes[activeStudio as keyof typeof studioTimes] || "OFFLINE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* General Global Studio Coordinates */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest text-studio-gray uppercase">
                SOCIAL MONOGRAPHS
              </span>
              <div className="grid grid-cols-3 gap-3 font-mono text-[11px] text-center">
                <a
                  href="#contact"
                  className="py-2.5 bg-white/[0.02] border border-white/[0.04] hover:border-gold-beige text-gold-sand duration-300 hover:bg-white/[0.04]"
                >
                  INSTAGRAM
                </a>
                <a
                  href="#contact"
                  className="py-2.5 bg-white/[0.02] border border-white/[0.04] hover:border-gold-beige text-gold-sand duration-300 hover:bg-white/[0.04]"
                >
                  LINKEDIN
                </a>
                <a
                  href="#contact"
                  className="py-2.5 bg-white/[0.02] border border-white/[0.04] hover:border-gold-beige text-gold-sand duration-300 hover:bg-white/[0.04]"
                >
                  PINTEREST
                </a>
              </div>
            </div>

            <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row sm:justify-between font-mono text-[9px] text-studio-gray gap-2 uppercase">
              <span>DESIGN PARTNERSHIP STATIONS // GLOBAL</span>
              <span>© 2026 ARCHÉ STUDIO.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
