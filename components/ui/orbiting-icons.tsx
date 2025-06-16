"use client";

import { motion } from "framer-motion";
import { Bitcoin, Coins, DollarSign, Wallet } from "lucide-react";

// Orbiting icon configuration constants
const ORBIT_ICON_COUNT = 8;
const ORBIT_RADIUS = 180;
const ORBIT_ICON_SIZE = 36;
const ORBIT_SPEED = 8;

// List of icons and their color classes
const ICONS = [
  { icon: <Bitcoin />, color: "text-yellow-500" },
  { icon: <Coins />, color: "text-blue-500" },
  { icon: <DollarSign />, color: "text-green-500" },
  { icon: <Wallet />, color: "text-purple-500" },
];

/**
 * OrbitingIcons - Renders icons in a circular orbit around the robot.
 * The orbit is perfectly centered and rotates smoothly.
 */
export function OrbitingIcons() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: 0, height: 0, transform: "translate(-50%, -50%)" }}
      animate={{ rotate: 360 }}
      transition={{ duration: ORBIT_SPEED, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: ORBIT_ICON_COUNT }).map((_, i) => {
        const angle = (i / ORBIT_ICON_COUNT) * 360;
        const { icon, color } = ICONS[i % ICONS.length];
        return (
          <div
            key={i}
            className={`absolute flex items-center justify-center rounded-full bg-slate-800/80 p-2 backdrop-blur-sm ${color}`}
            style={{
              width: `${ORBIT_ICON_SIZE}px`,
              height: `${ORBIT_ICON_SIZE}px`,
              opacity: 0.95,
              left: "50%",
              top: "50%",
              transform: `rotate(${angle}deg) translate(${ORBIT_RADIUS}px) translate(-50%, -50%)`,
            }}
          >
            {icon}
          </div>
        );
      })}
    </motion.div>
  );
}
