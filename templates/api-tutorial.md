# [API Tutorial Title]

## Summary (Excerpt)
[One-liner]: Step-by-step guide to [integrate/use X API]. Covers setup, authentication, and real-world implementation.

## Published Date
YYYY-MM-DD

## Tags
tutorial, api, [api-name], [tech-stack]

## Difficulty
Beginner / Intermediate / Advanced

## Time to Complete
X minutes / hours

---

## Introduction

### What We're Building
[Brief description of what we'll build by the end of this tutorial]

### Prerequisites
- [ ] Node.js installed (v18+)
- [ ] [API key] from [service]
- [ ] Basic knowledge of [concept]

### Why This API?
- Main use case 1
- Main use case 2
- Key benefit vs alternatives

## Setup

### Step 1: Get API Keys

1. Sign up at [API Provider]
2. Navigate to API Keys section
3. Create new API key
4. Store securely (use environment variables!)

```bash
# .env.example
API_KEY=your_api_key_here
API_SECRET=your_secret_here
```

### Step 2: Install Dependencies

```bash
npm install [package-name]
# or
npm install @api/client
```

### Step 3: Initialize Client

```typescript
import { ApiClient } from 'api-client';

const client = new ApiClient({
  apiKey: process.env.API_KEY,
  environment: 'production',
});
```

## Authentication

### API Key Authentication
```typescript
// Using API key in headers
const response = await fetch('https://api.example.com/endpoint', {
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}`,
    'Content-Type': 'application/json',
  },
});
```

### OAuth Flow (if applicable)
```typescript
// OAuth implementation
// Step 1: Redirect to auth URL
// Step 2: Handle callback
// Step 3: Exchange code for access token
```

## Core Functionality

### Fetching Data

#### Basic Request
```typescript
const data = await client.get('/users', {
  params: {
    limit: 10,
    sort: 'created:desc',
  },
});
```

#### With Error Handling
```typescript
try {
  const data = await client.get('/users');
  console.log(data);
} catch (error) {
  if (error.response?.status === 401) {
    console.error('Unauthorized - check API key');
  } else if (error.response?.status === 429) {
    console.error('Rate limited - retry later');
  }
}
```

### Creating Data

```typescript
const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Updating Data

```typescript
const updatedUser = await client.put('/users/123', {
  name: 'Jane Doe',
});
```

### Deleting Data

```typescript
await client.delete('/users/123');
```

## Advanced Usage

### Pagination
```typescript
let allData = [];
let page = 1;

while (true) {
  const response = await client.get('/items', {
    params: { page, limit: 50 },
  });

  allData.push(...response.data);

  if (response.data.length < 50) break;
  page++;
}
```

### Rate Limiting
```typescript
import pLimit from 'p-limit';

const limit = pLimit(5); // Max 5 concurrent requests

const requests = data.map(item =>
  limit(() => client.post('/sync', item))
);

await Promise.all(requests);
```

### Caching
```typescript
// Simple in-memory cache
const cache = new Map();

async function fetchWithCache(key, fetcher) {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const data = await fetcher();
  cache.set(key, data, { ttl: 60000 }); // 1 minute
  return data;
}
```

## Real-World Example

### Building a Feature
```typescript
// Complete example of a real feature
// Example: Weather app, task manager, etc.

export async function getWeather(city: string) {
  const data = await weatherApi.get('/current', {
    params: { q: city, units: 'metric' },
  });

  return {
    temperature: data.main.temp,
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}
```

## Testing

### Mocking API Calls
```typescript
// For unit testing
import { vi } from 'vitest';

vi.mock('api-client', () => ({
  ApiClient: vi.fn(() => ({
    get: vi.fn().mockResolvedValue({ data: mockData }),
  })),
}));
```

### Integration Testing
```typescript
// Test actual API interactions (with test keys)
describe('API Integration', () => {
  it('should fetch user data', async () => {
    const user = await client.get('/users/123');
    expect(user.id).toBe('123');
  });
});
```

## Common Pitfalls

### ❌ Don't

- **Hardcode API keys**: Use environment variables
- **Ignore rate limits**: Implement exponential backoff
- **Skip error handling**: Always handle API failures
- **Cache everything**: Cache only static data

### ✅ Do

- **Validate responses**: Check data shape
- **Log errors**: For debugging
- **Monitor usage**: Track API calls
- **Use types**: TypeScript interfaces

## Best Practices

1. **Always use HTTPS**
2. **Implement retry logic**
3. **Validate inputs before sending**
4. **Handle edge cases** (empty results, network failures)
5. **Document your API usage**
6. **Monitor API health**

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check API key is valid and active |
| 429 Too Many Requests | Implement rate limiting, wait before retry |
| 500 Server Error | Retry with exponential backoff, check API status |
| CORS Error | Ensure API allows your domain |

## Related APIs

- [Alternative API 1](URL) - Comparison
- [Complementary API 2](URL) - Integration example

## Conclusion

Summarize what we learned:
- API setup and authentication
- Core CRUD operations
- Advanced patterns (pagination, caching)
- Best practices for production use

## Next Steps

- [ ] Build complete application
- [ ] Add authentication
- [ ] Implement real-time features
- [ ] Deploy to production

---

*Tutorial published on [Date]. Questions? Check the [API documentation] or [contact].*
