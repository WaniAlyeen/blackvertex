import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Black Vertex — AI Advertising & Automation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle cyan glow in background */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Top-left corner accent */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '60px',
            width: '2px',
            height: '48px',
            background: '#00D4FF',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
          }}
        >
          <div
            style={{
              fontSize: '88px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-3px',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            BLACK VERTEX
          </div>

          {/* Cyan divider line */}
          <div
            style={{
              width: '80px',
              height: '2px',
              background: '#00D4FF',
              margin: '24px 0',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: '26px',
              fontWeight: 300,
              color: '#00D4FF',
              letterSpacing: '6px',
              textTransform: 'uppercase',
            }}
          >
            AI Advertising &amp; Automation
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            right: '60px',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '2px',
          }}
        >
          blackvertex.io
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
