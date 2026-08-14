import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const cards = [
    {
      title: 'EARN & GROW',
      desc: 'Complete tasks, join missions, and earn $CVR rewards.',
      image: '/assets/cry_ecosystem_1.png',
      badge: 'STAKING & MISSIONS',
    },
    {
      title: 'BUILT FOR THE FUTURE',
      desc: 'Cryvora is building real utilities for real-world impact.',
      image: '/assets/cry_ecosystem_2.png',
      badge: 'ANALYTICS & UTILITY',
    },
    {
      title: 'DECENTRALIZED',
      desc: 'Powered by the community, for the community.',
      image: '/assets/cry_ecosystem_3.png',
      badge: 'OPEN INFRASTRUCTURE',
    },
    {
      title: 'REWARDS FOR ALL',
      desc: 'Fair. Transparent. Sustainable. Rewards for everyone.',
      image: '/assets/cry_ecosystem_4.png',
      badge: 'FAIR DISTRIBUTION',
    },
  ];

  return (
    <section id="ecosystem" className="relative py-24 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Infrastructure</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          THE <span className="text-[#00F0FF] text-cyan-glow">CRYVORA ECOSYSTEM</span>
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="glass-card p-6 rounded-3xl border border-cyan-500/20 flex flex-col justify-between items-center text-center relative group overflow-hidden"
          >
            {/* Ambient inner glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/0 via-[#00F0FF]/0 to-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Badge */}
            <span className="text-[10px] font-extrabold text-[#00F0FF] tracking-wider uppercase mb-4 px-3 py-1 rounded-full bg-[#05070D]/80 border border-cyan-500/20">
              {card.badge}
            </span>

            {/* Ecosystem Image Card */}
            <div className="relative w-full h-44 flex items-center justify-center my-2 rounded-2xl overflow-hidden border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[#00F0FF]/10 blur-xl group-hover:bg-[#00F0FF]/25 transition-all duration-300" />
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-md"
              />
            </div>

            {/* Content Text */}
            <div className="mt-4 space-y-2 relative z-10">
              <h3 className="text-base font-extrabold text-white tracking-wider">
                {card.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
