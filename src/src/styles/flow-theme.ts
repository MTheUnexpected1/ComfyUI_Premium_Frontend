// Category colors and theme configuration for nodes
export const nodeCategories = {
  latent: {
    name: 'Latent',
    color: '#a855f7',
    borderColor: 'rgba(168, 85, 247, 0.7)',
    titleBg: 'rgba(168, 85, 247, 0.15)',
    glow: '0 0 20px rgba(168, 85, 247, 0.5)',
  },
  conditioning: {
    name: 'Conditioning',
    color: '#f59e0b',
    borderColor: 'rgba(245, 158, 11, 0.7)',
    titleBg: 'rgba(245, 158, 11, 0.15)',
    glow: '0 0 20px rgba(245, 158, 11, 0.5)',
  },
  image: {
    name: 'Image',
    color: '#10b981',
    borderColor: 'rgba(16, 185, 129, 0.7)',
    titleBg: 'rgba(16, 185, 129, 0.15)',
    glow: '0 0 20px rgba(16, 185, 129, 0.5)',
  },
  model: {
    name: 'Model',
    color: '#3b82f6',
    borderColor: 'rgba(59, 130, 246, 0.7)',
    titleBg: 'rgba(59, 130, 246, 0.15)',
    glow: '0 0 20px rgba(59, 130, 246, 0.5)',
  },
  advanced: {
    name: 'Advanced',
    color: '#ef4444',
    borderColor: 'rgba(239, 68, 68, 0.7)',
    titleBg: 'rgba(239, 68, 68, 0.15)',
    glow: '0 0 20px rgba(239, 68, 68, 0.5)',
  },
} as const;

export type NodeCategory = keyof typeof nodeCategories;

// Port (input/output) data types with colors
export const portTypes = {
  LATENT: { color: '#a855f7', label: 'Latent' },
  CONDITIONING: { color: '#f59e0b', label: 'Conditioning' },
  IMAGE: { color: '#10b981', label: 'Image' },
  MODEL: { color: '#3b82f6', label: 'Model' },
  VAE: { color: '#8b5cf6', label: 'VAE' },
  CLIP: { color: '#f59e0b', label: 'CLIP' },
  CONTROL_NET: { color: '#ef4444', label: 'ControlNet' },
  INT: { color: '#6b7280', label: 'Int' },
  FLOAT: { color: '#6b7280', label: 'Float' },
  STRING: { color: '#9ca3af', label: 'String' },
} as const;

export type PortType = keyof typeof portTypes;