import React from 'react';
import { ShieldCheck, Zap, Coins, Globe, ArrowUpRight } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const cards = [
    {
      badge: 'TOKEN REWARDS',
      title: 'EARN & GROW WITH CRYVORA',
      desc: 'Participate in our Genesis Airdrop and Referral multiplier pools. 100% transparent and claimable on-chain.',
      image: '/assets/cry_ecosystem_1.jpg',
      icon: Coins,
    },
    {
      badge: 'NEXT-GEN TECH',
      title: 'BUILT FOR THE FUTURE OF WEB3',
      desc: 'Powered by BNB Smart Chain infrastructure ensuring near-zero gas fees, sub-second latency, and maximum security.',
      image: '/assets/cry_ecosystem_2.jpg',
      icon: Zap,
    },
    {
      badge: 'DECENTRALIZED',
      title: 'COMMUNITY GOVERNANCE',
      desc: 'Cryvora gives voting power and staking rewards to $CVR holders. Shape the protocol’s future direction.',
      image: '/assets/cry_ecosystem_3.jpg',
      icon: ShieldCheck,
    },
    {
      badge: 'GLOBAL REACH',
      title: 'BORDERLESS DEFI ECOSYSTEM',
      desc: 'Seamlessly access DEX liquidity, yield farming, and NFT utility across multiple chain ecosystems.',
      image: '/assets/cry_ecosystem_4.jpg',
      icon: Globe,
    },
  ];

  return (
    <section id="ecosystem" className="relative py-20 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-widest mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Ecosystem & Utilities</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          DISCOVER THE <span className="text-[#00F0FF] text-cyan-glow">CRYVORA ECOSYSTEM</span>
        </h2>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          High-yield Web3 infrastructure designed to deliver maximum value, speed, and security for crypto enthusiasts.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const CardIcon = card.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Image Showcase */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#05070D]">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-[#05070D]/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider">
                    {card.badge}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#00F0FF]">
                  <CardIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Utility #{idx + 1}</span>
                </div>

                <h3 className="text-lg font-extrabold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-cyan-500/10 flex items-center justify-between mt-4">
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                  Learn More
                </span>
                <div className="w-8 h-8 rounded-full bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-[#05070D] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
