import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'the-house-of-the-depp';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              opacity: '0.05',
              background:
                'repeating-linear-gradient(90deg, #00ff88 0, #00ff88 1px, transparent 1px, transparent 32px), repeating-linear-gradient(0deg, #00ff88 0, #00ff88 1px, transparent 1px, transparent 32px)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#00ff88',
                marginBottom: '20px',
                letterSpacing: '2px',
              }}
            >
              THE-HOUSE-OF-THE-DEPP
            </div>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: '700',
                color: '#e5e5e5',
                lineHeight: '1.1',
                marginBottom: '20px',
              }}
            >
              {title.length > 60 ? title.slice(0, 60) + '...' : title}
            </h1>
            <div
              style={{
                fontSize: '20px',
                color: '#666',
                marginTop: '20px',
              }}
            >
              Agentic Engineer's Tech Blog & Portfolio
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              width: '100px',
              height: '4px',
              backgroundColor: '#00ff88',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
