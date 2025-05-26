"use client";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import ParticleBackground from "@/components/particle-background";
import LiveCounter from "@/components/live-counter";
import MorphingShape from "@/components/morphing-shape";

export default function HeroSection() {
  const text = useTypewriter(
    "Optimize your DeFi portfolio with AI-powered intelligence",
    100
  );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column - Main content following F-pattern */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-400"
              >
                Next-Gen DeFi Optimization
              </motion.div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">{text}</span>
                <span className="mt-2 block text-blue-400">
                  Maximize Your Yields
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 max-w-lg text-xl text-slate-300"
              >
                Stop leaving money on the table. Our AI analyzes thousands of
                DeFi protocols to find the highest yields for your assets.
              </motion.p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  y: -8,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Soon <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Learn More
              </Button>
            </div>

            {/* Live Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4 rounded-xl bg-slate-800/50 p-4 backdrop-blur-sm"
            >
              <div className="text-center">
                <p className="text-sm text-slate-400">Total Value Locked</p>
                <LiveCounter
                  prefix="$"
                  value={1243567890}
                  duration={3}
                  className="text-2xl font-bold text-blue-400"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Avg. APY Increase</p>
                <LiveCounter
                  suffix="%"
                  value={32.5}
                  decimals={1}
                  fluctuation={0.2}
                  className="text-2xl font-bold text-green-400"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">Active Users</p>
                <LiveCounter
                  value={24689}
                  increment={1}
                  interval={2000}
                  className="text-2xl font-bold text-purple-400"
                />
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual elements */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative h-[500px] w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50"></div>
              <div className="relative h-full w-full rounded-xl bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium text-slate-300">
                      DeFi Portfolio Optimizer
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                      className="h-2 w-2 rounded-full bg-green-400"
                    ></motion.div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  {/* Portfolio visualization */}
                  <div className="rounded-lg bg-slate-800 p-4">
                    <h3 className="mb-4 text-sm font-medium text-slate-300">
                      Your Optimized Portfolio
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Ethereum", apy: 5.2, allocation: 40 },
                        { name: "USDC", apy: 8.7, allocation: 30 },
                        { name: "Solana", apy: 12.3, allocation: 20 },
                        { name: "Avalanche", apy: 15.1, allocation: 10 },
                      ].map((asset, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-blue-500/30"></div>
                            <span className="text-sm text-slate-300">
                              {asset.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-24">
                              <div className="h-2 w-full rounded-full bg-slate-700">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${asset.allocation}%` }}
                                  transition={{
                                    delay: 1 + index * 0.2,
                                    duration: 1,
                                  }}
                                  className="h-2 rounded-full bg-blue-500"
                                ></motion.div>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-green-400">
                              {asset.apy}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Morphing shapes */}
                  <div className="flex justify-around">
                    <MorphingShape
                      startIcon={<Wallet className="h-10 w-10 text-blue-400" />}
                      endIcon={
                        <span className="text-2xl font-bold text-green-400">
                          $
                        </span>
                      }
                    />
                    <MorphingShape
                      startIcon={
                        <Wallet className="h-10 w-10 text-purple-400" />
                      }
                      endIcon={
                        <span className="text-2xl font-bold text-green-400">
                          $
                        </span>
                      }
                      delay={1}
                    />
                    <MorphingShape
                      startIcon={<Wallet className="h-10 w-10 text-blue-400" />}
                      endIcon={
                        <span className="text-2xl font-bold text-green-400">
                          $
                        </span>
                      }
                      delay={2}
                    />
                  </div>

                  {/* Recommendation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="rounded-lg bg-blue-500/10 p-4"
                  >
                    <h3 className="mb-2 text-sm font-medium text-blue-400">
                      AI Recommendation
                    </h3>
                    <p className="text-sm text-slate-300">
                      Rebalance your portfolio to increase APY by{" "}
                      <span className="font-bold text-green-400">+3.2%</span>{" "}
                      with minimal risk adjustment.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    >
                      Apply Optimization
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
