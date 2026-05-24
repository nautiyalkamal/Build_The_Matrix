import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activePage: string;
  onNavigate: (pageId: string) => void;
}

const navItems = [
  { id: "home", label: "HOME" },
  { id: "studio", label: "STUDIO" },
  { id: "work", label: "WORK" },
  { id: "gallery", label: "GALLERY" },
  { id: "process", label: "PROCESS" },
];

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
          isScrolled
            ? "py-4 bg-studio-black/90 backdrop-blur-xl border-b border-white/[0.04]"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Title Area - BUILD THE MATRIX */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-start cursor-pointer text-left group gap-0.5 pointer-events-auto"
          >
            <span className="font-sans text-base tracking-[0.25em] font-bold leading-none text-white hover:text-white/80 transition-colors duration-300">
              BUILD THE MATRIX
            </span>
            <span className="font-mono text-[8px] tracking-[0.35em] text-white/45 font-light uppercase leading-none mt-2">
              BUILDING EXCELLENCE. CREATING LEGACIES.
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="relative py-2 text-[10.5px] font-mono tracking-[0.25em] uppercase text-gold-beige/60 hover:text-gold-light transition-all duration-300 cursor-pointer font-medium"
                    >
                      <span className={isActive ? "text-gold-light font-bold text-glow" : ""}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-beige"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Premium CTA Button -> CONTACT US */}
            <button
              onClick={() => handleNavClick("contact")}
              className={`ml-4 px-5 py-3 border font-mono text-[10px] tracking-widest uppercase transition-all duration-500 flex items-center gap-2 cursor-pointer group rounded-none ${
                activePage === "contact"
                  ? "bg-gold-beige text-studio-black border-gold-beige font-bold"
                  : "bg-transparent text-gold-light border-white/15 hover:border-gold-beige"
              }`}
            >
              CONTACT US
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300" />
            </button>
          </nav>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gold-light hover:text-gold-beige transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-35 bg-studio-black flex flex-col justify-between p-8 pt-32 lg:hidden"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <ul className="flex flex-col gap-6 items-start my-auto pl-4">
              {navItems.map((item, index) => {
                const isActive = activePage === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="text-left font-serif text-3xl md:text-4xl italic font-light tracking-wide text-gold-beige/50 hover:text-gold-light transition-colors duration-300 py-1 flex items-baseline gap-4 cursor-pointer"
                    >
                      <span className="font-mono text-[10px] tracking-widest text-gold-beige not-italic">
                        0{index + 1}
                      </span>
                      <span className={isActive ? "text-gold-light not-italic font-bold border-b border-gold-beige" : ""}>
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                );
              })}

              {/* Mobile Contact trigger */}
              <motion.li
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.5 }}
              >
                <button
                  onClick={() => handleNavClick("contact")}
                  className="text-left font-serif text-3xl md:text-4xl italic font-light tracking-wide text-gold-beige/50 hover:text-gold-light transition-colors duration-300 py-1 flex items-baseline gap-4 cursor-pointer"
                >
                  <span className="font-mono text-[10px] tracking-widest text-[#B45309] not-italic">
                    06
                  </span>
                  <span className={activePage === "contact" ? "text-gold-light not-italic font-bold border-b border-gold-beige" : ""}>
                    CONTACT US
                  </span>
                </button>
              </motion.li>
            </ul>

            {/* Bottom Info Cards / Socials */}
            <div className="border-t border-white/[0.04] pt-8 flex flex-col gap-4 font-mono text-xs uppercase pl-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-[#7F7A75] tracking-wider block mb-1">
                    Direct Correspondence
                  </span>
                  <a
                    href="mailto:contact@leftcoastdesignstudio.com"
                    className="text-gold-beige hover:text-gold-light duration-300"
                  >
                    contact@leftcoastdesignstudio.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-[#7F7A75] tracking-wider block mb-1">
                    Social Presences
                  </span>
                  <div className="flex gap-3 text-[11px] text-gold-light">
                    <span className="hover:text-gold-beige duration-300 cursor-pointer">IG</span>
                    <span className="text-studio-gray">•</span>
                    <span className="hover:text-gold-beige duration-300 cursor-pointer">LN</span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-studio-gray tracking-widest mt-4">
                © BUILD THE MATRIX LLC 2026. ALL LAND LANDMARKS RESPECTED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
