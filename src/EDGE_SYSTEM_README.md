# Custom Edge System - Integration Guide

## 📦 What's Included

This custom edge system provides production-ready, beautiful connection lines for your ComfyUI React Flow frontend.

### Files Created:
1. **`/src/edges/CustomEdge.tsx`** - Main edge component with all features
2. **`/src/edges/EdgeFilters.tsx`** - SVG filters and arrow markers
3. **`/src/components/Canvas.tsx`** - Updated ReactFlow wrapper
4. **`/src/utils/edgeUtils.ts`** - Helper functions for edge management

---

## ✨ Features

✅ **Thick, visible lines** (4-5px) that are easy to trace  
✅ **Category-based colors** (8 distinct categories)  
✅ **Smooth curves** using SmoothStep path algorithm  
✅ **Soft glow effects** for better visibility  
✅ **Arrow heads** color-matched to each category  
✅ **Animated execution** (flowing dashes + moving orb)  
✅ **Hover highlighting** (thicker + brighter on hover)  
✅ **Performance optimized** (works with 100+ nodes)  
✅ **Label on hover** showing connection type  

---

## 🎨 Category Colors

| Category | Color | Use Case |
|----------|-------|----------|
| `model` | Violet (#8b5cf6) | Checkpoints, LoRAs, Models |
| `conditioning` | Cyan (#06b6d4) | CLIP, Text, Prompts |
| `latent` | Emerald (#10b981) | Latent space, Noise |
| `image` | Amber (#f59e0b) | Images, VAE outputs |
| `controlnet` | Rose (#e11d48) | ControlNet, IP-Adapter |
| `video` | Fuchsia (#c026d3) | Video, Animation |
| `primitive` | Slate (#64748b) | Int, Float, String |
| `default` | Gray (#6b7280) | Fallback |

---

## 🔧 Integration Steps

### 1. Import the custom edge in your Canvas component

```tsx
import { CustomEdge } from '../edges/CustomEdge';
import { EdgeFilters } from '../edges/EdgeFilters';

const edgeTypes = {
  custom: CustomEdge,
};
```

### 2. Add EdgeFilters component (SVG definitions)

Place `<EdgeFilters />` **inside or before** your `<ReactFlow>` component:

```tsx
<div className="w-full h-full">
  <EdgeFilters />
  
  <ReactFlow
    edgeTypes={edgeTypes}
    defaultEdgeOptions={{ type: 'custom' }}
    connectionLineType={ConnectionLineType.SmoothStep}
    // ... other props
  >
    {/* ... */}
  </ReactFlow>
</div>
```

### 3. Set edge data with category

When creating edges, include the `category` in the data field:

```tsx
const edge = {
  id: 'e1',
  source: 'node1',
  target: 'node2',
  type: 'custom',
  data: { 
    category: 'latent',  // ← Required for coloring
    isExecuting: false,   // ← Optional for animation
  },
};
```

### 4. Auto-detect category from port types

Use the helper function to determine category automatically:

```tsx
import { getEdgeCategoryFromPortType } from '../utils/edgeUtils';

const category = getEdgeCategoryFromPortType('LATENT'); // → 'latent'
```

---

## 🎮 Execution Animation

To show animated flow during workflow execution:

```tsx
// Update edge when node starts executing
setEdges(edges.map(edge => 
  edge.id === targetEdgeId
    ? { ...edge, data: { ...edge.data, isExecuting: true } }
    : edge
));

// Stop animation when done
setEdges(edges.map(edge => 
  edge.id === targetEdgeId
    ? { ...edge, data: { ...edge.data, isExecuting: false } }
    : edge
));
```

Or use the batch helper:

```tsx
import { updateEdgesExecutionFlow } from '../utils/edgeUtils';

const executingNodes = ['node5', 'node6'];
const updatedEdges = updateEdgesExecutionFlow(edges, executingNodes);
setEdges(updatedEdges);
```

---

## 🎯 Hover Highlighting

Highlight all edges connected to a node on hover:

```tsx
import { highlightConnectedEdges } from '../utils/edgeUtils';

// On node hover
const highlightedEdges = highlightConnectedEdges(edges, hoveredNodeId);
setEdges(highlightedEdges);
```

---

## ⚡ Performance Tips

1. **Memoize edge rendering** if you have 100+ edges:
   ```tsx
   const memoizedEdges = useMemo(() => edges, [edges]);
   ```

2. **Sort edges by category** to prevent z-index issues:
   ```tsx
   import { sortEdgesByCategory } from '../utils/edgeUtils';
   const sortedEdges = sortEdgesByCategory(edges);
   ```

3. **Disable animations on mobile** for better performance:
   ```tsx
   const isMobile = window.innerWidth < 768;
   data: { isExecuting: !isMobile && isExecuting }
   ```

---

## 🎨 Customization

### Change line thickness
In `CustomEdge.tsx`:
```tsx
const baseWidth = 5; // Change from 4 to 5 for thicker lines
```

### Adjust glow intensity
In `EdgeFilters.tsx`:
```tsx
<feGaussianBlur stdDeviation="4" /> // Increase for more glow
```

### Modify animation speed
In `CustomEdge.tsx`:
```tsx
dur="1s" // Change from "2s" to "1s" for faster flow
```

### Add new category
1. Add color to `edgeColors` in `CustomEdge.tsx`
2. Add marker in `EdgeFilters.tsx` categories array
3. Map port type in `edgeUtils.ts`

---

## 🐛 Troubleshooting

**Edges not rendering?**
- Ensure `<EdgeFilters />` is rendered
- Check that `type: 'custom'` is set on edges
- Verify `edgeTypes` is passed to ReactFlow

**No arrows showing?**
- Check browser console for SVG errors
- Ensure marker IDs match category names
- Try inspecting the SVG in DevTools

**Performance issues?**
- Reduce `feGaussianBlur` stdDeviation
- Disable animations on edges with >50 nodes
- Use `useMemo` for edge array

**Colors not showing?**
- Verify `data.category` is set on edges
- Check category name matches edgeColors keys
- Default to 'default' if category undefined

---

## 📝 Example: Complete Workflow Edge

```tsx
{
  id: 'checkpoint-to-sampler',
  source: 'checkpoint_node',
  target: 'sampler_node',
  sourceHandle: 'model_output',
  targetHandle: 'model_input',
  type: 'custom',
  data: {
    category: 'model',
    isExecuting: false,
  },
  animated: false, // Let CustomEdge handle animation
}
```

---

## 🚀 Next Steps

- Add edge labels for debugging (already supported on hover)
- Implement edge validation (check compatible port types)
- Add edge context menu (right-click to delete/inspect)
- Create edge presets (save common connection patterns)

---

**Need help?** All code is fully commented and production-ready. Just copy, paste, and customize! 🎉
