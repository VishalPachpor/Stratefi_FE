"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
// import { usePrivy } from "@privy-io/react-auth";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetCard, Asset, Protocol } from "./asset-card";
import { ProtocolCard } from "./protocol-card";
import { OptimizationProgress } from "./optimization-progress";
import { RiskAssessment } from "./risk-assessment";
import { ChatInterface } from "./chat-interface";
import { PoolList } from "./pool-list";
import { AssetList } from "./AssetList";
import { OptimizationPanel } from "./OptimizationPanel";

// Mock data for demonstration
const mockAssets: Asset[] = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    balance: "1.5",
    protocols: [
      {
        id: "aave",
        name: "Aave",
        type: "lend",
        apy: 3.8,
        risk: "low",
        features: ["Lending", "Borrowing"],
        pools: [
          {
            id: "aave-eth",
            name: "ETH Lending Pool",
            apy: 3.8,
            tvl: "1.2B",
            risk: "low",
          },
        ],
      },
      {
        id: "compound",
        name: "Compound",
        type: "borrow",
        apy: 2.5,
        risk: "medium",
        features: ["Borrowing", "Lending"],
        pools: [
          {
            id: "compound-eth",
            name: "ETH Borrowing Pool",
            apy: 2.5,
            tvl: "800M",
            risk: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    balance: "0.5",
    protocols: [
      {
        id: "hodlnaut",
        name: "Hodlnaut",
        type: "lend",
        apy: 5.2,
        risk: "medium",
        features: ["Lending", "Weekly payouts", "No lockup period"],
        pools: [
          {
            id: "hodlnaut-btc",
            name: "BTC Lending Pool",
            apy: 5.2,
            tvl: "500M",
            risk: "medium",
          },
        ],
      },
      {
        id: "celsius",
        name: "Celsius",
        type: "borrow",
        apy: 6.5,
        risk: "high",
        features: ["High yield", "Borrowing", "Loyalty tiers"],
        pools: [
          {
            id: "celsius-btc",
            name: "BTC Borrowing Pool",
            apy: 6.5,
            tvl: "300M",
            risk: "high",
          },
        ],
      },
    ],
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: "$",
    balance: "5000",
    protocols: [
      {
        id: "aave-usdc",
        name: "Aave",
        type: "lend",
        apy: 4.2,
        risk: "low",
        features: ["Lending", "Borrowing"],
        pools: [
          {
            id: "aave-usdc-pool",
            name: "USDC Lending Pool",
            apy: 4.2,
            tvl: "2.5B",
            risk: "low",
          },
        ],
      },
      {
        id: "compound-usdc",
        name: "Compound",
        type: "borrow",
        apy: 3.8,
        risk: "low",
        features: ["Borrowing", "Lending", "Governance"],
        pools: [
          {
            id: "compound-usdc-borrow",
            name: "USDC Borrowing Pool",
            apy: 3.8,
            tvl: "1.8B",
            risk: "low",
          },
        ],
      },
      {
        id: "morpho-usdc",
        name: "Morpho",
        type: "borrow",
        apy: 3.2,
        risk: "medium",
        features: ["Optimized borrowing", "Lower rates", "MEV protection"],
        pools: [
          {
            id: "morpho-usdc-borrow",
            name: "USDC Optimized Borrowing",
            apy: 3.2,
            tvl: "500M",
            risk: "medium",
          },
        ],
      },
      {
        id: "spark-usdc",
        name: "Spark",
        type: "borrow",
        apy: 2.9,
        risk: "low",
        features: ["DAI borrowing", "Stable rates", "MakerDAO backed"],
        pools: [
          {
            id: "spark-usdc-borrow",
            name: "USDC to DAI Borrowing",
            apy: 2.9,
            tvl: "800M",
            risk: "low",
          },
        ],
      },
    ],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    balance: "10",
    protocols: [
      {
        id: "solend",
        name: "Solend",
        type: "lend",
        apy: 7.2,
        risk: "medium",
        features: ["Lending", "High APY"],
        pools: [
          {
            id: "solend-sol",
            name: "SOL Lending Pool",
            apy: 7.2,
            tvl: "200M",
            risk: "medium",
          },
        ],
      },
      {
        id: "solend-borrow",
        name: "Solend",
        type: "borrow",
        apy: 5.8,
        risk: "medium",
        features: ["Borrowing", "SOL collateral", "Fast liquidations"],
        pools: [
          {
            id: "solend-sol-borrow",
            name: "SOL Borrowing Pool",
            apy: 5.8,
            tvl: "150M",
            risk: "medium",
          },
        ],
      },
      {
        id: "mango-sol",
        name: "Mango Markets",
        type: "borrow",
        apy: 6.2,
        risk: "high",
        features: ["Cross-margin", "Leverage", "Futures"],
        pools: [
          {
            id: "mango-sol-borrow",
            name: "SOL Cross-Margin Borrowing",
            apy: 6.2,
            tvl: "100M",
            risk: "high",
          },
        ],
      },
      {
        id: "francium-sol",
        name: "Francium",
        type: "borrow",
        apy: 4.9,
        risk: "medium",
        features: ["Leverage farming", "Yield optimization", "SOL ecosystem"],
        pools: [
          {
            id: "francium-sol-borrow",
            name: "SOL Leverage Borrowing",
            apy: 4.9,
            tvl: "80M",
            risk: "medium",
          },
        ],
      },
      {
        id: "tulip-sol",
        name: "Tulip",
        type: "borrow",
        apy: 5.5,
        risk: "medium",
        features: ["Yield farming", "SOL rewards", "Auto-compound"],
        pools: [
          {
            id: "tulip-sol-borrow",
            name: "SOL Yield Borrowing",
            apy: 5.5,
            tvl: "60M",
            risk: "medium",
          },
        ],
      },
    ],
  },
];

export default function AssetOptimization() {
  // const { user, ready, login } = usePrivy();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "borrow" | "lend" | null
  >(null);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);
  const [walletAssets, setWalletAssets] = useState<Asset[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isLoadingVaults, setIsLoadingVaults] = useState(false);

  // Fetch wallet assets when connected
  useEffect(() => {
    // For demo purposes, always show mock data
    // In a real implementation, you would fetch the user's wallet assets here
    setWalletAssets(mockAssets);
  }, []);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      // await login();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAssetSelect = (assetId: string) => {
    console.log("Asset selected:", assetId);
    console.log(
      "Before reset - selectedAction:",
      selectedAction,
      "showChat:",
      showChat
    );
    setSelectedAsset(assetId);
    setSelectedAction(null);
    setSelectedPool(null);
    setIsOptimized(false);
    setOptimizationProgress(0);
    setIsLoadingVaults(false);
    setShowChat(true);
    console.log(
      "After setting - showChat should be true, selectedAction should be null"
    );
  };

  const handleActionSelect = (action: "borrow" | "lend") => {
    console.log("Action selected:", action);
    setSelectedAction(action);
    setShowChat(false);
    setIsLoadingVaults(true);

    // Simulate AI thinking and loading vaults
    setTimeout(() => {
      setIsLoadingVaults(false);
    }, 2000); // 2 seconds loading animation

    console.log("showChat set to false, selectedAction:", action);
  };

  const handlePoolSelect = (poolId: string) => {
    console.log("Pool selected:", poolId);
    setSelectedPool(poolId);
  };

  const handleOptimize = () => {
    if (!selectedAsset || !selectedAction || !selectedPool) return;

    setIsOptimizing(true);
    setOptimizationProgress(0);

    // Simulate optimization process
    const interval = setInterval(() => {
      setOptimizationProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsOptimizing(false);
            setIsOptimized(true);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  const selectedAssetData = walletAssets.find((a) => a.id === selectedAsset);
  const selectedProtocol = selectedAssetData?.protocols.find(
    (p) => p.type === selectedAction
  );

  // Function to generate research notes for protocols
  const generateResearchNote = (asset: Asset, action: "borrow" | "lend") => {
    const protocols = asset.protocols.filter((p) => p.type === action);

    // Handle case when no protocols are found
    if (protocols.length === 0) {
      return {
        asset: asset.name,
        action: action,
        bestProtocol: "No protocols available",
        bestApy: 0,
        avgApy: "0.0",
        protocolCount: 0,
        riskLevel: "unknown",
        recommendation: `No ${action} protocols are currently available for ${asset.name}.`,
        keyFactors: [
          `No ${action} protocols found for ${asset.name}`,
          "Consider checking back later for new protocols",
          "You may want to try a different asset or action",
        ],
      };
    }

    const bestProtocol = protocols.reduce((best, current) =>
      current.apy > best.apy ? current : best
    );
    const avgApy =
      protocols.reduce((sum, p) => sum + p.apy, 0) / protocols.length;

    const researchNotes = {
      asset: asset.name,
      action: action,
      bestProtocol: bestProtocol.name,
      bestApy: bestProtocol.apy,
      avgApy: avgApy.toFixed(1),
      protocolCount: protocols.length,
      riskLevel: bestProtocol.risk,
      recommendation: "",
      keyFactors: [] as string[],
    };

    if (action === "lend") {
      researchNotes.recommendation = `Based on our analysis of ${protocols.length} lending protocols, ${bestProtocol.name} offers the highest yield at ${bestProtocol.apy}% APY for your ${asset.name}.`;
      researchNotes.keyFactors = [
        `${bestProtocol.name} has the highest APY among all ${asset.name} lending options`,
        `Average lending APY across all protocols is ${avgApy}%`,
        `${bestProtocol.name} maintains a ${bestProtocol.risk} risk profile`,
        `Protocol has strong liquidity with ${bestProtocol.pools[0].tvl} TVL`,
      ];
    } else {
      researchNotes.recommendation = `Our analysis of ${protocols.length} borrowing protocols shows ${bestProtocol.name} provides the most favorable terms for borrowing against your ${asset.name}.`;
      researchNotes.keyFactors = [
        `${bestProtocol.name} offers the lowest borrowing costs`,
        `Average borrowing rate across protocols is ${avgApy}%`,
        `Collateral efficiency is optimized for ${asset.name}`,
        `Protocol maintains ${bestProtocol.risk} risk level with good liquidity`,
      ];
    }

    return researchNotes;
  };

  // Temporarily disable Privy checks for debugging
  // if (!ready) {
  //   return (
  //     <div className="flex h-[50vh] items-center justify-center">
  //       <p className="text-slate-400">Loading...</p>
  //     </div>
  //   );
  // }

  // For demo purposes, allow interaction without wallet connection
  // if (!user) {
  //   return (
  //     <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
  //       <p className="text-slate-400">Please connect your wallet to continue</p>
  //       <Button
  //         onClick={handleConnectWallet}
  //         disabled={isConnecting}
  //         className="bg-blue-600 hover:bg-blue-700"
  //       >
  //         {isConnecting ? "Connecting..." : "Connect Wallet"}
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <section ref={ref} className="py-20 lg:py-32">
      <div className="px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Asset Optimization Engine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto text-lg text-slate-300"
          >
            Optimize your assets across multiple protocols
          </motion.p>
        </div>

        <div className="mx-auto">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Asset Grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <AssetList
                walletAssets={walletAssets}
                selectedAsset={selectedAsset}
                handleAssetSelect={handleAssetSelect}
                isInView={isInView}
              />
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-8"
            >
              <OptimizationPanel
                selectedAsset={selectedAsset}
                selectedAssetData={selectedAssetData}
                selectedAction={selectedAction}
                isLoadingVaults={isLoadingVaults}
                showChat={showChat}
                isOptimizing={isOptimizing}
                isOptimized={isOptimized}
                optimizationProgress={optimizationProgress}
                handleActionSelect={handleActionSelect}
                handlePoolSelect={handlePoolSelect}
                handleOptimize={handleOptimize}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
