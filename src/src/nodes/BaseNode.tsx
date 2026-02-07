import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { nodeCategories, portTypes, type NodeCategory, type PortType } from '../styles/flow-theme';

export interface Port {
  id: string;
  label: string;
  type: PortType | string;
}

export interface BaseNodeData {
  label: string;
  category: NodeCategory;
  inputs?: Port[];
  outputs?: Port[];
  executing?: boolean;
}

const getPortColor = (portType: string) => {
  const knownPort = portTypes[portType as PortType];
  return knownPort?.color ?? '#6b7280';
};

export function BaseNode({ data, selected }: NodeProps<BaseNodeData>) {
  const category = nodeCategories[data.category];
  const hasInputs = data.inputs && data.inputs.length > 0;
  const hasOutputs = data.outputs && data.outputs.length > 0;

  return (
    <motion.div
      className="flow-node"
      style={{
        borderColor: selected ? category.color : category.borderColor,
        boxShadow: selected ? category.glow : 'none',
      }}
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
    >
      <div
        className="flow-node-title"
        style={{ background: category.titleBg, borderBottomColor: category.borderColor }}
      >
        <span>{data.label}</span>
        {data.executing && (
          <motion.div
            className="flow-node-exec"
            style={{ background: category.color }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>

      <div className="flow-node-body">
        {hasInputs && (
          <div className="flow-node-ports">
            {data.inputs!.map((input) => {
              const portColor = getPortColor(input.type);
              return (
                <div key={input.id} className="flow-port-row">
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={input.id}
                    style={{
                      left: -8,
                      top: '50%',
                      width: '14px',
                      height: '14px',
                      background: portColor,
                      border: '2px solid #07080d',
                      borderRadius: '50%',
                    }}
                  />
                  <span>{input.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {hasOutputs && (
          <div className="flow-node-ports">
            {data.outputs!.map((output) => {
              const portColor = getPortColor(output.type);
              return (
                <div key={output.id} className="flow-port-row output">
                  <span>{output.label}</span>
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={output.id}
                    style={{
                      right: -8,
                      top: '50%',
                      width: '14px',
                      height: '14px',
                      background: portColor,
                      border: '2px solid #07080d',
                      borderRadius: '50%',
                    }}
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
