import { useState } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer } from 'reactflow';

// Edge category colors (matching port types)
const edgeColors = {
  MODEL: { main: '#3b82f6', glow: '#93c5fd', label: 'Model' },
  CONDITIONING: { main: '#f59e0b', glow: '#fcd34d', label: 'Conditioning' },
  CLIP: { main: '#f59e0b', glow: '#fcd34d', label: 'CLIP' },
  LATENT: { main: '#a855f7', glow: '#d8b4fe', label: 'Latent' },
  IMAGE: { main: '#10b981', glow: '#6ee7b7', label: 'Image' },
  VAE: { main: '#8b5cf6', glow: '#c4b5fd', label: 'VAE' },
  VIDEO: { main: '#ec4899', glow: '#f9a8d4', label: 'Video' },
  AUDIO: { main: '#06b6d4', glow: '#67e8f9', label: 'Audio' },
  CONTROL_NET: { main: '#ef4444', glow: '#fca5a5', label: 'ControlNet' },
  INT: { main: '#6b7280', glow: '#9ca3af', label: 'Int' },
  FLOAT: { main: '#6b7280', glow: '#9ca3af', label: 'Float' },
  STRING: { main: '#9ca3af', glow: '#d1d5db', label: 'String' },
  default: { main: '#6b7280', glow: '#9ca3af', label: 'Connection' },
} as const;

type EdgeCategory = keyof typeof edgeColors;

interface CustomEdgeData {
  category?: EdgeCategory;
  isExecuting?: boolean;
  isHighlighted?: boolean;
}

/**
 * CustomEdge - Crystal-clear center-to-center connections
 * 
 * Key features:
 * - Precise port center to port center attachment
 * - Generous smooth curves for easy tracing
 * - Strong highlighting when hovering connected nodes
 * - Category-based coloring
 * - Animated execution flow
 * - Professional appearance
 */
export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  selected,
  data = {},
}: EdgeProps<CustomEdgeData>) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine category and colors
  const category = (data?.category || 'default') as EdgeCategory;
  const colors = edgeColors[category] || edgeColors.default;
  
  /**
   * SMOOTH CURVED PATH with GENEROUS parameters
   * - borderRadius: 56 = very smooth, flowing curves
   * - offset: 32 = allows longer detours for better routing
   * 
   * This creates natural, easy-to-follow paths that prioritize
   * readability over shortest distance
   */
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 56,  // Very generous curves
    offset: 32,        // Allow detours for better routing
  });

  // Calculate distance for very short connections
  const distance = Math.sqrt(
    Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2)
  );
  const isVeryShort = distance < 100;

  // Strong visual states
  const isHighlighted = selected || isHovered || data?.isHighlighted;
  const isExecuting = data?.isExecuting || false;
  
  /**
   * DYNAMIC SIZING based on state
   * - Normal: 4.5px (very visible)
   * - Highlighted: 6.5px (MUCH thicker for easy tracing)
   * - Glow: +10px wider for strong depth effect
   */
  const baseStrokeWidth = 4.5;
  const strokeWidth = isHighlighted ? 6.5 : baseStrokeWidth;
  const glowWidth = strokeWidth + 10;
  
  // Strong opacity differences
  const mainOpacity = isHighlighted ? 1 : 0.82;
  const glowOpacity = isHighlighted ? 0.75 : 0.4;

  return (
    <>
      {/* 
        OUTER GLOW - Creates strong depth and visibility
        This is the "halo" around the line that makes it stand out
      */}
      <path
        d={edgePath}
        fill="none"
        stroke={colors.glow}
        strokeWidth={glowWidth}
        opacity={glowOpacity}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: isHighlighted ? 'url(#edge-glow-strong)' : 'url(#edge-glow-normal)',
          pointerEvents: 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* 
        MAIN CONNECTION LINE
        Thick, smooth, precise center-to-center connection
      */}
      <path
        d={edgePath}
        fill="none"
        stroke={colors.main}
        strokeWidth={strokeWidth}
        opacity={mainOpacity}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#arrow-${category})`}
        style={{
          ...style,
          filter: isHighlighted ? 'url(#edge-crisp)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* 
        EXECUTION ANIMATION
        Flowing effect when node is processing
      */}
      {isExecuting && (
        <>
          {/* Flowing dashed line */}
          <path
            d={edgePath}
            fill="none"
            stroke={colors.glow}
            strokeWidth={strokeWidth * 0.85}
            strokeDasharray="18 10"
            strokeLinecap="round"
            opacity={0.9}
            style={{
              animation: 'dash-flow 2s linear infinite',
              filter: 'url(#edge-glow-strong)',
            }}
          />
          
          {/* Animated orb traveling along path */}
          <circle
            r={7}
            fill={colors.main}
            opacity={1}
            style={{
              filter: 'url(#orb-glow-bright)',
            }}
          >
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path={edgePath}
            />
            <animate
              attributeName="r"
              values="5;8;5"
              dur="2.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Secondary orb for emphasis */}
          <circle
            r={4}
            fill={colors.glow}
            opacity={0.7}
            style={{
              filter: 'url(#orb-glow-bright)',
            }}
          >
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path={edgePath}
              begin="0.5s"
            />
          </circle>
        </>
      )}

      {/* 
        INVISIBLE THICK HITBOX
        Makes hovering and selection much easier
        Critical for UX in dense graphs
      */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={28}
        strokeLinecap="round"
        style={{
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* 
        HOVER LABEL
        Shows connection type when hovering
        Hidden for very short connections to avoid clutter
      */}
      {isHovered && !isVeryShort && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold glass-strong shadow-xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ color: colors.main }}>{colors.label}</span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

// Inject animation keyframes
if (typeof document !== 'undefined' && !document.getElementById('edge-animations')) {
  const style = document.createElement('style');
  style.id = 'edge-animations';
  style.textContent = `
    @keyframes dash-flow {
      to {
        stroke-dashoffset: -28;
      }
    }
  `;
  document.head.appendChild(style);
}
