import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { generateMetadata as createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  description: 'Agentic Engineer의 기술 블로그 & 포트폴리오. AI와 소프트웨어 개발의 교차점에서 에이전트 기반 시스템을 탐구합니다.',
  keywords: ['AI', '소프트웨어 개발', '에이전트 기반 시스템', 'Next.js', 'React', 'Supabase'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss" />
        <meta name="theme-color" content="#00ff88" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
