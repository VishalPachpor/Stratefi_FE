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
              <div className="mb-4 flex items-center">
                <div className="mr-2 rounded-full bg-blue-500/20 p-1">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium">Your Assets</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {walletAssets.map((asset, index) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAsset === asset.id}
                    onSelect={handleAssetSelect}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-8"
            >
              {(() => {
                console.log("=== RENDERING DEBUG ===");
                console.log("selectedAsset:", selectedAsset);
                console.log("showChat:", showChat);
                console.log("selectedAction:", selectedAction);
                console.log("hasSelectedAssetData:", !!selectedAssetData);

                if (!selectedAsset) {
                  console.log("RENDER PATH: No asset selected");
                  return (
                    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 p-8 text-center">
                      <div className="mb-4 rounded-full bg-slate-800 p-4">
                        <Sparkles className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium">
                        Select an Asset to Optimize
                      </h3>
                      <p className="text-slate-400">
                        Choose an asset from your wallet to begin optimization
                      </p>
                    </div>
                  );
                }

                if (showChat) {
                  console.log("RENDER PATH: Chat interface");
                  return (
                    <ChatInterface
                      asset={selectedAssetData!}
                      onSelect={handleActionSelect}
                    />
                  );
                }

                if (selectedAction && isLoadingVaults) {
                  console.log("RENDER PATH: Loading vaults");
                  return (
                    <div className="rounded-xl border border-slate-800 bg-slate-900">
                      <div className="border-b border-slate-800 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                              {selectedAssetData?.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-medium">
                                {selectedAssetData?.name} Optimization
                              </h3>
                              <p className="text-sm text-slate-400">
                                AI is analyzing available vaults...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex flex-col items-center justify-center space-y-6">
                          {/* AI Thinking Animation */}
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="relative"
                          >
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                              <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">
                                  AI
                                </span>
                              </div>
                            </div>
                            {/* Thinking dots */}
                            <motion.div
                              animate={{
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-500"
                            />
                          </motion.div>

                          {/* Loading Text */}
                          <div className="text-center space-y-2">
                            <motion.h4
                              animate={{
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="text-lg font-medium text-white"
                            >
                              AI is thinking...
                            </motion.h4>
                            <p className="text-sm text-slate-400">
                              Analyzing{" "}
                              {selectedAction === "lend"
                                ? "lending"
                                : "borrowing"}{" "}
                              protocols for {selectedAssetData?.name}
                            </p>
                          </div>

                          {/* Loading Steps */}
                          <div className="w-full max-w-md space-y-3">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="flex items-center space-x-3 text-sm"
                            >
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-slate-300">
                                Scanning DeFi protocols
                              </span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                              className="flex items-center space-x-3 text-sm"
                            >
                              <div className="h-2 w-2 rounded-full bg-yellow-500" />
                              <span className="text-slate-300">
                                Calculating optimal yields
                              </span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1 }}
                              className="flex items-center space-x-3 text-sm"
                            >
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-slate-300">
                                Preparing vault recommendations
                              </span>
                            </motion.div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full max-w-md">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 2, ease: "easeInOut" }}
                              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (selectedAction) {
                  console.log(
                    "RENDER PATH: Protocol list for action:",
                    selectedAction
                  );

                  // Show optimization progress if optimizing
                  if (isOptimizing) {
                    return (
                      <div className="rounded-xl border border-slate-800 bg-slate-900">
                        <div className="border-b border-slate-800 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                                {selectedAssetData?.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-medium">
                                  {selectedAssetData?.name} Optimization
                                </h3>
                                <p className="text-sm text-slate-400">
                                  Finding the best yield strategies
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span>Optimization in progress...</span>
                              <span>{Math.round(optimizationProgress)}%</span>
                            </div>
                            <OptimizationProgress
                              progress={optimizationProgress}
                              protocolCount={
                                selectedAssetData?.protocols.filter(
                                  (p) => p.type === selectedAction
                                ).length || 0
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Show optimization results if optimized
                  if (isOptimized) {
                    const bestProtocol = selectedAssetData?.protocols
                      .filter((p) => p.type === selectedAction)
                      .reduce((best, current) =>
                        current.apy > best.apy ? current : best
                      );

                    return (
                      <div className="rounded-xl border border-slate-800 bg-slate-900">
                        <div className="border-b border-slate-800 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                                {selectedAssetData?.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-medium">
                                  {selectedAssetData?.name} Optimization
                                </h3>
                                <p className="text-sm text-slate-400">
                                  Optimization complete
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="rounded-full bg-green-500/20 p-2">
                                  <Sparkles className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                  <h4 className="font-medium">
                                    Optimization Complete
                                  </h4>
                                  <p className="text-sm text-slate-300">
                                    We've found the optimal strategy for your{" "}
                                    {selectedAssetData?.name}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-slate-400">
                                  Potential APY
                                </p>
                                <p className="text-2xl font-bold text-green-500">
                                  {bestProtocol
                                    ? (bestProtocol.apy * 1.1).toFixed(1)
                                    : "0.0"}
                                  %
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          <div className="mb-6">
                            <h4 className="mb-3 font-medium">
                              Recommended Strategy
                            </h4>
                            <div className="rounded-lg border border-slate-800 bg-slate-800/50 p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-2">
                                    <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                                      {bestProtocol?.name.charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">
                                      {bestProtocol?.name}
                                    </h5>
                                    <p className="text-sm text-slate-400">
                                      Recommended for{" "}
                                      {selectedAction === "lend"
                                        ? "lending"
                                        : "borrowing"}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-slate-400">APY</p>
                                  <p className="text-xl font-bold text-green-400">
                                    {bestProtocol?.apy}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <RiskAssessment
                            protocols={
                              selectedAssetData?.protocols.filter(
                                (p) => p.type === selectedAction
                              ) || []
                            }
                          />

                          <div className="mt-6">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              Apply Optimized Strategy
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Show protocol list (default state)
                  return (
                    <div className="rounded-xl border border-slate-800 bg-slate-900">
                      <div className="border-b border-slate-800 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                              {selectedAssetData?.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-medium">
                                {selectedAssetData?.name} Optimization
                              </h3>
                              <p className="text-sm text-slate-400">
                                Finding the best yield strategies
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={handleOptimize}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Optimize Now
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        {/* Research Note Section */}
                        {selectedAssetData &&
                          selectedAction &&
                          (() => {
                            const protocols =
                              selectedAssetData.protocols.filter(
                                (p) => p.type === selectedAction
                              );
                            if (protocols.length === 0) {
                              return (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5 }}
                                  className="mb-6 rounded-lg border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6"
                                >
                                  <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 p-1">
                                        <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                          <span className="text-sm font-bold text-white">
                                            !
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-3">
                                        <h4 className="text-lg font-medium text-white">
                                          No Protocols Available
                                        </h4>
                                        <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">
                                          {selectedAction === "lend"
                                            ? "Lending"
                                            : "Borrowing"}{" "}
                                          Unavailable
                                        </span>
                                      </div>
                                      <p className="text-slate-300 leading-relaxed">
                                        No {selectedAction} protocols are
                                        currently available for{" "}
                                        {selectedAssetData.name}. This could be
                                        due to market conditions, protocol
                                        updates, or temporary unavailability.
                                      </p>
                                      <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                                        <h5 className="text-sm font-medium text-white mb-2">
                                          Suggestions:
                                        </h5>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                          <li className="flex items-start space-x-2">
                                            <span className="text-yellow-400 mt-1">
                                              •
                                            </span>
                                            <span>
                                              Try selecting a different asset
                                            </span>
                                          </li>
                                          <li className="flex items-start space-x-2">
                                            <span className="text-yellow-400 mt-1">
                                              •
                                            </span>
                                            <span>
                                              Check back later for new protocols
                                            </span>
                                          </li>
                                          <li className="flex items-start space-x-2">
                                            <span className="text-yellow-400 mt-1">
                                              •
                                            </span>
                                            <span>
                                              Consider the opposite action (lend
                                              instead of borrow)
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            }

                            const research = generateResearchNote(
                              selectedAssetData,
                              selectedAction
                            );
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6"
                              >
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                                      <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                        <span className="text-sm font-bold text-white">
                                          AI
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-3">
                                      <h4 className="text-lg font-medium text-white">
                                        AI Research Analysis
                                      </h4>
                                      <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                                        {selectedAction === "lend"
                                          ? "Lending"
                                          : "Borrowing"}{" "}
                                        Analysis
                                      </span>
                                    </div>

                                    <div className="space-y-4">
                                      <p className="text-slate-300 leading-relaxed">
                                        {research.recommendation}
                                      </p>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">
                                              Best Protocol:
                                            </span>
                                            <span className="text-sm font-medium text-white">
                                              {research.bestProtocol}
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">
                                              Best APY:
                                            </span>
                                            <span className="text-sm font-medium text-green-400">
                                              {research.bestApy}%
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">
                                              Average APY:
                                            </span>
                                            <span className="text-sm font-medium text-slate-300">
                                              {research.avgApy}%
                                            </span>
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">
                                              Protocols Analyzed:
                                            </span>
                                            <span className="text-sm font-medium text-white">
                                              {research.protocolCount}
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">
                                              Risk Level:
                                            </span>
                                            <span
                                              className={`text-sm font-medium ${
                                                research.riskLevel === "low"
                                                  ? "text-green-400"
                                                  : research.riskLevel ===
                                                    "medium"
                                                  ? "text-yellow-400"
                                                  : research.riskLevel ===
                                                    "high"
                                                  ? "text-red-400"
                                                  : "text-slate-400"
                                              }`}
                                            >
                                              {research.riskLevel}
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-400">
                                              Asset:
                                            </span>
                                            <span className="text-sm font-medium text-white">
                                              {research.asset}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="border-t border-slate-700 pt-4">
                                        <h5 className="text-sm font-medium text-white mb-2">
                                          Key Factors:
                                        </h5>
                                        <ul className="space-y-1">
                                          {research.keyFactors.map(
                                            (factor, index) => (
                                              <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                  delay: index * 0.1,
                                                }}
                                                className="flex items-start space-x-2 text-sm text-slate-300"
                                              >
                                                <span className="text-blue-400 mt-1">
                                                  •
                                                </span>
                                                <span>{factor}</span>
                                              </motion.li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })()}

                        <h4 className="mb-3 font-medium">
                          Available Protocols for {selectedAssetData?.name}
                        </h4>
                        {(() => {
                          const protocols =
                            selectedAssetData?.protocols.filter(
                              (p) => p.type === selectedAction
                            ) || [];
                          if (protocols.length === 0) {
                            return (
                              <div className="text-center py-8">
                                <div className="mb-4 rounded-full bg-slate-800 p-4 w-16 h-16 mx-auto flex items-center justify-center">
                                  <span className="text-2xl">📋</span>
                                </div>
                                <h5 className="text-lg font-medium text-white mb-2">
                                  No Protocols Found
                                </h5>
                                <p className="text-slate-400">
                                  No {selectedAction} protocols are currently
                                  available for {selectedAssetData?.name}.
                                </p>
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-3">
                              {protocols.map((protocol, index) => (
                                <motion.div
                                  key={protocol.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.1 + index * 0.1,
                                  }}
                                  className="rounded-lg border border-slate-800 bg-slate-800/50 p-4"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-2">
                                        <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                                          {protocol.name.charAt(0)}
                                        </div>
                                      </div>
                                      <div>
                                        <h5 className="font-medium">
                                          {protocol.name}
                                        </h5>
                                        <p className="text-sm text-slate-400">
                                          Protocol for {selectedAssetData?.name}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-slate-400">
                                        Current APY
                                      </p>
                                      <p className="text-xl font-bold text-green-400">
                                        {protocol.apy}%
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {protocol.features.map((feature, idx) => (
                                      <span
                                        key={idx}
                                        className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm">
                                        Risk Level:
                                      </span>
                                      <span
                                        className={`text-sm ${
                                          protocol.risk === "low"
                                            ? "text-green-400"
                                            : protocol.risk === "medium"
                                            ? "text-yellow-400"
                                            : "text-red-400"
                                        }`}
                                      >
                                        {protocol.risk}
                                      </span>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-slate-700 hover:bg-slate-800"
                                      onClick={() =>
                                        handlePoolSelect(protocol.pools[0].id)
                                      }
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          );
                        })()}

                        <div className="mt-6 flex justify-center">
                          <Button
                            onClick={handleOptimize}
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Find Optimal Strategy{" "}
                            <Sparkles className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }

                console.log("RENDER PATH: Fallback state");
                return (
                  <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 p-8 text-center">
                    <div className="mb-4 rounded-full bg-slate-800 p-4">
                      <Sparkles className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-medium">
                      Please select an action
                    </h3>
                    <p className="text-slate-400">
                      Choose whether you want to borrow or lend
                    </p>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
