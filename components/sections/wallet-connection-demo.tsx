"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, ChevronDown, ChevronUp, Wallet, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import type { JSX } from "react/jsx-runtime"

interface Asset {
  id: string
  name: string
  symbol: string
  icon: JSX.Element
  balance: number
  value: number
  apy: number
  optimizedApy: number
}

export default function WalletConnectionDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  // Mock assets data
  const assets: Asset[] = [
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      icon: <div className="h-8 w-8 rounded-full bg-blue-500 p-2 text-white">Ξ</div>,
      balance: 3.45,
      value: 10350,
      apy: 4.2,
      optimizedApy: 7.8,
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      icon: <div className="h-8 w-8 rounded-full bg-blue-400 p-2 text-white">$</div>,
      balance: 5000,
      value: 5000,
      apy: 3.5,
      optimizedApy: 8.2,
    },
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      icon: <div className="h-8 w-8 rounded-full bg-orange-500 p-2 text-white">₿</div>,
      balance: 0.25,
      value: 7500,
      apy: 2.1,
      optimizedApy: 5.4,
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      icon: <div className="h-8 w-8 rounded-full bg-purple-500 p-2 text-white">◎</div>,
      balance: 75,
      value: 3750,
      apy: 5.8,
      optimizedApy: 12.3,
    },
  ]

  const handleConnectWallet = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setSelectedAsset(null)
  }

  const handleAssetClick = (assetId: string) => {
    setSelectedAsset(selectedAsset === assetId ? null : assetId)
  }

  return (
    <section ref={ref} className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Connect Your Wallet & Discover Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-slate-300"
          >
            Connect your wallet to discover optimized yield strategies across multiple DeFi protocols
          </motion.p>
        </div>

        <div className="mx-auto max-w-4xl">
          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center rounded-xl bg-slate-900 p-12 text-center shadow-xl"
            >
              <Wallet className="mb-6 h-16 w-16 text-blue-500" />
              <h3 className="mb-4 text-2xl font-bold">Connect Your Wallet</h3>
              <p className="mb-8 text-slate-300">
                Connect your wallet to discover optimized yield strategies for your assets
              </p>
              <Button
                size="lg"
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="relative overflow-hidden bg-blue-600 text-white hover:bg-blue-700"
              >
                {isConnecting ? (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-blue-500"
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <span className="relative">Connecting...</span>
                  </>
                ) : (
                  <>
                    Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Wallet header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
              >
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-blue-500/20 p-2">
                    <Wallet className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Connected Wallet</p>
                    <p className="text-sm text-slate-400">0x7Fc...3A5e</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleDisconnect}>
                  <X className="mr-1 h-4 w-4" /> Disconnect
                </Button>
              </motion.div>

              {/* Asset discovery */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h3 className="mb-4 text-xl font-medium">Your Assets</h3>
                <div className="space-y-3">
                  {assets.map((asset, index) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    >
                      <Card
                        className={cn(
                          "cursor-pointer overflow-hidden transition-all duration-300",
                          selectedAsset === asset.id ? "ring-2 ring-blue-500" : "",
                        )}
                        onClick={() => handleAssetClick(asset.id)}
                      >
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {asset.icon}
                              <div>
                                <CardTitle className="text-lg">{asset.name}</CardTitle>
                                <CardDescription>{asset.symbol}</CardDescription>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {asset.balance} {asset.symbol}
                              </p>
                              <p className="text-sm text-slate-400">${asset.value.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardHeader>

                        <AnimatePresence>
                          {selectedAsset === asset.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CardContent className="border-t border-slate-700 bg-slate-800/50 p-4">
                                <div className="mb-4 flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-slate-400">Current APY</p>
                                    <p className="text-lg font-medium">{asset.apy}%</p>
                                  </div>
                                  <div className="h-8 w-8">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                      <path
                                        d="M16 5C16 5 8 12 8 20C8 24.4183 11.5817 28 16 28C20.4183 28 24 24.4183 24 20C24 12 16 5 16 5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-slate-600"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-slate-400">Optimized APY</p>
                                    <p className="text-lg font-medium text-green-500">{asset.optimizedApy}%</p>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <div className="mb-1 flex justify-between text-xs">
                                    <span>Current</span>
                                    <span>Optimized</span>
                                  </div>
                                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-700">
                                    <motion.div
                                      className="absolute left-0 top-0 h-full bg-slate-500"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(asset.apy / asset.optimizedApy) * 100}%` }}
                                      transition={{ duration: 1, delay: 0.2 }}
                                    />
                                    <motion.div
                                      className="absolute right-0 top-0 h-full bg-green-500"
                                      initial={{ width: 0 }}
                                      animate={{ width: "100%" }}
                                      transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                  </div>
                                </div>

                                <div className="rounded-lg bg-slate-900 p-3">
                                  <p className="mb-2 text-sm font-medium">Optimization Strategy</p>
                                  <ul className="space-y-2 text-sm">
                                    <li className="flex items-center">
                                      <Check className="mr-2 h-4 w-4 text-green-500" />
                                      <span>
                                        Deposit {asset.balance * 0.5} {asset.symbol} to Aave for {asset.apy + 1.2}% APY
                                      </span>
                                    </li>
                                    <li className="flex items-center">
                                      <Check className="mr-2 h-4 w-4 text-green-500" />
                                      <span>
                                        Stake {asset.balance * 0.3} {asset.symbol} on Lido for {asset.apy + 2.5}% APY
                                      </span>
                                    </li>
                                    <li className="flex items-center">
                                      <Check className="mr-2 h-4 w-4 text-green-500" />
                                      <span>
                                        Provide liquidity with {asset.balance * 0.2} {asset.symbol} on Curve for{" "}
                                        {asset.optimizedApy}% APY
                                      </span>
                                    </li>
                                  </ul>
                                </div>

                                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                                  Apply Optimization
                                </Button>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex justify-center border-t border-slate-700 p-2">
                          {selectedAsset === asset.id ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Optimization summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6"
              >
                <h3 className="mb-4 text-xl font-medium">Portfolio Optimization Summary</h3>
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <p className="text-sm text-slate-400">Total Value</p>
                    <p className="text-2xl font-bold">
                      ${assets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <p className="text-sm text-slate-400">Current APY (Avg)</p>
                    <p className="text-2xl font-bold">
                      {(
                        assets.reduce((sum, asset) => sum + asset.apy * asset.value, 0) /
                        assets.reduce((sum, asset) => sum + asset.value, 0)
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <p className="text-sm text-slate-400">Optimized APY (Avg)</p>
                    <p className="text-2xl font-bold text-green-500">
                      {(
                        assets.reduce((sum, asset) => sum + asset.optimizedApy * asset.value, 0) /
                        assets.reduce((sum, asset) => sum + asset.value, 0)
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium">Annual Yield Comparison</p>
                  <div className="relative h-8 w-full overflow-hidden rounded-lg bg-slate-800">
                    <div className="absolute inset-0 flex">
                      <motion.div
                        className="flex h-full items-center justify-center bg-slate-700 text-sm font-medium"
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                      >
                        ${assets.reduce((sum, asset) => sum + (asset.value * asset.apy) / 100, 0).toLocaleString()}
                      </motion.div>
                      <motion.div
                        className="flex h-full items-center justify-center bg-green-600 text-sm font-medium"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        $
                        {assets
                          .reduce((sum, asset) => sum + (asset.value * asset.optimizedApy) / 100, 0)
                          .toLocaleString()}
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span className="text-slate-400">Current Strategy</span>
                    <span className="text-green-400">Optimized Strategy</span>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Optimize All Assets
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
