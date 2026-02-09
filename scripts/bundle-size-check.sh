#!/bin/bash

# Bundle Size Check Script
# Run this after `npm run build` to check bundle sizes

echo "=== Bundle Size Report ==="
echo ""

# Check .next folder size
echo "Total build size:"
du -sh .next 2>/dev/null || echo "Build not found"

echo ""
echo "Client-side JS chunks (top 10):"
find .next/static/chunks -name "*.js" -exec ls -lh {} \; 2>/dev/null \
  | sort -k5 -h -r \
  | head -10 \
  | awk '{print $9, $5}'

echo ""
echo "Total client JS:"
find .next/static/chunks -name "*.js" -exec du -ch {} + 2>/dev/null \
  | grep total \
  | awk '{print $1}'

echo ""
echo "Page chunks:"
find .next/static/chunks/pages -name "*.js" -exec ls -lh {} \; 2>/dev/null \
  | awk '{print $9, $5}'

echo ""
echo "=== End Report ==="
