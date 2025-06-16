"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  apy: number;
}

interface LiveMarketFeedProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function LiveMarketFeed({
  className = "",
  autoRefresh = true,
  refreshInterval = 60 * 60 * 1000, // Update every 1 hour instead of 5 seconds
}: LiveMarketFeedProps) {
  const [isClient, setIsClient] = useState(false);
  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: "ETH",
      price: 2347.82,
      change: 45.23,
      changePercent: 1.97,
      volume: "12.4B",
      marketCap: "282B",
      apy: 8.5,
    },
    {
      symbol: "BTC",
      price: 43521.45,
      change: -234.12,
      changePercent: -0.53,
      volume: "28.7B",
      marketCap: "853B",
      apy: 4.2,
    },
    {
      symbol: "USDC",
      price: 1.0001,
      change: 0.0001,
      changePercent: 0.01,
      volume: "5.2B",
      marketCap: "32B",
      apy: 12.8,
    },
    {
      symbol: "LINK",
      price: 14.82,
      change: 0.73,
      changePercent: 5.17,
      volume: "890M",
      marketCap: "8.4B",
      apy: 15.3,
    },
    {
      symbol: "UNI",
      price: 7.45,
      change: -0.23,
      changePercent: -2.99,
      volume: "456M",
      marketCap: "4.5B",
      apy: 18.7,
    },
    {
      symbol: "AAVE",
      price: 89.34,
      change: 2.15,
      changePercent: 2.46,
      volume: "234M",
      marketCap: "1.3B",
      apy: 22.1,
    },
  ]);

  const [alerts, setAlerts] = useState<
    { id: string; message: string; type: "positive" | "negative" | "neutral" }[]
  >([]);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate live data updates - only after client hydration
  useEffect(() => {
    if (!autoRefresh || !isClient) return;

    // Function to update market data
    const updateMarketData = () => {
      setMarketData((prevData) =>
        prevData.map((item) => {
          const priceChange = (Math.random() - 0.5) * item.price * 0.02; // ±2% max change
          const newPrice = Math.max(0.001, item.price + priceChange);
          const changePercent = (priceChange / item.price) * 100;

          // Generate alerts for significant changes
          if (Math.abs(changePercent) > 3) {
            const alertId = `${item.symbol}-${Date.now()}`;
            const alertType = changePercent > 0 ? "positive" : "negative";
            const message = `${item.symbol} ${
              changePercent > 0 ? "surged" : "dropped"
            } ${Math.abs(changePercent).toFixed(1)}%`;

            setAlerts((prev) => [
              ...prev.slice(-2),
              { id: alertId, message, type: alertType },
            ]);

            // Remove alert after 5 seconds
            setTimeout(() => {
              setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
            }, 5000);
          }

          return {
            ...item,
            price: newPrice,
            change: priceChange,
            changePercent,
            apy: Math.max(0, item.apy + (Math.random() - 0.5) * 2), // APY can also fluctuate
          };
        })
      );
    };

    // Trigger initial update after a short delay (to show initial animation)
    setTimeout(updateMarketData, 3000);

    // Set up interval for subsequent updates
    const interval = setInterval(updateMarketData, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, isClient]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Alert Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`
                px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm
                ${
                  alert.type === "positive"
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : ""
                }
                ${
                  alert.type === "negative"
                    ? "bg-red-500/20 border border-red-500/30 text-red-400"
                    : ""
                }
                ${
                  alert.type === "neutral"
                    ? "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                    : ""
                }
              `}
            >
              <div className="flex items-center space-x-2">
                {alert.type === "positive" && (
                  <TrendingUp className="h-4 w-4" />
                )}
                {alert.type === "negative" && (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scrolling Ticker */}
      <div className="relative overflow-hidden bg-slate-900/50 backdrop-blur-sm rounded-lg p-2">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{ x: [0, -50] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {[...marketData, ...marketData].map((item, index) => (
            <div
              key={`${item.symbol}-${index}`}
              className="flex items-center space-x-2 min-w-fit"
            >
              <span className="font-bold text-white">{item.symbol}</span>
              <AnimatedCounter
                value={item.price}
                prefix="$"
                decimals={2}
                className="text-slate-300"
                enableFlip={false}
              />
              <span
                className={`flex items-center space-x-1 ${
                  item.changePercent >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.changePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="text-sm">
                  {item.changePercent.toFixed(2)}%
                </span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {marketData.map((item, index) => (
          <MarketCard key={item.symbol} data={item} index={index} />
        ))}
      </div>
    </div>
  );
}

interface MarketCardProps {
  data: MarketData;
  index: number;
}

function MarketCard({ data, index }: MarketCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-3 sm:p-4 md:p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Glowing effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold">
                {data.symbol}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                {data.symbol}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400">
                Market Cap: {data.marketCap}
              </p>
            </div>
          </div>
          <div
            className={`flex items-center space-x-1 ${
              data.changePercent >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {data.changePercent >= 0 ? (
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
            <span className="text-xs sm:text-sm font-medium">
              {data.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Price and Volume */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-slate-400">Price</span>
            <AnimatedCounter
              value={data.price}
              prefix="$"
              decimals={2}
              className="text-sm sm:text-base font-medium text-white"
              enableFlip={false}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-slate-400">
              24h Volume
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              {data.volume}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-slate-400">APY</span>
            <AnimatedCounter
              value={data.apy}
              suffix="%"
              decimals={1}
              className="text-xs sm:text-sm font-medium text-green-400"
              enableFlip={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Pulse indicator for live data
export function PulseIndicator({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        className="w-2 h-2 bg-green-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <span className="text-xs text-green-400 font-medium">Cooking</span>
    </div>
  );
}
