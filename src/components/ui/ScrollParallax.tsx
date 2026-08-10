"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollParallaxProps {
  children: React.ReactNode;
  rate?: number; // Parallax rate multiplier (default 0.05)
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollParallax({
  children,
  rate = 0.05,
  className,
  style,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll position of this element in viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate translation distance
  const offsetDistance = rate * 400; // Shift range
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-offsetDistance, offsetDistance]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ""}`} style={style}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
