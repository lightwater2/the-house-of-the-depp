import { Metadata } from 'next';

/**
 * Generate JSON-LD data for SEO
 */

export interface WebSiteJsonLd {
  '@type': 'WebSite';
  '@id': string;
  url: string;
  name: string;
  description: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target?: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    };
  };
  sameAs?: string[];
}

export function WebSiteJsonLd() {
  const baseUrl = 'https://the-house-of-the-depp.vercel.app';

  const jsonLd: WebSiteJsonLd = {
    '@type': 'WebSite',
    '@id': baseUrl,
    url: baseUrl,
    name: 'the-house-of-the-depp | Agentic Engineer',
    description: 'Agentic Engineer의 기술 블로그 & 포트폴리오. AI, 소프트웨어 개발, 그리고 에이전트 기반 시스템을 탐구합니다.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: baseUrl + '/search?q={search_term_string}',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function generateJsonLd(data: any) {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
