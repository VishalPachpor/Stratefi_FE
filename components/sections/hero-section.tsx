"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useAnimationControls,
} from "framer-motion";
import {
  ArrowRight,
  Wallet,
  Shield,
  Zap,
  TrendingUp,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSplitText } from "@/hooks/use-split-text";
import { useCountUp } from "@/hooks/use-count-up";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { OrbitingIcons } from "@/components/ui/orbiting-icons";
import { ParticleSystem } from "@/components/ui/particle-system";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PulseIndicator } from "@/components/ui/live-market-feed";
import { CuteRobot } from "@/components/ui/cute-robot";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const floatControls = useAnimationControls();

  // Split text animation for headline
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { words: headlineWords } = useSplitText<HTMLHeadingElement>(
    "Intelligent Autonomous DeFAI",
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

  useEffect(() => {
    floatControls.start({
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [floatControls]);

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
      className="relative overflow-hidden py-12 sm:py-16 lg:py-32 min-h-screen flex items-center"
    >
      {/* Enhanced 3D background with particle system */}
      <ParticleSystem
        particleCount={80}
        mouseInteraction={true}
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Main content - follows F-pattern */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Status indicator with live pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/20 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-400 border border-blue-500/30">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Next-Gen DeFi Optimization</span>
              </div>
              <PulseIndicator />
            </motion.div>

            {/* Headline with enhanced staggered word reveal */}
            <h1
              ref={headlineRef}
              className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
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
              className="mb-6 sm:mb-8 max-w-lg text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed"
            >
              Stop leaving money on the table. Our AI analyzes thousands of DeFi
              protocols in real-time to find the{" "}
              <span className="text-green-400 font-semibold">
                highest yields
              </span>{" "}
              for your assets.
            </motion.p>

            {/* Enhanced CTAs with magnetic hover and pulse */}
            <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
                  >
                    <Wallet className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Soon <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
                  className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                >
                  <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <a
                    href="https://app.youform.com/forms/bbbn2d9r"
                    target="_blank"
                  >
                    Early Access
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Enhanced live stats with better animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {/* <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-xs sm:text-sm text-slate-400 mb-1">
                  Total Value Locked
                </p>
                <AnimatedCounter
                  value={456789}
                  prefix="$"
                  className="text-lg sm:text-2xl font-bold text-blue-400"
                />
              </motion.div> */}
              {/* <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-3 sm:p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-xs sm:text-sm text-slate-400 mb-1">
                  Avg. APY Increase
                </p>
                <AnimatedCounter
                  value={32.5}
                  suffix="%"
                  decimals={1}
                  className="text-lg sm:text-2xl font-bold text-green-400"
                />
              </motion.div> */}
              {/* <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-3 sm:p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-xs sm:text-sm text-slate-400 mb-1">
                  Protocols Connected
                </p>
                <AnimatedCounter
                  value={42}
                  className="text-lg sm:text-2xl font-bold text-purple-400"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-3 sm:p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50"
              >
                <p className="text-xs sm:text-sm text-slate-400 mb-1">
                  Active Users
                </p>
                <AnimatedCounter
                  value={24689}
                  className="text-lg sm:text-2xl font-bold text-cyan-400"
                />
              </motion.div> */}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-400"
            >
              {/* <div className="flex items-center space-x-2">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                <span>Audited by CertiK</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                <span>$0 Hacks to Date</span>
              </div> */}
            </motion.div>
          </div>

          {/* Enhanced trust signals and wallet icons */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <motion.div
              className="relative min-h-[340px] min-w-[340px] h-[340px] w-[340px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
              animate={floatControls}
            >
              {/* Orbiting icons in the background */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center">
                <OrbitingIcons />
              </div>
              {/* Robot in the foreground */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 p-1">
                    <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                      <CuteRobot size="lg" />
                    </div>
                  </div>
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
                        width: `${120 + ring * 30}px`,
                        height: `${120 + ring * 30}px`,
                        left: `${-ring * 15}px`,
                        top: `${-ring * 15}px`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
