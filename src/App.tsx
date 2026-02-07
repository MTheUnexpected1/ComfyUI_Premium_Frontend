import React, { useState, useRef, useCallback } from 'react';
import { Plus, Minus, Move } from 'lucide-react';
import { ComfyNode } from './components/ComfyNode';
import { NodePalette } from './components/NodePalette';
import { Connection } from './components/Connection';
import { GroupBox } from './components/GroupBox';

export interface Port {
  id: string;
  name: string;
  type: 'MODEL' | 'CONDITIONING' | 'LATENT' | 'IMAGE' | 'VIDEO' | 'INT' | 'FLOAT' | 'STRING' | 'VAE' | 'CLIP' | 'CONTROL_NET' | 'UPSCALE_MODEL' | 'MOTION_MODEL' | 'AUDIO';
  isInput: boolean;
}

export interface NodeData {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  inputs: Port[];
  outputs: Port[];
  settings?: Record<string, any>;
  color?: string;
}

export interface ConnectionData {
  id: string;
  fromNode: string;
  fromPort: string;
  toNode: string;
  toPort: string;
  type: string;
}

export interface GroupData {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
}

// Define all nodes for the workflow
const workflowNodes: NodeData[] = [
  // GROUP 1 - Controls & Switches
  {
    id: 'primitive1',
    type: 'Primitive INT',
    title: 'SFW/NSFW Mode',
    x: 50,
    y: 120,
    inputs: [],
    outputs: [{ id: 'value', name: 'INT', type: 'INT', isInput: false }],
    settings: { value: 0 }
  },
  {
    id: 'switch1',
    type: 'Switch (Any)',
    title: 'Prompt Switch',
    x: 50,
    y: 240,
    inputs: [
      { id: 'select', name: 'select', type: 'INT', isInput: true },
      { id: 'input1', name: 'input1', type: 'CONDITIONING', isInput: true },
      { id: 'input2', name: 'input2', type: 'CONDITIONING', isInput: true },
    ],
    outputs: [{ id: 'output', name: 'ANY', type: 'CONDITIONING', isInput: false }]
  },
  {
    id: 'primitive2',
    type: 'Primitive INT',
    title: 'Upscale Mode',
    x: 50,
    y: 420,
    inputs: [],
    outputs: [{ id: 'value', name: 'INT', type: 'INT', isInput: false }],
    settings: { value: 0 }
  },
  {
    id: 'switch2',
    type: 'Switch (Any)',
    title: 'Upscale Switch',
    x: 50,
    y: 540,
    inputs: [
      { id: 'select', name: 'select', type: 'INT', isInput: true },
      { id: 'input1', name: 'bypass', type: 'UPSCALE_MODEL', isInput: true },
      { id: 'input2', name: 'input2', type: 'UPSCALE_MODEL', isInput: true },
    ],
    outputs: [{ id: 'output', name: 'ANY', type: 'UPSCALE_MODEL', isInput: false }]
  },

  // GROUP 2 - Model & LoRA Loading
  {
    id: 'unet_loader',
    type: 'UnetLoaderGGUF',
    title: 'UnetLoaderGGUF',
    x: 400,
    y: 120,
    inputs: [],
    outputs: [
      { id: 'model', name: 'MODEL', type: 'MODEL', isInput: false },
      { id: 'clip', name: 'CLIP', type: 'CLIP', isInput: false },
    ],
    settings: { unet_name: 'z_image_turbo-Q6_K.gguf' }
  },
  {
    id: 'lora_loader',
    type: 'LoRA Loader',
    title: 'LoRA Loader',
    x: 400,
    y: 300,
    inputs: [
      { id: 'model', name: 'model', type: 'MODEL', isInput: true },
      { id: 'clip', name: 'clip', type: 'CLIP', isInput: true },
      { id: 'strength_model', name: 'strength_model', type: 'FLOAT', isInput: true },
    ],
    outputs: [
      { id: 'model', name: 'MODEL', type: 'MODEL', isInput: false },
      { id: 'clip', name: 'CLIP', type: 'CLIP', isInput: false },
    ],
    settings: { lora_name: 'Skinny-Voluptuous_Slider.safetensors', strength_clip: 0.8 }
  },
  {
    id: 'primitive3',
    type: 'Primitive FLOAT',
    title: 'Style Strength',
    x: 400,
    y: 500,
    inputs: [],
    outputs: [{ id: 'value', name: 'FLOAT', type: 'FLOAT', isInput: false }],
    settings: { value: 1.0, min: 0.0, max: 2.0 }
  },

  // GROUP 3 - Prompt Encoding
  {
    id: 'dual_clip',
    type: 'DualCLIPLoader',
    title: 'DualCLIPLoader',
    x: 800,
    y: 80,
    inputs: [],
    outputs: [{ id: 'clip', name: 'CLIP', type: 'CLIP', isInput: false }],
    settings: { 
      type: 'flux',
      clip_name1: 'clip_l.safetensors',
      clip_name2: 't5xxl_fp16.safetensors'
    }
  },
  {
    id: 'safe_prompt',
    type: 'CLIP Text Encode',
    title: 'Safe Prompt',
    x: 800,
    y: 220,
    inputs: [{ id: 'clip', name: 'clip', type: 'CLIP', isInput: true }],
    outputs: [{ id: 'conditioning', name: 'CONDITIONING', type: 'CONDITIONING', isInput: false }],
    settings: { 
      text: 'beautiful young Indian woman influencer, detailed realistic skin texture, photorealistic, high detail, masterpiece, fully clothed, elegant outfit, confident pose'
    }
  },
  {
    id: 'creative_prompt',
    type: 'CLIP Text Encode',
    title: 'Creative Prompt',
    x: 800,
    y: 370,
    inputs: [{ id: 'clip', name: 'clip', type: 'CLIP', isInput: true }],
    outputs: [{ id: 'conditioning', name: 'CONDITIONING', type: 'CONDITIONING', isInput: false }],
    settings: { 
      text: 'beautiful young Indian woman influencer, voluptuous hourglass figure, curvy seductive body, sensual pose, photorealistic, high detail'
    }
  },
  {
    id: 'negative_prompt',
    type: 'CLIP Text Encode',
    title: 'Negative Prompt',
    x: 800,
    y: 520,
    inputs: [{ id: 'clip', name: 'clip', type: 'CLIP', isInput: true }],
    outputs: [{ id: 'conditioning', name: 'CONDITIONING', type: 'CONDITIONING', isInput: false }],
    settings: { 
      text: 'ugly, deformed, bad anatomy, extra limbs, low quality, blurry, artifacts, plastic skin'
    }
  },

  // GROUP 4 - Sampling & Latent
  {
    id: 'empty_latent',
    type: 'Empty Latent Image',
    title: 'Empty Latent Image',
    x: 1200,
    y: 80,
    inputs: [],
    outputs: [{ id: 'latent', name: 'LATENT', type: 'LATENT', isInput: false }],
    settings: { width: 1024, height: 1024, batch_size: 1 }
  },
  {
    id: 'ksampler',
    type: 'KSampler Advanced',
    title: 'KSampler Advanced',
    x: 1200,
    y: 240,
    inputs: [
      { id: 'model', name: 'model', type: 'MODEL', isInput: true },
      { id: 'positive', name: 'positive', type: 'CONDITIONING', isInput: true },
      { id: 'negative', name: 'negative', type: 'CONDITIONING', isInput: true },
      { id: 'latent_image', name: 'latent_image', type: 'LATENT', isInput: true },
    ],
    outputs: [{ id: 'latent', name: 'LATENT', type: 'LATENT', isInput: false }],
    settings: { 
      sampler_name: 'euler_a',
      scheduler: 'beta',
      steps: 16,
      cfg: 2.5,
      denoise: 1.0
    }
  },
  {
    id: 'vae_decode',
    type: 'VAE Decode',
    title: 'VAE Decode',
    x: 1200,
    y: 520,
    inputs: [
      { id: 'samples', name: 'samples', type: 'LATENT', isInput: true },
    ],
    outputs: [{ id: 'image', name: 'IMAGE', type: 'IMAGE', isInput: false }],
    settings: { vae: 'ae.safetensors' }
  },

  // GROUP 5 - Animation Branch
  {
    id: 'animatediff_loader',
    type: 'AnimateDiff Loader',
    title: 'AnimateDiff Loader',
    x: 50,
    y: 800,
    inputs: [],
    outputs: [{ id: 'motion_model', name: 'MOTION_MODEL', type: 'MOTION_MODEL', isInput: false }],
    settings: { 
      motion_model: 'mm_sd_v15_v2.ckpt',
      context_length: 16
    }
  },
  {
    id: 'animatediff_combine',
    type: 'AnimateDiff Combine',
    title: 'AnimateDiff Combine',
    x: 50,
    y: 960,
    inputs: [
      { id: 'latent', name: 'latent', type: 'LATENT', isInput: true },
      { id: 'motion_model', name: 'motion_model', type: 'MOTION_MODEL', isInput: true },
    ],
    outputs: [{ id: 'latent', name: 'LATENT', type: 'LATENT', isInput: false }]
  },
  {
    id: 'video_combine1',
    type: 'Video Combine',
    title: 'Video Combine',
    x: 50,
    y: 1140,
    inputs: [{ id: 'images', name: 'images', type: 'IMAGE', isInput: true }],
    outputs: [{ id: 'video', name: 'VIDEO', type: 'VIDEO', isInput: false }],
    settings: { fps: 12, format: 'mp4' }
  },

  // GROUP 6 - Vid2vid Branch
  {
    id: 'load_video',
    type: 'Load Video',
    title: 'Load Video',
    x: 400,
    y: 800,
    inputs: [],
    outputs: [{ id: 'video', name: 'VIDEO', type: 'VIDEO', isInput: false }],
    settings: { video_path: 'input.mp4' }
  },
  {
    id: 'video_to_images',
    type: 'Video to Images',
    title: 'Video to Images',
    x: 400,
    y: 940,
    inputs: [{ id: 'video', name: 'video', type: 'VIDEO', isInput: true }],
    outputs: [{ id: 'images', name: 'IMAGE', type: 'IMAGE', isInput: false }],
    settings: { batch_size: 4 }
  },
  {
    id: 'controlnet_loader',
    type: 'ControlNet Loader',
    title: 'ControlNet Loader',
    x: 400,
    y: 1080,
    inputs: [],
    outputs: [{ id: 'control_net', name: 'CONTROL_NET', type: 'CONTROL_NET', isInput: false }],
    settings: { control_net_name: 'Z-Image-Turbo-Fun-Controlnet-Union-2.0.safetensors' }
  },
  {
    id: 'controlnet_apply',
    type: 'ControlNet Apply',
    title: 'ControlNet Apply',
    x: 400,
    y: 1220,
    inputs: [
      { id: 'control_net', name: 'control_net', type: 'CONTROL_NET', isInput: true },
      { id: 'image', name: 'image', type: 'IMAGE', isInput: true },
      { id: 'conditioning', name: 'conditioning', type: 'CONDITIONING', isInput: true },
    ],
    outputs: [{ id: 'conditioning', name: 'CONDITIONING', type: 'CONDITIONING', isInput: false }],
    settings: { strength: 0.65 }
  },

  // GROUP 7 - Lip-Sync Branch
  {
    id: 'load_image',
    type: 'Load Image',
    title: 'Load Image',
    x: 800,
    y: 800,
    inputs: [],
    outputs: [{ id: 'image', name: 'IMAGE', type: 'IMAGE', isInput: false }],
    settings: { image: 'portrait.png' }
  },
  {
    id: 'load_audio',
    type: 'Load Audio',
    title: 'Load Audio',
    x: 800,
    y: 940,
    inputs: [],
    outputs: [{ id: 'audio', name: 'AUDIO', type: 'AUDIO', isInput: false }],
    settings: { audio_file: 'voice.wav' }
  },
  {
    id: 'liveportrait',
    type: 'LivePortrait Process',
    title: 'LivePortrait Process',
    x: 800,
    y: 1080,
    inputs: [
      { id: 'image', name: 'image', type: 'IMAGE', isInput: true },
      { id: 'audio', name: 'audio', type: 'AUDIO', isInput: true },
    ],
    outputs: [{ id: 'video', name: 'VIDEO', type: 'VIDEO', isInput: false }],
    settings: { model: 'liveportrait.pth' }
  },
  {
    id: 'video_combine2',
    type: 'Video Combine',
    title: 'Video Combine',
    x: 800,
    y: 1260,
    inputs: [{ id: 'images', name: 'images', type: 'IMAGE', isInput: true }],
    outputs: [{ id: 'video', name: 'VIDEO', type: 'VIDEO', isInput: false }],
    settings: { fps: 25 }
  },

  // GROUP 8 - Final Output
  {
    id: 'save_image',
    type: 'Save Image',
    title: 'Save Image',
    x: 1200,
    y: 800,
    inputs: [{ id: 'images', name: 'images', type: 'IMAGE', isInput: true }],
    outputs: [],
    settings: { filename_prefix: 'influencer_safe' }
  },
  {
    id: 'save_video',
    type: 'Save Video',
    title: 'Save Video',
    x: 1200,
    y: 960,
    inputs: [{ id: 'video', name: 'video', type: 'VIDEO', isInput: true }],
    outputs: [],
    settings: { filename_prefix: 'influencer_animation' }
  },
];

