import objectInfo from './object_info.json';

export interface NodeDef {
  name?: string;
  display_name?: string;
  description?: string;
  category: string;
  input?: {
    required?: Record<string, unknown[]>;
    optional?: Record<string, unknown[]>;
  };
  output?: unknown[];
  output_name?: string[];
}

export const NODE_DEFS = objectInfo as Record<string, NodeDef>;
export const ALL_NODE_NAMES = Object.keys(NODE_DEFS);
