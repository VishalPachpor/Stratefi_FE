import HeroSection from "@/components/sections/hero-section"
import WalletConnectionDemo from "@/components/sections/wallet-connection-demo"
import ModeComparison from "@/components/sections/mode-comparison"
import AssetOptimization from "@/components/sections/asset-optimization"
import RealTimeIntelligence from "@/components/sections/real-time-intelligence"
import ProtocolIntegration from "@/components/sections/protocol-integration"
import RiskManagement from "@/components/sections/risk-management"
import SuccessStories from "@/components/sections/success-stories"
import HowItWorks from "@/components/sections/how-it-works"
import SecurityTrust from "@/components/sections/security-trust"
import PricingPlans from "@/components/sections/pricing-plans"
import Footer from "@/components/sections/footer"
import { MouseTrail } from "@/components/ui/mouse-trail"

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      <MouseTrail />
      <HeroSection />
      <WalletConnectionDemo />
      <ModeComparison />
      <AssetOptimization />
      <RealTimeIntelligence />
      <ProtocolIntegration />
      <RiskManagement />
      <SuccessStories />
      <HowItWorks />
      <SecurityTrust />
      <PricingPlans />
      <Footer />
    </main>
  )
}
