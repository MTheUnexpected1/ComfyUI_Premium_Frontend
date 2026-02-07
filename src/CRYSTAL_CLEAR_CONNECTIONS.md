# Crystal-Clear Port-to-Port Connections - Complete Guide

## 🎯 Overview

This system creates **crystal-clear, center-to-center connections** with maximum visibility and traceability - similar to professional node editors like Unreal Blueprints and Houdini.

---

## ✨ Key Features (Priority Order)

### 1. **Extremely Clear Port Attachment** ✅
- Lines connect **exactly center-to-center** of port circles
- Ports are **LARGE** (16px base, 22px on hover)
- **Strong multi-layer glow** on hover (3 blur layers)
- Precise positioning (`left: -8` / `right: -8` for perfect centering)
- **No approximation** - real geometric center connection

### 2. **Easy Line Tracing** ✅
- **Strong edge highlighting** when hovering nodes (6.5px thick + bright glow)
- Edges are already **thick** (4.5px base, 6.5px highlighted)
- **Category-based colors** with strong differentiation
- Hover label shows connection type

### 3. **Smooth Curved Paths** ✅
- Generous smoothstep curves (`borderRadius: 56`, `offset: 32`)
- **Allows detours** for better readability over shortest path
- No straight lines (except very short connections)

### 4. **Strong Node Hover Highlighting** ✅
- Hovering a node **brightens + thickens** all connected edges
- Uses `isHighlighted` flag for instant visual feedback
- Connected edges get 6.5px width + strong glow filter

---

## 🎨 Port System

### Port Specifications

| State | Size | Border | Visual Effect |
|-------|------|--------|---------------|
| **Normal** | 16px | 3px solid | Subtle presence |
| **Hover** | 22px | 4px solid | Triple-layer glow |
| **Connecting** | 20px | 4px dashed | Pulsing animation |
| **Valid target** | 20px | Green | Green glow + pulse |
| **Invalid target** | 20px | Red | Red glow + shake |

### Port Positioning (Critical for Center-to-Center)

```tsx
// INPUT PORT (left side)
<Handle
  type="target"
  position={Position.Left}
  style={{
    left: -8,  // Exactly centers 16px port
    top: '50%',
    width: '16px',
    height: '16px',
  }}
/>

// OUTPUT PORT (right side)
<Handle
  type="source"
  position={Position.Right}
  style={{
    right: -8,  // Exactly centers 16px port
    top: '50%',
    width: '16px',
    height: '16px',
  }}
/>
```

**Why `-8px`?**
- Port is 16px wide
- Half of 16px = 8px
- Offset by -8px centers the port on the node edge
- Edge connects to port center automatically

### Port Hover Effect

```css
.port-handle:hover {
  width: 22px !important;
  height: 22px !important;
  transform: scale(1.2);
  box-shadow: 
    0 0 20px currentColor,      /* Inner glow */
    0 0 12px currentColor,      /* Mid glow */
    0 0 6px currentColor,       /* Outer glow */
    0 0 30px rgba(255, 255, 255, 0.3); /* White halo */
}
```

---

## 🌊 Edge System

### Edge Specifications

| State | Width | Glow | Filter |
|-------|-------|------|--------|
| **Normal** | 4.5px | Subtle (4.5px blur) | `edge-glow-normal` |
| **Highlighted** | 6.5px | Strong (6px double blur) | `edge-glow-strong` |
| **Selected** | 6.5px | Strong | `edge-crisp` |
| **Hovered** | 6.5px | Strong | `edge-glow-strong` |

### Path Configuration (Smooth Curves)

```tsx
getSmoothStepPath({
  sourceX, sourceY, sourcePosition,
  targetX, targetY, targetPosition,
  borderRadius: 56,  // Very generous curves
  offset: 32,        // Allows detours
});
```

**Tuning guide:**
- `borderRadius: 56` - Default, smooth flowing
- `borderRadius: 72` - More flowing, wider curves
- `borderRadius: 40` - Tighter curves
- `offset: 32` - Default routing space
- `offset: 48` - More detours, better overlap avoidance

---

## 🎨 Category Colors

| Category | Main Color | Glow Color | Use Case |
|----------|-----------|------------|----------|
| `MODEL` | #3b82f6 | #93c5fd | Models, Checkpoints |
| `CONDITIONING` | #f59e0b | #fcd34d | Conditioning |
| `CLIP` | #f59e0b | #fcd34d | CLIP Text Encode |
| `LATENT` | #a855f7 | #d8b4fe | Latent Space |
| `IMAGE` | #10b981 | #6ee7b7 | Images |
| `VAE` | #8b5cf6 | #c4b5fd | VAE |
| `VIDEO` | #ec4899 | #f9a8d4 | Video |
| `AUDIO` | #06b6d4 | #67e8f9 | Audio |
| `CONTROL_NET` | #ef4444 | #fca5a5 | ControlNet |
| `INT` | #6b7280 | #9ca3af | Integer |
| `FLOAT` | #6b7280 | #9ca3af | Float |
| `STRING` | #9ca3af | #d1d5db | String |

---

## 🚀 Node Hover → Edge Highlighting

### How It Works

1. User hovers over a node
2. `onNodeMouseEnter` fires
3. All edges are checked: is `edge.source` or `edge.target` the hovered node?
4. Matching edges get `data.isHighlighted = true`
5. CustomEdge renders with:
   - 6.5px width (vs 4.5px normal)
   - `edge-glow-strong` filter (double blur)
   - Full opacity (1.0)
   - `edge-crisp` filter for extra pop

### Implementation

