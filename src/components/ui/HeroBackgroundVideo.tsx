"use client";

import React, { useState } from "react";

interface HeroBackgroundVideoProps {
  ytId?: string;
  className?: string;
}

export default function HeroBackgroundVideo({
  ytId = "q44gsv3ooKI",
  className = "",
}: HeroBackgroundVideoProps) {
  const [loaded, setLoaded] = useState(false);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&modestbranding=1&rel=0&showinfo=0&start=6&playlist=${ytId}&enablejsapi=1`;

  return (
    <div
      className={`hero-video-container ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <iframe
        src={embedUrl}
        title="Ayurvedam Foundation Background Video"
        className={`hero-video-frame ${loaded ? "is-loaded" : ""}`}
        allow="autoplay; encrypted-media"
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%) scale(1.15)",
          transformOrigin: "center center",
          border: 0,
          opacity: loaded ? 0.35 : 0, // cinematic translucency
          transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      {/* Fallback scrim */}
      <div
        className="hero-video-scrim"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(44, 23, 32, 0.1) 0%, rgba(22, 10, 15, 0.8) 100%)",
          zIndex: 1,
        }}
      />
    </div>
  );
}
