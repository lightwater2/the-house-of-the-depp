import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BlogPostSchema } from '@/components/StructuredData';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .single();
  return data;
}

async function incrementViewCount(slug: string) {
  await supabase.rpc('increment_view_count', { post_slug: slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Not Found' };

  const baseUrl = 'https://the-house-of-the-depp.vercel.app';
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}`;
  const description = post.excerpt || post.content.slice(0, 160);

  return {
    title: post.title,
    description,
    keywords: [
      '기술 블로그',
      'Agentic Engineer',
      'AI',
      '개발',
      ...extractKeywords(post.content),
    ].join(', '),
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(post.published_at && { publishedTime: post.published_at }),
      url: `${baseUrl}/blog/${slug}`,
      siteName: 'the-house-of-the-depp',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Extract keywords from content with better filtering
 */
function extractKeywords(content: string): string[] {
  // Common Korean and English stop words to filter out
  const stopWords = new Set([
    '의', '가', '이', '은', '는', '을', '를', '에', '에서', '와', '과',
    '그', '저', '이', '것', '수', '있다', '없다', '하다', '되다', '되어',
    'the', 'is', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to',
    'for', 'of', 'with', 'by', 'as', 'from', 'this', 'that', 'these',
    'are', 'be', 'have', 'has', 'had', 'been', 'being', 'was', 'were',
    'it', 'its', 'you', 'your', 'we', 'our', 'they', 'their', 'what',
    'which', 'who', 'when', 'where', 'why', 'how', 'can', 'will', 'would',
    'should', 'could', 'may', 'might', 'must', 'shall', '사용', '방법',
    '예시', '경우', '통해', '위해', '관한', '대한', '다른', '다시',
  ]);

  // Technical terms to prioritize (related to common tech topics)
  const techTerms = [
    'javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'python',
    'ai', 'machine', 'learning', 'supabase', 'prisma', 'tailwind',
    'css', 'html', 'database', 'api', 'rest', 'graphql', 'docker',
    'kubernetes', 'aws', 'vercel', 'github', 'git', 'testing', 'jest',
    'vitest', 'component', 'hook', 'state', 'effect', 'async', 'await',
    'function', 'class', 'interface', 'type', 'import', 'export',
  ];

  const words = content
    .toLowerCase()
    // Preserve tech terms by treating common separators
    .replace(/[^\w\s가-힣가-힣\-_]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !stopWords.has(word));

  const wordCount = new Map<string, number>();
  words.forEach(word => {
    // Boost count for tech terms
    const multiplier = techTerms.includes(word) ? 2 : 1;
    wordCount.set(word, (wordCount.get(word) || 0) + multiplier);
  });

  const sortedWords = Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);

  return sortedWords;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  incrementViewCount(slug);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const baseUrl = 'https://the-house-of-the-depp.vercel.app';
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}`;
  const description = post.excerpt || post.content.slice(0, 160);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <BlogPostSchema
        title={post.title}
        description={description}
        datePublished={post.published_at || undefined}
        dateModified={post.published_at || undefined}
        url={`${baseUrl}/blog/${slug}`}
        imageUrl={ogImageUrl}
        authorName="depp"
      />

      <Link href="/blog" className="text-sm text-muted hover:text-accent">
        &larr; Blog
      </Link>

      <header className="mt-8 mb-12">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="mt-3 flex gap-3 text-sm text-muted">
          {formattedDate && <time dateTime={post.published_at!}>{formattedDate}</time>}
          <span>{post.view_count.toLocaleString()} views</span>
        </div>
      </header>

      <div className="prose">
        {post.content.split('\n').map((paragraph, index) => {
          if (!paragraph.trim()) return null;
          if (paragraph.startsWith('# ')) return <h1 key={index}>{paragraph.slice(2)}</h1>;
          if (paragraph.startsWith('## ')) return <h2 key={index}>{paragraph.slice(3)}</h2>;
          if (paragraph.startsWith('### ')) return <h3 key={index}>{paragraph.slice(4)}</h3>;
          return <p key={index}>{paragraph}</p>;
        })}
      </div>
    </article>
  );
}
