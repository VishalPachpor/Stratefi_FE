"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSplitText } from "@/hooks/use-split-text"
import { useCountUp } from "@/hooks/use-count-up"
import { FloatingShapes } from "@/components/ui/floating-shapes"
import { OrbitingIcons } from "@/components/ui/orbiting-icons"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  const [isHovering, setIsHovering] = useState(false)

  // Split text animation for headline
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const { words: headlineWords } = useSplitText("Maximize Your DeFi Returns with AI-Powered Optimization", headlineRef)

  // Count-up animations for stats
  const tvlValue = useCountUp({ end: 1243567890, duration: 3, prefix: "$" })
  const apyValue = useCountUp({ end: 32.5, duration: 2.5, decimals: 1, suffix: "%" })
  const protocolsValue = useCountUp({ end: 42, duration: 2 })
  const usersValue = useCountUp({ end: 24689, duration: 3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Magnetic button effect
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    const centerX = width / 2
    const centerY = height / 2

    const distanceX = x - centerX
    const distanceY = y - centerY

    buttonRef.current.style.transform = `translate(${distanceX / 10}px, ${distanceY / 10}px)`
  }

  const resetButtonPosition = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = "translate(0, 0)"
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-32">
      {/* Animated background with floating shapes */}
      <FloatingShapes />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Main content - follows F-pattern */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-400"
            >
              Next-Gen DeFi Optimization
            </motion.div>

            {/* Headline with staggered word reveal */}
            <h1
              ref={headlineRef}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.05,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            {/* Subtext with fade-in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 max-w-lg text-xl text-slate-300"
            >
              Stop leaving money on the table. Our AI analyzes thousands of DeFi protocols to find the highest yields
              for your assets.
            </motion.p>

            {/* CTA with magnetic hover effect and pulse animation */}
            <div className="mb-12 flex flex-wrap gap-4">
              <div
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  resetButtonPosition()
                  setIsHovering(false)
                }}
                onMouseEnter={() => setIsHovering(true)}
                className="relative transition-transform duration-200 ease-out"
              >
                <motion.div
                  animate={{
                    boxShadow: isHovering
                      ? [
                          "0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                          "0 0 0 rgba(59, 130, 246, 0)",
                        ]
                      : [
                          "0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 10px rgba(59, 130, 246, 0.3)",
                          "0 0 0 rgba(59, 130, 246, 0)",
                        ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                    Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Learn More
              </Button>
            </div>

            {/* Live stats with digit-flip animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              <div>
                <p className="text-sm text-slate-400">Total Value Locked</p>
                <p className="text-2xl font-bold text-blue-400">{tvlValue}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Avg. APY Increase</p>
                <p className="text-2xl font-bold text-green-400">{apyValue}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Protocols Connected</p>
                <p className="text-2xl font-bold text-purple-400">{protocolsValue}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Active Users</p>
                <p className="text-2xl font-bold text-cyan-400">{usersValue}</p>
              </div>
            </motion.div>
          </div>

          {/* Trust signals and wallet icons */}
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-[400px]">
              {/* Orbiting wallet icons */}
              <OrbitingIcons />

              {/* Central hub */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600"
              >
                <Wallet className="h-12 w-12 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
