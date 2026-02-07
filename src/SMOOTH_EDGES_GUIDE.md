# Smooth, Free-Flowing Edge System - Complete Guide

## 🌊 Overview

This edge system creates **smooth, flowing connections** similar to modern node editors like Unreal Engine Blueprints, Houdini, and Figma plugins. No more rigid straight lines or tight corners.

---

## ✨ Key Features

✅ **Generous smooth curves** - No straight lines (unless connection is very short)  
✅ **Relaxed routing** - Takes longer paths to avoid overlaps and improve readability  
✅ **Precise port attachment** - Lines start and end exactly at port centers  
✅ **Larger ports** (14px → 18px on hover) - Easy to see and connect  
✅ **Category-based colors** - 8 distinct color families  
✅ **Soft glow effects** - Professional depth without neon  
✅ **Animated execution** - Flowing dashes + moving orb  
✅ **Hover highlighting** - Brighten and thicken connected edges  
✅ **High performance** - Smooth even with 100+ nodes  

---

## 🎨 How It Works

### 1. Smooth Curves (No Straight Lines)

The edge uses `getSmoothStepPath` with **generous parameters**:

```tsx
getSmoothStepPath({
  sourceX, sourceY, sourcePosition,
  targetX, targetY, targetPosition,
  borderRadius: 48,  // Large radius = smooth curves
  offset: 24,        // Extra routing space
});
```

**Key settings:**
- `borderRadius: 48` - Creates wide, flowing curves (default is ~20)
- `offset: 24` - Adds routing space for detours around nodes
- `strokeLinecap: "round"` - Smooth line endings
- `strokeLinejoin: "round"` - Smooth corners

**To make curves even more flowing:**
```tsx
borderRadius: 64,  // More generous
offset: 32,        // Wider detours
```

---

### 2. Precise Port Attachment

**Port positioning is handled by React Flow handles:**

In your node component:
```tsx
<Handle
  type="source"
  position={Position.Right}
  id="output_port"
  style={{
    right: -7,  // Centers the 14px port on edge
    top: '50%',
    background: portColor,
    border: '2.5px solid #0f0f11',
  }}
/>
```

**Port sizing:**
- Default: 14px diameter
- Hover: 18px (scales up smoothly)
- Border: 2.5px (increases to 3px on hover)

The edge automatically connects to the **exact center** of these ports.

---

### 3. Enhanced Port Visibility

**From globals.css:**
```css
.react-flow__handle {
  width: 14px;
  height: 14px;
  border: 2.5px solid #0f0f11;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.react-flow__handle:hover {
  width: 18px;
  height: 18px;
  transform: scale(1.15);
  box-shadow: 0 0 16px currentColor;
}
```

**Customization:**
```css
/* Even larger ports */
.react-flow__handle {
  width: 16px;
  height: 16px;
}

.react-flow__handle:hover {
  width: 20px;
  height: 20px;
}
```

---

## 🎯 Category Colors

| Category | Main Color | Glow Color | Use Case |
|----------|-----------|------------|----------|
| `model` | #8b5cf6 | #c4b5fd | Models, Checkpoints, LoRAs |
| `conditioning` | #06b6d4 | #67e8f9 | CLIP, Prompts, Text |
| `latent` | #10b981 | #6ee7b7 | Latent space, Noise |
| `image` | #f59e0b | #fbbf24 | Images, VAE outputs |
| `controlnet` | #e11d48 | #fb7185 | ControlNet, IP-Adapter |
| `video` | #c026d3 | #f472b6 | Video, Animation |
| `primitive` | #64748b | #94a3b8 | Int, Float, Logic |
| `default` | #6b7280 | #9ca3af | Fallback |

---

## 🚀 Setup Instructions

### 1. Import Components

```tsx
import { CustomEdge } from '../edges/CustomEdge';
import { EdgeFilters } from '../edges/EdgeFilters';

const edgeTypes = { custom: CustomEdge };
```

### 2. Add EdgeFilters (SVG Definitions)

```tsx
<div className="w-full h-full">
  <EdgeFilters />  {/* Must render BEFORE ReactFlow */}
  
  <ReactFlow
    edgeTypes={edgeTypes}
    connectionLineType={ConnectionLineType.SmoothStep}
    defaultEdgeOptions={{ type: 'custom' }}
    // ... other props
  />
</div>
```

### 3. Set Edge Data

```tsx
const edge = {
  id: 'e1',
  source: 'node1',
  target: 'node2',
  type: 'custom',
  data: { 
    category: 'latent',     // Required for coloring
    isExecuting: false,     // Optional for animation
    isHighlighted: false,   // Optional for manual highlight
  },
};
```

---

## 💫 Execution Animation

**Show flowing animation during workflow execution:**

