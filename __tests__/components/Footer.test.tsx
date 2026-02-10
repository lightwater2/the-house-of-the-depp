import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Footer from '@/components/Footer';

// Mock current year
vi.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(2026);

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders navigation links', () => {
    const blogLink = screen.getByText('Blog');
    const portfolioLink = screen.getByText('Portfolio');
    const researchLink = screen.getByText('Research');
    const aboutLink = screen.getByText('About');

    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(researchLink).toBeInTheDocument();
    expect(researchLink).toHaveAttribute('href', '/research');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders copyright with current year', () => {
    const copyright = screen.getByText(/Copyright/i);
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent('2026');
  });

  it('renders social links', () => {
    const githubLink = screen.getByText('GitHub');
    const twitterLink = screen.getByText('Twitter');
    const linkedinLink = screen.getByText('LinkedIn');
    const rssLink = screen.getByText('RSS');

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', expect.stringContaining('twitter.com'));

    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));

    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute('href', '/blog/rss');
  });

  it('has proper ARIA labels', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const navigation = screen.getByLabelText(/Footer navigation/i);
    expect(navigation).toBeInTheDocument();

    const githubLink = screen.getByLabelText(/Source code on GitHub/i);
    expect(githubLink).toBeInTheDocument();

    const twitterLink = screen.getByLabelText(/Follow on Twitter/i);
    expect(twitterLink).toBeInTheDocument();

    const linkedinLink = screen.getByLabelText(/Connect on LinkedIn/i);
    expect(linkedinLink).toBeInTheDocument();

    const rssLink = screen.getByLabelText(/Subscribe to RSS feed/i);
    expect(rssLink).toBeInTheDocument();
  });

  it('links have correct hover states', () => {
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toHaveClass('text-sm', 'text-muted', 'hover:text-foreground');
  });

  it('social icons are visually hidden', () => {
    const githubIcon = screen.getByRole('img');
    const twitterIcon = screen.getByRole('img');
    const linkedinIcon = screen.getByRole('img');
    const rssIcon = screen.getByRole('img');

    expect(githubIcon).toHaveClass('h-4', 'w-4', 'aria-hidden');
    expect(twitterIcon).toHaveClass('h-4', 'w-4', 'aria-hidden');
    expect(linkedinIcon).toHaveClass('h-4', 'w-4', 'aria-hidden');
    expect(rssIcon).toHaveClass('h-4', 'w-4', 'aria-hidden');
  });
});
