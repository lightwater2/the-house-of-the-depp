import type { Project } from '@/types/database';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-medium text-foreground">{project.title}</h3>
        {project.featured && (
          <span className="text-xs text-accent">★ Featured</span>
        )}
      </div>

      {project.description && (
        <p className="mt-2 text-sm text-muted line-clamp-2">{project.description}</p>
      )}

      {project.tech_stack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-muted px-2 py-0.5 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
            aria-label={`${project.title} - View code on GitHub`}
          >
            Code
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
            aria-label={`${project.title} - View live demo`}
          >
            Demo
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
