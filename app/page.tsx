import {
  HeroSection,
  ModeComparison,
  RealTimeIntelligence,
  HowItWorks,
  Footer,
} from "@/components/layout/sections";
import AssetOptimization from "@/components/features/asset-optimization";
import { ParticleSystem } from "@/components/ui/particle-system";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "StratiFi AI Agent - DeFAI | Home",
    description:
      "Welcome to StratiFi AI Agent - DeFAI. Advanced DeFi yield optimization powered by AI. Maximize your returns with intelligent strategy selection and real-time market analysis.",
  };
};

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Global particle system background */}
      <ParticleSystem
        particleCount={60}
        mouseInteraction={false}
        colors={[
          "#3b82f6",
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ]}
        className="opacity-30 mt-20"
      />

      {/* Consistent container wrapper for all sections */}
      <div className="mx-auto max-w-6xl">
        <HeroSection />
        <ModeComparison />
        <AssetOptimization />
        <RealTimeIntelligence />
        <HowItWorks />
        <Footer />
      </div>
    </main>
  );
}
