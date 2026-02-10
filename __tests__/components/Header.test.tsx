import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Header from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';

// Mock usePathname
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders logo link', () => {
    render(<Header />);
    const logo = screen.getByRole('link');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent('depp');
    expect(logo).toHaveAttribute('aria-label', 'Home');
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders theme toggle', () => {
    render(<Header />);
    const themeToggle = screen.getByRole('button');
    expect(themeToggle).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label');
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
