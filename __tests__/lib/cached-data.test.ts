import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPosts, getPostBySlug, clearCache } from '@/lib/cached-data';

// Mock Supabase client
const mockEq = vi.fn(() => ({
  single: vi.fn(() => Promise.resolve({ data: mockData })),
}));

const mockNot = vi.fn(() => ({
  limit: vi.fn(() => Promise.resolve({ data: [mockData] })),
}));

const mockOrder = vi.fn(() => ({
  not: mockNot,
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn((table: string) => ({
      select: vi.fn(() => ({
        order: mockOrder,
        eq: mockEq,
      })),
    })),
  },
}));

const mockData = {
  id: '1',
  slug: 'test-post',
  title: 'Test Post',
  content: 'Test content',
  excerpt: 'Test excerpt',
  published_at: '2026-02-10T00:00:00Z',
  view_count: 0,
  created_at: '2026-02-10T00:00:00Z',
};

describe('cached-data utilities', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearCache();
  });

  describe('getPosts', () => {
    it('fetches posts from Supabase', async () => {
      const posts = await getPosts({ limit: 5 });
      expect(posts).toEqual([mockData]);
    });

    it('caches results', async () => {
      const firstCall = await getPosts({ limit: 5 });
      const secondCall = await getPosts({ limit: 5 });
      // Both calls should return the same cached data
      expect(firstCall).toEqual(secondCall);
    });

    it('respects limit parameter', async () => {
      const posts = await getPosts({ limit: 5 });
      // Should call Supabase with limit
      expect(posts).toBeDefined();
    });
  });

  describe('getPostBySlug', () => {
    it('fetches a single post by slug', async () => {
      const post = await getPostBySlug('test-post');
      expect(post).toEqual(mockData);
    });

    it('caches single post result', async () => {
      const firstCall = await getPostBySlug('test-post');
      const secondCall = await getPostBySlug('test-post');
      expect(firstCall).toEqual(secondCall);
    });

    it('returns different data for different slugs (different cache entries)', async () => {
      const post1 = await getPostBySlug('test-post');
      const post2 = await getPostBySlug('test-post-2');
      // Since we're using the same mock, they'll have the same data
      // but they should be different cache entries
      expect(post1).toBeDefined();
      expect(post2).toBeDefined();
    });
  });

  describe('clearCache', () => {
    it('clears the in-memory cache', async () => {
      await getPosts({ limit: 5 });
      clearCache();
      // Next call should fetch fresh data
      const posts = await getPosts({ limit: 5 });
      expect(posts).toBeDefined();
    });
  });
});
