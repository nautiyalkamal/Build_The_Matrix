import { Star, MessageSquareCode } from "lucide-react";
import { motion } from "motion/react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "test-1",
      quote: "The Cliffside Sanctuary completely redefined our physical morning patterns of life. The seaside raw concrete retains heat beautifully throughout the cold night winds, and the daily solar window framing of the horizon is magnificent.",
      client: "Lord Marcus Aurelius III",
      role: "Global Arts Patron & Venture Collector",
      project: "Cliffside Sanctuary, Crete",
      year: "2025"
    },
    {
      id: "test-2",
      quote: "Their rare capability to shape absolute contemporary purity whilst respecting strict local European historic preservation laws is exceptional. The Meridian Tower is a landmark that manages to feel ancient yet deeply futuristic.",
      client: "Countess Hélène de Valois",
      role: "Heritage Foundation Advisory Board",
      project: "Metallic Meridian Tower, Paris",
      year: "2026"
    },
    {
      id: "test-3",
      quote: "Company Arché has engineered not merely a raw concrete pavilion in our foggy woods, but an emotional spatial instrument that listens and breathes. The sound dampening of the basalt stone during mist hours is exceptionally meditative.",
      client: "Kristin Lindqvist",
      role: "Director, Oslo Contemplative Center",
      project: "The Mist Pavilion, Oslo",
      year: "2025"
    }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-studio-black text-gold-light relative">
      
      {/* Structural layout markers */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-white/[0.04]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/[0.02] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/[0.02] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-beige uppercase block mb-3 font-semibold">
            05 // TESTIMONIAL LETTERS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-white leading-tight">
            Client <span className="italic">Witness</span>
          </h2>
          <div className="h-[1px] w-24 bg-gold-beige mx-auto mt-6 opacity-40" />
        </div>

        {/* Testimonials Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((test, index) => (
            <div
              key={test.id}
              className="bg-studio-dark border border-white/[0.04] p-8 relative flex flex-col justify-between hover:border-gold-beige/30 transition-all duration-500 rounded-none group hover:bg-studio-charcoal/30 shadow-xl"
            >
              {/* Premium geometric layout accents */}
              <div className="absolute top-0 left-0 w-[1px] h-12 bg-gold-beige group-hover:h-full transition-all duration-700" />
              
              <div className="flex flex-col gap-6">
                {/* 5 elegant stars using neutral champagne tones */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold-beige stroke-gold-beige opacity-80" />
                    ))}
                  </div>

                  {/* Stamp ID */}
                  <span className="font-mono text-[8px] text-white/30 tracking-widest">
                    RECORD_LTR // {index + 1}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Majestic quote mark icon background */}
                  <div className="font-serif text-4xl text-gold-beige/10 font-normal leading-none h-2 pointer-events-none -mb-3">
                    “
                  </div>
                  <p className="font-serif text-base md:text-lg italic text-gold-sand/90 font-light leading-relaxed relative z-10">
                    {test.quote}
                  </p>
                </div>
              </div>

              {/* Client specifications and details signature */}
              <div className="border-t border-white/[0.07] pt-6 mt-8 flex flex-col gap-2">
                <span className="font-serif text-lg text-white font-medium leading-none">
                  {test.client}
                </span>
                <span className="font-mono text-[9px] tracking-wider text-studio-gray uppercase leading-none mt-1">
                  {test.role}
                </span>

                <div className="flex justify-between items-center mt-3 font-mono text-[9px] text-gold-beige/70">
                  <span className="uppercase tracking-widest block bg-white/[0.03] px-2 py-0.5 border border-white/5 uppercase">
                    {test.project}
                  </span>
                  <span className="text-studio-gray font-light">
                    VAL-{test.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
