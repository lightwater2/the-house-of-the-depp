import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import { generateMetadata as createMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description: '기술 블로그 - 생각과 경험을 기록합니다. AI, 소프트웨어 개발, 에이전트 기반 시스템에 대한 글들을 모았습니다.',
  path: '/blog',
  keywords: ['블로그', '기술 글', '개발', 'AI', '포스팅'],
});

async function getPosts() {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://the-house-of-the-depp.vercel.app' },
        { name: 'Blog', url: 'https://the-house-of-the-depp.vercel.app/blog' },
      ]} />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="mt-2 text-sm text-muted">생각과 경험을 기록합니다.</p>

        <div className="mt-8 divide-y divide-border">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="py-8 text-sm text-muted">아직 작성된 글이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
