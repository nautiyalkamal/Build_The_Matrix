import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Globe, ShieldCheck, UserCheck, CheckCircle2 } from "lucide-react";
import { TeamMember } from "../types";

export default function Studio() {
  const [activeMemberIdx, setActiveMemberIdx] = useState(0);

  const team: TeamMember[] = [
    {
      id: "member-1",
      name: "Kamal Nautiyal",
      role: "Founder / Principal Architect",
      bio: "leads BUILD THE MATRIX with a vision centered around modern architecture, intelligent BIM systems, and immersive design storytelling. His approach combines creativity, technical detailing, and cinematic spatial experiences to craft architecture that feels both functional and emotionally engaging.",
      imageUrl: "https://i.ibb.co/N6Zwzd1j/file-0000000068807207bbda431bc4791212-2.jpg",
      quote: "Architecture is not just about structures — it is about creating experiences people remember.",
      specialities: [
        "Architectural Design",
        "BIM Coordination",
        "Interior Concepts",
        "3D Visualization",
        "Modern Luxury Spaces",
        "Spatial Branding"
      ]
    },
    {
      id: "member-2",
      name: "BIM Design Team",
      role: "Architectural Visualization & Coordination",
      bio: "Our dedicated BIM specialists offer seamless model coordination, conflict resolution, construction detail tracking, and Revit system integration. We bridge the gap between creative geometry and structural accuracy.",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop",
      quote: "Precision-driven workflows ensure every dimension of the model correlates perfectly with the physical space."
    },
    {
      id: "member-3",
      name: "Interior Design Department",
      role: "Spatial Styling & Luxury Interiors",
      bio: "We curate premium interiors that balance bespoke textures, custom lighting schemes, carefully modeled materials, and high-end modern furniture integrations to craft comfortable, memorable experiences.",
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
      quote: "We don't just decorate spaces — we sculpt physical coordinates that evoke tranquility."
    },
    {
      id: "member-4",
      name: "Visualization Team",
      role: "3D Rendering & Cinematic Presentations",
      bio: "A department of creative visualizers converting complex technical layouts into spectacular cinematic renderings, real-time walk-throughs, and highly authentic lighting simulations.",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      quote: "Immersive renders tell stories, allowing partners to experience their future space today."
    },
    {
      id: "member-5",
      name: "Technical Coordination Team",
      role: "Construction Documentation & BIM Workflows",
      bio: "Managing complex drawings, specifications, local regulatory code checks, and structural BIM workflows to guarantee flawless project delivery across all development stages.",
      imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
      quote: "Organized documentation is the hidden blueprint behind every lasting landmark."
    },
    {
      id: "member-6",
      name: "Landscape & Urban Design",
      role: "Outdoor & Environmental Planning",
      bio: "Integrating modern buildings with surrounding nature, pedestrian systems, active green spaces, and sustainable exterior planning to bring spatial balance.",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
      quote: "An elite architectural structure must always complement the organic geometry of its environment."
    }
  ];

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-gold-sand text-studio-black min-h-screen relative">
      {/* Structural layout outlines indicating geometric plans */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-studio-black/[0.1]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
              01 // THE STUDIO
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-studio-black leading-tight">
              Designing Spaces <br />
              Beyond <span className="italic">Imagination</span>
            </h2>
          </div>
          <div className="lg:col-span-7 font-sans text-sm sm:text-base text-studio-charcoal/80 font-light max-w-xl leading-relaxed">
            <p className="mb-4">
              BUILD THE MATRIX is a contemporary architectural and BIM design studio focused on creating immersive, functional, and visually timeless spaces. Our practice combines architecture, interior design, BIM coordination, and cinematic visualization to deliver projects that balance creativity with technical precision.
            </p>
            <p className="mb-6">
              We collaborate with homeowners, developers, consultants, and brands to transform ideas into modern spatial experiences through innovative workflows, sustainable thinking, and detail-driven execution.
            </p>
            <div className="border-t border-studio-black/10 pt-4 mt-4">
              <span className="font-mono text-[10px] font-bold text-gold-bronze uppercase block mb-2">
                Our Design Philosophy
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-sans text-xs text-studio-charcoal/90">
                <li className="flex items-center gap-2">• Clean architectural geometries</li>
                <li className="flex items-center gap-2">• Intelligent spatial planning</li>
                <li className="flex items-center gap-2">• Minimal luxury aesthetics</li>
                <li className="flex items-center gap-2">• BIM-integrated workflows</li>
                <li className="flex items-center gap-2">• Cinematic visual storytelling</li>
                <li className="flex items-center gap-2">• Sustainable modern design principles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Studio Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch border-t border-b border-studio-black/[0.12] py-12 mb-20 bg-studio-black/[0.02]">
          {[
            { metric: "250+ M²", title: "Active BIM & Architectural Design Development", sub: "Residential, commercial, and visualization projects in progress." },
            { metric: "Est. 2026", title: "Founded With A Vision For Modern Spatial Innovation", sub: "Built on creativity, technology, and architectural excellence." },
            { metric: "BIM Integrated", title: "Advanced Revit & Visualization Workflow", sub: "Smart coordination systems for accurate and efficient project execution." },
            { metric: "Sustainable Focus", title: "Modern Environmentally Conscious Solutions", sub: "Integrating natural lighting, efficient planning, and sustainable materials." },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2 justify-between p-4 bg-white/[0.2] hover:bg-white/[0.5] duration-300">
              <span className="font-serif text-2xl sm:text-3xl text-studio-black font-light leading-none text-glow">
                {stat.metric}
              </span>
              <div className="flex flex-col mt-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-studio-charcoal leading-snug">
                  {stat.title}
                </span>
                <span className="font-sans text-[10px] text-studio-gray mt-1 leading-snug font-light">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Meet the Team Panel - Matches exact hover-expand interactive display from visual references */}
        <div>
          <div className="border-b border-studio-black/[0.12] pb-6 mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-2 font-semibold">
              02 // DIRECTORY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-studio-black">
              Meet The Creative Minds Behind <span className="italic">BUILD THE MATRIX</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[500px]">
            {/* Left Hand: Interactive Hover Name Column */}
            <div className="lg:col-span-6 flex flex-col justify-start border-r border-studio-black/[0.08] pr-6 lg:pr-12">
              <ul className="flex flex-col divide-y divide-studio-black/[0.06]">
                {team.map((member, idx) => {
                  const isActive = idx === activeMemberIdx;
                  return (
                    <li
                      key={member.id}
                      className="py-4 cursor-pointer relative"
                      onMouseEnter={() => setActiveMemberIdx(idx)}
                    >
                      {/* Active Background highlight indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTeamBg"
                          className="absolute inset-0 bg-white/40 -z-10 px-4"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div className="flex justify-between items-center group px-2">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[10px] tracking-widest text-gold-bronze font-semibold">
                            0{idx + 1}
                          </span>
                          <span className={`font-serif text-xl sm:text-2xl tracking-wide duration-300 ${
                            isActive ? "text-studio-black font-medium pl-2" : "text-studio-gray/80 hover:text-studio-black"
                          }`}>
                            {member.name}
                          </span>
                        </div>

                        <span className="font-mono text-[9px] uppercase text-[#7c7267] tracking-wider text-right pr-2">
                          {member.role.split(" / ")[0].split(" — ")[0]}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right Hand: Dynamic Photographic Portrait, Bio and Quote (matches Hover change) */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 bg-white/[0.3] border border-studio-black/[0.05] relative shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMemberIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-between gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Portrait Image */}
                    <div className="md:col-span-5 relative aspect-[3/4] overflow-hidden bg-studio-charcoal/20 border border-studio-black/10 shadow-md">
                      <img
                        src={team[activeMemberIdx].imageUrl}
                        alt={team[activeMemberIdx].name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-studio-black/20 to-transparent" />
                    </div>

                    {/* Member Credentials */}
                    <div className="md:col-span-7 flex flex-col">
                      <h4 className="font-serif text-2xl font-light text-studio-black leading-none">
                        {team[activeMemberIdx].name}
                      </h4>
                      <span className="font-mono text-[10.5px] tracking-widest text-[#B45309] font-semibold uppercase mt-3 leading-none border-b border-studio-black/[0.08] pb-3.5">
                        {team[activeMemberIdx].role}
                      </span>
                      
                      <p className="mt-4 font-sans text-xs sm:text-sm text-studio-charcoal/85 leading-relaxed">
                        <span className="font-serif italic font-semibold">{team[activeMemberIdx].name}</span> {team[activeMemberIdx].bio}
                      </p>

                      {team[activeMemberIdx].specialities && (
                        <div className="mt-4 pt-4 border-t border-studio-black/[0.06]">
                          <span className="font-mono text-[9px] font-bold text-studio-black tracking-wider block uppercase mb-2">Specializing in:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {team[activeMemberIdx].specialities.map((spec, sidx) => (
                              <span key={sidx} className="font-sans text-[11px] text-studio-charcoal/95 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-[#B45309]" />
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Philosophic Stamp & Social Quote */}
                  <div className="pt-6 border-t border-studio-black/[0.1] mt-4 flex flex-col justify-end gap-4">
                    <p className="font-serif text-sm sm:text-base italic text-studio-black font-light leading-relaxed">
                      “{team[activeMemberIdx].quote}”
                    </p>

                    <div className="flex justify-between items-center bg-white/40 px-4 py-3 border border-studio-black/[0.04] rounded-none mt-2">
                      <span className="font-mono text-[8px] text-[#7F7A75] tracking-widest">
                        SECURE PARTNERSHIP CODE: OBY-REPRESENTATIVE
                      </span>
                      <div className="flex gap-3 text-studio-charcoal/65">
                        <Linkedin className="w-3.5 h-3.5 hover:text-gold-bronze duration-300 cursor-pointer" />
                        <Mail className="w-3.5 h-3.5 hover:text-gold-bronze duration-300 cursor-pointer" />
                        <Globe className="w-3.5 h-3.5 hover:text-gold-bronze duration-300 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3. Deep Dive: BUILD THE MATRIX Creative Workspace */}
        <div className="mt-28 border-t border-studio-black/[0.12] pt-20">
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
            03 // DESIGN STUDIO
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black leading-tight">
                BUILD THE MATRIX <br />
                <span className="italic font-normal text-gold-bronze">Creative Workspace</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-studio-charcoal/85 leading-relaxed font-light text-justify">
                Our studio operates as a modern architectural and visualization workspace where ideas evolve through collaboration, technology, and creative experimentation.
              </p>
              
              <div className="border-t border-b border-studio-black/10 py-4 my-2">
                <span className="font-mono text-[10px] font-bold text-gold-bronze uppercase block mb-2">
                  Designed as a hybrid architectural lab, the studio integrates:
                </span>
                <ul className="flex flex-col gap-1.5 font-sans text-xs text-studio-charcoal/90 pl-3 list-disc">
                  <li>BIM workflows</li>
                  <li>3D visualization systems</li>
                  <li>Material exploration</li>
                  <li>Interior concept development</li>
                  <li>Architectural presentations</li>
                  <li>Digital rendering environments</li>
                </ul>
              </div>

              <div className="p-4 bg-white/40 border border-studio-black/[0.06] flex flex-col gap-2 font-mono text-[9px] text-[#7c7267]">
                <div className="flex justify-between">
                  <span>REGIONAL HUB</span>
                  <span className="text-studio-black font-semibold">WEST COAST HQ</span>
                </div>
                <div className="flex justify-between">
                  <span>WORKFLOW MODE</span>
                  <span className="text-studio-black font-semibold">BIM INTEGRATED</span>
                </div>
                <div className="flex justify-between">
                  <span>LAB STANDARDS</span>
                  <span className="text-studio-black font-semibold">CINEMATIC REALISM</span>
                </div>
              </div>
            </div>

            {/* Architectural details cards with grid representation */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white/50 border border-studio-black/[0.08] flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-studio-black flex items-center justify-center text-gold-light">
                  <span className="font-mono text-[10px] font-bold">01</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#B45309] block -mb-2">DESIGN WORKFLOW</span>
                <h4 className="font-serif text-lg text-studio-black">BIM & Visualization Lab</h4>
                <p className="font-sans text-[11px] text-studio-charcoal/70 leading-relaxed font-light mb-1">
                  Our digital workspace is equipped for:
                </p>
                <ul className="font-sans text-[11px] text-studio-charcoal/90 pl-4 list-disc space-y-1 -mt-2 leading-relaxed font-light">
                  <li>Revit-based BIM coordination</li>
                  <li>High-detail 3D modeling</li>
                  <li>Photorealistic rendering</li>
                  <li>Construction documentation</li>
                  <li>Architectural animation workflows</li>
                </ul>
                <p className="font-sans text-xs text-studio-charcoal/80 leading-relaxed font-light text-justify pt-2 border-t border-studio-black/5 mt-auto">
                  Every project is developed through a precise and collaborative design process ensuring technical accuracy and aesthetic excellence.
                </p>
              </div>

              <div className="p-6 bg-white/50 border border-studio-black/[0.08] flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-studio-black flex items-center justify-center text-gold-light">
                  <span className="font-mono text-[10px] font-bold">02</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#B45309] block -mb-2">MATERIAL & CONCEPT LIBRARY</span>
                <h4 className="font-serif text-lg text-studio-black">Architectural Material Exploration</h4>
                <p className="font-sans text-[11px] text-studio-charcoal/70 leading-relaxed font-light mb-1">
                  Clients and collaborators can explore:
                </p>
                <ul className="font-sans text-[11px] text-studio-charcoal/90 pl-4 list-disc space-y-1 -mt-2 leading-relaxed font-light">
                  <li>Material palettes</li>
                  <li>Lighting concepts</li>
                  <li>Texture studies</li>
                  <li>Spatial mockups</li>
                  <li>Interior moodboards</li>
                  <li>Modern façade inspirations</li>
                </ul>
                <p className="font-sans text-xs text-studio-charcoal/80 leading-relaxed font-light text-justify pt-2 border-t border-studio-black/5 mt-auto">
                  Each project begins with visual storytelling and conceptual experimentation before moving into technical development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Strategic Governance and Structural Standards */}
        <div className="mt-28 border-t border-studio-black/[0.12] pt-20">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
              04 // DESIGN PRINCIPLES
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black">
              Building Timeless <br />
              <span className="italic font-normal text-gold-bronze">Architectural Experiences</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "BIM PRECISION STANDARDS",
                desc: "Every project is developed using coordinated BIM systems to ensure efficient planning, technical clarity, and smooth project execution."
              },
              {
                title: "MODERN MINIMAL DESIGN",
                desc: "We focus on clean geometries, balanced proportions, natural lighting, and elegant material combinations to create timeless spaces."
              },
              {
                title: "VISUAL STORYTELLING APPROACH",
                desc: "Our visualization process transforms concepts into cinematic architectural presentations with immersive realism and emotional depth."
              },
              {
                title: "SUSTAINABLE THINKING",
                desc: "We integrate sustainable planning strategies including daylight optimization, efficient circulation, and environmentally conscious material usage."
              },
              {
                title: "DETAIL-DRIVEN EXECUTION",
                desc: "From conceptual sketches to final visualization, every element is crafted with precision, consistency, and architectural intent."
              }
            ].map((gov, idx) => (
              <div key={idx} className="p-5 bg-white/30 border border-studio-black/[0.05] hover:bg-white/60 transition-colors duration-300 flex flex-col gap-3 h-full">
                <div className="w-6 h-6 rounded-full bg-studio-black/10 flex items-center justify-center font-mono text-[9px] font-bold text-studio-black">
                  0{idx + 1}
                </div>
                <h4 className="font-mono text-[10.5px] font-bold text-studio-black tracking-wider leading-snug uppercase">
                  {gov.title}
                </h4>
                <p className="font-sans text-[11px] text-studio-charcoal/80 leading-relaxed font-light">
                  {gov.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
