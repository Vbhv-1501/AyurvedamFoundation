"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createRoot } from "react-dom/client";
import { TextReveal } from "@/components/ui/text-reveal";

export default function HeaderRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Run after a slight delay to ensure dynamic pages/dangerouslySetInnerHTML are loaded
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll<HTMLElement>("h1, h2, h3");
      headings.forEach((heading) => {
        // Exclude header, nav, footer, and other UI sections that shouldn't animate
        if (heading.closest("header, nav, footer, .elementor-location-header, .elementor-location-footer, .no-split")) {
          return;
        }

        // Avoid double processing
        if (heading.getAttribute("data-text-reveal-initialized")) {
          return;
        }
        heading.setAttribute("data-text-reveal-initialized", "true");

        const text = heading.innerText || heading.textContent || "";
        if (!text.trim()) return;

        // Render TextReveal as a span inside the heading
        // This preserves the heading element container and all its original styling/classes
        const container = document.createElement("span");
        container.className = "inline-block w-full text-reveal-wrapper";
        
        // We clear the inner content and append our container
        heading.innerHTML = "";
        heading.appendChild(container);

        const root = createRoot(container);
        root.render(
          <TextReveal 
            as="span" 
            preset="fade-in-blur" 
            per="word" 
            speedReveal={1.2}
          >
            {text}
          </TextReveal>
        );
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
