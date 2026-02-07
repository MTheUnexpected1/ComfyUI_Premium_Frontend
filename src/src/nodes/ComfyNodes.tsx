import { NodeProps } from 'reactflow';
import { BaseNode, BaseNodeData } from './BaseNode';

// ==========================================
// LOADERS
// ==========================================

// Checkpoint Loader - Model loading
export function CheckpointLoaderNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Load Checkpoint',
    category: 'model',
    outputs: [
      { id: 'model', label: 'MODEL', type: 'MODEL' },
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
      { id: 'vae', label: 'VAE', type: 'VAE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// VAE Loader
export function VAELoaderNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Load VAE',
    category: 'model',
    outputs: [
      { id: 'vae', label: 'VAE', type: 'VAE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// LoRA Loader
export function LoRALoaderNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Load LoRA',
    category: 'model',
    inputs: [
      { id: 'model', label: 'MODEL', type: 'MODEL' },
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
    ],
    outputs: [
      { id: 'model', label: 'MODEL', type: 'MODEL' },
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ControlNet Loader
export function ControlNetLoaderNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Load ControlNet',
    category: 'model',
    outputs: [
      { id: 'control_net', label: 'CONTROL_NET', type: 'CONTROL_NET' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// CLIP Loader
export function CLIPLoaderNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Load CLIP',
    category: 'model',
    outputs: [
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// DualCLIP Loader
export function DualCLIPLoaderNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'DualCLIPLoader',
    category: 'model',
    outputs: [
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Unet Loader (GGUF)
export function UnetLoaderGGUFNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Unet Loader (GGUF)',
    category: 'model',
    outputs: [
      { id: 'model', label: 'MODEL', type: 'MODEL' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ==========================================
// CONDITIONING
// ==========================================

// CLIP Text Encode - Prompt conditioning
export function CLIPTextEncodeNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'CLIP Text Encode',
    category: 'conditioning',
    inputs: [
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
      { id: 'text', label: 'text', type: 'STRING' },
    ],
    outputs: [
      { id: 'conditioning', label: 'CONDITIONING', type: 'CONDITIONING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// CLIP Text Encode (Advanced)
export function CLIPTextEncodeAdvancedNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'CLIP Text Encode (Advanced)',
    category: 'conditioning',
    inputs: [
      { id: 'clip', label: 'CLIP', type: 'CLIP' },
      { id: 'text', label: 'text', type: 'STRING' },
    ],
    outputs: [
      { id: 'conditioning', label: 'CONDITIONING', type: 'CONDITIONING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Conditioning Combine
export function ConditioningCombineNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Conditioning (Combine)',
    category: 'conditioning',
    inputs: [
      { id: 'conditioning_1', label: 'conditioning_1', type: 'CONDITIONING' },
      { id: 'conditioning_2', label: 'conditioning_2', type: 'CONDITIONING' },
    ],
    outputs: [
      { id: 'conditioning', label: 'CONDITIONING', type: 'CONDITIONING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Conditioning Concat
export function ConditioningConcatNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Conditioning (Concat)',
    category: 'conditioning',
    inputs: [
      { id: 'conditioning_to', label: 'conditioning_to', type: 'CONDITIONING' },
      { id: 'conditioning_from', label: 'conditioning_from', type: 'CONDITIONING' },
    ],
    outputs: [
      { id: 'conditioning', label: 'CONDITIONING', type: 'CONDITIONING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Conditioning Set Area
export function ConditioningSetAreaNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Conditioning (Set Area)',
    category: 'conditioning',
    inputs: [
      { id: 'conditioning', label: 'conditioning', type: 'CONDITIONING' },
    ],
    outputs: [
      { id: 'conditioning', label: 'CONDITIONING', type: 'CONDITIONING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ControlNet Apply
export function ControlNetApplyNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Apply ControlNet',
    category: 'conditioning',
    inputs: [
      { id: 'conditioning', label: 'conditioning', type: 'CONDITIONING' },
      { id: 'control_net', label: 'control_net', type: 'CONTROL_NET' },
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'conditioning', label: 'CONDITIONING', type: 'CONDITIONING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ==========================================
// SAMPLING / LATENT
// ==========================================

// KSampler - Core sampling node
export function KSamplerNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'KSampler',
    category: 'latent',
    inputs: [
      { id: 'model', label: 'model', type: 'MODEL' },
      { id: 'positive', label: 'positive', type: 'CONDITIONING' },
      { id: 'negative', label: 'negative', type: 'CONDITIONING' },
      { id: 'latent_image', label: 'latent_image', type: 'LATENT' },
    ],
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
    executing: props.data?.executing,
  };
  return <BaseNode {...props} data={data} />;
}

// KSampler Advanced
export function KSamplerAdvancedNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'KSampler (Advanced)',
    category: 'latent',
    inputs: [
      { id: 'model', label: 'model', type: 'MODEL' },
      { id: 'positive', label: 'positive', type: 'CONDITIONING' },
      { id: 'negative', label: 'negative', type: 'CONDITIONING' },
      { id: 'latent_image', label: 'latent_image', type: 'LATENT' },
    ],
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Empty Latent Image
export function EmptyLatentImageNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Empty Latent Image',
    category: 'latent',
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// VAE Encode
export function VAEEncodeNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'VAE Encode',
    category: 'latent',
    inputs: [
      { id: 'pixels', label: 'pixels', type: 'IMAGE' },
      { id: 'vae', label: 'vae', type: 'VAE' },
    ],
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// VAE Decode
export function VAEDecodeNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'VAE Decode',
    category: 'latent',
    inputs: [
      { id: 'samples', label: 'samples', type: 'LATENT' },
      { id: 'vae', label: 'vae', type: 'VAE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Latent Upscale
export function LatentUpscaleNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Upscale Latent',
    category: 'latent',
    inputs: [
      { id: 'samples', label: 'samples', type: 'LATENT' },
    ],
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Latent Composite
export function LatentCompositeNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Latent Composite',
    category: 'latent',
    inputs: [
      { id: 'samples_to', label: 'samples_to', type: 'LATENT' },
      { id: 'samples_from', label: 'samples_from', type: 'LATENT' },
    ],
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Latent Batch
export function LatentBatchNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Latent Batch',
    category: 'latent',
    inputs: [
      { id: 'samples1', label: 'samples1', type: 'LATENT' },
      { id: 'samples2', label: 'samples2', type: 'LATENT' },
    ],
    outputs: [
      { id: 'latent', label: 'LATENT', type: 'LATENT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ==========================================
// IMAGE OPERATIONS
// ==========================================

// Load Image
export function LoadImageNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Load Image',
    category: 'image',
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
      { id: 'mask', label: 'MASK', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Save Image
export function SaveImageNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Save Image',
    category: 'image',
    inputs: [
      { id: 'images', label: 'images', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Preview Image
export function PreviewImageNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Preview Image',
    category: 'image',
    inputs: [
      { id: 'images', label: 'images', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Image Scale
export function ImageScaleNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Upscale Image',
    category: 'image',
    inputs: [
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Image Upscale (Model)
export function ImageUpscaleWithModelNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Upscale Image (using Model)',
    category: 'image',
    inputs: [
      { id: 'upscale_model', label: 'upscale_model', type: 'MODEL' },
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Image Batch
export function ImageBatchNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Image Batch',
    category: 'image',
    inputs: [
      { id: 'image1', label: 'image1', type: 'IMAGE' },
      { id: 'image2', label: 'image2', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Image Blur
export function ImageBlurNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Blur',
    category: 'image',
    inputs: [
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Image Crop
export function ImageCropNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Crop Image',
    category: 'image',
    inputs: [
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Image Pad
export function ImagePadNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Pad Image for Outpainting',
    category: 'image',
    inputs: [
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
      { id: 'mask', label: 'MASK', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ==========================================
// MASK OPERATIONS
// ==========================================

// Image To Mask
export function ImageToMaskNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Convert Image to Mask',
    category: 'image',
    inputs: [
      { id: 'image', label: 'image', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'mask', label: 'MASK', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Mask To Image
export function MaskToImageNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Convert Mask to Image',
    category: 'image',
    inputs: [
      { id: 'mask', label: 'mask', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'image', label: 'IMAGE', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Invert Mask
export function InvertMaskNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Invert Mask',
    category: 'image',
    inputs: [
      { id: 'mask', label: 'mask', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'mask', label: 'MASK', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Grow Mask
export function GrowMaskNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Grow Mask',
    category: 'image',
    inputs: [
      { id: 'mask', label: 'mask', type: 'IMAGE' },
    ],
    outputs: [
      { id: 'mask', label: 'MASK', type: 'IMAGE' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// ==========================================
// UTILITY / PRIMITIVES
// ==========================================

// Integer
export function IntegerNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Integer',
    category: 'advanced',
    outputs: [
      { id: 'int', label: 'INT', type: 'INT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Float
export function FloatNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Float',
    category: 'advanced',
    outputs: [
      { id: 'float', label: 'FLOAT', type: 'FLOAT' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// String
export function StringNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'String',
    category: 'advanced',
    outputs: [
      { id: 'string', label: 'STRING', type: 'STRING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Reroute
export function RerouteNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Reroute',
    category: 'advanced',
    inputs: [
      { id: 'input', label: '', type: 'STRING' },
    ],
    outputs: [
      { id: 'output', label: '', type: 'STRING' },
    ],
  };
  return <BaseNode {...props} data={data} />;
}

// Note
export function NoteNode(props: NodeProps) {
  const data: BaseNodeData = {
    label: 'Note',
    category: 'advanced',
    inputs: [],
    outputs: [],
  };
  return <BaseNode {...props} data={data} />;
}
