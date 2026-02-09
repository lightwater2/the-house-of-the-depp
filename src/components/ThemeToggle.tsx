'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      <button
        onClick={() => setTheme('light')}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          theme === 'light'
            ? 'bg-accent text-background'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Light theme"
        title="Light theme"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          theme === 'system'
            ? 'bg-accent text-background'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="System theme"
        title="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          theme === 'dark'
            ? 'bg-accent text-background'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Dark theme"
        title="Dark theme"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