```tsx
// Start animation
setEdges(edges.map(edge => 
  edge.id === 'e5-6'
    ? { ...edge, data: { ...edge.data, isExecuting: true } }
    : edge
));

// Stop animation
setEdges(edges.map(edge => 
  edge.id === 'e5-6'
    ? { ...edge, data: { ...edge.data, isExecuting: false } }
    : edge
));
```

**What you'll see:**
- Flowing dashed line (animated)
- Moving orb traveling along the path
- Pulsing orb size/opacity

---

## 🎨 Hover Highlighting

**Highlight edges connected to a hovered node:**

```tsx
const onNodeMouseEnter = useCallback((event, node) => {
  setEdges(edges.map(edge => ({
    ...edge,
    data: {
      ...edge.data,
      isHighlighted: edge.source === node.id || edge.target === node.id,
    },
  })));
}, [edges, setEdges]);

const onNodeMouseLeave = useCallback(() => {
  setEdges(edges.map(edge => ({
    ...edge,
    data: { ...edge.data, isHighlighted: false },
  })));
}, [edges, setEdges]);

<ReactFlow
  onNodeMouseEnter={onNodeMouseEnter}
  onNodeMouseLeave={onNodeMouseLeave}
  // ...
/>
```

---

## 🔧 Customization

### Adjust Curve Smoothness

**In CustomEdge.tsx:**
```tsx
const [edgePath] = getSmoothStepPath({
  // More flowing:
  borderRadius: 64,  // Default: 48
  offset: 32,        // Default: 24
  
  // Less flowing (tighter):
  borderRadius: 32,
  offset: 16,
});
```

### Change Line Thickness

```tsx
const baseStrokeWidth = 5;  // Default: 4
const strokeWidth = isHighlighted ? 6.5 : baseStrokeWidth;
```

### Adjust Glow Intensity

**In EdgeFilters.tsx:**
```tsx
<feGaussianBlur stdDeviation="5" />  // Default: 4 (more blur = softer glow)
```

### Modify Port Size

**In globals.css:**
```css
.react-flow__handle {
  width: 16px;   /* Increase from 14px */
  height: 16px;
}
```

### Add New Category

1. **CustomEdge.tsx** - Add color:
```tsx
const edgeColors = {
  // ... existing
  myCategory: { main: '#ff6b6b', glow: '#ffa8a8', label: 'My Type' },
};
```

2. **EdgeFilters.tsx** - Add marker:
```tsx
const categories = [
  // ... existing
  { id: 'myCategory', color: '#ff6b6b' },
];
```

3. **Use it:**
```tsx
data: { category: 'myCategory' }
```

---

## 📊 Performance Tips

### For 100+ Nodes/Edges:

1. **Memoize edges:**
```tsx
const memoizedEdges = useMemo(() => edges, [edges]);
```

2. **Disable animations on mobile:**
```tsx
const isMobile = window.innerWidth < 768;
data: { isExecuting: !isMobile && isExecuting }
```

3. **Reduce glow on low-end devices:**
```tsx
// In EdgeFilters.tsx
<feGaussianBlur stdDeviation={isMobile ? "2" : "4"} />
```

---

## 🐛 Troubleshooting

**Edges still look straight?**
- Check `borderRadius` is set to 48+ in `getSmoothStepPath`
- Verify you're using `type: 'custom'` on edges
- Ensure `connectionLineType={ConnectionLineType.SmoothStep}` in ReactFlow

**Ports not centering?**
- Handle position should be `right: -7` (half of 14px port)
- Check handle has proper `position={Position.Right}`

**Arrows not showing?**
- Verify `<EdgeFilters />` is rendered
- Check console for SVG errors
- Ensure category matches marker ID (e.g., `arrow-latent`)

**Performance lag?**
- Reduce `stdDeviation` in blur filters
- Disable execution animations
- Use `useMemo` for edge arrays

---

## 📝 Complete Edge Example

```tsx
{
  id: 'checkpoint-to-sampler',
  source: 'checkpoint',
  target: 'sampler',
  sourceHandle: 'model_out',
  targetHandle: 'model_in',
  type: 'custom',
  data: {
    category: 'model',
    isExecuting: false,
    isHighlighted: false,
  },
}
```

---

## 🎯 Visual Comparison

**Before (default React Flow):**
- Thin lines (1-2px)
- Sharp 90° corners
- Straight segments
- Hard to trace in complex graphs

**After (smooth system):**
- Thick lines (4-5.5px)
- Smooth flowing curves
- Generous routing
- Easy to follow, professional look

---

**You now have a production-ready, beautiful edge system!** 🎉

All code is optimized, commented, and ready to use. Just copy, paste, and enjoy smooth, flowing connections.
