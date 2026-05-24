import { useState } from "react";
import { ArrowLeft, ArrowRight, X, Compass, Layers, Sliders, LayoutGrid, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface ProjectsProps {
  heroVillaUrl: string;
  interiorLivingUrl: string;
  exteriorFacadeUrl: string;
  forestPavilionUrl: string;
}

export default function Projects({
  heroVillaUrl,
  interiorLivingUrl,
  exteriorFacadeUrl,
  forestPavilionUrl,
}: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");

  const projectsData: Project[] = [
    {
      id: "cliiffs-sanctuary",
      title: "CLIFFSIDE SANCTUARY",
      location: "Crete, Aegean Sea",
      year: "2025",
      category: "Residential",
      description: "A supreme brutalist monolith embedded directly into raw sandstone cliffs above the Aegean Sea, offering complete privacy and infinity views of the horizon.",
      imageUrl: heroVillaUrl,
      client: "Aether Estate Group",
      scale: "680 m² Residential GFA",
      materials: ["Raw Poured Concrete", "Oxidized Copper Plating", "High-Performance Structural Glass", "Brushed Teak"],
      specs: [
        { label: "Design Horizon", value: "20-Year Coastal Wind Code" },
        { label: "Insulation Spec", value: "Premium Thermal Glass (U=0.8)" },
        { label: "Structural Framing", value: "Deep Cast Rock Anchor System" },
        { label: "Automation Layer", value: "Bespoke Silent Kinetic Shutter Controls" }
      ]
    },
    {
      id: "travertine-living",
      title: "AMBIVALENT LIVING",
      location: "Kyoto, Japanese Garden",
      year: "2024",
      category: "Interior",
      description: "A masterclass in minimal residential staging, combining massive honed Italian travertine marble with floating wall panels and sightlines framed around a heritage zen garden.",
      imageUrl: interiorLivingUrl,
      client: "Private Collector",
      scale: "210 m² Interior Suite",
      materials: ["Honed Italian Travertine", "Bespoke Bleached Cedar", "Hand-Dyed Japanese Silk Wallcoverings", "Solid Bronze Accents"],
      specs: [
        { label: "Acoustics", value: "Fully Isolated Sound Dampening Panels" },
        { label: "Climate", value: "Bespoke Geo-thermal Radiant Slab Heating" },
        { label: "Light Index", value: "Curated 2700K Architectural Warm Indirect" },
        { label: "Fittings", value: "Unlacquered Living Finish Bronze Hardware" }
      ]
    },
    {
      id: "bronze-skyscraper",
      title: "METALLIC MERIDIAN",
      location: "Paris, La Défense",
      year: "2026",
      category: "Cultural",
      description: "An high-end urban tower featuring intricate, custom-angled bronze-gold kinetic louvres that shift dynamically through daylight hours to optimize internal micro-climatic light levels.",
      imageUrl: exteriorFacadeUrl,
      client: "Meridian Holdings SA",
      scale: "42,000 m² Tower GFA",
      materials: ["Structural Extruded Bronze-Gold Aluminum", "Low-Iron Glazing", "Recycled Matte Steel Sheets"],
      specs: [
        { label: "Facade System", value: "Interactive Triple-Glazed Unitized Curtain Wall" },
        { label: "Wind Load Rating", value: "Category 4 Cyclone Resistance Criteria" },
        { label: "Sustainability", value: "LEED Platinum Core & Shell Certified" },
        { label: "Shuttle System", value: "Regenerative Magnetic High-Speed Elevators" }
      ]
    },
    {
      id: "forest-pavilion",
      title: "THE MIST pavilion",
      location: "Oslo, Norway Woods",
      year: "2025",
      category: "Cultural",
      description: "A spatial concrete shelter carefully integrated amidst ancient, damp pine forests, designed to facilitate deep contemplation, yoga, and acoustic focus.",
      imageUrl: forestPavilionUrl,
      client: "Nordic Cultural Foundation",
      scale: "185 m² Forest Pavilion",
      materials: ["Acid-Washed Concrete", "Charred Shou Sugi Ban Pine Wood", "Polished Basalt Stones"],
      specs: [
        { label: "Foundation", value: "No-impact Micro-pile Ecological Foundation" },
        { label: "Ventilation", value: "Passive Geothermal Deep Air Infiltration" },
        { label: "Acoustic Index", value: "RT60 Ambient Sound Absorption under 0.4s" },
        { label: "Power Grid", value: "Off-Grid Solid-State Battery & Solar Glazing" }
      ]
    }
  ];

  const categories = ["All", "Residential", "Interior", "Cultural"];

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const nextSlide = () => {
    setActiveProjectIdx((prev) => (prev + 1 < filteredProjects.length ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setActiveProjectIdx((prev) => (prev - 1 >= 0 ? prev - 1 : filteredProjects.length - 1));
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-studio-black text-gold-light relative">
      
      {/* Structural visual guidelines */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.04]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.02] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.02] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Area and Presentation Controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-beige uppercase block mb-3 font-semibold">
              02 // PORTFOLIO
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight">
              Featured <span className="italic">Exhibits</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveProjectIdx(0);
                  }}
                  className={`px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-gold-beige border-gold-beige text-studio-black font-semibold"
                      : "border-white/[0.08] text-studio-gray hover:text-gold-light hover:border-gold-beige/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layout Toggles */}
            <div className="flex items-center gap-2 border border-white/[0.08] p-1 bg-studio-dark/50">
              <button
                onClick={() => setViewMode("slider")}
                className={`p-1.5 cursor-pointer ${
                  viewMode === "slider" ? "bg-white/[0.08] text-gold-beige" : "text-studio-gray hover:text-gold-light"
                }`}
                title="Cinematic Deck Mode"
              >
                <Sliders className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 cursor-pointer ${
                  viewMode === "grid" ? "bg-white/[0.08] text-gold-beige" : "text-studio-gray hover:text-gold-light"
                }`}
                title="Grid Index Mode"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {viewMode === "slider" ? (
            /* Cinematic Dynamic Deck Mode */
            filteredProjects.length > 0 ? (
              <motion.div
                key="slider-deck"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch"
              >
                {/* Left side: Luxury wide image with details */}
                <div className="lg:col-span-8 flex flex-col gap-6 relative justify-between">
                  <div className="relative group overflow-hidden bg-studio-charcoal aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/10]">
                    <img
                      src={filteredProjects[activeProjectIdx].imageUrl}
                      alt={filteredProjects[activeProjectIdx].title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient mapping overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Interactive overlay buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button
                        onClick={() => setSelectedProject(filteredProjects[activeProjectIdx])}
                        className="px-6 py-3 bg-studio-black/95 text-gold-beige font-mono text-[10px] tracking-widest uppercase border border-gold-beige/30 hover:border-gold-beige hover:bg-gold-beige hover:text-studio-black transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-2xl"
                      >
                        <Eye className="w-4 h-4" />
                        Examine Drawings
                      </button>
                    </div>

                    {/* Coordinates Stamp overlay */}
                    <div className="absolute top-4 right-4 font-mono text-[8px] tracking-[0.2em] text-white/40 bg-studio-black/60 px-3 py-1.5 border border-white/5 backdrop-blur-md">
                      ARCH-SPEC // ID {filteredProjects[activeProjectIdx].id.toUpperCase()}
                    </div>
                  </div>

                  {/* Manual Arrow Slider Controls */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="font-mono text-xs text-studio-gray uppercase flex gap-4">
                      <span>STATION #{activeProjectIdx + 1} OF {filteredProjects.length}</span>
                      <span>—</span>
                      <span className="text-gold-beige font-bold">{filteredProjects[activeProjectIdx].category}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={prevSlide}
                        className="p-3 border border-white/[0.08] hover:border-gold-beige text-gold-light hover:text-gold-beige hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
                        aria-label="Previous Slide"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-3 border border-white/[0.08] hover:border-gold-beige text-gold-light hover:text-gold-beige hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
                        aria-label="Next Slide"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side: Detailed Specs and description (Cols 9 to 12) */}
                <div className="lg:col-span-4 flex flex-col justify-between py-2">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-between items-baseline mb-2 font-mono text-[10px] tracking-widest text-studio-gray">
                        <span>{filteredProjects[activeProjectIdx].location}</span>
                        <span>{filteredProjects[activeProjectIdx].year}</span>
                      </div>
                      <h3 className="font-serif text-3xl md:text-3xl text-gold-light tracking-wide hover:text-gold-beige duration-300 leading-snug">
                        {filteredProjects[activeProjectIdx].title}
                      </h3>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-gold-sand/70 font-light leading-relaxed">
                      {filteredProjects[activeProjectIdx].description}
                    </p>

                    {/* Metadata specs */}
                    <div className="flex flex-col border-t border-white/[0.08] pt-6 gap-3">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-studio-gray uppercase tracking-wider">CLIENTS:</span>
                        <span className="text-gold-light font-medium">{filteredProjects[activeProjectIdx].client}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-studio-gray uppercase tracking-wider">SCALE:</span>
                        <span className="text-gold-light font-medium">{filteredProjects[activeProjectIdx].scale}</span>
                      </div>
                    </div>

                    {/* Material Swatches layout */}
                    <div className="flex flex-col gap-2 mt-2">
                      <span className="font-mono text-[9px] tracking-widest text-studio-gray uppercase">
                        TACTILE PALETTE
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {filteredProjects[activeProjectIdx].materials.map((mat, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-gold-sand font-sans text-[10px] tracking-wide"
                          >
                            + {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(filteredProjects[activeProjectIdx])}
                    className="w-full mt-8 py-3.5 bg-transparent border border-gold-beige/30 hover:border-gold-beige text-gold-beige font-mono text-xs tracking-widest uppercase hover:bg-gold-beige/10 transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    Examine Architectural Ledger
                    <Compass className="w-4 h-4 text-gold-beige group-hover:rotate-90 duration-500" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 text-studio-gray font-mono">No projects in this exhibit category.</div>
            )
          ) : (
            /* Structural Masonry Grid Mode */
            <motion.div
              key="grid-masonry"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-4 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden bg-studio-charcoal aspect-[4/3] w-full">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-black/70 to-transparent opacity-60" />
                    
                    {/* Floating Info badge */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] tracking-widest text-gold-beige uppercase mb-1">
                          {project.category} // {project.location}
                        </span>
                        <h4 className="font-serif text-xl tracking-wider text-gold-light group-hover:text-gold-beige duration-300">
                          {project.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-white/50 bg-studio-black/80 px-2.5 py-1.5 border border-white/10 backdrop-blur-md uppercase">
                        EXAMINER +
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-gold-sand/70 font-light line-clamp-2 pr-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Extreme Luxury Architectural Ledger Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 bg-studio-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-studio-dark border border-white/[0.08] w-full max-w-5xl h-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative p-6 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 custom-scrollbar shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button sticky */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-studio-gray hover:text-gold-light hover:rotate-90 duration-300 cursor-pointer border border-white/[0.08] hover:border-gold-beige/50 bg-studio-black/80 rounded-none z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Section full-width */}
              <div className="col-span-12 border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-gold-beige uppercase mb-1">
                  <span>{selectedProject.category} SPECIFICATIONS</span>
                  <span>//</span>
                  <span>OS-COORDINATES {selectedProject.location.toUpperCase()}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-gold-light mt-1">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Left detail grid: Spec Sheets (Cols 1 to 7) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-[#7c7267] uppercase block mb-2 font-semibold">
                    STATEMENT OF PURPOSE
                  </span>
                  <p className="font-sans text-xs md:text-sm text-gold-sand/80 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#7c7267] uppercase block font-semibold">
                    STRUCTURAL LEDGER (DRAWINGS CASE SHEET)
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="p-4 bg-studio-black border border-white/[0.04]">
                        <span className="font-mono text-[9px] text-[#7c7267] uppercase tracking-wider block mb-1">
                          {spec.label}
                        </span>
                        <span className="font-serif text-sm font-normal text-gold-light">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#7c7267] uppercase block font-semibold">
                    TACTILE PALETTE
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 bg-white/[0.02] border border-white/[0.04]">
                        <div className="w-2.5 h-2.5 bg-gold-beige/50 border border-gold-beige flex-shrink-0" />
                        <span className="font-mono text-[10px] text-gold-sand/90 font-light capitalize">
                          {mat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side display details (Cols 8 to 12) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div className="border border-white/[0.08] relative aspect-video lg:aspect-square overflow-hidden bg-studio-black">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono text-[8px] tracking-widest text-gold-beige block">
                      SCALE INDEX
                    </span>
                    <span className="font-serif text-lg italic text-gold-light">
                      {selectedProject.scale}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/[0.04] text-xs font-mono flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-studio-gray">CLIENT REPRESENTATIVE</span>
                    <span className="text-gold-light">{selectedProject.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-studio-gray">COMMISSION YEAR</span>
                    <span className="text-gold-light">{selectedProject.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-studio-gray">REGULATION STATUS</span>
                    <span className="text-emerald-500 font-bold uppercase tracking-wider">APPROVED // ZERO CARBON</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3 bg-gold-beige hover:bg-gold-light text-studio-black font-mono text-xs tracking-widest font-semibold uppercase transition-colors"
                >
                  Conclude Review
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
