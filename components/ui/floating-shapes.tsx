"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  type: "circle" | "square" | "triangle" | "hexagon"
  speed: number
  parallaxFactor: number
}

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<Shape[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Generate random shapes
    const generateShapes = () => {
      const shapes: Shape[] = []
      const types: ("circle" | "square" | "triangle" | "hexagon")[] = ["circle", "square", "triangle", "hexagon"]
      const colors = [
        "rgba(59, 130, 246, 0.2)", // blue
        "rgba(139, 92, 246, 0.2)", // purple
        "rgba(14, 165, 233, 0.2)", // sky
        "rgba(79, 70, 229, 0.2)", // indigo
      ]

      for (let i = 0; i < 15; i++) {
        shapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
          speed: Math.random() * 0.5 + 0.1,
          parallaxFactor: Math.random() * 0.3 + 0.1,
        })
      }

      return shapes
    }

    shapesRef.current = generateShapes()

    // Track mouse position for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height } = containerRef.current!.getBoundingClientRect()

      // Normalize mouse position to -1 to 1
      mousePosition.current = {
        x: (clientX / width) * 2 - 1,
        y: (clientY / height) * 2 - 1,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Render shape based on type
  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            className="absolute rounded-full"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "square":
        return (
          <div
            className="absolute rounded-md"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "hexagon":
        return (
          <div
            className="absolute"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size * 0.866}px`,
              backgroundColor: shape.color,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {shapesRef.current.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ x: `${shape.x}%`, y: `${shape.y}%`, rotate: shape.rotation }}
          animate={{
            x: [`${shape.x}%`, `${shape.x + Math.sin(Date.now() * shape.speed * 0.001) * 10}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y + Math.cos(Date.now() * shape.speed * 0.001) * 10}%`, `${shape.y}%`],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
          }}
          transition={{
            duration: 20 / shape.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  )
}
