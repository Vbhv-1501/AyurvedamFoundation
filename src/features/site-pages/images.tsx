"use client";

import React, { useEffect, useRef } from 'react';
import BodyClassManager from '@/components/BodyClassManager';

const galleryImages = [
  "/uploads/2025/03/1F5A4353-scaled.jpg",
  "/uploads/2025/03/1F5A4602-scaled.jpg",
  "/uploads/2025/03/1F5A4607-scaled.jpg",
  "/uploads/2025/03/DSC_7395-scaled.jpg",
  "/uploads/2025/03/eventum-img39.jpg",
  "/uploads/2025/03/IMG-20250319-WA0038.jpg",
  "/uploads/2025/03/IMG-20250319-WA0042.jpg",
  "/uploads/2025/03/IMG-20250319-WA0040.jpg",
  "/uploads/2025/03/IMG-20250319-WA0039.jpg",
  "/uploads/2025/03/eventum-img40.jpg",
  "/uploads/2025/03/IMG-20250319-WA0043.jpg",
  "/uploads/2025/03/IMG-20250319-WA0044.jpg",
  "/uploads/2025/03/IMG-20250319-WA0045.jpg",
  "/uploads/2025/03/IMG-20250319-WA0046-1.jpg",
  "/uploads/2025/03/IMG-20250319-WA0059.jpg",
  "/uploads/2025/03/IMG-20250319-WA0065.jpg",
  "/uploads/2025/03/IMG-20250319-WA0064.jpg",
  "/uploads/2025/03/IMG-20250319-WA0063.jpg",
  "/uploads/2025/03/IMG-20250319-WA0062.jpg",
  "/uploads/2025/03/IMG-20250319-WA0061-1.jpg",
  "/uploads/2025/03/IMG-20250319-WA0060-1.jpg",
  "/uploads/2025/03/IMG-20250319-WA0068.jpg",
  "/uploads/2025/03/IMG-20250319-WA0067.jpg",
  "/uploads/2025/03/IMG-20250319-WA0066.jpg",
  "/uploads/2025/03/IMG-20250319-WA0046-2.jpg",
  "/uploads/2025/03/IMG-20250319-WA0059-1.jpg",
  "/uploads/2025/03/IMG-20250319-WA0071.jpg",
  "/uploads/2025/03/IMG-20250319-WA0072.jpg",
  "/uploads/2025/03/IMG-20250319-WA0073.jpg",
  "/uploads/2025/03/IMG-20250319-WA0062-1.jpg",
  "/uploads/2025/03/IMG-20250319-WA0061-2.jpg",
  "/uploads/2025/03/IMG-20250319-WA0074.jpg",
  "/uploads/2025/03/IMG-20250319-WA0077.jpg",
  "/uploads/2025/03/IMG-20250319-WA0078.jpg",
  "/uploads/2025/03/IMG-20250319-WA0079-1.jpg",
  "/uploads/2025/03/IMG-20250319-WA0083.jpg",
  "/uploads/2025/03/IMG-20250319-WA0084.jpg",
  "/uploads/2025/03/IMG-20250319-WA0085.jpg"
];

