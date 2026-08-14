import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Check } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Airdrop', href: '#claim' },
    { name: 'Referral', href: '#referral' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Roadmap', href: '#roadmap' },
  ];

  const languages = ['EN', 'JP', 'KR', 'ZH', 'DE', 'ES'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-8 pt-3 sm:pt-4 pb-2">
      <div className="max-w-[1440px] mx-auto">
        <nav
          className={`flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'glass-panel shadow-2xl shadow-[#00F0FF]/10 border-cyan-500/30'
              : 'bg-[#0B1120]/60 backdrop-blur-md border border-cyan-500/15'
          }`}
        >
          {/* Logo Left */}
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="Cryvora Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base sm:text-xl tracking-wider text-white group-hover:text-[#00F0FF] transition-colors">
                CRYVORA
              </span>
              <span className="hidden sm:block text-[9px] font-semibold text-[#00F0FF]/80 tracking-[0.2em] -mt-1 uppercase">
                Web3 Ecosystem
              </span>
            </div>
          </a>

          {/* Navigation Center (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-[#05070D]/60 p-1.5 rounded-full border border-cyan-500/10">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00F0FF] text-[#05070D] font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                      : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Connect Wallet Right & Language Selector (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="w-9 h-9 rounded-full bg-[#0B1120]/80 border border-cyan-500/20 flex items-center justify-center text-slate-300 hover:text-[#00F0FF] transition-all"
                title="Select Language"
              >
                <Globe className="w-4 h-4" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 rounded-xl glass-panel p-2 shadow-xl border border-cyan-500/30 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-[#00F0FF]/15 hover:text-[#00F0FF] transition-colors"
                    >
                      <span>{lang}</span>
                      {selectedLang === lang && <Check className="w-3.5 h-3.5 text-[#00F0FF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RainbowKit Connect Button */}
            <ConnectButton showBalance={false} />
          </div>

          {/* Mobile Hamburger & Compact Connect Button */}
          <div className="sm:hidden flex items-center gap-1.5 min-w-0">
            <div className="scale-90 origin-right">
              <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl bg-[#0B1120] border border-cyan-500/20 text-slate-300 hover:text-[#00F0FF] shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-2xl glass-panel border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <span className="text-xs text-slate-400 font-semibold">CONNECT WALLET:</span>
              <ConnectButton showBalance={false} />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.name);
                  setMobileMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm font-semibold rounded-xl text-slate-200 hover:bg-[#00F0FF]/15 hover:text-[#00F0FF] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
