/**
 * Edge Utilities
 * 
 * Helper functions to determine edge categories based on port types,
 * manage execution states, and handle edge interactions.
 */

import { Edge } from 'reactflow';

// Map port types to edge categories
export function getEdgeCategoryFromPortType(portType: string): string {
  const typeMap: Record<string, string> = {
    // Model related
    'MODEL': 'model',
    'CHECKPOINT': 'model',
    'LORA': 'model',
    'VAE': 'model',
    
    // Conditioning/prompt related
    'CONDITIONING': 'conditioning',
    'CLIP': 'conditioning',
    'PROMPT': 'conditioning',
    'TEXT': 'conditioning',
    
    // Latent space
    'LATENT': 'latent',
    'NOISE': 'latent',
    'EMPTY_LATENT': 'latent',
    
    // Image data
    'IMAGE': 'image',
    'MASK': 'image',
    'OUTPUT': 'image',
    
    // Control/reference
    'CONTROL_NET': 'controlnet',
    'IP_ADAPTER': 'controlnet',
    'REFERENCE': 'controlnet',
    
    // Video/animation
    'VIDEO': 'video',
    'FRAMES': 'video',
    'MOTION': 'video',
    
    // Primitives
    'INT': 'primitive',
    'FLOAT': 'primitive',
    'STRING': 'primitive',
    'BOOLEAN': 'primitive',
  };
  
  return typeMap[portType.toUpperCase()] || 'default';
}

// Update edge execution state
export function setEdgeExecuting(edges: Edge[], edgeId: string, isExecuting: boolean): Edge[] {
  return edges.map(edge => 
    edge.id === edgeId 
      ? { ...edge, data: { ...edge.data, isExecuting } }
      : edge
  );
}

// Highlight edges connected to a node
export function highlightConnectedEdges(edges: Edge[], nodeId: string): Edge[] {
  return edges.map(edge => ({
    ...edge,
    selected: edge.source === nodeId || edge.target === nodeId,
  }));
}

// Batch update multiple edges (useful for execution flow)
export function updateEdgesExecutionFlow(
  edges: Edge[], 
  executingNodeIds: string[]
): Edge[] {
  return edges.map(edge => {
    const isConnectedToExecuting = 
      executingNodeIds.includes(edge.source) || 
      executingNodeIds.includes(edge.target);
    
    return {
      ...edge,
      data: {
        ...edge.data,
        isExecuting: isConnectedToExecuting,
      },
    };
  });
}

// Sort edges by category for better rendering order (prevents overlap issues)
export function sortEdgesByCategory(edges: Edge[]): Edge[] {
  const categoryPriority: Record<string, number> = {
    primitive: 0,  // Render first (background)
    model: 1,
    latent: 2,
    conditioning: 3,
    image: 4,
    controlnet: 5,
    video: 6,
    default: 7,    // Render last (foreground)
  };
  
  return [...edges].sort((a, b) => {
    const priorityA = categoryPriority[a.data?.category || 'default'] || 99;
    const priorityB = categoryPriority[b.data?.category || 'default'] || 99;
    return priorityA - priorityB;
  });
}
