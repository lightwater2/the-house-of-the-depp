import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ProjectCard from '@/components/ProjectCard';
import { BreadcrumbSchema, CollectionPageSchema } from '@/components/StructuredData';
import { generateMetadata as createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Portfolio',
  description: '포트폴리오 - 만들어온 프로젝트들을 소개합니다. Next.js, React, Supabase 등 다양한 기술을 활용한 프로젝트를 확인하세요.',
  path: '/portfolio',
  keywords: ['포트폴리오', '프로젝트', '작업물', '개발'],
});

async function getProjects() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://the-house-of-the-depp.vercel.app' },
        { name: 'Portfolio', url: 'https://the-house-of-the-depp.vercel.app/portfolio' },
      ]} />
      <CollectionPageSchema
        name="Portfolio"
        description="만들어온 프로젝트들을 소개합니다. Next.js, React, Supabase 등 다양한 기술을 활용한 프로젝트를 확인하세요."
        items={projects.map(p => ({
          name: p.title,
          url: `https://the-house-of-the-depp.vercel.app/portfolio/${p.id}`,
          description: p.description,
        }))}
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="mt-2 text-sm text-muted">만들어온 것들.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-sm text-muted">아직 등록된 프로젝트가 없습니다.</p>
        )}
      </div>
      </>
  );
}
