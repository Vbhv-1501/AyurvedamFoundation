"use client";

import { useEffect, useState } from "react";

const fallbackImages = [
  "/uploads/2026/06/043A6536-scaled.webp", "/uploads/2026/06/043A6543-scaled.webp",
  "/uploads/2026/06/043A6597-scaled.webp", "/uploads/2026/06/043A6614-scaled.webp",
  "/uploads/2026/06/043A6663-scaled.webp", "/uploads/2026/06/043A7492-scaled.webp",
  "/uploads/2026/06/043A7580-scaled.webp", "/uploads/2026/06/043A7811-scaled.webp",
  "/uploads/2026/06/043A8293-scaled.webp", "/uploads/2026/06/043A8318-scaled.webp",
  "/uploads/2026/06/043A8457-scaled.webp", "/uploads/2026/06/043A8492-scaled.webp",
];

export default function MediaExperience() {
  const [active, setActive] = useState<number | null>(null);
  const [images, setImages] = useState(fallbackImages);

  useEffect(() => {
    const page = window.location.pathname.replace(/\/$/, "");
    document.querySelectorAll<HTMLElement>(".elementor-location-footer .elementor-icon-list-text").forEach((item) => {
      if (item.textContent?.includes("63910 53105") && item.textContent.includes("8318714809")) {
        item.innerHTML = "+91 63910 53105<br>+91 8318714809";
      }
    });
    if (page === "/images") {
      const container = document.querySelector<HTMLElement>(".elementor-gallery__container");
      if (!container) return;
      const originalImages = Array.from(container.querySelectorAll<HTMLAnchorElement>(".e-gallery-item[href]"))
        .map((item) => item.getAttribute("href"))
        .filter((src): src is string => Boolean(src));
      const uniqueImages = Array.from(new Set(originalImages));
      const allImages = uniqueImages.length ? uniqueImages : fallbackImages;
      const imageItems = allImages.map((source, index) => ({ source, index }));
      const columns = [imageItems.filter((_, index) => index % 3 === 0), imageItems.filter((_, index) => index % 3 === 1), imageItems.filter((_, index) => index % 3 === 2)];
      container.innerHTML = `<section class="ay-scroll-gallery" aria-label="Ayurvedam Foundation gallery"><div class="ay-scroll-copy"><span>Ayurvedam Foundation archive</span><h2>Stories of <em>learning,<br/>service &amp; celebration.</em></h2><p>Scroll through the complete visual record of our shared Ayurvedic journey.</p></div><div class="ay-scroll-stage"><div class="ay-scroll-grid">${columns.map((items, columnIndex) => `<div class="ay-scroll-column ay-scroll-column-${columnIndex + 1}">${items.map(({ source, index }) => `<a class="ay-scroll-image" href="${source}" data-image-index="${index}" aria-label="Open gallery image"><img src="${source}" alt="Ayurvedam Foundation event moment" loading="lazy" /></a>`).join("")}</div>`).join("")}</div></div></section>`;
      queueMicrotask(() => setImages(allImages));
      const root = container.querySelector<HTMLElement>(".ay-scroll-gallery");
      const grid = container.querySelector<HTMLElement>(".ay-scroll-grid");
      const columnsEls = Array.from(container.querySelectorAll<HTMLElement>(".ay-scroll-column"));
      const cards = Array.from(container.querySelectorAll<HTMLAnchorElement>(".ay-scroll-image"));
      const syncGalleryHeight = () => {
        if (!root || !columnsEls.length) return;
        const stageHeight = window.innerHeight;
        const tallestColumn = Math.max(...columnsEls.map((column, index) => column.scrollHeight * (index === 1 ? 1.14 : .925)));
        const requiredTravel = Math.max(0, tallestColumn - stageHeight * .32);
        root.style.setProperty("--ay-gallery-height", `${Math.ceil(stageHeight + requiredTravel + 96)}px`);
      };
      const update = () => {
        if (!root || !grid) return;
        const rect = root.getBoundingClientRect();
        const range = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / range));
        const entrance = Math.min(1, progress / .28);
        grid.style.transform = `translateX(-50%) rotateX(${75 - entrance * 75}deg) scale(${1.2 - entrance * .2})`;
        columnsEls.forEach((column, index) => {
          const finalScale = index === 1 ? 1.14 : .925;
          const travel = Math.max(0, column.scrollHeight * finalScale - window.innerHeight * .32);
          const offset = index === 1 ? 130 : index === 2 ? -66 : -10;
          const columnScale = index === 1 ? 1 + progress * .14 : 1 - progress * .075;
          column.style.transform = `translateY(${offset - progress * travel}px) scale(${columnScale})`;
        });
      };
      const onScroll = () => window.requestAnimationFrame(update);
      const onResize = () => { syncGalleryHeight(); onScroll(); };
      const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(syncGalleryHeight);
      columnsEls.forEach((column) => observer?.observe(column));
      syncGalleryHeight();
      const listeners = cards.map((card, index) => {
        const handler = (event: MouseEvent) => { event.preventDefault(); setActive(Number(card.dataset.imageIndex ?? index)); };
        card.addEventListener("click", handler);
        return { card, handler };
      });
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); observer?.disconnect(); listeners.forEach(({ card, handler }) => card.removeEventListener("click", handler)); };
    }

    if (page === "/videos") {
      document.querySelectorAll<HTMLElement>(".elementor-widget-video[data-settings]").forEach((host) => {
        const mount = host.querySelector<HTMLElement>(".elementor-video");
        const source = host.dataset.settings?.match(/youtu\.be\\\/([\w-]{11})/)?.[1];
        if (!mount || !source || mount.querySelector("iframe")) return;
        mount.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${source}?rel=0&modestbranding=1" title="Ayurvedam Foundation video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      });
    }
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + images.length) % images.length); if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % images.length); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, images.length]);

  if (active === null) return null;
  return <div className="ay-gallery-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery" onClick={() => setActive(null)}><button className="ay-gallery-close" type="button" aria-label="Close gallery" onClick={() => setActive(null)}>{"\u00d7"}</button><button className="ay-gallery-arrow ay-gallery-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}>{"\u2039"}</button><figure onClick={(event) => event.stopPropagation()}><img src={images[active]} alt="Ayurvedam Foundation event moment" /><figcaption>{active + 1} / {images.length}</figcaption></figure><button className="ay-gallery-arrow ay-gallery-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % images.length); }}>{"\u203a"}</button></div>;
}