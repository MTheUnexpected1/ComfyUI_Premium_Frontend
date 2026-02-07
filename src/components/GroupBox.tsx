import React from 'react';
import type { GroupData } from '../App';

interface GroupBoxProps {
  group: GroupData;
}

export function GroupBox({ group }: GroupBoxProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${group.x}px`,
        top: `${group.y}px`,
        width: `${group.width}px`,
        height: `${group.height}px`,
      }}
    >
      {/* Group border with glow */}
      <div
        className="w-full h-full rounded-lg border-2"
        style={{
          borderColor: group.color,
          boxShadow: `0 0 20px ${group.color}40, inset 0 0 20px ${group.color}10`,
          backgroundColor: `${group.color}05`,
        }}
      >
        {/* Group title bar */}
        <div
          className="px-4 py-2 rounded-t-lg border-b-2 flex items-center gap-2"
          style={{
            borderColor: group.color,
            backgroundColor: `${group.color}20`,
          }}
        >
          <span className="text-2xl">{group.icon}</span>
          <span className="text-white font-bold text-lg">{group.title}</span>
        </div>
      </div>
    </div>
  );
}
