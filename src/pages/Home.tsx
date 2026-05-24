import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Home as HomeIcon, Lightbulb, Star, Building, ShoppingBag, Coffee, Award, Play } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
  heroImage?: string;
  pavilionImage?: string;
}

interface Slide {
  id: string;
  subtitle: string;
  title: string;
  location: string;
  image: string;
}

export default function Home({ onNavigate }: HomeProps) {
  // Slideshow data matching the premium BIM & Architectural theme
  const slides: Slide[] = [
    {
      id: "slide-1",
      subtitle: "ARCHITECTURAL DESIGN",
      title: "Modern Villa Design",
      location: "Luxury Residence Concept",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200"
    },
    {
      id: "slide-2",
      subtitle: "BIM MODELING",
      title: "Revit Workflow Integration",
      location: "Corporate Office Hub",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
    },
    {
      id: "slide-3",
      subtitle: "COMMERCIAL ARCHITECTURE",
      title: "Premium Workspace Concept",
      location: "Modern Commercial Environment",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200"
    },
    {
      id: "slide-4",
      subtitle: "INTERIOR STYLING",
      title: "Luxury Café & Lounge",
      location: "Hospitality Space",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200"
    },
    {
      id: "slide-5",
      subtitle: "3D VISUALIZATION",
      title: "Urban Living Concept",
      location: "High-Rise Tower Detailing",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
    }
  ];

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Auto rotate main slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentSlideIdx];
  const nextSlidePeek = slides[(currentSlideIdx + 1) % slides.length];

  return (
    <div className="bg-[#0b0c0e] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SLIDESHOW SECTION (Matches the high impact rotating banner from video) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-black select-none">
        
        {/* Fullscreen rotative slide backgrounds with motion transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
        </AnimatePresence>

        {/* Cinematic shade filters and gradient curves from the video */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/50" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0b0c0e]/80 via-transparent to-transparent hidden md:block" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Headline (Replicating exact video typography and alignment) */}
            <div className="lg:col-span-8 flex flex-col items-start gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase"
              >
                <span>DESIGNING SPACES. INSPIRING LIVES.</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight leading-[1.05] font-extralight text-white"
              >
                Spaces That Echo <br />
                <span className="font-normal text-white">Your Story</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-wrap gap-4 mt-6"
              >
                <button
                  onClick={() => onNavigate("work")}
                  className="px-6 py-3.5 bg-white text-black hover:bg-white/90 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer font-bold flex items-center gap-2.5"
                >
                  Explore the Work
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate("contact")}
                  className="px-6 py-3.5 bg-transparent border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center gap-2"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>

            {/* Right Interactive Slide Thumb (Matches exactly the bottom right overlay in the video) */}
            <div className="lg:col-span-4 flex justify-end w-full">
              <div className="w-full max-w-[280px] bg-black/60 backdrop-blur-md border border-white/10 p-4 relative group flex flex-col gap-3 rounded-none">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-white opacity-80" />
                
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                  <span>UP NEXT IN GALLERY</span>
                  <span>0{((currentSlideIdx + 1) % slides.length) + 1}</span>
                </div>

                <div className="flex gap-3 items-center mt-1">
                  {/* Miniature Image representing next slide */}
                  <div className="w-16 h-12 bg-zinc-800 overflow-hidden shrink-0 border border-white/5 relative">
                    <img
                      src={nextSlidePeek.image}
                      alt={nextSlidePeek.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-serif text-xs text-white/80 block leading-tight truncate max-w-[150px]">
                      {nextSlidePeek.title}
                    </span>
                    <span className="font-mono text-[9px] text-white/50 block mt-1">
                      {nextSlidePeek.location}
                    </span>
                  </div>
                </div>

                {/* Slideshow Selector Pagers */}
                <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-1">
                  <div className="font-mono text-xs text-white/50">
                    <span className="text-white font-bold">0{currentSlideIdx + 1}</span> / 0{slides.length}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={prevSlide}
                      className="p-1 border border-white/10 hover:border-white/40 hover:bg-white/5 text-white/60 hover:text-white rounded-none transition-all duration-300 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-1 border border-white/10 hover:border-white/40 hover:bg-white/5 text-white/60 hover:text-white rounded-none transition-all duration-300 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (We Turn Legacy Into Authority - Video 0:20) */}
      <section className="py-24 md:py-32 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs tracking-[0.3em] text-[#B45309] uppercase block mb-3 font-semibold">
                OUR IMPACT BY NUMBERS
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-sans font-extralight text-black">
                We Transform Vision <br />
                <span className="font-normal">Into Built Experiences.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 font-sans text-base text-zinc-600 font-light leading-relaxed max-w-xl">
              BUILD THE MATRIX delivers innovative architectural design, BIM solutions, visualization, and spatial storytelling for residential, commercial, hospitality, and urban environments. We combine creative design thinking with technical precision to create spaces that are functional, immersive, and timeless.
            </div>
          </div>

          {/* Cards mapping identical stats in video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                metric: "150+",
                title: "Architectural Concepts Developed",
                description: "Designing modern residential, commercial, and luxury architectural spaces with a focus on innovation and detail.",
                icon: <Building className="w-5 h-5 text-zinc-900" />
              },
              {
                metric: "50+",
                title: "BIM Projects Executed",
                description: "Delivering accurate BIM workflows, construction documentation, clash coordination, and smart project visualization.",
                icon: <HomeIcon className="w-5 h-5 text-zinc-900" />
              },
              {
                metric: "30+",
                title: "3D Visualization & Rendering Projects",
                description: "Creating photorealistic architectural renders, walkthroughs, and cinematic visual presentations.",
                icon: <Lightbulb className="w-5 h-5 text-zinc-900" />
              },
              {
                metric: "10+",
                title: "Collaborative Design Partnerships",
                description: "Working with clients, studios, consultants, and developers to transform ideas into impactful architectural experiences.",
                icon: <Star className="w-5 h-5 text-zinc-900" />
              }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 border border-zinc-200/60 p-8 flex flex-col justify-between aspect-square group hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-500 rounded-none shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <span className="text-5xl md:text-6xl tracking-tight font-extralight text-zinc-900 group-hover:text-white transition-colors">
                    {stat.metric}
                  </span>
                  <div className="p-2 border border-zinc-300 bg-white text-zinc-900 group-hover:bg-zinc-800 group-hover:border-zinc-700 group-hover:text-white transition-all duration-500">
                    {stat.icon}
                  </div>
                </div>

                <div className="flex flex-col mt-8">
                  <h4 className="font-sans text-base font-medium text-zinc-900 group-hover:text-white transition-colors">
                    {stat.title}
                  </h4>
                  <p className="font-sans text-xs text-zinc-500 group-hover:text-zinc-400 mt-2 leading-relaxed transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Global Vision Callout Row */}
          <div className="mt-16 pt-8 border-t border-zinc-200/85 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#B45309] uppercase block font-semibold">
                GLOBAL VISION
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="font-sans text-base text-zinc-700 font-light leading-relaxed">
                Designing spaces with a modern architectural identity inspired by innovation, functionality, minimalism, and luxury aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRAND CAROUSEL ("Innovative Spaces. Intelligent Design.") */}
      <section className="py-24 bg-[#0e1013] text-white border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-[#EF4444] uppercase block mb-3 font-semibold">
              ARCHITECTURE & BIM DESIGN STUDIO
            </span>
            <h3 className="text-3xl md:text-5xl tracking-tight font-extralight text-white leading-tight">
              Innovative Spaces. <br />
              <span className="font-normal text-white/90">Intelligent Design.</span>
            </h3>
            <p className="text-white/60 font-sans text-sm font-light leading-relaxed mt-4">
              Architectural environments, BIM-driven workflows, and immersive visualization experiences crafted for modern living, commercial innovation, and timeless spatial storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Luxury Residence Concept",
                location: "Modern Villa Design",
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
                desc: "Contemporary residential architecture designed with clean geometries, natural lighting strategies, premium material palettes, and seamless indoor-outdoor integration."
              },
              {
                title: "Commercial Workspace Design",
                location: "Corporate Office Space",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
                desc: "A sophisticated workspace environment featuring functional planning, collaborative zones, elegant interiors, and BIM-coordinated execution for efficient spatial performance."
              },
              {
                title: "High-Rise Residential Tower",
                location: "Urban Living Concept",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
                desc: "A modern high-rise architectural proposal focused on sustainable urban living, façade detailing, smart circulation, and premium lifestyle experiences."
              },
              {
                title: "Interior Visualization Studio",
                location: "Cinematic 3D Visualization",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
                desc: "Photorealistic architectural renders and walkthroughs designed with cinematic lighting, realistic textures, atmospheric environments, and immersive storytelling presentations."
              }
            ].map((p, idx) => (
              <div key={idx} className="group flex flex-col gap-4 border border-white/5 bg-white/[0.01] p-5 hover:border-white/20 transition-all duration-500">
                <div className="aspect-[16/10] overflow-hidden relative border border-white/5">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex flex-col mt-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-sm font-sans font-medium text-white truncate max-w-[150px]">{p.title}</span>
                    <span className="font-mono text-[8px] text-white/50 tracking-wider uppercase shrink-0">{p.location}</span>
                  </div>
                  <p className="font-sans text-[11px] text-white/65 mt-2.5 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => onNavigate("work")}
              className="px-6 py-3.5 bg-transparent border border-white/10 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center gap-2"
            >
              Explore the Work
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. HOSPITALITY SECTION ("BIM & VISUALIZATION SERVICES") */}
      <section className="py-24 md:py-32 bg-white text-black relative z-10 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs tracking-[0.3em] text-[#B45309] uppercase block mb-3 font-semibold">
                BIM & VISUALIZATION SERVICES
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-extralight text-black leading-tight">
                Precision-Driven <br />
                <span className="font-normal text-zinc-900">Design Workflows.</span>
              </h3>
            </div>
            <div className="lg:col-span-6 font-sans text-sm md:text-base text-zinc-500 font-light leading-relaxed max-w-lg">
              Advanced BIM coordination, construction documentation, and visualization solutions developed for architects, developers, consultants, and design studios. Every project is crafted with accuracy, functionality, and visual excellence.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Big spotlight structure */}
            <div className="lg:col-span-7 group flex flex-col gap-4">
              <div className="aspect-[16/10] overflow-hidden relative bg-zinc-100 border border-zinc-200">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000"
                  alt="BIM Coordination Project"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                />
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-2xl font-sans font-light text-black">Revit Workflow Integration</h4>
                  <span className="font-mono text-xs text-zinc-400 font-semibold uppercase">BIM Coordination Project</span>
                </div>
                <p className="font-sans text-sm text-zinc-500 mt-2.5 max-w-xl leading-relaxed font-light">
                  Comprehensive BIM modeling, clash detection, technical detailing, and intelligent construction workflows ensuring efficient project execution.
                </p>
                <div className="mt-4">
                  <button onClick={() => onNavigate("work")} className="font-mono text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 hover:opacity-65 transition-opacity">
                    View Project Details
                  </button>
                </div>
              </div>
            </div>

            {/* Small listing items */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
              {[
                {
                  title: "Luxury Architectural Interior Concept",
                  location: "Contemporary Spatial Experience",
                  image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600",
                  desc: "A sophisticated architectural interior designed with modern minimal aesthetics, warm ambient lighting, premium textures, and immersive spatial compositions. The design focuses on elegance, functionality, and refined material harmony to create timeless modern living experiences."
                },
                {
                  title: "Premium Workspace & Commercial Concept",
                  location: "Modern Commercial Environment",
                  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
                  desc: "A contemporary commercial architecture concept integrating intelligent space planning, modern façade systems, atmospheric lighting, and high-end material detailing to create visually impactful and functionally efficient environments."
                },
                {
                  title: "Urban Landscape & Public Realm Design",
                  location: "Contemporary Urban Spatial Proposal",
                  image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600",
                  desc: "A modern urban landscape concept blending architecture, pedestrian interaction, green spatial planning, public seating environments, and sustainable design principles to create engaging and human-centered outdoor experiences."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group border-b border-zinc-100 pb-6">
                  <div className="w-24 h-20 bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-base font-medium text-zinc-900 group-hover:text-black transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono text-[9px] text-[#B45309] block uppercase mt-0.5 font-bold">
                      {item.location}
                    </span>
                    <p className="font-sans text-xs text-zinc-500 mt-1.5 leading-relaxed font-light truncate max-w-[280px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE STUDIO BEHIND THE WORK (Video 0:28 - Kamal profile) */}
      <section className="py-24 md:py-32 bg-[#0b0c0e] text-white border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Studio description and CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="font-mono text-xs tracking-[0.3em] text-[#EF4444] uppercase block mb-3 font-semibold">
                THE MIND BEHIND THE METRIC
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-extralight text-white leading-tight mb-6">
                The Studio Behind <br />
                <span className="font-normal text-white">the Work.</span>
              </h3>
              <p className="font-sans text-sm md:text-base text-white/70 font-light leading-relaxed mb-6 max-w-lg">
                "Founded in 2020, BUILD THE MATRIX specializes in Architectural Design, BIM Modeling, and Visualization services for residential, commercial, and interior projects across the globe. Driven by creativity, technical precision, and collaborative design thinking, we deliver innovative architectural solutions, detailed BIM workflows, and immersive spatial experiences with a focus on functionality, aesthetics, and execution excellence."
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("contact")}
                  className="px-5 py-3.5 bg-white hover:bg-white/90 text-black font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none font-bold"
                >
                  Explore advisory
                </button>
                <button
                  onClick={() => onNavigate("studio")}
                  className="px-5 py-3.5 bg-transparent border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center gap-2"
                >
                  Explore The Work
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: High contrast black-and-white portrait matching video Kamal style */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] bg-zinc-800 overflow-hidden border border-white/10 group">
                <img
                  src="https://i.ibb.co/N6Zwzd1j/file-0000000068807207bbda431bc4791212-2.jpg"
                  alt="Kamal Matrix Leader"
                  className="w-full h-full object-cover filter grayscale contrast-115 transition-all duration-1000 group-hover:scale-102 group-hover:grayscale-0 hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual signature coordinates overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-sans text-lg font-light block">Kamal N.</span>
                  <span className="font-mono text-[10px] text-white/50 block tracking-widest uppercase mt-0.5">
                    FOUNDING DIRECTOR // PRINCIPAL VISUALIZER
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
