"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bitcoin, Coins, DollarSign, Wallet } from "lucide-react"

interface OrbitingIcon {
  id: number
  icon: JSX.Element
  distance: number
  speed: number
  size: number
  startAngle: number
  color: string
}

export function OrbitingIcons() {
  const [icons, setIcons] = useState<OrbitingIcon[]>([])

  useEffect(() => {
    // Generate orbiting icons
    const iconOptions = [
      { icon: <Bitcoin />, color: "text-yellow-500" },
      { icon: <Coins />, color: "text-blue-500" },
      { icon: <DollarSign />, color: "text-green-500" },
      { icon: <Wallet />, color: "text-purple-500" },
    ]

    const generatedIcons: OrbitingIcon[] = []

    for (let i = 0; i < 8; i++) {
      const iconOption = iconOptions[i % iconOptions.length]
      generatedIcons.push({
        id: i,
        icon: iconOption.icon,
        distance: Math.random() * 40 + 120, // Distance from center (120-160px)
        speed: Math.random() * 15 + 15, // Orbit speed (15-30s per revolution)
        size: Math.random() * 10 + 20, // Icon size (20-30px)
        startAngle: (i / 8) * 360, // Distribute evenly around the circle
        color: iconOption.color,
      })
    }

    setIcons(generatedIcons)
  }, [])

  return (
    <>
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className={`absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-slate-800/80 p-2 backdrop-blur-sm ${icon.color}`}
          style={{
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
          initial={{
            x: Math.cos((icon.startAngle * Math.PI) / 180) * icon.distance,
            y: Math.sin((icon.startAngle * Math.PI) / 180) * icon.distance,
          }}
          animate={{
            x: [
              Math.cos((icon.startAngle * Math.PI) / 180) * icon.distance,
              Math.cos(((icon.startAngle + 120) * Math.PI) / 180) * icon.distance,
              Math.cos(((icon.startAngle + 240) * Math.PI) / 180) * icon.distance,
              Math.cos(((icon.startAngle + 360) * Math.PI) / 180) * icon.distance,
            ],
            y: [
              Math.sin((icon.startAngle * Math.PI) / 180) * icon.distance,
              Math.sin(((icon.startAngle + 120) * Math.PI) / 180) * icon.distance,
              Math.sin(((icon.startAngle + 240) * Math.PI) / 180) * icon.distance,
              Math.sin(((icon.startAngle + 360) * Math.PI) / 180) * icon.distance,
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: icon.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            times: [0, 0.33, 0.66, 1],
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </>
  )
}
