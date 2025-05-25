"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bitcoin, Coins, DollarSign, Wallet } from "lucide-react";

const ICONS = [
  { icon: <Bitcoin />, color: "text-yellow-500" },
  { icon: <Coins />, color: "text-blue-500" },
  { icon: <DollarSign />, color: "text-green-500" },
  { icon: <Wallet />, color: "text-purple-500" },
];

export function OrbitingIcons() {
  const iconCount = 8;
  const radius = 180;
  const iconSize = 36;
  const speed = 8;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
        transform: "translate(-50%, -50%) translateY(30px)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: iconCount }).map((_, i) => {
        const angle = (i / iconCount) * 360;
        const { icon, color } = ICONS[i % ICONS.length];
        return (
          <div
            key={i}
            className={`absolute flex items-center justify-center rounded-full bg-slate-800/80 p-2 backdrop-blur-sm ${color}`}
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              opacity: 0.95,
              left: "50%",
              top: "50%",
              transform: `rotate(${angle}deg) translate(${radius}px) translate(-50%, -50%)`,
            }}
          >
            {icon}
          </div>
        );
      })}
    </motion.div>
  );
}
