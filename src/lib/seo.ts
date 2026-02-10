import { Metadata } from 'next';

const baseUrl = 'https://the-house-of-the-depp.vercel.app';
const siteName = 'the-house-of-the-depp';
const defaultDescription = 'Agentic Engineer의 기술 블로그 & 포트폴리오. AI, 소프트웨어 개발, 그리고 에이전트 기반 시스템을 탐구합니다.';
const defaultImage = `${baseUrl}/api/og?title=${encodeURIComponent(siteName)}`;

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Generate consistent metadata across the site
 */
export function generateMetadata(props: SEOProps = {}): Metadata {
  const {
    title,
    description = defaultDescription,
    path = '',
    image = defaultImage,
    type = 'website',
    publishedTime,
    keywords = [],
    noIndex = false,
  } = props;

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return {
    title: fullTitle,
    description,
    keywords: [
      '기술 블로그',
      'Agentic Engineer',
      'AI',
      '개발',
      'Next.js',
      'React',
      'Supabase',
      ...keywords,
    ].join(', '),
    robots: noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      ...(publishedTime && { publishedTime }),
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Generate OG image URL
 */
export function generateOgUrl(title: string): string {
  return `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;
}
