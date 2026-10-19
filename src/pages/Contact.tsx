import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Clock, FileCheck, ArrowUpRight, Sparkles } from "lucide-react";
import ArchMatrixBackground from "../components/ArchMatrixBackground";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectArea, setProjectArea] = useState(450); // Default to 450 m²
  const [projectType, setProjectType] = useState("Architectural & BIM Project");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectVision, setProjectVision] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

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
    setProjectType("Architectural & BIM Project");
  };

  return (
    <div className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-20 md:pb-24 bg-gold-light text-studio-black min-h-screen relative overflow-hidden">
      {/* Editorial layout grid outlines */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-studio-black/[0.08]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-studio-black/[0.03] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-studio-black/[0.03] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Banner Section */}
        <div className="mb-3 sm:mb-5 lg:mb-6">
          <div className="border-b-2 border-black pb-2 sm:pb-3 mb-4 sm:mb-6 w-full">
            <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.4em] text-studio-black uppercase block font-bold">
              06 // CONTACT & PROJECT ENQUIRIES
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end lg:hidden">
            <p className="hidden md:block lg:hidden font-sans text-xs sm:text-base text-studio-charcoal/80 font-light max-w-3xl leading-relaxed text-justify">
              BUILD THE MATRIX Pvt.  Ltd. collaborates on carefully curated architectural, BIM, interior, and visualization projects that demand creativity, precision, and modern design thinking. Whether you are planning a residence, commercial environment, hospitality project, or visualization concept — our company is ready to transform your vision into reality.
            </p>
          </div>
        </div>

        {/* Flex container for reordering consultation form and contact cards */}
        <div className="flex flex-col">
          {/* Company Contact Section - moved slightly upward */}
          <div id="studio-contact" className="order-1 -translate-y-2 sm:-translate-y-4 md:-translate-y-6 mb-6 sm:mb-10 p-4 sm:p-8 border border-studio-black/10 bg-white/45 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.6)] rounded-none relative overflow-hidden">
            <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-studio-black/[0.08]">
              <span className="font-mono text-[9px] text-[#7F7A75] uppercase block tracking-widest font-bold">
                COMPANY CONTACT
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-studio-black font-semibold mt-1">
                BUILD THE MATRIX Pvt.  Ltd.
              </h3>
              <span className="font-mono text-[9px] sm:text-[10px] text-gold-bronze font-light uppercase tracking-wide block mt-0.5 sm:mt-1">
                Architecture • BIM • Visualization • Interiors
              </span>
              <p className="font-sans text-xs text-studio-charcoal mt-1.5 font-normal">
                Kandoli Street No 4, Saundhon wali, Chironwali, Canal Road | Dehradun, Uttarakhand | 248013
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 pt-2">
              <div className="p-3 sm:p-4 bg-white/55 backdrop-blur-sm border border-studio-black/5 flex flex-col justify-between hover:bg-white/85 hover:border-gold-bronze hover:shadow-lg transition-all duration-300 rounded-none shadow-sm">
                <span className="font-mono text-[8.5px] sm:text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-1.5 sm:mb-2 font-medium">
                  HR Email
                </span>
                <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                  <Mail className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                  <a href="mailto:contactbuildthematrix@gmail.com" className="hover:underline truncate">contactbuildthematrix@gmail.com</a>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-white/55 backdrop-blur-sm border border-studio-black/5 flex flex-col justify-between hover:bg-white/85 hover:border-gold-bronze hover:shadow-lg transition-all duration-300 rounded-none shadow-sm">
                <span className="font-mono text-[8.5px] sm:text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-1.5 sm:mb-2 font-medium">
                  Business Enquiries
                </span>
                <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                  <Mail className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                  <a href="mailto:projects@buildthematrix.com" className="hover:underline truncate">projects@buildthematrix.com</a>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-white/55 backdrop-blur-sm border border-studio-black/5 flex flex-col justify-between hover:bg-white/85 hover:border-gold-bronze hover:shadow-lg transition-all duration-300 rounded-none shadow-sm">
                <span className="font-mono text-[8.5px] sm:text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-1.5 sm:mb-2 font-medium">
                  Collaboration Requests
                </span>
                <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-medium">
                  <Mail className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                  <a href="mailto:collab@buildthematrix.com" className="hover:underline truncate">collab@buildthematrix.com</a>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-white/55 backdrop-blur-sm border border-studio-black/5 flex flex-col justify-between hover:bg-white/85 hover:border-gold-bronze hover:shadow-lg transition-all duration-300 rounded-none shadow-sm">
                <span className="font-mono text-[8.5px] sm:text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-1.5 sm:mb-2 font-medium">
                  Company Hotline & Lines
                </span>
                <div className="flex items-center flex-wrap gap-x-2 text-xs font-sans text-studio-black font-medium">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 fill-[#25D366] flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <a href="https://wa.me/917505683585" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-700 font-sans text-xs">
                      7505683585
                    </a>
                  </div>
                  <span className="text-studio-black/25">|</span>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0" />
                    <a href="tel:+918126981337" className="hover:underline text-studio-black font-sans text-xs">
                      +91 8126981337
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-white/55 backdrop-blur-sm border border-studio-black/5 flex flex-col justify-between hover:bg-white/85 hover:border-gold-bronze hover:shadow-lg transition-all duration-300 rounded-none shadow-sm">
                <span className="font-mono text-[8.5px] sm:text-[9px] text-[#7F7A75] uppercase tracking-wider block font-semibold mb-1.5 sm:mb-2 font-medium">
                  Working Hours
                </span>
                <div className="flex items-center gap-2 text-xs font-sans text-studio-black font-semibold">
                  <Clock className="w-3.5 h-3.5 text-gold-bronze flex-shrink-0 animate-spin-slow" />
                  <span>Mon – Sat | 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation form */}
          <div id="consultation-form" className="order-2 mb-6 sm:mb-12 -mx-6 md:mx-0 bg-zinc-950 border-y md:border border-zinc-800 text-white shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.04)] relative overflow-hidden">
            <div className="bg-black p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <ArchMatrixBackground particleCount={40} showGrid={true} />
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-between h-full gap-6 relative z-10"
                >
                  <div className="flex flex-col gap-5">
                    <div className="pb-2 border-b border-zinc-900">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-400 uppercase block mb-1 font-semibold">
                        PROJECT CONSULTATION // DIRECTORY INTAKE
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                        Begin Your <span className="italic font-normal text-zinc-300">Design Journey</span>
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Deepanshi Kalra"
                          className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus:border-white p-3 font-sans text-xs focus:outline-none focus:bg-zinc-900 transition-all duration-300 rounded-none text-white placeholder-zinc-700"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider font-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@email.com"
                          className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus:border-white p-3 font-sans text-xs focus:outline-none focus:bg-zinc-900 transition-all duration-300 rounded-none text-white placeholder-zinc-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider font-semibold">
                          Project Location
                        </label>
                        <input
                          type="text"
                          required
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          placeholder="Enter city, country, or site details."
                          className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus:border-white p-3 font-sans text-xs focus:outline-none focus:bg-zinc-900 transition-all duration-300 rounded-none text-white placeholder-zinc-700"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-baseline font-mono text-[10px]">
                          <span className="uppercase text-zinc-400 tracking-wider font-semibold">Estimated Project Area</span>
                          <span className="font-semibold text-white">{projectArea} m²</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="5000"
                          step="10"
                          value={projectArea}
                          onChange={(e) => setProjectArea(Number(e.target.value))}
                          className="w-full h-1.5 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-white my-2"
                        />
                        <div className="flex justify-between text-zinc-500 font-mono text-[8px] uppercase">
                          <span>e.g. 50 m² Mini-Suite</span>
                          <span>5,000 m² Master plan</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider font-semibold">
                        Project Vision & Requirements
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={projectVision}
                        onChange={(e) => setProjectVision(e.target.value)}
                        placeholder="Describe your ideas, architectural preferences, spatial goals, references, functionality needs, and visualization expectations."
                        className="w-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 focus:border-white p-3.5 font-sans text-xs focus:outline-none focus:bg-zinc-900 transition-all duration-300 rounded-none text-white placeholder-zinc-700 resize-none"
                      />
                    </div>

                    {/* Submission dispatch */}
                    <div className="border-t border-zinc-900 pt-5 flex flex-col gap-4">
                      {validationError && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-2xs uppercase tracking-wider">
                          ⚠️ {validationError}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest max-w-sm leading-relaxed">
                          DISPATCH SECURELY UNDER SSL HIGH ENCRYPT SHELLS. WE COMMIT TO SECRECY OF ALL IDEAS.
                        </span>

                        <button
                          type="submit"
                          className="px-6 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-500 rounded-none bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.02] focus:scale-95 font-bold flex items-center justify-center gap-3 cursor-pointer border border-transparent hover:border-white"
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
                  className="flex flex-col h-full justify-between items-center text-center py-16 px-6 relative z-10"
                >
                  <div className="flex flex-col items-center gap-6 max-w-md my-auto">
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2 animate-bounce">
                      <FileCheck className="w-7 h-7" />
                    </div>

                    <h4 className="font-serif text-3xl font-light text-glow leading-none text-white">
                      Design Journey Begun
                    </h4>
                    
                    <p className="font-mono text-[10px] tracking-widest text-[#10B981] uppercase font-bold leading-none">
                      REGISTRATION ID: #BTM-{Math.floor(Math.random()*900000 + 100000)}
                    </p>

                    <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                      Dear <span className="text-white font-bold">{name}</span>, your project consultation dossier for the <span className="text-zinc-300 font-semibold">{projectType} ({projectArea} m²)</span> has been successfully filed. We have scheduled our design team to review your request. An architectural strategist will connect at <span className="text-white">{email}</span> within 24–48 hours.
                    </p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-8 px-5 py-3 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white hover:bg-white/[0.04] font-mono text-[9px] tracking-widest uppercase rounded-none cursor-pointer transition-all duration-300"
                  >
                    Register Another Project
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

        {/* 3. DESIGN CONSULTATION PROCESS */}
        <div id="consultation-process" className="hidden sm:block mt-28 border-t border-studio-black/[0.12] pt-20">
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
                <div key={idx} className="p-6 bg-white/45 backdrop-blur-md border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_rgba(15,15,15,0.01)] hover:bg-white/75 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[320px]">
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
                DESIGN PRINCIPLES & COMPANY VALUES
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black leading-tight">
                The BUILD THE MATRIX Pvt.  Ltd. <br />
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
                <div key={idx} className="p-6 bg-white/45 backdrop-blur-md border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_rgba(15,15,15,0.01)] hover:bg-white/75 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-3 min-h-[190px]">
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
              #
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black">
              Company <span className="italic font-normal text-gold-bronze">Enquiries</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "Q1 // Do you provide BIM and Revit services separately?",
                a: "Yes. BUILD THE MATRIX Pvt.  Ltd. offers dedicated BIM coordination, Revit modeling, technical documentation, and visualization services for architecture firms, consultants, and developers."
              },
              {
                q: "Q2 // Can you create photorealistic architectural renders and walkthroughs?",
                a: "Absolutely. We specialize in cinematic architectural visualization, including high-resolution renders, animations, and immersive presentation experiences."
              },
              {
                q: "Q3 // Do you work on both residential and commercial projects?",
                a: "Yes. Our company handles residential, commercial, hospitality, workspace, retail, and conceptual architecture projects."
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
              <div key={idx} className="p-6 bg-white/45 backdrop-blur-md border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(15,15,15,0.01)] hover:bg-white/75 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2">
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
