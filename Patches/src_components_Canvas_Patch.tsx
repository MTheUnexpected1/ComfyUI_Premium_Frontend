diff --git a/src/components/Canvas.tsx b/src/components/Canvas.tsx
index 2bcd90e4513f65738469cac7d154ba9b858792d8..5d877cb3128b80730dbe3b0262949dd60e471c2e 100644
--- a/src/components/Canvas.tsx
+++ b/src/components/Canvas.tsx
@@ -1,293 +1,233 @@
-import { useCallback, useState } from 'react';
+import { useCallback, useRef, useState, type DragEvent } from 'react';
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
+  ReactFlowInstance,
 } from 'reactflow';
 import 'reactflow/dist/style.css';
 import { nodeTypes } from '../nodes/nodeRegistry';
 import { CustomEdge } from '../edges/CustomEdge';
 import { EdgeFilters } from '../edges/EdgeFilters';
+import { ALL_NODE_NAMES } from '../../data/node-defs';
 
-// Register custom edge type
 const edgeTypes = {
   custom: CustomEdge,
 };
 
-// Demo workflow - text-to-image pipeline
-const initialNodes: Node[] = [
-  {
-    id: '1',
-    type: 'checkpointLoader',
-    position: { x: 50, y: 100 },
-    data: {},
-  },
-  {
-    id: '2',
-    type: 'clipTextEncode',
-    position: { x: 450, y: 50 },
-    data: {},
-  },
-  {
-    id: '3',
-    type: 'clipTextEncode',
-    position: { x: 450, y: 200 },
-    data: {},
-  },
-  {
-    id: '4',
-    type: 'emptyLatentImage',
-    position: { x: 450, y: 350 },
-    data: {},
-  },
-  {
-    id: '5',
-    type: 'ksampler',
-    position: { x: 850, y: 150 },
-    data: { executing: false },
-  },
-  {
-    id: '6',
-    type: 'vaeDecode',
-    position: { x: 1200, y: 150 },
-    data: {},
-  },
-  {
-    id: '7',
-    type: 'saveImage',
-    position: { x: 1550, y: 150 },
-    data: {},
-  },
-];
+const initialNodes: Node[] = [];
+const initialEdges: Edge[] = [];
 
-// Edges with precise category metadata
-const initialEdges: Edge[] = [
-  { 
-    id: 'e1-2', 
-    source: '1', 
-    target: '2', 
-    sourceHandle: 'clip', 
-    targetHandle: 'clip', 
-    type: 'custom', 
-    data: { category: 'CLIP' } 
-  },
-  { 
-    id: 'e1-3', 
-    source: '1', 
-    target: '3', 
-    sourceHandle: 'clip', 
-    targetHandle: 'clip', 
-    type: 'custom', 
-    data: { category: 'CLIP' } 
-  },
-  { 
-    id: 'e1-5', 
-    source: '1', 
-    target: '5', 
-    sourceHandle: 'model', 
-    targetHandle: 'model', 
-    type: 'custom', 
-    data: { category: 'MODEL' } 
-  },
-  { 
-    id: 'e2-5', 
-    source: '2', 
-    target: '5', 
-    sourceHandle: 'conditioning', 
-    targetHandle: 'positive', 
-    type: 'custom', 
-    data: { category: 'CONDITIONING' } 
-  },
-  { 
-    id: 'e3-5', 
-    source: '3', 
-    target: '5', 
-    sourceHandle: 'conditioning', 
-    targetHandle: 'negative', 
-    type: 'custom', 
-    data: { category: 'CONDITIONING' } 
-  },
-  { 
-    id: 'e4-5', 
-    source: '4', 
-    target: '5', 
-    sourceHandle: 'latent', 
-    targetHandle: 'latent_image', 
-    type: 'custom', 
-    data: { category: 'LATENT' } 
-  },
-  { 
-    id: 'e5-6', 
-    source: '5', 
-    target: '6', 
-    sourceHandle: 'latent', 
-    targetHandle: 'samples', 
-    type: 'custom', 
-    data: { category: 'LATENT', isExecuting: false } 
-  },
-  { 
-    id: 'e1-6', 
-    source: '1', 
-    target: '6', 
-    sourceHandle: 'vae', 
-    targetHandle: 'vae', 
-    type: 'custom', 
-    data: { category: 'VAE' } 
-  },
-  { 
-    id: 'e6-7', 
-    source: '6', 
-    target: '7', 
-    sourceHandle: 'image', 
-    targetHandle: 'images', 
-    type: 'custom', 
-    data: { category: 'IMAGE' } 
-  },
-];
+interface DragNodePayload {
+  type?: string;
+  className?: string;
+}
 
