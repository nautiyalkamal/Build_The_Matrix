import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CornerDownRight, Compass, Smartphone, Info, MapPin } from "lucide-react";

import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page imports for the clean multi-page modular architecture
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Work from "./pages/Work";
import Gallery from "./pages/Gallery";
import Process from "./pages/Process";
import Contact from "./pages/Contact";

// Unified local image asset registry
// @ts-ignore
import HERO_VILLA_URL from "./assets/images/hero_villa_1779679999241.png";
// @ts-ignore
import INTERIOR_LIVING_URL from "./assets/images/interior_living_1779680017247.png";
// @ts-ignore
import FOREST_PAVILION_URL from "./assets/images/forest_pavilion_1779680035772.png";
const EXTERIOR_FACADE_URL = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  
  // Custom states for mobile gestures
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null);
  const [pinchImageSrc, setPinchImageSrc] = useState<string | null>(null);
  const [pinchZoomScale, setPinchZoomScale] = useState(1);
  const [isPinchOverlayOpen, setIsPinchOverlayOpen] = useState(false);
  const [touchRipples, setTouchRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  // 1. URL Hash routing logic: syncing URL hash state with page component rendered
  useEffect(() => {
    const handleUrlHashChange = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      const validPages = ["home", "studio", "work", "gallery", "process", "contact"];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage("home");
      }
      setIsProjectOpen(false);
      // Instantly scroll smoothly to the absolute top of safety grids on navigation transition
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    // Run audit check on initial mount
    handleUrlHashChange();

    window.addEventListener("hashchange", handleUrlHashChange);
    return () => window.removeEventListener("hashchange", handleUrlHashChange);
  }, []);

  // Update hash state and scroll to top on nav click
  const handlePageNavigation = (pageId: string) => {
    window.location.hash = `#/${pageId}`;
    setActivePage(pageId);
    setIsLightboxOpen(false);
    setIsProjectOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Touch Gesture Listeners (For Mobile Viewport Only)
  const handleGlobalTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return; // Only process inputs on mobile screens

    // Add a beautiful custom geometric touch feedback ring at the finger coordinate
    if (e.touches && e.touches.length > 0) {
      const touchPoint = e.touches[0];
      const newRipple = {
        id: Math.random() + Date.now(),
        x: touchPoint.clientX,
        y: touchPoint.clientY
      };
      setTouchRipples(prev => [...prev, newRipple].slice(-8)); // Limit multi-touch overflow
    }

    // Check for multi-touch (Pinch Out)
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setPinchStartDist(dist);
      
      const target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (target) {
        const img = target.tagName === "IMG" ? target as HTMLImageElement : target.querySelector("img");
        if (img && img.src) {
          setPinchImageSrc(img.src);
        }
      }
      return;
    }

    // Process single-touch (Swipes)
    if (e.touches.length === 1) {
      let element = e.target as HTMLElement | null;
      while (element) {
        // Bypass global swipes inside sliders, charts, form inputs, map or specifically marked divs
        if (
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          element.tagName === "BUTTON" ||
          (element.getAttribute && element.getAttribute("data-no-swipe") === "true")
        ) {
          return;
        }
        element = element.parentElement;
      }
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleGlobalTouchMove = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;

    if (e.touches.length === 2 && pinchStartDist !== null && pinchImageSrc) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleFactor = dist / pinchStartDist;
      if (scaleFactor > 1.22) { // Pinch out threshold
        setIsPinchOverlayOpen(true);
        setPinchZoomScale(Math.min(scaleFactor, 2.8));
      }
    }
  };

  const handleGlobalTouchEnd = (e: React.TouchEvent) => {
    setPinchStartDist(null);
    
    if (touchStartX === null || touchStartY === null) return;

    if (e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const deltaX = endX - touchStartX;
      const deltaY = endY - touchStartY;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      const swipeThreshold = 55;

      if (absDeltaX > absDeltaY && absDeltaX > swipeThreshold) {
        // Horizontal Swiping moves pages
        const pages = ["home", "studio", "work", "gallery", "process", "contact"];
        const currentIndex = pages.indexOf(activePage);

        if (deltaX < 0) {
          // Swipe Left -> next page
          const nextIdx = (currentIndex + 1) % pages.length;
          handlePageNavigation(pages[nextIdx]);
        } else {
          // Swipe Right -> previous page
          const prevIdx = (currentIndex - 1 + pages.length) % pages.length;
          handlePageNavigation(pages[prevIdx]);
        }
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Page renderer mapping
  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return (
          <Home
            onNavigate={handlePageNavigation}
            heroImage={HERO_VILLA_URL}
            pavilionImage={FOREST_PAVILION_URL}
          />
        );
      case "studio":
        return <Studio />;
      case "work":
        return (
          <Work
            heroImage={HERO_VILLA_URL}
            interiorImage={INTERIOR_LIVING_URL}
            exteriorImage={EXTERIOR_FACADE_URL}
            pavilionImage={FOREST_PAVILION_URL}
            onProjectOpenToggle={setIsProjectOpen}
          />
        );
      case "gallery":
        return <Gallery onLightboxToggle={setIsLightboxOpen} />;
      case "process":
        return <Process />;
      case "contact":
        return <Contact />;
      default:
        return (
          <Home
            onNavigate={handlePageNavigation}
            heroImage={HERO_VILLA_URL}
            pavilionImage={FOREST_PAVILION_URL}
          />
        );
    }
  };

  return (
    <div 
      onTouchStart={handleGlobalTouchStart}
      onTouchMove={handleGlobalTouchMove}
      onTouchEnd={handleGlobalTouchEnd}
      className="relative min-h-screen bg-studio-black text-gold-light font-sans overflow-x-hidden"
    >
      
      {/* 1. Film grain cinematic dust layer */}
      <div className="film-grain" />

      {/* 2. Cinematic Loading Intro Sequence */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="application-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen justify-between"
          >
            {/* Header / Brand Overlay Navigation */}
            <Header activePage={activePage} onNavigate={handlePageNavigation} isLightboxOpen={isLightboxOpen} isProjectOpen={isProjectOpen} />





            {/* Pinch Out Fullscreen Immersive Modal */}
            <AnimatePresence>
              {isPinchOverlayOpen && pinchImageSrc && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl md:hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsPinchOverlayOpen(false)}
                    className="absolute inset-0"
                  />
                  <div className="relative z-10 w-full max-w-lg flex flex-col justify-between items-center h-[90vh]">
                    <div className="w-full flex justify-between items-center border-b border-zinc-800 pb-3">
                      <span className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">DETAIL INSPECTION PORT // 2026</span>
                      <button
                        onClick={() => setIsPinchOverlayOpen(false)}
                        className="p-1 px-2 text-glow border border-zinc-800 hover:border-[#E8DDCF] font-mono text-[9px] uppercase tracking-wider bg-transparent text-[#E8DDCF] cursor-pointer"
                      >
                        Exit Inspection
                      </button>
                    </div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: pinchZoomScale, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full max-h-[60vh] bg-zinc-900 border border-zinc-800 overflow-hidden relative shadow-2xl flex items-center justify-center"
                    >
                      <img
                        src={pinchImageSrc}
                        alt="Immersive Matrix view"
                        className="w-full h-auto object-contain max-h-[55vh]"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>

                    <div className="p-4 bg-zinc-950/60 border border-zinc-900 w-full text-center">
                      <span className="font-mono text-[8.5px] text-gold-beige uppercase tracking-wider block">HIGH-RESOLUTION SCAN CORRELATOR</span>
                      <p className="font-sans text-[11px] text-zinc-400 mt-1 font-light leading-relaxed">
                        Scale adjusted: {Math.round(pinchZoomScale * 100)}%. Adjust fingers to pinch or tap outer black spacer to collapse.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Main Interactive Viewport Container with slide and fade transitions */}
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderActivePage()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Shared Master Acknowledgement & Details Footer Panel */}
            <Footer
              onNavigate={handlePageNavigation}
              curvedStructureImage={EXTERIOR_FACADE_URL}
            />

            {/* Premium, interactive vector touch feedback ripples for mobile only */}
            {window.innerWidth < 768 && touchRipples.map((ripple) => (
              <motion.div
                key={ripple.id}
                initial={{ opacity: 0.95, scale: 0.15 }}
                animate={{ opacity: 0, scale: 3.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                onAnimationComplete={() => {
                  setTouchRipples(prev => prev.filter(r => r.id !== ripple.id));
                }}
                className="pointer-events-none fixed z-[9999] rounded-full border border-amber-500/50 bg-amber-500/5 shadow-[0_0_12px_rgba(245,158,11,0.35)] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: "48px",
                  height: "48px",
                }}
              />
            ))}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
