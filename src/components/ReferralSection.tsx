import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Users, Sparkles, Share2, ShieldCheck, Gift } from 'lucide-react';

interface ReferralSectionProps {
  walletAddress?: string;
  isConnected?: boolean;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({
  walletAddress,
  isConnected,
}) => {
  const [copied, setCopied] = useState(false);
  const [refLink, setRefLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      if (isConnected && walletAddress) {
        setRefLink(`${baseUrl}?ref=${walletAddress}`);
      } else {
        setRefLink(`${baseUrl}?ref=0x71C7656EC7ab88b098defB751B7401B5f6d8976F`);
      }
    }
  }, [walletAddress, isConnected]);

  const handleCopy = () => {
    if (!refLink) return;
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const perks = [
    {
      icon: Sparkles,
      title: '50% Direct Referral Bonus',
      desc: 'Earn 6,250 CVR ($487) credited directly to your wallet whenever a referred friend claims their airdrop ticket.',
    },
    {
      icon: Users,
      title: 'Unlimited Referral Multipliers',
      desc: 'There is zero cap on referrals. Share with your community and accumulate thousands of bonus CVR reward tokens.',
    },
    {
      icon: ShieldCheck,
      title: 'Sybil Bot Protection',
      desc: 'Smart contracts verify active wallet interactions to ensure authentic referral tracking and fair distribution.',
    },
  ];

  return (
    <section id="referral" className="relative py-20 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10">
      {/* Background Glows */}
      <div className="absolute right-10 top-1/3 w-[350px] h-[350px] bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Referral Program</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          INVITE FRIENDS. <span className="text-[#00F0FF] text-cyan-glow">GET 6,250 CVR ($487) REWARDS.</span>
        </h2>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          Share your unique referral link. Receive 6,250 CVR ($487) in instant rewards for every valid claim.
        </p>
      </div>

      {/* Grid: Left Benefits (5 cols) + Right Clipboard Card (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Left Column: Perks List */}
        <div className="lg:col-span-5 space-y-6">
          {perks.map((perk, idx) => {
            const PerkIcon = perk.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-4 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF] shrink-0">
                  <PerkIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Promotional Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#05070D] to-[#0A1A2E]">
            {/* Ambient overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#05070D] bg-[#00F0FF] py-1 px-3 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                  REFERRAL MULTIPLIER ACTIVE
                </span>
                <Share2 className="w-5 h-5 text-[#00F0FF]" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  EARN 6,250 CVR <span className="text-[#00F0FF] text-cyan-glow">($487) INSTANT BONUS</span>
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Every user who connects and completes their claim via your link triggers an automatic 6,250 CVR ($487) payout straight into your connected wallet.
                </p>
              </div>

              {/* Link Clipboard Input Container */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                  YOUR UNIQUE REFERRAL LINK
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-[#05070D]/90 rounded-2xl border border-cyan-500/30">
                  <input
                    type="text"
                    readOnly
                    value={refLink}
                    className="w-full bg-transparent px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-xl cyan-button font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#05070D]" /> COPIED!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#05070D]" /> COPY LINK
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