```tsx
const onNodeMouseEnter = useCallback((event, node) => {
  setEdges((eds) =>
    eds.map((edge) => ({
      ...edge,
      data: {
        ...edge.data,
        isHighlighted: edge.source === node.id || edge.target === node.id,
      },
    }))
  );
}, [setEdges]);

const onNodeMouseLeave = useCallback(() => {
  setEdges((eds) =>
    eds.map((edge) => ({
      ...edge,
      data: { ...edge.data, isHighlighted: false },
    }))
  );
}, [setEdges]);
```

---

## 💫 Execution Animation

Show flowing animation when node is processing:

```tsx
// Start animation
setEdges(edges.map(edge => 
  edge.id === 'e5-6'
    ? { ...edge, data: { ...edge.data, isExecuting: true } }
    : edge
));
```

**What happens:**
- Flowing dashed line (18px dash, 10px gap)
- Primary orb (7px, pulsing 5-8px)
- Secondary orb (4px, 0.5s delay)
- Both orbs travel along the path
- Strong glow filter on orbs

---

## 🔧 Integration

### 1. Import Components

```tsx
import { CustomEdge } from '../edges/CustomEdge';
import { EdgeFilters } from '../edges/EdgeFilters';

const edgeTypes = { custom: CustomEdge };
```

### 2. Render EdgeFilters

```tsx
<div className="w-full h-full">
  <EdgeFilters />  {/* BEFORE ReactFlow */}
  <ReactFlow edgeTypes={edgeTypes} {...props} />
</div>
```

### 3. Add Node Hover Handlers

```tsx
<ReactFlow
  onNodeMouseEnter={onNodeMouseEnter}
  onNodeMouseLeave={onNodeMouseLeave}
  // ... other props
/>
```

### 4. Set Edge Data

```tsx
const edge = {
  id: 'e1',
  source: 'node1',
  target: 'node2',
  type: 'custom',
  data: { 
    category: 'LATENT',      // Required
    isExecuting: false,      // Optional
    isHighlighted: false,    // Set by hover handler
  },
};
```

---

## 📐 Precise Port Centering Math

### The Math Behind Center-to-Center

```
Port diameter: 16px
Port radius: 8px
Node border: 1.5px

To center the port ON the node edge:
- Position: -8px (negative radius)
- This places port center exactly at x=0 (node edge)
- Edge connects from/to this exact point

Visual:
Node ─────────┤◉├───── Edge
         ^    ^
         |    Port center (x=0)
         Port edge (x=-8)
```

### If You Change Port Size

```tsx
// For 18px ports:
left: -9,   // 18 / 2 = 9
right: -9,

// For 20px ports:
left: -10,  // 20 / 2 = 10
right: -10,

// For 14px ports:
left: -7,   // 14 / 2 = 7
right: -7,
```

**Formula:** `offset = -(portDiameter / 2)`

---

## 🎯 Customization

### Make Ports Even Larger

```tsx
// In BaseNode.tsx
style={{
  width: '20px',    // Up from 16px
  height: '20px',
  left: -10,        // Half of 20px
}}
```

```css
/* In globals.css */
.port-handle:hover {
  width: 26px !important;   /* Up from 22px */
  height: 26px !important;
}
```

### Stronger Edge Highlighting

```tsx
// In CustomEdge.tsx
const strokeWidth = isHighlighted ? 8 : 4.5;  // Even thicker
const glowWidth = strokeWidth + 14;           // More glow
```

### More Flowing Curves

```tsx
getSmoothStepPath({
  borderRadius: 72,  // More generous
  offset: 48,        // Wider detours
});
```

### Change Glow Intensity

```tsx
// In EdgeFilters.tsx
<feGaussianBlur stdDeviation="8" />  // Stronger (default: 6)
```

---

## 🐛 Troubleshooting

**Edges don't connect to port centers?**
- Check port positioning: `left: -8` or `right: -8`
- Verify port size is 16px
- Ensure Handle has `position={Position.Left}` or `Position.Right`

**Ports not visible enough?**
- Increase base size to 18px or 20px
- Adjust hover size to 24px or 26px
- Strengthen glow: add more box-shadow layers

**Node hover highlighting not working?**
- Verify `onNodeMouseEnter` and `onNodeMouseLeave` are connected
- Check edge data has `isHighlighted` field
- Ensure CustomEdge reads `data?.isHighlighted`

**Curves too tight?**
- Increase `borderRadius` to 64 or 72
- Increase `offset` to 40 or 48

**Performance issues?**
- Reduce blur `stdDeviation` in filters (6 → 4)
- Disable animations on mobile
- Use fewer box-shadow layers on port hover

---

## 📊 Visual Comparison

### Before
- Tiny ports (8px) - hard to see
- Thin edges (2px) - hard to trace
- No hover highlighting
- Straight/tight curves
- Weak visual feedback

### After
- **Large ports** (16px → 22px hover) - crystal clear
- **Thick edges** (4.5px → 6.5px highlighted) - easy to trace
- **Strong node hover highlighting** - instant feedback
- **Smooth flowing curves** - natural routing
- **Multi-layer glows** - professional depth

---

## 🎉 You're Done!

Your connection system now has:

✅ **Crystal-clear port attachment** (exact center-to-center)  
✅ **Large, visible ports** (16-22px)  
✅ **Strong edge highlighting** on node hover  
✅ **Smooth flowing curves** with generous routing  
✅ **Category-based colors** (12 types)  
✅ **Professional appearance** (like Unreal/Houdini)  

Everything is production-ready and optimized for complex workflows! 🚀
