import type { Post } from '@/types/database';

const baseUrl = 'https://the-house-of-the-depp.vercel.app';
const siteName = 'the-house-of-the-depp';
const siteDescription = 'Agentic Engineer의 기술 블로그 & 포트폴리오. AI, 소프트웨어 개발, 그리고 에이전트 기반 시스템을 탐구합니다.';
const authorEmail = 'hello@example.com';

export function RSSFeed(posts: Post[]): string {
  const pubDate = new Date().toUTCString();
  const lastBuildDate = posts.length > 0
    ? new Date(posts[0].published_at || Date.now()).toUTCString()
    : pubDate;

  const items = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date(post.created_at).toUTCString();
      const description = post.excerpt || post.content.slice(0, 200) + '...';
      const content = post.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    <description><![CDATA[${siteDescription}]]></description>
    <language>ko-kr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <managingEditor>${authorEmail}</managingEditor>
    <webMaster>${authorEmail}</webMaster>
${items}
  </channel>
</rss>`;
}
