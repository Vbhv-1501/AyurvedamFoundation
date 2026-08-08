import type { Metadata } from "next";
import ParallaxMotion from "@/components/ParallaxMotion";
import MediaExperience from "@/components/MediaExperience";
import HeaderRevealInit from "@/components/HeaderRevealInit";
import "./globals.css";

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
    <html lang="en">
      <body>
        <ParallaxMotion />
        <MediaExperience />
        <HeaderRevealInit />
        {children}
      </body>
    </html>
  );
}
