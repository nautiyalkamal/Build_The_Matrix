import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Home as HomeIcon, Lightbulb, Star, Building, ShoppingBag, Coffee, Award, Play } from "lucide-react";
import MatrixParticles from "../components/MatrixParticles";
import ArchMatrixBackground from "../components/ArchMatrixBackground";

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
      subtitle: "COMMERCIAL ARCHITECTURE",
      title: "Premium Workspace Concept",
      location: "Modern Commercial Environment",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200"
    },
    {
      id: "slide-2",
      subtitle: "BIM MODELING",
      title: "Revit Workflow Integration",
      location: "Corporate Office Hub",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
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
  const [activeTouchCard, setActiveTouchCard] = useState<number | null>(null);

  // Touch gesture state and handlers for mobile/tablet slideshow swiping
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;  // Swiped left
    const isRightSwipe = distance < -50; // Swiped right

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

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
    <div className="bg-[#0b0c0e] min-h-screen text-white font-sans overflow-x-hidden relative">
      <ArchMatrixBackground />
      
      {/* 1. HERO SLIDESHOW SECTION (Matches the high impact rotating banner from video with optimized mobile brush/swipe gestures) */}
      <section 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-no-swipe="true"
        className="relative h-[85vh] sm:h-[90vh] lg:h-screen max-md:h-screen max-md:min-h-screen w-full flex items-center overflow-hidden bg-black select-none cursor-grab active:cursor-grabbing"
      >
        
        {/* Slideshow image container: full screen cover on desktop view, precisely covers up to the top of h1 on mobile view */}
        <div className="absolute inset-x-0 top-20 sm:top-24 bottom-[245px] sm:bottom-[235px] md:bottom-[225px] lg:inset-0 lg:top-0 lg:bottom-0 lg:h-full z-0 flex items-center justify-center overflow-hidden pointer-events-none p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] object-cover object-center"
              />
              {/* Soft bottom edge transition blending seamlessly right into the top of the headline area on mobile */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none lg:hidden" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle ground shadow behind the lower controls so buttons and text remain crisp */}
        <div className="absolute inset-x-0 bottom-0 h-32 lg:h-56 bg-gradient-to-t from-black via-black/65 to-transparent pointer-events-none z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-4 sm:pb-8 md:pb-12 lg:pb-10 max-md:pb-10 max-md:justify-end">
          <MatrixParticles particleCount={30} showGrid={false} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10 lg:translate-y-4">
            
            {/* Left Headline (Replicating exact video typography and alignment) - adjusted slightly downward on desktop view */}
            <div className="lg:col-span-8 flex flex-col items-start gap-4 max-md:gap-3 -translate-y-3 sm:-translate-y-5 lg:translate-y-2">

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                style={{ fontFamily: "Georgia, serif" }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-['Georgia',serif] tracking-tight leading-[1.05] font-extralight text-white mt-2 sm:mt-4 md:mt-5 lg:mt-6"
              >
                Spaces That Echo <br />
                <span className="font-normal text-white">Your Story</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-col-reverse md:flex-row md:flex-wrap gap-4 mt-4 sm:mt-6 max-md:mt-3 w-full md:w-auto pb-2"
              >
                <button
                  onClick={() => onNavigate("work")}
                  className="px-6 py-3.5 bg-white text-black hover:bg-white/90 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer font-bold flex items-center justify-center gap-2.5 w-full md:w-auto"
                >
                  Explore the Work
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate("contact")}
                  className="px-6 py-3.5 bg-transparent border border-white/20 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>

            {/* Right Interactive Slide Thumb (Matches exactly the bottom right overlay in the video) */}
            <div className="lg:col-span-4 flex justify-end w-full max-md:hidden">
              <div className="w-full max-w-[280px] bg-studio-black/40 backdrop-blur-xl border border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.4)] p-4 relative group flex flex-col gap-3 rounded-none">
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
      <section className="py-6 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-end mb-8 sm:mb-14 lg:mb-20">
            <div className="lg:col-span-6">
              <span 
                style={{ fontFamily: "Georgia, serif" }}
                className="text-xs tracking-[0.3em] text-[#B45309] uppercase block mb-2 sm:mb-3 font-semibold"
              >
                OUR IMPACT BY NUMBERS
              </span>
              <h2 
                style={{ fontFamily: "Georgia, serif" }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-extralight text-black"
              >
                We Transform Vision <br />
                <span className="font-normal">Into Built Experiences.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 font-sans text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-xl">
              BUILD THE MATRIX Pvt.  Ltd. delivers innovative architectural design, BIM solutions, visualization, and spatial storytelling for residential, commercial, hospitality, and urban environments. We combine creative design thinking with technical precision to create spaces that are functional, immersive, and timeless.
            </div>
          </div>

          {/* Cards mapping identical stats in video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                metric: "150+",
                title: "Architectural Concepts Developed",
                description: "Designing modern residential, commercial, and luxury architectural spaces with a focus on innovation and detail.",
                icon: <Building className="w-5 h-5 text-current" />
              },
              {
                metric: "50+",
                title: "BIM Projects Executed",
                description: "Delivering accurate BIM workflows, construction documentation, clash coordination, and smart project visualization.",
                icon: <HomeIcon className="w-5 h-5 text-current" />
              },
              {
                metric: "30+",
                title: "3D Visualization & Rendering Projects",
                description: "Creating photorealistic architectural renders, walkthroughs, and cinematic visual presentations.",
                icon: <Lightbulb className="w-5 h-5 text-current" />
              },
              {
                metric: "10+",
                title: "Collaborative Design Partnerships",
                description: "Working with clients, companies, consultants, and developers to transform ideas into impactful architectural experiences.",
                icon: <Star className="w-5 h-5 text-current" />
              }
            ].map((stat, idx) => (
              <div
                key={idx}
                onTouchStart={() => setActiveTouchCard(idx)}
                onTouchEnd={() => setActiveTouchCard(null)}
                onTouchCancel={() => setActiveTouchCard(null)}
                className={`flex flex-col justify-between aspect-auto sm:aspect-square group transition-all duration-500 rounded-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_30px_rgba(0,0,0,0.02)] ${
                  activeTouchCard === idx
                    ? "bg-zinc-900 border-zinc-900 border shadow-2xl scale-[0.98] text-white"
                    : "bg-zinc-50/70 backdrop-blur-md border border-zinc-200/60 hover:bg-zinc-900 hover:border-zinc-900 hover:shadow-2xl hover:scale-[0.98]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-4xl sm:text-5xl md:text-6xl tracking-tight font-extralight transition-colors duration-500 ${
                    activeTouchCard === idx ? "text-white" : "text-zinc-900 group-hover:text-white"
                  }`}>
                    {stat.metric}
                  </span>
                  <div className={`p-2 border transition-all duration-500 shadow-sm ${
                    activeTouchCard === idx
                      ? "bg-zinc-855 border-zinc-700 text-white"
                      : "border-zinc-200 bg-white/80 text-zinc-900 group-hover:bg-zinc-800 group-hover:border-zinc-700 group-hover:text-white"
                  }`}>
                    {stat.icon}
                  </div>
                </div>

                <div className="flex flex-col mt-4 sm:mt-8">
                  <h4 className={`font-sans text-base font-medium transition-colors ${
                    activeTouchCard === idx ? "text-white" : "text-zinc-900 group-hover:text-white"
                  }`}>
                    {stat.title}
                  </h4>
                  <p className={`font-sans text-xs mt-1 sm:mt-2 leading-relaxed transition-colors ${
                    activeTouchCard === idx ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-400"
                  }`}>
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Global Vision Callout Row */}
          <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-zinc-200/85 grid grid-cols-1 md:grid-cols-12 gap-4 sm:grid-cols-12 items-center">
            <div className="md:col-span-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#B45309] uppercase block font-semibold">
                GLOBAL VISION
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="font-sans text-sm sm:text-base text-zinc-700 font-light leading-relaxed">
                Designing spaces with a modern architectural identity inspired by innovation, functionality, minimalism, and luxury aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRAND CAROUSEL ("Innovative Spaces. Intelligent Design.") */}
      <section className="py-6 sm:py-16 md:py-20 lg:py-24 bg-black text-white border-t border-white/10 relative">
        <MatrixParticles particleCount={40} showGrid={true} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl mb-8 sm:mb-12 lg:mb-16">
            <span 
              style={{ fontFamily: "Georgia, serif" }}
              className="text-xs tracking-[0.3em] text-[#00E5FF] uppercase block mb-3 font-semibold [text-shadow:0_0_8px_rgba(0,229,255,0.3)]"
            >
              ARCHITECTURE & BIM DESIGN COMPANY
            </span>
            <h3 
              style={{ fontFamily: "Georgia, serif" }}
              className="text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide font-extralight text-white leading-tight"
            >
              Innovative Spaces. <br />
              <span className="font-normal text-white">Intelligent Design.</span>
            </h3>
            <p className="text-zinc-100 font-sans text-sm font-light leading-relaxed mt-4">
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
                title: "Interior Visualization Company",
                location: "Cinematic 3D Visualization",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
                desc: "Photorealistic architectural renders and walkthroughs designed with cinematic lighting, realistic textures, atmospheric environments, and immersive storytelling presentations."
              }
            ].map((p, idx) => (
              <div key={idx} className="group flex flex-col gap-4 border border-white/15 bg-zinc-950 p-5 hover:border-white/40 hover:bg-zinc-900/40 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.85)]">
                <div className="aspect-[16/10] overflow-hidden relative border border-white/10">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover filter grayscale-0 md:grayscale contrast-100 md:contrast-110 transition-transform duration-700 md:group-hover:scale-105 md:group-hover:grayscale-0 md:hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex flex-col mt-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-sm font-sans font-medium text-white truncate max-w-[150px]">{p.title}</span>
                    <span className="font-mono text-[8px] text-[#00E5FF] tracking-wider uppercase shrink-0 font-semibold">{p.location}</span>
                  </div>
                  <p className="font-sans text-[11px] text-zinc-300 mt-2.5 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => onNavigate("work")}
              className="px-6 py-3.5 bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center gap-2 shadow-lg"
            >
              Explore the Work
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. HOSPITALITY SECTION ("BIM & VISUALIZATION SERVICES") - Positioned between Section 3 and Section 5 */}
      <section className="pt-24 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-black text-white relative z-10 overflow-hidden">
        <MatrixParticles particleCount={35} showGrid={true} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-10 lg:gap-12 items-end mb-6 sm:mb-12 lg:mb-16">
            <div className="lg:col-span-6">
              <span 
                style={{ fontFamily: "Georgia, serif" }}
                className="text-xs tracking-[0.3em] text-[#00E5FF] uppercase block mb-2 sm:mb-3 font-semibold border-l-2 border-[#00E5FF] pl-3 [text-shadow:0_0_8px_rgba(0,229,255,0.3)]"
              >
                # // REPOSITORY & ARCHIVE
              </span>
              <h3 
                style={{ fontFamily: "Georgia, serif" }}
                className="text-2xl sm:text-4xl md:text-5xl font-extralight text-white leading-tight tracking-tight"
              >
                Precision-Driven <br />
                <span className="font-normal text-white">Design Workflows.</span>
              </h3>
            </div>
            <div className="lg:col-span-6 font-sans text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-lg">
              Advanced BIM coordination, construction documentation, and visualization solutions developed for architects, developers, consultants, and design companies. Every project is crafted with accuracy, functionality, and visual excellence.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
            {/* Big spotlight structure */}
            <div className="lg:col-span-7 group flex flex-col gap-4">
              <div className="aspect-[16/10] overflow-hidden relative bg-zinc-950 border border-white/10 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000"
                  alt="BIM Coordination Project"
                  className="w-full h-full object-cover filter grayscale-0 md:grayscale contrast-100 md:contrast-[1.05] transition-all duration-1000 md:group-hover:scale-102 md:group-hover:grayscale-0 md:hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-xl sm:text-2xl font-sans font-light text-white tracking-tight">Revit Workflow Integration</h4>
                  <span className="font-mono text-[10px] sm:text-xs text-[#00E5FF] font-semibold uppercase tracking-wider">BIM Coordination</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl leading-relaxed font-light">
                  Comprehensive BIM modeling, clash detection, technical detailing, and intelligent construction workflows ensuring efficient project execution.
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => onNavigate("work")} 
                    className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-black bg-white hover:bg-neutral-200 px-5 py-3 transition-colors duration-300 rounded-none shadow-sm cursor-pointer"
                  >
                    View Project Details
                  </button>
                </div>
              </div>
            </div>

            {/* Small listing items */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-8 h-full">
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
                  image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600",
                  desc: "A modern urban landscape concept blending architecture, pedestrian interaction, green spatial planning, public seating environments, and sustainable design principles to create engaging and human-centered outdoor experiences."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group border-b border-white/10 pb-4 sm:pb-6 relative overflow-hidden bg-zinc-950/30 hover:bg-zinc-900/10 hover:border-white/25 p-4 transition-all duration-500 rounded-sm">
                  {/* Subtle immersive architectural canvas theme from the beginning of the site */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
                    <ArchMatrixBackground 
                      particleCount={10} 
                      showGrid={true} 
                      showBuilding={true} 
                      wireframeColor="rgba(0, 229, 255, 0.08)" 
                      accentColor="rgba(0, 229, 255, " 
                    />
                  </div>

                  <div className="w-20 h-16 sm:w-24 sm:h-20 bg-zinc-950 overflow-hidden shrink-0 border border-white/10 relative shadow-sm z-10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale-0 md:grayscale contrast-100 md:contrast-[1.05] transition-all duration-500 md:group-hover:scale-105 md:group-hover:grayscale-0 md:hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 relative z-10">
                    <span className="font-sans text-sm sm:text-base font-medium text-white group-hover:text-[#00E5FF] transition-colors leading-snug tracking-tight">
                      {item.title}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-[#00E5FF] block uppercase mt-0.5 font-semibold tracking-wider">
                      {item.location}
                    </span>
                    <p className="font-sans text-[11px] sm:text-xs text-zinc-400 mt-1 sm:mt-1.5 leading-relaxed font-light truncate max-w-[220px] sm:max-w-[280px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
