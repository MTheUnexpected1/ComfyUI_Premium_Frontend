import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ConnectionLineType,
  NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '../nodes/nodeRegistry';
import { CustomEdge } from '../edges/CustomEdge';
import { EdgeFilters } from '../edges/EdgeFilters';

// Register custom edge type
const edgeTypes = {
  custom: CustomEdge,
};

// Demo workflow - text-to-image pipeline
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'checkpointLoader',
    position: { x: 50, y: 100 },
    data: {},
  },
  {
    id: '2',
    type: 'clipTextEncode',
    position: { x: 450, y: 50 },
    data: {},
  },
  {
    id: '3',
    type: 'clipTextEncode',
    position: { x: 450, y: 200 },
    data: {},
  },
  {
    id: '4',
    type: 'emptyLatentImage',
    position: { x: 450, y: 350 },
    data: {},
  },
  {
    id: '5',
    type: 'ksampler',
    position: { x: 850, y: 150 },
    data: { executing: false },
  },
  {
    id: '6',
    type: 'vaeDecode',
    position: { x: 1200, y: 150 },
    data: {},
  },
  {
    id: '7',
    type: 'saveImage',
    position: { x: 1550, y: 150 },
    data: {},
  },
];

// Edges with precise category metadata
const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    sourceHandle: 'clip', 
    targetHandle: 'clip', 
    type: 'custom', 
    data: { category: 'CLIP' } 
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    sourceHandle: 'clip', 
    targetHandle: 'clip', 
    type: 'custom', 
    data: { category: 'CLIP' } 
  },
  { 
    id: 'e1-5', 
    source: '1', 
    target: '5', 
    sourceHandle: 'model', 
    targetHandle: 'model', 
    type: 'custom', 
    data: { category: 'MODEL' } 
  },
  { 
    id: 'e2-5', 
    source: '2', 
    target: '5', 
    sourceHandle: 'conditioning', 
    targetHandle: 'positive', 
    type: 'custom', 
    data: { category: 'CONDITIONING' } 
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5', 
    sourceHandle: 'conditioning', 
    targetHandle: 'negative', 
    type: 'custom', 
    data: { category: 'CONDITIONING' } 
  },
  { 
    id: 'e4-5', 
    source: '4', 
    target: '5', 
    sourceHandle: 'latent', 
    targetHandle: 'latent_image', 
    type: 'custom', 
    data: { category: 'LATENT' } 
  },
  { 
    id: 'e5-6', 
    source: '5', 
    target: '6', 
    sourceHandle: 'latent', 
    targetHandle: 'samples', 
    type: 'custom', 
    data: { category: 'LATENT', isExecuting: false } 
  },
  { 
    id: 'e1-6', 
    source: '1', 
    target: '6', 
    sourceHandle: 'vae', 
    targetHandle: 'vae', 
    type: 'custom', 
    data: { category: 'VAE' } 
  },
  { 
    id: 'e6-7', 
    source: '6', 
    target: '7', 
    sourceHandle: 'image', 
    targetHandle: 'images', 
    type: 'custom', 
    data: { category: 'IMAGE' } 
  },
];

/**
 * Canvas - Main React Flow workspace
 * 
 * Features:
 * - Custom smooth edges with center-to-center connections
 * - Node hover → edge highlighting
 * - Large, visible ports
 * - Category-based coloring
 */
export function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  /**
   * Auto-detect edge category from handle names
   */
  const detectCategory = (handleName: string): string => {
    const handle = handleName?.toLowerCase() || '';
    
    if (handle.includes('model') || handle.includes('checkpoint')) return 'MODEL';
    if (handle.includes('clip')) return 'CLIP';
    if (handle.includes('conditioning') || handle.includes('prompt')) return 'CONDITIONING';
    if (handle.includes('latent') || handle.includes('noise')) return 'LATENT';
    if (handle.includes('image') || handle.includes('pixel')) return 'IMAGE';
    if (handle.includes('vae')) return 'VAE';
    if (handle.includes('video')) return 'VIDEO';
    if (handle.includes('audio')) return 'AUDIO';
    if (handle.includes('control')) return 'CONTROL_NET';
    if (handle.includes('int')) return 'INT';
    if (handle.includes('float')) return 'FLOAT';
    if (handle.includes('string') || handle.includes('text')) return 'STRING';
    
    return 'default';
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const category = detectCategory(params.sourceHandle || '');
      
      setEdges((eds) =>
        addEdge({ 
          ...params, 
          type: 'custom', 
          data: { category } 
        }, eds)
      );
    },
    [setEdges]
  );

  /**
   * NODE HOVER HANDLERS
   * Highlight all edges connected to the hovered node
   */
  const onNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
    setHoveredNodeId(node.id);
    
    // Highlight connected edges
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          isHighlighted: edge.source === node.id || edge.target === node.id,
        },
      }))
    );
  }, [setEdges]);

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    setHoveredNodeId(null);
    
    // Remove highlights
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          isHighlighted: false,
        },
      }))
    );
  }, [setEdges]);

  return (
    <div className="w-full h-full">
      {/* SVG Filters - MUST render before ReactFlow */}
      <EdgeFilters />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'custom',
          animated: false,
        }}
        // SmoothStep for connection preview
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{
          stroke: '#6b7280',
          strokeWidth: 4.5,
          strokeDasharray: '12 8',
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(255, 255, 255, 0.05)"
        />
        
        <Controls
          className="glass rounded-lg border border-white/10"
          showInteractive={false}
        />
        
        <MiniMap
          nodeColor={() => '#8b5cf6'}
          pannable
          zoomable
          className="border border-white/10 rounded-lg"
        />
      </ReactFlow>
    </div>
  );
}