function GallerySection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const grid = gridRef.current;
    const cols = colRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!root || !grid || cols.length === 0) return;

    const syncGalleryHeight = () => {
      const stageHeight = window.innerHeight;
      const tallestColumn = Math.max(...cols.map((column, index) => column.scrollHeight * (index === 1 ? 1.14 : .925)));
      const requiredTravel = Math.max(0, tallestColumn - stageHeight * .32);
      root.style.setProperty("--ay-gallery-height", `${Math.ceil(stageHeight + requiredTravel + 320)}px`);
    };

    const update = () => {
      const rect = root.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const entrance = Math.min(1, progress / .28);
      
      grid.style.transform = `translateX(-50%) rotateX(${75 - entrance * 75}deg) scale(${1.2 - entrance * .2})`;
      
      cols.forEach((column, index) => {
        const finalScale = index === 1 ? 1.14 : .925;
        const travel = Math.max(0, column.scrollHeight * finalScale - window.innerHeight * .32);
        const offset = index === 1 ? 130 : index === 2 ? -66 : -10;
        const columnScale = index === 1 ? 1 + progress * .14 : 1 - progress * .075;
        column.style.transform = `translateY(${offset - progress * travel}px) scale(${columnScale})`;
      });
    };

    let frame = 0;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          update();
          frame = 0;
        });
      }
    };

    const onResize = () => {
      syncGalleryHeight();
      update();
    };

    syncGalleryHeight();
    update();
    
    const t = setTimeout(onResize, 350);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const observer = new ResizeObserver(onResize);
    cols.forEach(col => observer.observe(col));

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const col1 = galleryImages.filter((_, idx) => idx % 3 === 0);
  const col2 = galleryImages.filter((_, idx) => idx % 3 === 1);
  const col3 = galleryImages.filter((_, idx) => idx % 3 === 2);

  return (
    <section ref={rootRef} className="ay-scroll-gallery" aria-label="Ayurvedam Foundation gallery">
      <div className="ay-scroll-copy">
        <span>Ayurvedam Foundation archive</span>
        <h2 className="no-split">Stories of <em>learning,<br/>service &amp; celebration.</em></h2>
        <p>Scroll through the complete visual record of our shared Ayurvedic journey.</p>
      </div>
      <div className="ay-scroll-stage">
        <div ref={gridRef} className="ay-scroll-grid">
          <div ref={el => { colRefs.current[0] = el; }} className="ay-scroll-column ay-scroll-column-1">
            {col1.map((src, idx) => (
              <a key={idx} className="ay-scroll-image" href={src} data-image-index={idx * 3} aria-label="Open gallery image">
                <img src={src} alt="Ayurvedam Foundation event moment" loading="lazy" />
              </a>
            ))}
          </div>
          <div ref={el => { colRefs.current[1] = el; }} className="ay-scroll-column ay-scroll-column-2">
            {col2.map((src, idx) => (
              <a key={idx} className="ay-scroll-image" href={src} data-image-index={idx * 3 + 1} aria-label="Open gallery image">
                <img src={src} alt="Ayurvedam Foundation event moment" loading="lazy" />
              </a>
            ))}
          </div>
          <div ref={el => { colRefs.current[2] = el; }} className="ay-scroll-column ay-scroll-column-3">
            {col3.map((src, idx) => (
              <a key={idx} className="ay-scroll-image" href={src} data-image-index={idx * 3 + 2} aria-label="Open gallery image">
                <img src={src} alt="Ayurvedam Foundation event moment" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <BodyClassManager className="wp-singular page-template page-template-elementor_header_footer page page-id-88 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor theme-hello-elementor woocommerce-no-js hello-elementor-default elementor-default elementor-template-full-width elementor-kit-26 elementor-page elementor-page-88" />
      <style id="custom-responsive-gallery-grid" dangerouslySetInnerHTML={{
        __html: `
          .elementor-gallery__container {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            grid-gap: 20px !important;
            width: 100% !important;
          }
          @media (max-width: 1024px) {
            .elementor-gallery__container {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-gap: 10px !important;
            }
          }
          @media (max-width: 767px) {
            .elementor-gallery__container {
              grid-template-columns: repeat(3, 1fr) !important;
              grid-gap: 10px !important;
            }
          }
          .e-gallery-image {
            display: block !important;
            width: 100% !important;
            height: 0 !important;
            padding-bottom: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            opacity: 1 !important;
            transform: none !important;
          }
        `
      }} />
      
      <div dangerouslySetInnerHTML={{ __html: `<a class="skip-link screen-reader-text" href="#content">Skip to content</a>
<header class="elementor elementor-113 elementor-location-header" data-elementor-id="113" data-elementor-post-type="elementor_library" data-elementor-type="header">
<section class="elementor-section elementor-top-section elementor-element elementor-element-3040c7d5 elementor-section-content-middle elementor-hidden-mobile elementor-hidden-desktop elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="3040c7d5" data-settings='{"background_background":"gradient"}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-10fafc90 elementor-hidden-mobile" data-e-type="column" data-element_type="column" data-id="10fafc90">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-5ba6f6eb elementor-view-stacked elementor-position-inline-start elementor-widget__width-auto elementor-shape-circle elementor-mobile-position-block-start elementor-widget elementor-widget-icon-box" data-e-type="widget" data-element_type="widget" data-id="5ba6f6eb" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-icon">
<span class="elementor-icon">
<i aria-hidden="true" class="icon icon-phone1"></i> </span>
</div>
<div class="elementor-icon-box-content">
<h6 class="elementor-icon-box-title">
<span>
							PHONE NUMBER :						</span>
</h6>
<p class="elementor-icon-box-description">
						+91 8318714809					</p>
</div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-1d555a60 elementor-view-stacked elementor-position-inline-start elementor-widget__width-auto elementor-shape-circle elementor-mobile-position-block-start elementor-widget elementor-widget-icon-box" data-e-type="widget" data-element_type="widget" data-id="1d555a60" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-icon">
<span class="elementor-icon">
<i aria-hidden="true" class="icon icon-envelope11"></i> </span>
</div>
<div class="elementor-icon-box-content">
<h6 class="elementor-icon-box-title">
<span>
							EMAIL ADDRESS :						</span>
</h6>
<p class="elementor-icon-box-description">
						info@ayurvedamfoundation.org					</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-379c451a" data-e-type="column" data-element_type="column" data-id="379c451a">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-47d501db e-grid-align-right e-grid-align-mobile-left elementor-widget__width-auto elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-e-type="widget" data-element_type="widget" data-id="47d501db" data-widget_type="social-icons.default">
<div class="elementor-widget-container">
<div class="elementor-social-icons-wrapper elementor-grid" role="list">
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-repeater-item-0448771" href="https://www.facebook.com/ayurvedamfoundation" target="_blank">
<span class="elementor-screen-only">Facebook</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-facebook" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-adb5148" href="https://www.youtube.com/@AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Youtube</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-youtube" viewbox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-2841575" href="https://www.instagram.com/AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Instagram</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-instagram" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-5545b7f" href="http://www.linkedin.com/AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Linkedin</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-linkedin" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg> </a>
</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-top-section elementor-element elementor-element-29abb3aa elementor-section-content-middle elementor-section-full_width elementor-section-stretched elementor-hidden-mobile elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="29abb3aa" data-settings='{"background_background":"classic","stretch_section":"section-stretched","sticky":"top","sticky_on":["desktop","tablet","mobile"],"sticky_offset":0,"sticky_effects_offset":0,"sticky_anchor_link_offset":0}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-577dd94d" data-e-type="column" data-element_type="column" data-id="577dd94d">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-51fd9c4 elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="51fd9c4" data-widget_type="image.default">
<div class="elementor-widget-container">
<img alt="" class="attachment-large size-large wp-image-118" fetchpriority="high" height="875" sizes="(max-width: 586px) 100vw, 586px" src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" srcset="/uploads/2025/03/Untitled-design-6-e1742823184130.png 586w, /uploads/2025/03/Untitled-design-6-e1742823184130-201x300.png 201w" width="586"/> </div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-d79a3df" data-e-type="column" data-element_type="column" data-id="d79a3df" data-settings='{"background_background":"classic"}'>
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-background-overlay"></div>
<div class="elementor-element elementor-element-7c7bfefa elementor-nav-menu__align-center elementor-nav-menu--stretch elementor-nav-menu__text-align-center elementor-nav-menu--dropdown-tablet elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-e-type="widget" data-element_type="widget" data-id="7c7bfefa" data-settings='{"full_width":"stretch","layout":"horizontal","submenu_icon":{"value":"&lt;svg aria-hidden=\"true\" class=\"e-font-icon-svg e-fas-caret-down\" viewBox=\"0 0 320 512\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"&gt;&lt;path d=\"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z\"&gt;&lt;\/path&gt;&lt;\/svg&gt;","library":"fa-solid"},"toggle":"burger"}' data-widget_type="nav-menu.default">
<div class="elementor-widget-container">
<nav aria-label="Menu" class="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-none">
<ul class="elementor-nav-menu" id="menu-1-7c7bfefa"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-157"><a class="elementor-sub-item" href="/organising-team">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-88 current_page_item menu-item-106"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/images/">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us">CONTACT US</a></li>
</ul> </nav>
<div aria-expanded="false" aria-label="Menu Toggle" class="elementor-menu-toggle" role="button" tabindex="0">
<svg aria-hidden="true" class="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path></svg><svg aria-hidden="true" class="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path></svg> </div>
<nav aria-hidden="true" class="elementor-nav-menu--dropdown elementor-nav-menu__container">
<ul class="elementor-nav-menu" id="menu-2-7c7bfefa"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../" tabindex="-1">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us" tabindex="-1">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-157"><a class="elementor-sub-item" href="/organising-team" tabindex="-1">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors" tabindex="-1">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners" tabindex="-1">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava" tabindex="-1">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf" tabindex="-1">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025" tabindex="-1">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf" tabindex="-1">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing" tabindex="-1">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026" tabindex="-1">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk" tabindex="-1">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view" tabindex="-1">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register" tabindex="-1">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP" tabindex="-1">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from" tabindex="-1">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors" tabindex="-1">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us" tabindex="-1">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper" tabindex="-1">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-88 current_page_item menu-item-106"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/images/" tabindex="-1">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/" tabindex="-1">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us" tabindex="-1">CONTACT US</a></li>
</ul> </nav>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-723752a5" data-e-type="column" data-element_type="column" data-id="723752a5">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-68c93c94 elementor-align-left elementor-tablet-align-justify elementor-mobile-align-right elementor-widget elementor-widget-button" data-e-type="widget" data-element_type="widget" data-id="68c93c94" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<a class="elementor-button elementor-button-link elementor-size-sm" href="/ayurved-yashobhoomi-2026/#ayv-register">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">REGISTRATION </span>
</span>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-top-section elementor-element elementor-element-cec1459 elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="cec1459" data-settings='{"background_background":"classic"}'>
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c5ce8ab" data-e-type="column" data-element_type="column" data-id="c5ce8ab">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-3aae236 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="3aae236" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-email"></i> </span>
<span class="elementor-icon-list-text">info@ayurvedamfoundation.org</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-phone-call"></i> </span>
<span class="elementor-icon-list-text">+91 8318714809</span>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7abb484" data-e-type="column" data-element_type="column" data-id="7abb484">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-d37b005 elementor-align-left elementor-tablet-align-justify elementor-mobile-align-right elementor-widget elementor-widget-button" data-e-type="widget" data-element_type="widget" data-id="d37b005" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<a class="elementor-button elementor-button-link elementor-size-sm" href="/contact-us">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">registration</span>
</span>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-top-section elementor-element elementor-element-cfda5dd elementor-hidden-desktop elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="cfda5dd">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7c27b5a" data-e-type="column" data-element_type="column" data-id="7c27b5a">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-e49e989 elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="e49e989" data-widget_type="image.default">
<div class="elementor-widget-container">
<a href="../">
<img alt="" class="attachment-full size-full wp-image-118" height="875" sizes="(max-width: 586px) 100vw, 586px" src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" srcset="/uploads/2025/03/Untitled-design-6-e1742823184130.png 586w, /uploads/2025/03/Untitled-design-6-e1742823184130-201x300.png 201w" width="586"/> </a>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-c07bb39" data-e-type="column" data-element_type="column" data-id="c07bb39">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-651e496 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="651e496" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h2 class="elementor-heading-title elementor-size-default">ayurvedam foundation</h2> </div>
</div>
<div class="elementor-element elementor-element-b8320eb elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="b8320eb" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<p>A Unit of Indudevi Charitable Foundation</p> </div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-71e2620" data-e-type="column" data-element_type="column" data-id="71e2620">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-7e44fb0 elementor-nav-menu--stretch elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-e-type="widget" data-element_type="widget" data-id="7e44fb0" data-settings='{"full_width":"stretch","layout":"horizontal","submenu_icon":{"value":"&lt;svg aria-hidden=\"true\" class=\"e-font-icon-svg e-fas-caret-down\" viewBox=\"0 0 320 512\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"&gt;&lt;path d=\"M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z\"&gt;&lt;\/path&gt;&lt;\/svg&gt;","library":"fa-solid"},"toggle":"burger"}' data-widget_type="nav-menu.default">
<div class="elementor-widget-container">
<nav aria-label="Menu" class="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade">
<ul class="elementor-nav-menu" id="menu-1-7e44fb0"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-157"><a class="elementor-sub-item" href="/organising-team">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-88 current_page_item menu-item-106"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/images/">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us">CONTACT US</a></li>
</ul> </nav>
<div aria-expanded="false" aria-label="Menu Toggle" class="elementor-menu-toggle" role="button" tabindex="0">
<svg aria-hidden="true" class="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path></svg><svg aria-hidden="true" class="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close" role="presentation" viewbox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path></svg> </div>
<nav aria-hidden="true" class="elementor-nav-menu--dropdown elementor-nav-menu__container">
<ul class="elementor-nav-menu" id="menu-2-7e44fb0"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-96"><a class="elementor-item" href="../" tabindex="-1">HOME</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-97"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">ABOUT US</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-99"><a class="elementor-sub-item" href="/about-us" tabindex="-1">ABOUT AYURVEDAM FOUNDATION</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-157"><a class="elementor-sub-item" href="/organising-team" tabindex="-1">CORE ORGANIZERS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-160"><a class="elementor-sub-item" href="/our-state-ambassadors" tabindex="-1">STATE AMBASSADORS</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-159"><a class="elementor-sub-item" href="/associating-partners" tabindex="-1">SOCIAL MEDIA PARTNERS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">OUR EVENTS</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-494"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURMAHOTSAVA 2024</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a class="elementor-sub-item" href="/about-ayurmahotsava" tabindex="-1">ABOUT AYURMAHOTSAVA 2024</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-351"><a class="elementor-sub-item" href="/uploads/2025/03/AyurMahotsav@Jaipur-2k24-✨.pdf" tabindex="-1">BROCHURE OF AYURMAHOTSAVA</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURMAHOTSAVA</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-15076"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED ANANTAM 2025</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1897"><a class="elementor-sub-item" href="/about-ayurved-anantam-2025" tabindex="-1">ABOUT AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1891"><a class="elementor-sub-item" href="/uploads/2025/04/Ayurved-Anatam-2025-✨.pdf" tabindex="-1">BROCHURE OF AYURVED ANANTAM 2025</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11392"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1wFFSu0nreCnSo8taHv0pBbCCdVOeyhRh/view?usp=sharing" tabindex="-1">Glimpse Ayurveda Anantam</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-11230"><a class="elementor-sub-item elementor-item-anchor" href="#" tabindex="-1">AYURVED APARAJITA 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11231"><a class="elementor-sub-item" href="/about-ayurved-aparajita-2026" tabindex="-1">ABOUT AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11233"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1qvl9weDaBX-FO7ZiQopKg2sz2yE3o3LW/view?usp=drivesdk" tabindex="-1">BROCHURE OF AYURVED APARAJITA 2026</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14332"><a class="elementor-sub-item" href="/glimpse-of-ayurmahotsava" tabindex="-1">GLIMPSE OF AYURVED APARAJITA 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14535"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-14508"><a class="elementor-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14536"><a class="elementor-sub-item" href="/ayurved-yashobhoomi-2026" tabindex="-1">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view" tabindex="-1">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-11232"><a class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register" tabindex="-1">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14652"><a class="elementor-sub-item" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP" tabindex="-1">BOOK ACCOMMODATION</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-14873"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">Exhibitor</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14326"><a class="elementor-sub-item" href="/exhibitor-from" tabindex="-1">Exhibitor Interest Form</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14329"><a class="elementor-sub-item" href="/exhibitors" tabindex="-1">Exhibitor Profile</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14328"><a class="elementor-sub-item" href="/why-exhibit-with-us" tabindex="-1">Why Exhibit With Us</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-14325"><a class="elementor-item" href="/call-for-paper" tabindex="-1">CALL FOR ABSTRACTS</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-88 current_page_item menu-item-106"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/images/" tabindex="-1">IMAGES</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-107"><a class="elementor-sub-item" href="/videos/" tabindex="-1">VIDEOS</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a class="elementor-item" href="/contact-us" tabindex="-1">CONTACT US</a></li>
</ul> </nav>
</div>
</div>
</div>
</div>
</div>
</section>
</header>
<div class="elementor elementor-88" data-elementor-id="88" data-elementor-post-type="page" data-elementor-type="wp-page">
<section class="elementor-section elementor-top-section elementor-element elementor-element-114f6e3d elementor-section-height-min-height elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-items-middle" data-e-type="section" data-element_type="section" data-id="114f6e3d" data-settings='{"background_background":"classic"}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-5ed1f949" data-e-type="column" data-element_type="column" data-id="5ed1f949" data-settings='{"background_background":"classic"}'>
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-35f57f1c elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="35f57f1c" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h1 class="elementor-heading-title elementor-size-default">Gallery</h1> </div>
</div>
</div>
</div>
</div>
</section>
` }} />
      
      <GallerySection />
      
      <div dangerouslySetInnerHTML={{ __html: `
</div>
<footer class="elementor elementor-166 elementor-location-footer" data-elementor-id="166" data-elementor-post-type="elementor_library" data-elementor-type="footer">
<footer class="elementor-section elementor-top-section elementor-element elementor-element-8dba296 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="8dba296" data-settings='{"background_background":"classic"}'>
<div class="elementor-background-overlay"></div>
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1dd30853" data-e-type="column" data-element_type="column" data-id="1dd30853">
<div class="elementor-widget-wrap elementor-element-populated">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-5f04329f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="5f04329f">
<div class="elementor-container elementor-column-gap-no">
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-1e6936b5" data-e-type="column" data-element_type="column" data-id="1e6936b5">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-c165e6c elementor-widget elementor-widget-image" data-e-type="widget" data-element_type="widget" data-id="c165e6c" data-widget_type="image.default">
<div class="elementor-widget-container">
<img alt="" class="attachment-full size-full wp-image-118" height="875" sizes="(max-width: 586px) 100vw, 586px" src="/uploads/2025/03/Untitled-design-6-e1742823184130.png" srcset="/uploads/2025/03/Untitled-design-6-e1742823184130.png 586w, /uploads/2025/03/Untitled-design-6-e1742823184130-201x300.png 201w" width="586"/> </div>
</div>
<div class="elementor-element elementor-element-4355cab9 elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="4355cab9" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<p>Join us as we work towards fostering a healthier, happier, and more harmonious world through Ayurveda. Let’s embark on a path of holistic healing and well-being for ourselves, our communities, and future generations.</p> </div>
</div>
<div class="elementor-element elementor-element-20f086e1 e-grid-align-left e-grid-align-mobile-left elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-e-type="widget" data-element_type="widget" data-id="20f086e1" data-widget_type="social-icons.default">
<div class="elementor-widget-container">
<div class="elementor-social-icons-wrapper elementor-grid" role="list">
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-repeater-item-320e991" href="https://www.facebook.com/ayurvedamfoundation" target="_blank">
<span class="elementor-screen-only">Facebook-f</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-facebook-f" viewbox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-dccfaf9" href="https://www.youtube.com/@AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Youtube</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-youtube" viewbox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-5cb7115" href="https://www.instagram.com/AyurvedamFoundation" target="_blank">
<span class="elementor-screen-only">Instagram</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-instagram" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg> </a>
</span>
<span class="elementor-grid-item" role="listitem">
<a class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-1491259" href="https://www.linkedin.com/AyurvedamFoundation?_l=en_US" target="_blank">
<span class="elementor-screen-only">Linkedin</span>
<svg aria-hidden="true" class="e-font-icon-svg e-fab-linkedin" viewbox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg> </a>
</span>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-7bf3b850" data-e-type="column" data-element_type="column" data-id="7bf3b850">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-706fb4ca elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="706fb4ca" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h6 class="elementor-heading-title elementor-size-default">QUICK LINKS</h6> </div>
</div>
<div class="elementor-element elementor-element-49c9b43a elementor-mobile-align-start elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="49c9b43a" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<a href="/about-us">
<span class="elementor-icon-list-text">About Our Foundations</span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/our-state-ambassadors">
<span class="elementor-icon-list-text">Our State Ambassadors</span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/contact-us">
<span class="elementor-icon-list-text">Contact Us</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-1d631f33" data-e-type="column" data-element_type="column" data-id="1d631f33">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-37235e15 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="37235e15" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h6 class="elementor-heading-title elementor-size-default">OTHER PAGES</h6> </div>
</div>
<div class="elementor-element elementor-element-2426a929 elementor-mobile-align-start elementor-align-start elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="2426a929" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<a href="/privacy-policy-2">
<span class="elementor-icon-list-text">Privacy Policy</span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/term-and-conditions">
<span class="elementor-icon-list-text">Terms &amp; Conditions </span>
</a>
</li>
<li class="elementor-icon-list-item">
<a href="/refund_returns">
<span class="elementor-icon-list-text">Refund Policy </span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-5d1ff73b" data-e-type="column" data-element_type="column" data-id="5d1ff73b">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-59520904 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="59520904" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h6 class="elementor-heading-title elementor-size-default">Get In Touch</h6> </div>
</div>
<div class="elementor-element elementor-element-193eebe elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="193eebe" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-phone-call2"></i> </span>
<span class="elementor-icon-list-text">+91 63910 53105 / +91 8318714809</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-email1"></i> </span>
<span class="elementor-icon-list-text">info@ayurvedamfoundation.org</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-email1"></i> </span>
<span class="elementor-icon-list-text">expo@ayurvedamfoundation.org</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="icon icon-map-marker1"></i> </span>
<span class="elementor-icon-list-text">SH8/3A/7K-1 Ayodhya Dham Colony, Luxmanpur, Olympian Lalit Upadhyay Gate, Shivpur Bypass Road, Shivpur, Varanasi ,Pin Code - 221003</span>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</footer>
<section class="elementor-section elementor-top-section elementor-element elementor-element-06ed12a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="06ed12a" data-settings='{"background_background":"gradient"}'>
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-9ca8ffc" data-e-type="column" data-element_type="column" data-id="9ca8ffc">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-a3dc79a elementor-mobile-align-center elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="a3dc79a" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<a href="../">
<span class="elementor-icon-list-text">© 2026 ayurvedamfoundation.org  All Rights Reserved by Indudevi Charitable foundation.</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1d13da0" data-e-type="column" data-element_type="column" data-id="1d13da0">
<div class="elementor-widget-wrap elementor-element-populated">
<div class="elementor-element elementor-element-c799a26 elementor-mobile-align-center elementor-align-end elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-e-type="widget" data-element_type="widget" data-id="c799a26" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-text"></span>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>
</footer>\`
      }} />
                                                                                                                                                                                                                                                                            </>
  );
}
` }} />
    </>
  );
}
