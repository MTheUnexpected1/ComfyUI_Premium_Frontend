import { useCallback, useRef, useState, type DragEvent } from 'react';
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
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '../nodes/nodeRegistry';
import { CustomEdge } from '../edges/CustomEdge';
import { EdgeFilters } from '../edges/EdgeFilters';
import { ALL_NODE_NAMES } from '../../data/node-defs';

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface DragNodePayload {
  type?: string;
  className?: string;
}

export function Canvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
        addEdge(
          {
            ...params,
            type: 'custom',
            data: { category },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onNodeMouseEnter: NodeMouseHandler = useCallback(
    (_, node) => {
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          data: {
            ...edge.data,
            isHighlighted: edge.source === node.id || edge.target === node.id,
          },
        }))
      );
    },
    [setEdges]
  );

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
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

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!reactFlowInstance || !wrapperRef.current) return;

      const payloadRaw = event.dataTransfer.getData('application/comfy-node');
      const flowType = event.dataTransfer.getData('application/reactflow');

      let payload: DragNodePayload = {};
      if (payloadRaw) {
        try {
          payload = JSON.parse(payloadRaw) as DragNodePayload;
        } catch {
          payload = {};
        }
      }

      const type = payload.type || flowType;
      if (!type) return;

      const bounds = wrapperRef.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      const newNode: Node = {
        id,
        type,
        position,
        data: payload.className ? { nodeClass: payload.className } : {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const addAllNodes = useCallback(() => {
    const cols = 8;
    const gapX = 320;
    const gapY = 220;
    const startX = 50;
    const startY = 50;

    const allNodes: Node[] = ALL_NODE_NAMES.map((className, index) => ({
      id: `comfyDynamic-${className}-${index}`,
      type: 'comfyDynamic',
      position: {
        x: startX + (index % cols) * gapX,
        y: startY + Math.floor(index / cols) * gapY,
      },
      data: { nodeClass: className },
    }));

    setNodes(allNodes);
    setEdges([]);
  }, [setEdges, setNodes]);

  return (
    <div ref={wrapperRef} className="canvas-root">
      <EdgeFilters />
      <div className="canvas-toolbar">
        <button
          type="button"
          className="toolbar-primary"
          onClick={addAllNodes}
        >
          Add all nodes
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={() => setEdges((eds) => eds.map((edge) => ({ ...edge, data: { ...edge.data, isHighlighted: false } })))}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.05}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'custom',
          animated: false,
        }}
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