-/**
- * Canvas - Main React Flow workspace
- * 
- * Features:
- * - Custom smooth edges with center-to-center connections
- * - Node hover → edge highlighting
- * - Large, visible ports
- * - Category-based coloring
- */
 export function Canvas() {
+  const wrapperRef = useRef<HTMLDivElement>(null);
+  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
-  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
 
-  /**
-   * Auto-detect edge category from handle names
-   */
   const detectCategory = (handleName: string): string => {
     const handle = handleName?.toLowerCase() || '';
-    
+
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
-    
+
     return 'default';
   };
 
   const onConnect = useCallback(
     (params: Connection) => {
       const category = detectCategory(params.sourceHandle || '');
-      
       setEdges((eds) =>
-        addEdge({ 
-          ...params, 
-          type: 'custom', 
-          data: { category } 
-        }, eds)
+        addEdge(
+          {
+            ...params,
+            type: 'custom',
+            data: { category },
+          },
+          eds
+        )
       );
     },
     [setEdges]
   );
 
-  /**
-   * NODE HOVER HANDLERS
-   * Highlight all edges connected to the hovered node
-   */
-  const onNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
-    setHoveredNodeId(node.id);
-    
-    // Highlight connected edges
-    setEdges((eds) =>
-      eds.map((edge) => ({
-        ...edge,
-        data: {
-          ...edge.data,
-          isHighlighted: edge.source === node.id || edge.target === node.id,
-        },
-      }))
-    );
-  }, [setEdges]);
+  const onNodeMouseEnter: NodeMouseHandler = useCallback(
+    (_, node) => {
+      setEdges((eds) =>
+        eds.map((edge) => ({
+          ...edge,
+          data: {
+            ...edge.data,
+            isHighlighted: edge.source === node.id || edge.target === node.id,
+          },
+        }))
+      );
+    },
+    [setEdges]
+  );
 
   const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
-    setHoveredNodeId(null);
-    
-    // Remove highlights
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
 
+  const onDragOver = useCallback((event: DragEvent) => {
+    event.preventDefault();
+    event.dataTransfer.dropEffect = 'move';
+  }, []);
+
+  const onDrop = useCallback(
+    (event: DragEvent) => {
+      event.preventDefault();
+      if (!reactFlowInstance || !wrapperRef.current) return;
+
+      const payloadRaw = event.dataTransfer.getData('application/comfy-node');
+      const flowType = event.dataTransfer.getData('application/reactflow');
+
+      let payload: DragNodePayload = {};
+      if (payloadRaw) {
+        try {
+          payload = JSON.parse(payloadRaw) as DragNodePayload;
+        } catch {
+          payload = {};
+        }
+      }
+
+      const type = payload.type || flowType;
+      if (!type) return;
+
+      const bounds = wrapperRef.current.getBoundingClientRect();
+      const position = reactFlowInstance.screenToFlowPosition({
+        x: event.clientX - bounds.left,
+        y: event.clientY - bounds.top,
+      });
+
+      const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
+
+      const newNode: Node = {
+        id,
+        type,
+        position,
+        data: payload.className ? { nodeClass: payload.className } : {},
+      };
+
+      setNodes((nds) => nds.concat(newNode));
+    },
+    [reactFlowInstance, setNodes]
+  );
+
+  const addAllNodes = useCallback(() => {
+    const cols = 8;
+    const gapX = 320;
+    const gapY = 220;
+    const startX = 50;
+    const startY = 50;
+
+    const allNodes: Node[] = ALL_NODE_NAMES.map((className, index) => ({
+      id: `comfyDynamic-${className}-${index}`,
+      type: 'comfyDynamic',
+      position: {
+        x: startX + (index % cols) * gapX,
+        y: startY + Math.floor(index / cols) * gapY,
+      },
+      data: { nodeClass: className },
+    }));
+
+    setNodes(allNodes);
+    setEdges([]);
+  }, [setEdges, setNodes]);
+
   return (
-    <div className="w-full h-full">
-      {/* SVG Filters - MUST render before ReactFlow */}
+    <div ref={wrapperRef} className="canvas-root">
       <EdgeFilters />
-      
+      <div className="canvas-toolbar">
+        <button
+          type="button"
+          className="toolbar-primary"
+          onClick={addAllNodes}
+        >
+          Add all nodes
+        </button>
+      </div>
+
       <ReactFlow
         nodes={nodes}
         edges={edges}
+        onInit={setReactFlowInstance}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
         onNodeMouseEnter={onNodeMouseEnter}
         onNodeMouseLeave={onNodeMouseLeave}
+        onDrop={onDrop}
+        onDragOver={onDragOver}
+        onPaneClick={() => setEdges((eds) => eds.map((edge) => ({ ...edge, data: { ...edge.data, isHighlighted: false } })))}
         nodeTypes={nodeTypes}
         edgeTypes={edgeTypes}
         fitView
-        minZoom={0.2}
+        minZoom={0.05}
         maxZoom={2}
         defaultEdgeOptions={{
           type: 'custom',
           animated: false,
         }}
-        // SmoothStep for connection preview
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
-        
+
         <Controls
           className="glass rounded-lg border border-white/10"
           showInteractive={false}
         />
-        
+
         <MiniMap
           nodeColor={() => '#8b5cf6'}
           pannable
           zoomable
           className="border border-white/10 rounded-lg"
         />
       </ReactFlow>
+
     </div>
   );
 }
