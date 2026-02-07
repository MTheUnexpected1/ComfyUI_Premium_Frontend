import React from 'react';
import type { Port as PortType } from '../App';

const PORT_COLORS = {
  MODEL: '#a855f7',         // purple
  CONDITIONING: '#22c55e',  // green
  LATENT: '#ec4899',        // pink
  IMAGE: '#3b82f6',         // blue
  VIDEO: '#f97316',         // orange
  INT: '#eab308',           // yellow
  FLOAT: '#eab308',         // yellow
  STRING: '#06b6d4',        // cyan
  VAE: '#f59e0b',           // amber
  CLIP: '#8b5cf6',          // violet
  CONTROL_NET: '#10b981',   // emerald
  UPSCALE_MODEL: '#f472b6', // pink-400
  MOTION_MODEL: '#fb923c',  // orange-400
  AUDIO: '#14b8a6',         // teal
};

interface PortProps {
  port: PortType;
  nodeId: string;
  index: number;
  onMouseDown: (nodeId: string, portId: string, portType: string, isInput: boolean) => void;
  onMouseUp: (nodeId: string, portId: string, portType: string, isInput: boolean) => void;
}

export function Port({ port, nodeId, index, onMouseDown, onMouseUp }: PortProps) {
  const color = PORT_COLORS[port.type] || '#64748b';
  const isInput = port.isInput;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 ${
        isInput ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Port circle */}
      <div
        className="relative cursor-pointer hover:scale-125 transition-transform"
        onMouseDown={(e) => {
          e.stopPropagation();
          onMouseDown(nodeId, port.id, port.type, isInput);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          onMouseUp(nodeId, port.id, port.type, isInput);
        }}
      >
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{
            backgroundColor: color,
            borderColor: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>

      {/* Port label */}
      <div
        className={`text-xs text-gray-300 flex-1 ${
          isInput ? 'text-left' : 'text-right'
        }`}
      >
        {port.name}
      </div>
    </div>
  );
}