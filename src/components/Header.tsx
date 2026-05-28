import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activePage: string;
  onNavigate: (pageId: string) => void;
  isLightboxOpen?: boolean;
  isProjectOpen?: boolean;
}

const navItems = [
  { id: "home", label: "HOME" },
  { id: "studio", label: "STUDIO" },
  { id: "work", label: "WORK" },
  { id: "gallery", label: "GALLERY" },
  { id: "process", label: "PROCESS" },
];

export default function Header({ activePage, onNavigate, isLightboxOpen, isProjectOpen }: HeaderProps) {
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

  const isLightPage = activePage === "studio" || activePage === "contact";
  const isHidden = isLightboxOpen || isProjectOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
          isHidden ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        } ${
          isScrolled
            ? isLightPage
              ? "py-4 bg-gold-light/65 backdrop-blur-xl border-b border-white/40 shadow-md"
              : "py-4 bg-studio-black/55 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Title Area - BUILD THE MATRIX */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-start cursor-pointer text-left group gap-0.5 pointer-events-auto"
          >
            <span className={`font-sans text-base tracking-[0.25em] font-bold leading-none transition-colors duration-300 ${
              isLightPage ? "text-studio-black hover:text-studio-black/80" : "text-white hover:text-white/80"
            }`}>
              BUILD THE MATRIX
            </span>
            <span className={`font-mono text-[8px] tracking-[0.35em] font-light uppercase leading-normal sm:leading-none mt-2 ${
              isLightPage ? "text-studio-black/55" : "text-white/45"
            }`}>
              <span className="block sm:inline">BUILDING EXCELLENCE.{" "}</span>
              <span className="block sm:inline">CREATING LEGACIES.</span>
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
                      className={`relative py-2 text-[10.5px] font-mono tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer font-medium ${
                        isLightPage
                          ? "text-studio-black/60 hover:text-studio-black"
                          : "text-gold-beige/60 hover:text-gold-light"
                      }`}
                    >
                      <span className={isActive ? (isLightPage ? "text-studio-black font-bold" : "text-gold-light font-bold text-glow") : ""}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                            isLightPage ? "bg-studio-black" : "bg-gold-beige"
                          }`}
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
                  ? isLightPage
                    ? "bg-studio-black text-gold-light border-studio-black font-bold"
                    : "bg-gold-beige text-studio-black border-gold-beige font-bold"
                  : isLightPage
                    ? "bg-transparent text-studio-black border-studio-black/30 hover:border-studio-black hover:bg-studio-black/5"
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
            className={`lg:hidden p-2 transition-colors cursor-pointer ${
              isLightPage ? "text-studio-black hover:text-studio-black/60" : "text-gold-light hover:text-gold-beige"
            }`}
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
            className={`fixed inset-0 z-35 flex flex-col justify-between p-5 pt-20 sm:p-8 sm:pt-32 lg:hidden overflow-y-auto ${
              isLightPage 
                ? "bg-gold-light/85 backdrop-blur-2xl text-studio-black border-r border-white/40 shadow-xl" 
                : "bg-studio-black/85 backdrop-blur-2xl text-gold-light border-r border-white/10 shadow-xl"
            }`}
          >
            {/* Background Atmosphere */}
            <div className={`absolute inset-x-0 top-0 h-64 pointer-events-none ${
              isLightPage ? "bg-gradient-to-b from-studio-black/5 to-transparent" : "bg-gradient-to-b from-white/5 to-transparent"
            }`} />

            <ul className="flex flex-col gap-3 sm:gap-6 items-start my-auto pl-2 sm:pl-4 py-6">
              {navItems.map((item, index) => {
                const isActive = activePage === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left font-serif text-[22px] sm:text-3xl md:text-4xl italic font-light tracking-wide transition-colors duration-300 py-1.5 sm:py-2.5 flex items-baseline gap-3 sm:gap-4 cursor-pointer ${
                        isLightPage
                          ? "text-studio-black/50 hover:text-studio-black"
                          : "text-gold-beige/50 hover:text-gold-light"
                      }`}
                    >
                      <span className={`font-mono text-[9px] sm:text-[10px] tracking-widest not-italic ${
                        isLightPage ? "text-studio-black/60" : "text-gold-beige"
                      }`}>
                        0{index + 1}
                      </span>
                      <span className={isActive ? (isLightPage ? "text-studio-black not-italic font-bold border-b border-studio-black" : "text-gold-light not-italic font-bold border-b border-gold-beige") : ""}>
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                );
              })}

              {/* Mobile Contact trigger */}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => handleNavClick("contact")}
                  className={`text-left font-serif text-[22px] sm:text-3xl md:text-4xl italic font-light tracking-wide transition-colors duration-300 py-1.5 sm:py-2.5 flex items-baseline gap-3 sm:gap-4 cursor-pointer ${
                    isLightPage
                      ? "text-studio-black/50 hover:text-studio-black"
                      : "text-gold-beige/50 hover:text-gold-light"
                  }`}
                >
                  <span className={`font-mono text-[9px] sm:text-[10px] tracking-widest not-italic ${
                    isLightPage ? "text-gold-bronze" : "text-[#B45309]"
                  }`}>
                    06
                  </span>
                  <span className={activePage === "contact" ? (isLightPage ? "text-studio-black not-italic font-bold border-b border-studio-black" : "text-gold-light not-italic font-bold border-b border-gold-beige") : ""}>
                    CONTACT US
                  </span>
                </button>
              </motion.li>
            </ul>

            {/* Bottom Info Cards / Socials */}
            <div className={`border-t pt-5 sm:pt-8 flex flex-col gap-3 sm:gap-4 font-mono text-xs uppercase pl-2 sm:pl-4 mt-auto ${
              isLightPage ? "border-studio-black/[0.08]" : "border-white/[0.04]"
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-studio-gray tracking-wider block mb-1">
                    Direct Correspondence
                  </span>
                  <a
                    href="mailto:contact@leftcoastdesignstudio.com"
                    className={`duration-300 text-[10px] sm:text-xs block truncate ${
                      isLightPage ? "text-studio-black hover:text-studio-black/70" : "text-gold-beige hover:text-gold-light"
                    }`}
                  >
                    contact@leftcoastdesignstudio.com
                  </a>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] text-studio-gray tracking-wider block mb-1">
                    Social Presences
                  </span>
                  <div className={`flex gap-3 text-[10px] sm:text-xs ${
                    isLightPage ? "text-studio-black" : "text-gold-light"
                  }`}>
                    <span className="hover:opacity-75 duration-300 cursor-pointer">IG</span>
                    <span className="text-studio-gray">•</span>
                    <span className="hover:opacity-75 duration-300 cursor-pointer">LN</span>
                  </div>
                </div>
              </div>

              <div className="text-[8px] sm:text-[9px] text-studio-gray tracking-widest mt-2 sm:mt-4">
                © BUILD THE MATRIX LLC 2026. ALL LAND LANDMARKS RESPECTED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
