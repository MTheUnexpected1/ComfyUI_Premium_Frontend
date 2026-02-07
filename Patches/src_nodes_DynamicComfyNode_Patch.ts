import { NodeProps } from 'reactflow';
import { BaseNode, BaseNodeData, Port } from './BaseNode';
import { NODE_DEFS } from '../../data/node-defs';

interface DynamicNodeData {
  nodeClass: string;
}

const CATEGORY_BY_KEYWORD: Array<{ keyword: string; category: BaseNodeData['category'] }> = [
  { keyword: 'model', category: 'model' },
  { keyword: 'clip', category: 'conditioning' },
  { keyword: 'conditioning', category: 'conditioning' },
  { keyword: 'latent', category: 'latent' },
  { keyword: 'sampler', category: 'latent' },
  { keyword: 'image', category: 'image' },
  { keyword: 'mask', category: 'image' },
];

const normalizeType = (rawType: unknown): string => {
  if (typeof rawType === 'string') return rawType;
  if (Array.isArray(rawType) && typeof rawType[0] === 'string') return rawType[0];
  return 'STRING';
};

const toPorts = (entries?: Record<string, unknown[]>): Port[] => {
  if (!entries) return [];

  return Object.entries(entries).map(([id, config]) => ({
    id,
    label: id,
    type: normalizeType(config?.[0]),
  }));
};

const mapCategory = (rawCategory: string): BaseNodeData['category'] => {
  const lower = rawCategory.toLowerCase();
  const mapped = CATEGORY_BY_KEYWORD.find(({ keyword }) => lower.includes(keyword));
  return mapped?.category ?? 'advanced';
};

export function DynamicComfyNode(props: NodeProps<DynamicNodeData>) {
  const nodeClass = props.data?.nodeClass;
  const def = nodeClass ? NODE_DEFS[nodeClass] : undefined;

  const data: BaseNodeData = {
    label: def?.display_name || def?.name || nodeClass || 'Unknown Node',
    category: mapCategory(def?.category || ''),
    inputs: [
      ...toPorts(def?.input?.required),
      ...toPorts(def?.input?.optional),
    ],
    outputs: (def?.output_name || def?.output || []).map((outputName, index) => ({
      id: outputName || `output_${index}`,
      label: outputName || `output_${index}`,
      type: normalizeType(def?.output?.[index]),
    })),
  };

  return <BaseNode {...props} data={data} />;
}
