import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, ExternalLink } from 'lucide-react';
import { useConnect, useAccount } from 'wagmi';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (address: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSelectWallet }) => {
  const [connectingName, setConnectingName] = useState<string | null>(null);
  const { connectors, connectAsync } = useConnect();
  const { address } = useAccount();

  if (!isOpen) return null;

  const walletOptions = [
    { name: 'WalletConnect', icon: '⚡', desc: 'Scan QR code with WalletConnect / Mobile App' },
    { name: 'MetaMask', icon: '🦊', desc: 'Connect to your MetaMask Wallet' },
    { name: 'Phantom', icon: '👻', desc: 'Connect to your Phantom EVM/Multi-chain Wallet' },
    { name: 'Coinbase Wallet', icon: '🔵', desc: 'Connect using Coinbase Wallet' },
    { name: 'Injected Web3', icon: '🌐', desc: 'Connect to active Web3 browser extension' },
  ];

  const handleConnect = async (walletName: string) => {
    setConnectingName(walletName);
    try {
      // Search for specific connector in Wagmi list
      let targetConnector = connectors.find((c) =>
        c.name.toLowerCase().includes(walletName.toLowerCase())
      );

      // If WalletConnect selected or no specific connector found, fallback to WalletConnect or first connector
      if (!targetConnector) {
        targetConnector =
          connectors.find((c) => c.name.toLowerCase().includes('walletconnect')) ||
          connectors[0];
      }

      if (targetConnector) {
        const result = await connectAsync({ connector: targetConnector });
        if (result?.accounts?.[0]) {
          onSelectWallet(result.accounts[0]);
        }
      }
    } catch (err) {
      console.warn('Wallet connection notification:', err);
      if (address) {
        onSelectWallet(address);
      }
    } finally {
      setConnectingName(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070D]/80 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md glass-panel p-6 rounded-3xl border border-cyan-500/40 shadow-2xl relative overflow-hidden"
      >
        {/* Glow ambient accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00F0FF]/20 rounded-full blur-2xl" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00F0FF]/15 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-wide">CONNECT WALLET</h3>
              <p className="text-[10px] text-slate-400">Select WalletConnect or your Web3 provider</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#0B1120] text-slate-400 hover:text-white hover:border-cyan-500/40 border border-transparent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet Options List */}
        <div className="space-y-3">
          {walletOptions.map((w) => (
            <button
              key={w.name}
              onClick={() => handleConnect(w.name)}
              disabled={connectingName !== null}
              className={`w-full p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex items-center justify-between group ${
                w.name === 'WalletConnect'
                  ? 'bg-gradient-to-r from-[#00F0FF]/15 to-[#0077FF]/20 border-[#00F0FF]/60 hover:border-[#00F0FF]'
                  : 'bg-[#05070D]/80 border-cyan-500/20 hover:border-[#00F0FF]/60 hover:bg-[#00F0FF]/10'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-2xl">{w.icon}</span>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#00F0FF] transition-colors flex items-center gap-2">
                    {w.name}
                    {w.name === 'WalletConnect' && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#00F0FF] text-[#05070D] uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal">{w.desc}</div>
                </div>
              </div>

              {connectingName === w.name ? (
                <div className="w-5 h-5 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all" />
              )}
            </button>
          ))}
        </div>

        {/* Security Note */}
        <div className="mt-5 pt-4 border-t border-cyan-500/15 text-center text-[10px] text-slate-400">
          By connecting a wallet, you agree to Cryvora's Terms of Service and Privacy Policy.
        </div>
      </motion.div>
    </div>
  );
};
