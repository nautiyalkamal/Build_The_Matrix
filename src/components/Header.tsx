import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Phone, PhoneCall, Printer, Users, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MatrixParticles from "./MatrixParticles";

interface HeaderProps {
  activePage: string;
  onNavigate: (pageId: string) => void;
  isLightboxOpen?: boolean;
  isProjectOpen?: boolean;
}

const navItems = [
  { id: "home", label: "HOME" },
  { id: "studio", label: "COMPANY" },
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
        className={`fixed top-0 left-0 w-full z-40 h-20 sm:h-24 flex items-center transition-all duration-700 overflow-hidden ${
          isHidden ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        } ${
          isScrolled
            ? isLightPage
              ? "bg-gold-light/65 backdrop-blur-xl border-b border-white/40 shadow-md"
              : "bg-studio-black/55 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Floating Matrix Particles background across the header */}
        <MatrixParticles 
          particleCount={25} 
          showGrid={false} 
          accentColor={isLightPage ? "rgba(196, 154, 108, " : "rgba(0, 229, 255, "}
          particleColor={isLightPage ? "30, 30, 30" : "255, 255, 255"}
        />

        <div className="w-full max-w-7xl lg:max-w-none mx-auto px-6 lg:pl-6 lg:pr-8 xl:pl-8 xl:pr-10 flex justify-between items-center relative z-10">
          {/* Logo / Title Area - BUILD THE MATRIX Pvt.  Ltd. */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex flex-col items-start cursor-pointer text-left group gap-0.5 pointer-events-auto shrink-0 lg:mr-auto"
          >
            <span className={`font-sans text-base whitespace-nowrap tracking-[0.14em] sm:tracking-[0.2em] md:tracking-[0.25em] font-bold leading-none transition-colors duration-300 ${
              isLightPage ? "text-studio-black hover:text-studio-black/80" : "text-white hover:text-white/80"
            }`}>
              BUILD THE MATRIX Pvt.  Ltd.
            </span>
            <span className={`font-mono text-[8px] tracking-[0.22em] sm:tracking-[0.35em] font-light uppercase whitespace-nowrap leading-none mt-2 ${
              isLightPage ? "text-studio-black/55" : "text-white/45"
            }`}>
              <span className="inline whitespace-nowrap">BUILDING EXCELLENCE.{" "}</span>
              <span className="inline whitespace-nowrap">CREATING LEGACIES.</span>
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
            <div className={`border-t pt-4 sm:pt-6 flex flex-col gap-2.5 sm:gap-3.5 font-mono text-xs pl-2 sm:pl-4 mt-auto ${
              isLightPage ? "border-studio-black/[0.08]" : "border-white/[0.08]"
            }`}>
              <div>
                <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider block mb-1 font-semibold ${
                  isLightPage ? "text-studio-black/50" : "text-white/40"
                }`}>
                  Company Address
                </span>
                <p 
                  className={`font-sans text-[11px] sm:text-xs leading-relaxed font-light ${
                    isLightPage ? "text-studio-black/60" : "text-zinc-400"
                  }`}
                >
                  Kandoli Street No 4, Saundhon wali, Chironwali, Canal Road | Dehradun, Uttarakhand | 248013
                </p>
              </div>

              <div className={`font-sans text-[10.5px] sm:text-xs leading-relaxed space-y-1 ${
                isLightPage ? "text-studio-black" : "text-white"
              }`}>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <a href="https://wa.me/917505683585" target="_blank" rel="noopener noreferrer" className={`hover:underline font-medium ${isLightPage ? "text-emerald-700" : "text-white hover:text-emerald-300"}`}>7505683585</a>
                  </span>
                  <span className={isLightPage ? "text-studio-black/30" : "text-white/60"}>|</span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className={`w-3 h-3 shrink-0 ${isLightPage ? "text-studio-black" : "text-white"}`} />
                    <a href="tel:+918126981337" className={`hover:underline font-medium ${isLightPage ? "text-studio-black" : "text-white"}`}>8126981337</a>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="inline-flex items-center gap-1">
                    <PhoneCall className={`w-3 h-3 shrink-0 ${isLightPage ? "text-studio-black" : "text-white"}`} />
                    <a href="tel:01244000023" className={`hover:underline ${isLightPage ? "text-studio-black" : "text-white"}`}>0124-4000023/24</a>
                  </span>
                  <span className={isLightPage ? "text-studio-black/30" : "text-white/60"}>|</span>
                  <span className="inline-flex items-center gap-1">
                    <Printer className={`w-3 h-3 shrink-0 ${isLightPage ? "text-studio-black" : "text-white"}`} />
                    <span>0124-4000035</span>
                  </span>
                </div>
                <div className="flex items-center flex-nowrap whitespace-nowrap gap-x-1 sm:gap-x-1.5 text-[8.5px] sm:text-[10px] pt-0.5">
                  <span className="shrink-0 inline-flex items-center gap-1">
                    <Users className={`w-3 h-3 shrink-0 ${isLightPage ? "text-studio-black" : "text-white"}`} />
                    <a href="mailto:buildmatrix10@gmail.com" className={`hover:underline font-medium ${isLightPage ? "text-amber-700" : "text-white hover:text-amber-300"}`}>
                      buildmatrix10@gmail.com
                    </a>
                  </span>
                  <span className={`shrink-0 ${isLightPage ? "text-studio-black/30" : "text-white/60"}`}>|</span>
                  <span className="shrink-0 inline-flex items-center gap-1">
                    <Mail className={`w-3 h-3 shrink-0 ${isLightPage ? "text-amber-700" : "text-white"}`} />
                    <a href="mailto:contact@buildthematrix.com" className={`hover:underline font-medium shrink-0 ${isLightPage ? "text-amber-700" : "text-white hover:text-amber-300"}`}>
                      contact@buildthematrix.com
                    </a>
                  </span>
                </div>
              </div>

              <div className={`text-[8px] sm:text-[9px] tracking-widest mt-1 uppercase ${
                isLightPage ? "text-studio-black/40" : "text-zinc-500"
              }`}>
                © BUILD THE MATRIX Pvt.  Ltd. 2026. ALL RIGHTS RESERVED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
