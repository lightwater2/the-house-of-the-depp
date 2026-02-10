import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '@/components/ThemeToggle';

// Mock next-themes
const mockSetTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    resolvedTheme: 'light',
  }),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it('renders a toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('has an icon (SVG)', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('has icon with aria-hidden="true"', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('button has proper classes for styling', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-md', 'p-1.5');
  });
});
