import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
const HERO_VILLA_URL = "/src/assets/images/hero_villa_1779562451333.png";
const INTERIOR_LIVING_URL = "/src/assets/images/interior_living_1779562473243.png";
const EXTERIOR_FACADE_URL = "/src/assets/images/exterior_facade_1779562491784.png";
const FOREST_PAVILION_URL = "/src/assets/images/forest_pavilion_1779562509341.png";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          />
        );
      case "gallery":
        return <Gallery />;
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
    <div className="relative min-h-screen bg-studio-black text-gold-light font-sans overflow-x-hidden">
      
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
            <Header activePage={activePage} onNavigate={handlePageNavigation} />

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

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
