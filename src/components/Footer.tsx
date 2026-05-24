import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CornerDownRight } from "lucide-react";

interface FooterProps {
  onNavigate: (pageId: string) => void;
  curvedStructureImage: string;
}

export default function Footer({ onNavigate, curvedStructureImage }: FooterProps) {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "work", label: "Projects" },
    { id: "studio", label: "Studio" },
    { id: "process", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <footer className="bg-studio-black text-gold-light border-t border-white/[0.08] relative z-10 pt-24 pb-16 overflow-hidden">
      {/* Structural layout outlines indicating geometric plans */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.03] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.03] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Call to action header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 border-b border-white/[0.06] pb-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-gold-beige uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              # OPEN FOR COLLABORATIONS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-glow leading-tight">
              Let’s Build <span className="italic">Something Extraordinary</span> Together
            </h3>
            <p className="font-sans text-xs text-gold-sand/75 leading-relaxed mt-2">
              Whether it’s architecture, BIM coordination, interior design, or visualization — BUILD THE MATRIX transforms concepts into impactful spatial experiences through innovation, creativity, and precision.
            </p>
          </div>
          
          <button
            onClick={() => onNavigate("contact")}
            className="px-8 py-5 bg-gold-beige hover:bg-gold-light text-studio-black font-mono text-xs tracking-widest uppercase transition-all duration-500 rounded-none cursor-pointer font-bold flex items-center gap-3 group relative overflow-hidden shrink-0"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* Major Columns split from Video reference: Left Image, Mid Navigation, Mid Acknowledgement, Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start pb-12 border-b border-white/[0.04]">
          
          {/* Column 1: Curved Wooden / Concrete Structure Image */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="aspect-[4/3] w-full overflow-hidden border border-white/[0.08] relative group">
              <img
                src={curvedStructureImage}
                alt="BUILD THE MATRIX structure view"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-studio-black/25 duration-500" />
              <div className="absolute bottom-3 left-3 font-mono text-[7px] text-white/55 tracking-widest uppercase">
                ATELIER CAD MODEL // DEPT 04
              </div>
            </div>
            <div>
              <span className="font-sans text-xs tracking-[0.1em] font-bold leading-none text-white block">
                BUILD THE MATRIX
              </span>
              <span className="font-mono text-[7.5px] tracking-[0.1em] text-white/50 block mt-1.5 uppercase leading-none">
                ARCHITECTURE • BIM • VISUALIZATION • INTERIORS
              </span>
            </div>
          </div>

          {/* Column 2: (NAVIGATION) list */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#7F7A75] uppercase block font-semibold border-b border-white/[0.04] pb-2">
              (NAVIGATION)
            </span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pl-1">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="font-serif text-sm text-[#E8DDCF] hover:text-gold-light cursor-pointer font-light flex items-center gap-1.5 duration-300 hover:pl-1 text-left"
                  >
                    <CornerDownRight className="w-2.5 h-2.5 text-gold-beige/50" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: (ACKNOWLEDGEMENT) text */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#7F7A75] uppercase block font-semibold border-b border-white/[0.04] pb-2">
              (ACKNOWLEDGEMENT)
            </span>
            <p className="font-sans text-[11px] text-gold-sand/85 leading-relaxed font-light text-justify">
              At BUILD THE MATRIX, we believe architecture is a responsibility toward people, culture, environment, and future generations. We are committed to creating thoughtful spaces that respect context, celebrate design innovation, and promote sustainable architectural practices through creativity, collaboration, and conscious development.
            </p>
          </div>

          {/* Column 4: (INFO) cards */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#7F7A75] uppercase block font-semibold border-b border-white/[0.04] pb-2">
              (INFO)
            </span>
            <div className="flex flex-col gap-3 font-mono text-[10px] text-gold-sand/85 leading-relaxed pl-1">
              <div>
                <span className="text-[#7F7A75] block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Studio Contact</span>
                <span className="font-sans text-xs"><a href="tel:+917505683585" className="hover:text-gold-light transition-colors">+91-7505683585</a></span>
              </div>
              <div>
                <span className="text-[#7F7A75] block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Email</span>
                <a href="mailto:contact@buildthematrix.com" className="text-gold-beige hover:underline font-sans text-xs">contact@buildthematrix.com</a>
              </div>
              <div>
                <span className="text-[#7F7A75] block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Services</span>
                <span className="font-sans text-xs">Architecture • BIM • Visualization • Interiors</span>
              </div>
              <div>
                <span className="text-[#7F7A75] block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Working Hours</span>
                <span>Mon – Sat | 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* copyright and legal stamp */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#7F7A75] font-mono text-[8.5px] tracking-widest uppercase">
          <span>
            © BUILD THE MATRIX 2026. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-gold-light cursor-pointer duration-300">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-gold-light cursor-pointer duration-300">TERMS & CONDITIONS</span>
            <span>•</span>
            <span className="hover:text-gold-light cursor-pointer duration-300">DESIGN PORTFOLIO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
