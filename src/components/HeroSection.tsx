import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, TrendingUp, Plus } from 'lucide-react';
import { TOKEN_CONTRACT_ADDRESS } from '../hooks/useGateway';

interface HeroSectionProps {
  onClaimClick: () => void;
  onLearnMoreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onClaimClick, onLearnMoreClick }) => {

  const handleAddTokenToWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: TOKEN_CONTRACT_ADDRESS,
              symbol: 'CVR',
              decimals: 18,
              image: `${window.location.origin}/assets/logo.png`,
            },
          },
        });
      } catch (error) {
        console.error('Error adding token to wallet:', error);
      }
    } else {
      alert('No Web3 wallet extension found. Please install MetaMask or Trust Wallet.');
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT HERO (45% -> 5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-start space-y-6 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>GENESIS AIRDROP CAMPAIGN IS LIVE</span>
          </div>

          {/* Large Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            THE FUTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              IS YOURS.
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#00B8D9] to-cyan-400 text-cyan-glow">
              CLAIM $CVR
            </span>{' '}
            TODAY.
          </h1>

          {/* Subtitle Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-lg leading-relaxed font-normal">
            Join the Cryvora Genesis Campaign. Complete simple tasks and claim{' '}
            <span className="text-[#00F0FF] font-semibold">12,500 CVR ($975)</span> tokens per claim. 
            Empowering next-gen Web3 infrastructure with zero slippage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
            <button
              onClick={onClaimClick}
              className="cyan-button px-7 py-3.5 rounded-full font-extrabold text-sm flex items-center gap-3 tracking-wider group cursor-pointer"
            >
              <span>CLAIM NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onLearnMoreClick}
              className="outline-button px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 tracking-wide cursor-pointer"
            >
              <span>LEARN MORE</span>
              <Play className="w-3.5 h-3.5 fill-current text-[#00F0FF]" />
            </button>

            <button
              onClick={handleAddTokenToWallet}
              className="px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 tracking-wide cursor-pointer bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/25 hover:border-[#00F0FF] transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>ADD TOKEN TO WALLET</span>
            </button>
          </div>

          {/* Listing Price Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-panel p-4 rounded-2xl border border-cyan-500/30 w-full sm:w-72 shadow-lg shadow-[#00F0FF]/5 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#00F0FF]/10 rounded-full blur-xl group-hover:bg-[#00F0FF]/25 transition-all" />
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>LISTING PRICE</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                $0.078
              </span>
              <span className="text-xs font-semibold text-[#00F0FF]">PER CVR</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT HERO (55% -> 6 cols on lg) */}
        <div className="lg:col-span-6 relative flex items-center justify-end min-h-[480px] pl-4 sm:pl-10 lg:pl-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 w-full flex items-center justify-end"
          >
            <img
              src="/assets/hero-section-image.png"
              alt="Cryvora Hero Graphic"
              className="w-full max-w-[520px] h-auto object-contain drop-shadow-[0_0_35px_rgba(0,240,255,0.3)] ml-auto"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