const workflowConnections: ConnectionData[] = [
  // Group 1 connections
  { id: 'c1', fromNode: 'primitive1', fromPort: 'value', toNode: 'switch1', toPort: 'select', type: 'INT' },
  { id: 'c2', fromNode: 'primitive2', fromPort: 'value', toNode: 'switch2', toPort: 'select', type: 'INT' },
  
  // Group 2 connections
  { id: 'c3', fromNode: 'unet_loader', fromPort: 'model', toNode: 'lora_loader', toPort: 'model', type: 'MODEL' },
  { id: 'c4', fromNode: 'unet_loader', fromPort: 'clip', toNode: 'lora_loader', toPort: 'clip', type: 'CLIP' },
  { id: 'c5', fromNode: 'primitive3', fromPort: 'value', toNode: 'lora_loader', toPort: 'strength_model', type: 'FLOAT' },
  
  // Group 3 connections
  { id: 'c6', fromNode: 'dual_clip', fromPort: 'clip', toNode: 'safe_prompt', toPort: 'clip', type: 'CLIP' },
  { id: 'c7', fromNode: 'dual_clip', fromPort: 'clip', toNode: 'creative_prompt', toPort: 'clip', type: 'CLIP' },
  { id: 'c8', fromNode: 'dual_clip', fromPort: 'clip', toNode: 'negative_prompt', toPort: 'clip', type: 'CLIP' },
  { id: 'c9', fromNode: 'safe_prompt', fromPort: 'conditioning', toNode: 'switch1', toPort: 'input1', type: 'CONDITIONING' },
  { id: 'c10', fromNode: 'creative_prompt', fromPort: 'conditioning', toNode: 'switch1', toPort: 'input2', type: 'CONDITIONING' },
  
  // Group 4 connections
  { id: 'c11', fromNode: 'lora_loader', fromPort: 'model', toNode: 'ksampler', toPort: 'model', type: 'MODEL' },
  { id: 'c12', fromNode: 'switch1', fromPort: 'output', toNode: 'ksampler', toPort: 'positive', type: 'CONDITIONING' },
  { id: 'c13', fromNode: 'negative_prompt', fromPort: 'conditioning', toNode: 'ksampler', toPort: 'negative', type: 'CONDITIONING' },
  { id: 'c14', fromNode: 'empty_latent', fromPort: 'latent', toNode: 'ksampler', toPort: 'latent_image', type: 'LATENT' },
  { id: 'c15', fromNode: 'ksampler', fromPort: 'latent', toNode: 'vae_decode', toPort: 'samples', type: 'LATENT' },
  
  // Group 5 connections
  { id: 'c16', fromNode: 'animatediff_loader', fromPort: 'motion_model', toNode: 'animatediff_combine', toPort: 'motion_model', type: 'MOTION_MODEL' },
  { id: 'c17', fromNode: 'ksampler', fromPort: 'latent', toNode: 'animatediff_combine', toPort: 'latent', type: 'LATENT' },
  
  // Group 6 connections
  { id: 'c18', fromNode: 'load_video', fromPort: 'video', toNode: 'video_to_images', toPort: 'video', type: 'VIDEO' },
  { id: 'c19', fromNode: 'controlnet_loader', fromPort: 'control_net', toNode: 'controlnet_apply', toPort: 'control_net', type: 'CONTROL_NET' },
  { id: 'c20', fromNode: 'video_to_images', fromPort: 'images', toNode: 'controlnet_apply', toPort: 'image', type: 'IMAGE' },
  
  // Group 7 connections
  { id: 'c21', fromNode: 'load_image', fromPort: 'image', toNode: 'liveportrait', toPort: 'image', type: 'IMAGE' },
  { id: 'c22', fromNode: 'load_audio', fromPort: 'audio', toNode: 'liveportrait', toPort: 'audio', type: 'AUDIO' },
  
  // Group 8 connections
  { id: 'c23', fromNode: 'vae_decode', fromPort: 'image', toNode: 'save_image', toPort: 'images', type: 'IMAGE' },
];

