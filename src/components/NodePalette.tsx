import React from 'react';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';

interface NodePaletteProps {
  isOpen: boolean;
  onToggle: () => void;
  onAddNode: (nodeType: string) => void;
}

const NODE_CATEGORIES = {
  'Loaders': [
    'Load Checkpoint',
    'Load VAE',
    'Load LoRA',
    'Load ControlNet',
  ],
  'Conditioning': [
    'CLIP Text Encode',
    'CLIP Text Encode (Prompt)',
    'Conditioning (Combine)',
    'Conditioning (Set Area)',
  ],
  'Sampling': [
    'KSampler',
    'KSampler (Advanced)',
    'KSamplerSelect',
  ],
  'Latent': [
    'Empty Latent Image',
    'VAE Encode',
    'VAE Decode',
    'Latent Upscale',
  ],
  'Image': [
    'Save Image',
    'Preview Image',
    'Load Image',
    'Image Scale',
  ],
  'Model': [
    'ControlNet Apply',
    'LoRA Loader',
    'Model Merge',
  ],
};

export function NodePalette({ isOpen, onToggle, onAddNode }: NodePaletteProps) {
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute left-0 top-4 z-20 bg-[#161b22] border border-[#30363d] p-2 rounded-r hover:bg-[#1c2128] text-white"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Palette panel */}
      <div
        className={`bg-[#0d1117] border-r border-[#30363d] transition-all duration-300 overflow-y-auto ${
          isOpen ? 'w-64' : 'w-0'
        }`}
        style={{ maxHeight: '100vh' }}
      >
        {isOpen && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Package size={20} />
              <h2 className="font-semibold">Node Palette</h2>
            </div>

            {Object.entries(NODE_CATEGORIES).map(([category, nodes]) => (
              <div key={category} className="mb-4">
                <h3 className="text-gray-400 text-xs font-semibold uppercase mb-2">
                  {category}
                </h3>
                <div className="space-y-1">
                  {nodes.map((node) => (
                    <button
                      key={node}
                      onClick={() => onAddNode(node)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#161b22] rounded border border-transparent hover:border-[#30363d] transition-colors"
                    >
                      {node}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
