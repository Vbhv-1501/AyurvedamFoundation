"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface SpringCountUpProps {
  value: number;
  suffix?: string;
  hasCommas?: boolean;
  className?: string;
}

export default function SpringCountUp({
  value,
  suffix = "+",
  hasCommas = true,
  className,
}: SpringCountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      const frame = requestAnimationFrame(() => setCount(value));
      return () => cancelAnimationFrame(frame);
    }

    // Snappy spring-physics count animation
    const controls = animate(0, value, {
      type: "spring",
      damping: 24,
      stiffness: 60,
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, shouldReduceMotion]);

  const display = hasCommas ? count.toLocaleString() : count.toString();

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
