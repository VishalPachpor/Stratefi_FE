"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Wallet, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSplitText } from "@/hooks/use-split-text";
import { useCountUp } from "@/hooks/use-count-up";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { OrbitingIcons } from "@/components/ui/orbiting-icons";
import { ParticleSystem } from "@/components/ui/particle-system";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PulseIndicator } from "@/components/ui/live-market-feed";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  // Split text animation for headline
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { words: headlineWords } = useSplitText(
    "Maximize Your DeFi Returns with AI-Powered Optimization",
    headlineRef
  );

  // Count-up animations for stats
  const tvlValue = useCountUp({ end: 1243567890, duration: 3, prefix: "$" });
  const apyValue = useCountUp({
    end: 32.5,
    duration: 2.5,
    decimals: 1,
    suffix: "%",
  });
  const protocolsValue = useCountUp({ end: 42, duration: 2 });
  const usersValue = useCountUp({ end: 24689, duration: 3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Magnetic button effect
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const distanceX = x - centerX;
    const distanceY = y - centerY;

    buttonRef.current.style.transform = `translate(${distanceX / 10}px, ${
      distanceY / 10
    }px)`;
  };

  const resetButtonPosition = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0, 0)";
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-32 min-h-screen flex items-center"
    >
      {/* Enhanced 3D background with particle system */}
      <ParticleSystem
        particleCount={80}
        mouseInteraction={true}
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
      />
      <FloatingShapes />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Main content - follows F-pattern */}
          <div className="flex flex-col justify-center">
            {/* Status indicator with live pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center space-x-4"
            >
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 border border-blue-500/30">
                <Zap className="h-4 w-4" />
                <span>Next-Gen DeFi Optimization</span>
              </div>
              <PulseIndicator />
            </motion.div>

            {/* Headline with enhanced staggered word reveal */}
            <h1
              ref={headlineRef}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.08,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            {/* Enhanced subtext with fade-in and scale */}
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 max-w-lg text-xl text-slate-300 leading-relaxed"
            >
              Stop leaving money on the table. Our AI analyzes thousands of DeFi
              protocols in real-time to find the{" "}
              <span className="text-green-400 font-semibold">
                highest yields
              </span>{" "}
              for your assets.
            </motion.p>

            {/* Enhanced CTAs with magnetic hover and pulse */}
            <div className="mb-12 flex flex-wrap gap-4">
              <div
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  resetButtonPosition();
                  setIsHovering(false);
                }}
                onMouseEnter={() => setIsHovering(true)}
                className="relative transition-transform duration-200 ease-out"
              >
                <motion.div
                  animate={{
                    boxShadow: isHovering
                      ? [
                          "0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 30px rgba(59, 130, 246, 0.6)",
                          "0 0 60px rgba(59, 130, 246, 0.4)",
                          "0 0 30px rgba(59, 130, 246, 0.6)",
                          "0 0 0 rgba(59, 130, 246, 0)",
                        ]
                      : [
                          "0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                          "0 0 0 rgba(59, 130, 246, 0)",
                        ],
                  }}
                  transition={{
                    duration: isHovering ? 1.5 : 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold"
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 px-8 py-4 text-lg"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </motion.div>
            </div>

            {/* Enhanced live stats with better animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-sm text-slate-400 mb-1">
                  Total Value Locked
                </p>
                <AnimatedCounter
                  value={1243567890}
                  prefix="$"
                  className="text-2xl font-bold text-blue-400"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-sm text-slate-400 mb-1">Avg. APY Increase</p>
                <AnimatedCounter
                  value={32.5}
                  suffix="%"
                  decimals={1}
                  className="text-2xl font-bold text-green-400"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-sm text-slate-400 mb-1">
                  Protocols Connected
                </p>
                <AnimatedCounter
                  value={42}
                  className="text-2xl font-bold text-purple-400"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-sm text-slate-400 mb-1">Active Users</p>
                <AnimatedCounter
                  value={24689}
                  className="text-2xl font-bold text-cyan-400"
                />
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex items-center space-x-6 text-sm text-slate-400"
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Audited by CertiK</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span>$0 Hacks to Date</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced trust signals and wallet icons */}
          <div className="flex items-center justify-center">
            <div className="relative h-[500px] w-[500px]">
              {/* Enhanced orbiting icons */}
              <OrbitingIcons />

              {/* Central hub with enhanced effects */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative h-40 w-40 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 p-1"
                >
                  <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                      className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      AI
                    </motion.div>
                  </div>
                </motion.div>

                {/* Pulsing rings */}
                {[1, 2, 3].map((ring, i) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-blue-500/20"
                    animate={{
                      scale: [1, 1.5, 2],
                      opacity: [0.5, 0.2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                    }}
                    style={{
                      width: `${160 + ring * 40}px`,
                      height: `${160 + ring * 40}px`,
                      left: `${-ring * 20}px`,
                      top: `${-ring * 20}px`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
