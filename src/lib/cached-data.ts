import { supabase } from '@/lib/supabase';
import type { Post, Project, Research } from '@/types/database';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Helper to check cache validity
 */
function isCacheValid(entry: { data: any; timestamp: number }) {
  return Date.now() - entry.timestamp < CACHE_DURATION;
}

/**
 * Get cached data or fetch fresh data
 */
async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);

  if (cached && isCacheValid(cached)) {
    return cached.data as T;
  }

  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });

  return data;
}

/**
 * Fetch posts with caching
 */
export async function getPosts(options?: {
  limit?: number;
  includeUnpublished?: boolean;
}) {
  const cacheKey = `posts-${JSON.stringify(options)}`;

  return cachedFetch(cacheKey, async () => {
    let query = supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (!options?.includeUnpublished) {
      query = query.not('published_at', 'is', null);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data } = await query;
    return data ?? [];
  });
}

/**
 * Fetch a single post by slug with caching
 */
export async function getPostBySlug(slug: string) {
  const cacheKey = `post-${slug}`;

  return cachedFetch(cacheKey, async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    return data;
  });
}

/**
 * Fetch projects with caching
 */
export async function getProjects(options?: {
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  const cacheKey = `projects-${JSON.stringify(options)}`;

  return cachedFetch(cacheKey, async () => {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (options?.featured) {
      query = query.eq('featured', true);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data } = await query;
    return data ?? [];
  });
}

/**
 * Fetch research with caching
 */
export async function getResearches(options?: {
  category?: string;
  limit?: number;
}): Promise<Research[]> {
  const cacheKey = `researches-${JSON.stringify(options)}`;

  return cachedFetch(cacheKey, async () => {
    let query = supabase
      .from('researches')
      .select('*')
      .order('created_at', { ascending: false });

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data } = await query;
    return data ?? [];
  });
}

/**
 * Increment post view count (no cache)
 */
export async function incrementViewCount(slug: string) {
  await supabase.rpc('increment_view_count', { post_slug: slug });
}

/**
 * Clear cache manually (if needed)
 */
export function clearCache() {
  cache.clear();
}
