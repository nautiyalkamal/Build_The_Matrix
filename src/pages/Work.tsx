import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, ClipboardList, Scale, Info, Layers, Compass, ArrowRight, X, Sparkles } from "lucide-react";
import { Project } from "../types";

interface WorkProps {
  heroImage: string;
  interiorImage: string;
  exteriorImage: string;
  pavilionImage: string;
}

export default function Work({ heroImage, interiorImage, exteriorImage, pavilionImage }: WorkProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const projects: Project[] = [
    {
      id: "project-1",
      title: "Contemporary Villa Residence",
      location: "Modern Minimal Living Concept",
      year: "2026",
      category: "RESIDENTIAL ARCHITECTURE",
      description: "A luxury residential design focused on seamless indoor-outdoor transitions, natural lighting integration, elegant material palettes, and modern spatial experiences. The project combines minimal architecture with premium detailing to create a timeless contemporary residence.",
      imageUrl: heroImage,
      client: "Modern Luxury Villa",
      scale: "250+ M² GFA",
      materials: ["Exposed Concrete", "Natural Travertine", "Warm Oak Finishes"],
      specs: [
        { label: "Design Concept", value: "Modern Luxury Villa" },
        { label: "Spatial Approach", value: "Seamless indoor-outdoor transitions with optimized layout planning" },
        { label: "Lighting Integration", value: "Passive daylight optimization paired with concealed ambient lighting" }
      ]
    },
    {
      id: "project-2",
      title: "Smart Workspace Environment",
      location: "Collaborative Office Design",
      year: "2025",
      category: "COMMERCIAL SPACES",
      description: "A modern office environment designed with intelligent planning, collaborative spatial zoning, premium lighting systems, and BIM-integrated execution strategies for functional and aesthetic efficiency.",
      imageUrl: interiorImage,
      client: "Corporate Office Interior",
      scale: "450 m² GFA",
      materials: ["Textured Stone Panels", "Matte Black Metal Finishes", "Acoustic Timber Systems"],
      specs: [
        { label: "Design Concept", value: "Corporate Office Interior" },
        { label: "Planning Workflows", value: "Intelligent planning and collaborative spatial zoning" },
        { label: "Technical Execution", value: "BIM-integrated development with coordinated system drawings" }
      ]
    },
    {
      id: "project-3",
      title: "Urban Residential Tower",
      location: "BIM Execution & Visualization",
      year: "2025",
      category: "BIM & VISUALIZATION",
      description: "A detailed BIM coordination and visualization project developed using advanced Revit workflows, clash detection systems, construction documentation, and photorealistic rendering pipelines.",
      imageUrl: exteriorImage,
      client: "High-Rise BIM Coordination",
      scale: "18,500 m² GFA",
      materials: ["BIM-Based Coordination", "Parametric Facade Systems", "Smart Structural Modeling"],
      specs: [
        { label: "Design Concept", value: "High-Rise BIM Coordination" },
        { label: "BIM Standard", value: "Advanced Revit workflows and multi-discipline interference checks" },
        { label: "Atmosphere Engine", value: "Cinematic presentations and photorealistic rendering pipelines" }
      ]
    },
    {
      id: "project-4",
      title: "Contemporary Café & Lounge",
      location: "Interior Experience Design",
      year: "2024",
      category: "INTERIOR DESIGN",
      description: "An immersive hospitality interior designed with ambient lighting, warm textures, bespoke seating layouts, and refined material combinations to create an elegant social environment.",
      imageUrl: pavilionImage,
      client: "Luxury Hospitality Lounge",
      scale: "320 m² GFA",
      materials: ["Walnut Veneer Finishes", "Ambient Lighting Design", "Brushed Brass Details"],
      specs: [
        { label: "Design Concept", value: "Luxury Hospitality Lounge" },
        { label: "Atmosphere Setup", value: "Warm textures, bespoke seating, and refined material balance" },
        { label: "Light Choreography", value: "Precision lighting simulations and engineered interior modeling" }
      ]
    },
    {
      id: "project-5",
      title: "Modern Apartment Interior",
      location: "Compact Luxury Living",
      year: "2024",
      category: "RESIDENTIAL ARCHITECTURE",
      description: "A sophisticated apartment design integrating efficient planning, clean visual aesthetics, functional storage systems, and premium contemporary interiors tailored for urban lifestyles.",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
      client: "Urban Apartment Concept",
      scale: "115 m² GFA",
      materials: ["Limestone Textures", "Soft Neutral Palette", "Minimal Custom Furniture"],
      specs: [
        { label: "Design Concept", value: "Urban Apartment Concept" },
        { label: "Spatial Strategy", value: "Efficient planning and optimized built-in storage configurations" },
        { label: "Material Balance", value: "Limestone textures paired with custom minimalist furniture assets" }
      ]
    },
    {
      id: "project-6",
      title: "Premium Retail Environment",
      location: "Spatial Branding Concept",
      year: "2024",
      category: "COMMERCIAL SPACES",
      description: "A high-end retail concept focused on customer movement, luxury visual merchandising, spatial branding strategies, and immersive lighting environments designed for premium shopping experiences.",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
      client: "Retail Experience Studio",
      scale: "580 m² GFA",
      materials: ["Polished Concrete Floors", "Architectural Lighting", "Blackened Steel Details"],
      specs: [
        { label: "Design Concept", value: "Retail Experience Studio" },
        { label: "Experience Design", value: "High-end visual merchandising layout centered on customer circulation" },
        { label: "Lighting System", value: "Specialized spotlight grids and immersive physical branding features" }
      ]
    }
  ];

  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-[#0b0c0e] text-white min-h-screen relative">
      {/* Structural layout markers */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.05]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.03] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.03] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Page title section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase block mb-3 font-semibold">
              02 // PROJECT DIRECTORY
            </span>
            <h2 className="text-4xl sm:text-5xl tracking-tight text-white font-extralight leading-none">
              Featured <span className="font-normal">Architectural & BIM Works</span>
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {["ALL", "RESIDENTIAL ARCHITECTURE", "COMMERCIAL SPACES", "INTERIOR DESIGN", "BIM & VISUALIZATION"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                  activeFilter === filter
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-transparent text-white/50 border-white/[0.15] hover:text-white hover:border-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between bg-[#111215] border border-white/[0.06] p-6 rounded-none hover:border-white/20 transition-all duration-500 shadow-xl"
              >
                <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-white/45 tracking-widest uppercase border-l border-b border-white/[0.05] bg-black/40">
                  {project.category}
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800 border border-white/[0.05] mb-6 mt-4">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-white/[0.08] pb-1">
                    <span className="font-mono text-[8px] text-white/40 tracking-widest">
                      REF-0{index + 1}
                    </span>
                    <span className="font-mono text-xs text-white/70 font-semibold">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-[#D97706] uppercase tracking-wider font-semibold">
                      {project.client}
                    </span>
                    <h3 className="text-xl font-sans font-medium text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/60 font-sans text-xs">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3 font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.materials.slice(0, 3).map((mat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] font-mono text-[9px] text-white/75">
                        {mat}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-6 w-full py-3 bg-zinc-900 group-hover:bg-white group-hover:text-black text-white border border-white/[0.08] group-hover:border-white font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-500 rounded-none cursor-pointer flex items-center justify-center gap-2 font-bold"
                  >
                    <span>Project Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Specifications Detail Drawout overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 220 }}
                className="relative w-full max-w-2xl h-full bg-[#111215] border-l border-white/[0.1] text-white p-8 md:p-12 overflow-y-auto z-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center border-b border-white/[0.08] pb-6 mb-8">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase flex items-center gap-2">
                      <ClipboardList className="w-3.5 h-3.5 text-white" />
                      MASTER ARCHITECTURAL LEDGER
                    </span>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-1.5 border border-white/[0.1] hover:border-white hover:bg-white/[0.04] text-white rounded-none cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] text-[#D97706] uppercase tracking-wider font-semibold">
                          {selectedProject.client}
                        </span>
                        <h4 className="text-3xl font-sans font-light text-white leading-tight">
                          {selectedProject.title}
                        </h4>
                      </div>
                      <span className="font-mono text-xs text-white/50">
                        {selectedProject.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-white/60 font-mono text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedProject.location}</span>
                    </div>

                    <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-800 border border-white/[0.08] mb-6">
                      <img
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-white/[0.06] py-4 my-2">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                          PROJECT FOCUS
                        </span>
                        <span className="font-sans text-xs text-white/80 font-medium">
                          {selectedProject.client}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 border-l border-white/[0.06] pl-4">
                        <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                          BUILDING ENVELOPE / GFA
                        </span>
                        <span className="font-sans text-xs text-white font-semibold flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5" />
                          {selectedProject.scale}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                        COGNITIVE BRAND CONCEPT
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5 mt-4">
                      <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        TACTILE BRANDED MATERIALS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.materials.map((mat, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] font-mono text-[10px] text-white/80 font-medium font-bold">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6 border-t border-white/[0.08] pt-6">
                      <span className="font-mono text-[8px] text-white/60 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                        <Info className="w-3.5 h-3.5" />
                        ENGINEERING INTEGRITY SPECIFICATIONS
                      </span>
                      <div className="flex flex-col gap-2">
                        {selectedProject.specs.map((spec, i) => (
                          <div key={i} className="bg-white/[0.01] border border-white/[0.04] p-3 flex flex-col gap-1">
                            <span className="font-mono text-[9px] text-white/75 uppercase tracking-widest font-semibold">
                              {spec.label}
                            </span>
                            <span className="font-sans text-2xs sm:text-xs text-white/50 font-light leading-relaxed">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-6 mt-12 flex justify-between items-center text-white/40">
                  <div className="flex flex-col">
                    <span className="font-mono text-[7.5px] tracking-widest leading-none">
                      BUILD THE MATRIX ARCHITECTURAL ALLIANCE
                    </span>
                    <span className="font-mono text-[7.5px] tracking-widest leading-none mt-1">
                      SAN FRANCISCO // SAN JOSE // MILAN // LONDON
                    </span>
                  </div>
                  <span className="font-mono text-[8px] tracking-wider border border-white/10 px-2 py-0.5">
                    APPROVED BLUEPRINT
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3. Performance & Design Matrix Table */}
        <div className="mt-28 border-t border-white/[0.08] pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] tracking-[0.45em] text-white/40 uppercase font-bold">
                PERFORMANCE & DESIGN MATRIX
              </span>
              <h3 className="text-3xl sm:text-4xl font-sans font-extralight text-white leading-tight">
                Intelligent Architectural <br />
                <span className="font-normal text-white">Systems</span>
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/60 max-w-sm font-light leading-relaxed">
              Every BUILD THE MATRIX project is developed through advanced architectural workflows, BIM precision standards, and visual optimization strategies to ensure performance, sustainability, and timeless aesthetics.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/[0.06]">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-white/[0.01] border-b border-white/[0.08] text-white/40 uppercase text-[9px] tracking-wider">
                  <th className="p-4 pl-6">Project</th>
                  <th className="p-4">BIM Coordination</th>
                  <th className="p-4">Visualization Accuracy</th>
                  <th className="p-4">Sustainability Focus</th>
                  <th className="p-4 font-bold">Spatial Efficiency</th>
                  <th className="p-4 pr-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  {
                    name: "MODERN LUXURY VILLA",
                    coordination: "Advanced Revit Workflow",
                    accuracy: "Photorealistic Rendering",
                    sustainability: "Passive Lighting Strategy",
                    spatial: "High Spatial Optimization",
                    status: "COMPLETED"
                  },
                  {
                    name: "CORPORATE OFFICE INTERIOR",
                    coordination: "Multi-Discipline Coordination",
                    accuracy: "Real-Time Visualization",
                    sustainability: "Energy Efficient Systems",
                    spatial: "Collaborative Planning",
                    status: "IN DEVELOPMENT"
                  },
                  {
                    name: "HIGH-RISE BIM PROJECT",
                    coordination: "Structural BIM Integration",
                    accuracy: "Cinematic Presentation",
                    sustainability: "Smart Facade Planning",
                    spatial: "Intelligent Circulation",
                    status: "COMPLETED"
                  },
                  {
                    name: "HOSPITALITY LOUNGE DESIGN",
                    coordination: "Detailed Interior Modeling",
                    accuracy: "Lighting Simulations",
                    sustainability: "Sustainable Material Selection",
                    spatial: "User Experience Focus",
                    status: "COMPLETED"
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors duration-300">
                    <td className="p-4 pl-6 text-white font-sans font-light text-sm tracking-wide">{row.name}</td>
                    <td className="p-4 text-white/50">{row.coordination}</td>
                    <td className="p-4 text-white/50">{row.accuracy}</td>
                    <td className="p-4 text-white/50">{row.sustainability}</td>
                    <td className="p-4 text-white/80 font-semibold">{row.spatial}</td>
                    <td className="p-4 pr-6 text-right font-bold text-amber-500 text-[10px] tracking-widest">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
