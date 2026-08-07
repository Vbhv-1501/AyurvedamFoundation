"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    const page = pathname.replace(/\/$/, "");
    let imagesCleanup: (() => void) | undefined;
    
    // Format footer phone numbers
    document.querySelectorAll<HTMLElement>(".elementor-location-footer .elementor-icon-list-text").forEach((item) => {
      if (item.textContent?.includes("63910 53105") && item.textContent.includes("8318714809")) {
        item.innerHTML = "+91 63910 53105<br>+91 8318714809";
      }
    });

    // Replace footer social icons with premium full-color brand logos
    const facebookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
    const youtubeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.865.502-5.837.502-5.837s0-3.971-.502-5.837z"/><polygon fill="#FFFFFF" points="9.545 15.568 15.818 12 9.545 8.432"/></svg>`;
    const instagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="ig-grad" cx="30%" cy="107%" r="130%"><stop offset="0%" stop-color="#fdf497"/><stop offset="5%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="5" fill="url(#ig-grad)"/><path fill="#FFFFFF" d="M12 5.9c2.02 0 2.26.01 3.06.04 2.1.1 2.9 1 3 3 .03.8.04 1.04.04 3.06s-.01 2.26-.04 3.06c-.1 2.1-1 2.9-3 3-.8.03-1.04.04-3.06.04s-2.26-.01-3.06-.04c-2.1-.1-2.9-1-3-3-.03-.8-.04-1.04-.04-3.06s.01-2.26.04-3.06c.1-2.1 1-2.9 3-3 .8-.03 1.04-.04 3.06-.04M12 4.5c-2.05 0-2.31.01-3.12.05-2.9.13-4.5 1.73-4.63 4.63-.04.81-.05 1.07-.05 3.12s-.01 2.31.05 3.12c.13 2.9 1.73 4.5 4.63 4.63.81.04 1.07.05 3.12.05s2.31-.01 3.12-.05c2.9-.13 4.5-1.73 4.63-4.63.04-.81.05-1.07.05-3.12s-.01-2.31-.05-3.12c-.13-2.9-1.73-4.5-4.63-4.63-.81-.04-1.07-.05-3.12-.05z"/><path fill="#FFFFFF" d="M12 8.12a3.88 3.88 0 1 0 3.88 3.88A3.88 3.88 0 0 0 12 8.12zm0 6.36a2.48 2.48 0 1 1 2.48-2.48 2.48 2.48 0 0 1-2.48 2.48z"/><circle fill="#FFFFFF" cx="16.9" cy="7.1" r="0.9"/></svg>`;
    const linkedinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0A66C2" d="M22.223 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/><path fill="#FFFFFF" d="M7.12 20.452h-3.56V9.002h3.56v11.45zM5.34 7.433c-1.137 0-2.06-.924-2.06-2.063a2.063 2.063 0 1 1 4.12 0c0 1.139-.922 2.063-2.06 2.063zM20.451 20.452h-3.553v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.359V9.002h3.41v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"/></svg>`;

    document.querySelectorAll<HTMLElement>(".elementor-location-footer a.elementor-social-icon").forEach((a) => {
      const spanText = a.querySelector(".elementor-screen-only")?.textContent?.toLowerCase() || "";
      const svgEl = a.querySelector("svg");
      if (svgEl) {
        if (a.classList.contains("elementor-social-icon-facebook") || a.classList.contains("elementor-social-icon-facebook-f") || spanText.includes("facebook")) {
          svgEl.outerHTML = facebookSvg;
        } else if (a.classList.contains("elementor-social-icon-youtube") || spanText.includes("youtube")) {
          svgEl.outerHTML = youtubeSvg;
        } else if (a.classList.contains("elementor-social-icon-instagram") || spanText.includes("instagram")) {
          svgEl.outerHTML = instagramSvg;
        } else if (a.classList.contains("elementor-social-icon-linkedin") || spanText.includes("linkedin")) {
          svgEl.outerHTML = linkedinSvg;
        }
      }
    });

    // EFFECT 1 & 2: Scroll-triggered effects
    const initAnimations = () => {
      // Setup Headings (Split-Text Reveal)
      const headings = document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5");
      const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (!entry.target.classList.contains("replay")) {
              headingObserver.unobserve(entry.target);
            }
          } else {
            if (entry.target.classList.contains("replay")) {
              entry.target.classList.remove("in-view");
            }
          }
        });
      }, { threshold: 0.4 });

      // Recursive DOM text node splitter
      const splitNode = (node: Node) => {
        const childNodes = Array.from(node.childNodes);
        childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            if (!text || !text.trim()) return;
            
            const fragment = document.createDocumentFragment();
            const words = text.split(/(\s+)/);
            
            words.forEach(word => {
              if (/\s+/.test(word)) {
                fragment.appendChild(document.createTextNode(word));
              } else if (word) {
                const wordSpan = document.createElement("span");
                wordSpan.className = "word";
                wordSpan.style.display = "inline-block";
                wordSpan.style.overflow = "hidden";
                wordSpan.style.verticalAlign = "top";
                
                const chars = Array.from(word);
                chars.forEach(char => {
                  const charSpan = document.createElement("span");
                  charSpan.className = "char";
                  charSpan.style.display = "inline-block";
                  charSpan.textContent = char;
                  wordSpan.appendChild(charSpan);
                });
                
                fragment.appendChild(wordSpan);
              }
            });
            child.parentNode?.replaceChild(fragment, child);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const el = child as HTMLElement;
            if (!el.classList.contains("no-split") && !el.classList.contains("char") && !el.classList.contains("word")) {
              splitNode(child);
            }
          }
        });
      };

      headings.forEach((heading) => {
        // Exclude header, nav, footer, and .no-split
        if (heading.closest("header, nav, .elementor-location-header, .elementor-location-footer, .no-split")) {
          return;
        }
        // Avoid double splitting
        if (heading.querySelector(".char") || heading.classList.contains("in-view")) {
          return;
        }

        // Apply splitting
        splitNode(heading);

        // Stagger delays
        const chars = heading.querySelectorAll<HTMLElement>(".char");
        chars.forEach((char, index) => {
          char.style.setProperty("--char-delay", `${index * 18}ms`);
          char.style.transitionDelay = `${index * 18}ms`;
        });

        headingObserver.observe(heading);
      });

      // Setup Counters (Count-up)
      // Parse .sis-counter elements
      document.querySelectorAll<HTMLElement>(".sis-counter").forEach(el => {
        if (el.classList.contains("counter-num") || el.querySelector(".counter-num")) return;
        
        let text = el.textContent?.trim() || "";
        let cleanNumStr = text;
        let suffix = "";
        
        if (text.endsWith("+")) {
          cleanNumStr = text.slice(0, -1);
          suffix = "+";
        }
        
        const cleanVal = parseInt(cleanNumStr.replace(/,/g, ""), 10);
        if (!isNaN(cleanVal)) {
          el.dataset.target = cleanVal.toString();
          if (cleanNumStr.includes(",")) {
            el.dataset.hasCommas = "true";
          }
          el.classList.add("counter-num");
          el.textContent = "0";
          
          if (suffix) {
            const parent = el.parentNode;
            if (parent) {
              const plusNode = document.createTextNode("+");
              if (el.nextSibling) {
                parent.insertBefore(plusNode, el.nextSibling);
              } else {
                parent.appendChild(plusNode);
              }
            }
          }
        }
      });

      // Auto-wrap plain text numbers ending in "+"
      const mainContentAreas = document.querySelectorAll<HTMLElement>(".elementor-page, .ayurvedam-about-content, .ayurvedam-home-content, main");
      const processContainer = (container: HTMLElement) => {
        const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        const nodesToReplace: Text[] = [];
        
        let textNode: Text | null;
        while (textNode = walk.nextNode() as Text) {
          const parent = textNode.parentElement;
          if (!parent) continue;
          if (parent.closest('header, nav, .elementor-location-header, .elementor-location-footer, script, style, .counter-num')) {
            continue;
          }
          
          const text = textNode.textContent || "";
          if (/\b\d{1,3}(?:,\d{2,3})*\+/.test(text)) {
            nodesToReplace.push(textNode);
          }
        }
        
        nodesToReplace.forEach(node => {
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
      };

      mainContentAreas.forEach(area => processContainer(area));

      // Observe and animate
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            animateCounter(el);
            counterObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      const animateCounter = (el: HTMLElement) => {
        const targetVal = parseInt(el.dataset.target || "", 10);
        if (isNaN(targetVal)) return;
        
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = formatNumber(targetVal, el.dataset.hasCommas === "true");
          return;
        }
        
        const duration = 1800; // Animate over 1.8 seconds
        const startTime = performance.now();
        
        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeProgress * targetVal);
          
          el.textContent = formatNumber(currentVal, el.dataset.hasCommas === "true");
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = formatNumber(targetVal, el.dataset.hasCommas === "true");
          }
        };
        
        requestAnimationFrame(update);
      };

      const formatNumber = (num: number, hasCommas: boolean) => {
        if (!hasCommas) return num.toString();
        return num.toLocaleString();
      };

      document.querySelectorAll<HTMLElement>(".counter-num").forEach(el => {
        counterObserver.observe(el);
      });
    };

    initAnimations();
    const t1 = setTimeout(initAnimations, 150);
    const t2 = setTimeout(initAnimations, 400);

    if (page === "/images") {
      const container = document.querySelector<HTMLElement>(".elementor-gallery__container");
      if (container) {
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
        
        imagesCleanup = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          observer?.disconnect();
          listeners.forEach(({ card, handler }) => card.removeEventListener("click", handler));
        };
      }
    }

    if (page === "/videos") {
      document.querySelectorAll<HTMLElement>(".elementor-widget-video[data-settings]").forEach((host) => {
        const mount = host.querySelector<HTMLElement>(".elementor-video");
        const source = host.dataset.settings?.match(/youtu\.be\\\/([\w-]{11})/)?.[1];
        if (!mount || !source || mount.querySelector("iframe")) return;
        mount.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${source}?rel=0&modestbranding=1" title="Ayurvedam Foundation video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (imagesCleanup) imagesCleanup();
    };
  }, [pathname]);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + images.length) % images.length); if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % images.length); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, images.length]);

  if (active === null) return null;
  return <div className="ay-gallery-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery" onClick={() => setActive(null)}><button className="ay-gallery-close" type="button" aria-label="Close gallery" onClick={() => setActive(null)}>{"\u00d7"}</button><button className="ay-gallery-arrow ay-gallery-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}>{"\u2039"}</button><figure onClick={(event) => event.stopPropagation()}><img src={images[active]} alt="Ayurvedam Foundation event moment" /><figcaption>{active + 1} / {images.length}</figcaption></figure><button className="ay-gallery-arrow ay-gallery-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % images.length); }}>{"\u203a"}</button></div>;
}