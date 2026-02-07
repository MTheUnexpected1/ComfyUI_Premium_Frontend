import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'motion/react';
import { nodeCategories, portTypes, type NodeCategory, type PortType } from '../styles/flow-theme';

export interface Port {
  id: string;
  label: string;
  type: PortType;
}

export interface BaseNodeData {
  label: string;
  category: NodeCategory;
  inputs?: Port[];
  outputs?: Port[];
  executing?: boolean;
}

/**
 * BaseNode - Enhanced with LARGE, VISIBLE ports
 * 
 * Key improvements:
 * - Ports are 16px (up to 22px on hover) - VERY visible
 * - Strong glow on hover for clear connection points
 * - Precise positioning for center-to-center connections
 * - Enhanced visual feedback
 */
export function BaseNode({ data, selected }: NodeProps<BaseNodeData>) {
  const category = nodeCategories[data.category];
  const hasInputs = data.inputs && data.inputs.length > 0;
  const hasOutputs = data.outputs && data.outputs.length > 0;

  return (
    <motion.div
      className="min-w-[240px] max-w-[320px] rounded-lg overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        border: `1.5px solid ${selected ? category.color : category.borderColor}`,
        boxShadow: selected ? category.glow : 'none',
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: selected ? 1.02 : 1, 
        opacity: 1,
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Title bar with category color */}
      <div
        className="h-8 px-3 flex items-center"
        style={{
          background: category.titleBg,
          borderBottom: `1px solid ${category.borderColor}`,
        }}
      >
        <span className="font-medium text-base text-white/90">
          {data.label}
        </span>
        
        {/* Executing indicator */}
        {data.executing && (
          <motion.div
            className="ml-auto w-2 h-2 rounded-full"
            style={{ background: category.color }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Node content */}
      <div className="p-3 space-y-2">
        {/* Input ports */}
        {hasInputs && (
          <div className="space-y-1.5">
            {data.inputs!.map((input) => {
              const portColor = portTypes[input.type].color;
              
              return (
                <div key={input.id} className="flex items-center gap-2 relative group">
                  {/* 
                    INPUT PORT - LARGE AND VISIBLE
                    - Size: 16px (22px on hover)
                    - Positioned at left: -8 for exact centering
                    - Strong hover glow for visibility
                  */}
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={input.id}
                    style={{
                      left: -8,  // Exactly centers 16px port
                      top: '50%',
                      width: '16px',
                      height: '16px',
                      background: portColor,
                      border: `3px solid #0f0f11`,
                      borderRadius: '50%',
                      cursor: 'crosshair',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 10,
                    }}
                    className="port-handle"
                  />
                  
                  {/* Port label */}
                  <span className="text-sm text-white/70 ml-3 select-none">
                    {input.label}
                  </span>
                  
                  {/* Port type indicator (dot color) */}
                  <div 
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ background: portColor }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Output ports */}
        {hasOutputs && (
          <div className="space-y-1.5">
            {data.outputs!.map((output) => {
              const portColor = portTypes[output.type].color;
              
              return (
                <div key={output.id} className="flex items-center justify-end gap-2 relative group">
                  {/* Port type indicator (dot color) */}
                  <div 
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ background: portColor }}
                  />
                  
                  {/* Port label */}
                  <span className="text-sm text-white/70 mr-3 select-none">
                    {output.label}
                  </span>
                  
                  {/* 
                    OUTPUT PORT - LARGE AND VISIBLE
                    - Size: 16px (22px on hover)
                    - Positioned at right: -8 for exact centering
                    - Strong hover glow for visibility
                  */}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={output.id}
                    style={{
                      right: -8,  // Exactly centers 16px port
                      top: '50%',
                      width: '16px',
                      height: '16px',
                      background: portColor,
                      border: `3px solid #0f0f11`,
                      borderRadius: '50%',
                      cursor: 'crosshair',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 10,
                    }}
                    className="port-handle"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
