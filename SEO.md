# SEO Guide - the-house-of-the-depp

This guide documents the SEO implementation and best practices for this blog.

## Overview

The blog uses Next.js 16.1.6 with App Router for server-side rendering and automatic SEO optimization.

## Current SEO Features

### ✅ Implemented

1. **Dynamic Metadata**
   - All pages have proper metadata (title, description, keywords)
   - OG (Open Graph) tags for social sharing
   - Twitter Card support
   - Canonical URLs

2. **Structured Data (Schema.org)**
   - WebSite schema for homepage
   - BlogPosting schema for blog posts
   - Person schema for about page
   - BreadcrumbList schema for navigation
   - Article schema with author, publisher, and publishing dates

3. **Technical SEO**
   - robots.txt configured (disallows /admin and /api)
   - sitemap.xml with static and dynamic routes
   - Dynamic OG image generation (1200x630)
   - Proper meta descriptions and keywords

4. **Centralized SEO Utilities**
   - `src/lib/seo.ts` provides `generateMetadata()` helper
   - Consistent metadata across all pages
   - Easy to extend and maintain

### 📄 Pages and Their Metadata

| Page | Title Pattern | Description | Schema |
|------|---------------|-------------|--------|
| Home | Home | siteName | WebSite |
| Blog | Blog \| siteName | Full description | BreadcrumbList |
| Blog Post | Post Title \| siteName | Auto-excerpt | BlogPosting |
| About | About \| siteName | Personal intro | Person + BreadcrumbList |
| Portfolio | Portfolio \| siteName | Projects overview | BreadcrumbList |
| Research | Research \| siteName | Research overview | BreadcrumbList |
| Admin | Admin | (no-index) | None |

## SEO Checklist

### Pre-Deployment
- [ ] Run `npm run build` to check for metadata errors
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Test robots.txt at `/robots.txt`
- [ ] Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check all pages have unique titles and descriptions
- [ ] Verify OG images generate correctly

### Content Optimization
- [ ] Use descriptive titles (50-60 characters)
- [ ] Write compelling meta descriptions (150-160 characters)
- [ ] Include relevant keywords naturally in content
- [ ] Add alt text to all images
- [ ] Use proper heading hierarchy (h1 > h2 > h3)
- [ ] Keep content fresh and updated

### Technical Optimization
- [ ] Monitor Core Web Vitals (LCP, FID, CLS)
- [ ] Ensure mobile responsiveness
- [ ] Test with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Fix broken links regularly
- [ ] Optimize images (WebP, lazy loading)

## How to Add SEO to New Pages

### 1. Import the helper
```typescript
import { generateMetadata } from '@/lib/seo';
```

### 2. Export metadata
```typescript
export const metadata: Metadata = generateMetadata({
  title: 'Page Title',
  description: 'Page description...',
  path: '/page-path',
  keywords: ['keyword1', 'keyword2'],
});
```

### 3. Add structured data (if needed)
```typescript
import { BreadcrumbSchema } from '@/components/StructuredData';

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://the-house-of-the-depp.vercel.app' },
        { name: 'Page', url: 'https://the-house-of-the-depp.vercel.app/page' },
      ]} />
      {/* Page content */}
    </>
  );
}
```

## Monitoring and Analytics

### Tools to Use
1. **Google Search Console** - Monitor indexing and search performance
2. **Google Analytics** - Track traffic and user behavior
3. **PageSpeed Insights** - Performance monitoring
4. **Lighthouse** - Comprehensive audits

### Key Metrics to Track
- Organic traffic
- Click-through rate (CTR)
- Average position in search results
- Page load times
- Mobile vs desktop performance

## Future Improvements

### Phase 2 (Recommended)
- [ ] Add JSON-LD for Portfolio projects (CreativeWork schema)
- [ ] Add JSON-LD for Research items (ScholarlyArticle schema)
- [ ] Add Article schema with reading time
- [ ] Add FAQPage schema for FAQ sections
- [ ] Implement AMP for mobile pages (if needed)

### Phase 3 (Advanced)
- [ ] Add hreflang tags for multi-language support
- [ ] Implement structured data for comments
- [ ] Add organization schema with logo and social profiles
- [ ] Implement internal linking suggestions
- [ ] Add XML sitemap for images

## Common Issues and Solutions

### Issue: Sitemap not updating
**Solution:** Sitemap is generated on-demand. Clear cache and rebuild.

### Issue: OG images not showing
**Solution:** Check the `/api/og` route. Verify Vercel Edge Runtime is enabled.

### Issue: Structured data errors
**Solution:** Use Google Rich Results Test to validate. Check required fields.

### Issue: Duplicate content
**Solution:** Ensure canonical URLs are set. Avoid multiple URLs for same content.

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/essentials/seo-starter-guide)

## Last Updated

2026-02-10 - Comprehensive SEO audit and improvements
- Added centralized SEO utilities
- Enhanced metadata for all static pages
- Integrated structured data (PersonSchema, BreadcrumbList)
- Created this SEO guide
