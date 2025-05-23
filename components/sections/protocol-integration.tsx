"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Protocol {
  id: string;
  name: string;
  logo: string;
  category: string;
  apy: number;
  tvl: number;
  features: string[];
  status: "active" | "maintenance" | "inactive";
}

export default function ProtocolIntegration() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const protocols: Protocol[] = [
    {
      id: "aave",
      name: "Aave",
      logo: "A",
      category: "lending",
      apy: 3.2,
      tvl: 5.7,
      features: ["Lending", "Borrowing", "Flash Loans"],
      status: "active",
    },
    {
      id: "compound",
      name: "Compound",
      logo: "C",
      category: "lending",
      apy: 2.8,
      tvl: 3.2,
      features: ["Lending", "Borrowing", "Governance"],
      status: "active",
    },
    {
      id: "curve",
      name: "Curve",
      logo: "C",
      category: "dex",
      apy: 4.5,
      tvl: 8.1,
      features: ["Stablecoin Swaps", "Liquidity Pools", "Low Slippage"],
      status: "active",
    },
    {
      id: "uniswap",
      name: "Uniswap",
      logo: "U",
      category: "dex",
      apy: 5.2,
      tvl: 7.3,
      features: ["Token Swaps", "Liquidity Provision", "Fee Generation"],
      status: "active",
    },
    {
      id: "lido",
      name: "Lido",
      logo: "L",
      category: "staking",
      apy: 3.8,
      tvl: 12.5,
      features: ["Liquid Staking", "ETH 2.0", "No Lockup"],
      status: "active",
    },
    {
      id: "yearn",
      name: "Yearn Finance",
      logo: "Y",
      category: "yield",
      apy: 8.7,
      tvl: 2.1,
      features: ["Yield Optimization", "Vaults", "Auto-compounding"],
      status: "maintenance",
    },
    {
      id: "maker",
      name: "MakerDAO",
      logo: "M",
      category: "lending",
      apy: 1.9,
      tvl: 9.8,
      features: ["DAI Generation", "Collateralized Debt", "Stability Fees"],
      status: "active",
    },
    {
      id: "convex",
      name: "Convex Finance",
      logo: "C",
      category: "yield",
      apy: 10.2,
      tvl: 4.3,
      features: ["Curve Boosting", "Staking", "Rewards Amplification"],
      status: "active",
    },
  ];

  const categories = [
    { id: "all", name: "All Protocols" },
    { id: "lending", name: "Lending" },
    { id: "dex", name: "DEX" },
    { id: "staking", name: "Staking" },
    { id: "yield", name: "Yield" },
  ];

  const filteredProtocols =
    activeCategory === "all"
      ? protocols
      : protocols.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-purple-500/30 text-purple-400"
          >
            Protocol Integrations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connected to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              42+ Protocols
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Access the best yields across multiple DeFi protocols with seamless
            integrations and automated optimization strategies.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={cn(
                "border-slate-700",
                activeCategory === category.id
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "hover:bg-slate-800 hover:text-white"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProtocols.map((protocol, index) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {protocol.logo}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-purple-400 transition-colors">
                          {protocol.name}
                        </CardTitle>
                        <CardDescription className="capitalize text-slate-500">
                          {protocol.category}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        protocol.status === "active"
                          ? "border-green-500/30 text-green-400"
                          : protocol.status === "maintenance"
                          ? "border-yellow-500/30 text-yellow-400"
                          : "border-red-500/30 text-red-400"
                      )}
                    >
                      {protocol.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* APY and TVL */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-800 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-400 mb-1">Current APY</p>
                      <p className="text-lg font-bold text-green-400">
                        {protocol.apy}%
                      </p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-400 mb-1">TVL</p>
                      <p className="text-lg font-bold text-white">
                        ${protocol.tvl}B
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-white mb-2 flex items-center">
                      Features
                      <Info className="h-3 w-3 ml-1 text-slate-400" />
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {protocol.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="text-xs bg-slate-800 text-slate-300"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 hover:bg-slate-800 group"
                    disabled={protocol.status !== "active"}
                  >
                    {protocol.status === "active"
                      ? "View Details"
                      : "Unavailable"}
                    {protocol.status === "active" && (
                      <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Comprehensive Protocol Coverage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    42+
                  </div>
                  <div className="text-slate-300">Protocols</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    $15B+
                  </div>
                  <div className="text-slate-300">Total TVL</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    99.9%
                  </div>
                  <div className="text-slate-300">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    24/7
                  </div>
                  <div className="text-slate-300">Monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
