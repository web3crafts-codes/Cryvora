import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CheckSquare, Sliders, Gift, ChevronRight, Sparkles, Loader2, Zap, CheckCircle2 } from 'lucide-react';
import { useGateway } from '../hooks/useGateway';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface ClaimSectionProps {
  onClaimSuccess: () => void;
  isConnected: boolean;
  onConnectWallet?: () => void;
}

export const ClaimSection: React.FC<ClaimSectionProps> = ({
  onClaimSuccess,
  isConnected,
  onConnectWallet,
}) => {
  const {
    hasClaimed,
    claimAmount,
    claimTokens,
    isPending,
    isConfirming,
    isSuccess,
  } = useGateway();

  const { openConnectModal } = useConnectModal();

  const [sliderPosition, setSliderPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isSuccess) {
      onClaimSuccess();
    }
  }, [isSuccess, onClaimSuccess]);

  const handleTriggerConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    } else if (onConnectWallet) {
      onConnectWallet();
    }
  };

  const handleExecuteClaim = async () => {
    if (!isConnected) {
      handleTriggerConnect();
      return;
    }
    if (hasClaimed || isPending || isConfirming) return;
    await claimTokens();
  };

  const handleDragStart = () => {
    if (hasClaimed || isPending || isConfirming) return;
    if (!isConnected) {
      handleTriggerConnect();
      return;
    }
    isDragging.current = true;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || !trackRef.current || hasClaimed) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percent);

    if (percent >= 92) {
      isDragging.current = false;
      setSliderPosition(100);
      handleExecuteClaim();
    }
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (sliderPosition < 92 && !hasClaimed) {
      setSliderPosition(0);
    }
  };

  const steps = [
    {
      num: '01',
      title: 'CONNECT WALLET',
      desc: 'Connect your Web3 wallet to get started.',
      icon: Wallet,
    },
    {
      num: '02',
      title: 'COMPLETE TASKS',
      desc: 'Finish simple tasks to prove you are real.',
      icon: CheckSquare,
    },
    {
      num: '03',
      title: 'CLAIM REWARDS',
      desc: 'Click claim button or slide to claim $CVR.',
      icon: Sliders,
    },
    {
      num: '04',
      title: 'GET TOKENS',
      desc: `Claim ${claimAmount} CVR ($975) instantly to your wallet.`,
      icon: Gift,
    },
  ];

  return (
    <section id="claim" className="relative py-20 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Airdrop Instructions</span>
        </motion.div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          HOW TO CLAIM <span className="text-[#00F0FF] text-cyan-glow">{claimAmount} CVR ($975)</span>
        </h2>
      </div>

      {/* Grid: Left Flow & Claim Controls (7 cols) + Right Mascot (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: 4 Glass Step Cards & Responsive Claim Panel */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass-card p-5 rounded-2xl border border-cyan-500/20 relative group hover:border-cyan-500/40"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF] group-hover:scale-110 transition-transform">
                      <StepIcon className="w-5 h-5" />
                    </div>
                    {idx < 3 && (
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Responsive Claim Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-5 relative overflow-hidden"
          >
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
              <span className="text-xs font-extrabold text-[#00F0FF] uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00F0FF] animate-pulse" />
                CLAIM YOUR REWARDS NOW
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                Reward: <strong className="text-white">{claimAmount} CVR ($975)</strong>
              </span>
            </div>

            {/* Desktop View: Single 1-Click Claim Action Button */}
            <div className="hidden sm:block">
              <button
                onClick={handleExecuteClaim}
                disabled={hasClaimed || isPending || isConfirming}
                className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group shadow-2xl cursor-pointer ${
                  hasClaimed
                    ? 'bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-300 cursor-default'
                    : isPending || isConfirming
                    ? 'bg-cyan-500/20 border-2 border-cyan-500/40 text-cyan-200 cursor-wait'
                    : 'cyan-button text-[#05070D] shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.85)] hover:scale-[1.01]'
                }`}
              >
                {hasClaimed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>✓ {claimAmount} CVR ($975) CLAIMED SUCCESSFULLY!</span>
                  </>
                ) : isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#00F0FF]" />
                    <span>CONFIRMING IN WALLET...</span>
                  </>
                ) : isConfirming ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#00F0FF]" />
                    <span>MINING TRANSACTION ON BLOCKCHAIN...</span>
                  </>
                ) : !isConnected ? (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>CONNECT WALLET TO CLAIM {claimAmount} CVR ($975)</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    <span>CLAIM {claimAmount} CVR ($975) NOW</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile View: Slide Track for Touch Devices */}
            <div className="block sm:hidden space-y-2">
              <div className="text-center">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  SLIDE RIGHT TO CLAIM REWARDS
                </span>
              </div>
              <div
                ref={trackRef}
                onMouseDown={handleDragStart}
                onMouseMove={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
                className="relative w-full h-14 bg-[#05070D]/90 rounded-full border border-cyan-500/30 overflow-hidden cursor-pointer select-none flex items-center px-1.5 shadow-inner"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#0A2540] via-[#00B8D9] to-[#00F0FF] transition-all duration-75 shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                  style={{ width: `${sliderPosition}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-slate-300 pointer-events-none tracking-wider">
                  {hasClaimed
                    ? '✓ REWARDS CLAIMED!'
                    : isPending || isConfirming
                    ? 'PROCESSING...'
                    : 'Slide Right to Claim 12,500 CVR ($975)'}
                </span>
                <motion.div
                  className="relative z-10 w-11 h-11 rounded-full cyan-button flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(0,240,255,0.8)]"
                  style={{ left: `calc(${sliderPosition}% - ${sliderPosition * 0.44}px)` }}
                >
                  <ChevronRight className="w-6 h-6 text-[#05070D] stroke-[3]" />
                </motion.div>
              </div>
            </div>

            {!isConnected && (
              <div className="mt-2 text-center">
                <button
                  onClick={handleTriggerConnect}
                  className="text-xs text-[#00F0FF] hover:underline font-semibold cursor-pointer"
                >
                  * Please connect your wallet first to claim
                </button>
              </div>
            )}
          </motion.div>

        </div>

        {/* Right Side: Claim Mascot Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          <div className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-square flex items-center justify-center">
            <div className="absolute bottom-2 w-80 h-16 bg-[#00F0FF]/30 rounded-full blur-3xl animate-pulse-glow" />

            <motion.img
              src="/assets/claimsectionimage.png"
              alt="Claim Mascot"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full h-auto object-contain max-h-[480px] sm:max-h-[540px] drop-shadow-[0_0_40px_rgba(0,240,255,0.45)]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
