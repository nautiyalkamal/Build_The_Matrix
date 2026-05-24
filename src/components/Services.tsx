import { useState } from "react";
import { Compass, Pencil, Eye, Trees, Map, Hammer, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Service } from "../types";

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>("arch-design");

  const services: Service[] = [
    {
      id: "arch-design",
      name: "Architecture Design",
      description: "Full-scale concept-to-realization architectural blueprints covering luxury high-end villas, premium towers, and boutique community buildings.",
      icon: "compass",
      details: [
        "Parametric site modeling & wind flow analysis",
        "Passive volcanic/coastal load-bearing planning",
        "Bespoke sculptural ceiling height exploration",
        "Permit drawing generation & local authority liaison"
      ]
    },
    {
      id: "int-design",
      name: "Interior Design",
      description: "Subtly balanced interior design combining raw organic materiality with minimal structural frames, tailored custom-built fixtures, and eye-safe climate designs.",
      icon: "pencil",
      details: [
        "Travertine & raw timber micro-palette selection",
        "Indirect spatial warm lighting orchestration (2700K)",
        "Bespoke modular kitchen & walk-in vanity sketches",
        "Acoustic isolation layer engineering"
      ]
    },
    {
      id: "viz-design",
      name: "3D Visualization",
      description: "Hyper-realistic CGI architectural cinematic visualization and interactive spatial renders that simulate actual sunlight angles at physical longitudes.",
      icon: "eye",
      details: [
        "Real-time geographical raytracing calculations",
        "Season-by-season solar shadow casting simulations",
        "Virtual Reality walking-tours for remote investors",
        "Bespoke high-end animation clips & promotional catalogs"
      ]
    },
    {
      id: "land-design",
      name: "Landscape Design",
      description: "Curated organic outdoor architecture that connects structures to heritage gardens, local volcanic rocks, running streams, and natural bio-habitats.",
      icon: "trees",
      details: [
        "Indigenous vegetation botanical zoning plans",
        "Custom flowing waterfalls & natural rock hot-spring design",
        "Durable minimal concrete pathways and floating decks",
        "Integrated discrete ambient garden pathway illumination"
      ]
    },
    {
      id: "urban-planning",
      name: "Urban Planning",
      description: "Strategic master planning and layout structures that focus on pedestrian safety, renewable local clean grids, and elegant architectural visual corridors.",
      icon: "map",
      details: [
        "Comprehensive structural transit flow modeling",
        "Carbon-free local pedestrian shopping zone layout",
        "Sustainable drainage and wind redirection pathways",
        "Community engagement and historical landscape integration"
      ]
    },
    {
      id: "renov-consult",
      name: "Renovation Consultation",
      description: "Expert restoration and historical renewal of antique castles, mid-century modern architectures, and heritage luxury assets inside designated European historical districts.",
      icon: "hammer",
      details: [
        "Historical structural preservation audit and reinforcement",
        "State-of-the-art hidden HVAC and modern insulation updates",
        "Preservation of raw original plaster textures and stonemasonry",
        "Heritage asset certification under designated urban guidelines"
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "compass": return <Compass className="w-5 h-5 text-gold-beige" />;
      case "pencil": return <Pencil className="w-5 h-5 text-gold-beige" />;
      case "eye": return <Eye className="w-5 h-5 text-gold-beige" />;
      case "trees": return <Trees className="w-5 h-5 text-gold-beige" />;
      case "map": return <Map className="w-5 h-5 text-gold-beige" />;
      case "hammer": return <Hammer className="w-5 h-5 text-gold-beige" />;
      default: return <Compass className="w-5 h-5 text-gold-beige" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-studio-dark text-gold-light relative">
      
      {/* Structural layout markers */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.04]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.02] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.02] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-beige uppercase block mb-3 font-semibold">
              03 // CAPABILITIES
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight">
              Bespoke <br />
              <span className="italic">Sovereign Services</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-xs md:text-sm text-gold-sand/60 font-light max-w-xl leading-relaxed">
              We cover the full spectrum of high-end site choreography. From initial geological solar scoping through fine-detail interior plaster texturing, our multidisciplinary methodology ensures the highest artistic integrity for our clients worldwide.
            </p>
          </div>
        </div>

        {/* Minimal Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => toggleExpand(service.id)}
                className={`border p-6 md:p-8 rounded-none transition-all duration-500 cursor-pointer flex flex-col justify-between relative group ${
                  isExpanded
                    ? "bg-studio-charcoal/90 border-gold-beige/50 shadow-2xl"
                    : "bg-studio-black/40 border-white/[0.05] hover:border-gold-beige/25 hover:bg-studio-charcoal/30"
                }`}
              >
                {/* Horizontal line indicator on card top when expanded */}
                <div
                  className={`absolute top-0 left-0 h-[2px] bg-gold-beige transition-all duration-500 ${
                    isExpanded ? "w-full" : "w-0 group-hover:w-1/3"
                  }`}
                />

                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-none group-hover:bg-gold-beige group-hover:text-studio-black transition-colors duration-500 text-glow">
                    {getIcon(service.icon)}
                  </div>

                  <span className="font-mono text-xs text-studio-gray group-hover:text-gold-beige/70 duration-300 flex items-center gap-1">
                    {isExpanded ? (
                      <>
                        <span className="text-[9px]">COLLAPSE</span>
                        <Minus className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span className="text-[9px]">EXPAND</span>
                        <Plus className="w-3.5 h-3.5 text-gold-beige" />
                      </>
                    )}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl md:text-2xl text-gold-light group-hover:text-gold-beige transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="font-sans text-xs text-gold-sand/70 font-light leading-relaxed mb-2">
                    {service.description}
                  </p>
                </div>

                {/* Expanded Details Specifications via AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/[0.06] mt-4 flex flex-col gap-2.5">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-[#7c7267] uppercase block mb-1">
                          DELIVERABLES INDEX
                        </span>
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] font-sans text-glow font-light">
                            <span className="w-1 h-1 bg-gold-beige rounded-full flex-shrink-0" />
                            <span className="text-gold-sand/90">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Elegant subtle forward link arrow */}
                <div className="mt-6 pt-4 border-t border-white/[0.03] flex items-center justify-between font-mono text-[9px] tracking-widest text-[#7c7267]">
                  <span>CODE-COMPLIANT</span>
                  <div className="flex items-center gap-1 text-gold-beige group-hover:translate-x-1 duration-300">
                    <span>INQUIRE</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
