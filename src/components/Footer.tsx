import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CornerDownRight } from "lucide-react";

interface FooterProps {
  onNavigate: (pageId: string) => void;
  curvedStructureImage: string;
}

export default function Footer({ onNavigate, curvedStructureImage }: FooterProps) {
  const footerCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = footerCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize && entry.contentBoxSize[0]) {
          width = canvas.width = entry.contentBoxSize[0].inlineSize;
          height = canvas.height = entry.contentBoxSize[0].blockSize;
        } else {
          width = canvas.width = entry.contentRect.width;
          height = canvas.height = entry.contentRect.height;
        }
      }
    });
    resizeObserver.observe(parent);

    // Particles representing architectural coordinates stars, matching preloader config (electric & white)
    const particles: { x: number; y: number; size: number; speed: number; alpha: number; isElectric: boolean }[] = [];
    const count = 35; // optimal floating particle density for footer
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.45 + 0.15,
        isElectric: Math.random() < 0.35 // 35% electric blue dust particles
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        if (p.isElectric) {
          ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <footer className="bg-black text-gold-light border-t border-white/20 relative z-10 pt-12 md:pt-24 pb-12 md:pb-16 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {/* Structural layout outlines indicating geometric plans */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.04] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.04] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Particle Floating Canvas matching preloader theme, relative to this container */}
        <canvas
          ref={footerCanvasRef}
          className="absolute inset-0 z-0 pointer-events-none w-full h-full block"
        />
        
        {/* Call to action header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 border-b border-white/10 pb-12 relative z-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-amber-400 uppercase font-bold flex items-center gap-1.5 [text-shadow:0_0_8px_rgba(251,191,36,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              # OPEN FOR COLLABORATIONS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-glow leading-tight text-white">
              Let’s Build <span className="italic">Something Extraordinary</span> Together
            </h3>
            <p className="font-sans text-xs text-gold-sand leading-relaxed mt-2">
              Whether it’s architecture, BIM coordination, interior design, or visualization — BUILD THE MATRIX transforms concepts into impactful spatial experiences through innovation, creativity, and precision.
            </p>
          </div>
          
          <button
            onClick={() => onNavigate("contact")}
            className="px-8 py-5 bg-white hover:bg-neutral-200 text-black font-mono text-xs tracking-widest uppercase transition-all duration-550 rounded-none cursor-pointer font-bold flex items-center gap-3 group relative overflow-hidden shrink-0 shadow-lg"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* Major Columns split from Video reference: Left Image, Mid Acknowledgement, Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start pb-12 border-b border-white/10 relative z-10">
          
          {/* Column 1: Curved Wooden / Concrete Structure Image */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="hidden md:block w-3/4 max-w-[240px] overflow-hidden border border-white/15 relative group bg-black">
              <img
                src="https://i.ibb.co/236V3sgL/file-0000000050ec7207877bc8c5fb2c374d.png"
                alt="BUILD THE MATRIX structure view"
                className="w-full h-auto block transition-transform duration-1000 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Column 3: (ACKNOWLEDGEMENT) text */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 uppercase block font-semibold border-b border-white/10 pb-2">
              (ACKNOWLEDGEMENT)
            </span>
            <p className="font-sans text-[11px] text-zinc-100 leading-relaxed font-light text-justify">
              At BUILD THE MATRIX, we believe architecture is a responsibility toward people, culture, environment, and future generations. We are committed to creating thoughtful spaces that respect context, celebrate design innovation, and promote sustainable architectural practices through creativity, collaboration, and conscious development.
            </p>
          </div>

          {/* Column 4: (INFO) cards */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 uppercase block font-semibold border-b border-white/10 pb-2">
              (INFO)
            </span>

            <div className="flex flex-col gap-3 font-mono text-[10px] text-zinc-300 leading-relaxed pl-1">
              <div>
                <span className="text-zinc-500 block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Studio Contact</span>
                <span className="font-sans text-xs text-white"><a href="tel:+917505683585" className="hover:text-[#00E5FF] transition-colors">+91-7505683585</a></span>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Email</span>
                <a href="mailto:contact@buildthematrix.com" className="text-amber-400 hover:underline font-sans text-xs">contact@buildthematrix.com</a>
              </div>
              <div className="hidden md:block">
                <span className="text-zinc-500 block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Services</span>
                <span className="font-sans text-xs text-white">Architecture • BIM • Visualization • Interiors</span>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase text-[8px] tracking-wider mb-0.5 font-bold">Working Hours</span>
                <span className="text-white">Mon – Sat | 9:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Nice smaller version of the image for the eco fit, text is on the leftmost and image is on the rightmost */}
            <div className="md:hidden flex items-stretch justify-between gap-3 bg-black border border-white/15 mt-2 w-full min-h-[64px] overflow-hidden">
              <div className="flex flex-col text-left justify-center pl-3 py-1.5 pr-1 min-w-0">
                <span className="font-sans text-[9px] tracking-[0.08em] font-bold text-white block leading-snug uppercase">
                  BUILD THE MATRIX
                </span>
                <span className="font-mono text-[6px] text-[#00E5FF] tracking-[0.01em] block leading-snug mt-0.5 uppercase">
                  Architecture • BIM • Visualization • Interiors
                </span>
              </div>
              <div className="w-[65px] shrink-0 relative overflow-hidden border-l border-white/15">
                <img
                  src="https://i.ibb.co/236V3sgL/file-0000000050ec7207877bc8c5fb2c374d.png"
                  alt="ECO FRAME view"
                  className="w-full h-full object-cover block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* copyright and legal stamp */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-400 font-mono text-[8.5px] tracking-widest uppercase relative z-10">
          <span>
            © BUILD THE MATRIX 2026. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer duration-300">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer duration-300">TERMS & CONDITIONS</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer duration-300">DESIGN PORTFOLIO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
