import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, X, ArrowRight } from 'lucide-react';
import { useGateway } from '../hooks/useGateway';

interface ClaimSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

export const ClaimSuccessModal: React.FC<ClaimSuccessModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
}) => {
  const { claimAmount } = useGateway();

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#00B8D9', '#FFFFFF', '#0A2540'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070D]/85 backdrop-blur-lg animate-in fade-in duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 30 }}
        className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.3)] relative overflow-hidden text-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0B1120] text-slate-400 hover:text-white border border-cyan-500/20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-20 h-20 rounded-full cyan-button flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.8)] mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-[#05070D] stroke-[3]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRANSACTION VERIFIED</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          CONGRATULATIONS!
        </h3>

        <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
          You have successfully claimed <span className="text-[#00F0FF] font-bold">{claimAmount} CVR ($975)</span> tokens to your Web3 wallet.
        </p>

        <div className="glass-card p-4 rounded-2xl border border-cyan-500/20 text-left space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Recipient Wallet:</span>
            <span className="font-mono text-white font-semibold">
              {walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : 'Connected Wallet'}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Reward Amount:</span>
            <span className="text-[#00F0FF] font-bold">{claimAmount} CVR ($975)</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Estimated Value:</span>
            <span className="text-white font-bold">$975.00 USD</span>
          </div>
          <div className="flex justify-between text-xs pt-1 border-t border-cyan-500/10">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Completed
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl cyan-button font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <span>RETURN TO HOME</span>
          <ArrowRight className="w-4 h-4 text-[#05070D]" />
        </button>
      </motion.div>
    </div>
  );
};
