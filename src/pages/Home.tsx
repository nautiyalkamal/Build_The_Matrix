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
  const [activeTouchCard, setActiveTouchCard] = useState<number | null>(null);
  const [isLeaderImageGlowing, setIsLeaderImageGlowing] = useState(false);

  useEffect(() => {
    if (isLeaderImageGlowing) {
      const timer = setTimeout(() => {
        setIsLeaderImageGlowing(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isLeaderImageGlowing]);

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
        className="relative h-[85vh] sm:h-[90vh] lg:h-screen max-md:h-[95vh] w-full flex items-center overflow-hidden bg-black select-none cursor-grab active:cursor-grabbing"
      >
        
        {/* Fullscreen rotative slide backgrounds with motion transitions under adaptive mobile aspect ratios */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 md:inset-0 z-0 bg-cover bg-center max-md:w-[92%] max-md:h-[38vh] max-md:left-[4%] max-md:top-36 max-md:rounded-lg max-md:border max-md:border-white/10 max-md:shadow-2xl"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
        </AnimatePresence>

        {/* Cinematic shade filters and gradient curves adjusted for mobile viewing frame */}
        <div className="absolute inset-0 md:inset-0 z-10 bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/50 max-md:top-[44vh] max-md:bg-gradient-to-t max-md:from-[#0b0c0e] max-md:to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0b0c0e]/80 via-transparent to-transparent hidden md:block" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-6 sm:pb-12 md:pb-16 lg:pb-24 max-md:pt-[48vh]">
          <MatrixParticles particleCount={30} showGrid={false} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            
            {/* Left Headline (Replicating exact video typography and alignment) */}
            <div className="lg:col-span-8 flex flex-col items-start gap-4 max-md:gap-3">
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
                className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-sans tracking-tight leading-[1.05] font-extralight text-white"
              >
                Spaces That Echo <br />
                <span className="font-normal text-white">Your Story</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-col-reverse md:flex-row md:flex-wrap gap-4 mt-6 max-md:mt-3 w-full md:w-auto"
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
              <span className="font-mono text-xs tracking-[0.3em] text-[#B45309] uppercase block mb-2 sm:mb-3 font-semibold">
                OUR IMPACT BY NUMBERS
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-sans font-extralight text-black">
                We Transform Vision <br />
                <span className="font-normal">Into Built Experiences.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 font-sans text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-xl">
              BUILD THE MATRIX delivers innovative architectural design, BIM solutions, visualization, and spatial storytelling for residential, commercial, hospitality, and urban environments. We combine creative design thinking with technical precision to create spaces that are functional, immersive, and timeless.
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
                description: "Working with clients, studios, consultants, and developers to transform ideas into impactful architectural experiences.",
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
            <span className="font-mono text-xs tracking-[0.3em] text-[#00E5FF] uppercase block mb-3 font-semibold [text-shadow:0_0_8px_rgba(0,229,255,0.3)]">
              ARCHITECTURE & BIM DESIGN STUDIO
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide font-extralight text-white leading-tight">
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
                title: "Interior Visualization Studio",
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
              <span className="font-mono text-xs tracking-[0.3em] text-[#00E5FF] uppercase block mb-2 sm:mb-3 font-semibold border-l-2 border-[#00E5FF] pl-3 [text-shadow:0_0_8px_rgba(0,229,255,0.3)]">
                # // REPOSITORY & ARCHIVE
              </span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-sans font-extralight text-white leading-tight tracking-tight">
                Precision-Driven <br />
                <span className="font-normal text-white">Design Workflows.</span>
              </h3>
            </div>
            <div className="lg:col-span-6 font-sans text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-lg">
              Advanced BIM coordination, construction documentation, and visualization solutions developed for architects, developers, consultants, and design studios. Every project is crafted with accuracy, functionality, and visual excellence.
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

      {/* 5. THE STUDIO BEHIND THE WORK (Video 0:28 - Kamal profile) */}
      <section className="py-6 sm:py-16 md:py-20 lg:py-24 bg-black text-white border-t border-white/10 relative">
        <MatrixParticles particleCount={35} showGrid={true} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="flex justify-center w-full">
            
            {/* 1. DESKTOP/TABLET VIEW (Split grid layout with text card on left and image on right) */}
            <div className="hidden md:flex w-full justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[960px] min-h-[550px] bg-black border border-white/20 overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_16px_48px_rgba(0,0,0,0.85)]">
                
                {/* Left Side: Elegant Text Card */}
                <div className="p-8 lg:p-12 flex flex-col justify-between bg-black relative z-10 border-r border-white/10 text-left">
                  <div className="my-auto flex flex-col">
                    <span className="font-mono text-2xs tracking-[0.3em] text-[#00E5FF] uppercase mb-4 font-semibold [text-shadow:0_0_8px_rgba(0,229,255,0.3)]">
                      THE MIND BEHIND THE MATRIX
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-sans font-extralight text-white leading-tight mb-4 tracking-wide">
                      The Studio Behind <br />
                      <span className="font-normal text-white">the Work.</span>
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-zinc-100 font-light leading-relaxed mb-8 max-w-sm">
                      "Founded in 2020, BUILD THE MATRIX specializes in Architectural Design, BIM Modeling, and Visualization services for residential, commercial, and interior projects across the globe. Driven by creativity, technical precision, and collaborative design thinking."
                    </p>
                    
                    {/* Active navigation controls */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => onNavigate("contact")}
                        className="px-5 py-3 bg-white hover:bg-neutral-200 text-black font-mono text-[10px] tracking-wider uppercase transition-all duration-300 rounded-none font-bold shadow-md"
                      >
                        Explore advisory
                      </button>
                      <button
                        onClick={() => onNavigate("studio")}
                        className="px-5 py-3 bg-transparent border border-white/30 hover:border-white text-white font-mono text-[10px] tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer flex items-center gap-1.5"
                      >
                        The Work
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Director signature */}
                  <div className="border-t border-white/15 pt-4 mt-6">
                    <span className="font-sans text-base font-light block leading-none text-white tracking-wide">Kamal N.</span>
                    <span className="font-mono text-[9px] text-zinc-400 block tracking-widest uppercase mt-1">
                      FOUNDING DIRECTOR // PRINCIPAL VISUALIZER
                    </span>
                  </div>
                </div>

                {/* Right Side: Portrait Image focusing on the person */}
                <div className="relative overflow-hidden bg-black">
                  <img
                    src="https://i.ibb.co/dwtDsv0S/file-0000000068807207bbda431bc4791212-2.jpg"
                    alt="Kamal Matrix Leader"
                    className="w-full h-full object-cover object-[center_20%] filter grayscale contrast-110 transition-all duration-1000 group-hover:scale-102 group-hover:grayscale-0 hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/15 to-black/45 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />
                </div>

              </div>
            </div>

            {/* 2. BEAUTIFULLY TAILORED MOBILE SPLIT VIEW (Visible only on mobile, optimized for a natural, colorful image profile interaction) */}
            <div 
              onClick={() => setIsLeaderImageGlowing(true)}
              onTouchStart={() => setIsLeaderImageGlowing(true)}
              className={`md:hidden w-full flex flex-col bg-black overflow-hidden border transition-all duration-500 max-w-[480px] shadow-2xl group cursor-pointer select-none ${
                isLeaderImageGlowing ? "border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.3)] bg-zinc-950" : "border-white/15"
              }`}
            >
              {/* Outer Split Row Segment */}
              <div className="flex h-[240px] xs:h-[280px] items-stretch w-full relative">
                
                {/* Left Side: Elegant Text Block */}
                <div className={`w-[52%] p-3.5 xs:p-4 flex flex-col justify-between transition-all duration-500 relative z-20 ${
                  isLeaderImageGlowing ? "bg-zinc-950/90" : "bg-black"
                }`}>
                  <div className="flex flex-col">
                    <span className="font-mono text-[7px] xs:text-[8px] tracking-[0.2em] uppercase block mb-1 font-bold text-[#00E5FF] [text-shadow:0_0_6px_rgba(0,229,255,0.25)]">
                      THE MIND BEHIND THE MATRIX
                    </span>
                    <h3 className="font-sans text-[11px] xs:text-xs font-light text-white uppercase tracking-[0.11em] leading-tight mb-2">
                      The Studio Behind <span className="font-normal text-[#00E5FF]">the Work.</span>
                    </h3>
                    <p className="font-sans text-[9px] xs:text-[10px] text-zinc-100 font-light leading-relaxed">
                      Founded in 2020, BUILD THE MATRIX delivers precise, innovative architectural design, BIM workflows, and visual experiences globally.
                    </p>
                  </div>
                  
                  <div className="border-t border-white/10 pt-1.5 flex items-center justify-between">
                    <span className="font-mono text-[6.5px] text-zinc-400 uppercase tracking-widest block font-medium">
                      CREATIVE LABS
                    </span>
                    {isLeaderImageGlowing && (
                      <span className="font-mono text-[6.5px] text-[#00E5FF] tracking-widest block uppercase font-bold">
                        ACTIVE VIEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side: Portrait Image focusing on the person clearly with responsive natural color fade */}
                <div className="w-[48%] relative overflow-hidden bg-black z-10 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/dwtDsv0S/file-0000000068807207bbda431bc4791212-2.jpg"
                    alt="Kamal Matrix Leader"
                    className={`w-full h-full object-cover object-[58%_center] transition-all duration-700 ${
                      isLeaderImageGlowing 
                        ? "scale-105 filter grayscale-0 brightness-100 contrast-102 saturate-105" 
                        : "filter grayscale contrast-110"
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle fade/vignette to ensure soft blending with the layout */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/50 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none" />
                </div>
              </div>

              {/* Bottom Sync Bar: Direct Actions & Director signatures */}
              <div className="w-full bg-black border-t border-white/15 px-3 py-2.5 flex items-center justify-between gap-2 z-20">
                {/* Left: Interactive Navigation actions */}
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="px-2 py-1.5 bg-white text-black font-mono text-[7.5px] tracking-wider uppercase font-bold text-center leading-none shadow-sm"
                  >
                    Advisory
                  </button>
                  <button
                    onClick={() => onNavigate("studio")}
                    className="px-2 py-1.5 bg-transparent border border-white/20 text-white font-mono text-[7.5px] tracking-wider uppercase text-center leading-none font-medium hover:border-white transition-colors"
                  >
                    The Work
                  </button>
                </div>

                {/* Right: Director Title signature */}
                <div className="text-right min-w-0">
                  <span className="font-sans text-[10px] font-medium text-white block leading-none tracking-wide">Kamal N.</span>
                  <span className="font-mono text-[5.5px] text-zinc-400 block tracking-widest uppercase mt-0.5 leading-none truncate max-w-[100px]">
                    FOUNDING DIRECTOR
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
