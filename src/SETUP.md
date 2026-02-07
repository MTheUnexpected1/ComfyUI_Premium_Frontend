# 🚀 Setup Instructions

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

---

## Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MTheUnexpected2/ComfyUI-Premium-Frontend.git
cd ComfyUI-Premium-Frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install:
- React 18.3 + TypeScript 5.3
- React Flow 11.11 (node editor)
- Framer Motion 11.0 (animations)
- Zustand 4.5 (state management)
- Lucide React (icons)
- Vite 5.1 (build tool)

### 3️⃣ Start Development Server

```bash
npm run dev
```

Opens at: **http://localhost:5173**

---

## 📦 Build for Production

```bash
npm run build
```

Output: `dist/` folder with optimized static files

---

## 🎯 What You'll See

### On First Launch:

1. **Dark Glassmorphic UI**
   - Purple-gradient navbar with "Queue Prompt" button
   - Collapsible sidebar with 40 nodes
   - Search bar for filtering nodes

2. **Demo Workflow (Pre-loaded)**
   - 7 nodes connected in a text-to-image pipeline:
     - Checkpoint Loader
     - CLIP Text Encode (positive)
     - CLIP Text Encode (negative)
     - Empty Latent Image
     - KSampler
     - VAE Decode
     - Save Image

3. **Interactive Features**
   - Hover nodes → connected edges highlight
   - Drag nodes around canvas
   - Create connections (drag output port → input port)
   - Delete connections (select edge, press Delete)
   - Zoom (mouse wheel) and pan (drag background)
   - MiniMap in bottom right

---

## 🎨 Visual Features

### Connection System
- **Crystal-clear ports** - 16px (22px on hover)
- **Thick lines** - 4.5px (6.5px when highlighted)
- **Category colors**:
  - 🔵 Blue = MODEL
  - 🟠 Amber = CONDITIONING/CLIP
  - 🟣 Purple = LATENT
  - 🟢 Emerald = IMAGE
  - 🟣 Violet = VAE
  - And 7 more types

### Node Design
- **Glassmorphic cards** with blur and transparency
- **Category theming** - 5 distinct color schemes
- **Smooth animations** - Framer Motion powered
- **Large visible ports** - Easy to connect

---

## 🧪 Current Capabilities

### ✅ What Works
- ✅ View demo workflow
- ✅ Drag nodes around
- ✅ Create/delete connections
- ✅ Search 40 nodes in sidebar
- ✅ Zoom/pan canvas
- ✅ Node hover highlighting
- ✅ Visual feedback on all interactions

### ❌ What's Missing (In Development)
- ❌ Add nodes from sidebar (can't drag to canvas yet)
- ❌ Configure node parameters (no widgets/controls)
- ❌ Execute workflows (no backend connection)
- ❌ Save/load workflows
- ❌ Delete nodes
- ❌ 3000 node library (currently 40 hardcoded)

**See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed roadmap**

---

## 🔧 Development

### File Structure

```
src/
├── App.tsx                 # Main application wrapper
├── main.tsx                # React entry point
├── components/
│   ├── Canvas.tsx          # React Flow workspace
│   ├── Navbar.tsx          # Top navigation
│   ├── Sidebar.tsx         # Node palette
│   └── ThemeToggle.tsx     # Theme switcher
├── edges/
│   ├── CustomEdge.tsx      # Custom edge rendering
│   └── EdgeFilters.tsx     # SVG filters for glows
├── nodes/
│   ├── BaseNode.tsx        # Base node component
│   ├── ComfyNodes.tsx      # 40+ node definitions
│   └── nodeRegistry.ts     # Node type registry
├── stores/
│   ├── themeStore.ts       # Theme state (Zustand)
│   └── workflowStore.ts    # Workflow state
├── styles/
│   ├── flow-theme.ts       # Colors & categories
│   └── globals.css         # Global styles
└── utils/
    └── edgeUtils.ts        # Edge helpers
```

### Hot Module Replacement (HMR)

Changes to `.tsx` files automatically reload in the browser without losing state.

---

## 🐛 Troubleshooting

### Port 5173 already in use

```bash
# Kill the process using port 5173
npx kill-port 5173

# Then restart
npm run dev
```

### Dependencies won't install

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Restart TypeScript server in VSCode
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Blank screen on load

1. Open browser console (F12)
2. Check for errors
3. Verify `/src/main.tsx` imports `/src/App.tsx` correctly
4. Ensure `index.html` points to `/src/main.tsx`

---

## 📚 Additional Resources

- **[README.md](./README.md)** - Project overview
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Detailed status & roadmap
- **[CRYSTAL_CLEAR_CONNECTIONS.md](./CRYSTAL_CLEAR_CONNECTIONS.md)** - Port system guide
- **[EDGE_SYSTEM_README.md](./EDGE_SYSTEM_README.md)** - Edge rendering details
- **[SMOOTH_EDGES_GUIDE.md](./SMOOTH_EDGES_GUIDE.md)** - Curve customization

---

## 🤝 Contributing

See [guidelines/Guidelines.md](./guidelines/Guidelines.md) for development practices.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙋 Support

- **Issues:** [GitHub Issues](https://github.com/MTheUnexpected2/ComfyUI-Premium-Frontend/issues)
- **Discussions:** [GitHub Discussions](https://github.com/MTheUnexpected2/ComfyUI-Premium-Frontend/discussions)

---

**Ready to build the future of ComfyUI! 🚀**
