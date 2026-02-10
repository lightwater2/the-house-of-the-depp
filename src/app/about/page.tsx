import type { Metadata } from 'next';
import { PersonSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { generateMetadata as createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'About',
  description: 'AI와 소프트웨어 개발의 교차점에서 에이전트 기반 시스템을 탐구하는 엔지니어에 대해 알아보세요.',
  path: '/about',
  keywords: ['소개', '프로필', '스킬', '연락처'],
});

const skills: Record<string, string[]> = {
  'Languages': ['TypeScript', 'Python', 'Go', 'Rust'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS'],
  'Backend': ['Node.js', 'FastAPI', 'PostgreSQL'],
  'AI/ML': ['LangChain', 'OpenAI API', 'Claude API'],
  'Infra': ['Docker', 'AWS', 'Vercel'],
};

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://the-house-of-the-depp.vercel.app' },
        { name: 'About', url: 'https://the-house-of-the-depp.vercel.app/about' },
      ]} />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold">About</h1>

      <div className="mt-8 space-y-4 text-muted">
        <p>
          AI와 소프트웨어 개발의 교차점에서 에이전트 기반 시스템을 탐구하고 있습니다.
        </p>
        <p>
          복잡한 문제를 단순하게 해결하는 것을 좋아하고,
          코드를 통해 아이디어를 현실로 만드는 과정을 즐깁니다.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-bold">Skills</h2>
        <div className="mt-4 space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-4">
              <span className="w-20 shrink-0 text-sm text-accent">{category}</span>
              <span className="text-sm text-muted">{items.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold">Contact</h2>
        <div className="mt-4 flex gap-6 text-sm">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
            GitHub
          </a>
          <a href="mailto:hello@example.com" className="text-muted hover:text-accent">
            Email
          </a>
        </div>
      </section>
      </div>
      </>
  );
}