const workflowGroups: GroupData[] = [
  { id: 'g1', title: 'Controls & Switches', x: 30, y: 60, width: 320, height: 620, color: '#06b6d4', icon: '⚡' },
  { id: 'g2', title: 'Model & LoRA Loading', x: 380, y: 60, width: 320, height: 480, color: '#a855f7', icon: '🧩' },
  { id: 'g3', title: 'Prompt Encoding', x: 780, y: 40, width: 320, height: 560, color: '#22c55e', icon: '💬' },
  { id: 'g4', title: 'Sampling & Latent', x: 1180, y: 40, width: 320, height: 560, color: '#eab308', icon: '⚙️' },
  { id: 'g5', title: 'Animation Branch', x: 30, y: 740, width: 320, height: 440, color: '#f97316', icon: '▶️' },
  { id: 'g6', title: 'Vid2vid Branch', x: 380, y: 740, width: 320, height: 540, color: '#3b82f6', icon: '🎬' },
  { id: 'g7', title: 'Lip-Sync Branch', x: 780, y: 740, width: 320, height: 560, color: '#ec4899', icon: '🎤' },
  { id: 'g8', title: 'Final Output', x: 1180, y: 740, width: 320, height: 260, color: '#64748b', icon: '💾' },
];

export default function App() {
  const [nodes, setNodes] = useState<NodeData[]>(workflowNodes);
  const [connections, setConnections] = useState<ConnectionData[]>(workflowConnections);
  const [groups] = useState<GroupData[]>(workflowGroups);
  const [zoom, setZoom] = useState(0.6);
  const [pan, setPan] = useState({ x: 50, y: 20 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [dragConnection, setDragConnection] = useState<{
    fromNode: string;
    fromPort: string;
    type: string;
    mousePos: { x: number; y: number };
  } | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeMove = useCallback((nodeId: string, dx: number, dy: number) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, x: node.x + dx / zoom, y: node.y + dy / zoom }
        : node
    ));
  }, [zoom]);

  const handlePortMouseDown = (nodeId: string, portId: string, portType: string, isInput: boolean) => {
    if (isInput) {
      setConnections(prev => prev.filter(conn => 
        !(conn.toNode === nodeId && conn.toPort === portId)
      ));
    } else {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      const port = node.outputs.find(p => p.id === portId);
      if (!port) return;

      setDragConnection({
        fromNode: nodeId,
        fromPort: portId,
        type: portType,
        mousePos: { x: 0, y: 0 }
      });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (dragConnection) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      setDragConnection(prev => prev ? {
        ...prev,
        mousePos: {
          x: (e.clientX - rect.left - pan.x) / zoom,
          y: (e.clientY - rect.top - pan.y) / zoom
        }
      } : null);
    }

    if (isPanning) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setPan({ x: pan.x + dx, y: pan.y + dy });
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseUp = () => {
    setDragConnection(null);
    setIsPanning(false);
  };

  const handlePortMouseUp = (nodeId: string, portId: string, portType: string, isInput: boolean) => {
    if (dragConnection && isInput && dragConnection.type === portType) {
      const newConnection: ConnectionData = {
        id: `conn_${Date.now()}`,
        fromNode: dragConnection.fromNode,
        fromPort: dragConnection.fromPort,
        toNode: nodeId,
        toPort: portId,
        type: portType
      };
      setConnections(prev => [...prev, newConnection]);
    }
    setDragConnection(null);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && e.target === canvasRef.current) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      setSelectedNodeId(null);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleResetView = () => {
    setZoom(0.6);
    setPan({ x: 50, y: 20 });
  };

  const addNode = (nodeType: string) => {
    const newNode: NodeData = {
      id: `node_${Date.now()}`,
      type: nodeType,
      title: nodeType,
      x: (300 - pan.x) / zoom,
      y: (300 - pan.y) / zoom,
      inputs: [],
      outputs: [],
    };
    
    setNodes(prev => [...prev, newNode]);
  };

  return (
    <div className="flex h-screen bg-[#0d1117] overflow-hidden">
      {/* Node Palette */}
      <NodePalette 
        isOpen={paletteOpen} 
        onToggle={() => setPaletteOpen(!paletteOpen)}
        onAddNode={addNode}
      />

      {/* Main Canvas */}
      <div className="flex-1 relative">
        {/* Title */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <h1 className="text-white text-2xl font-bold text-center">
            Priya AI Influencer – Full ComfyUI Workflow
          </h1>
          <p className="text-gray-400 text-sm text-center mt-1">
            All Nodes, Settings, Inputs & Outputs
          </p>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-[#161b22] border border-[#30363d] p-2 rounded hover:bg-[#1c2128] text-white"
            title="Zoom In"
          >
            <Plus size={20} />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-[#161b22] border border-[#30363d] p-2 rounded hover:bg-[#1c2128] text-white"
            title="Zoom Out"
          >
            <Minus size={20} />
          </button>
          <button
            onClick={handleResetView}
            className="bg-[#161b22] border border-[#30363d] p-2 rounded hover:bg-[#1c2128] text-white"
            title="Reset View"
          >
            <Move size={20} />
          </button>
          <div className="bg-[#161b22] border border-[#30363d] px-3 py-2 rounded text-white text-sm">
            {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="w-full h-full overflow-hidden relative"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          style={{
            cursor: isPanning ? 'grabbing' : 'grab',
            backgroundImage: `
              linear-gradient(#1c2128 1px, transparent 1px),
              linear-gradient(90deg, #1c2128 1px, transparent 1px)
            `,
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Render group boxes */}
            {groups.map(group => (
              <GroupBox key={group.id} group={group} />
            ))}

            {/* Render connections */}
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              style={{ width: '4000px', height: '4000px', overflow: 'visible' }}
            >
              {connections.map(conn => {
                const fromNode = nodes.find(n => n.id === conn.fromNode);
                const toNode = nodes.find(n => n.id === conn.toNode);
                if (!fromNode || !toNode) return null;

                const fromPort = fromNode.outputs.find(p => p.id === conn.fromPort);
                const toPort = toNode.inputs.find(p => p.id === conn.toPort);
                if (!fromPort || !toPort) return null;

                return (
                  <Connection
                    key={conn.id}
                    fromNode={fromNode}
                    toNode={toNode}
                    fromPortIndex={fromNode.outputs.indexOf(fromPort)}
                    toPortIndex={toNode.inputs.indexOf(toPort)}
                    type={conn.type}
                  />
                );
              })}

              {dragConnection && (() => {
                const fromNode = nodes.find(n => n.id === dragConnection.fromNode);
                if (!fromNode) return null;
                
                const fromPort = fromNode.outputs.find(p => p.id === dragConnection.fromPort);
                if (!fromPort) return null;

                const fromPortIndex = fromNode.outputs.indexOf(fromPort);

                return (
                  <Connection
                    fromNode={fromNode}
                    toNode={{ ...fromNode, x: dragConnection.mousePos.x - 140, y: dragConnection.mousePos.y - 40 }}
                    fromPortIndex={fromPortIndex}
                    toPortIndex={0}
                    type={dragConnection.type}
                  />
                );
              })()}
            </svg>

            {/* Render nodes */}
            {nodes.map(node => (
              <ComfyNode
                key={node.id}
                node={node}
                isSelected={selectedNodeId === node.id}
                onMove={handleNodeMove}
                onSelect={() => setSelectedNodeId(node.id)}
                onPortMouseDown={handlePortMouseDown}
                onPortMouseUp={handlePortMouseUp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
