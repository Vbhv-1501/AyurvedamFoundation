/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import PageWrapper from "@/components/layout/PageWrapper";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayurvedam Foundation",
  description: "Anant Ayurved Ka Maha Utsav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Core Common CSS files */}
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
        <link rel="stylesheet" id="elementor-icons-ekiticons-css" href="/css/ekit-ekiticons.css" media="all" />
        <link rel="stylesheet" id="wc-blocks-style-css" href="/css/woocommerce-wc-blocks.css" media="all" />
        
        {/* Page Specific Post Stylesheets */}
        <link rel="stylesheet" href="/css/elementor-post-49.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-74.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-80.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-84.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-88.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-94.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-98.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-102.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-111.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-115.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-122.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-130.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-138.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-566.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-10515.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-11120.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-14371.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-14421.css" media="all" />
        <link rel="stylesheet" href="/css/elementor-post-3.css" media="all" />
      </head>
      <body>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
