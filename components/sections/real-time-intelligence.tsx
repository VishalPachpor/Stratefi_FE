"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Bell,
  ChevronDown,
  ChevronUp,
  Clock,
  Gauge,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  DollarSign,
  Activity,
  Zap,
  Target,
  AlertTriangle,
  Brain,
  BarChart3,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  LiveMarketFeed,
  PulseIndicator,
} from "@/components/ui/live-market-feed";
import { AnimatedCounter, RacingBars } from "@/components/ui/animated-counter";
import { AIAgentAvatar } from "@/components/ui/ai-agent-avatar";

interface MarketData {
  timestamp: string;
  price: number;
  volume: number;
}

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketData: MarketData[];
}

interface MarketInsight {
  id: string;
  type: "opportunity" | "risk" | "rebalance" | "news";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  timestamp: string;
  value?: number;
  change?: number;
}

export default function RealTimeIntelligence() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [volatility, setVolatility] = useState(50);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("market");
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [protocolCount, setProtocolCount] = useState(1000);
  const [chainCount, setChainCount] = useState(12);
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);

  // Initialize client-side only values
  useEffect(() => {
    setIsClient(true);
    setLastUpdated(new Date());

    // Initialize assets with market data
    const initialAssets: Asset[] = [
      {
        id: "eth",
        name: "Ethereum",
        symbol: "ETH",
        price: 3012.45,
        change24h: 2.3,
        marketData: generateMarketData(7, 3012.45, 50),
      },
      {
        id: "btc",
        name: "Bitcoin",
        symbol: "BTC",
        price: 42568.12,
        change24h: -1.2,
        marketData: generateMarketData(7, 42568.12, 50),
      },
      {
        id: "sol",
        name: "Solana",
        symbol: "SOL",
        price: 103.78,
        change24h: 5.7,
        marketData: generateMarketData(7, 103.78, 50),
      },
    ];
    setAssets(initialAssets);

    // Update protocol and chain counts
    setProtocolCount(Math.floor(Math.random() * 500 + 1000));
    setChainCount(Math.floor(Math.random() * 5 + 12));

    const interval = setInterval(() => {
      setProtocolCount(Math.floor(Math.random() * 500 + 1000));
      setChainCount(Math.floor(Math.random() * 5 + 12));
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulated AI insights
  const mockInsights: MarketInsight[] = [
    {
      id: "1",
      type: "opportunity",
      title: "AAVE Lending Rate Surge",
      description:
        "AAVE lending rates increased by 2.3% in the last hour. Consider rebalancing ETH allocation.",
      impact: "high",
      confidence: 92,
      timestamp: "2 minutes ago",
      value: 8.7,
      change: 2.3,
    },
    {
      id: "2",
      type: "risk",
      title: "High Volatility Detected",
      description:
        "SOL price volatility increased 180%. Risk management protocols activated.",
      impact: "medium",
      confidence: 87,
      timestamp: "5 minutes ago",
      value: 180,
      change: -12.4,
    },
    {
      id: "3",
      type: "rebalance",
      title: "Portfolio Rebalance Suggested",
      description:
        "Move 15% from USDC to ETH staking for +3.2% APY improvement.",
      impact: "high",
      confidence: 95,
      timestamp: "8 minutes ago",
      value: 3.2,
      change: 15,
    },
    {
      id: "4",
      type: "news",
      title: "Protocol Upgrade",
      description:
        "Compound V3 upgrade completed. Enhanced yield opportunities available.",
      impact: "medium",
      confidence: 100,
      timestamp: "15 minutes ago",
    },
  ];

  const apyComparisonData = [
    { label: "Traditional Banks", value: 0.5, color: "#ef4444" },
    { label: "DeFi Average", value: 4.2, color: "#f59e0b" },
    { label: "Our Optimization", value: 8.7, color: "#10b981" },
    { label: "AI Enhanced", value: 12.4, color: "#3b82f6" },
  ];

  // Generate market data based on volatility (client-side only)
  function generateMarketData(
    days: number,
    basePrice: number,
    volatilityFactor: number
  ): MarketData[] {
    if (!isClient) return []; // Return empty array during SSR

    const data: MarketData[] = [];
    let currentPrice = basePrice;

    for (let i = 0; i < days; i++) {
      const change =
        (Math.random() - 0.5) * (basePrice * 0.05) * (volatilityFactor / 50);
      currentPrice += change;

      const date = new Date();
      date.setDate(date.getDate() - (days - i));

      data.push({
        timestamp: date.toISOString().split("T")[0],
        price: Math.round(currentPrice * 100) / 100,
        volume: Math.round(Math.random() * 1000000 + 500000),
      });
    }

    return data;
  }

  // Show alert notification when volatility changes significantly
  useEffect(() => {
    if (volatility > 70) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [volatility]);

  // Simulate real-time insights
  useEffect(() => {
    if (!isInView || !isClient) return;

    // Initial update - trigger immediately
    const performUpdate = () => {
      setAiProcessing(true);

      setTimeout(() => {
        const randomInsight =
          mockInsights[Math.floor(Math.random() * mockInsights.length)];
        const newInsight = {
          ...randomInsight,
          id: Date.now().toString(),
          timestamp: "Just now",
          confidence: Math.floor(Math.random() * 20) + 80,
        };

        setInsights((prev) => [newInsight, ...prev.slice(0, 3)]);
        setAiProcessing(false);
        setLastUpdated(new Date()); // Update timestamp
      }, 2000);
    };

    // Trigger initial update immediately
    performUpdate();

    // Set up interval for subsequent updates every 2 hours
    const interval = setInterval(performUpdate, 2 * 60 * 60 * 1000);

    // Also set initial insights for immediate display
    setInsights(mockInsights.slice(0, 2));

    return () => clearInterval(interval);
  }, [isInView, isClient]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-4 w-4" />;
      case "risk":
        return <AlertTriangle className="h-4 w-4" />;
      case "rebalance":
        return <Target className="h-4 w-4" />;
      case "news":
        return <Activity className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "risk":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "rebalance":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "news":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-orange-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <section
      ref={ref}
      className="py-8 sm:py-12 lg:py-20 overflow-x-hidden w-full"
    >
      <div className="px-2 sm:px-4 lg:px-8 max-w-screen-lg mx-auto w-full">
        <div className="mb-6 sm:mb-8 lg:mb-12 text-center w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold w-full"
          >
            Real-Time Market Intelligence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl px-2 w-full"
          >
            Stay ahead with AI-powered market insights and real-time portfolio
            optimization
          </motion.p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12 w-full">
          {assets.map((asset) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 sm:p-4 w-full min-w-0"
            >
              <div className="flex items-center justify-between mb-2 min-w-0">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="text-base sm:text-lg font-medium truncate">
                    {asset.symbol}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 truncate">
                    {asset.name}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium px-2 py-1 rounded-full",
                    asset.change24h >= 0
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  )}
                >
                  {asset.change24h >= 0 ? "+" : ""}
                  {asset.change24h}%
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-2 w-full truncate">
                ${asset.price.toLocaleString()}
              </div>
              <div className="h-16 sm:h-20 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={asset.marketData}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={asset.change24h >= 0 ? "#10b981" : "#ef4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Live Market Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 sm:p-4 w-full min-w-0"
          >
            <div className="mb-3 sm:mb-4 flex items-center justify-between w-full min-w-0">
              <h3 className="text-lg sm:text-xl font-bold truncate">
                Live Market Feed
              </h3>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-400 text-xs sm:text-sm"
              >
                Live
              </Badge>
            </div>
            <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4 w-full min-w-0">
              <LiveMarketFeed />
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 sm:p-4 w-full min-w-0"
          >
            <div className="mb-3 sm:mb-4 flex items-center justify-between w-full min-w-0">
              <h3 className="text-lg sm:text-xl font-bold truncate">
                AI Insights
              </h3>
              <div className="flex items-center space-x-2">
                <AIAgentAvatar isActive={aiProcessing} />
                <span className="text-xs sm:text-sm text-slate-400">
                  {lastUpdated
                    ? `Updated ${lastUpdated.toLocaleTimeString()}`
                    : ""}
                </span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 w-full min-w-0">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-3 sm:p-4 w-full min-w-0"
                >
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full min-w-0">
                    <div className="flex items-center space-x-2 min-w-0">
                      {getInsightIcon(insight.type)}
                      <span className="text-sm sm:text-base font-medium truncate">
                        {insight.title}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "bg-opacity-10 text-xs sm:text-sm",
                        getInsightColor(insight.type)
                      )}
                    >
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-2 w-full truncate">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 w-full min-w-0">
                    <span>{insight.timestamp}</span>
                    <span>{insight.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
