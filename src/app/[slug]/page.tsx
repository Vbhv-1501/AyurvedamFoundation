import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';

const PAGES: Record<string, () => Promise<{ default: ComponentType }>> = {
  'about-ayurmahotsava': () => import('@/features/site-pages/about-ayurmahotsava'),
  'about-ayurved-anantam-2025': () => import('@/features/site-pages/about-ayurved-anantam-2025'),
  'about-ayurved-aparajita-2026': () => import('@/features/site-pages/about-ayurved-aparajita-2026'),
  'about-us': () => import('@/features/site-pages/about-us'),
  'associating-partners': () => import('@/features/site-pages/associating-partners'),
  'ayurved-yashobhoomi-2026': () => import('@/features/site-pages/ayurved-yashobhoomi-2026'),
  'event-booking': () => import('@/features/site-pages/event-booking'),
  'call-for-paper': () => import('@/features/site-pages/call-for-paper'),
  'contact-us': () => import('@/features/site-pages/contact-us'),
  'exhibitor-from': () => import('@/features/site-pages/exhibitor-from'),
  'exhibitors': () => import('@/features/site-pages/exhibitors'),
  'glimpse-of-ayurmahotsava': () => import('@/features/site-pages/glimpse-of-ayurmahotsava'),
  'images': () => import('@/features/site-pages/images'),
  'organising-team': () => import('@/features/site-pages/organising-team'),
  'our-state-ambassadors': () => import('@/features/site-pages/our-state-ambassadors'),
  'privacy-policy-2': () => import('@/features/site-pages/privacy-policy-2'),
  'refund_returns': () => import('@/features/site-pages/refund_returns'),
  'term-and-conditions': () => import('@/features/site-pages/term-and-conditions'),
  'videos': () => import('@/features/site-pages/videos'),
  'why-exhibit-with-us': () => import('@/features/site-pages/why-exhibit-with-us')
};

const TITLES: Record<string, string> = {
  'about-ayurmahotsava': "ABOUT AYURMAHOTSAVA 2024 – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'about-ayurved-anantam-2025': "ABOUT AYURVED ANANTAM 2025 – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'about-ayurved-aparajita-2026': "Ayurved Aparajita 2026 Registration – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'about-us': "ABOUT AYURVEDAM FOUNDATION – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'associating-partners': "ASSOCIATING PARTNERS – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'ayurved-yashobhoomi-2026': "Ayurved Yashobhoomi 2026 – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'event-booking': "Event Booking – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'call-for-paper': "CALL FOR ABSTRACTS – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'contact-us': "CONTACT US – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'exhibitor-from': "Exhibitor Interest Form – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'exhibitors': "EXHIBITORS – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'glimpse-of-ayurmahotsava': "GLIMPSE OF AYURMAHOTSAVA – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'images': "IMAGES – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'organising-team': "CORE ORGANIZERS – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'our-state-ambassadors': "STATE AMBASSADORS – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'privacy-policy-2': "Privacy Policy – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'refund_returns': "Refund and Returns Policy – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'term-and-conditions': "Term and Conditions – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'videos': "VIDEOS – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation",
  'why-exhibit-with-us': "Why Exhibit with us – Ayurvedam Foundation – A Unit of Indudevi Charitable Foundation"
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = TITLES[slug] || "Ayurvedam Foundation";
  return {
    title,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const loadPage = PAGES[slug];
  if (!loadPage) {
    notFound();
  }

  const { default: PageComponent } = await loadPage();

  return <PageComponent />;
}

export async function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}
