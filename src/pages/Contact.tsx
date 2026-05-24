import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Clock, FileCheck, ArrowUpRight, Sparkles } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectArea, setProjectArea] = useState(450); // Default to 450 m²
  const [projectType, setProjectType] = useState("Residential Architecture");
  const [preferredServices, setPreferredServices] = useState<string[]>(["Concept Design", "3D Rendering"]);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectVision, setProjectVision] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleServiceToggle = (service: string) => {
    if (preferredServices.includes(service)) {
      setPreferredServices(preferredServices.filter(s => s !== service));
    } else {
      setPreferredServices([...preferredServices, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectLocation || !projectVision) {
      setValidationError("Verification failed: Please fill out all required fields.");
      setTimeout(() => setValidationError(null), 6000);
      return;
    }
    setValidationError(null);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setName("");
    setEmail("");
    setProjectLocation("");
    setProjectVision("");
    setProjectArea(450);
    setProjectType("Residential Architecture");
    setPreferredServices(["Concept Design", "3D Rendering"]);
  };

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-gold-light text-studio-black min-h-screen relative overflow-hidden">
      {/* Editorial layout grid outlines */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-studio-black/[0.08]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-studio-black/[0.03] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-studio-black/[0.03] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-12 xl:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
              05 // CONTACT & PROJECT ENQUIRIES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-studio-black leading-none uppercase">
              Let’s Create <br />
              <span className="italic font-normal text-gold-bronze">Exceptional Spaces Together</span>
            </h2>
          </div>
          <p className="lg:col-span-12 xl:col-span-7 font-sans text-sm sm:text-base text-studio-charcoal/80 font-light max-w-2xl leading-relaxed text-justify">
            BUILD THE MATRIX collaborates on carefully curated architectural, BIM, interior, and visualization projects that demand creativity, precision, and modern design thinking. Whether you are planning a residence, commercial environment, hospitality project, or visualization concept — our studio is ready to transform your vision into reality.
          </p>
        </div>

        {/* Studio Contact Section */}
        <div id="studio-contact" className="my-12 p-8 border border-studio-black/[0.08] bg-white/[0.25] shadow-sm">
          <div className="mb-6 pb-4 border-b border-studio-black/[0.08]">
            <span className="font-mono text-[9px] text-[#7F7A75] uppercase block tracking-widest font-bold">
              STUDIO CONTACT
            </span>
            <h3 className="font-serif text-2xl text-studio-black font-semibold mt-1">
              BUILD THE MATRIX
            </h3>
            <span className="font-mono text-[10px] text-gold-bronze font-light uppercase tracking-wide block mt-1">
              Architecture • BIM • Visualization • Interiors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pt-2">
            <div className="p-4 bg-white/[0.3] border border-studio-black/[0.03] flex flex-col justify-between hover:bg-white transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-2">
                Studio Email
              </span>
              <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                <Mail className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                <a href="mailto:contact@buildthematrix.com" className="hover:underline truncate">contact@buildthematrix.com</a>
              </div>
            </div>

            <div className="p-4 bg-white/[0.3] border border-studio-black/[0.03] flex flex-col justify-between hover:bg-white transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-2">
                Business Enquiries
              </span>
              <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                <Mail className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                <a href="mailto:projects@buildthematrix.com" className="hover:underline truncate">projects@buildthematrix.com</a>
              </div>
            </div>

            <div className="p-4 bg-white/[0.3] border border-studio-black/[0.03] flex flex-col justify-between hover:bg-white transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-2">
                Collaboration Requests
              </span>
              <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                <Mail className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                <a href="mailto:collab@buildthematrix.com" className="hover:underline truncate">collab@buildthematrix.com</a>
              </div>
            </div>

            <div className="p-4 bg-white/[0.3] border border-studio-black/[0.03] flex flex-col justify-between hover:bg-white transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-2">
                Studio Hotline
              </span>
              <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                <Phone className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                <a href="tel:+917505683585" className="hover:underline truncate text-glow-hover">+91 7505683585</a>
              </div>
            </div>

            <div className="p-4 bg-white/[0.3] border border-studio-black/[0.03] flex flex-col justify-between hover:bg-white transition-all duration-300">
              <span className="font-mono text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-2">
                Working Hours
              </span>
              <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-semibold">
                <Clock className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0 animate-spin-slow" />
                <span>Mon – Sat | 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Double-column form & feasibility calculator */}
        <div id="consultation-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12 bg-studio-dark text-gold-light border border-white/[0.08] shadow-2xl relative">
          
          {/* Left Panel: PROJECT TYPE & PREFERRED SERVICES */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1c1917] to-[#0c0a09] p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative">
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#A8A29E] uppercase block mb-2">
                PROJECT CONSULTATION FORM
              </span>
              <h3 className="font-serif text-3xl font-light text-glow leading-tight mb-6">
                Begin Your <br />
                <span className="italic font-normal text-gold-beige">Design Journey</span>
              </h3>

              <div className="border-t border-white/[0.07] pt-6 flex flex-col gap-6">
                {/* Project Type choice block */}
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-wider block font-semibold">
                    Project Type
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Residential Architecture",
                      "Commercial Design",
                      "Interior Design",
                      "BIM Coordination",
                      "3D Visualization",
                      "Landscape Design"
                    ].map((type) => {
                      const isSelected = projectType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setProjectType(type)}
                          className={`py-2 px-3 border font-mono text-[9px] tracking-wider uppercase text-left transition-all duration-300 rounded-none cursor-pointer ${
                            isSelected
                              ? "bg-gold-beige/15 border-gold-beige text-gold-beige font-semibold"
                              : "bg-transparent border-white/[0.06] text-[#A8A29E]/65 hover:border-white/15 hover:text-white"
                          }`}
                        >
                          {isSelected ? "✦ " : ""} {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Services block */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-wider block font-semibold">
                    Preferred Services
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-1 select-none scrollbar-thin">
                    {[
                      "Concept Design",
                      "BIM Modeling",
                      "Revit Documentation",
                      "3D Rendering",
                      "Walkthrough Animation",
                      "Interior Styling",
                      "Construction Drawings"
                    ].map((service) => {
                      const isSelected = preferredServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`py-1.5 px-3 border font-mono text-[8.5px] tracking-wider uppercase text-left transition-all duration-300 rounded-none cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-gold-beige/10 border-gold-beige/60 text-gold-beige font-semibold"
                              : "bg-transparent border-white/[0.04] text-[#A8A29E]/60 hover:border-white/10"
                          }`}
                        >
                          <span>{service}</span>
                          <span className={`w-1.5 h-1.5 ${isSelected ? "bg-gold-beige" : "bg-white/10"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.05] mt-6 text-left font-mono text-[8px] text-[#7F7A75] tracking-wider uppercase">
              STUDIO CODE // FORM CONFLICT SECURED
            </div>
          </div>

          {/* Right Panel: SECURE TELEMETRY FORM */}
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between relative">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-between h-full gap-6"
                >
                  <div className="flex flex-col gap-5">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#A8A29E] uppercase block mb-1 font-semibold">
                      CONSULTATION PARAMETERS
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase text-[#A8A29E] tracking-wider font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Kamal Nautiyal"
                          className="w-full bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.25] focus:border-gold-beige p-3 font-sans text-xs focus:outline-none focus:bg-white/[0.04] transition-all duration-300 rounded-none text-white placeholder-white/20"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase text-[#A8A29E] tracking-wider font-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@email.com"
                          className="w-full bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.25] focus:border-gold-beige p-3 font-sans text-xs focus:outline-none focus:bg-white/[0.04] transition-all duration-300 rounded-none text-white placeholder-white/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase text-[#A8A29E] tracking-wider font-semibold">
                          Project Location
                        </label>
                        <input
                          type="text"
                          required
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          placeholder="Enter city, country, or site details."
                          className="w-full bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.25] focus:border-gold-beige p-3 font-sans text-xs focus:outline-none focus:bg-white/[0.04] transition-all duration-300 rounded-none text-white placeholder-white/20"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-baseline font-mono text-[10px]">
                          <span className="uppercase text-[#A8A29E] tracking-wider font-semibold">Estimated Project Area</span>
                          <span className="font-semibold text-gold-beige">{projectArea} m²</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="5000"
                          step="10"
                          value={projectArea}
                          onChange={(e) => setProjectArea(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/[0.08] rounded-none appearance-none cursor-pointer accent-gold-beige my-2"
                        />
                        <div className="flex justify-between text-[#7F7A75] font-mono text-[8px] uppercase">
                          <span>e.g. 50 m² Mini-Suite</span>
                          <span>5,000 m² Master plan</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#A8A29E] tracking-wider font-semibold">
                        Project Vision & Requirements
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={projectVision}
                        onChange={(e) => setProjectVision(e.target.value)}
                        placeholder="Describe your ideas, architectural preferences, spatial goals, references, functionality needs, and visualization expectations."
                        className="w-full bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.25] focus:border-gold-beige p-3.5 font-sans text-xs focus:outline-none focus:bg-white/[0.04] transition-all duration-300 rounded-none text-white placeholder-white/20 resize-none"
                      />
                    </div>

                    {/* Submission dispatch */}
                    <div className="border-t border-white/[0.08] pt-5 flex flex-col gap-4">
                      {validationError && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-2xs uppercase tracking-wider">
                          ⚠️ {validationError}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <span className="font-mono text-[8px] text-[#7F7A75] uppercase tracking-widest max-w-sm leading-relaxed">
                          DISPATCH SECURELY UNDER SSL HIGH ENCRYPT SHELLS. WE COMMIT TO SECRECY OF ALL IDEAS.
                        </span>

                        <button
                          type="submit"
                          className="px-6 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-500 rounded-none bg-gold-beige text-studio-black hover:bg-gold-light hover:scale-[1.02] focus:scale-95 font-bold flex items-center justify-center gap-3 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-inherit" />
                          Start Your Project
                          <ArrowUpRight className="w-3.5 h-3.5 text-inherit" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full justify-between items-center text-center py-16 px-6 relative"
                >
                  <div className="flex flex-col items-center gap-6 max-w-md my-auto">
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2 animate-bounce">
                      <FileCheck className="w-7 h-7" />
                    </div>

                    <h4 className="font-serif text-3xl font-light text-glow leading-none text-gold-light">
                      Design Journey Begun
                    </h4>
                    
                    <p className="font-mono text-[10px] tracking-widest text-[#10B981] uppercase font-bold leading-none">
                      REGISTRATION ID: #BTM-{Math.floor(Math.random()*900000 + 100000)}
                    </p>

                    <p className="font-sans text-xs text-[#A8A29E] leading-relaxed font-light">
                      Dear <span className="text-[#E8DDCF] font-bold">{name}</span>, your project consultation dossier for the <span className="text-gold-beige">{projectType} ({projectArea} m²)</span> has been successfully filed. We have scheduled our design team to review your request. An architectural strategist will connect at <span className="text-[#E8DDCF]">{email}</span> within 24–48 hours.
                    </p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-8 px-5 py-3 border border-white/10 hover:border-gold-beige text-gold-beige hover:bg-white/[0.04] font-mono text-[9px] tracking-widest uppercase rounded-none cursor-pointer transition-all duration-300"
                  >
                    Register Another Project
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. DESIGN CONSULTATION PROCESS */}
        <div id="consultation-process" className="mt-28 border-t border-studio-black/[0.12] pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-12 flex flex-col gap-4">
              <span className="font-mono text-[9px] tracking-[0.45em] text-gold-bronze uppercase block mb-1 font-semibold">
                DESIGN CONSULTATION PROCESS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black leading-tight">
                From Concept <span className="italic font-normal text-gold-bronze">To Completion</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-studio-charcoal/85 leading-relaxed font-light text-justify max-w-2xl">
                Our approach to project delivery ensures maximum transparency, technological integration, and unparalleled aesthetic execution at every stage of development.
              </p>
            </div>

            <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {[
                {
                  step: "STEP 01",
                  title: "Discovery & Vision Planning",
                  points: [
                    "Client goals",
                    "Site conditions",
                    "Design preferences",
                    "Functional requirements",
                    "Visual inspirations"
                  ],
                  meta: "This stage establishes the creative direction and architectural identity of the project."
                },
                {
                  step: "STEP 02",
                  title: "Concept Development & BIM Workflow",
                  points: [
                    "Spatial concepts",
                    "Architectural layouts",
                    "BIM models",
                    "Material palettes",
                    "Visualization studies",
                    "Technical coordination"
                  ],
                  meta: "Every detail is refined for both aesthetics and functionality."
                },
                {
                  step: "STEP 03",
                  title: "Visualization & Presentation",
                  points: [
                    "Photorealistic renders",
                    "Cinematic walkthroughs",
                    "Lighting simulations",
                    "Material visualization",
                    "Interior atmosphere studies"
                  ],
                  meta: "This helps clients fully experience the project before execution."
                },
                {
                  step: "STEP 04",
                  title: "Technical Documentation & Execution",
                  points: [
                    "Construction drawings",
                    "BIM coordination",
                    "Technical detailing",
                    "Design documentation",
                    "Execution-ready outputs"
                  ],
                  meta: "Ensuring clarity, precision, and efficient project development."
                }
              ].map((s, idx) => (
                <div key={idx} className="p-6 bg-white/[0.45] border border-studio-black/[0.06] hover:bg-white duration-300 flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="flex justify-between items-baseline border-b border-studio-black/[0.1] pb-2 mb-4">
                      <span className="font-mono text-[9px] text-[#B45309] font-bold tracking-widest">{s.step}</span>
                      <span className="font-mono text-[8px] text-studio-gray font-light">CONSULTATION PHASE</span>
                    </div>
                    <h4 className="font-serif text-base text-studio-black font-semibold tracking-wide mb-3">{s.title}</h4>
                    <ul className="space-y-1.5 mb-4 pl-1">
                      {s.points.map((p, i) => (
                        <li key={i} className="font-sans text-[11px] text-studio-charcoal/80 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-[#B45309]/70 rounded-full flex-shrink-0" />
                          <span className="truncate">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-studio-black/[0.04] font-sans text-[10.5px] italic text-[#7F7A75] leading-relaxed">
                    {s.meta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. DESIGN PRINCIPLES & STUDIO VALUES */}
        <div id="studio-values" className="mt-28 border-t border-studio-black/[0.12] pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[9px] tracking-[0.45em] text-gold-bronze uppercase block mb-1 font-semibold">
                DESIGN PRINCIPLES & STUDIO VALUES
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black leading-tight">
                The BUILD THE MATRIX <br />
                <span className="italic font-normal text-gold-bronze">Philosophy</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-studio-charcoal/85 leading-relaxed font-light text-justify">
                Every project is approached with creativity, collaboration, and detail-driven execution. We believe architecture should combine:
              </p>
              <ul className="grid grid-cols-2 gap-3 pl-1">
                {[
                  "Functionality",
                  "Emotional connection",
                  "Timeless aesthetics",
                  "Sustainable thinking",
                  "Technical precision",
                  "Human-centered experiences"
                ].map((item, idx) => (
                  <li key={idx} className="font-mono text-[10px] text-studio-charcoal/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold-bronze flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  code: "C-01",
                  title: "Intelligent Design Thinking",
                  desc: "We create spaces that balance modern aesthetics with practical functionality and long-term usability."
                },
                {
                  code: "C-02",
                  title: "BIM & Technical Precision",
                  desc: "Every project is developed using coordinated BIM workflows and accurate documentation systems for seamless execution."
                },
                {
                  code: "C-03",
                  title: "Sustainable Architectural Approach",
                  desc: "We integrate natural daylight optimization, smart material usage, energy-conscious planning, and efficient spatial organization to create environmentally responsible architecture."
                },
                {
                  code: "C-04",
                  title: "Client Collaboration & Transparency",
                  desc: "We believe successful architecture is built through clear communication, creative collaboration, and shared vision throughout the design journey."
                }
              ].map((cov, idx) => (
                <div key={idx} className="p-6 bg-white/45 border border-studio-black/[0.06] hover:bg-white duration-300 flex flex-col gap-3 min-h-[190px]">
                  <div className="flex justify-between items-baseline border-b border-studio-black/[0.1] pb-2 mb-2">
                    <span className="font-mono text-[9px] text-[#B45309] font-bold tracking-widest">{cov.code}</span>
                    <span className="font-mono text-[8px] text-studio-gray font-light">OUR CORE VALUE</span>
                  </div>
                  <h4 className="font-serif text-lg text-studio-black font-semibold tracking-wide">{cov.title}</h4>
                  <p className="font-sans text-xs text-studio-charcoal/80 leading-relaxed font-light text-justify">{cov.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div id="faq" className="mt-28 border-t border-studio-black/[0.12] pt-20 mb-12">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[9px] tracking-[0.45em] text-gold-bronze uppercase block mb-1 font-semibold">
              FAQ // FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black">
              Studio <span className="italic font-normal text-gold-bronze">Enquiries</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "Q1 // Do you provide BIM and Revit services separately?",
                a: "Yes. BUILD THE MATRIX offers dedicated BIM coordination, Revit modeling, technical documentation, and visualization services for architecture firms, consultants, and developers."
              },
              {
                q: "Q2 // Can you create photorealistic architectural renders and walkthroughs?",
                a: "Absolutely. We specialize in cinematic architectural visualization, including high-resolution renders, animations, and immersive presentation experiences."
              },
              {
                q: "Q3 // Do you work on both residential and commercial projects?",
                a: "Yes. Our studio handles residential, commercial, hospitality, workspace, retail, and conceptual architecture projects."
              },
              {
                q: "Q4 // What software workflows do you use?",
                a: "We primarily work with: Autodesk Revit, AutoCAD, 3ds Max, Lumion, V-Ray, and Photoshop — depending on project requirements and visualization scope."
              },
              {
                q: "Q5 // Can clients collaborate remotely?",
                a: "Yes. We work with clients globally through online meetings, digital presentations, BIM coordination workflows, and cloud-based collaboration systems."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-white/30 border border-studio-black/[0.04] flex flex-col gap-2 hover:bg-white/[0.60] duration-300">
                <span className="font-mono text-[10.5px] text-[#B45309] font-bold tracking-wider uppercase block">{faq.q}</span>
                <p className="font-sans text-xs sm:text-sm text-studio-charcoal/80 leading-relaxed font-light text-justify mt-2 pl-4 border-l border-studio-black/10">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
