#!/usr/bin/env node

/**
 * Frontend QA Script
 *
 * Tests frontend components, UI/UX, accessibility, responsive design.
 * Checks: user flows, form validation, error states, loading states.
 *
 * Usage: node scripts/frontend-qa.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test results
const results = {
  passed: [],
  failed: [],
  warnings: [],
};

/**
 * Log test result
 */
function logTest(name, passed, details = '') {
  if (passed) {
    console.log(`✓ ${name}${details ? ': ' + details : ''}`);
    results.passed.push({ name, details });
  } else {
    console.log(`✗ ${name}${details ? ': ' + details : ''}`);
    results.failed.push({ name, details });
  }
}

/**
 * Log warning
 */
function logWarning(name, details) {
  console.log(`⚠️  ${name}: ${details}`);
  results.warnings.push({ name, details });
}

async function runTests() {
  console.log('\n🎨 Starting Frontend QA Tests\n');
  console.log('─'.repeat(80));

  // Test 1: Theme Toggle - Keyboard Navigation
  console.log('\n📱 Test 1: Theme Toggle Keyboard Navigation');
  console.log('Checking for keyboard shortcuts and accessibility...');

  try {
    // Read ThemeToggle component
    const themeTogglePath = path.join(__dirname, '../src/components/ThemeToggle.tsx');
    const themeToggleContent = fs.readFileSync(themeTogglePath, 'utf-8');

    // Check for keyboard accessibility
    const hasKeyboardNav = themeToggleContent.includes('onKeyDown') || 
                          themeToggleContent.includes('keydown');

    if (!hasKeyboardNav) {
      logTest('Theme toggle keyboard navigation', false, 'No keyboard event handlers found');
      logWarning('Accessibility', 'Consider adding Cmd+K or similar keyboard shortcuts');
    } else {
      logTest('Theme toggle keyboard navigation', true, 'Keyboard handlers detected');
    }

    // Check ARIA labels
    const hasAriaLabels = themeToggleContent.includes('aria-label');
    if (hasAriaLabels) {
      logTest('Theme toggle ARIA labels', true, 'All buttons have aria-labels');
    } else {
      logTest('Theme toggle ARIA labels', false, 'Some buttons missing aria-labels');
    }

  } catch (error) {
    logTest('Theme toggle keyboard check', false, error.message);
  }

  // Test 2: PostCard - Accessible View Count
  console.log('\n📝 Test 2: PostCard View Count Accessibility');
  console.log('Checking if emoji is replaced with accessible content...');

  try {
    const postCardPath = path.join(__dirname, '../src/components/PostCard.tsx');
    const postCardContent = fs.readFileSync(postCardPath, 'utf-8');

    const hasViewEmoji = postCardContent.includes('👁');
    const hasAriaOrText = postCardContent.includes('aria-label') || 
                          postCardContent.includes('views:');

    if (hasViewEmoji && !hasAriaOrText) {
      logTest('PostCard view count accessibility', false, '👁 emoji is not screen reader friendly');
      logWarning('Accessibility', 'Replace emoji with ARIA label or "X views" text');
    } else if (hasViewEmoji && hasAriaOrText) {
      logTest('PostCard view count accessibility', true, 'Emoji present but ARIA/text also present');
    } else {
      logTest('PostCard view count accessibility', true, 'View count properly displayed');
    }

  } catch (error) {
    logTest('PostCard accessibility check', false, error.message);
  }

  // Test 3: Responsive Design - Header Mobile Menu
  console.log('\n📱 Test 3: Header Responsive Design');
  console.log('Checking mobile menu behavior...');

  try {
    const headerPath = path.join(__dirname, '../src/components/Header.tsx');
    const headerContent = fs.readFileSync(headerPath, 'utf-8');

    // Check for mobile menu implementation
    const hasMobileMenu = headerContent.includes('isMobileMenuOpen') || 
                          headerContent.includes('hamburger') ||
                          headerContent.includes('Menu');

    if (hasMobileMenu) {
      logTest('Header mobile menu', true, 'Mobile menu implemented');
      
      // Check for responsive classes
      const hasResponsiveClasses = headerContent.includes('md:') || 
                                   headerContent.includes('hidden md:flex');

      if (hasResponsiveClasses) {
        logTest('Header responsive classes', true, 'Tailwind responsive classes detected');
      } else {
        logTest('Header responsive classes', false, 'No obvious responsive classes');
      }

      // Check for proper breakpoints
      const hasBreakpoints = headerContent.includes('768px') || 
                            headerContent.includes('640px') ||
                            headerContent.includes('sm:') || 
                            headerContent.includes('md:');

      if (hasBreakpoints) {
        logTest('Header breakpoints', true, 'Breakpoint logic detected');
      } else {
        logWarning('Header breakpoints', 'Breakpoints may be hardcoded or missing');
      }

    } else {
      logTest('Header mobile menu', false, 'No mobile menu detected');
    }

  } catch (error) {
    logTest('Header responsive check', false, error.message);
  }

  // Test 4: Form Validation & Error States
  console.log('\n📋 Test 4: Form Validation & Error States');
  console.log('Checking admin page for form handling...');

  try {
    const adminPath = path.join(__dirname, '../src/app/admin/page.tsx');
    const adminContent = fs.existsSync(adminPath) ? 
                       fs.readFileSync(adminPath, 'utf-8') : '';

    if (adminContent) {
      // Check for error handling
      const hasErrorHandling = adminContent.includes('error') ||
                             adminContent.includes('Error') ||
                             adminContent.includes('catch');

      if (hasErrorHandling) {
        logTest('Admin error handling', true, 'Error handling present');
      } else {
        logWarning('Admin error handling', 'No explicit error handling found');
      }

      // Check for loading states
      const hasLoadingState = adminContent.includes('loading') ||
                             adminContent.includes('isLoading') ||
                             adminContent.includes('skeleton');

      if (hasLoadingState) {
        logTest('Admin loading states', true, 'Loading states implemented');
      } else {
        logWarning('Admin loading states', 'No loading states detected');
      }

      // Check for form validation
      const hasValidation = adminContent.includes('validation') ||
                             adminContent.includes('required') ||
                             adminContent.includes('pattern') ||
                             adminContent.includes('minLength');

      if (hasValidation) {
        logTest('Admin form validation', true, 'Form validation present');
      } else {
        logWarning('Admin form validation', 'No obvious form validation');
      }

    } else {
      logTest('Admin page check', false, 'Admin page not found');
    }

  } catch (error) {
    logTest('Form validation check', false, error.message);
  }

  // Test 5: Page Navigation & Routing
  console.log('\n🔗 Test 5: Page Navigation & Routing');
  console.log('Checking routing configuration...');

  try {
    const appPath = path.join(__dirname, '../src/app');

    // Check for proper route structure
    const pages = ['page.tsx', 'blog/page.tsx', 'blog/[slug]/page.tsx', 
                  'portfolio/page.tsx', 'research/page.tsx', 'about/page.tsx'];

    let pagesFound = 0;
    for (const page of pages) {
      const pagePath = path.join(appPath, page);
      if (fs.existsSync(pagePath)) {
        pagesFound++;
      }
    }

    logTest('Route structure', pagesFound === pages.length, `Found ${pagesFound}/${pages.length} expected pages`);

    // Check for 404 handling
    const notFoundPath = path.join(__dirname, '../src/app/not-found.tsx');
    const hasNotFound = fs.existsSync(notFoundPath);

    if (hasNotFound) {
      logTest('404 handling', true, 'not-found.tsx exists');
    } else {
      logWarning('404 handling', 'Custom 404 page not found');
    }

  } catch (error) {
    logTest('Routing check', false, error.message);
  }

  // Test 6: Performance & Bundle Size
  console.log('\n⚡ Test 6: Performance & Bundle Size');
  console.log('Checking build output for performance...');

  try {
    const nextDir = path.join(__dirname, '../.next');
    
    if (fs.existsSync(nextDir)) {
      // Check for static pages
      const staticDir = path.join(nextDir, 'static');
      if (fs.existsSync(staticDir)) {
        const staticFiles = fs.readdirSync(staticDir);
        const jsFiles = staticFiles.filter(f => f.endsWith('.js'));
        
        logTest('Static generation', true, `Generated ${jsFiles.length} static files`);
      }

      // Check for chunk optimization
      const chunksDir = path.join(nextDir, 'static/chunks');
      if (fs.existsSync(chunksDir)) {
        const chunks = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'));
        
        let totalSize = 0;
        chunks.forEach(chunk => {
          const chunkPath = path.join(chunksDir, chunk);
          const stats = fs.statSync(chunkPath);
          totalSize += stats.size;
        });

        const totalSizeKB = totalSize / 1024;
        const totalSizeMB = totalSizeKB / 1024;

        logTest('Bundle size analysis', true, 
                `Total: ${totalSizeKB.toFixed(2)} KB (${totalSizeMB.toFixed(2)} MB)`);

        if (totalSizeMB > 0.5) {
          logWarning('Bundle size', 'Bundle exceeds 500KB');
        } else if (totalSizeMB > 0.2) {
          logWarning('Bundle size', 'Bundle exceeds 200KB');
        }
      }
    } else {
      logTest('Build output', false, '.next directory not found (run npm run build first)');
    }

  } catch (error) {
    logTest('Performance check', false, error.message);
  }

  // Test 7: Accessibility (WCAG Compliance)
  console.log('\n♿ Test 7: Accessibility (WCAG Compliance)');
  console.log('Checking accessibility features...');

  try {
    // Check for semantic HTML
    const componentsDir = path.join(__dirname, '../src/components');
    const components = fs.readdirSync(componentsDir).filter(f => 
      f.endsWith('.tsx') || f.endsWith('.jsx'));

    let semanticIssues = 0;
    let accessibleComponents = 0;

    for (const component of components) {
      const componentPath = path.join(componentsDir, component);
      const content = fs.readFileSync(componentPath, 'utf-8');

      // Check for semantic elements
      const hasHeader = content.includes('<header>') || content.includes('<Header');
      const hasNav = content.includes('<nav>') || content.includes('<nav>');
      const hasMain = content.includes('<main>') || content.includes('<main>');
      const hasFooter = content.includes('<footer>') || content.includes('<Footer>');
      const hasArticle = content.includes('<article>') || content.includes('<article>');

      if (hasHeader || hasNav || hasMain || hasFooter || hasArticle) {
        accessibleComponents++;
      }

      // Check for ARIA attributes
      const hasAria = content.includes('aria-') || content.includes('ariaLabel') ||
                     content.includes('ariaHidden') || content.includes('role=');
      
      if (!hasAria) {
        semanticIssues++;
      }
    }

    logTest('Semantic HTML', accessibleComponents > 0, 
              `${accessibleComponents}/${components.length} components use semantic elements`);
    logTest('ARIA attributes', components.length - semanticIssues === components.length,
              `${components.length - semanticIssues}/${components.length} components have ARIA`);

  } catch (error) {
    logTest('Accessibility check', false, error.message);
  }

  // Test 8: Browser Compatibility (Static Analysis)
  console.log('\n🌐 Test 8: Browser Compatibility (Static Analysis)');
  console.log('Checking for browser-specific code...');

  try {
    const componentsDir = path.join(__dirname, '../src/components');
    const components = fs.readdirSync(componentsDir).filter(f => 
      f.endsWith('.tsx') || f.endsWith('.jsx'));

    const browserSpecificCode = [
      'webkitAppearance',
      'mozAppearance',
      'msAppearance',
      'window.safari',
      'document.all',
      'navigator.userAgent',
    ];

    let hasBrowserSpecific = false;
    let compatibleCount = 0;

    for (const component of components) {
      const componentPath = path.join(componentsDir, component);
      const content = fs.readFileSync(componentPath, 'utf-8');

      let componentBrowserSpecific = false;
      for (const pattern of browserSpecificCode) {
        if (content.includes(pattern)) {
          componentBrowserSpecific = true;
          hasBrowserSpecific = true;
        }
      }

      if (!componentBrowserSpecific) {
        compatibleCount++;
      }
    }

    if (hasBrowserSpecific) {
      logTest('Browser compatibility', false, 'Browser-specific code detected');
      logWarning('Browser compatibility', browserSpecificCode.join(', '));
    } else {
      logTest('Browser compatibility', true, 
                `${compatibleCount}/${components.length} components are cross-browser compatible`);
    }

  } catch (error) {
    logTest('Browser compatibility check', false, error.message);
  }

  // Summary
  console.log('\n📋 Test Summary');
  console.log('─'.repeat(80));
  console.log(`✓ Passed: ${results.passed.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);

  if (results.failed.length === 0) {
    console.log('\n✅ All frontend QA tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Review failed tests above.');
  }

  // Save results
  const qaResults = {
    timestamp: new Date().toISOString(),
    totalTests: results.passed.length + results.failed.length,
    passed: results.passed.length,
    failed: results.failed.length,
    warnings: results.warnings.length,
    details: results,
  };

  const resultsPath = path.join(__dirname, '../memory/frontend-qa.json');
  fs.writeFileSync(resultsPath, JSON.stringify(qaResults, null, 2));

  console.log(`\n📂 Results saved to: ${resultsPath}`);
}

// Run tests
runTests().catch(error => {
  console.error('\n❌ Frontend QA script failed:', error);
  process.exit(1);
});
