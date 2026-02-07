/**
 * EdgeFilters - SVG Filter & Marker Definitions
 * 
 * Provides high-quality filters for edge rendering:
 * - Strong glow effects for highlighted edges
 * - Subtle glow for normal edges
 * - Arrow markers for all categories
 * - Orb glow for execution animation
 */

export function EdgeFilters() {
  // All edge categories with their colors
  const categories = [
    { id: 'MODEL', color: '#3b82f6' },
    { id: 'CONDITIONING', color: '#f59e0b' },
    { id: 'CLIP', color: '#f59e0b' },
    { id: 'LATENT', color: '#a855f7' },
    { id: 'IMAGE', color: '#10b981' },
    { id: 'VAE', color: '#8b5cf6' },
    { id: 'VIDEO', color: '#ec4899' },
    { id: 'AUDIO', color: '#06b6d4' },
    { id: 'CONTROL_NET', color: '#ef4444' },
    { id: 'INT', color: '#6b7280' },
    { id: 'FLOAT', color: '#6b7280' },
    { id: 'STRING', color: '#9ca3af' },
    { id: 'default', color: '#6b7280' },
  ];

  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* 
          NORMAL GLOW FILTER
          Soft, subtle glow for standard edges
          Creates depth without being overpowering
        */}
        <filter id="edge-glow-normal" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 
          STRONG GLOW FILTER
          Used when edge is highlighted/hovered
          Creates MUCH stronger visibility for easy tracing
        */}
        <filter id="edge-glow-strong" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
          <feColorMatrix
            in="blur1"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
            result="glow"
          />
          {/* Double blur for extra intensity */}
          <feGaussianBlur in="glow" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 
          CRISP FILTER
          Subtle sharpening for highlighted edges
          Makes them "pop" visually
        */}
        <filter id="edge-crisp" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.4 0"
          />
        </filter>

        {/* 
          ORB GLOW FILTER
          Bright, intense glow for animated execution orbs
          Multi-layer blur for maximum visibility
        */}
        <filter id="orb-glow-bright" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 
          ARROW MARKERS
          Category-specific arrow heads for connection endpoints
          Subtle but visible, color-matched to edge
        */}
        {categories.map(({ id, color }) => (
          <marker
            key={id}
            id={`arrow-${id}`}
            viewBox="0 0 12 12"
            refX="10"
            refY="6"
            markerWidth="11"
            markerHeight="11"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            {/* Arrow outer glow */}
            <path
              d="M 2 2 L 10 6 L 2 10 z"
              fill={color}
              opacity="0.4"
              filter="url(#arrow-glow)"
            />
            {/* Arrow solid body */}
            <path
              d="M 3 3 L 9 6 L 3 9 z"
              fill={color}
              opacity="0.95"
            />
          </marker>
        ))}

        {/* Arrow-specific soft glow */}
        <filter id="arrow-glow">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
    </svg>
  );
}
