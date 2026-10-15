import { ChevronRight, Maximize2, Shield, Eye, Leaf } from "lucide-react";
import { motion } from "motion/react";

interface AboutProps {
  imageUrl: string;
}

export default function About({ imageUrl }: AboutProps) {
  const brandPillars = [
    {
      icon: <Eye className="w-5 h-5 text-gold-bronze" />,
      title: "Atmospheric Clarity",
      desc: "Architecting spaces where physical elements disappear, and only pure daylight, shadows, and natural breathing space remain."
    },
    {
      icon: <Maximize2 className="w-5 h-5 text-gold-bronze" />,
      title: "Spatial Elegance",
      desc: "Balancing heavy raw brutalist monoliths with high-fashion delicate lines, floating panels, and sleek bespoke metal fixtures."
    },
    {
      icon: <Leaf className="w-5 h-5 text-gold-bronze" />,
      title: "Ecological Materiality",
      desc: "Utilizing hand-hewn travertine, recycled cedar, architectural concrete, and low-embodied carbon glass for sustainable legacy projects."
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gold-light text-studio-black overflow-hidden relative">
      {/* Decorative fine-line grid elements indicating architectural plans */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-studio-black/[0.06]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
              01 // PHILOSOPHY
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-studio-black leading-tight">
              Honoring <br />
              The <span className="italic">Silent Space</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="font-sans text-base md:text-lg text-studio-charcoal/80 font-light max-w-2xl leading-relaxed">
              At Company Arché, we believe luxury is not about excess. True luxury is the calm atmosphere that envelopes you when entering a curated space. It is the perfect angle of the morning sun hitting raw plaster, and the weight of a hand-cast bronze doorknob.
            </p>
          </div>
        </div>

        {/* Major Editorial Layout: Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Block: Imagery with subtle frame overlay (Cols 1 to 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="relative group overflow-hidden bg-studio-charcoal/10 aspect-[4/3] md:aspect-square lg:aspect-[4/5]">
              {/* Image with scaling hover effect & film grain */}
              <img
                src={imageUrl}
                alt="Company Arche Pavilion Philosophy Space"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Architectural layout crop indicators */}
              <div className="absolute top-4 left-4 border-t-2 border-l-2 border-white/40 w-6 h-6 pointer-events-none group-hover:border-gold-beige transition-colors duration-500" />
              <div className="absolute top-4 right-4 border-t-2 border-r-2 border-white/40 w-6 h-6 pointer-events-none group-hover:border-gold-beige transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-white/40 w-6 h-6 pointer-events-none group-hover:border-gold-beige transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-white/40 w-6 h-6 pointer-events-none group-hover:border-gold-beige transition-colors duration-500" />
              
              {/* Hover Coordinates Badging */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-studio-black/75 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="font-mono text-[9px] tracking-widest text-gold-beige block mb-1">
                  CASE STUDY 04 // MIST OUTPOST
                </span>
                <span className="font-serif text-sm italic font-normal text-gold-light">
                  "A concrete shelter honoring northern pine horizons."
                </span>
              </div>
            </div>

            {/* Quote block underneath the photo */}
            <div className="border-l-[1.5px] border-gold-bronze pl-6 py-2">
              <p className="font-serif text-lg italic text-studio-charcoal font-light leading-relaxed">
                "We do not design houses. We choreograph the movement of air, shadows, light, and the human gaze."
              </p>
              <h4 className="font-mono text-[10px] tracking-[0.2em] font-semibold text-gold-bronze uppercase mt-3">
                — ANTOINE VALENTIN, CHIEF ARCHITECT
              </h4>
            </div>
          </div>

          {/* Right Block: Content Details/Credentials (Cols 7 to 12) */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-10">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold-bronze uppercase block mb-2 font-semibold">
                THE MANIFESTO
              </span>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-studio-black leading-snug">
                Restoring connection through spatial purity.
              </h3>
              <p className="mt-4 font-sans text-sm md:text-base text-studio-charcoal/70 font-light max-w-xl leading-relaxed">
                For over a decade, we have conceptualized elite residential, boutique hotels, and cultural structures across Western Europe and East Asia. Our team consists of master stonemasons, parametric design engineers, and residential lighting curators working together under single artistic management.
              </p>
            </div>

            {/* Custom Brand Pillars Grid */}
            <div className="flex flex-col gap-6">
              {brandPillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="p-3 bg-studio-black/[0.04] group-hover:bg-studio-black hover:text-gold-light border border-studio-black/[0.1] rounded-none transition-colors duration-500 shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-serif text-base font-semibold tracking-wide text-studio-black group-hover:text-gold-bronze transition-colors duration-300">
                      {pillar.title}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-studio-charcoal/70 font-light leading-relaxed mt-1">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fine line divider before details indicator */}
            <div className="border-t border-studio-black/[0.08] pt-8 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#7c7267] block">
                  CRAFT CERTIFICATION
                </span>
                <span className="font-serif text-sm font-semibold text-studio-black">
                  ISO 14001 Renewable Materials Standard
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <span className="font-mono text-xs tracking-widest text-studio-charcoal group-hover:text-gold-bronze transition-colors duration-300">
                  Read Monograph
                </span>
                <ChevronRight className="w-4 h-4 text-gold-bronze group-hover:translate-x-1 duration-300" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
