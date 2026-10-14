import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Globe, ShieldCheck, UserCheck, CheckCircle2, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { TeamMember } from "../types";

export default function Studio() {
  const [activeMemberIdx, setActiveMemberIdx] = useState(0);
  const [expandedMobileMemberIdx, setExpandedMobileMemberIdx] = useState<number | null>(null);
  const [activeMobileGeometryIdx, setActiveMobileGeometryIdx] = useState<number | null>(null);

  const workspaceCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = workspaceCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize && entry.contentBoxSize[0]) {
          width = canvas.width = entry.contentBoxSize[0].inlineSize;
          height = canvas.height = entry.contentBoxSize[0].blockSize;
        } else {
          width = canvas.width = entry.contentRect.width;
          height = canvas.height = entry.contentRect.height;
        }
      }
    });
    resizeObserver.observe(parent);

    // Particles representing architectural coordinates stars, matching preloader config (white & electric blue)
    const particles: { x: number; y: number; size: number; speed: number; alpha: number; isElectric: boolean }[] = [];
    const count = 35; // optimal floating particle density for this custom mobile layout section
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        isElectric: Math.random() < 0.35 // 35% electric blue dust particles matching Preloader.tsx config
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        if (p.isElectric) {
          ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  const studioImages = [
    "https://i.ibb.co/Kx9sXRMQ/file-000000000f04720b8ec6cbad0f7ac4ac.png",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200",
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % studioImages.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  const studioImage = studioImages[currentSlide];

  const mobileGeometries = [
    {
      title: "Clean Architectural Geometries",
      desc: "Dynamic layout generation utilizing pure volumetric massing, sculptural forms, and pristine scale relationships tailored for luxury spatial identity. Projects utilize strict geometric boundaries to ensure structural and visual harmony."
    },
    {
      title: "Coordinates-Based BIM Modeling",
      desc: "Centimeter-precision model alignment integrating accurate geolocation data, layered architectural coordinates, and real-time clash detection vectors. Every coordinate is meticulously checked and cross-referenced."
    },
    {
      title: "Custom Luxury Interior Concepts",
      desc: "Sophisticated material selection boards combining bespoke millwork systems, light-transmission calculations, material tolerances, and ultra-high-end marble or timber layouts."
    },
    {
      title: "Real-Time Cinematic Simulations",
      desc: "High-fidelity immersive render walkthroughs presenting natural atmospheric light scattering, customized day-to-night lighting curves, and physically correct material reflections."
    },
    {
      title: "Sustainable Facade Workflows",
      desc: "Thermal gain calculations, optimized glazing matrices, high-performance shading strategies, and intelligent material integration reducing lifecycle carbon footprint."
    },
    {
      title: "Tactile Façade & Lighting Labs",
      desc: "Hands-on prototype evaluation examining tangible facade panels, architectural model scaled lights, LED kelvin studies, and real material textures under varying lumens."
    }
  ];

  const team: TeamMember[] = [
    {
      id: "member-1",
      name: "Kamal Nautiyal",
      role: "Founder / Principal Architect",
      bio: "leads BUILD THE MATRIX Pvt.  Ltd. with a vision centered around modern architecture, intelligent BIM systems, and immersive design storytelling. His approach combines creativity, technical detailing, and cinematic spatial experiences to craft architecture that feels both functional and emotionally engaging.",
      imageUrl: "https://i.ibb.co/fY3yy94y/new.jpg",
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
      imageUrl: "https://images.unsplash.com/photo-1497215122487-ee34e0fa4169?q=80&w=600&auto=format&fit=crop",
      quote: "Precision-driven workflows ensure every dimension of the model correlates perfectly with the physical space."
    },
    {
      id: "member-3",
      name: "Interior Design Department",
      role: "Spatial Styling & Luxury Interiors",
      bio: "We curate premium interiors that balance bespoke textures, custom lighting schemes, carefully modeled materials, and high-end modern furniture integrations to craft comfortable, memorable experiences.",
      imageUrl: "https://images.unsplash.com/photo-1618219740975-d41987636d4a?q=80&w=600&auto=format&fit=crop",
      quote: "We don't just decorate spaces — we sculpt physical coordinates that evoke tranquility."
    },
    {
      id: "member-4",
      name: "Visualization Team",
      role: "3D Rendering & Cinematic Presentations",
      bio: "A department of creative visualizers converting complex technical layouts into spectacular cinematic renderings, real-time walk-throughs, and highly authentic lighting simulations.",
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
      quote: "Immersive renders tell stories, allowing partners to experience their future space today."
    },
    {
      id: "member-5",
      name: "Technical Coordination Team",
      role: "Construction Documentation & BIM Workflows",
      bio: "Managing complex drawings, specifications, local regulatory code checks, and structural BIM workflows to guarantee flawless project delivery across all development stages.",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
      quote: "Organized documentation is the hidden blueprint behind every lasting landmark."
    },
    {
      id: "member-6",
      name: "Landscape & Urban Design",
      role: "Outdoor & Environmental Planning",
      bio: "Integrating modern buildings with surrounding nature, pedestrian systems, active green spaces, and sustainable exterior planning to bring spatial balance.",
      imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop",
      quote: "An elite architectural structure must always complement the organic geometry of its environment."
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-20 md:pb-24 bg-gold-sand text-studio-black min-h-screen relative">
      {/* Structural layout outlines indicating geometric plans */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-studio-black/[0.1]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="w-full border-b-2 border-studio-black pb-2 mb-2 sm:mb-3 max-md:mt-5 max-md:pb-1.5 max-md:mb-1.5">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-black uppercase block font-semibold">
            02 // THE STUDIO
          </span>
        </div>

        {/* Headline right below the line with minimal gap */}
        <div className="mb-4 sm:mb-6">
          <span className="font-serif text-xl sm:text-4xl lg:text-5xl tracking-tight text-studio-black leading-tight block">
            Designing Spaces Beyond <span className="italic">Imagination</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 sm:mb-14 lg:mb-20 items-stretch">
          {/* Left Hand: Rectangular Image (Slideshow Framework) */}
          <div 
            className="lg:col-span-4 relative group overflow-hidden bg-white/45 backdrop-blur-md border border-studio-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.02)] min-h-[300px] lg:min-h-full flex flex-col items-center justify-center transition-all duration-500 rounded-none animate-fade-in"
          >
            {/* Base Image with Crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={studioImages[currentSlide]}
                alt="Studio Interior Design"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Subtle overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />

            {/* Navigation arrows overlay */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide((prev) => (prev - 1 + studioImages.length) % studioImages.length);
                }}
                className="w-8 h-8 rounded-full bg-studio-black/35 hover:bg-studio-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/10 active:scale-95 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide((prev) => (prev + 1) % studioImages.length);
                }}
                className="w-8 h-8 rounded-full bg-studio-black/35 hover:bg-studio-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/10 active:scale-95 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot indicators overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {studioImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide 
                      ? "bg-white w-4" 
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Subtle tech border overlay when hovering */}
            <div className="absolute inset-2 border border-white/0 transition-colors duration-500 pointer-events-none z-10" />
          </div>

          {/* Middle: Studio Core Statement & Philosophy */}
          <div className="lg:col-span-4 font-sans text-sm sm:text-base text-studio-charcoal/80 font-light leading-relaxed flex flex-col justify-center">
            <p className="mb-4 text-xs sm:text-sm">
              BUILD THE MATRIX Pvt.  Ltd. is a contemporary architectural and BIM design studio focused on creating immersive, functional, and visually timeless spaces. Our practice combines architecture, interior design, BIM coordination, and cinematic visualization to deliver projects that balance creativity with technical precision.
            </p>
            <p className="mb-4 text-xs sm:text-sm">
              We collaborate with homeowners, developers, and brands to transform ideas into modern spatial experiences through innovative and detail-driven execution.
            </p>
            <div className="border-t border-studio-black/10 pt-4 mt-2">
              <span className="font-mono text-[10px] font-bold text-gold-bronze uppercase block mb-2">
                Our Design Philosophy
              </span>
              <ul className="grid grid-cols-1 gap-y-1 font-sans text-[11px] text-studio-charcoal/90">
                <li className="flex items-center gap-1.5">• Clean architectural geometries</li>
                <li className="flex items-center gap-1.5">• Intelligent spatial planning</li>
                <li className="flex items-center gap-1.5">• Minimal luxury aesthetics</li>
                <li className="flex items-center gap-1.5">• BIM-integrated workflows</li>
                <li className="flex items-center gap-1.5">• Cinematic visual storytelling</li>
              </ul>
            </div>
          </div>

          {/* Right Hand: Intelligent Design Ecosystem Card */}
          <div className="lg:col-span-4 relative group overflow-hidden bg-white/45 backdrop-blur-md border border-studio-black/10 p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:bg-white/70 hover:shadow-[0_20px_45px_rgba(25,25,25,0.03)] rounded-none animate-fade-in [animation-delay:150ms]">
            <div>
              <div className="w-fit border border-studio-black/10 px-2.5 py-1 mb-4">
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-studio-black/60 uppercase block font-semibold">
                  INTELLIGENT ECOSYSTEM
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-studio-black font-semibold leading-snug mb-3">
                Intelligent Design Ecosystem
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-studio-charcoal/85 font-light leading-relaxed mb-6">
                Blending architecture, BIM innovation, visualization, and spatial strategy into a seamless creative workflow that transforms concepts into immersive, technically refined, and future-ready architectural experiences.
              </p>
            </div>
            
            {/* Subtle premium corner indicator ornament */}
            <div className="border-t border-studio-black/10 pt-4 mt-auto">
              <span className="font-mono text-[8px] text-studio-black/45 tracking-widest block uppercase">
                // SYSTEM MATRIX ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Studio Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch border-t border-b border-studio-black/[0.12] py-6 sm:py-12 mb-10 sm:mb-20">
          {[
            { metric: "250+ M²", title: "Active BIM & Architectural Design Development", sub: "Residential, commercial, and visualization projects in progress." },
            { metric: "Est. 2020", title: "Founded With A Vision For Modern Spatial Innovation", sub: "Built on creativity, technology, and architectural excellence." },
            { metric: "BIM Integrated", title: "Advanced Revit & Visualization Workflow", sub: "Smart coordination systems for accurate and efficient project execution." },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2 justify-between p-3 sm:p-4 bg-white/45 backdrop-blur-md border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(15,15,15,0.02)] hover:bg-white/70 duration-300">
              <span className="font-serif text-xl sm:text-3xl text-studio-black font-light leading-none text-glow">
                {stat.metric}
              </span>
              <div className="flex flex-col mt-1 sm:mt-2">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-studio-charcoal leading-snug">
                  {stat.title}
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] text-studio-gray mt-1 leading-snug font-light">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}

          {/* New matching Intelligent Design Ecosystem card */}
          <div className="flex flex-col gap-2 justify-between p-3 sm:p-4 bg-white/45 backdrop-blur-md border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(15,15,15,0.02)] hover:bg-white/70 duration-300">
            <span className="font-serif text-base sm:text-lg text-studio-black font-semibold leading-tight text-glow mt-1 sm:mt-2">
              Intelligent Design Ecosystem
            </span>
            <div className="flex flex-col mt-1 sm:mt-2">
              <p className="font-sans text-[9px] sm:text-[10px] text-studio-charcoal leading-relaxed font-light">
                Blending architecture, BIM innovation, visualization, and spatial strategy into a seamless creative workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the Team Panel - Matches exact hover-expand interactive display from visual references */}
        <div className="max-md:mt-6 transition-all duration-300">
          {/* Mobile Heading: Placed above the separating boundary line with compact gap */}
          <div className="block md:hidden mb-2.5">
            <span className="font-mono text-[9px] tracking-[0.4em] text-studio-black uppercase block mb-1 font-bold border-b-2 border-studio-black pb-1.5">
              # // TEAM ARCHITECT DIRECTORY
            </span>
            <h3 className="font-serif text-xl font-light text-studio-black leading-tight">
              Meet The Creative Minds Behind <span className="italic">BUILD THE MATRIX Pvt.  Ltd.</span>
            </h3>
          </div>

          <div className="border-b border-studio-black/[0.12] max-md:border-t max-md:border-studio-black/10 max-md:pt-4 pb-4 sm:pb-6 mb-6 max-md:mb-2 sm:mb-12">
            {/* Desktop Heading: Preserved exactly as before */}
            <div className="hidden md:block">
              <span className="font-mono text-[10px] tracking-[0.4em] text-studio-black uppercase block mb-2 font-bold border-b-2 border-studio-black pb-2">
                # // TEAM ARCHITECT DIRECTORY
              </span>
              <h3 className="font-serif text-3xl font-light text-studio-black lg:tracking-wide">
                Meet The Creative Minds Behind <span className="italic">BUILD THE MATRIX Pvt.  Ltd.</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch min-h-0 lg:min-h-[500px]">
            {/* Left Hand: Interactive Hover Name Column */}
            <div className="lg:col-span-6 flex flex-col justify-start lg:border-r border-studio-black/[0.08] pr-0 lg:pr-12">
              <ul className="flex flex-col divide-y divide-studio-black/[0.06]">
                {team.map((member, idx) => {
                  const isActive = idx === activeMemberIdx;
                  const isMobileExpanded = idx === expandedMobileMemberIdx;
                  return (
                    <li
                      key={member.id}
                      className="py-4 max-md:py-[18px] cursor-pointer relative focus:outline-none transition-all duration-300"
                      onMouseEnter={() => setActiveMemberIdx(idx)}
                      onClick={() => {
                        setActiveMemberIdx(idx);
                        setExpandedMobileMemberIdx(prev => prev === idx ? null : idx);
                      }}
                    >
                      {/* Active Background highlight indicator (Desktop) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTeamBg"
                          className="absolute inset-0 bg-white/50 backdrop-blur-sm border-l-2 border-gold-bronze -z-10 px-4 shadow-sm hidden lg:block"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      {/* Active Background highlight indicator (Mobile) */}
                      {isMobileExpanded && (
                        <motion.div
                          layoutId="activeTeamBgMobile"
                          className="absolute inset-0 bg-white/50 backdrop-blur-sm border-l-2 border-gold-bronze -z-10 px-4 shadow-sm block lg:hidden"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div className="flex justify-between items-center group px-2">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[10px] tracking-widest text-black md:text-gold-bronze font-semibold">
                            0{idx + 1}
                          </span>
                          <span className={`font-serif text-xl sm:text-2xl tracking-wide duration-300 text-black md:text-studio-gray/80 ${
                            isActive 
                              ? "lg:text-studio-black lg:font-medium lg:pl-2 md:pl-0" 
                              : "md:hover:text-studio-black"
                          } ${
                            isMobileExpanded 
                              ? "md:text-studio-black font-medium pl-2" 
                              : ""
                          }`}>
                            {member.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[9px] uppercase tracking-wider text-right duration-300 text-black md:text-[#7c7267] ${isMobileExpanded ? "font-semibold text-white" : ""}`}>
                            {member.role.split(" / ")[0].split(" — ")[0]}
                          </span>
                          <div className={`w-6 h-6 border transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm ${
                            isMobileExpanded || isActive
                              ? "border-amber-400 bg-amber-400 text-black shadow-[0_2px_8px_rgba(251,191,36,0.3)]" 
                              : "border-black bg-black text-white hover:bg-neutral-800"
                          }`}>
                            {isMobileExpanded || isActive ? (
                              <Minus className="w-2.5 h-2.5" />
                            ) : (
                              <Plus className="w-2.5 h-2.5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Inline Details Card for responsive flow (connected immediately to the active member button) */}
                      <AnimatePresence>
                        {isMobileExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 15 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 15 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="mt-6 mb-4 block lg:hidden border border-studio-black/10 bg-white/75 backdrop-blur-xl p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06)] rounded-none overflow-hidden"
                          >
                            <div className="flex flex-col gap-4">
                              {/* Mobile Portrait with subtle overlay */}
                              <div className={`relative aspect-[4/3] w-full bg-studio-charcoal/5 border border-studio-black/10 shadow-md rounded-none group-active:scale-[0.99] transition-transform duration-300 ${!(member.imageUrl.includes("i.ibb.co") || member.id === 'member-4') ? 'overflow-hidden' : ''}`}>
                                <img
                                  src={member.imageUrl}
                                  alt={member.name}
                                  className={`w-full h-full ${
                                    (member.imageUrl.includes("i.ibb.co") || member.id === 'member-4')
                                      ? 'object-contain object-center scale-100 p-1'
                                      : member.id === 'member-1'
                                        ? 'object-cover object-[center_20%]'
                                        : 'object-cover object-center'
                                  }`}
                                  referrerPolicy="no-referrer"
                                />
                                {!(member.imageUrl.includes("i.ibb.co") || member.id === 'member-4') && (
                                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/20 to-transparent pointer-events-none" />
                                )}
                              </div>

                              {/* Mobile Credentials */}
                              <div className="flex flex-col">
                                <span className="font-mono text-[9.5px] tracking-widest text-[#B45309] font-bold uppercase leading-normal border-b border-studio-black/[0.08] pb-2 mb-2 block">
                                  {member.role}
                                </span>
                                <p className="font-sans text-xs sm:text-sm text-studio-charcoal/85 leading-relaxed">
                                  <span className="font-serif italic font-semibold text-studio-black">{member.name}</span> {member.bio}
                                </p>

                                {member.specialities && (
                                  <div className="mt-5 border-t border-studio-black/[0.06] pt-4">
                                    <span className="font-mono text-[8.5px] font-bold text-studio-black tracking-wider block uppercase mb-2">Specializing in:</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                      {member.specialities.map((spec, sidx) => (
                                        <span key={sidx} className="font-sans text-[11px] text-studio-charcoal/95 flex items-center gap-1.5">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B45309]" />
                                          {spec}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Mobile Quote */}
                              <div className="border-l-2 border-gold-bronze pl-4.5 py-1.5 text-left bg-studio-black/[0.02] pr-2">
                                <p className="font-serif text-[12.5px] italic text-studio-black/90 leading-relaxed">
                                  “{member.quote}”
                                </p>
                              </div>

                              {/* Mobile Social Contact icons */}
                              <div className="flex justify-between items-center bg-white/60 backdrop-blur-md px-3.5 py-2.5 border border-white/95 rounded-none shadow-sm mt-2">
                                <span className="font-mono text-[7px] text-[#7F7A75] tracking-widest uppercase font-semibold">
                                  SECURE RECOGNITION REGISTRAR
                                </span>
                                <div className="flex gap-3 text-studio-charcoal/70">
                                  <Linkedin className="w-4 h-4 hover:text-gold-bronze duration-305 cursor-pointer" />
                                  <Mail className="w-4 h-4 hover:text-gold-bronze duration-305 cursor-pointer" />
                                  <Globe className="w-4 h-4 hover:text-gold-bronze duration-305 cursor-pointer" />
                                </div>
                              </div>

                              {/* Mobile Close Button — Beautifully stretched with elegant spacing to create the requested custom gap */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Avoid triggering parent row click/toggle
                                  setExpandedMobileMemberIdx(null);
                                }}
                                className="w-full mt-7 py-3.5 bg-black hover:bg-neutral-900 active:bg-neutral-950 text-white font-mono text-[9.5px] tracking-[0.2em] uppercase transition-all duration-300 rounded-none font-extrabold text-center flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                              >
                                ✕ CLOSE DETAILS
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right Hand: Dynamic Photographic Portrait, Bio and Quote (matches Hover change, hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-6 bg-white/45 backdrop-blur-xl border border-white/70 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_12px_40px_rgba(0,0,0,0.05)]">
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
                    <div className={`md:col-span-5 relative aspect-[3/4] bg-studio-charcoal/5 border border-studio-black/10 shadow-md ${!(team[activeMemberIdx].imageUrl.includes("i.ibb.co") || team[activeMemberIdx].id === 'member-4') ? 'overflow-hidden' : ''}`}>
                      <img
                        src={team[activeMemberIdx].imageUrl}
                        alt={team[activeMemberIdx].name}
                        className={`w-full h-full ${
                          (team[activeMemberIdx].imageUrl.includes("i.ibb.co") || team[activeMemberIdx].id === 'member-4')
                            ? 'object-contain object-center scale-100 p-1'
                            : team[activeMemberIdx].id === 'member-1'
                              ? 'object-cover object-[center_20%]'
                              : 'object-cover object-center'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      {!(team[activeMemberIdx].imageUrl.includes("i.ibb.co") || team[activeMemberIdx].id === 'member-4') && (
                        <div className="absolute inset-0 bg-gradient-to-t from-studio-black/20 to-transparent pointer-events-none" />
                      )}
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
                        <span className="font-serif italic font-semibold text-studio-black">{team[activeMemberIdx].name}</span> {team[activeMemberIdx].bio}
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

                    <div className="flex justify-between items-center bg-white/50 backdrop-blur-md px-4 py-3 border border-white/85 rounded-none mt-2 shadow-sm">
                      <span className="font-mono text-[8px] text-[#7F7A75] tracking-widest">
                        SECURE PARTNERSHIP CODE: OBY-REPRESENTATIVE
                      </span>
                      <div className="flex gap-3 text-studio-charcoal/65">
                        <Linkedin className="w-3.5 h-3.5 hover:text-gold-bronze duration-305 cursor-pointer" />
                        <Mail className="w-3.5 h-3.5 hover:text-gold-bronze duration-305 cursor-pointer" />
                        <Globe className="w-3.5 h-3.5 hover:text-gold-bronze duration-305 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3. Deep Dive: BUILD THE MATRIX Pvt.  Ltd. Creative Workspace */}
        {/* DESKTOP WORKSPACE LAYOUT (Unmodified for large views) */}
        <div className="hidden md:block mt-28 border-t border-white/10 pt-20">
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
            # // DESIGN STUDIO
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                BUILD THE MATRIX Pvt.  Ltd. <br />
                <span className="italic font-normal text-gold-bronze">Creative Workspace</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light text-justify">
                Our studio operates as a modern architectural and visualization workspace where ideas evolve through collaboration, technology, and creative experimentation.
              </p>
              
              <div className="border-t border-b border-white/10 py-4 my-2">
                <span className="font-mono text-[10px] font-bold text-gold-bronze uppercase block mb-2">
                  Designed as a hybrid architectural lab, the studio integrates:
                </span>
                <ul className="flex flex-col gap-1.5 font-sans text-xs text-zinc-200 pl-3 list-disc">
                  <li>BIM workflows</li>
                  <li>3D visualization systems</li>
                  <li>Material exploration</li>
                  <li>Interior concept development</li>
                  <li>Architectural presentations</li>
                  <li>Digital rendering environments</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-950/60 border border-white/10 flex flex-col gap-2 font-mono text-[9px] text-zinc-400 shadow-sm">
                <div className="flex justify-between">
                  <span>REGIONAL HUB</span>
                  <span className="text-white font-semibold">WEST COAST HQ</span>
                </div>
                <div className="flex justify-between">
                  <span>WORKFLOW MODE</span>
                  <span className="text-[#00E5FF] font-semibold">BIM INTEGRATED</span>
                </div>
                <div className="flex justify-between">
                  <span>LAB STANDARDS</span>
                  <span className="text-white font-semibold">CINEMATIC REALISM</span>
                </div>
              </div>
            </div>

            {/* Architectural details cards with grid representation */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-studio-charcoal/40 backdrop-blur-xl border border-white/10 flex flex-col gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.4)] hover:bg-studio-charcoal/60 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                  <span className="font-mono text-[10px] font-bold">01</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#00E5FF] block -mb-2 font-bold select-none">[DESIGN WORKFLOW]</span>
                <h4 className="font-serif text-lg text-white">BIM & Visualization Lab</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light mb-1">
                  Our digital workspace is equipped for:
                </p>
                <ul className="font-sans text-[11px] text-zinc-200 pl-4 list-disc space-y-1 -mt-2 leading-relaxed font-light">
                  <li>Revit-based BIM coordination</li>
                  <li>High-detail 3D modeling</li>
                  <li>Photorealistic rendering</li>
                  <li>Construction documentation</li>
                  <li>Architectural animation workflows</li>
                </ul>
                <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light text-justify pt-2 border-t border-white/10 mt-auto">
                  Every project is developed through a precise and collaborative design process ensuring technical accuracy and aesthetic excellence.
                </p>
              </div>

              <div className="p-6 bg-studio-charcoal/40 backdrop-blur-xl border border-white/10 flex flex-col gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.4)] hover:bg-studio-charcoal/60 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                  <span className="font-mono text-[10px] font-bold">02</span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#00E5FF] block -mb-2 font-bold select-none">[TACTILE EXPLORATION]</span>
                <h4 className="font-serif text-lg text-white">Architectural Material Exploration</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light mb-1">
                  Clients and collaborators can explore:
                </p>
                <ul className="font-sans text-[11px] text-zinc-200 pl-4 list-disc space-y-1 -mt-2 leading-relaxed font-light">
                  <li>Material palettes</li>
                  <li>Lighting concepts</li>
                  <li>Texture studies</li>
                  <li>Spatial mockups</li>
                  <li>Interior moodboards</li>
                  <li>Modern façade inspirations</li>
                </ul>
                <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light text-justify pt-2 border-t border-white/10 mt-auto">
                  Each project begins with visual storytelling and conceptual experimentation before moving into technical development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LUXURIOUS MOBILE WORKSPACE LAYOUT (Black pitch background, gold/white contrasting theme) */}
        <div className="block md:hidden mt-0 border border-white/20 max-md:-mx-6 max-md:w-[calc(100%+3rem)] max-md:border-x-0 p-5 bg-black text-white relative z-10 shadow-[0_24px_48px_rgba(0,0,0,0.92)] rounded-none overflow-hidden">
          {/* Particle Floating Canvas matching preloader theme, relative to this container */}
          <canvas
            ref={workspaceCanvasRef}
            className="absolute inset-0 z-0 pointer-events-none w-full h-full block"
          />

          <div className="relative z-10">
            {/* Section Marker */}
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#00E5FF] uppercase block mb-3 font-bold [text-shadow:0_0_10px_rgba(0,229,255,0.45)]">
              # // DESIGN STUDIO
            </span>

            <h3 className="font-serif text-xl font-light text-white leading-tight mb-3 tracking-wide">
              BUILD THE MATRIX Pvt.  Ltd. <br />
              <span className="italic font-normal text-white">Creative Workspace</span>
            </h3>

            <p className="font-sans text-[10.5px] text-zinc-100 font-light leading-relaxed mb-4 text-justify">
              Our studio operates as a premium architectural and visualization lab where complex concepts translate into immersive spatial realities through intelligent design thinking.
            </p>

            {/* PORTION WITH PITCH BLACK BACKGROUND AND HIGH-CONTRAST TEXT */}
            <div className="bg-transparent text-white border border-white/20 p-4 mb-4 rounded-none">
              <span className="font-mono text-[9px] font-bold text-[#00E5FF] tracking-widest uppercase block mb-2 border-b border-white/15 pb-1.5 [text-shadow:0_0_8px_rgba(0,229,255,0.3)]">
                LAB INTEGRATED GEOMETRIES:
              </span>
              <ul className="flex flex-col gap-2 font-sans text-[11px] text-white">
                {mobileGeometries.map((geom, idx) => {
                  const isOpen = activeMobileGeometryIdx === idx;
                  return (
                    <li key={idx} className="border-b border-white/10 last:border-0 pb-2 mb-1 last:pb-0 last:mb-0">
                      <button
                        onClick={() => setActiveMobileGeometryIdx(isOpen ? null : idx)}
                        className="w-full text-left flex items-center justify-between py-1 focus:outline-none group"
                      >
                        <span className="flex items-center gap-2 font-normal text-white group-hover:text-[#00E5FF] transition-colors duration-200">
                          <span className={`text-[#00E5FF] font-black transition-transform duration-300 ${isOpen ? "rotate-90 scale-110" : ""}`}>•</span>
                          {geom.title}
                        </span>
                        <span className="text-[#00E5FF]">
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-2 px-2.5 bg-zinc-950 border border-white/10 mt-1.5 flex flex-col gap-2 shadow-inner">
                              <p className="text-zinc-200 text-[10px] leading-relaxed font-light font-sans text-justify">
                                {geom.desc}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMobileGeometryIdx(null);
                                }}
                                className="self-end px-2.5 py-1 bg-white text-black font-mono text-[7.5px] font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors duration-200 flex items-center gap-1 shadow-sm"
                              >
                                ✕ CLOSE CONTENT
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* HUB SPECS IN Pitch Black container */}
            <div className="p-3 bg-transparent border border-white/20 flex flex-col gap-2 font-mono text-[8px] text-zinc-350 mb-4 rounded-none">
              <div className="flex justify-between">
                <span className="text-zinc-400">REGIONAL HUB</span>
                <span className="text-white font-bold uppercase tracking-wider">WEST COAST HQ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">WORKFLOW MODE</span>
                <span className="text-[#00E5FF] font-bold uppercase tracking-wider [text-shadow:0_0_8px_rgba(0,229,255,0.35)]">BIM INTEGRATED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">LAB STANDARDS</span>
                <span className="text-white font-bold uppercase tracking-wider">CINEMATIC REALISM</span>
              </div>
            </div>

            {/* Grid Cards for Mobile Details in Dark Aesthetic */}
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-transparent border border-white/20 flex flex-col gap-2.5 rounded-none">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black">
                  <span className="font-mono text-[10px] font-bold">01</span>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#00E5FF] block -mb-1 font-bold [text-shadow:0_0_6px_rgba(0,229,255,0.25)]">DESIGN WORKFLOW</span>
                <h4 className="font-serif text-sm text-white tracking-wide font-normal">BIM & Visualization Lab</h4>
                <p className="font-sans text-[10px] text-zinc-200 leading-relaxed font-light text-justify">
                  Equipped for high-detail Revit building coordination, clash check, smart structural templates, and interactive design rendering processes.
                </p>
              </div>

              <div className="p-4 bg-transparent border border-white/20 flex flex-col gap-2.5 rounded-none">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black">
                  <span className="font-mono text-[10px] font-bold">02</span>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#00E5FF] block -mb-1 font-bold [text-shadow:0_0_6px_rgba(0,229,255,0.25)]">CONCEPT LIBRARY</span>
                <h4 className="font-serif text-sm text-white tracking-wide font-normal">Tactile Material Library</h4>
                <p className="font-sans text-[10px] text-zinc-200 leading-relaxed font-light text-justify">
                  Clients explore mood boards, custom lighting matrices, texture templates, and immersive facade configurations beforehand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Strategic Governance and Structural Standards */}
        <div className="mt-14 sm:mt-16 border-t border-studio-black/[0.08] pt-10 sm:pt-14">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#800020] uppercase block mb-3 font-semibold">
              # // DESIGN PRINCIPLES
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-studio-black">
              Building Timeless <br />
              <span className="italic font-normal text-[#B45309]">Architectural Experiences</span>
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
              <div key={idx} className="p-5 bg-white border border-studio-black/10 hover:bg-neutral-55/40 hover:border-studio-black/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col gap-3 h-full rounded-none">
                <div className="w-6 h-6 rounded-full bg-studio-black text-white flex items-center justify-center font-mono text-[9px] font-bold">
                  0{idx + 1}
                </div>
                <h4 className="font-mono text-[10.5px] font-bold text-studio-black tracking-wider leading-snug uppercase">
                  {gov.title}
                </h4>
                <p className="font-sans text-[11px] text-studio-charcoal/85 leading-relaxed font-light">
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
