import React from 'react';
import { Rocket, CheckCircle2, Circle } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const phases = [
    {
      phase: 'PHASE 01',
      title: 'Genesis Launch & Airdrop',
      status: 'Completed',
      items: [
        'Smart contract audit & deployment',
        'Genesis Airdrop campaign live',
        'Referral reward program activation',
        'Web3 wallet integration & BSC sync',
      ],
    },
    {
      phase: 'PHASE 02',
      title: 'Exchange Listing & Liquidity',
      status: 'In Progress',
      items: [
        'PancakeSwap & DEX listings',
        'Tier-2 CEX listings & market making',
        'CoinMarketCap & CoinGecko indexing',
        'Liquidity lock & governance portal',
      ],
    },
    {
      phase: 'PHASE 03',
      title: 'Ecosystem Expansion',
      status: 'Upcoming',
      items: [
        'Staking & Yield farming pools',
        'Cross-chain bridge deployment',
        'NFT Utility passes & marketplace',
        'Cryvora Mobile Web3 App launch',
      ],
    },
  ];

  return (
    <section id="roadmap" className="relative py-20 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10">
      {/* Background glow */}
      <div className="absolute left-10 bottom-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-widest mb-3">
          <Rocket className="w-3.5 h-3.5" />
          <span>Growth Roadmap</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          STRATEGIC <span className="text-[#00F0FF] text-cyan-glow">DEVELOPMENT ROADMAP</span>
        </h2>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          Clear execution strategy to scale Cryvora into a top-tier Web3 decentralized ecosystem.
        </p>
      </div>

      {/* Roadmap Content: 3 Phases Left (8 cols) + Rocket Mascot Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        
        {/* Left Column: 3 Timeline Cards */}
        <div className="lg:col-span-8 space-y-6">
          {phases.map((p) => (
            <div
              key={p.phase}
              className="glass-panel p-6 rounded-3xl border border-cyan-500/25 relative overflow-hidden group hover:border-cyan-500/50 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full border border-cyan-500/30 uppercase tracking-widest">
                  {p.phase}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    p.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : p.status === 'In Progress'
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-cyan-500/30'
                      : 'bg-slate-700/40 text-slate-400 border border-slate-600/30'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-3">
                {p.title}
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {p.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2">
                    {p.status === 'Completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Column: Rocket Mascot Graphic */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-[#00F0FF]/15 rounded-full blur-3xl" />
            <img
              src="/assets/roadmap_rockets.png"
              alt="Cryvora Roadmap Rocket Mascot"
              loading="lazy"
              decoding="async"
              className="w-full max-w-[340px] lg:max-w-[380px] h-auto object-contain drop-shadow-[0_0_35px_rgba(0,240,255,0.4)] relative z-10"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
