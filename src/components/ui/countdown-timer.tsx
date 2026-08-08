"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

// Target event date: Dec 23, 2026 at 09:00:00
const COUNTDOWN_FROM = "2026-12-23T09:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

interface CountdownItemProps {
  unit: "Day" | "Hour" | "Minute" | "Second";
  label: string;
}

export default function ShiftingCountdown() {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#4E0E25] via-[#7A1B3D] to-[#4E0E25] text-white border-y border-[#C98A2A]/30 py-6 px-4 shadow-lg overflow-hidden">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left flex-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C98A2A] font-semibold block mb-1">
            Event Countdown
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-[#FCF5F0]">
            Ayurved Yashobhoomi 2026 begins in:
          </h3>
        </div>
        
        <div className="flex w-full md:w-auto max-w-2xl items-center justify-center bg-black/15 backdrop-blur-md rounded-2xl border border-white/10 px-4 py-2">
          <CountdownItem unit="Day" label="Days" />
          <div className="text-[#F2C572]/40 text-xl font-bold self-center px-1 mb-6">:</div>
          <CountdownItem unit="Hour" label="Hours" />
          <div className="text-[#F2C572]/40 text-xl font-bold self-center px-1 mb-6">:</div>
          <CountdownItem unit="Minute" label="Minutes" />
          <div className="text-[#F2C572]/40 text-xl font-bold self-center px-1 mb-6">:</div>
          <CountdownItem unit="Second" label="Seconds" />
        </div>
      </div>
    </section>
  );
}

function CountdownItem({ unit, label }: CountdownItemProps) {
  const { ref, time } = useTimer(unit);
  // Ensure double digits
  const display = String(time).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center min-w-[70px] md:min-w-[90px] px-2 py-3">
      <div className="relative w-full overflow-hidden text-center h-[36px] md:h-[48px]">
        <span
          ref={ref}
          className="block text-2xl md:text-4xl font-mono font-bold text-[#F2C572]"
        >
          {display}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#cfe0d8]/80 font-medium mt-1">
        {label}
      </span>
    </div>
  );
}

function useTimer(unit: CountdownItemProps["unit"]) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<any>(null);
  const timeRef = useRef<number>(0);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      // Don't animate on mount
      if (timeRef.current !== 0 || time !== 0) {
        await animate(
          ref.current,
          { y: ["0%", "-50%"], opacity: [1, 0] },
          { duration: 0.2 }
        );
      }

      timeRef.current = newTime;
      setTime(newTime);

      if (ref.current) {
        await animate(
          ref.current,
          { y: ["50%", "0%"], opacity: [0, 1] },
          { duration: 0.2 }
        );
      }
    }
  };

  return { ref, time };
}
