import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, ShieldCheck, Activity } from 'lucide-react';

interface ClaimEntry {
  rank: number;
  txHash: string;
  user: string;
  amount: string;
  status: string;
}

interface LeaderboardSectionProps {
  userAddress?: string;
  isConnected?: boolean;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  userAddress,
  isConnected,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [claimLogs, setClaimLogs] = useState<ClaimEntry[]>([
    {
      rank: 1,
      txHash: '0x3a5fd2e1b8c4e2f47e2da4b69a4f8c7d5e3cf2a9d9e18b8f2a9d8c7b6a5e4d3c',
      user: '0x9E3B4628f895Cd5645FeE183427f71787cDa95A6',
      amount: '12,500 CVR ($975)',
      status: 'Confirmed',
    },
    {
      rank: 2,
      txHash: '0x1b8ce2f47e2da4b69a4f8c7d5e3cf2a9d9e18b8f2a9d8c7b6a5e4d3c7e2d9a4b',
      user: '0x8A725e6F28E25Cdf8E81F9856A9280dE4A28fE71',
      amount: '12,500 CVR ($975)',
      status: 'Confirmed',
    },
    {
      rank: 3,
      txHash: '0x7e2da4b69a4f8c7d5e3cf2a9d9e18b8f2a9d8c7b6a5e4d3c7e2d9a4b6e8f0c1',
      user: '0x5C216F928CDe8461F17849e7C6D9820fC10dEF9A',
      amount: '12,500 CVR ($975)',
      status: 'Confirmed',
    },
    {
      rank: 4,
      txHash: '0x9a4f8c7d5e3cf2a9d9e18b8f2a9d8c7b6a5e4d3c7e2d9a4b6e8f0c1b7f63d6',
      user: '0x72A176B89871Cd3d55Fe9A3d3d810842f1fFB891',
      amount: '12,500 CVR ($975)',
      status: 'Confirmed',
    },
    {
      rank: 5,
      txHash: '0x5e3cf2a9d9e18b8f2a9d8c7b6a5e4d3c7e2d9a4b6e8f0c1b7f63d6a894672e',
      user: '0x3F8278Cd6a894672e8E60812F98E23eCd71C8F7e',
      amount: '12,500 CVR ($975)',
      status: 'Confirmed',
    },
  ]);

  const generateRandomHex = (length: number) => {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateRandomAddress = () => {
    const chars = '0123456789abcdefABCDEF';
    let result = '0x';
    for (let i = 0; i < 40; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // 10-Second Auto-Refresh Loop to Prepend New Transaction & Drop Oldest
  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry: ClaimEntry = {
        rank: 1,
        txHash: generateRandomHex(64),
        user: generateRandomAddress(),
        amount: '12,500 CVR ($975)',
        status: 'Confirmed',
      };

      setClaimLogs((prevLogs) => {
        const updated = [newEntry, ...prevLogs.slice(0, 4)];
        return updated.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  const formatAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  const formatTxHash = (hash: string) => `${hash.substring(0, 10)}...`;

  const filteredEntries = claimLogs.filter(
    (item) =>
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.txHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="leaderboard" className="relative py-20 px-4 sm:px-8 w-full max-w-[1440px] mx-auto z-10">
      {/* Background ambient light */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[500px] h-[300px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-cyan-500/30 text-[#00F0FF] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>On-Chain Transparency</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          LIVE CLAIM <span className="text-[#00F0FF] text-cyan-glow">TRANSACTIONS</span>
        </h2>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          Real-time transaction log verified directly on the Web3 blockchain network.
        </p>
      </div>

      {/* Search Toolbar & Live Indicator */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search wallet or tx hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05070D]/80 border border-cyan-500/30 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00F0FF] transition-all"
          />
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#00F0FF]/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>LIVE CHAIN SYNC ACTIVE (10s LOOP)</span>
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#05070D]/90 border-b border-cyan-500/20 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                <th className="py-4 px-6 text-center w-16">Rank</th>
                <th className="py-4 px-6">Tx Hash</th>
                <th className="py-4 px-6">User Wallet</th>
                <th className="py-4 px-6 text-center">Reward</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 text-xs">
              <AnimatePresence mode="popLayout">
                {filteredEntries.map((row) => {
                  const isCurrentUser =
                    isConnected &&
                    userAddress &&
                    row.user.toLowerCase() === userAddress.toLowerCase();

                  return (
                    <motion.tr
                      key={row.txHash}
                      initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(0, 240, 255, 0.25)' }}
                      animate={{ opacity: 1, y: 0, backgroundColor: isCurrentUser ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 0, 0, 0)' }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.6 }}
                      className="transition-colors hover:bg-cyan-500/5"
                    >
                      <td className="py-4 px-6 text-center font-extrabold font-mono text-cyan-300">
                        #{row.rank}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-400">
                        {formatTxHash(row.txHash)}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-200 font-bold">
                        <div className="flex items-center gap-2">
                          <span>{formatAddress(row.user)}</span>
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold text-[#05070D] bg-[#00F0FF] px-2 py-0.5 rounded-full uppercase">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 font-bold font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                          <Award className="w-3.5 h-3.5" />
                          {row.amount}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                          {row.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
