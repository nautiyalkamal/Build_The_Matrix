import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, Landmark, Paintbrush, ShieldCheck, PenTool, ClipboardCheck, ArrowUpRight } from "lucide-react";

export default function Process() {
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [expandedMobileStageIdx, setExpandedMobileStageIdx] = useState<number | null>(null);

  const stages = [
    {
      id: "stage-1",
      number: "01",
      title: "SKETCH DESIGN & VISIONING",
      icon: PenTool,
      details: "Initial design brief meeting, site analysis (light path, seasonal winds, slope calculation), and rapid physical study models capturing volume and spatial mass alignments.",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "stage-2",
      number: "02",
      title: "DESIGN DEVELOPMENT & BIM MODELING",
      icon: Landmark,
      details: "Translating loose stone concepts into parametric CAD software overlays. We run solar calculations and define the structural frame, setting the GFA blueprint dimensions.",
      imageUrl: "https://i.ibb.co/nqkCD4tv/8-1-1.jpg"
    },
    {
      id: "stage-3",
      number: "03",
      title: "DEVELOPMENT APPLICATION CODE AUDIT",
      icon: ShieldCheck,
      details: "Submitting detailed spatial layouts to local city historical preservation boards and environmental regulation agencies for immediate luxury code authorization.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "stage-4",
      number: "04",
      title: "INTERIOR CHOREOGRAPHY",
      icon: Paintbrush,
      details: "Material selection swatches (travertine, raw basalt, cedar wood, smoked brass fits) matched with architectural built-in details and direct lighting arrays.",
      imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "stage-5",
      number: "05",
      title: "BUILDING PLANS & SCHEMATIC DIRECTIVES",
      icon: ClipboardCheck,
      details: "Generating sub-contractor ready specs covering load vectors, steel rod reinforcement matrices, subslab hydronic heating runs, and insulation layer details.",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "stage-6",
      number: "06",
      title: "CONSTRUCTION COMMAND & MASTER MASONRY",
      icon: Hammer,
      details: "On-site deployment supervision, raw stone block quality testing, custom concrete mix checkups, and final alignment authorization.",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const StageIcon = stages[hoveredIdx].icon;

  return (
    <div className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-20 md:pb-24 lg:pb-32 bg-studio-black text-gold-light min-h-screen relative overflow-hidden">
      {/* Editorial grid outlines */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.05]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.03] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.03] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Readjusted heading moved above the grid layout with elegant spacing */}
        <div className="mb-8 md:mb-12 max-w-2xl">
          <span className="font-mono text-[9.5px] tracking-[0.4em] text-[#00E5FF] uppercase block mb-2 sm:mb-3 font-bold">
            05 // MASTER ARCHITECT PROTOCOL
          </span>
          <h3 className="font-serif text-3xl md:text-5xl tracking-tight leading-none text-gold-light font-light uppercase">
            6-Stage <span className="italic">Execution Process</span>
          </h3>
        </div>

        {/* Split screen layout matching exactly the visual flow in reference video process page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch border border-white/10 bg-studio-black/20 font-sans shadow-2xl relative">
          
          {/* Left Column: List of Stages with photos changing */}
          <div className="lg:col-span-7 bg-studio-dark/30 backdrop-blur-xl p-5 sm:p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
            <div>
              <div className="flex flex-col divide-y divide-white/[0.05]">
                {stages.map((stage, idx) => {
                  const isActive = idx === hoveredIdx;
                  const isMobileExpanded = expandedMobileStageIdx === idx;
                  const ActiveIcon = stage.icon;
                  return (
                    <div
                      key={stage.id}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onClick={() => {
                        setHoveredIdx(idx);
                        setExpandedMobileStageIdx(expandedMobileStageIdx === idx ? null : idx);
                      }}
                      className={`py-3.5 sm:py-5 transition-all duration-300 cursor-pointer flex flex-col group relative px-2 ${
                        isActive ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      {/* Row header content */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className={`font-mono text-xs font-semibold ${
                            isActive ? "text-gold-beige" : "text-gold-light/30"
                          }`}>
                            {stage.number}
                          </span>

                          <span className={`font-serif text-sm sm:text-base md:text-lg tracking-wide transition-all duration-300 ${
                            isActive ? "text-gold-beige font-normal pl-2" : "text-gold-sand/70 group-hover:text-gold-light"
                          }`}>
                            {stage.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <span className={`font-mono text-[7.5px] uppercase tracking-widest text-[#7F7A75] flex lg:hidden ${
                            isMobileExpanded ? "opacity-100" : "opacity-0 duration-300"
                          }`}>
                            {isMobileExpanded ? "OPENED" : "OPEN"}
                          </span>
                          <span className={`font-mono text-[7.5px] uppercase tracking-widest text-[#7F7A75] hidden lg:inline ${
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 duration-300"
                          }`}>
                            ACTIVATE
                          </span>
                          <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-500 ${
                            isMobileExpanded 
                              ? "text-gold-beige rotate-90 scale-110 font-bold" 
                              : isActive 
                                ? "text-gold-beige rotate-45 scale-110 font-bold" 
                                : "text-white/20 group-hover:text-gold-light/50"
                          }`} />
                        </div>
                      </div>

                      {/* Mobile Expandable content (only active on screens smaller than lg) */}
                      <AnimatePresence>
                        {isMobileExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="w-full overflow-hidden block lg:hidden"
                          >
                            <div className="pt-4 pb-5 px-4 bg-white/[0.03] border border-white/10 mt-3 flex flex-col gap-4 text-left">
                              <div className="flex gap-2 items-center text-gold-beige font-mono text-[9px] uppercase tracking-wider">
                                <ActiveIcon className="w-4 h-4 text-yellow-250" />
                                <span>ACTIVE PROTOCOL: STAGE {stage.number}</span>
                              </div>

                              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light text-justify">
                                {stage.details}
                              </p>

                              <div className="aspect-[16/10] w-full overflow-hidden border border-white/10 relative">
                                <img
                                  src={stage.imageUrl}
                                  alt={stage.title}
                                  className="w-full h-full object-cover opacity-90"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedMobileStageIdx(null);
                                }}
                                className="self-end px-3 py-1.5 bg-white text-black font-mono text-[8px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors duration-200 flex items-center gap-1 shadow-sm"
                              >
                                ✕ CLOSE CONTENT
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Micro blueprint specification line */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-6 mt-8 sm:mt-12 flex justify-between items-center text-[#7F7A75] font-mono text-[8px] tracking-[0.2em]">
              <span>ISO-14001 SITE WORK SYSTEM DESIGN</span>
              <span>VERIFIED STAGE // OBY-2026-P{hoveredIdx+1}</span>
            </div>
          </div>

          {/* Right Column: Grounded Solid Earth-Orange/Bronze backdrop box displaying active details */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#854D0E]/85 to-[#78350F]/85 backdrop-blur-xl border-l border-white/15 p-5 sm:p-8 md:p-12 flex flex-col justify-between text-white relative">
            {/* Glowing pattern elements */}
            <div className="absolute inset-0 bg-black/15 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            {/* Inner frame overlay */}
            <div className="absolute top-4 left-4 border-t border-l border-white/25 w-8 h-8 pointer-events-none" />
            <div className="absolute bottom-4 right-4 border-b border-r border-white/25 w-8 h-8 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-6 sm:gap-8">
              <div>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-white/70 uppercase block mb-1 sm:mb-2">
                  EXPERIENCE FOCUSED DESIGN
                </span>
                
                <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight mb-4 sm:mb-8">
                  Choreographing <br />
                  <span className="italic text-yellow-105 uppercase font-semibold">Your Vision</span>
                </h4>

                <div className="flex items-center gap-2.5 sm:gap-3 bg-white/10 border border-white/10 px-3 py-2.5 sm:px-4 sm:py-3.5 mb-4 sm:mb-6">
                  {/* Dynamic icon mapping */}
                  <StageIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-yellow-200" />
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-yellow-100 uppercase font-bold">
                    ACTIVE PROTOCOL: STAGE {stages[hoveredIdx].number}
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-yellow-50/90 leading-relaxed font-light mb-4 sm:mb-8 text-justify">
                  {stages[hoveredIdx].details}
                </p>
              </div>

              {/* Live matching schematic artwork */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest leading-none">
                  SCHEMATIC ATELIER VIEW
                </span>
                <div className="aspect-[16/9] w-full overflow-hidden border border-white/15 shadow-xl relative group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredIdx}
                      src={stages[hoveredIdx].imageUrl}
                      alt={stages[hoveredIdx].title}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover group-hover:scale-105 duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 font-mono text-[8.5px] uppercase tracking-wider bg-black/60 px-2 py-1 border border-white/10 text-white font-medium">
                    STAGE {stages[hoveredIdx].number} CONCEPT ARCHIVE
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Deep Dive: Architectural Commission Timeline & Stages */}
        <div className="mt-28 border-t border-white/[0.08] pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#7F7A75] uppercase font-bold">
                COMMISSION PLANNING TIMEFRAME
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E8DDCF] leading-tight">
                Landowner Onboarding <br />
                <span className="italic font-normal text-gold-beige text-glow">Milestone Plan</span>
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-gold-sand/70 max-w-sm font-light leading-relaxed">
              We guide our patrons cautiously through all planning stages. Precision requires time, coordination, and detail checkups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                phase: "PHASE A",
                title: "Feasibility Audit",
                weeks: "WEEKS 01 - 04",
                desc: "We run deep geologic core sample drills and microclimate shadow trajectory mapping directly at your land coordinate parameters to ensure optimal structural feasibility."
              },
              {
                phase: "PHASE B",
                title: "Parametric Draft",
                weeks: "WEEKS 05 - 12",
                desc: "Digital engineers construct highly complex CAD structures, testing passive cooling paths, material stress coefficients, and acoustic isolation membranes."
              },
              {
                phase: "PHASE C",
                title: "Aesthetic Sourcing",
                weeks: "WEEKS 13 - 18",
                desc: "Our creative directors travel alongside you to choose raw custom limestone boulders, handcut travertine blocks in Italy, and Shou Sugi Ban cedar in Japan."
              },
              {
                phase: "PHASE D",
                title: "Ground Command",
                weeks: "MONTHS 06 - 18",
                desc: "Atelier master builders direct local heritage masons to assemble structures directly under our close daily performance reviews and quality assurance codes."
              }
            ].map((p, idx) => (
              <div key={idx} className="p-6 bg-white/[0.02] backdrop-blur-md border border-white/15 flex flex-col justify-between hover:bg-white/[0.04] hover:border-gold-beige/40 transition-all duration-300 shadow-md">
                <div className="flex justify-between items-baseline border-b border-white/[0.05] pb-3 mb-4">
                  <span className="font-mono text-[9px] text-gold-beige font-semibold tracking-widest">{p.phase}</span>
                  <span className="font-mono text-[8px] text-[#7F7A75] tracking-tight">{p.weeks}</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#E8DDCF] mb-2 font-light tracking-wide">{p.title}</h4>
                  <p className="font-sans text-xs text-gold-sand/70 leading-relaxed font-light text-justify">{p.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/[0.04] text-[8px] font-mono text-[#7F7A75] uppercase tracking-wider text-right">
                  System Milestone APPROVED
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Quality Audit Safety Checklist and Verification Logs */}
        <div className="mt-28 border-t border-white/[0.08] pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 border border-white/10 bg-studio-dark/25 backdrop-blur-xl flex flex-col gap-4 shadow-md">
                <h4 className="font-mono text-[10px] font-bold text-gold-beige tracking-widest uppercase">
                  ✓ GEOTECHNICAL CORE INTEGRITY
                </h4>
                <p className="font-sans text-xs text-gold-sand/80 leading-relaxed font-light text-justify">
                  Every estate is modeled recursively using soil shear-tests and seismic resilience factors. Foundation post-tension cables are locked only after our engineers verify 100% load stress stability.
                </p>
              </div>

              <div className="p-6 border border-white/10 bg-studio-dark/25 backdrop-blur-xl flex flex-col gap-4 shadow-md">
                <h4 className="font-mono text-[10px] font-bold text-gold-beige tracking-widest uppercase">
                  ✓ CONCRETE SLUMP FLOW INSPECTION
                </h4>
                <p className="font-sans text-xs text-gold-sand/80 leading-relaxed font-light text-justify">
                  We test chemical slump factors directly during fluid concrete casting. Specimen cubes are pressure-ruptured in laboratories after twenty-eight days to protect your landmark against premature wear.
                </p>
              </div>

              <div className="p-6 border border-white/10 bg-studio-dark/25 backdrop-blur-xl flex flex-col gap-4 shadow-md">
                <h4 className="font-mono text-[10px] font-bold text-gold-beige tracking-widest uppercase">
                  ✓ WOOD MOISTURE COEFFICIENT ANALYSIS
                </h4>
                <p className="font-sans text-xs text-gold-sand/80 leading-relaxed font-light text-justify">
                  Timber elements must reach precise low humidity coefficients before woodsmith interlocking assemblies. This halts natural dry-shrinking or joint warping during seasonal climate changes.
                </p>
              </div>

              <div className="p-6 border border-white/10 bg-studio-dark/25 backdrop-blur-xl flex flex-col gap-4 shadow-md">
                <h4 className="font-mono text-[10px] font-bold text-gold-beige tracking-widest uppercase">
                  ✓ ACOUSTICAL SOUND DECAY AUDITS
                </h4>
                <p className="font-sans text-xs text-gold-sand/80 leading-relaxed font-light text-justify">
                  We run spatial sonic decibel sweeps inside key master retreats. Integrated mineral acoustic fiber traps isolate sounds and ensure your residential sanctuary stays entirely tranquil.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#7F7A75] uppercase font-bold">
                RIGOROUS VERIFICATION
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E8DDCF] leading-tight">
                Zero Defect <br />
                <span className="italic font-normal text-gold-beige text-glow">Pre-Flight Policy</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gold-sand/85 leading-relaxed font-light text-justify">
                Because we shape high-end brand spaces and hospitality sanctuaries designed to endure for decades, our studio enforces a strict quality policy across every parameter. BUILD THE MATRIX Pvt.  Ltd. works exclusively alongside premium, highly qualified licensed artisans.
              </p>
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] font-mono text-[8px] text-amber-500/90 tracking-widest">
                WARNING: RANDOM ON-SITE MIX AUDITS CARRIED OUT WEEKLY WITHOUT EXCEPTION.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
