# SEO Documentation for the-house-of-the-depp

## Overview

This blog implements comprehensive SEO best practices using Next.js 16 App Router features.

## Current SEO Setup

### 1. Centralized Metadata Generation

**File:** `src/lib/seo.ts`

- `generateMetadata()` - Centralized metadata generator for consistent SEO across all pages
- `generateOgUrl()` - Helper for generating OG image URLs
- Supports: title, description, keywords, OpenGraph, Twitter Cards, canonical URLs

**Usage:**
```tsx
export const metadata: Metadata = createMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-path',
  keywords: ['keyword1', 'keyword2'],
  noIndex: false, // Set to true for admin/private pages
});
```

### 2. Structured Data (Schema.org)

**File:** `src/components/StructuredData.tsx`

Implemented schemas:
- `BlogPosting` - For individual blog posts
- `WebSite` - For homepage with search action
- `Person` - For author/about page
- `BreadcrumbList` - For navigation breadcrumbs
- `CollectionPage` - For listing pages (blog, portfolio, research)

**Benefits:**
- Rich snippets in Google search results
- Better understanding of content structure
- Enhanced search result presentation

### 3. Dynamic Sitemap

**File:** `src/app/sitemap.ts`

- Automatically includes all published blog posts
- Includes research items
- Static pages with appropriate priorities
- Proper lastModified timestamps
- ChangeFrequency hints for crawlers

**URLs included:**
- `/` (priority 1.0, daily)
- `/blog` (priority 0.9, daily)
- `/portfolio` (priority 0.8, weekly)
- `/research` (priority 0.8, weekly)
- `/about` (priority 0.7, monthly)
- `/blog/[slug]` (priority 0.6, weekly)
- `/research/[id]` (priority 0.5, weekly)

### 4. Robots.txt

**File:** `src/app/robots.ts`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://the-house-of-the-depp.vercel.app/sitemap.xml
```

### 5. Open Graph Images

**File:** `src/app/api/og/route.tsx`

Dynamic OG image generation with:
- Custom title support
- On-the-fly generation at edge runtime
- Optimized dimensions (1200x630)
- Branded design with gradient background

**Usage:** `/api/og?title=Your%20Title`

### 6. PWA Manifest

**File:** `src/app/manifest.ts`

- Standalone app mode
- Custom theme color (#00ff88)
- Icon support (192x192, 512x512)
- Categories for discovery

## SEO Best Practices Implemented

### ✅ Completed

1. **Semantic HTML**
   - Proper use of `<article>`, `<header>`, `<section>` tags
   - ARIA labels for accessibility

2. **Meta Tags**
   - Title tags with site name suffix
   - Meta descriptions (150-160 chars)
   - Keywords for additional context
   - Canonical URLs to prevent duplicate content

3. **Open Graph Tags**
   - Title, description, type
   - Images with dimensions
   - Site name
   - Published time for articles

4. **Twitter Cards**
   - Large image card format
   - Title and description
   - Image support

5. **Structured Data**
   - BlogPosting for posts
   - CollectionPage for listing pages
   - BreadcrumbList for navigation
   - Person for author info
   - WebSite for homepage

6. **Technical SEO**
   - Dynamic sitemap
   - Robots.txt configuration
   - PWA manifest
   - Clean URLs (no query strings for content)

7. **Performance**
   - Edge runtime for OG images
   - Optimized bundle size
   - Lazy loading for images

8. **Accessibility**
   - ARIA labels on interactive elements
   - Alt text for images
   - Keyboard navigation support

### 📋 Recommended Future Improvements

1. **Add Google Search Console Verification**
   ```tsx
   // In src/app/layout.tsx
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

2. **Add Social Media Verification**
   ```tsx
   // In src/app/layout.tsx
   <meta property="fb:app_id" content="YOUR_FB_APP_ID" />
   <meta name="twitter:site" content="@yourusername" />
   ```

3. **Implement RSS Feed**
   ```tsx
   // src/app/rss/route.ts
   import { RSSFeed } from '@/lib/rss';
   ```

4. **Add Individual Project Pages**
   - Create `/src/app/portfolio/[id]/page.tsx`
   - Add ProjectPosting schema
   - Include in sitemap

5. **Add Individual Research Pages**
   - Create `/src/app/research/[id]/page.tsx`
   - Add appropriate schema
   - Include in sitemap (already added to sitemap)

6. **Add Favicon Variants**
   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   ```

7. **Implement Article Schema for Posts**
   - Add reading time
   - Add author information
   - Add article section

8. **Add FAQ Schema** (if applicable)
   - For tutorials/guides with Q&A sections

9. **Add HowTo Schema** (for tutorial posts)
   - Step-by-step instructions
   - Tool requirements
   - Estimated time

10. **Local Business Schema** (if applicable later)
    - Contact information
    - Opening hours
    - Location

## Testing Your SEO

### Tools to Use

1. **Google Search Console**
   - Submit sitemap
   - Monitor indexing status
   - Check for coverage issues

2. **Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test structured data implementation

3. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Monitor Core Web Vitals

4. **Lighthouse**
   - Built into Chrome DevTools
   - Run audits for SEO, Performance, Accessibility

5. **Screaming Frog**
   - Crawl your site
   - Check for broken links
   - Analyze meta data

6. **SEMrush / Ahrefs**
   - Track keyword rankings
   - Analyze competitors
   - Monitor backlinks

## Common SEO Issues and Solutions

### Issue: Pages Not Indexed

**Solution:**
1. Check robots.txt isn't blocking
2. Verify noIndex isn't set on pages
3. Submit to Google Search Console
4. Check for crawl errors in GSC

### Issue: Poor Search Rankings

**Solution:**
1. Create high-quality, original content
2. Optimize for featured snippets
3. Build internal linking structure
4. Ensure mobile-friendliness
5. Improve page load speed

### Issue: Duplicate Content

**Solution:**
1. Always use canonical URLs
2. Avoid URL parameters when possible
3. Use 301 redirects for moved content

### Issue: Poor Rich Snippets

**Solution:**
1. Validate structured data with Google's tool
2. Ensure all required fields are present
3. Keep content fresh and up-to-date

## Content Strategy Tips

1. **Blog Posts**
   - Use descriptive titles
   - Include meta descriptions
   - Add internal links to related posts
   - Update old posts regularly

2. **Portfolio**
   - Include project descriptions
   - Add tech stack keywords
   - Link to GitHub/demo URLs
   - Use images with alt text

3. **Research**
   - Write detailed abstracts
   - Include methodology
   - Share results/conclusions
   - Cite references if applicable

## Performance Impact

All SEO features are optimized for performance:
- Structured data is lightweight JSON
- OG images use edge runtime
- Sitemap is generated on-demand
- No blocking JavaScript for meta tags

## Monitoring Checklist

- [ ] Check Google Search Console weekly
- [ ] Monitor organic traffic in analytics
- [ ] Track keyword rankings
- [ ] Audit for broken links monthly
- [ ] Update sitemap when adding new content
- [ ] Test structured data after changes
- [ ] Monitor Core Web Vitals
- [ ] Check for crawl errors regularly

## References

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

Last Updated: 2026-02-10
