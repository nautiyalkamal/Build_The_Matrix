import { ArrowDown, Play, Compass, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onScrollToNext: () => void;
  onExploreProjects: () => void;
  imageUrl: string;
}

export default function Hero({ onScrollToNext, onExploreProjects, imageUrl }: HeroProps) {
  return (
    <section className="relative h-screen w-full flex items-end justify-center overflow-hidden bg-studio-black">
      {/* Background Image with slow zoom transition on mount */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        referrerPolicy="no-referrer"
      />

      {/* Cinematic Dark Overlay Gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-studio-black via-transparent to-studio-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-studio-black/80 via-transparent to-transparent hidden md:block" />

      {/* Ambient background particles/glowing elements for premium effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-beige/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Hero Canvas Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end h-full pt-32">
        {/* Left Column: Headline and philosophy (Cols 1 to 8) */}
        <div className="lg:col-span-8 flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-gold-beige" />
            <span className="font-mono text-[9px] font-medium tracking-[0.25em] text-gold-beige uppercase">
              REDEFINING HIGH-END CONTEMPORARY SPACES
            </span>
          </div>

          <div className="flex flex-col">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-gold-light font-light max-w-3xl"
            >
              SPACES <br /> THAT <span className="italic font-normal text-gold-beige text-glow">STAY</span>
            </motion.h1>

            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mt-6 text-sm md:text-base text-gold-sand/80 font-light max-w-lg leading-relaxed font-sans"
            >
              We craft emotional landmarks that harmoniously unite brutalist spatial clarity, light interplay, tactile raw materials, and high-editorial luxury living.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <button
              onClick={onExploreProjects}
              className="px-6 py-3.5 bg-gold-beige hover:bg-gold-light text-studio-black font-mono text-xs tracking-widest uppercase transition-all duration-500 rounded-none shadow-xl flex items-center gap-3 cursor-pointer group font-semibold"
            >
              <Compass className="w-4 h-4 text-studio-black group-hover:rotate-45 transition-transform duration-500" />
              View Works
            </button>
            
            <button
              onClick={onScrollToNext}
              className="px-6 py-3.5 bg-transparent hover:bg-white/[0.04] text-gold-light border border-white/[0.15] hover:border-gold-beige font-mono text-xs tracking-widest uppercase transition-all duration-500 flex items-center gap-3 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-gold-beige" />
              Studio Film
            </button>
          </motion.div>
        </div>

        {/* Right Column: Floating Statistics and Glassmorphism review cards (Cols 9 to 12) */}
        <div className="lg:col-span-4 flex flex-col gap-6 items-stretch lg:items-end w-full">
          {/* Glassmorphic review boxes to create luxury aesthetic depth */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] px-6 py-5 flex flex-col gap-3 rounded-none relative overflow-hidden group hover:border-gold-beige/30 transition-all duration-500"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gold-beige" />
            <div className="flex justify-between items-center text-gold-beige">
              <span className="font-mono text-[9px] tracking-widest uppercase text-studio-gray">
                CURRENT PROJECT RELEASE
              </span>
              <span className="font-mono text-[9px] text-glow bg-gold-beige/10 px-2 py-0.5 border border-gold-beige/20 uppercase text-gold-beige font-semibold">
                CHÂTEAU BLEU
              </span>
            </div>
            <p className="font-serif text-sm italic text-gold-light leading-relaxed">
              "An otherworldly synthesis of seaside monolith and warm, light-drenched residential safety."
            </p>
            <span className="font-mono text-[10px] tracking-widest text-studio-gray uppercase text-right block mt-1">
              — AD MAGAZINE EDITORIAL DEBUT
            </span>
          </motion.div>

          {/* Quick Metrics row */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.2 }}
            className="grid grid-cols-3 gap-3 w-full"
          >
            {[
              { val: "14+", label: "DESIGN AWARDS" },
              { val: "09", label: "CLIENTS ANNUALLY" },
              { val: "89%", label: "SUSTAINABLE LQR" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-studio-dark/70 border border-white/[0.04] p-4 flex flex-col items-start gap-1 justify-between hover:border-gold-beige/30 hover:bg-studio-charcoal/50 duration-500"
              >
                <span className="font-serif text-2xl font-light text-gold-beige text-glow leading-none">
                  {stat.val}
                </span>
                <span className="font-mono text-[8px] tracking-widest leading-normal text-studio-gray text-left block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Animated Scroll Down Mouse Indicator */}
      <button
        onClick={onScrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 hover:text-gold-beige transition-colors group cursor-pointer"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-studio-gray group-hover:text-gold-beige transition-colors uppercase leading-none">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-gold-beige" />
        </motion.div>
      </button>
    </section>
  );
}
