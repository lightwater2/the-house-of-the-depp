import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ResearchCard from '@/components/ResearchCard';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { generateMetadata as createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Research',
  description: '리서치 - 실험, 프로토타입, 그리고 탐구한 것들입니다. 새로운 기술과 아이디어를 실험하고 탐구하는 과정을 기록합니다.',
  path: '/research',
  keywords: ['리서치', '연구', '실험', '프로토타입', '탐구'],
});

async function getResearches() {
  const { data } = await supabase
    .from('researches')
    .select('*')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function ResearchPage() {
  const researches = await getResearches();

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://the-house-of-the-depp.vercel.app' },
        { name: 'Research', url: 'https://the-house-of-the-depp.vercel.app/research' },
      ]} />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold">Research</h1>
        <p className="mt-2 text-sm text-muted">실험, 프로토타입, 그리고 탐구한 것들.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {researches.length > 0 ? (
          researches.map((r) => <ResearchCard key={r.id} research={r} />)
        ) : (
          <p className="text-sm text-muted">아직 등록된 연구가 없습니다.</p>
        )}
      </div>
      </>
  );
}
