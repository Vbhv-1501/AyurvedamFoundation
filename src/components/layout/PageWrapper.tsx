"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    // ----------------------------------------------------
    // 1. TICKET MODAL TOGGLING
    // ----------------------------------------------------
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const overlay = document.getElementById("ticketModalOverlay");
      
      if (!overlay) return;

      if (target.closest(".openTicketModalBtn")) {
        e.preventDefault();
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      if (target.closest("#closeTicketModalBtn") || target === overlay) {
        e.preventDefault();
        overlay.classList.remove("active");
        document.body.style.removeProperty("overflow");
      }
    };

    document.addEventListener("click", handleDocumentClick);

    // ----------------------------------------------------
    // 2. LIGHTBOX INTERCEPTION FOR GALLERY IMAGES
    // ----------------------------------------------------
    const handleGalleryClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a.ay-scroll-image, a.e-gallery-item, .elementor-gallery-item a");
      
      if (anchor) {
        const imgUrl = anchor.getAttribute("href");
        if (imgUrl && /\.(jpg|jpeg|png|webp|gif|svg)/i.test(imgUrl)) {
          e.preventDefault();
          
          // Locate all gallery images to build a slider
          const galleryContainer = anchor.closest(".ay-scroll-grid, .elementor-gallery__container, .elementor-image-gallery");
          let urls: string[] = [imgUrl];
          let idx = 0;
          
          if (galleryContainer) {
            const anchors = Array.from(galleryContainer.querySelectorAll("a[href]"))
              .map(a => a.getAttribute("href"))
              .filter((href): href is string => !!href && /\.(jpg|jpeg|png|webp|gif|svg)/i.test(href));
            
            urls = Array.from(new Set(anchors));
            idx = urls.indexOf(imgUrl);
          }
          
          setImageList(urls);
          setActiveIndex(idx >= 0 ? idx : 0);
          setActiveImage(imgUrl);
        }
      }
    };

    document.addEventListener("click", handleGalleryClick);

    // ----------------------------------------------------
    // 3. LIGHTWEIGHT HEADINGS REVEAL
    // ----------------------------------------------------
    const headings = document.querySelectorAll<HTMLElement>("h1, h2, h3");
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            headingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    headings.forEach((heading) => {
      if (heading.closest("header, nav, footer, .elementor-location-header, .elementor-location-footer, .no-split")) {
        return;
      }
      heading.classList.add("heading-reveal-base");
      headingObserver.observe(heading);
    });

    // ----------------------------------------------------
    // 4. PERFORMANT COUNT-UP INITIALIZER
    // ----------------------------------------------------
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            animateCounter(el);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    const animateCounter = (el: HTMLElement) => {
      const targetVal = parseInt(el.dataset.target || "0", 10);
      if (isNaN(targetVal) || targetVal <= 0) return;

      const duration = 1600;
      const startTime = performance.now();
      const hasCommas = el.dataset.hasCommas === "true";

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: easeOutQuad
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * targetVal);
        
        el.textContent = hasCommas ? currentVal.toLocaleString() : currentVal.toString();
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = hasCommas ? targetVal.toLocaleString() : targetVal.toString();
        }
      };
      
      requestAnimationFrame(update);
    };

    // Auto wrap numbers ending in "+"
    const contentAreas = document.querySelectorAll<HTMLElement>(".elementor-page, .ayurvedam-about-content, .ayurvedam-home-content, main");
    
    contentAreas.forEach((area) => {
      const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT, null);
      const nodesToReplace: Text[] = [];
      
      let textNode: Text | null;
      while ((textNode = walker.nextNode() as Text)) {
        const parent = textNode.parentElement;
        if (!parent || parent.closest("header, nav, .elementor-location-header, .elementor-location-footer, script, style, .counter-num")) {
          continue;
        }
        if (/\b\d{1,3}(?:,\d{2,3})*\+/.test(textNode.textContent || "")) {
          nodesToReplace.push(textNode);
        }
      }
      
      nodesToReplace.forEach((node) => {
        const text = node.textContent || "";
        const parent = node.parentElement;
        if (!parent) return;
        
        const regex = /\b(\d{1,3}(?:,\d{2,3})*)\+/g;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
          const before = text.substring(lastIndex, match.index);
          if (before) fragment.appendChild(document.createTextNode(before));
          
          const rawNum = match[1];
          const cleanNum = parseInt(rawNum.replace(/,/g, ""), 10);
          
          const span = document.createElement("span");
          span.className = "counter-num";
          span.dataset.target = cleanNum.toString();
          if (rawNum.includes(",")) {
            span.dataset.hasCommas = "true";
          }
          span.textContent = "0";
          
          fragment.appendChild(span);
          fragment.appendChild(document.createTextNode("+"));
          
          lastIndex = regex.lastIndex;
        }
        
        const after = text.substring(lastIndex);
        if (after) fragment.appendChild(document.createTextNode(after));
        
        parent.replaceChild(fragment, node);
      });
    });

    // Observe counter elements
    document.querySelectorAll<HTMLElement>(".counter-num").forEach((el) => {
      counterObserver.observe(el);
    });

    // ----------------------------------------------------
    // 5. HERO BACKGROUND VIDEO INJECTION
    // ----------------------------------------------------
    const heroMedia = document.getElementById("heroVideoMedia");
    if (heroMedia) {
      const ytId = heroMedia.dataset.ytId || "q44gsv3ooKI";
      if (!heroMedia.querySelector("iframe")) {
        const iframe = document.createElement("iframe");
        iframe.className = "hero-video-frame";
        iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&modestbranding=1&rel=0&showinfo=0&start=6&playlist=${ytId}&enablejsapi=1`;
        iframe.title = "Ayurvedam Foundation Hero Video";
        iframe.allow = "autoplay; encrypted-media";
        iframe.style.position = "absolute";
        iframe.style.top = "50%";
        iframe.style.left = "50%";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.minHeight = "100vh";
        iframe.style.minWidth = "177.77vh";
        iframe.style.transform = "translate(-50%, -50%) scale(1.15)";
        iframe.style.border = "0";
        iframe.style.pointerEvents = "none";
        iframe.style.opacity = "0";
        iframe.style.transition = "opacity 1.2s ease-in-out";
        iframe.style.zIndex = "0";

        iframe.onload = () => {
          iframe.style.opacity = "0.35";
        };

        heroMedia.innerHTML = ""; // clear poster image
        heroMedia.appendChild(iframe);
      }
    }


    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("click", handleGalleryClick);
      headingObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [pathname]);

  const closeLightbox = () => setActiveImage(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (activeIndex - 1 + imageList.length) % imageList.length;
    setActiveIndex(newIdx);
    setActiveImage(imageList[newIdx]);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = (activeIndex + 1) % imageList.length;
    setActiveIndex(newIdx);
    setActiveImage(imageList[newIdx]);
  };

  return (
    <>
      {children}

      {/* Premium Apple Lightbox Dialog using Framer Motion */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999999] flex items-center justify-center cursor-zoom-out select-none"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:scale-105"
              type="button"
              aria-label="Close gallery"
            >
              &times;
            </button>

            {imageList.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 text-white/70 hover:text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                  type="button"
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 text-white/70 hover:text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                  type="button"
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </>
            )}

            <motion.figure
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="max-w-[90vw] max-h-[85vh] flex flex-col items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage}
                alt="Ayurvedam Foundation Moment"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
              {imageList.length > 1 && (
                <figcaption className="text-white/60 font-mono mt-4 text-xs tracking-wider bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                  {activeIndex + 1} / {imageList.length}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
