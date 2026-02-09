#!/usr/bin/env node

/**
 * Bundle Size Analyzer
 *
 * This script analyzes the bundle size and provides recommendations.
 * Usage: node scripts/analyze-bundle.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUNDLE_DIR = path.join(__dirname, '../.next/static');
const MAX_SIZE_KB = 200; // Maximum acceptable bundle size in KB
const WARN_SIZE_KB = 100; // Warning threshold in KB

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / 1024;
}

/**
 * Recursively analyze bundles
 */
function analyzeDirectory(dir, depth = 0) {
  const results = [];

  if (!fs.existsSync(dir)) {
    console.log('Build directory not found. Run `npm run build` first.');
    return results;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      results.push(...analyzeDirectory(filePath, depth + 1));
    } else if (file.endsWith('.js') && !file.includes('chunk')) {
      const size = getFileSize(filePath);
      const relativePath = path.relative(BUNDLE_DIR, filePath);

      results.push({
        file: relativePath,
        size: size.toFixed(2),
        status: size > MAX_SIZE_KB ? 'CRITICAL' : size > WARN_SIZE_KB ? 'WARNING' : 'OK',
      });
    }
  }

  return results;
}

/**
 * Print analysis results
 */
function printResults(results) {
  console.log('\n📊 Bundle Size Analysis\n');
  console.log('─'.repeat(80));

  const table = results.map(r => {
    const statusIcon = r.status === 'CRITICAL' ? '🔴' : r.status === 'WARNING' ? '🟡' : '🟢';
    const status = r.status.padEnd(9);
    const size = `${r.size} KB`.padEnd(10);
    return `${statusIcon} ${status} ${size} ${r.file}`;
  });

  if (table.length === 0) {
    console.log('No bundles found. Run `npm run build` first.\n');
    return;
  }

  table.forEach(line => console.log(line));

  // Summary
  const critical = results.filter(r => r.status === 'CRITICAL').length;
  const warning = results.filter(r => r.status === 'WARNING').length;
  const ok = results.filter(r => r.status === 'OK').length;

  console.log('\n📋 Summary');
  console.log('─'.repeat(80));
  console.log(`🔴 Critical: ${critical}`);
  console.log(`🟡 Warning:  ${warning}`);
  console.log(`🟢 OK:       ${ok}`);

  // Recommendations
  if (critical > 0 || warning > 0) {
    console.log('\n💡 Recommendations');
    console.log('─'.repeat(80));

    if (critical > 0) {
      console.log('• Consider code splitting for large bundles');
      console.log('• Use dynamic imports for non-critical code');
      console.log('• Remove unused dependencies');
    }

    if (warning > 0) {
      console.log('• Review bundle contents with `npm run analyze`');
      console.log('• Optimize lazy-loaded routes');
      console.log('• Consider tree-shaking optimizations');
    }
  }

  console.log('');
}

// Run analysis
const results = analyzeDirectory(BUNDLE_DIR);
printResults(results);
