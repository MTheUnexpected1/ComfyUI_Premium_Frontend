import {
  CheckpointLoaderNode,
  VAELoaderNode,
  LoRALoaderNode,
  ControlNetLoaderNode,
  CLIPLoaderNode,
  DualCLIPLoaderNode,
  UnetLoaderGGUFNode,
  CLIPTextEncodeNode,
  CLIPTextEncodeAdvancedNode,
  ConditioningCombineNode,
  ConditioningConcatNode,
  ConditioningSetAreaNode,
  ControlNetApplyNode,
  KSamplerNode,
  KSamplerAdvancedNode,
  EmptyLatentImageNode,
  VAEEncodeNode,
  VAEDecodeNode,
  LatentUpscaleNode,
  LatentCompositeNode,
  LatentBatchNode,
  LoadImageNode,
  SaveImageNode,
  PreviewImageNode,
  ImageScaleNode,
  ImageUpscaleWithModelNode,
  ImageBatchNode,
  ImageBlurNode,
  ImageCropNode,
  ImagePadNode,
  ImageToMaskNode,
  MaskToImageNode,
  InvertMaskNode,
  GrowMaskNode,
  IntegerNode,
  FloatNode,
  StringNode,
  RerouteNode,
  NoteNode,
} from './ComfyNodes';
import { NODE_DEFS } from '../../data/node-defs';
import { DynamicComfyNode } from './DynamicComfyNode';

export const nodeTypes = {
  checkpointLoader: CheckpointLoaderNode,
  vaeLoader: VAELoaderNode,
  loraLoader: LoRALoaderNode,
  controlNetLoader: ControlNetLoaderNode,
  clipLoader: CLIPLoaderNode,
  dualClipLoader: DualCLIPLoaderNode,
  unetLoaderGGUF: UnetLoaderGGUFNode,
  clipTextEncode: CLIPTextEncodeNode,
  clipTextEncodeAdvanced: CLIPTextEncodeAdvancedNode,
  conditioningCombine: ConditioningCombineNode,
  conditioningConcat: ConditioningConcatNode,
  conditioningSetArea: ConditioningSetAreaNode,
  controlNetApply: ControlNetApplyNode,
  ksampler: KSamplerNode,
  ksamplerAdvanced: KSamplerAdvancedNode,
  emptyLatentImage: EmptyLatentImageNode,
  vaeEncode: VAEEncodeNode,
  vaeDecode: VAEDecodeNode,
  latentUpscale: LatentUpscaleNode,
  latentComposite: LatentCompositeNode,
  latentBatch: LatentBatchNode,
  loadImage: LoadImageNode,
  saveImage: SaveImageNode,
  previewImage: PreviewImageNode,
  imageScale: ImageScaleNode,
  imageUpscaleWithModel: ImageUpscaleWithModelNode,
  imageBatch: ImageBatchNode,
  imageBlur: ImageBlurNode,
  imageCrop: ImageCropNode,
  imagePad: ImagePadNode,
  imageToMask: ImageToMaskNode,
  maskToImage: MaskToImageNode,
  invertMask: InvertMaskNode,
  growMask: GrowMaskNode,
  integer: IntegerNode,
  float: FloatNode,
  string: StringNode,
  reroute: RerouteNode,
  note: NoteNode,
  comfyDynamic: DynamicComfyNode,
};

const mapCategory = (rawCategory: string) => {
  const lower = rawCategory.toLowerCase();
  if (lower.includes('model')) return 'model';
  if (lower.includes('condition') || lower.includes('clip')) return 'conditioning';
  if (lower.includes('latent') || lower.includes('sampler')) return 'latent';
  if (lower.includes('image') || lower.includes('mask')) return 'image';
  return 'advanced';
};

export const nodeLibrary = Object.entries(NODE_DEFS)
  .map(([className, def]) => ({
    type: 'comfyDynamic',
    className,
    label: def.display_name || def.name || className,
    category: mapCategory(def.category),
    description: def.description?.trim() || def.category || 'ComfyUI node',
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
