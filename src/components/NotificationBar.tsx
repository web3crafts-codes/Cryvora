import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, CheckCircle2, AlertCircle, Loader2, X, Sparkles, ExternalLink } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useGateway } from '../hooks/useGateway';

interface NotificationItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'pending';
  title: string;
  message: string;
  txHash?: string;
  timestamp: number;
}

export const NotificationBar: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { isPending, isConfirming, isSuccess, writeError, txHash } = useGateway();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const prevConnectedRef = useRef<boolean>(false);
  const prevIsPendingRef = useRef<boolean>(false);
  const prevIsConfirmingRef = useRef<boolean>(false);
  const prevIsSuccessRef = useRef<boolean>(false);
  const prevErrorRef = useRef<any>(null);

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotif: NotificationItem = {
      ...notif,
      id,
      timestamp: Date.now(),
    };

    setNotifications((prev) => [newNotif, ...prev.slice(0, 2)]);

    if (notif.type !== 'pending') {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Monitor Wallet Connection State
  useEffect(() => {
    if (isConnected && address && !prevConnectedRef.current) {
      addNotification({
        type: 'success',
        title: 'Wallet Connected',
        message: `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } else if (!isConnected && prevConnectedRef.current) {
      addNotification({
        type: 'warning',
        title: 'Wallet Disconnected',
        message: 'Your wallet has been disconnected.',
      });
    }
    prevConnectedRef.current = !!isConnected;
  }, [isConnected, address]);

  // Monitor Wallet Transaction Signature Request
  useEffect(() => {
    if (isPending && !prevIsPendingRef.current) {
      addNotification({
        type: 'pending',
        title: 'Wallet Approval Required',
        message: 'Please confirm the claim transaction in your wallet...',
      });
    }
    prevIsPendingRef.current = !!isPending;
  }, [isPending]);

  // Monitor Mining Confirmation
  useEffect(() => {
    if (isConfirming && !prevIsConfirmingRef.current) {
      addNotification({
        type: 'pending',
        title: 'Mining Transaction',
        message: 'Claim transaction submitted! Waiting for block confirmation on BSC...',
        txHash: txHash || undefined,
      });
    }
    prevIsConfirmingRef.current = !!isConfirming;
  }, [isConfirming, txHash]);

  // Monitor Success State
  useEffect(() => {
    if (isSuccess && !prevIsSuccessRef.current) {
      addNotification({
        type: 'success',
        title: 'Claim Successful!',
        message: '12,500 CVR ($975) tokens successfully transferred to your wallet.',
        txHash: txHash || undefined,
      });
    }
    prevIsSuccessRef.current = !!isSuccess;
  }, [isSuccess, txHash]);

  // Monitor Error State
  useEffect(() => {
    if (writeError && writeError !== prevErrorRef.current) {
      addNotification({
        type: 'warning',
        title: 'Transaction Cancelled',
        message: writeError.message ? writeError.message.slice(0, 80) : 'User rejected transaction or gas estimation failed.',
      });
    }
    prevErrorRef.current = writeError;
  }, [writeError]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 left-4 sm:left-auto z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto glass-panel p-4 rounded-2xl border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] relative overflow-hidden backdrop-blur-xl flex items-start gap-3 bg-[#05070D]/90"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 via-transparent to-transparent pointer-events-none" />

            <div className="shrink-0 mt-0.5">
              {n.type === 'pending' ? (
                <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/15 border border-cyan-500/40 flex items-center justify-center text-[#00F0FF]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : n.type === 'success' ? (
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : n.type === 'warning' ? (
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/15 border border-cyan-500/40 flex items-center justify-center text-[#00F0FF]">
                  <Wallet className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3 h-3 text-[#00F0FF]" />
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  {n.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal break-words">
                {n.message}
              </p>
              {n.txHash && (
                <a
                  href={`https://bscscan.com/tx/${n.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-[11px] font-mono text-[#00F0FF] hover:underline"
                >
                  <span>View on BSCScan</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              onClick={() => dismissNotification(n.id)}
              className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-cyan-500/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
