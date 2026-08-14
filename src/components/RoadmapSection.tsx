import React from 'react';
import { motion } from 'framer-motion';
import { Package, Gift, TrendingUp, Share2, ShieldCheck } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const milestones = [
    {
      quarter: 'Q1 2024',
      title: 'PROJECT LAUNCH',
      desc: 'Build community & create awareness',
      icon: Package,
      active: true,
    },
    {
      quarter: 'Q2 2024',
      title: 'AIRDROP CAMPAIGN',
      desc: 'Distribute $CVR to early supporters',
      icon: Gift,
      active: true,
    },
    {
      quarter: 'Q3 2024',
      title: 'LISTING & PARTNERSHIPS',
      desc: 'List $CVR and onboard strategic partners',
      icon: TrendingUp,
      active: false,
    },
    {
      quarter: 'Q4 2024',
      title: 'ECOSYSTEM EXPANSION',
      desc: 'Launch utilities and grow the ecosystem',
      icon: Share2,
      active: false,
    },
    {
      quarter: '2025+',
      title: 'GLOBAL ADOPTION',
      desc: 'Mass adoption & real-world impact',
      icon: ShieldCheck,
      active: false,
    },
  ];

  return (
    <section id="roadmap" className="relative py-20 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10 overflow-hidden">
      
      {/* Title Header (Left-aligned matching reference design) */}
      <div className="text-left mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          OUR <span className="text-[#00F0FF] text-cyan-glow">ROADMAP</span>
        </h2>
      </div>

      {/* Main Roadmap Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: 5 Milestone Nodes Timeline (8 cols on lg) */}
        <div className="lg:col-span-8 relative py-6">
          
          {/* Blue Dashed Connection Line */}
          <div className="hidden md:block absolute top-12 left-6 right-6 h-0.5 border-b-2 border-dashed border-[#00F0FF]/50 z-0 shadow-[0_0_12px_rgba(0,240,255,0.8)]" />

          {/* 5 Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.quarter}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Glowing Milestone Node */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      m.active
                        ? 'bg-[#00F0FF]/20 border-2 border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.8)] scale-105'
                        : 'bg-[#05070D]/90 border border-cyan-500/30 group-hover:border-[#00F0FF]/60 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {m.active && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00F0FF] border-2 border-[#05070D] animate-ping" />
                    )}
                  </div>

                  {/* Quarter Label */}
                  <span className="mt-3 text-[10px] font-extrabold text-[#00F0FF] tracking-widest uppercase">
                    {m.quarter}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 text-xs font-extrabold text-white tracking-wider leading-tight">
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-[11px] text-slate-400 leading-snug font-normal max-w-[140px]">
                    {m.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Rocket Mascot Image (4 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 flex items-center justify-center relative"
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full flex items-center justify-center"
          >
            {/* Ambient Cyan Blur Behind Rocket */}
            <div className="absolute inset-0 bg-[#00F0FF]/15 rounded-full blur-3xl -z-10" />

            <img
              src="/assets/roadmap_rockets.png"
              alt="Cryvora Roadmap Rocket Mascot"
              className="w-full max-w-[340px] lg:max-w-[380px] h-auto object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.5)]"
            />
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
};
