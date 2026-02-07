import React, { useState, useRef, useEffect } from 'react';
import { Port as PortComponent } from './Port';
import type { NodeData } from '../App';

interface ComfyNodeProps {
  node: NodeData;
  isSelected: boolean;
  onMove: (nodeId: string, dx: number, dy: number) => void;
  onSelect: () => void;
  onPortMouseDown: (nodeId: string, portId: string, portType: string, isInput: boolean) => void;
  onPortMouseUp: (nodeId: string, portId: string, portType: string, isInput: boolean) => void;
}

export function ComfyNode({
  node,
  isSelected,
  onMove,
  onSelect,
  onPortMouseDown,
  onPortMouseUp,
}: ComfyNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        onMove(node.id, dx, dy);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, node.id, onMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      onSelect();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={nodeRef}
      className={`absolute select-none ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: '280px',
      }}
    >
      {/* Node header - draggable */}
      <div 
        ref={headerRef}
        className="bg-[#21262d] border border-[#30363d] rounded-t px-3 py-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="text-white text-sm font-medium">{node.title}</div>
        <div className="text-gray-500 text-xs">{node.type}</div>
      </div>

      {/* Node body */}
      <div className="bg-[#161b22] border-x border-b border-[#30363d] rounded-b">
        {/* Settings display */}
        {node.settings && Object.keys(node.settings).length > 0 && (
          <div className="px-3 py-2 border-b border-[#30363d]">
            {Object.entries(node.settings).map(([key, value]) => (
              <div key={key} className="text-xs text-gray-400 mb-1">
                <span className="text-cyan-400">{key}:</span>{' '}
                <span className="text-white">
                  {typeof value === 'string' && value.length > 30 
                    ? value.substring(0, 30) + '...' 
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Input ports */}
        {node.inputs.length > 0 && (
          <div className="py-1">
            {node.inputs.map((port, index) => (
              <PortComponent
                key={port.id}
                port={port}
                nodeId={node.id}
                index={index}
                onMouseDown={onPortMouseDown}
                onMouseUp={onPortMouseUp}
              />
            ))}
          </div>
        )}

        {/* Output ports */}
        {node.outputs.length > 0 && (
          <div className="py-1">
            {node.outputs.map((port, index) => (
              <PortComponent
                key={port.id}
                port={port}
                nodeId={node.id}
                index={index}
                onMouseDown={onPortMouseDown}
                onMouseUp={onPortMouseUp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}