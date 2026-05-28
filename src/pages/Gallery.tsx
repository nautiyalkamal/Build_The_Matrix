import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, ZoomIn, Eye, X, ArrowUpRight, Award, Compass, Heart, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "INTERIORS" | "VISUALIZATION";
  title: string;
  location: string;
  camera: string;
  settings: string;
  photographer: string;
  imageUrl: string;
  description: string;
}

interface GalleryProps {
  onLightboxToggle?: (isOpen: boolean) => void;
}

export default function Gallery({ onLightboxToggle }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [likes, setLikes] = useState<string[]>([]);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  // Helper method to sync selected photo and notify parents
  const handleSetSelectedPhoto = (photo: GalleryItem | null) => {
    setSelectedPhoto(photo);
    if (onLightboxToggle) {
      onLightboxToggle(photo !== null);
    }
  };

  // Advanced touch, swipe, pinch-to-zoom physical simulation states
  const [zoomScale, setZoomScale] = useState(1);
  const [lastTap, setLastTap] = useState(0);
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null);
  const [lightboxTouchStartX, setLightboxTouchStartX] = useState<number | null>(null);
  const [lightboxTouchEndX, setLightboxTouchEndX] = useState<number | null>(null);
  const [lightboxTouchStartY, setLightboxTouchStartY] = useState<number | null>(null);
  const [lightboxTouchEndY, setLightboxTouchEndY] = useState<number | null>(null);
  const [dragYOffset, setDragYOffset] = useState(0);

  const navigateLightbox = (direction: number) => {
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedPhoto.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
      handleSetSelectedPhoto(filteredItems[nextIndex]);
      setZoomScale(1); // Reset zoom scale on image transitions
      setDragYOffset(0);
    }
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setPinchStartDist(dist);
    } else if (e.touches.length === 1) {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      setLightboxTouchStartX(touchX);
      setLightboxTouchEndX(touchX);
      setLightboxTouchStartY(touchY);
      setLightboxTouchEndY(touchY);

      // Mobile double tap zoom handler
      const now = Date.now();
      if (now - lastTap < 300) {
        setZoomScale(prev => (prev > 1.2 ? 1 : 2.5));
        e.preventDefault();
      }
      setLastTap(now);
    }
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.min(Math.max(1, (dist / pinchStartDist) * zoomScale), 3.5);
      setZoomScale(newScale);
    } else if (e.touches.length === 1) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      setLightboxTouchEndX(currentX);
      setLightboxTouchEndY(currentY);

      if (zoomScale === 1 && lightboxTouchStartY !== null) {
        const deltaY = currentY - lightboxTouchStartY;
        const deltaX = currentX - (lightboxTouchStartX || currentX);
        // Only apply pull-down dismissal logic if dragging downward more than horizontally
        if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
          setDragYOffset(deltaY);
        }
      }
    }
  };

  const handleLightboxTouchEnd = () => {
    setPinchStartDist(null);

    if (dragYOffset > 110) {
      handleSetSelectedPhoto(null);
      setDragYOffset(0);
      return;
    }
    setDragYOffset(0);

    if (lightboxTouchStartX !== null && lightboxTouchEndX !== null && lightboxTouchStartY !== null && lightboxTouchEndY !== null) {
      const deltaX = lightboxTouchStartX - lightboxTouchEndX;
      const deltaY = lightboxTouchStartY - lightboxTouchEndY;

      // Ensure it is horizontal swipe when zoom is 1
      if (Math.abs(deltaX) > Math.abs(deltaY) && zoomScale === 1) {
        if (deltaX > 55) {
          navigateLightbox(1);  // Swipe left -> Next photo
        } else if (deltaX < -55) {
          navigateLightbox(-1); // Swipe right -> Previous photo
        }
      }
    }

    setLightboxTouchStartX(null);
    setLightboxTouchEndX(null);
    setLightboxTouchStartY(null);
    setLightboxTouchEndY(null);
  };

  const handleDoubleTapZoomToggle = () => {
    setZoomScale(prev => (prev > 1.2 ? 1 : 2.5));
  };

  const galleryItems: GalleryItem[] = [
    {
      id: "photo-1",
      category: "RESIDENTIAL",
      title: "MODERN RESIDENCE FACADE",
      location: "Ibiza, Spain",
      camera: "Visualization Studio",
      settings: "Luxury Residential Concept",
      photographer: "BUILD THE MATRIX",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
      description: "Contemporary architectural composition exploring clean geometries, natural textures, soft daylight integration, and modern minimal spatial language."
    },
    {
      id: "photo-2",
      category: "VISUALIZATION",
      title: "BIM WORKFLOW VISUALIZATION",
      location: "Kyoto, Japan",
      camera: "Revit + Lumion Workflow",
      settings: "Architectural Coordination Lab",
      photographer: "BUILD THE MATRIX",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
      description: "A cinematic architectural workflow presentation showcasing Revit coordination, technical detailing, parametric systems, and collaborative BIM execution processes."
    },
    {
      id: "photo-3",
      category: "INTERIORS",
      title: "LUXURY INTERIOR AMBIENCE",
      location: "Reykjavik, Iceland",
      camera: "Interior Visualization Studio",
      settings: "Modern Hospitality Concept",
      photographer: "BUILD THE MATRIX",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
      description: "An elegant interior visualization focused on warm lighting, refined materials, soft textures, and immersive spatial experiences inspired by contemporary luxury living."
    },
    {
      id: "photo-4",
      category: "COMMERCIAL",
      title: "COMMERCIAL SPACE EXPERIENCE",
      location: "Amalfi, Italy",
      camera: "Commercial Architecture Division",
      settings: "Retail & Workspace Concepts",
      photographer: "BUILD THE MATRIX",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
      description: "A premium commercial environment designed with intelligent circulation planning, atmospheric lighting, modern branding elements, and functional spatial interaction."
    },
    {
      id: "photo-5",
      category: "VISUALIZATION",
      title: "ATMOSPHERIC ARCHITECTURAL RENDER",
      location: "Oslo, Norway",
      camera: "Cinematic Rendering Lab",
      settings: "Exterior Visualization Study",
      photographer: "BUILD THE MATRIX",
      imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
      description: "A cinematic exterior visualization combining environmental realism, natural lighting simulations, reflective materials, and modern architectural storytelling."
    },
    {
      id: "photo-6",
      category: "RESIDENTIAL",
      title: "MODERN URBAN SPATIAL FORM",
      location: "Amangiri, USA",
      camera: "Urban Design Studio",
      settings: "High-Rise Living Concept",
      photographer: "BUILD THE MATRIX",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
      description: "An architectural concept focused on urban living, façade rhythm, structural balance, and contemporary luxury aesthetics."
    }
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likes.includes(id)) {
      setLikes(likes.filter(item => item !== id));
    } else {
      setLikes([...likes, id]);
    }
  };

  const filteredItems = activeFilter === "ALL"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-20 md:pb-24 lg:pb-32 bg-studio-black text-gold-light min-h-screen relative overflow-hidden">
      {/* Structural visual grid lines */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.05]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.03] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.03] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Gallery title */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-5 sm:mb-12 lg:mb-16">
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#00E5FF] uppercase block mb-2 sm:mb-3 font-semibold">
              04 // ARCHITECTURAL VISUAL GALLERY
            </span>
             <h2 className="font-serif text-xl sm:text-4xl lg:text-5xl tracking-tight text-glow font-light leading-none">
              Spatial Frames & <span className="italic">Design Perspectives</span>
            </h2>
          </div>

          {/* Filtration bar */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
            {["ALL", "RESIDENTIAL", "COMMERCIAL", "INTERIORS", "VISUALIZATION"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[8.5px] sm:text-[9px] tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                  activeFilter === filter
                    ? "bg-gold-beige text-studio-black border-gold-beige font-semibold"
                    : "bg-transparent text-gold-beige/50 border-white/[0.15] hover:text-gold-light hover:border-gold-beige/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry/Flex grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isLiked = likes.includes(item.id);
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onClick={() => handleSetSelectedPhoto(item)}
                  className="group relative bg-studio-dark/30 backdrop-blur-xl border border-white/10 p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 rounded-none cursor-pointer hover:border-gold-beige/55 hover:bg-studio-dark/45 hover:shadow-2xl hover:shadow-black/70 transition-all duration-500 overflow-hidden shadow-xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-studio-charcoal/20 border border-white/[0.05]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-40 duration-500" />
                    
                    {/* Floating trigger indicators */}
                    <div className="absolute top-3 right-3 p-2 bg-studio-black/60 backdrop-blur-xl rounded-none border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-1 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-gold-beige" />
                      <span className="font-mono text-[8px] tracking-widest text-[#E8DDCF] uppercase">Zoom</span>
                    </div>

                    <div className="absolute bottom-4 left-4 p-x bg-black/35 backdrop-blur-sm border border-white/5 font-mono text-[8.5px] uppercase tracking-wider text-gold-beige px-2 py-0.5">
                      {item.category}
                    </div>
                  </div>

                  {/* Core Photo specs */}
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center text-xs flex-nowrap border-b border-white/[0.05] pb-2">
                      <p className="font-serif text-sm sm:text-base font-medium tracking-tight text-[#E8DDCF] leading-tight truncate max-w-[75%]">
                        {item.title}
                      </p>
                      
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className={`p-1.5 transition-colors duration-300 ${
                          isLiked ? "text-rose-500" : "text-white/20 hover:text-rose-400"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-[#7F7A75] uppercase tracking-widest flex items-center gap-1">
                        <Camera className="w-3 h-3 text-gold-beige/70" />
                        {item.camera}
                      </span>
                      <span className="font-mono text-[9.5px] text-gold-sand/85 tracking-tight">
                        {item.settings}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Master Lightbox Portal */}
        <AnimatePresence>
          {selectedPhoto && (
            <div data-no-swipe="true" className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-studio-black/95 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSetSelectedPhoto(null)}
                className="absolute inset-0 bg-studio-black"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-zinc-950 border border-white/10 text-gold-light max-w-5xl w-full flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden rounded-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.9)] z-10"
                style={{
                  transform: `translateY(${dragYOffset}px)`,
                  opacity: Math.max(0.3, 1 - dragYOffset / 320),
                  transition: dragYOffset === 0 ? "transform 0.3s ease-out, opacity 0.3s ease-out" : "none"
                }}
              >
                {/* Close Button top right */}
                <button
                  onClick={() => handleSetSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-[20] p-2 bg-black/65 border border-white/10 hover:border-gold-beige text-gold-beige hover:text-white transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
                  title="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Gesture guide note indicator */}
                <div className="hidden sm:flex items-center gap-1.5 text-white/40 font-mono text-[8px] tracking-wider mb-3">
                  <HelpCircle className="w-3 h-3 text-gold-beige" />
                  <span>GESTURE MODE ACTIVE // SWIPE L/R TO NAVIGATE · PINCH OR DOUBLE-TAP IMAGE TO ZOOM · SWIPE/DRAG DOWN TO CLOSE</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
                  {/* Visual section with support for both pinch-to-zoom and swiping */}
                  <div className="lg:col-span-8 relative aspect-[4/3] md:aspect-[16/10] bg-zinc-900 border border-white/[0.08] overflow-hidden select-none flex items-center justify-center">
                    
                    {/* Left arrow trigger overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateLightbox(-1);
                      }}
                      className="absolute left-2 z-[10] p-1.5 sm:p-2 bg-black/40 hover:bg-black/85 text-white/70 hover:text-white border border-white/5 hover:border-gold-beige transition-all duration-300"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Image viewport with real-time translation state */}
                    <div
                      onTouchStart={handleLightboxTouchStart}
                      onTouchMove={handleLightboxTouchMove}
                      onTouchEnd={handleLightboxTouchEnd}
                      onDoubleClick={handleDoubleTapZoomToggle}
                      className="w-full h-full relative overflow-hidden cursor-zoom-in active:cursor-move flex items-center justify-center"
                    >
                      <img
                        src={selectedPhoto.imageUrl}
                        alt={selectedPhoto.title}
                        className="w-full h-full object-cover origin-center"
                        style={{
                          transform: `scale(${zoomScale})`,
                          transition: pinchStartDist !== null ? "none" : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                        referrerPolicy="no-referrer"
                        draggable={false}
                      />
                    </div>

                    {/* Right arrow trigger overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateLightbox(1);
                      }}
                      className="absolute right-2 z-[10] p-1.5 sm:p-2 bg-black/40 hover:bg-black/85 text-white/70 hover:text-white border border-white/5 hover:border-gold-beige transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>



                    {zoomScale > 1 && (
                      <div className="absolute bottom-4 left-4 px-2 py-1 bg-[#00E5FF]/90 text-black font-mono text-[8px] font-bold tracking-widest uppercase">
                        ZOOMED IN: {zoomScale.toFixed(1)}X (DOUBLE TAP OR DOUBLE CLICK TO RESET)
                      </div>
                    )}
                  </div>

                  {/* Data context section */}
                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div>
                      {/* Section header info */}
                      <div className="pb-3 border-b border-white/[0.08] mb-4 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-[#00E5FF] tracking-[0.25em] uppercase font-bold">
                          PHOTOGRAPHY PROTOCOL INDEX
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[8px] text-[#7F7A75] uppercase tracking-widest font-semibold text-left">
                            PROJECT TITLE
                          </span>
                          <h4 className="font-serif text-lg sm:text-xl font-light text-[#E8DDCF] tracking-tight leading-tight text-left">
                            {selectedPhoto.title}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-2.5 flex flex-col gap-0.5 text-left">
                            <span className="font-mono text-[8px] text-[#7F7A75] uppercase tracking-widest">
                              DEVELOPER COORDINATION
                            </span>
                            <span className="font-sans text-xs text-[#E8DDCF] font-semibold flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5 text-gold-beige" />
                              {selectedPhoto.camera}
                            </span>
                          </div>

                          <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-2.5 flex flex-col gap-0.5 text-left">
                            <span className="font-mono text-[8px] text-[#7F7A75] uppercase tracking-widest">
                              REHABILITATION SPECS
                            </span>
                            <span className="font-mono text-[10px] text-gold-beige">
                              {selectedPhoto.settings}
                            </span>
                          </div>

                          <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-2.5 flex flex-col gap-0.5 text-left">
                            <span className="font-mono text-[8px] text-[#7F7A75] uppercase tracking-widest">
                              SPATIAL CONCEPT OVERVIEW
                            </span>
                            <span className="font-sans text-xs text-gold-sand/90 leading-relaxed text-justify">
                              {selectedPhoto.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Footer action */}
                    <div className="border-t border-white/[0.06] pt-4 mt-4 flex justify-between items-center bg-black/20 p-2 border border-white/5">
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[7px] text-[#7F7A75] uppercase tracking-widest">
                          LOCATION COORDINATION
                        </span>
                        <span className="font-sans text-2xs text-[#E8DDCF] font-medium uppercase mt-0.5">
                          {selectedPhoto.location}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setDownloadStatus(`Initiating high-res digital footprint for "${selectedPhoto.title}". Safe token download queued...`);
                          handleSetSelectedPhoto(null);
                          setTimeout(() => setDownloadStatus(null), 5000);
                        }}
                        className="px-3.5 py-2 bg-gold-beige hover:bg-gold-light text-studio-black font-mono text-[8.5px] tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer font-bold flex items-center gap-1"
                      >
                        High-Res Render
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Carousel Indicator Rail */}
                <div className="mt-5 pt-3 border-t border-white/[0.08] flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[8.5px] font-mono tracking-widest text-[#7F7A75]">
                    <span className="uppercase text-left flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                      ACTIVE CAROUSEL PORTAL STREAM
                    </span>
                    <span className="text-gold-beige font-semibold">
                      IMAGE {filteredItems.findIndex(item => item.id === selectedPhoto.id) + 1} OF {filteredItems.length}
                    </span>
                  </div>
                  
                  <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {filteredItems.map((item, idx) => {
                      const isCurrent = item.id === selectedPhoto.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleSetSelectedPhoto(item);
                            setZoomScale(1);
                            setDragYOffset(0);
                          }}
                          className={`relative min-w-[75px] w-[75px] aspect-[4/3] sm:min-w-[95px] sm:w-[95px] overflow-hidden border transition-all duration-300 ${
                            isCurrent
                              ? "border-[#00E5FF] scale-[1.03] shadow-lg shadow-[#00E5FF]/25 opacity-100"
                              : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/30"
                          }`}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="font-mono text-[9px] text-white">SELECT {idx + 1}</span>
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/85 px-1 py-0.5 text-[8px] font-mono text-white tracking-tighter">
                            {idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Global Toast Notification for Download Trigger */}
        <AnimatePresence>
          {downloadStatus && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="fixed bottom-6 right-6 z-[2000] bg-gold-beige/90 backdrop-blur-lg text-studio-black font-mono text-[10px] tracking-wider uppercase p-4 border border-white/65 shadow-2xl max-w-sm flex flex-col gap-1.5 shadow-black/30"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">SYSTEM DOWNLOAD AGENT</span>
                <button onClick={() => setDownloadStatus(null)} className="p-0.5 hover:opacity-70 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="font-sans text-2xs normal-case leading-relaxed text-studio-charcoal">
                {downloadStatus}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Deep Dive: Analytical Research: The Photographic Theory of Spatial Honesty */}
        <div className="mt-28 border-t border-white/[0.08] pt-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#7F7A75] uppercase font-bold">
                DOCUMENTATION METHODOLOGY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E8DDCF] leading-none">
                The Theory of <span className="italic font-normal text-gold-beige block mt-1">Spatial Honesty</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gold-sand/85 leading-relaxed font-light mt-3 text-justify">
                At BUILD THE MATRIX, we reject standard digital HDR architectural photography, which artificially amplifies ambient shadows to remove the deep natural contrast of raw materials. We believe space must be documented with absolute honesty. Therefore, we shoot exclusively on analog silver halide large-format film.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] backdrop-blur-md border border-white/10 flex flex-col gap-4 max-w-sm w-full shadow-sm">
              <span className="font-mono text-[8px] text-gold-beige uppercase tracking-widest font-semibold">
                THE ANALOG VERIFICATION RULE
              </span>
              <p className="font-sans text-[11px] text-gold-sand/70 leading-relaxed font-light text-justify">
                "No post-process digital rendering can imitate the structural thickness of natural silver grains. By allowing fog, light-leaks, and temperature fluctuations to touch the negative, we document a property's authentic weight."
              </p>
              <span className="font-serif text-xs text-gold-beige italic text-right">
                — François Halard, Commission Artist
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "I",
                concept: "THE WEIGHT OF DUST",
                title: "Grain vs. Noise",
                desc: "Analog grain is physical. Unlike flat microscopic digital noise, chemical silver crystals cluster organically, reflecting the subtle pores of off-shutter concrete and hand-carved travertine tiles."
              },
              {
                num: "II",
                concept: "CHROMATIC AUTONOMY",
                title: "Muted Emulsions",
                desc: "We calibrate our emulsions to catch slow transitions. This matches the exact low-vibrant thermal temperature of direct forest floor shadows or ocean-sprayed basalt sea walls."
              },
              {
                num: "III",
                concept: "TEMPORAL PATINA",
                title: "The Imperfect Record",
                desc: "Buildings are organic entities that change. Slower Hasselblad exposures of light trajectories capture wind-brume and drifting cloud blankets, printing the passage of real-time directly onto the frame."
              }
            ].map((p, idx) => (
              <div key={idx} className="p-8 bg-studio-dark/30 backdrop-blur-xl border border-white/5 flex flex-col justify-between relative group hover:border-white/20 hover:bg-studio-dark/45 duration-500 shadow-lg">
                <div>
                  <span className="font-mono text-xs text-gold-beige/50 font-bold tracking-widest block mb-4">{p.num} // {p.concept}</span>
                  <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-serif text-lg text-gold-light font-light tracking-wide">{p.title}</h4>
                    <p className="font-sans text-2xs sm:text-xs text-gold-sand/65 leading-relaxed font-light text-justify">{p.desc}</p>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.04] font-mono text-[8px] text-[#7F7A75] uppercase tracking-widest text-right">
                  Theory Document Ref // D-0{idx+1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Interactive Simulation: Experimental Film Stocks & Light Grids */}
        <div className="mt-28 border-t border-white/[0.08] pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#7F7A75] uppercase font-bold">
                INTERACTIVE BIM & VISUALIZATION LAB
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E8DDCF] leading-tight">
                Intelligent <br />
                <span className="italic font-normal text-gold-beige text-glow">Workflow Systems</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gold-sand/85 leading-relaxed font-light text-justify">
                Explore the digital process behind BUILD THE MATRIX projects through integrated architectural technologies and advanced visualization pipelines.
              </p>

              {/* Film simulator controller */}
              <FilmStockController />
            </div>

            <div className="lg:col-span-7 bg-studio-dark/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 flex flex-col gap-6 relative shadow-2xl shadow-black/60">
              
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] tracking-widest text-gold-beige uppercase font-bold">
                  DESIGN TECHNOLOGY STANDARDS
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#E8DDCF] tracking-tight font-light leading-snug">
                  Advanced Architectural <br />
                  <span className="italic font-normal text-gold-beige text-glow">Workflow Systems</span>
                </span>
              </div>

              <p className="font-sans text-xs text-gold-sand/80 leading-relaxed font-light text-justify">
                Our studio combines architectural creativity with modern digital systems to ensure every project maintains technical accuracy, visual excellence, and efficient coordination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 bg-white/[0.02] backdrop-blur-md border border-white/[0.08] flex flex-col gap-1 hover:border-gold-beige/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xs">
                  <span className="font-mono text-[9px] text-gold-beige uppercase tracking-wider font-semibold">
                    BIM COORDINATION
                  </span>
                  <span className="font-sans text-xs text-[#E8DDCF] font-light">
                    Integrated multi-disciplinary project workflows.
                  </span>
                </div>

                <div className="p-4 bg-white/[0.02] backdrop-blur-md border border-white/[0.08] flex flex-col gap-1 hover:border-gold-beige/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xs">
                  <span className="font-mono text-[9px] text-gold-beige uppercase tracking-wider font-semibold">
                    PHOTOREALISTIC RENDERING
                  </span>
                  <span className="font-sans text-xs text-[#E8DDCF] font-light">
                    High-end cinematic architectural visualizations.
                  </span>
                </div>

                <div className="p-4 bg-white/[0.02] backdrop-blur-md border border-white/[0.08] flex flex-col gap-1 hover:border-gold-beige/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xs">
                  <span className="font-mono text-[9px] text-gold-beige uppercase tracking-wider font-semibold">
                    CONSTRUCTION DOCUMENTATION
                  </span>
                  <span className="font-sans text-xs text-[#E8DDCF] font-light">
                    Precise technical drawings and detailing systems.
                  </span>
                </div>

                <div className="p-4 bg-white/[0.02] backdrop-blur-md border border-white/[0.08] flex flex-col gap-1 hover:border-gold-beige/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xs">
                  <span className="font-mono text-[9px] text-gold-beige uppercase tracking-wider font-semibold">
                    REAL-TIME VISUALIZATION
                  </span>
                  <span className="font-sans text-xs text-[#E8DDCF] font-light">
                    Interactive walkthroughs and immersive presentations.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Interactive subcomponent for Emulsion simulation
function FilmStockController() {
  const [activeTab, setActiveTab] = useState<"software" | "settings">("software");

  const softwareDb = [
    { name: "Autodesk Revit", role: "Parametric Design & BIM coordination" },
    { name: "Lumion", role: "Real-time cinematic rendering agency" },
    { name: "3ds Max", role: "High-fidelity structural modeling" },
    { name: "V-Ray", role: "Physically-based trace light calculator" },
    { name: "Photoshop", role: "Post-production & texture matte painting" },
    { name: "AutoCAD", role: "2D schema drafting & baseline engineering" },
  ];

  const settingsDb = [
    { name: "Cinematic Lighting", value: "Raytraced Global Illumination", status: "Optimal" },
    { name: "Realistic Material Mapping", value: "8K PBR Textures / Tri-planar", status: "Enabled" },
    { name: "Atmospheric Fog Effects", value: "Volumetric Scattering Index", status: "Calibrated" },
    { name: "HDRI Environment Integration", value: "32-bit Dome Mapping", status: "Active" },
    { name: "High-Resolution Rendering Pipelines", value: "CUDA GPU Accelerated Cluster", status: "Active" },
  ];

  return (
    <div className="flex flex-col gap-4 p-5 bg-white/[0.02] backdrop-blur-md border border-white/[0.08] mt-3 shadow-md">
      <div className="flex border-b border-white/[0.06] pb-2 mb-2 gap-4">
        <button
          onClick={() => setActiveTab("software")}
          className={`pb-2 text-[10px] uppercase font-mono tracking-widest cursor-pointer duration-300 relative ${
            activeTab === "software" ? "text-gold-beige font-semibold" : "text-[#7F7A75] hover:text-[#E8DDCF]"
          }`}
        >
          BIM SOFTWARE ENVIRONMENT
          {activeTab === "software" && (
            <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gold-beige" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-2 text-[10px] uppercase font-mono tracking-widest cursor-pointer duration-300 relative ${
            activeTab === "settings" ? "text-gold-beige font-semibold" : "text-[#7F7A75] hover:text-[#E8DDCF]"
          }`}
        >
          VISUALIZATION SETTINGS
          {activeTab === "settings" && (
            <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gold-beige" />
          )}
        </button>
      </div>

      <div className="min-h-[160px] flex flex-col justify-between">
        {activeTab === "software" ? (
          <div className="grid grid-cols-2 gap-3">
            {softwareDb.map((s, idx) => (
              <div key={idx} className="p-2.5 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] flex flex-col hover:border-gold-beige/30 hover:bg-white/[0.05] transition-all duration-300">
                <span className="font-serif text-xs text-gold-light tracking-wide">{s.name}</span>
                <span className="font-mono text-[8px] text-[#7F7A75] mt-1 uppercase tracking-tight">{s.role}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {settingsDb.map((s, idx) => (
              <div key={idx} className="p-2 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] flex justify-between items-center transition-all duration-300 hover:border-gold-beige/30 hover:bg-white/[0.05]">
                <div className="flex flex-col">
                  <span className="font-sans text-2xs text-gold-light font-medium">{s.name}</span>
                  <span className="font-mono text-[8px] text-[#7F7A75] uppercase">{s.value}</span>
                </div>
                <span className="font-mono text-[8.5px] text-gold-beige/75 border border-gold-beige/10 px-1.5 py-0.5 bg-gold-beige/5">{s.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-white/[0.05] flex justify-between items-center font-mono text-[8px] text-[#7F7A75]">
        <span>INTELLIGENT PIPELINE PORT</span>
        <span>STATUS: ACTIVE COMPILATION</span>
      </div>
    </div>
  );
}
