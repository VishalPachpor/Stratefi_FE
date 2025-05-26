import HeroSection from "@/components/sections/hero-section";
import WalletConnectionDemo from "@/components/sections/wallet-connection-demo";
import ModeComparison from "@/components/sections/mode-comparison";
import AssetOptimization from "@/components/sections/asset-optimization";
import RealTimeIntelligence from "@/components/sections/real-time-intelligence";
import RiskManagement from "@/components/sections/risk-management";
import HowItWorks from "@/components/sections/how-it-works";
import Footer from "@/components/sections/footer";
import { MouseTrail } from "@/components/ui/mouse-trail";
import { ParticleSystem } from "@/components/ui/particle-system";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Global particle system background */}
      <ParticleSystem
        particleCount={60}
        mouseInteraction={true}
        colors={[
          "#3b82f6",
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ]}
        className="opacity-30"
      />
      <MouseTrail />
      <HeroSection />
      {/* <WalletConnectionDemo /> */}
      <ModeComparison />
      <AssetOptimization />
      <RealTimeIntelligence />
      {/* <RiskManagement /> */}
      <HowItWorks />
      <Footer />
    </main>
  );
}
