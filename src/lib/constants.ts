/**
 * Application Constants
 *
 * Centralized constants used throughout the application.
 * Improves maintainability and makes changes easier to track.
 */

/**
 * Application metadata
 */
export const APP_METADATA = {
  NAME: 'the-house-of-the-depp',
  DESCRIPTION: 'Agentic Engineer의 기술 블로그 & 포트폴리오',
  AUTHOR: 'depp',
  SITE_URL: 'https://the-house-of-the-depp.vercel.app',
} as const;

/**
 * Cache configuration
 */
export const CACHE_CONFIG = {
  TTL_MS: 5 * 60 * 1000, // 5 minutes in milliseconds
  KEYS: {
    POSTS: 'posts',
    POST: (slug: string) => `post-${slug}`,
    PROJECTS: 'projects',
    RESEARCHES: 'researches',
  },
} as const;

/**
 * Supabase table names
 */
export const DB_TABLES = {
  POSTS: 'posts',
  PROJECTS: 'projects',
  RESEARCHES: 'researches',
  PAGE_VIEWS: 'page_views',
} as const;

/**
 * Date and time formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'ko-KR',
  ISO: 'YYYY-MM-DD',
  INPUT: 'YYYY-MM-DD',
} as const;

/**
 * UI constants
 */
export const UI = {
  POSTS_PER_PAGE: 10,
  PROJECTS_PER_PAGE: 12,
  RESEARCHES_PER_PAGE: 12,
  HERO_TITLE: 'Agentic Engineer',
  HERO_DESCRIPTION: 'AI와 소프트웨어 개발의 교차점에서 에이전트 기반 시스템을 탐구합니다.',
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  SUPABASE_FUNCTIONS: {
    INCREMENT_VIEW_COUNT: 'increment_view_count',
  },
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  VIEW_COUNT: 0,
} as const;

/**
 * Regex patterns
 */
export const REGEX = {
  SLUG_PATTERN: /[^a-z0-9가-힣\s-]/g,
  WHITESPACE: /\s+/g,
  LEADING_TRAILING_DASH: /^-+|-+$/g,
} as const;
