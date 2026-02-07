import React from 'react';
import type { NodeData } from '../App';

const PORT_COLORS = {
  MODEL: '#a855f7',
  CONDITIONING: '#22c55e',
  LATENT: '#ec4899',
  IMAGE: '#3b82f6',
  VIDEO: '#f97316',
  INT: '#eab308',
  FLOAT: '#eab308',
  STRING: '#06b6d4',
  VAE: '#f59e0b',
  CLIP: '#8b5cf6',
  CONTROL_NET: '#10b981',
  UPSCALE_MODEL: '#f472b6',
  MOTION_MODEL: '#fb923c',
  AUDIO: '#14b8a6',
};

interface ConnectionProps {
  fromNode: NodeData;
  toNode: NodeData;
  fromPortIndex: number;
  toPortIndex: number;
  type: string;
}

export function Connection({
  fromNode,
  toNode,
  fromPortIndex,
  toPortIndex,
  type,
}: ConnectionProps) {
  // Calculate port positions
  const startX = fromNode.x + 280; // Right side of node
  const startY = fromNode.y + 40 + fromPortIndex * 28; // Approximate port Y position
  
  const endX = toNode.x; // Left side of node
  const endY = toNode.y + 40 + toPortIndex * 28;

  // Create orthogonal path (right-angle bends like real ComfyUI)
  const midX = (startX + endX) / 2;
  
  const path = `
    M ${startX} ${startY}
    L ${midX} ${startY}
    L ${midX} ${endY}
    L ${endX} ${endY}
  `;

  const color = PORT_COLORS[type as keyof typeof PORT_COLORS] || '#64748b';

  return (
    <g>
      {/* Glow effect */}
      <path
        d={path}
        stroke={color}
        strokeWidth="8"
        fill="none"
        opacity="0.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Main line */}
      <path
        d={path}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}