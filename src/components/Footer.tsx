import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CornerDownRight, Phone, PhoneCall, Printer, Users, Mail } from "lucide-react";

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
            <span 
              style={{ fontFamily: "Georgia, serif" }}
              className="text-[9px] tracking-[0.3em] text-amber-400 uppercase font-bold flex items-center gap-1.5 [text-shadow:0_0_8px_rgba(251,191,36,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              # OPEN FOR COLLABORATIONS
            </span>
            <h3 
              style={{ fontFamily: "Georgia, serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-glow leading-tight text-white"
            >
              Let’s Build <span className="italic">Something Extraordinary</span> Together
            </h3>
            <p className="font-sans text-xs text-gold-sand leading-relaxed mt-2">
              Whether it’s architecture, BIM coordination, interior design, or visualization — BUILD THE MATRIX Pvt.  Ltd. transforms concepts into impactful spatial experiences through innovation, creativity, and precision.
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
                alt="BUILD THE MATRIX Pvt.  Ltd. structure view"
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
              At BUILD THE MATRIX Pvt.  Ltd., we believe architecture is a responsibility toward people, culture, environment, and future generations. We are committed to creating thoughtful spaces that respect context, celebrate design innovation, and promote sustainable architectural practices through creativity, collaboration, and conscious development.
            </p>
          </div>

          {/* Column 4: (INFO) cards */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 uppercase block font-semibold border-b border-white/10 pb-2">
              (INFO)
            </span>

            <div 
              style={{ fontFamily: '"Bookman Old Style", Bookman, "URW Bookman L", Georgia, serif' }}
              className="flex flex-col gap-3.5 text-[10px] text-zinc-400 leading-relaxed pl-1"
            >
              <div>
                <span className="text-zinc-500 block uppercase text-[8px] tracking-wider mb-1 font-bold">Company Address</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Kandoli Street No 4, Saundhon wali, Chironwali, Canal Road | Dehradun, Uttarakhand | 248013
                </p>
              </div>

              <div>
                <span className="text-zinc-500 block uppercase text-[8px] tracking-wider mb-1 font-bold">Contact & Communications</span>
                <div className="text-xs text-white leading-relaxed space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-3 h-3 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <a href="https://wa.me/917505683585" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 hover:underline font-medium">7505683585</a>
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3 h-3 text-white shrink-0" />
                      <a href="tel:+918126981337" className="text-white hover:underline transition-colors">8126981337</a>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="inline-flex items-center gap-1">
                      <PhoneCall className="w-3 h-3 text-white shrink-0" />
                      <a href="tel:01244000023" className="text-white hover:underline transition-colors">0124-4000023/24</a>
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="inline-flex items-center gap-1">
                      <Printer className="w-3 h-3 text-white shrink-0" />
                      <span>0124-4000035</span>
                    </span>
                  </div>
                  <div className="pt-0.5 flex items-center flex-nowrap whitespace-nowrap gap-x-1 sm:gap-x-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] xl:text-[12.5px] tracking-tight">
                    <span className="shrink-0 inline-flex items-center gap-1">
                      <Users className="w-3 h-3 text-white shrink-0" />
                      <a href="mailto:buildmatrix10@gmail.com" className="text-white hover:text-amber-400 hover:underline font-medium">
                        buildmatrix10@gmail.com
                      </a>
                    </span>
                    <span className="text-zinc-500 shrink-0">|</span>
                    <span className="inline-flex items-center gap-1 shrink-0">
                      <Mail className="w-3 h-3 text-white shrink-0" />
                      <a href="mailto:contact@buildthematrix.com" className="text-white hover:text-amber-400 hover:underline shrink-0 font-medium">
                        contact@buildthematrix.com
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nice smaller version of the image for the eco fit, text is on the leftmost and image is on the rightmost */}
            <div className="md:hidden flex items-stretch justify-between gap-3 bg-black border border-white/15 mt-2 w-full min-h-[64px] overflow-hidden">
              <div className="flex flex-col text-left justify-center pl-3.5 py-2.5 pr-2 min-w-0 flex-1">
                <span className="font-sans text-[14.5px] sm:text-[16px] whitespace-nowrap tracking-tight font-extrabold text-white block leading-tight uppercase">
                  BUILD THE MATRIX Pvt. Ltd.
                </span>
                <span className="font-mono text-[9.5px] sm:text-[10.5px] text-[#00E5FF] tracking-[0.05em] font-medium block leading-snug mt-1 uppercase">
                  Architecture • BIM • Visualization
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
            © BUILD THE MATRIX Pvt.  Ltd. 2026. ALL RIGHTS RESERVED.
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
