import React, { useState } from 'react';
import { Send, Bot, Check } from 'lucide-react';

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const socialLinks = [
    { name: 'X / Twitter', icon: XIcon, href: 'https://x.com/CryvoraCVR' },
    { name: 'Telegram Channel', icon: Send, href: 'https://t.me/CryvoraCVR' },
    { name: 'Telegram Airdrop Bot', icon: Bot, href: 'https://t.me/CryvoraAirdropBot' },
  ];

  return (
    <footer id="footer" className="relative pt-16 pb-12 px-4 sm:px-8 border-t border-cyan-500/15 z-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Logo & Tagline & Socials (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Cryvora Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
              />
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-wider text-white">
                  CRYVORA
                </span>
                <span className="text-[9px] font-semibold text-[#00F0FF] tracking-[0.2em] -mt-1 uppercase">
                  WEB3 ECOSYSTEM
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The future is decentralized.<br />
              The future is Cryvora. Empowering the next generation of Web3 crypto ecosystems.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.name}
                    className="w-9 h-9 rounded-xl bg-[#05070D] border border-cyan-500/20 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Useful Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-[#00F0FF] uppercase tracking-widest">
              USEFUL LINKS
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#claim" className="hover:text-[#00F0FF] transition-colors">
                  Airdrop
                </a>
              </li>
              <li>
                <a href="#referral" className="hover:text-[#00F0FF] transition-colors">
                  Refer & Earn
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="hover:text-[#00F0FF] transition-colors">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-[#00F0FF] transition-colors">
                  Ecosystem & Tokenomics
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-[#00F0FF] transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="https://t.me/CryvoraAirdropBot" target="_blank" rel="noreferrer" className="hover:text-[#00F0FF] transition-colors text-[#00F0FF] font-semibold">
                  Telegram Airdrop Bot (@CryvoraAirdropBot)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: About Cryvora (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-[#00F0FF] uppercase tracking-widest">
              ABOUT CRYVORA
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Cryvora is a next-generation Web3 ecosystem built to empower users through blockchain technology, decentralization, and real utilities. Join us and be part of the future.
            </p>
          </div>

          {/* Column 4: Stay Updated Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-[#00F0FF] uppercase tracking-widest">
              STAY UPDATED
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get the latest updates and announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-cyan-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl cyan-button font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-[#05070D]" />
                    <span>SUBSCRIBED!</span>
                  </>
                ) : (
                  <span>SUBSCRIBE</span>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center text-[11px] text-slate-500 font-medium">
          © 2026 Cryvora. All Rights Reserved. Designed for AAA Web3 Ecosystems.
        </div>
      </div>
    </footer>
  );
};
