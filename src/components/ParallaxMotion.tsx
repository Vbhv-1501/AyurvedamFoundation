"use client";

import { useEffect } from "react";

export default function ParallaxMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".elementor-widget-image, .elementor-widget-video, .elementor-background-slideshow, .mahotsava-hero, .anantam-hero, .aparajita-hero")).slice(0, 32);
    targets.forEach((element, index) => {
      element.classList.add("agency-parallax");
      element.style.setProperty("--parallax-rate", String(0.025 + (index % 4) * 0.012));
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportMiddle = window.innerHeight / 2;
      targets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportMiddle;
        const rate = Number(element.style.getPropertyValue("--parallax-rate"));
        element.style.setProperty("--parallax-shift", `${Math.round(distance * -rate)}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      targets.forEach((element) => {
        element.classList.remove("agency-parallax");
        element.style.removeProperty("--parallax-rate");
        element.style.removeProperty("--parallax-shift");
      });
    };
  }, []);

  return null;
}