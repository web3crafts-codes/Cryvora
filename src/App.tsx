import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ClaimSection } from './components/ClaimSection';
import { ReferralSection } from './components/ReferralSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { EcosystemSection } from './components/EcosystemSection';
import { RoadmapSection } from './components/RoadmapSection';
import { Footer } from './components/Footer';
import { ClaimSuccessModal } from './components/ClaimSuccessModal';
import { NotificationBar } from './components/NotificationBar';
import { useAccount } from 'wagmi';

export function App() {
  const [claimSuccessModalOpen, setClaimSuccessModalOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const handleClaimSuccess = () => {
    setClaimSuccessModalOpen(true);
  };

  const scrollToClaim = () => {
    const el = document.getElementById('claim');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEcosystem = () => {
    const el = document.getElementById('ecosystem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-100 relative overflow-x-hidden selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Fixed Starry Galaxy Background Overlay Layer (z-0) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundColor: '#05070D',
          backgroundImage: "url('/assets/hero_bgimage.jpg')",
        }}
      />

      {/* Real-Time Notification Bar / Toasts */}
      <NotificationBar />

      {/* Floating Header Navbar (z-50) */}
      <Navbar />

      {/* Main Content Sections (z-10) */}
      <main className="relative z-10 space-y-4">
        {/* 1. Hero Section */}
        <HeroSection
          onClaimClick={scrollToClaim}
          onLearnMoreClick={scrollToEcosystem}
        />

        {/* 2. How To Claim Section */}
        <ClaimSection
          onClaimSuccess={handleClaimSuccess}
          isConnected={isConnected}
        />

        {/* 3. Refer & Earn Section */}
        <ReferralSection />

        {/* 4. Live Chain Claims Leaderboard */}
        <LeaderboardSection
          userAddress={address || ''}
          isConnected={isConnected}
        />

        {/* 5. Cryvora Ecosystem Section */}
        <EcosystemSection />

        {/* 6. Roadmap Section */}
        <RoadmapSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Claim Success Reward Modal */}
      <ClaimSuccessModal
        isOpen={claimSuccessModalOpen}
        onClose={() => setClaimSuccessModalOpen(false)}
        walletAddress={address || ''}
      />
    </div>
  );
}

export default App;
