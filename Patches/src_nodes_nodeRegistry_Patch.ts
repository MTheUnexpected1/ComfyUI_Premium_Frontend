diff --git a/src/nodes/nodeRegistry.ts b/src/nodes/nodeRegistry.ts
index 236062885a71c3fd4aa430c2129bfc7f19449451..7387fbf1ddf101e87edc01ab515eb4240937d1c1 100644
--- a/src/nodes/nodeRegistry.ts
+++ b/src/nodes/nodeRegistry.ts
@@ -1,367 +1,105 @@
-import { 
-  // Loaders
+import {
   CheckpointLoaderNode,
   VAELoaderNode,
   LoRALoaderNode,
   ControlNetLoaderNode,
   CLIPLoaderNode,
   DualCLIPLoaderNode,
   UnetLoaderGGUFNode,
-  
-  // Conditioning
   CLIPTextEncodeNode,
   CLIPTextEncodeAdvancedNode,
   ConditioningCombineNode,
   ConditioningConcatNode,
   ConditioningSetAreaNode,
   ControlNetApplyNode,
-  
-  // Sampling/Latent
   KSamplerNode,
   KSamplerAdvancedNode,
   EmptyLatentImageNode,
   VAEEncodeNode,
   VAEDecodeNode,
   LatentUpscaleNode,
   LatentCompositeNode,
   LatentBatchNode,
-  
-  // Image Operations
   LoadImageNode,
   SaveImageNode,
   PreviewImageNode,
   ImageScaleNode,
   ImageUpscaleWithModelNode,
   ImageBatchNode,
   ImageBlurNode,
   ImageCropNode,
   ImagePadNode,
-  
-  // Mask Operations
   ImageToMaskNode,
   MaskToImageNode,
   InvertMaskNode,
   GrowMaskNode,
-  
-  // Utility
   IntegerNode,
   FloatNode,
   StringNode,
   RerouteNode,
   NoteNode,
 } from './ComfyNodes';
+import { NODE_DEFS } from '../../data/node-defs';
+import { DynamicComfyNode } from './DynamicComfyNode';
 
-// Register all custom node types for React Flow
 export const nodeTypes = {
-  // Loaders
   checkpointLoader: CheckpointLoaderNode,
   vaeLoader: VAELoaderNode,
   loraLoader: LoRALoaderNode,
   controlNetLoader: ControlNetLoaderNode,
   clipLoader: CLIPLoaderNode,
   dualClipLoader: DualCLIPLoaderNode,
   unetLoaderGGUF: UnetLoaderGGUFNode,
-  
-  // Conditioning
   clipTextEncode: CLIPTextEncodeNode,
   clipTextEncodeAdvanced: CLIPTextEncodeAdvancedNode,
   conditioningCombine: ConditioningCombineNode,
   conditioningConcat: ConditioningConcatNode,
   conditioningSetArea: ConditioningSetAreaNode,
   controlNetApply: ControlNetApplyNode,
-  
-  // Sampling/Latent
   ksampler: KSamplerNode,
   ksamplerAdvanced: KSamplerAdvancedNode,
   emptyLatentImage: EmptyLatentImageNode,
   vaeEncode: VAEEncodeNode,
   vaeDecode: VAEDecodeNode,
   latentUpscale: LatentUpscaleNode,
   latentComposite: LatentCompositeNode,
   latentBatch: LatentBatchNode,
-  
-  // Image Operations
   loadImage: LoadImageNode,
   saveImage: SaveImageNode,
   previewImage: PreviewImageNode,
   imageScale: ImageScaleNode,
   imageUpscaleWithModel: ImageUpscaleWithModelNode,
   imageBatch: ImageBatchNode,
   imageBlur: ImageBlurNode,
   imageCrop: ImageCropNode,
   imagePad: ImagePadNode,
-  
-  // Mask Operations
   imageToMask: ImageToMaskNode,
   maskToImage: MaskToImageNode,
   invertMask: InvertMaskNode,
   growMask: GrowMaskNode,
-  
-  // Utility
   integer: IntegerNode,
   float: FloatNode,
   string: StringNode,
   reroute: RerouteNode,
   note: NoteNode,
+  comfyDynamic: DynamicComfyNode,
 };
 
-// Node palette data for sidebar - organized by category
-export const nodeLibrary = [
-  // ==========================================
-  // LOADERS
-  // ==========================================
-  {
-    type: 'checkpointLoader',
-    label: 'Load Checkpoint',
-    category: 'model',
-    description: 'Load Stable Diffusion checkpoint',
-  },
-  {
-    type: 'unetLoaderGGUF',
-    label: 'Unet Loader (GGUF)',
-    category: 'model',
-    description: 'Load quantized GGUF model',
-  },
-  {
-    type: 'vaeLoader',
-    label: 'Load VAE',
-    category: 'model',
-    description: 'Load VAE model',
-  },
-  {
-    type: 'loraLoader',
-    label: 'Load LoRA',
-    category: 'model',
-    description: 'Load and apply LoRA',
-  },
-  {
-    type: 'controlNetLoader',
-    label: 'Load ControlNet',
-    category: 'model',
-    description: 'Load ControlNet model',
-  },
-  {
-    type: 'clipLoader',
-    label: 'Load CLIP',
-    category: 'model',
-    description: 'Load CLIP text encoder',
-  },
-  {
-    type: 'dualClipLoader',
-    label: 'DualCLIPLoader',
-    category: 'model',
-    description: 'Load dual CLIP encoders',
-  },
-  
-  // ==========================================
-  // CONDITIONING
-  // ==========================================
-  {
-    type: 'clipTextEncode',
-    label: 'CLIP Text Encode',
-    category: 'conditioning',
-    description: 'Encode text prompt',
-  },
-  {
-    type: 'clipTextEncodeAdvanced',
-    label: 'CLIP Text Encode (Advanced)',
-    category: 'conditioning',
-    description: 'Advanced text encoding',
-  },
-  {
-    type: 'conditioningCombine',
-    label: 'Conditioning (Combine)',
-    category: 'conditioning',
-    description: 'Combine two conditionings',
-  },
-  {
-    type: 'conditioningConcat',
-    label: 'Conditioning (Concat)',
-    category: 'conditioning',
-    description: 'Concatenate conditionings',
-  },
-  {
-    type: 'conditioningSetArea',
-    label: 'Conditioning (Set Area)',
-    category: 'conditioning',
-    description: 'Set conditioning area',
-  },
-  {
-    type: 'controlNetApply',
-    label: 'Apply ControlNet',
-    category: 'conditioning',
-    description: 'Apply ControlNet guidance',
-  },
-  
-  // ==========================================
-  // SAMPLING / LATENT
-  // ==========================================
-  {
-    type: 'ksampler',
-    label: 'KSampler',
-    category: 'latent',
-    description: 'Sample latent images',
-  },
-  {
-    type: 'ksamplerAdvanced',
-    label: 'KSampler (Advanced)',
-    category: 'latent',
-    description: 'Advanced sampling control',
-  },
-  {
-    type: 'emptyLatentImage',
-    label: 'Empty Latent Image',
-    category: 'latent',
-    description: 'Create blank latent',
-  },
-  {
-    type: 'vaeEncode',
-    label: 'VAE Encode',
-    category: 'latent',
-    description: 'Encode image to latent',
-  },
-  {
-    type: 'vaeDecode',
-    label: 'VAE Decode',
-    category: 'latent',
-    description: 'Decode latent to image',
-  },
-  {
-    type: 'latentUpscale',
-    label: 'Upscale Latent',
-    category: 'latent',
-    description: 'Upscale latent space',
-  },
-  {
-    type: 'latentComposite',
-    label: 'Latent Composite',
-    category: 'latent',
-    description: 'Composite latent images',
-  },
-  {
-    type: 'latentBatch',
-    label: 'Latent Batch',
-    category: 'latent',
-    description: 'Batch latent images',
-  },
-  
-  // ==========================================
-  // IMAGE OPERATIONS
-  // ==========================================
-  {
-    type: 'loadImage',
-    label: 'Load Image',
-    category: 'image',
-    description: 'Load image from file',
-  },
-  {
-    type: 'saveImage',
-    label: 'Save Image',
-    category: 'image',
-    description: 'Save generated image',
-  },
-  {
-    type: 'previewImage',
-    label: 'Preview Image',
-    category: 'image',
-    description: 'Preview image output',
-  },
-  {
-    type: 'imageScale',
-    label: 'Upscale Image',
-    category: 'image',
-    description: 'Scale image size',
-  },
-  {
-    type: 'imageUpscaleWithModel',
-    label: 'Upscale Image (Model)',
-    category: 'image',
-    description: 'Upscale with model',
-  },
-  {
-    type: 'imageBatch',
-    label: 'Image Batch',
-    category: 'image',
-    description: 'Batch multiple images',
-  },
-  {
-    type: 'imageBlur',
-    label: 'Blur',
-    category: 'image',
-    description: 'Blur image',
-  },
-  {
-    type: 'imageCrop',
-    label: 'Crop Image',
-    category: 'image',
-    description: 'Crop image region',
-  },
-  {
-    type: 'imagePad',
-    label: 'Pad Image for Outpainting',
-    category: 'image',
-    description: 'Pad image edges',
-  },
-  
-  // ==========================================
-  // MASK OPERATIONS
-  // ==========================================
-  {
-    type: 'imageToMask',
-    label: 'Convert Image to Mask',
-    category: 'image',
-    description: 'Convert to mask',
-  },
-  {
-    type: 'maskToImage',
-    label: 'Convert Mask to Image',
-    category: 'image',
-    description: 'Convert to image',
-  },
-  {
-    type: 'invertMask',
-    label: 'Invert Mask',
-    category: 'image',
-    description: 'Invert mask values',
-  },
-  {
-    type: 'growMask',
-    label: 'Grow Mask',
-    category: 'image',
-    description: 'Expand mask area',
-  },
-  
-  // ==========================================
-  // UTILITY
-  // ==========================================
-  {
-    type: 'integer',
-    label: 'Integer',
-    category: 'advanced',
-    description: 'Integer value',
-  },
-  {
-    type: 'float',
-    label: 'Float',
-    category: 'advanced',
-    description: 'Float value',
-  },
-  {
-    type: 'string',
-    label: 'String',
-    category: 'advanced',
-    description: 'Text string',
-  },
-  {
-    type: 'reroute',
-    label: 'Reroute',
-    category: 'advanced',
-    description: 'Reroute connections',
-  },
-  {
-    type: 'note',
-    label: 'Note',
-    category: 'advanced',
-    description: 'Add workflow note',
-  },
-];
+const mapCategory = (rawCategory: string) => {
+  const lower = rawCategory.toLowerCase();
+  if (lower.includes('model')) return 'model';
+  if (lower.includes('condition') || lower.includes('clip')) return 'conditioning';
+  if (lower.includes('latent') || lower.includes('sampler')) return 'latent';
+  if (lower.includes('image') || lower.includes('mask')) return 'image';
+  return 'advanced';
+};
+
+export const nodeLibrary = Object.entries(NODE_DEFS)
+  .map(([className, def]) => ({
+    type: 'comfyDynamic',
+    className,
+    label: def.display_name || def.name || className,
+    category: mapCategory(def.category),
+    description: def.description?.trim() || def.category || 'ComfyUI node',
+  }))
+  .sort((a, b) => a.label.localeCompare(b.label));
