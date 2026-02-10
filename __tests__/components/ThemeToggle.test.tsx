import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ThemeToggle from '@/components/ThemeToggle';

// Mock useTheme hook
const mockSetTheme = vi.fn();

vi.mock('@/lib/theme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    actualTheme: 'light',
  }),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders three theme buttons', () => {
    render(<ThemeToggle />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('has correct light theme button', () => {
    render(<ThemeToggle />);
    const lightButton = screen.getByLabelText(/Light theme/i);
    expect(lightButton).toBeInTheDocument();
  });

  it('has correct dark theme button', () => {
    render(<ThemeToggle />);
    const darkButton = screen.getByLabelText(/Dark theme/i);
    expect(darkButton).toBeInTheDocument();
  });

  it('has correct system theme button', () => {
    render(<ThemeToggle />);
    const systemButton = screen.getByLabelText(/System theme/i);
    expect(systemButton).toBeInTheDocument();
  });

  it('calls setTheme with light on click', () => {
    render(<ThemeToggle />);
    const lightButton = screen.getByLabelText(/Light theme/i);
    lightButton.click();
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('calls setTheme with dark on click', () => {
    render(<ThemeToggle />);
    const darkButton = screen.getByLabelText(/Dark theme/i);
    darkButton.click();
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with system on click', () => {
    render(<ThemeToggle />);
    const systemButton = screen.getByLabelText(/System theme/i);
    systemButton.click();
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('has correct ARIA labels on all buttons', () => {
    render(<ThemeToggle />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('has accessible icon for light theme', () => {
    render(<ThemeToggle />);
    const lightButton = screen.getByLabelText(/Light theme/i);
    const icon = lightButton.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('has accessible icon for dark theme', () => {
    render(<ThemeToggle />);
    const darkButton = screen.getByLabelText(/Dark theme/i);
    const icon = darkButton.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('has accessible icon for system theme', () => {
    render(<ThemeToggle />);
    const systemButton = screen.getByLabelText(/System theme/i);
    const icon = systemButton.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
