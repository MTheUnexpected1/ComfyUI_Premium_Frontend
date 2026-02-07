import { create } from 'zustand';

// Node types available in ComfyUI
export type NodeType = 
  | 'LoadImage' 
  | 'KSampler' 
  | 'VAEDecode' 
  | 'VAEEncode'
  | 'LoadCheckpoint'
  | 'CLIPTextEncode'
  | 'SaveImage';

export interface NodePort {
  id: string;
  type: 'input' | 'output';
  dataType: 'IMAGE' | 'LATENT' | 'MODEL' | 'CONDITIONING' | 'VAE' | 'CLIP';
  connected: boolean;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    inputs: NodePort[];
    outputs: NodePort[];
    params?: Record<string, any>; // Node-specific parameters
  };
}

export interface WorkflowConnection {
  id: string;
  source: string; // source node id
  sourcePort: string;
  target: string; // target node id
  targetPort: string;
}

export interface WorkflowState {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  selectedNode: string | null;
  isExecuting: boolean;
  executionProgress: number;
  
  // Actions
  addNode: (node: WorkflowNode) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<WorkflowNode>) => void;
  selectNode: (nodeId: string | null) => void;
  
  addConnection: (connection: WorkflowConnection) => void;
  removeConnection: (connectionId: string) => void;
  
  executeWorkflow: () => Promise<void>;
  clearWorkflow: () => void;
}

// Global workflow state - premium state management with Zustand
export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  connections: [],
  selectedNode: null,
  isExecuting: false,
  executionProgress: 0,
  
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
    
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      connections: state.connections.filter(
        (c) => c.source !== nodeId && c.target !== nodeId
      ),
    })),
    
  updateNode: (nodeId, updates) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, ...updates } : n
      ),
    })),
    
  selectNode: (nodeId) => set({ selectedNode: nodeId }),
  
  addConnection: (connection) =>
    set((state) => ({
      connections: [...state.connections, connection],
    })),
    
  removeConnection: (connectionId) =>
    set((state) => ({
      connections: state.connections.filter((c) => c.id !== connectionId),
    })),
    
  executeWorkflow: async () => {
    set({ isExecuting: true, executionProgress: 0 });
    
    // Mock API call - simulate workflow execution
    // Later: Replace with WebSocket connection to ComfyUI backend
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      set({ executionProgress: i });
    }
    
    set({ isExecuting: false, executionProgress: 0 });
  },
  
  clearWorkflow: () =>
    set({
      nodes: [],
      connections: [],
      selectedNode: null,
    }),
}));
