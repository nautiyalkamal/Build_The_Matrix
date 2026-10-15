import { Mail, Linkedin, Compass, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { TeamMember } from "../types";

export default function Studio() {
  const teamMembers: TeamMember[] = [
    {
      id: "member-1",
      name: "Antoine Valentin",
      role: "Principal Founder & Creative Director",
      bio: "An alumnus of the École Nationale Supérieure des Beaux-Arts de Paris with over 18 years of experience. Antoine's work centers on brutalist material extraction and the philosophical relationship between raw stone, light refraction, and long-term durability.",
      imageUrl: "https://picsum.photos/seed/principal/600/800",
      quote: "Space is an envelope of silence. We simply construct the borders."
    },
    {
      id: "member-2",
      name: "Hanae Haruno",
      role: "Director of Parametric Engineering",
      bio: "Hanae specializes in complex timber seismic configurations and organic modular structures. By pairing deep historical Japanese jointry with digital parametric computation, her structures are designed to survive centuries.",
      imageUrl: "https://picsum.photos/seed/director/600/800",
      quote: "The interface between ancient craftsmanship and math is where future ruins are born."
    },
    {
      id: "member-3",
      name: "Julien Declerq",
      role: "Chief lighting Strategist",
      bio: "Julien is dedicated to the study of the solar pathing and light temperature. His research focuses on optimizing interior space illumination through high-order architectural skylights and astronomical window orientations.",
      imageUrl: "https://picsum.photos/seed/strategist/600/800",
      quote: "A building is a clock. Every shadow tracking across a wall tells an emotional story."
    }
  ];

  return (
    <section id="studio" className="py-24 md:py-32 bg-gold-sand text-studio-black overflow-hidden relative">
      {/* Structural layout outlines indicating geometric plans */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-studio-black/[0.08]" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-studio-black/[0.04] hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-bronze uppercase block mb-3 font-semibold">
              04 // COMPANY INSIGHT
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-studio-black leading-tight">
              A Syndicate <br />
              of <span className="italic">Spatial Sculptors</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-base text-studio-charcoal/80 font-light max-w-[500px] leading-relaxed">
              We operate as a boutique high-end architectural think-tank. Bringing together digital coding, old-world stonemasonry, and light engineering, we work closely alongside visionaries to craft emotional, custom-built estates.
            </p>
          </div>
        </div>

        {/* Company Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch border-t border-b border-studio-black/[0.1] py-12 mb-20">
          {[
            { metric: "11", title: "Global Company Minds", sub: "Paris, Kyoto, Oslo" },
            { metric: "4.8B", title: "Value of Supervised Estates", sub: "Across 4 continents" },
            { metric: "16", title: "Historical Restoration Licenses", sub: "UNESCO Designated districts" },
            { metric: "Zero", title: "Carbon Operations Goal", sub: "By winter solstice 2028" },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2 justify-between p-4 bg-studio-black/[0.02] hover:bg-studio-black/[0.04] duration-300">
              <span className="font-serif text-3xl md:text-4xl text-studio-black font-light leading-none">
                {stat.metric}
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-studio-charcoal">
                  {stat.title}
                </span>
                <span className="font-mono text-[10px] text-[#7c7267] mt-0.5">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-stretch">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col bg-white/[0.2] border border-studio-black/[0.05] p-5 md:p-6 group hover:bg-white/[0.4] hover:shadow-2xl transition-all duration-500 justify-between gap-6"
            >
              <div className="flex flex-col gap-6">
                {/* Visual Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-studio-charcoal/20">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle lighting mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-serif text-2xl font-light text-studio-black leading-none">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-wider text-gold-bronze uppercase mt-2.5 font-semibold leading-none">
                    {member.role}
                  </span>
                  
                  <p className="mt-4 font-sans text-xs md:text-sm text-studio-charcoal/80 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Designer Philosophic Quote Stamp */}
              <div className="pt-4 border-t border-studio-black/[0.08] flex flex-col justify-end gap-3 leading-tight">
                <p className="font-serif text-xs italic text-studio-charcoal font-light leading-relaxed">
                  "{member.quote}"
                </p>

                {/* Social Actions */}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono text-[8px] text-[#7c7267] uppercase tracking-widest">
                    REPRESENTATIVE CREDENTIALS
                  </span>
                  <div className="flex gap-2.5 text-studio-charcoal/50">
                    <Linkedin className="w-3.5 h-3.5 hover:text-gold-bronze transition-colors cursor-pointer" />
                    <Mail className="w-3.5 h-3.5 hover:text-gold-bronze transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
