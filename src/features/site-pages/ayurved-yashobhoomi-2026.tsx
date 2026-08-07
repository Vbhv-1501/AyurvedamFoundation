"use client";

import { useState, useEffect } from 'react';
import BodyClassManager from '@/components/BodyClassManager';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ugQty, setUgQty] = useState(0);
  const [pgQty, setPgQty] = useState(0);

  useEffect(() => {
    // 1. Scroll reveal animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.ayv-reveal').forEach((el) => {
      observer.observe(el);
    });

    // 2. Live Countdown Timer
    const target = new Date("Dec 23, 2026 09:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const dEl = document.getElementById("ayv-d");
      const hEl = document.getElementById("ayv-h");
      const mEl = document.getElementById("ayv-m");
      const sEl = document.getElementById("ayv-s");
      
      if (dEl) dEl.innerText = String(days).padStart(2, "0");
      if (hEl) hEl.innerText = String(hours).padStart(2, "0");
      if (mEl) mEl.innerText = String(minutes).padStart(2, "0");
      if (sEl) sEl.innerText = String(seconds).padStart(2, "0");
    }, 1000);

    // 3. Document-level Capturing Click Interceptor for Modal GET TICKETS submit
    const handleTicketSubmitClick = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      
      // Identify GET TICKETS buttons
      const submitBtn = targetEl.closest('.etn-purchase-ticket-submit-btn') || 
                        targetEl.closest('.yb-ticket-submit-btn') ||
                        (targetEl.tagName === 'BUTTON' && targetEl.textContent?.trim() === 'GET TICKETS' ? targetEl : null);
      
      if (submitBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        // Query both the static Eventin inputs and our React modal inputs
        const qtyInputs = document.querySelectorAll('.ant-input-number-input, .yb-qty-input');
        
        let ugCount = 0;
        let pgCount = 0;
        
        if (qtyInputs.length >= 1) {
          ugCount = parseInt((qtyInputs[0] as HTMLInputElement).value || '0', 10);
        }
        if (qtyInputs.length >= 2) {
          pgCount = parseInt((qtyInputs[1] as HTMLInputElement).value || '0', 10);
        }
        
        // Fallback for custom React ID inputs
        if (qtyInputs.length === 0) {
          const ugInput = document.getElementById('ug-qty-input') as HTMLInputElement;
          const pgInput = document.getElementById('pg-qty-input') as HTMLInputElement;
          if (ugInput) ugCount = parseInt(ugInput.value || '0', 10);
          if (pgInput) pgCount = parseInt(pgInput.value || '0', 10);
        }
        
        // Fallback context based card parsing if counts are still zero
        if (ugCount === 0 && pgCount === 0) {
          const card = submitBtn.closest('.etn-single-event-ticket-wrap, .yb-ticket-card');
          if (card) {
            const text = card.textContent || '';
            const isUg = text.includes('UG') || text.includes('Undergraduate') || text.includes('Scholars & Interns');
            const qtyInput = card.querySelector('input');
            const qty = qtyInput ? parseInt(qtyInput.value || '0', 10) : 1;
            if (isUg) ugCount = qty;
            else pgCount = qty;
          }
        }
        
        // Redirect to booking details screen
        window.location.href = `/event-booking?ug=${ugCount}&pg=${pgCount}`;
      }
    };

    document.addEventListener('click', handleTicketSubmitClick, true);

    return () => {
      observer.disconnect();
      clearInterval(timer);
      document.removeEventListener('click', handleTicketSubmitClick, true);
    };
  }, []);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    // 1. Check if clicked on or inside a link to register
    const anchor = target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && (href === '#ayv-register' || href === '/ayurved-yashobhoomi-2026/#ayv-register' || href.endsWith('#ayv-register'))) {
        e.preventDefault();
        setIsModalOpen(true);
        return;
      }
    }
    
    // 2. Check if clicked on or inside a button with class 'openTicketModalBtn'
    const btn = target.closest('.openTicketModalBtn');
    if (btn) {
      e.preventDefault();
      setIsModalOpen(true);
      return;
    }
  };

  return (
    <div onClick={handlePageClick}>
      <BodyClassManager className="wp-singular page-template page-template-elementor_header_footer page page-id-14371 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor theme-hello-elementor woocommerce-no-js hello-elementor-default elementor-default elementor-template-full-width elementor-kit-26 elementor-page elementor-page-14371" />
      
            <link rel="stylesheet" id="swiper-bundle-min-css" href="/css/eventin-swiper-bundle.css" media="all" />
      <link rel="stylesheet" id="etn-blocks-style-css" href="/css/eventin-etn-block-styles.css" media="all" />
      <link rel="stylesheet" id="woocommerce-layout-css" href="/css/woocommerce-woocommerce-layout.css" media="all" />
      <link rel="stylesheet" id="woocommerce-smallscreen-css" href="/css/woocommerce-woocommerce-smallscreen.css" media="only screen and (max-width: 768px)" />
      <link rel="stylesheet" id="woocommerce-general-css" href="/css/woocommerce-woocommerce.css" media="all" />
      <link rel="stylesheet" id="etn-icon-css" href="/css/eventin-etn-icon.css" media="all" />
      <link rel="stylesheet" id="etn-public-css-css" href="/css/eventin-event-manager-public-styles.css" media="all" />
      <link rel="stylesheet" id="hello-elementor-css" href="/css/hello-reset.css" media="all" />
      <link rel="stylesheet" id="hello-elementor-theme-style-css" href="/css/hello-theme.css" media="all" />
      <link rel="stylesheet" id="hello-elementor-header-footer-css" href="/css/hello-header-footer.css" media="all" />
      <link rel="stylesheet" id="elementor-frontend-css" href="/css/elementor-frontend.css" media="all" />
      <link rel="stylesheet" id="elementor-post-26-css" href="/css/elementor-post-26.css" media="all" />
      <link rel="stylesheet" id="widget-icon-box-css" href="/css/elementor-widget-icon-box.css" media="all" />
      <link rel="stylesheet" id="widget-social-icons-css" href="/css/elementor-widget-social-icons.css" media="all" />
      <link rel="stylesheet" id="e-apple-webkit-css" href="/css/elementor-apple-webkit.css" media="all" />
      <link rel="stylesheet" id="widget-image-css" href="/css/elementor-widget-image.css" media="all" />
      <link rel="stylesheet" id="widget-nav-menu-css" href="/css/elementor-pro-widget-nav-menu.css" media="all" />
      <link rel="stylesheet" id="e-sticky-css" href="/css/elementor-pro-sticky.css" media="all" />
      <link rel="stylesheet" id="widget-icon-list-css" href="/css/elementor-widget-icon-list.css" media="all" />
      <link rel="stylesheet" id="widget-heading-css" href="/css/elementor-widget-heading.css" media="all" />
      <link rel="stylesheet" id="elementor-post-14371-css" href="/css/elementor-post-14371.css" media="all" />
      <link rel="stylesheet" id="elementor-post-113-css" href="/css/elementor-post-113.css" media="all" />
      <link rel="stylesheet" id="elementor-post-166-css" href="/css/elementor-post-166.css" media="all" />
      <link rel="stylesheet" id="etn-jquery-countdown-css" href="/css/eventin-jquery.countdown.css" media="all" />
      <link rel="stylesheet" id="etn-public-css" href="/css/eventin-etn-public.css" media="all" />
      <link rel="stylesheet" id="wp-components-css" href="/css/style-style.css" media="all" />
      <link rel="stylesheet" id="wp-preferences-css" href="/css/style-style.css" media="all" />
      <link rel="stylesheet" id="wp-block-editor-css" href="/css/style-style.css" media="all" />
      <link rel="stylesheet" id="ekit-widget-styles-css" href="/css/ekit-widget-styles.css" media="all" />
      <link rel="stylesheet" id="ekit-responsive-css" href="/css/ekit-responsive.css" media="all" />
      <link rel="stylesheet" id="elementor-gf-local-poppins-css" href="/css/elementor-poppins.css" media="all" />
      <link rel="stylesheet" id="elementor-gf-local-mulish-css" href="/css/elementor-mulish.css" media="all" />
      <link rel="stylesheet" id="elementor-gf-nokora-css" href="https://fonts.googleapis.com/css?family=Nokora:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap" media="all" />
      <link rel="stylesheet" id="elementor-icons-ekiticons-css" href="/css/ekit-ekiticons.css" media="all" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Eczar:wght@500;600;700;800&family=Jost:wght@300;400;500;600;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&family=Yatra+One&family=JetBrains+Mono:wght@500;600&display=swap" media="print" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Eczar:wght@500;600;700;800&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&family=Yatra+One&family=JetBrains+Mono:wght@500;600&display=swap" media="all" />
      <link rel="stylesheet" id="wc-blocks-style-css" href="/css/woocommerce-wc-blocks.css" media="all" />
      <style id="wp-img-auto-sizes-contain-inline-css" dangerouslySetInnerHTML={{
        __html: `
img:is([sizes=auto i],[sizes^="auto," i]){contain-intrinsic-size:3000px 1500px}
/*# sourceURL=wp-img-auto-sizes-contain-inline-css */
`
      }} />
      <style id="wp-emoji-styles-inline-css" dangerouslySetInnerHTML={{
        __html: `

	img.wp-smiley, img.emoji {
		display: inline !important;
		border: none !important;
		box-shadow: none !important;
		height: 1em !important;
		width: 1em !important;
		margin: 0 0.07em !important;
		vertical-align: -0.1em !important;
		background: none !important;
		padding: 0 !important;
	}
/*# sourceURL=wp-emoji-styles-inline-css */
`
      }} />
      <style id="global-styles-inline-css" dangerouslySetInnerHTML={{
        __html: `
:root{--wp--preset--aspect-ratio--square: 1;--wp--preset--aspect-ratio--4-3: 4/3;--wp--preset--aspect-ratio--3-4: 3/4;--wp--preset--aspect-ratio--3-2: 3/2;--wp--preset--aspect-ratio--2-3: 2/3;--wp--preset--aspect-ratio--16-9: 16/9;--wp--preset--aspect-ratio--9-16: 9/16;--wp--preset--color--black: #000000;--wp--preset--color--cyan-bluish-gray: #abb8c3;--wp--preset--color--white: #ffffff;--wp--preset--color--pale-pink: #f78da7;--wp--preset--color--vivid-red: #cf2e2e;--wp--preset--color--luminous-vivid-orange: #ff6900;--wp--preset--color--luminous-vivid-amber: #fcb900;--wp--preset--color--light-green-cyan: #7bdcb5;--wp--preset--color--vivid-green-cyan: #00d084;--wp--preset--color--pale-cyan-blue: #8ed1fc;--wp--preset--color--vivid-cyan-blue: #0693e3;--wp--preset--color--vivid-purple: #9b51e0;--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgb(6,147,227) 0%,rgb(155,81,224) 100%);--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgb(252,185,0) 0%,rgb(255,105,0) 100%);--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgb(255,105,0) 0%,rgb(207,46,46) 100%);--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);--wp--preset--font-size--small: 13px;--wp--preset--font-size--medium: 20px;--wp--preset--font-size--large: 36px;--wp--preset--font-size--x-large: 42px;--wp--preset--spacing--20: 0.44rem;--wp--preset--spacing--30: 0.67rem;--wp--preset--spacing--40: 1rem;--wp--preset--spacing--50: 1.5rem;--wp--preset--spacing--60: 2.25rem;--wp--preset--spacing--70: 3.38rem;--wp--preset--spacing--80: 5.06rem;--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);--wp--preset--shadow--outlined: 6px 6px 0px -3px rgb(255, 255, 255), 6px 6px rgb(0, 0, 0);--wp--preset--shadow--crisp: 6px 6px 0px rgb(0, 0, 0);}:root { --wp--style--global--content-size: 800px;--wp--style--global--wide-size: 1200px; }:where(body) { margin: 0; }.wp-site-blocks > .alignleft { float: left; margin-right: 2em; }.wp-site-blocks > .alignright { float: right; margin-left: 2em; }.wp-site-blocks > .aligncenter { justify-content: center; margin-left: auto; margin-right: auto; }:where(.wp-site-blocks) > * { margin-block-start: 24px; margin-block-end: 0; }:where(.wp-site-blocks) > :first-child { margin-block-start: 0; }:where(.wp-site-blocks) > :last-child { margin-block-end: 0; }:root { --wp--style--block-gap: 24px; }:root :where(.is-layout-flow) > :first-child{margin-block-start: 0;}:root :where(.is-layout-flow) > :last-child{margin-block-end: 0;}:root :where(.is-layout-flow) > *{margin-block-start: 24px;margin-block-end: 0;}:root :where(.is-layout-constrained) > :first-child{margin-block-start: 0;}:root :where(.is-layout-constrained) > :last-child{margin-block-end: 0;}:root :where(.is-layout-constrained) > *{margin-block-start: 24px;margin-block-end: 0;}:root :where(.is-layout-flex){gap: 24px;}:root :where(.is-layout-grid){gap: 24px;}.is-layout-flow > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}.is-layout-flow > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}.is-layout-flow > .aligncenter{margin-left: auto !important;margin-right: auto !important;}.is-layout-constrained > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}.is-layout-constrained > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}.is-layout-constrained > .aligncenter{margin-left: auto !important;margin-right: auto !important;}.is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width: var(--wp--style--global--content-size);margin-left: auto !important;margin-right: auto !important;}.is-layout-constrained > .alignwide{max-width: var(--wp--style--global--wide-size);}body .is-layout-flex{display: flex;}.is-layout-flex{flex-wrap: wrap;align-items: center;}.is-layout-flex > :is(*, div){margin: 0;}body .is-layout-grid{display: grid;}.is-layout-grid > :is(*, div){margin: 0;}body{padding-top: 0px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;}:root :where(.wp-element-button, .wp-block-button__link){background-color: #32373c;border-width: 0;color: #fff;font-family: inherit;font-size: inherit;font-style: inherit;font-weight: inherit;letter-spacing: inherit;line-height: inherit;padding-top: calc(0.667em + 2px);padding-right: calc(1.333em + 2px);padding-bottom: calc(0.667em + 2px);padding-left: calc(1.333em + 2px);text-decoration: none;text-transform: inherit;}.has-black-color{color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-color{color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-color{color: var(--wp--preset--color--white) !important;}.has-pale-pink-color{color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-color{color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-color{color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-color{color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-color{color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-color{color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-color{color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-color{color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-color{color: var(--wp--preset--color--vivid-purple) !important;}.has-black-background-color{background-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-background-color{background-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-background-color{background-color: var(--wp--preset--color--white) !important;}.has-pale-pink-background-color{background-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-background-color{background-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-background-color{background-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-background-color{background-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-background-color{background-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-background-color{background-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-background-color{background-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-background-color{background-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-background-color{background-color: var(--wp--preset--color--vivid-purple) !important;}.has-black-border-color{border-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-border-color{border-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-border-color{border-color: var(--wp--preset--color--white) !important;}.has-pale-pink-border-color{border-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-border-color{border-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-border-color{border-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-border-color{border-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-border-color{border-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-border-color{border-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-border-color{border-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-border-color{border-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-border-color{border-color: var(--wp--preset--color--vivid-purple) !important;}.has-vivid-cyan-blue-to-vivid-purple-gradient-background{background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;}.has-light-green-cyan-to-vivid-green-cyan-gradient-background{background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;}.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;}.has-luminous-vivid-orange-to-vivid-red-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;}.has-very-light-gray-to-cyan-bluish-gray-gradient-background{background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;}.has-cool-to-warm-spectrum-gradient-background{background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;}.has-blush-light-purple-gradient-background{background: var(--wp--preset--gradient--blush-light-purple) !important;}.has-blush-bordeaux-gradient-background{background: var(--wp--preset--gradient--blush-bordeaux) !important;}.has-luminous-dusk-gradient-background{background: var(--wp--preset--gradient--luminous-dusk) !important;}.has-pale-ocean-gradient-background{background: var(--wp--preset--gradient--pale-ocean) !important;}.has-electric-grass-gradient-background{background: var(--wp--preset--gradient--electric-grass) !important;}.has-midnight-gradient-background{background: var(--wp--preset--gradient--midnight) !important;}.has-small-font-size{font-size: var(--wp--preset--font-size--small) !important;}.has-medium-font-size{font-size: var(--wp--preset--font-size--medium) !important;}.has-large-font-size{font-size: var(--wp--preset--font-size--large) !important;}.has-x-large-font-size{font-size: var(--wp--preset--font-size--x-large) !important;}
:root :where(.wp-block-icon svg){width: 24px;}
:root :where(.wp-block-pullquote){font-size: 1.5em;line-height: 1.6;}
/*# sourceURL=global-styles-inline-css */
`
      }} />
      <style id="woocommerce-inline-inline-css" dangerouslySetInnerHTML={{
        __html: `
.woocommerce form .form-row .required { visibility: visible; }
/*# sourceURL=woocommerce-inline-inline-css */
`
      }} />
      <style id="style-inline-ayurved-yashobhoomi-2026-4" dangerouslySetInnerHTML={{
        __html: `.woocommerce-product-gallery{ opacity: 1 !important; }`
      }} />
      <style id="style-inline-ayurved-yashobhoomi-2026-5" dangerouslySetInnerHTML={{
        __html: `
				.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload),
				.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) * {
					background-image: none !important;
				}
				@media screen and (max-height: 1024px) {
					.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload),
					.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload) * {
						background-image: none !important;
					}
				}
				@media screen and (max-height: 640px) {
					.e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload),
					.e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload) * {
						background-image: none !important;
					}
				}
			`
      }} />
      <style id="wp-custom-css" dangerouslySetInnerHTML={{
        __html: `


/** Start Block Kit CSS: 144-3-3a7d335f39a8579c20cdf02f8d462582 **/

.envato-block__preview{overflow: visible;}

/* Envato Kit 141 Custom Styles - Applied to the element under Advanced */

.elementor-headline-animation-type-drop-in .elementor-headline-dynamic-wrapper{
	text-align: center;
}
.envato-kit-141-top-0 h1,
.envato-kit-141-top-0 h2,
.envato-kit-141-top-0 h3,
.envato-kit-141-top-0 h4,
.envato-kit-141-top-0 h5,
.envato-kit-141-top-0 h6,
.envato-kit-141-top-0 p {
	margin-top: 0;
}

.envato-kit-141-newsletter-inline .elementor-field-textual.elementor-size-md {
	padding-left: 1.5rem;
	padding-right: 1.5rem;
}

.envato-kit-141-bottom-0 p {
	margin-bottom: 0;
}

.envato-kit-141-bottom-8 .elementor-price-list .elementor-price-list-item .elementor-price-list-header {
	margin-bottom: .5rem;
}

.envato-kit-141.elementor-widget-testimonial-carousel.elementor-pagination-type-bullets .swiper-container {
	padding-bottom: 52px;
}

.envato-kit-141-display-inline {
	display: inline-block;
}

.envato-kit-141 .elementor-slick-slider ul.slick-dots {
	bottom: -40px;
}

/** End Block Kit CSS: 144-3-3a7d335f39a8579c20cdf02f8d462582 **/





.ant-select-selection-search-input {
    opacity: 1 !important;
    pointer-events: auto !important;
}






















































/* ===== APPLY ONLY ON CERTIFICATE PAGE ===== */
.certificate-page .eventin-certificate-wrapper {
    width: 1900px !important;
    height: auto !important;
    margin: 0 auto;
    position: relative;
    overflow: visible !important;
}

/* ===== IMAGE FULL RESOLUTION ===== */
.certificate-page .eventin-certificate img,
.certificate-page .elementor-widget-image img {
    width: 1900px !important;
    height: auto !important;
    max-width: none !important;
    display: block;
}

/* ===== FIX NAME POSITION ===== */
.certificate-page .eventin-certificate-wrapper .elementor-heading-title {
    position: absolute !important;
    top: 820px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;

    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.2;
}

/* ===== REMOVE SPACE (ONLY INSIDE CERTIFICATE) ===== */
.certificate-page .eventin-certificate-wrapper .elementor-section,
.certificate-page .eventin-certificate-wrapper .elementor-container,
.certificate-page .eventin-certificate-wrapper .elementor-column {
    margin: 0 !important;
    padding: 0 !important;
}

/* ===== PDF FIX ===== */
@media print {
    .certificate-page .eventin-certificate-wrapper {
        width: 1900px !important;
        height: auto !important;
        overflow: visible !important;
        page-break-inside: avoid;
    }
}

/* ===== PREVENT BLUR ===== */
.certificate-page .eventin-certificate,
.certificate-page .eventin-certificate-wrapper {
    transform: none !important;
}














`
      }} />
      <style id="style-inline-ayurved-yashobhoomi-2026-7" dangerouslySetInnerHTML={{
        __html: `
  #ayv-root{
    --ivory:#FBF6EC;
    --card:#FFFDF8;
    --forest:#5C1130;      
    --forest-deep:#33081A; 
    --maroon:#7A1B3D;      
    --terracotta:#9C2247;  
    --gold:#C9924E;        
    --teal:#D6376F;        
    --ink:#2A1018;
    font-family:'Jost',sans-serif;
    color:var(--ink);
    background:var(--ivory);
    overflow-x:hidden;
    position:relative;
  }
  #ayv-root *{box-sizing:border-box;}
  #ayv-root h1,#ayv-root h2,#ayv-root h3{font-family:'Cormorant Garamond',serif;margin:0;line-height:1.1;font-weight:700;}
  #ayv-root .ayv-deva{font-family:'Eczar',serif;font-weight:700;}
  #ayv-root .ayv-wrap{max-width:1180px;margin:0 auto;padding:0 28px;}
  #ayv-root .ayv-eyebrow{
    display:inline-flex;align-items:center;gap:10px;
    font-family:'Jost',sans-serif;font-size:14px;letter-spacing:.2em;text-transform:uppercase;
    color:var(--terracotta);font-weight:600;margin-bottom:14px;
  }
  #ayv-root .ayv-eyebrow::before{content:"";width:26px;height:1px;background:var(--terracotta);display:inline-block;}
  #ayv-root section{position:relative;padding:96px 0;}
  #ayv-root .ayv-reveal{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1); will-change: opacity, transform;}
  #ayv-root .ayv-reveal.is-in{opacity:1;transform:translateY(0);}
  #ayv-root .ayv-btn{
    display:inline-flex;align-items:center;gap:10px;
    background:var(--maroon);color:#fff;font-weight:600;font-size:16px;letter-spacing:.02em;
    padding:17px 34px;border-radius:40px;text-decoration:none;border:none;cursor:pointer;
    box-shadow:0 10px 28px -8px rgba(110,20,35,.55);
    transition:transform .35s ease, box-shadow .35s ease, background .35s ease;
  }
  #ayv-root .ayv-btn:hover{transform:translateY(-3px);box-shadow:0 16px 34px -8px rgba(110,20,35,.6);background:#7c1a2c;color:#fff;}
  #ayv-root .ayv-btn.ayv-ghost{background:transparent;border:1.5px solid rgba(255,255,255,.6);color:#fff;box-shadow:none;}
  #ayv-root .ayv-btn.ayv-ghost:hover{background:rgba(255,255,255,.12);}

  /* ---------- HERO ---------- */
  #ayv-hero{
    background:radial-gradient(120% 140% at 18% 0%, #8E1B41 0%, var(--forest) 45%, var(--forest-deep) 100%);
    color:#fff;padding:90px 0 70px;overflow:hidden;
  }
  #ayv-hero .ayv-leaf{position:absolute;opacity:.16;filter:saturate(1.4);animation:ayv-float 14s ease-in-out infinite;}
  #ayv-hero .ayv-leaf svg{width:100%;height:100%;display:block;}
  @keyframes ayv-float{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-26px) rotate(8deg);}}
  #ayv-hero .ayv-glow{position:absolute;border-radius:50%;filter:blur(60px);opacity:.35;pointer-events:none;}
  #ayv-hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:46px;align-items:center;position:relative;z-index:2;}
  #ayv-hero .ayv-kicker{font-family:'Jost';letter-spacing:.28em;text-transform:uppercase;font-size:13.5px;color:#E7C873;opacity:.9;margin-bottom:18px;}
  #ayv-hero h1.ayv-title-en{font-size:clamp(38px,5vw,66px);font-weight:700;color:#fff;margin-bottom:18px;letter-spacing:-.01em;}
  #ayv-hero .ayv-title-hi{
    font-family:'Eczar',serif;font-weight:700;font-size:clamp(46px,6.5vw,80px);line-height:1.35;
    color:#F3D58A;
    text-shadow:0 2px 18px rgba(0,0,0,.35);
    margin:0 0 26px;padding-top:8px;display:block;letter-spacing:.01em;
  }
  #ayv-hero .ayv-sub{font-size:18.5px;line-height:1.68;color:#EAE3DC;max-width:560px;margin-bottom:32px;}
  #ayv-hero .ayv-meta{display:flex;gap:22px;flex-wrap:wrap;margin-bottom:34px;}
  #ayv-hero .ayv-meta-pill{
    display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.18);padding:11px 20px;border-radius:30px;font-size:15px;backdrop-filter:blur(6px);
  }
  #ayv-hero .ayv-meta-pill b{color:#F2C572;}
  #ayv-hero .ayv-cta-row{display:flex;gap:16px;flex-wrap:wrap;}
  #ayv-hero .ayv-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:46px;}
  #ayv-hero .ayv-stat{
    background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:16px;
    padding:16px 10px;text-align:center;backdrop-filter:blur(8px);
  }
  #ayv-hero .ayv-stat .n{font-family:'Cormorant Garamond';font-size:32px;font-weight:700;color:#F2C572;display:block;}
  #ayv-hero .ayv-stat .l{font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:#cfe0d8;}

  /* Hero right: countdown + mandala badge */
  .ayv-hero-right{position:relative;display:flex;flex-direction:column;align-items:center;gap:26px;}
  .ayv-mandala{
    width:280px;height:280px;border-radius:50%;
    background:conic-gradient(from 0deg,#9C2247,#5C1130,#9C2247,#5C1130,#9C2247);
    display:flex;align-items:center;justify-content:center;
    position:relative;animation:ayv-spin 36s linear infinite;
    box-shadow:0 0 0 1px rgba(255,255,255,.12), 0 30px 60px -20px rgba(0,0,0,.6);
  }
  @keyframes ayv-spin{to{transform:rotate(360deg);}}
  .ayv-mandala::before{
    content:"";position:absolute;inset:14px;border-radius:50%;
    background:repeating-conic-gradient(from 0deg, rgba(201,146,78,.55) 0deg 6deg, transparent 6deg 18deg);
    animation:ayv-spin 50s linear infinite reverse;
  }
  .ayv-mandala-core{
    width:190px;height:190px;border-radius:50%;background:var(--ivory);
    display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;
    box-shadow:inset 0 0 0 6px rgba(212,160,23,.25);animation:ayv-spin 36s linear infinite reverse;
    color:var(--maroon);
  }
  .ayv-mandala-core span{font-family:'Cormorant Garamond';font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;}
  .ayv-mandala-core .ayv-deva{font-size:20px;color:var(--forest);}
  .ayv-countdown{display:flex;gap:10px;}
  .ayv-cd-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:12px;
    padding:10px 12px;min-width:62px;text-align:center;backdrop-filter:blur(6px);}
  .ayv-cd-box .num{font-family:'Cormorant Garamond';font-size:24px;font-weight:700;color:#F2C572;display:block;}
  .ayv-cd-box .lab{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#cfe0d8;}

  /* ---------- ABOUT FOUNDATION ---------- */
  #ayv-about{background:var(--ivory);}
  .ayv-about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:50px;align-items:start;}
  .ayv-about-grid p{font-size:17.5px;line-height:1.8;color:#473C34;margin-bottom:18px;}
  .ayv-mission-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}
  .ayv-mission-list li{
    display:flex;gap:12px;align-items:flex-start;background:var(--card);border:1px solid #ECE2CC;
    border-radius:12px;padding:14px 18px;font-size:15.5px;box-shadow:0 6px 18px -12px rgba(0,0,0,.2);
    transition:transform .3s ease;
  }
  .ayv-mission-list li:hover{transform:translateX(6px);}
  .ayv-mission-list li::before{content:"✓";color:var(--teal);font-weight:700;flex:0 0 auto;}
  .ayv-vision-card{
    background:linear-gradient(155deg,var(--forest),var(--forest-deep));color:#fff;border-radius:20px;
    padding:30px;margin-top:22px;position:relative;overflow:hidden;
  }
  .ayv-vision-card::after{content:"";position:absolute;right:-30px;top:-30px;width:140px;height:140px;border-radius:50%;
    background:radial-gradient(circle,rgba(212,160,23,.35),transparent 70%);}
  .ayv-vision-card h3{font-size:27px;color:#F2C572;margin-bottom:10px;}
  .ayv-vision-card p{color:#eee6dd;font-size:16px;line-height:1.65;margin:0;}

  /* ---------- WHEEL (signature element) ---------- */
  #ayv-wheel{background:linear-gradient(180deg,#FBF6EC,#F3E9D2);}
  .ayv-wheel-stage{position:relative;width:680px;max-width:100%;aspect-ratio:1/1;margin:60px auto 40px;--wheel-scale:1;}
  .ayv-wheel-center{
    position:absolute;inset:36%;border-radius:50%;background:var(--card);box-shadow:0 0 0 10px #FBF6EC, 0 24px 56px -18px rgba(0,0,0,.35);
    display:flex;align-items:center;justify-content:center;text-align:center;flex-direction:column;z-index:5;gap:4px;
  }
  .ayv-wheel-center .ayv-deva{font-size:28px;color:var(--maroon);}
  .ayv-wheel-center small{font-size:11.5px;letter-spacing:.12em;color:var(--terracotta);text-transform:uppercase;font-weight:700;}
  .ayv-petal{
    position:absolute;top:50%;left:50%;width:0;height:0;
  }
  .ayv-petal-inner{
    width:148px;background:var(--card);border-radius:18px;padding:20px 14px;text-align:center;
    box-shadow:0 14px 28px -14px rgba(0,0,0,.35);border:1px solid #ECE2CC;
    transition:transform .35s ease, box-shadow .35s ease;cursor:default;
    position:absolute;left:0;top:0;
    transform:rotate(var(--ang)) translateY(calc(var(--rad) * var(--wheel-scale,1))) rotate(calc(-1 * var(--ang))) translate(-50%,-50%) scale(var(--s,1));
  }
  .ayv-petal-inner:hover{--s:1.12;box-shadow:0 20px 34px -14px rgba(0,0,0,.45);z-index:9;}
  .ayv-petal-inner .ic{font-size:30px;display:block;margin-bottom:8px;}
  .ayv-petal-inner .tt{font-size:13.5px;font-weight:700;line-height:1.3;color:var(--forest);text-transform:uppercase;letter-spacing:.01em;}

  /* ---------- STAT BAND ---------- */
  .ayv-band{
    background:var(--forest-deep);color:#fff;padding:34px 0;
  }
  .ayv-band .ayv-wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:18px;text-align:center;}
  .ayv-band .item .n{font-family:'Cormorant Garamond';font-size:34px;font-weight:700;color:var(--gold);}
  .ayv-band .item .l{font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:#cfe0d8;}

  /* ---------- CARDS GRID (generic) ---------- */
  .ayv-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .ayv-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
  .ayv-card{
    background:var(--card);border-radius:18px;padding:26px 24px;border:1px solid #ECE2CC;
    box-shadow:0 14px 30px -18px rgba(0,0,0,.25);transition:transform .35s ease,box-shadow .35s ease;
  }
  .ayv-card:hover{transform:translateY(-8px);box-shadow:0 22px 36px -16px rgba(0,0,0,.3);}
  .ayv-card .ic{font-size:32px;margin-bottom:12px;display:block;}
  .ayv-card h4{font-family:'Cormorant Garamond';font-size:24px;color:var(--maroon);margin-bottom:9px;font-weight:700;}
  .ayv-card p{font-size:15.5px;color:#564A40;line-height:1.65;margin:0;}

  /* Themes — torn-note cards */
  #ayv-themes{background:var(--ivory);}
  .ayv-note{
    background:#fffdf6;border-radius:4px 4px 14px 14px;padding:20px 18px 18px;position:relative;
    box-shadow:0 12px 24px -16px rgba(0,0,0,.3);border:1px solid #ece4cf;
    transition:transform .3s ease;
  }
  .ayv-note:hover{transform:rotate(-1deg) translateY(-4px);}
  .ayv-note .tag{position:absolute;top:-10px;left:18px;width:40px;height:14px;background:#e9dfc4;border-radius:3px;opacity:.8;}
  .ayv-note h5{font-family:'Cormorant Garamond';font-size:21px;color:var(--terracotta);margin-bottom:8px;font-weight:700;}
  .ayv-note p{font-size:14.5px;color:#5b4f44;line-height:1.6;margin:0;}

  /* Timeline (important dates) */
  .ayv-timeline-card{
    background:var(--card);border:1px solid #ECE2CC;border-radius:20px;padding:32px 30px 28px;
    box-shadow:0 16px 34px -20px rgba(0,0,0,.25);
  }
  .ayv-timeline{position:relative;padding-left:30px;border-left:2px dashed var(--terracotta);display:flex;flex-direction:column;gap:28px;}
  .ayv-timeline .pt{position:relative;}
  .ayv-timeline .pt::before{content:"";position:absolute;left:-37px;top:2px;width:15px;height:15px;border-radius:50%;
    background:var(--gold);box-shadow:0 0 0 4px var(--card),0 0 0 5.5px var(--terracotta),0 0 0 0 rgba(201,146,78,.55);
    animation:ayv-pulse-dot 2.6s ease-in-out infinite;}
  .ayv-timeline .pt:nth-child(2)::before{animation-delay:.4s;}
  .ayv-timeline .pt:nth-child(3)::before{animation-delay:.8s;}
  .ayv-timeline .pt:nth-child(4)::before{animation-delay:1.2s;}
  @keyframes ayv-pulse-dot{
    0%,100%{box-shadow:0 0 0 4px var(--card),0 0 0 5.5px var(--terracotta),0 0 0 0 rgba(156,34,71,.35);}
    50%{box-shadow:0 0 0 4px var(--card),0 0 0 5.5px var(--terracotta),0 0 0 7px rgba(156,34,71,0);}
  }
  .ayv-timeline .pt b{display:block;color:var(--maroon);font-size:19px;margin-bottom:3px;}
  .ayv-timeline .pt span{font-size:15.5px;color:#574b41;display:block;word-wrap:break-word;}
  .ayv-timeline .pt.urgent::before{background:var(--terracotta);}
  .ayv-timeline .pt.urgent b{color:var(--terracotta);}
  
  /* FIXED: Ensures "DEADLINE" text is always solid white */
  .ayv-timeline .pt.urgent b .ayv-tag,
  .ayv-tag {
    display:inline-block;margin-left:10px;background:var(--maroon);color:#ffffff !important;font-size:10.5px;font-weight:700;
    letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:20px;vertical-align:middle;
  }

  .ayv-price-card{
    background:var(--card);border:1px solid #ECE2CC;border-radius:20px;padding:30px;
    box-shadow:0 16px 34px -20px rgba(0,0,0,.25);
  }
  table.ayv-price{width:100%;border-collapse:separate;border-spacing:0;border-radius:16px;overflow:hidden;
    box-shadow:0 10px 24px -16px rgba(0,0,0,.2);}
  table.ayv-price th{background:var(--forest);color:#fff;font-weight:700;font-size:15.5px;padding:18px 14px;text-align:center;letter-spacing:.02em;position:relative;}
  table.ayv-price th.hl{background:linear-gradient(160deg,var(--terracotta),var(--maroon));}
  table.ayv-price td{padding:18px 14px;text-align:center;font-size:16.5px;border-top:1px solid #EFE6D2;background:var(--card);}
  table.ayv-price td:first-child{text-align:left;font-weight:700;color:var(--maroon);}
  table.ayv-price td.hl{background:#FBE9D6;font-weight:800;color:var(--maroon);font-size:17.5px;position:relative;}
  table.ayv-price tr:hover td:not(.hl){background:#FBF3E0;}
  table.ayv-price tr:hover td.hl{background:#F8DDB8;}
  .ayv-early-badge{display:block;font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:#FCE3B8;font-weight:700;margin-top:2px;}
  .ayv-note-strip{
    display:flex;align-items:center;gap:10px;background:#FBF0DC;border:1px dashed var(--terracotta);
    border-radius:12px;padding:12px 16px;margin-top:16px;font-size:13.5px;color:#6b5d50;
  }

  /* ========================================================
     ACCOMMODATION BOX STYLING
  ======================================================== */
  .yb-accommodation-box {
    background: linear-gradient(135deg, var(--forest), var(--forest-deep));
    color: #FCF5F0;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 16px 34px -20px rgba(0,0,0,.25);
    font-family: 'Jost', sans-serif;
    box-sizing: border-box;
    max-width: 100%;
    margin-top: 24px;
  }
  .yb-accommodation-box .eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    display: inline-block;
    margin-bottom: 8px;
  }
  .yb-accommodation-box h3 {
    color: #FCF5F0 !important;
    font-size: 24px;
    margin: 0 0 12px 0;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
  }
  .yb-accommodation-box .price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    color: var(--gold);
    margin: 6px 0 16px;
    line-height: 1;
    font-weight: 700;
  }
  .yb-accommodation-box .price span {
    font-size: 16px;
    color: #e3c3cf;
    font-family: 'Jost', sans-serif;
    font-weight: 400;
  }
  .yb-accommodation-box ul {
    margin: 0 0 24px;
    padding-left: 20px;
    color: #f5dfe7;
    font-size: 15px;
    line-height: 1.6;
  }
  .yb-accommodation-box li { margin-bottom: 8px; }
  .yb-accommodation-box li::marker { color: var(--gold); }
  .yb-accommodation-box .btn-accomm {
    background: #FCF5F0; color: var(--forest) !important; width: 100%; display: inline-flex;
    align-items: center; justify-content: center; padding: 15px; font-size: 16px;
    border-radius: 40px; font-weight: 600; text-decoration: none; box-shadow: 0 8px 20px rgba(0,0,0,0.1); transition: all 0.3s ease;
  }
  .yb-accommodation-box .btn-accomm:hover { background: #ffffff; transform: translateY(-3px); box-shadow: 0 12px 25px rgba(0,0,0,0.25); }
  .yb-accommodation-box .assist-text { font-size: 13.5px; margin-top: 20px; color: #e3c3cf; text-align: center; }

  /* Journey strip */
  .ayv-journey{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
  .ayv-journey .jc{border-radius:18px;padding:24px;color:#fff;min-height:230px;display:flex;flex-direction:column;justify-content:flex-end;
    box-shadow:0 16px 30px -18px rgba(0,0,0,.4);}
  .ayv-journey .jc h4{font-family:'Cormorant Garamond';font-size:27px;margin-bottom:8px;font-weight:700;}
  .ayv-journey .jc p{font-size:15px;line-height:1.6;opacity:.95;margin:0;}
  .ayv-journey .j1{background:linear-gradient(150deg,#caa233,#8a6b1d);}
  .ayv-journey .j2{background:linear-gradient(150deg,#c2536b,#6E1423);}
  .ayv-journey .j3{background:linear-gradient(150deg,#D6376F,#5C1130);}

  /* CTA close */
  #ayv-cta{background:radial-gradient(120% 140% at 50% 0%,#7A1B3D,var(--forest-deep));color:#fff;text-align:center;}
  #ayv-cta h2{font-size:clamp(32px,4.6vw,50px);color:#fff;margin-bottom:16px;}
  #ayv-cta p{color:#eee6dd;max-width:600px;margin:0 auto 32px;font-size:17px;}

  /* ============ RESPONSIVE — tablets & below (≤1024px) ============ */
  @media (max-width:1024px){
    #ayv-root .ayv-wrap{padding:0 22px;}
    #ayv-root section{padding:76px 0;}
    .ayv-grid-3{grid-template-columns:repeat(2,1fr);}
  }

  /* ============ RESPONSIVE — large mobile / small tablet (≤880px) ============ */
  @media (max-width:880px){
    #ayv-hero-grid{grid-template-columns:1fr;}
    .ayv-hero-right{margin-top:8px;}
    .ayv-about-grid{grid-template-columns:1fr; gap: 34px;}
    
    /* CRITICAL FIX FOR GRID BLOWOUT: Forces columns to stay inside viewport */
    .ayv-about-grid > div { min-width: 0; max-width: 100%; width: 100%; }
    
    .ayv-grid-3,.ayv-grid-4{grid-template-columns:repeat(2,1fr);}
    .ayv-journey{grid-template-columns:1fr;}
    .ayv-wheel-stage{width:100%;}
    .ayv-band .ayv-wrap{justify-content:center;gap:26px 30px;}
    .ayv-band .item{flex:1 1 28%;min-width:110px;}
    #ayv-camp .ayv-grid-3{grid-template-columns:1fr 1fr;}
    #ayv-expo .ayv-grid-3{grid-template-columns:1fr 1fr;}
  }

  /* ============ RESPONSIVE — mobile (≤700px) ============ */
  @media (max-width:700px){
    #ayv-root section{padding:64px 0;}
    #ayv-root .ayv-wrap{padding:0 18px;}
    #ayv-hero{padding:64px 0 50px;}
    #ayv-hero .ayv-meta{gap:12px;}
    #ayv-hero .ayv-meta-pill{font-size:13.5px;padding:9px 16px;}
    #ayv-hero .ayv-cta-row,#ayv-cta .ayv-cta-row{flex-direction:column;align-items:stretch;}
    #ayv-root .ayv-btn{justify-content:center;text-align:center;width:100%;padding:16px 24px;}
    .ayv-mandala{width:220px;height:220px;}
    .ayv-mandala-core{width:150px;height:150px;}
    .ayv-mandala-core .ayv-deva{font-size:17px;}
    .ayv-mandala-core span:not(.ayv-deva){font-size:11px;}
    .ayv-countdown{flex-wrap:wrap;justify-content:center;}
    .ayv-cd-box{min-width:56px;padding:8px 10px;}
    .ayv-vision-card{padding:24px 20px;}
    .ayv-timeline-card { padding:24px 18px 22px; overflow: hidden; }
    .ayv-note-strip{flex-wrap:wrap;}
    #ayv-camp .ayv-grid-3{grid-template-columns:1fr 1fr;gap:14px;}
    .ayv-wheel-stage{--wheel-scale:0.8;}
    .ayv-wheel-center{inset:30%;}
    .yb-accommodation-box { padding: 24px 20px; }
    .yb-accommodation-box .price { font-size: 32px; }
  }

  /* ============ RESPONSIVE — small mobile (≤560px) ============ */
  @media (max-width:560px){
    .ayv-grid-3,.ayv-grid-4{grid-template-columns:1fr;}
    #ayv-hero .ayv-stats{grid-template-columns:repeat(2,1fr);}
    
    /* MOBILE PRICING TABLE FIX (Card Layout instead of horizontal scroll) */
    .ayv-price-card { padding: 24px 16px 20px; }
    table.ayv-price { display: block; border: none; box-shadow: none; border-radius: 0; }
    table.ayv-price thead { display: none; }
    table.ayv-price tbody, table.ayv-price tr { display: block; width: 100%; }
    table.ayv-price tr { margin-bottom: 16px; border-radius: 12px; border: 1px solid #ECE2CC; box-shadow: 0 4px 12px rgba(0,0,0,0.08); background: #fff; overflow: hidden; }
    table.ayv-price td { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #EFE6D2; padding: 14px 16px; text-align: right; }
    table.ayv-price td:last-child { border-bottom: none; }
    table.ayv-price td::before { content: attr(data-label); font-size: 11px; font-weight: 700; color: var(--terracotta); text-transform: uppercase; letter-spacing: 0.05em; text-align: left; flex: 1; padding-right: 12px; }
    table.ayv-price td:first-child { background: linear-gradient(160deg,var(--terracotta),var(--maroon)); color: #fff; font-size: 16px; justify-content: center; }
    table.ayv-price td:first-child::before { display: none; }
    table.ayv-price td.hl { background: #FBE9D6; }

    .ayv-wheel-stage{--wheel-scale:0.6;margin:36px auto 28px;}
    .ayv-petal-inner{width:118px;padding:14px 10px;border-radius:14px;}
    .ayv-petal-inner .ic{font-size:24px;margin-bottom:5px;}
    .ayv-petal-inner .tt{font-size:11.5px;}
    .ayv-wheel-center{inset:27%;}
    .ayv-wheel-center .ayv-deva{font-size:21px;}
    #ayv-expo .ayv-grid-3{grid-template-columns:1fr 1fr;}
    .ayv-journey .jc{min-height:190px;padding:20px;}
    #ayv-cta h2{font-size:clamp(26px,7vw,38px);}
  }

  /* ============ RESPONSIVE — very small phones (≤400px) ============ */
  @media (max-width:400px){
    #ayv-hero .ayv-title-hi{font-size:clamp(34px,9vw,52px);}
    .ayv-mandala{width:185px;height:185px;}
    .ayv-mandala-core{width:124px;height:124px;}
    .ayv-cd-box{min-width:48px;padding:7px 8px;}
    .ayv-cd-box .num{font-size:19px;}
    #ayv-camp .ayv-grid-3,#ayv-expo .ayv-grid-3{grid-template-columns:1fr;}
    .ayv-wheel-stage{--wheel-scale:0.46;margin:28px auto 22px;}
    .ayv-petal-inner{width:96px;padding:10px 8px;}
    .ayv-petal-inner .ic{font-size:20px;margin-bottom:3px;}
    .ayv-petal-inner .tt{font-size:10px;}
    .ayv-wheel-center{inset:24%;}
    .ayv-wheel-center .ayv-deva{font-size:17px;}
    .ayv-wheel-center small{font-size:9.5px;}
  }

  @media (prefers-reduced-motion: reduce){
    #ayv-root *{animation:none !important;transition:none !important;}
  }

  /* ========================================================
     TICKET POPUP — TRIGGER BUTTON
  ======================================================== */
  .yb-ticket-trigger-wrap {
    text-align: center;
    margin-top: 18px;
  }
  .yb-popup-btn {
    background: linear-gradient(135deg, #6E1A3D, #C2185B, #D4AF37, #6E1A3D);
    background-size: 300% auto;
    color: #ffffff !important;
    font-family: 'Jost', sans-serif;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 20px 44px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    box-shadow: 0 15px 30px rgba(194, 24, 91, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: btnGradientMove 6s linear infinite;
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .yb-popup-btn:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(194, 24, 91, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.5);
    color: #fff !important;
  }
  @keyframes btnGradientMove {
    0% { background-position: 0% center; }
    100% { background-position: 300% center; }
  }

  /* ========================================================
     TICKET POPUP — MODAL OVERLAY & CONTENT
  ======================================================== */
  .yb-modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(20, 5, 8, 0.85);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    z-index: 999999;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; visibility: hidden; transition: all 0.4s ease;
  }
  .yb-modal-overlay.active { opacity: 1; visibility: visible; }
  .yb-modal-content {
    background: #FCF8F5; width: 95%; max-width: 1100px; max-height: 90vh; overflow-y: auto;
    border-radius: 24px; position: relative; transform: translateY(60px) scale(0.95);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 40px 80px rgba(0,0,0,0.5);
    border-top: 6px solid #D4AF37;
  }
  .yb-modal-overlay.active .yb-modal-content { transform: translateY(0) scale(1); }
  .yb-modal-header {
    background: #ffffff; padding: 30px 40px; border-bottom: 1px solid rgba(110, 26, 61, 0.1);
    display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 10;
  }
  .yb-modal-header h2 { font-family: 'Fraunces', serif; font-size: 32px; color: #6E1A3D; margin: 0; }
  .yb-modal-close {
    width: 45px; height: 45px; background: #FCF5F0; color: #6E1A3D;
    border: 1px solid rgba(110, 26, 61, 0.1); border-radius: 50%;
    font-size: 28px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease;
  }
  .yb-modal-close:hover { background: #C2185B; color: #fff; transform: rotate(90deg) scale(1.1); border-color: #C2185B; }
  .yb-modal-body { padding: 40px; font-family: 'Outfit', sans-serif !important; }
  .yb-ticket-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }

  /* ========================================================
     TICKET POPUP — PLUGIN CSS OVERRIDES
  ======================================================== */
  .yb-modal-body .etn-event-form-widget-title {
    font-family: 'Fraunces', serif !important; font-size: 22px !important; color: #fff !important;
    background: linear-gradient(135deg, #6E1A3D, #4a1128) !important; padding: 16px 20px !important;
    margin: 0 !important; border-radius: 16px 16px 0 0 !important; text-align: center; line-height: 1.3 !important;
  }
  .yb-modal-body .ant-card {
    border-radius: 0 0 16px 16px !important; border: 1px solid rgba(110, 26, 61, 0.1) !important;
    border-top: none !important; box-shadow: 0 15px 35px rgba(110, 26, 61, 0.05) !important;
    background: #ffffff !important; height: 100%; transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .etn-single-event-ticket-wrap:hover .ant-card { box-shadow: 0 20px 45px rgba(110, 26, 61, 0.12) !important; }
  .yb-modal-body .etn-purchase-ticket-title { display: none !important; }
  .yb-modal-body span[color="#5D78FF"] { color: #6E1A3D !important; font-weight: 700 !important; font-size: 18px !important; }
  .yb-modal-body .etn-ticket-container { padding-bottom: 15px; border-bottom: 1px dashed rgba(110, 26, 61, 0.15); margin-bottom: 15px !important; }
  
  .yb-modal-body .etn-ticket-info-row { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important; margin-top: 15px !important; width: 100% !important; flex-wrap: wrap !important; gap: 15px !important; }
  .yb-modal-body .etn-ticket-info-row .ant-col { display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; }
  .yb-modal-body .etn-ticket-price-label, .yb-modal-body .etn-ticket-quantity-label, .yb-modal-body .etn-ticket-subtotal-label { color: #555 !important; font-size: 14px !important; margin-bottom: 8px !important; font-weight: 500 !important; }
  .yb-modal-body .etn-ticket-price strong, .yb-modal-body .etn-ticket-subtotal strong { color: #D4AF37 !important; font-size: 20px !important; font-family: 'Fraunces', serif !important; }
  
  .yb-modal-body .ant-space-compact { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: center !important; gap: 10px !important; width: auto !important; }
  .yb-modal-body .ant-btn-compact-item { background: #FF0066 !important; color: #fff !important; width: 40px !important; height: 40px !important; border-radius: 8px !important; border: none !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 4px 10px rgba(255,0,102,0.2) !important; margin: 0 !important; flex-shrink: 0 !important; cursor: pointer !important; pointer-events: auto !important; }
  .yb-modal-body .ant-btn-compact-item * { pointer-events: none !important; }
  .yb-modal-body .ant-btn-compact-item svg { stroke: #fff !important; stroke-width: 2.5px !important; width: 20px !important; height: 20px !important; }
  .yb-modal-body .ant-input-number { background: #F5F5F5 !important; border: 1px solid #EBEBEB !important; border-radius: 8px !important; width: 65px !important; height: 40px !important; display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 !important; box-shadow: none !important; padding: 0 !important; font-family: 'Outfit', sans-serif !important; }
  .yb-modal-body .ant-input-number-input-wrap { width: 100% !important; height: 100% !important; }
  .yb-modal-body .ant-input-number-input { text-align: center !important; color: #333 !important; font-weight: 600 !important; font-size: 17px !important; height: 100% !important; padding: 0 !important; background: transparent !important; }
  .yb-modal-body .ant-space-compact-item { margin: 0 !important; }

  .yb-modal-body .ant-alert-success { background: rgba(212, 175, 55, 0.08) !important; border: 1px solid rgba(212, 175, 55, 0.3) !important; border-radius: 12px !important; color: #A9522F !important; font-weight: 500 !important; padding: 12px !important; }
  .yb-modal-body .etn-purchase-ticket-total-row { background: #FCF5F0 !important; padding: 20px !important; border-radius: 12px !important; margin: 20px 0 !important; border: 1px solid rgba(110, 26, 61, 0.1) !important; }
  .yb-modal-body .etn-purchase-ticket-total-amount-text-span { color: #6E1A3D !important; font-size: 24px !important; font-family: 'Fraunces', serif !important; }
  .yb-modal-body .etn-purchase-ticket-submit-btn { background: linear-gradient(135deg, #D4AF37, #C98A2A) !important; color: #140508 !important; border-radius: 12px !important; height: 55px !important; font-family: 'Outfit', sans-serif !important; font-weight: 700 !important; font-size: 16px !important; letter-spacing: 1px !important; text-transform: uppercase !important; box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2) !important; border: none !important; transition: all 0.3s ease !important; width: 100% !important; }
  .yb-modal-body .etn-purchase-ticket-submit-btn:not([disabled]):hover { transform: translateY(-2px) !important; box-shadow: 0 15px 25px rgba(212, 175, 55, 0.4) !important; }
  .yb-modal-body .etn-purchase-ticket-submit-btn[disabled] { background: #e2e8f0 !important; box-shadow: none !important; color: #94a3b8 !important; }

  /* TICKET POPUP RESPONSIVE */
  @media (max-width: 992px) {
    .yb-ticket-grid { grid-template-columns: 1fr; gap: 30px; }
    .yb-modal-content { width: 95%; }
    .yb-modal-header h2 { font-size: 24px; }
    .yb-modal-body { padding: 25px 20px; }
  }
  @media (max-width: 640px) {
    .yb-modal-overlay { align-items: flex-end; padding: 0; }
    .yb-modal-content { width: 100%; max-width: 100%; max-height: 92vh; border-radius: 20px 20px 0 0; border-top: 5px solid #D4AF37; }
    .yb-modal-header { padding: 20px; flex-direction: row !important; }
    .yb-modal-header h2 { font-size: 20px; }
    .yb-modal-close { position: static !important; width: 38px !important; height: 38px !important; font-size: 22px !important; }
    .yb-modal-body { padding: 18px 16px 28px; }
    .yb-popup-btn { width: 100%; justify-content: center; padding: 18px 24px !important; font-size: 15px !important; }
    .yb-modal-body .etn-event-form-widget-title { font-size: 18px !important; padding: 14px 16px !important; }
    .yb-modal-body .etn-ticket-info-row { flex-direction: column !important; align-items: center !important; gap: 15px !important; }
    .yb-modal-body .ant-space-compact { flex-wrap: wrap; justify-content: center; }
    .yb-modal-body .etn-purchase-ticket-total-row { flex-direction: column !important; gap: 10px; text-align: center; padding: 15px !important; }
  }
  @media (max-width: 400px) {
    .yb-modal-header h2 { font-size: 18px; }
    .yb-popup-btn { font-size: 14px !important; letter-spacing: .04em !important; }
  }
`
      }} />
      
      <div 
        dangerouslySetInnerHTML={{
          __html: `
<a class="skip-link screen-reader-text" href="#content">Skip to content</a>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#">OUR EVENTS</a>
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
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14535"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-14508"><a aria-current="page" class="elementor-item elementor-item-active" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14536"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-11232"><a aria-current="page" class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/">IMAGES</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">OUR EVENTS</a>
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
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14535"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-14508"><a aria-current="page" class="elementor-item elementor-item-active" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14536"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026" tabindex="-1">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view" tabindex="-1">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-11232"><a aria-current="page" class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register" tabindex="-1">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/" tabindex="-1">IMAGES</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#">OUR EVENTS</a>
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
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14535"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-14508"><a aria-current="page" class="elementor-item elementor-item-active" href="/ayurved-yashobhoomi-2026">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14536"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-11232"><a aria-current="page" class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/">IMAGES</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-147"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">OUR EVENTS</a>
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
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14535"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-14508"><a aria-current="page" class="elementor-item elementor-item-active" href="/ayurved-yashobhoomi-2026" tabindex="-1">Ayurved Yashobhoomi 2026</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-14371 current_page_item menu-item-14536"><a aria-current="page" class="elementor-sub-item elementor-item-active" href="/ayurved-yashobhoomi-2026" tabindex="-1">ABOUT AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-14538"><a class="elementor-sub-item" href="https://drive.google.com/file/d/1_fpg23X7LBXLPbUZ6gUiXWuCmwHleJqk/view" tabindex="-1">BROCHURE OF AYURVED YASHOBHOOMI 2026</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-11232"><a aria-current="page" class="elementor-sub-item elementor-item-anchor" href="/ayurved-yashobhoomi-2026/#ayv-register" tabindex="-1">REGISTRATION FOR AYURVED YASHOBHOOMI 2026</a></li>
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
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-105"><a class="elementor-item elementor-item-anchor" href="#" tabindex="-1">GALLERY</a>
<ul class="sub-menu elementor-nav-menu--dropdown">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-106"><a class="elementor-sub-item" href="/images/" tabindex="-1">IMAGES</a></li>
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
<div class="elementor elementor-14371" data-elementor-id="14371" data-elementor-post-type="page" data-elementor-type="wp-page">
<div class="elementor-element elementor-element-c37f3a6 e-con-full e-flex e-con e-parent" data-e-type="container" data-element_type="container" data-id="c37f3a6">
<div class="elementor-element elementor-element-f87ff2e elementor-widget elementor-widget-html" data-e-type="widget" data-element_type="widget" data-id="f87ff2e" data-widget_type="html.default">
<div class="elementor-widget-container">
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>

<noscript></noscript>

<div id="ayv-root">
<section id="ayv-hero">
<div class="ayv-glow" style="width:380px;height:380px;background:#E2A23A;top:-120px;left:-80px;"></div>
<div class="ayv-glow" style="width:320px;height:320px;background:#D6376F;bottom:-100px;right:-60px;"></div>
<div class="ayv-leaf" style="width:120px;top:12%;left:6%;"><svg fill="none" viewbox="0 0 100 100"><path d="M50 5C70 25 90 45 50 95C10 45 30 25 50 5Z" fill="#D4A017"></path></svg></div>
<div class="ayv-leaf" style="width:90px;top:60%;left:14%;animation-delay:3s;"><svg fill="none" viewbox="0 0 100 100"><path d="M50 5C70 25 90 45 50 95C10 45 30 25 50 5Z" fill="#D6376F"></path></svg></div>
<div class="ayv-leaf" style="width:80px;top:20%;right:8%;animation-delay:6s;"><svg fill="none" viewbox="0 0 100 100"><path d="M50 5C70 25 90 45 50 95C10 45 30 25 50 5Z" fill="#C97A3D"></path></svg></div>
<div class="ayv-wrap">
<div id="ayv-hero-grid">
<div class="ayv-reveal">
<div class="ayv-kicker">Ayurvedam Foundation Presents</div>
<h1 class="ayv-title-en">Where the Wisdom of Yashobhoomi</h1>
<span class="ayv-title-hi ayv-deva">आयुर्वेद यशोभूमि</span>
<p class="ayv-sub">India's largest hands-on clinical training workshop in Ayurveda history — bridging the gap between theoretical knowledge and real-world practice through the Guru–Shishya tradition, in the sacred land of Devbhoomi Haridwar.</p>
<div class="ayv-meta">
<div class="ayv-meta-pill">📍 <b>Shri Prem Nagar Ashram, Haridwar</b></div>
<div class="ayv-meta-pill">📅 <b>23–24 December 2026</b></div>
</div>
<div class="ayv-cta-row">
<a class="ayv-btn" href="#ayv-register">Register Now →</a>
<a class="ayv-btn ayv-ghost" href="#ayv-about">Explore the Event</a>
</div>
<div class="ayv-stats">
<div class="ayv-stat"><span class="n">10+</span><span class="l">Gurus</span></div>
<div class="ayv-stat"><span class="n">2,000+</span><span class="l">Delegates</span></div>
<div class="ayv-stat"><span class="n">200+</span><span class="l">Papers/Posters</span></div>
<div class="ayv-stat"><span class="n">50+</span><span class="l">Exhibitors</span></div>
<div class="ayv-stat"><span class="n">20,000+</span><span class="l">Visitors</span></div>
<div class="ayv-stat"><span class="n">25</span><span class="l">States</span></div>
</div>
</div>
<div class="ayv-hero-right ayv-reveal">
<div class="ayv-mandala">
<div class="ayv-mandala-core">
<span class="ayv-deva">यशोभूमि</span>
<span>Devbhoomi Haridwar</span>
</div>
</div>
<div class="ayv-countdown" id="ayv-countdown">
<div class="ayv-cd-box"><span class="num" id="ayv-d">00</span><span class="lab">Days</span></div>
<div class="ayv-cd-box"><span class="num" id="ayv-h">00</span><span class="lab">Hrs</span></div>
<div class="ayv-cd-box"><span class="num" id="ayv-m">00</span><span class="lab">Min</span></div>
<div class="ayv-cd-box"><span class="num" id="ayv-s">00</span><span class="lab">Sec</span></div>
</div>
</div>
</div>
</div>
</section>
<section id="ayv-about">
<div class="ayv-wrap">
<div class="ayv-about-grid">
<div class="ayv-reveal">
<div class="ayv-eyebrow">About Ayurvedam Foundation</div>
<h2 style="font-size:clamp(30px,3.6vw,44px);color:var(--maroon);margin-bottom:16px;">Preserving Tradition. Promoting Excellence.<br/>Advancing Ayurveda.</h2>
<p>Ayurvedam Foundation, a unit of Indudevi Charitable Foundation, is dedicated to the preservation, promotion, and advancement of authentic Ayurveda. Through national conferences, clinical workshops, scientific forums, research initiatives, and educational programs, the Foundation connects practitioners, academicians, researchers, students, and industry leaders across India.</p>
<div class="ayv-vision-card">
<h3>Our Vision</h3>
<p>To establish Ayurveda as a globally respected and accessible healthcare system while preserving its timeless wisdom.</p>
</div>
</div>
<div class="ayv-reveal">
<div class="ayv-eyebrow">Our Mission</div>
<ul class="ayv-mission-list">
<li>Promote authentic Ayurveda</li>
<li>Encourage research &amp; innovation</li>
<li>Strengthen clinical excellence</li>
<li>Foster national collaboration</li>
<li>Empower future Ayurveda leaders</li>
</ul>
</div>
</div>
</div>
</section>
<div class="ayv-band">
<div class="ayv-wrap">
<div class="item"><span class="n">10</span><div class="l">Sessions</div></div>
<div class="item"><span class="n">20</span><div class="l">Hours</div></div>
<div class="item"><span class="n">25</span><div class="l">States</div></div>
<div class="item"><span class="n">2,500+</span><div class="l">Doctors</div></div>
<div class="item"><span class="n">500+</span><div class="l">Scientific Sessions</div></div>
<div class="item"><span class="n">20,000+</span><div class="l">Visitors</div></div>
</div>
</div>
<section id="ayv-wheel">
<div class="ayv-wrap" style="text-align:center;">
<div class="ayv-eyebrow" style="justify-content:center;">Be a Part of Yashobhoomi</div>
<h2 style="font-size:clamp(30px,3.8vw,46px);color:var(--maroon);">Register. Learn. Grow.</h2>
<p style="max-width:560px;margin:14px auto 0;color:#564A40;font-size:16.5px;">Eight pillars of one mission — hover any petal of the Yashobhoomi wheel to see how it shapes the future of Ayurveda.</p>
</div>
<div class="ayv-wheel-stage">
<div class="ayv-wheel-center"><span class="ayv-deva">यशोभूमि</span><small>8 Pillars</small></div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:0deg;--rad:-225px;"><span class="ic">🩺</span><span class="tt">Hands-On Clinical Training</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:45deg;--rad:-225px;"><span class="ic">🌿</span><span class="tt">Ayurveda Networking</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:90deg;--rad:-225px;"><span class="ic">🏛️</span><span class="tt">Industry &amp; Policy Connect</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:135deg;--rad:-225px;"><span class="ic">🧑‍🤝‍🧑</span><span class="tt">Public Health Impact</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:180deg;--rad:-225px;"><span class="ic">📖</span><span class="tt">Academics &amp; Clinical Integration</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:225deg;--rad:-225px;"><span class="ic">📈</span><span class="tt">Professional Growth</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:270deg;--rad:-225px;"><span class="ic">🏥</span><span class="tt">Healthcare Infrastructure</span></div>
</div>
<div class="ayv-petal">
<div class="ayv-petal-inner" style="--ang:315deg;--rad:-225px;"><span class="ic">💊</span><span class="tt">Pharma, Tech &amp; Exhibition</span></div>
</div>
</div>
</section>
<section id="ayv-event" style="background:linear-gradient(180deg,#F3E9D2,var(--ivory));">
<div class="ayv-wrap">
<div class="ayv-eyebrow">About Our Event</div>
<h2 style="font-size:clamp(30px,3.6vw,44px);color:var(--maroon);max-width:680px;">Reviving Practical Ayurveda Through the Guru–Shishya Tradition</h2>
<p style="max-width:760px;margin:18px 0 36px;color:#473C34;font-size:15.5px;line-height:1.75;">After the successful journeys of <b>Ayurved Anantam</b> and <b>Ayurved Aparajita</b>, we realised that while knowledge can be shared through lectures, true learning comes through practice. Yashobhoomi was born from a simple belief: <i>"It is always better to do it yourself than just listen about it."</i></p>
<div class="ayv-grid-4">
<div class="ayv-card ayv-reveal"><span class="ic">🩺</span><h4>Clinical Training</h4><p>India's largest hands-on workshop network across 10 Yogya Vidhi sessions.</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">📝</span><h4>500+ Papers</h4><p>Scientific paper &amp; poster presentations from across the nation.</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">🏪</span><h4>Wellness Expo</h4><p>Ayurveda &amp; wellness exhibition with 50+ exhibitors.</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">🚀</span><h4>Startup Conclave</h4><p>A dedicated start-up &amp; entrepreneurship platform.</p></div>
</div>
</div>
</section>
<section id="ayv-camp" style="background:var(--forest);color:#fff;">
<div class="ayv-wrap">
<div class="ayv-about-grid">
<div class="ayv-reveal">
<div class="ayv-eyebrow" style="color:var(--gold);">Yashobhoomi Aarogya Shivir</div>
<h2 style="color:#fff;font-size:clamp(28px,3.4vw,40px);">A Mega Free Health Camp for Community Wellness</h2>
<p style="color:#dce9e2;font-size:16.5px;line-height:1.7;margin-top:14px;">A large-scale healthcare initiative promoting preventive care and holistic wellness through Ayurveda — expected to benefit 5,000+ patients with free checkups, Nadi Parikshan, eye camps, dietician consultations, free medicines, and a blood donation drive.</p>
</div>
<div class="ayv-grid-3" style="grid-template-columns:1fr 1fr;">
<div class="ayv-card" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15);"><span class="ic">🩹</span><h4 style="color:var(--gold);">5,000+</h4><p style="color:#dce9e2;">Patients benefited</p></div>
<div class="ayv-card" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15);"><span class="ic">💉</span><h4 style="color:var(--gold);">1,000+</h4><p style="color:#dce9e2;">Nadi Parikshan assessments</p></div>
<div class="ayv-card" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15);"><span class="ic">👁️</span><h4 style="color:var(--gold);">1,000+</h4><p style="color:#dce9e2;">Eye checkups</p></div>
<div class="ayv-card" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15);"><span class="ic">🩸</span><h4 style="color:var(--gold);">500+</h4><p style="color:#dce9e2;">Blood units targeted</p></div>
</div>
</div>
</div>
</section>
<section id="ayv-themes">
<div class="ayv-wrap">
<div class="ayv-eyebrow">Call for Abstract</div>
<h2 style="font-size:clamp(30px,3.6vw,44px);color:var(--maroon);">Themes for Papers &amp; Posters</h2>
<p style="max-width:680px;margin:14px 0 36px;color:#564A40;font-size:16.5px;">₹25,000 prize pool for outstanding research — submit by <b>31 August 2026</b>.</p>
<div class="ayv-grid-4">
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Prasuti Tantra &amp; Stree Roga</h5><p>Garbhasanskar, maternal wellness &amp; reproductive health.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Kaumarbhritya</h5><p>Ayurveda in child growth &amp; preventive pediatric care.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Swasthavritta &amp; Yoga</h5><p>Lifestyle disorders, yoga &amp; mental well-being.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Shalakya Tantra</h5><p>Preventive ENT, eye &amp; dental care through Ayurveda.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Kayachikitsa</h5><p>Evidence-based internal medicine practices.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Rasa Shastra &amp; Bhaishajya</h5><p>Standardisation of Ayurvedic formulations.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Manasa Chikitsa</h5><p>Stress, anxiety &amp; mind-body integration.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Shalya Tantra</h5><p>Advances in Ksharasutra &amp; para-surgical techniques.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Panchakarma</h5><p>Evidence-based outcomes of detox therapies.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Kriya &amp; Rachana Sharir</h5><p>Functional physiology &amp; applied anatomy.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Roga Nidana</h5><p>Diagnostic methodologies &amp; emerging research.</p></div>
<div class="ayv-note ayv-reveal"><div class="tag"></div><h5>Dravyaguna &amp; Agad Tantra</h5><p>Medicinal plants, toxicology &amp; pharmacology.</p></div>
</div>
</div>
</section>
<section id="ayv-expo" style="background:linear-gradient(180deg,var(--ivory),#F3E9D2);">
<div class="ayv-wrap ayv-about-grid">
<div class="ayv-reveal">
<div class="ayv-eyebrow">Ayurved Yashobhoomi Expo</div>
<h2 style="font-size:clamp(28px,3.4vw,40px);color:var(--maroon);">Showcase. Connect. Collaborate. Grow.</h2>
<p style="color:#473C34;font-size:16.5px;line-height:1.7;margin:14px 0;">A premier platform bringing together leading Ayurvedic brands, healthcare innovators, manufacturers, institutions, startups, and wellness enterprises — connecting with 2,000+ Ayurveda professionals from across the nation.</p>
<div class="ayv-cta-row"><a class="ayv-btn" href="../">Book Exhibitor Space →</a></div>
</div>
<div class="ayv-grid-3" style="grid-template-columns:1fr 1fr;">
<div class="ayv-card ayv-reveal"><span class="ic">🤝</span><h4>50+</h4><p>Industry partners</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">🩺</span><h4>2,500+</h4><p>Ayurveda doctors</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">👥</span><h4>20,000+</h4><p>Expected visitors</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">🏪</span><h4>100+</h4><p>Local distributors/retailers</p></div>
</div>
</div>
</section>
<section id="ayv-compete">
<div class="ayv-wrap">
<div class="ayv-eyebrow">Challenge · Create · Conquer</div>
<h2 style="font-size:clamp(30px,3.6vw,44px);color:var(--maroon);">Compete &amp; Win at Yashobhoomi</h2>
<div class="ayv-grid-3" style="margin-top:34px;">
<div class="ayv-card ayv-reveal"><span class="ic">🎬</span><h4>National Reel Competition</h4><p>"Ayurveda Beyond Borders" — 30–90 sec reels. Total prize pool ₹20,000 (1st ₹10,000 / 2nd ₹6,000 / 3rd ₹4,000).</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">❓</span><h4>Ayurveda Quiz Challenge</h4><p>Live MCQ quiz rounds during every major session — win gift hampers, books &amp; wellness kits.</p></div>
<div class="ayv-card ayv-reveal"><span class="ic">🎥</span><h4>Creator Conclave 2026</h4><p>For digital influencers &amp; wellness creators — free registration with 10K+ Instagram followers.</p></div>
</div>
</div>
</section>
<section id="ayv-register" style="background:linear-gradient(180deg,#F3E9D2,var(--ivory));">
<div class="ayv-wrap reg-wrap">
<div class="ayv-reveal">
<div class="ayv-eyebrow">Important Dates</div>
<div class="ayv-timeline-card">
<div class="ayv-timeline" style="margin-top:6px;">
<div class="pt urgent"><b>31 August 2026 <span class="ayv-tag">Deadline</span></b><span>Last date for abstract submission</span></div>
<div class="pt"><b>30 September 2026</b><span>Notification of acceptance</span></div>
<div class="pt"><b>31 October 2026</b><span>Registration of accepted presenters</span></div>
<div class="pt"><b>22–25 December 2026</b><span>3-day accommodation window · Event 23–24 Dec</span></div>
</div>
</div>
</div>
<div class="ayv-reveal">
<div class="ayv-eyebrow">Registration Fee</div>
<div class="ayv-price-card" style="margin-top:6px;">
<table class="ayv-price">
<thead><tr>
<th>Category</th>
<th class="hl">Before 31/07<span class="ayv-early-badge">Early Bird</span></th>
<th>After 31/07</th>
<th>After 31/08</th>
</tr></thead>
<tbody>
<tr><td data-label="Category">UG Scholars &amp; Interns</td><td class="hl" data-label="Before 31/07 (Early Bird)">₹1,499</td><td data-label="After 31/07">₹1,999</td><td data-label="After 31/08">₹2,499</td></tr>
<tr><td data-label="Category">PG / Ph.D / Practitioner / Faculty </td><td class="hl" data-label="Before 31/07 (Early Bird)">₹1,999</td><td data-label="After 31/07">₹2,499</td><td data-label="After 31/08">₹2,999</td></tr>
<tr><td data-label="Category">Spot Registration</td><td colspan="3" data-label="Fee">₹4,500</td></tr>
</tbody>
</table>
<div class="ayv-note-strip">⏰ Register before <b>31 July 2026</b> to lock in the lowest fee — save up to ₹1,000 per delegate.</div>
<p style="font-size:13px;color:#6b5d50;margin-top:14px;">Includes 2-day breakfast &amp; lunch, delegate kit, certificate of participation, and entry to all workshops &amp; exhibition stalls.</p>
<div class="yb-ticket-trigger-wrap">
<button class="yb-popup-btn openTicketModalBtn" type="button">
              🎟️Register Now
            </button>
</div>
</div>
</div>
<div class="yb-accommodation-box">
<span class="eyebrow">Accommodation</span>
<h3>3 Days · Check‑in 22 Dec</h3>
<div class="price">₹999 <span>/ delegate</span></div>
<ul>
<li>First 600 delegates — ₹999</li>
<li>Next 600–1500 delegates — ₹1,499</li>
<li>Check‑out by 25 Dec, 9:00 AM</li>
</ul>
<a class="btn-accomm" href="https://u.payu.in/PAYUMN/qJM9c6eM5XLP" rel="noopener noreferrer" target="_blank">
            Book Accommodation
          </a>
<p class="assist-text">Assistance: +91 91400 13151 · +91 63910 53105</p>
</div>
</div>
</section>
<div class="yb-modal-overlay" id="ticketModalOverlay">
<div class="yb-modal-content">
<div class="yb-modal-header">
<h2>Select Your Category</h2>
<button class="yb-modal-close" id="closeTicketModalBtn" type="button">×</button>
</div>
<div class="yb-modal-body">
<div class="elementor-shortcode yb-ticket-grid">
<div class="etn-single-event-ticket-wrap">
<h3 class="etn-event-form-widget-title">
              Ayurved Yashobhoomi 2026<br/><span style="font-size: 16px; font-family:'Outfit', sans-serif; font-weight:400; opacity: 0.9;">UG Scholars &amp; Interns</span>
</h3>
<div class="etn-single-event-ticket-wrap">
<div class="etn-purchase-ticket-root" data-post_id="14438" data-style="style-1">
<div aria-busy="true" aria-label="Loading tickets" class="etn-ticket-placeholder etn-lazy-trigger" style="min-height:170px;">
<h3 class="etn-purchase-ticket-title">Tickets</h3>
<div class="etn-ticket-price-hint">From ₹1,499</div>
<div class="etn-skel etn-skel-row"></div>
<div class="etn-skel etn-skel-row" style="width:75%;"></div>
<div class="etn-skel etn-skel-btn"></div>
</div>
</div>
</div>
</div>
<div class="etn-single-event-ticket-wrap">
<h3 class="etn-event-form-widget-title">
              Ayurved Yashobhoomi 2026<br/><span style="font-size: 16px; font-family:'Outfit', sans-serif; font-weight:400; opacity: 0.9;">PG Scholars, Ph.D &amp; Practitioners</span>
</h3>
<div class="etn-single-event-ticket-wrap">
<div class="etn-purchase-ticket-root" data-post_id="13949" data-style="style-1">
<div aria-busy="true" aria-label="Loading tickets" class="etn-ticket-placeholder etn-lazy-trigger" style="min-height:170px;">
<h3 class="etn-purchase-ticket-title">Tickets</h3>
<div class="etn-ticket-price-hint">From ₹1,999</div>
<div class="etn-skel etn-skel-row"></div>
<div class="etn-skel etn-skel-row" style="width:75%;"></div>
<div class="etn-skel etn-skel-btn"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<section id="ayv-journey">
<div class="ayv-wrap">
<div class="ayv-eyebrow ayv-reveal">Our Journey of Impact</div>
<h2 class="ayv-reveal" style="font-size:clamp(30px,3.6vw,44px);color:var(--maroon);">From Anantam to Aparajita to Yashobhoomi</h2>
<div class="ayv-journey" style="margin-top:30px;">
<div class="jc j1 ayv-reveal"><h4>Ayurved Anantam 2025</h4><p>2,200+ delegates · 30+ speakers · Lucknow gathering of the Ayurveda fraternity.</p></div>
<div class="jc j2 ayv-reveal"><h4>Ayurved Aparajita 2026</h4><p>1,000+ delegates · A women-centric conclave at the Constitution Club of India, New Delhi.</p></div>
<div class="jc j3 ayv-reveal"><h4>Ayurved Yashobhoomi 2026</h4><p>2,000+ doctors · India's largest hands-on Ayurveda training platform, Haridwar.</p></div>
</div>
</div>
</section>
<section id="ayv-cta">
<div class="ayv-wrap">
<div class="ayv-eyebrow ayv-reveal" style="justify-content:center;color:var(--gold);">Join Us in Devbhoomi Haridwar</div>
<h2 class="ayv-reveal">श्रेष्ठता का शिखर, आयुर्वेद का आधार</h2>
<p class="ayv-reveal">23–24 December 2026 · Shri Prem Nagar Ashram, Haridwar. Seats fill fast — secure your place at India's largest hands-on Ayurveda training workshop.</p>
<div class="ayv-cta-row ayv-reveal" style="justify-content:center;">
<button class="ayv-btn openTicketModalBtn" style="border:none; cursor:pointer;" type="button">Register Now →</button>
<a class="ayv-btn ayv-ghost" href="mailto:Abstract.ayurved@gmail.com">Submit an Abstract</a>
</div>
</div>
</section>
</div>
 </div>
</div>
</div>
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
</footer>`
      }} />

      {isModalOpen && (
        <div className="yb-modal-overlay active" onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}>
          <div className="yb-modal-content">
            <div className="yb-modal-header">
              <h2>Select Your Category</h2>
              <button className="yb-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <div className="yb-modal-body">
              <div className="yb-ticket-grid">
                
                {/* UG Ticket Card */}
                <div className="yb-ticket-card">
                  <div className="yb-ticket-header">
                    <h3>Ayurved Yashobhoomi 2026</h3>
                    <p>UG Scholars & Interns</p>
                  </div>
                  <div className="yb-ticket-body">
                    <div className="yb-ticket-title">UG Early Bird</div>
                    
                    <div className="yb-ticket-row">
                      <span className="yb-ticket-price-label">Ticket Price:</span>
                      <span className="yb-ticket-price-val">₹1,499.00</span>
                    </div>
                    
                    <div className="yb-ticket-row">
                      <span className="yb-ticket-price-label">Quantity:</span>
                      <div className="yb-qty-picker">
                        <button className="yb-qty-btn" onClick={() => setUgQty(Math.max(0, ugQty - 1))}>-</button>
                        <input className="yb-qty-input" type="text" value={ugQty} readOnly />
                        <button className="yb-qty-btn" onClick={() => setUgQty(ugQty + 1)}>+</button>
                      </div>
                    </div>
                    
                    <div className="yb-ticket-row">
                      <span className="yb-ticket-price-label">Subtotal:</span>
                      <span className="yb-subtotal-val">₹{(ugQty * 1499).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  
                  <div className="yb-ticket-footer">
                    <div className="yb-summary-box">
                      <span>Quantity: <b>{ugQty}</b></span>
                      <span>Total: <b className="yb-summary-total">₹{(ugQty * 1499).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></span>
                    </div>
                    <button 
                      className="yb-ticket-submit-btn" 
                      disabled={ugQty === 0}
                      onClick={() => window.location.href = `/event-booking?ug=${ugQty}&pg=${pgQty}`}
                    >
                      GET TICKETS
                    </button>
                  </div>
                </div>

                {/* PG Ticket Card */}
                <div className="yb-ticket-card">
                  <div className="yb-ticket-header">
                    <h3>Ayurved Yashobhoomi 2026</h3>
                    <p>PG Scholars, Ph.D & Practitioners</p>
                  </div>
                  <div className="yb-ticket-body">
                    <div className="yb-ticket-title">PG Early Bird</div>
                    
                    <div className="yb-ticket-row">
                      <span className="yb-ticket-price-label">Ticket Price:</span>
                      <span className="yb-ticket-price-val">₹1,999.00</span>
                    </div>
                    
                    <div className="yb-ticket-row">
                      <span className="yb-ticket-price-label">Quantity:</span>
                      <div className="yb-qty-picker">
                        <button className="yb-qty-btn" onClick={() => setPgQty(Math.max(0, pgQty - 1))}>-</button>
                        <input className="yb-qty-input" type="text" value={pgQty} readOnly />
                        <button className="yb-qty-btn" onClick={() => setPgQty(pgQty + 1)}>+</button>
                      </div>
                    </div>
                    
                    <div className="yb-ticket-row">
                      <span className="yb-ticket-price-label">Subtotal:</span>
                      <span className="yb-subtotal-val">₹{(pgQty * 1999).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  
                  <div className="yb-ticket-footer">
                    <div className="yb-summary-box">
                      <span>Quantity: <b>{pgQty}</b></span>
                      <span>Total: <b className="yb-summary-total">₹{(pgQty * 1999).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></span>
                    </div>
                    <button 
                      className="yb-ticket-submit-btn" 
                      disabled={pgQty === 0}
                      onClick={() => window.location.href = `/event-booking?ug=${ugQty}&pg=${pgQty}`}
                    >
                      GET TICKETS
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

