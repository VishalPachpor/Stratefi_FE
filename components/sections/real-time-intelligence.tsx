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

export default function RealTimeIntelligence() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [volatility, setVolatility] = useState(50);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("market");

  // Mock assets data
  const assets: Asset[] = [
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: 3012.45,
      change24h: 2.3,
      marketData: generateMarketData(30, 3000, volatility),
    },
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: 42568.12,
      change24h: -1.2,
      marketData: generateMarketData(30, 42000, volatility),
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      price: 103.78,
      change24h: 5.7,
      marketData: generateMarketData(30, 100, volatility),
    },
  ];

  // Generate market data based on volatility
  function generateMarketData(
    days: number,
    basePrice: number,
    volatilityFactor: number
  ): MarketData[] {
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

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-900/30">
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
            className="mb-4 border-cyan-500/30 text-cyan-400"
          >
            Real-Time Intelligence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Market Intelligence
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Monitor market conditions and receive intelligent alerts to optimize
            your portfolio with real-time AI analysis and predictive insights.
          </p>
        </motion.div>

        {/* Alert notification */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showAlert ? 1 : 0, y: showAlert ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-lg bg-red-500/20 p-4 text-red-300 max-w-4xl mx-auto"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">High Market Volatility Alert</span>
          </div>
          <p className="mt-1 text-sm">
            Market volatility has increased significantly. Consider adjusting
            your risk parameters.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 max-w-6xl mx-auto">
          {/* Market Monitor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Market Monitor</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>Real-time updates</span>
                  </div>
                </div>
                <CardDescription>
                  Track market conditions and asset performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="market"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="mb-4 bg-slate-800">
                    <TabsTrigger value="market">Market Overview</TabsTrigger>
                    <TabsTrigger value="assets">Asset Performance</TabsTrigger>
                    <TabsTrigger value="predictions">
                      AI Predictions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="market" className="space-y-4">
                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                      <h4 className="mb-4 font-medium text-white">
                        Market Volatility Simulator
                      </h4>
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                        <span>Low Volatility</span>
                        <span>High Volatility</span>
                      </div>
                      <Slider
                        value={[volatility]}
                        onValueChange={(value) => setVolatility(value[0])}
                        max={100}
                        step={1}
                        className="mb-6"
                      />

                      <div className="mb-4 grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-slate-800 p-3 text-center">
                          <p className="text-xs text-slate-400">Market Pulse</p>
                          <div className="flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="mt-2"
                            >
                              <Gauge className="h-6 w-6 text-cyan-400" />
                            </motion.div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-3 text-center">
                          <p className="text-xs text-slate-400">Volatility</p>
                          <p className="text-lg font-bold text-white">
                            {volatility}%
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-3 text-center">
                          <p className="text-xs text-slate-400">Risk Level</p>
                          <p
                            className={`text-lg font-bold ${
                              volatility > 70
                                ? "text-red-400"
                                : volatility > 40
                                ? "text-yellow-400"
                                : "text-green-400"
                            }`}
                          >
                            {volatility > 70
                              ? "High"
                              : volatility > 40
                              ? "Medium"
                              : "Low"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="assets" className="space-y-4">
                    <div className="grid gap-4">
                      {assets.map((asset, index) => (
                        <div
                          key={asset.id}
                          className="rounded-lg border border-slate-800 bg-slate-900 p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-white">
                                {asset.name}
                              </h4>
                              <p className="text-sm text-slate-400">
                                {asset.symbol}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-white">
                                ${asset.price.toLocaleString()}
                              </p>
                              <div
                                className={`flex items-center text-sm ${
                                  asset.change24h >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {asset.change24h >= 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(asset.change24h)}%
                              </div>
                            </div>
                          </div>

                          <div className="h-24">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={asset.marketData}>
                                <Line
                                  type="monotone"
                                  dataKey="price"
                                  stroke={
                                    asset.change24h >= 0 ? "#10B981" : "#EF4444"
                                  }
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="predictions" className="space-y-4">
                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                      <h4 className="mb-4 font-medium text-white">
                        AI Market Predictions
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded bg-slate-800">
                          <span className="text-slate-300">
                            24h Price Movement
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-400"
                          >
                            +2.3% Bullish
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded bg-slate-800">
                          <span className="text-slate-300">
                            Optimal Entry Point
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/20 text-blue-400"
                          >
                            $2,950 ETH
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded bg-slate-800">
                          <span className="text-slate-300">
                            Risk Assessment
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/20 text-yellow-400"
                          >
                            Medium Risk
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Intelligence Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* AI Insights */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-cyan-400" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <p className="text-sm text-cyan-300">
                    Market shows strong bullish signals. Consider increasing
                    exposure to ETH and SOL.
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">
                    2 minutes ago
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm text-yellow-300">
                    High volatility detected. Risk management protocols
                    activated.
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">
                    5 minutes ago
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm text-green-300">
                    New yield opportunity found: 15.2% APY on Curve protocol.
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">
                    12 minutes ago
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Optimize Portfolio
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300"
                >
                  View Recommendations
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300"
                >
                  Risk Analysis
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
