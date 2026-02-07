# 📂 Complete File Guide - What Every File Does

## 🎯 Quick Navigation

- **[Want to push to GitHub?](#-github-push-files)** → Start with `START_HERE.md`
- **[Want to run the app?](#-application-files)** → Start with `SETUP.md`
- **[Want to understand the project?](#-documentation-files)** → Start with `README.md`
- **[Want to develop features?](#-development-files)** → Start with `PROJECT_STATUS.md`

---

## 🚀 GitHub Push Files

**START HERE if you want to push to GitHub!**

| File | Purpose | When to Use |
|------|---------|-------------|
| **📍 START_HERE.md** | ⭐ **Your starting point!** Quick 3-minute push guide | **Read this first!** |
| **QUICK_START.sh** | Automated push script for Mac/Linux | Run this to auto-push |
| **QUICK_START.bat** | Automated push script for Windows | Run this to auto-push |
| **README_NEW_REPO.md** | Complete overview of what's ready | Understand what you're pushing |
| **REPOSITORY_READY.md** | Detailed readiness checklist | Verify before pushing |
| **GITHUB_SETUP.md** | Step-by-step GitHub guide with screenshots | Need detailed instructions |
| **FILE_GUIDE.md** | This file - explains every file | You're reading it! |

### 🎯 Recommended Flow:
```
START_HERE.md → Run QUICK_START.sh → Done! 🎉
```

---

## 📱 Application Files

**These are the actual working app!**

### Core Application (`/src/`)

| File | Purpose |
|------|---------|
| **src/main.tsx** | React entry point - renders App.tsx |
| **src/App.tsx** | Main application wrapper - navbar + sidebar + canvas |

### Components (`/src/components/`)

| File | Purpose |
|------|---------|
| **Canvas.tsx** | React Flow workspace with demo workflow |
| **Navbar.tsx** | Top navigation bar with "Queue Prompt" button |
| **Sidebar.tsx** | Collapsible node palette with 40 nodes |
| **ThemeToggle.tsx** | Light/dark theme switcher |

### Edges (`/src/edges/`)

| File | Purpose |
|------|---------|
| **CustomEdge.tsx** | Crystal-clear connection rendering (4.5px thick) |
| **EdgeFilters.tsx** | SVG filters for glows and effects |

### Nodes (`/src/nodes/`)

| File | Purpose |
|------|---------|
| **BaseNode.tsx** | Base node component with 16px ports |
| **ComfyNodes.tsx** | 40+ node definitions (Loaders, Sampling, etc.) |
| **nodeRegistry.ts** | Node type registry for React Flow |

### Stores (`/src/stores/`)

| File | Purpose |
|------|---------|
| **themeStore.ts** | Zustand store for theme state |
| **workflowStore.ts** | Zustand store for workflow state |

### Styles (`/src/styles/`)

| File | Purpose |
|------|---------|
| **flow-theme.ts** | Category colors and port types |
| **globals.css** | Global CSS + port hover styles |

### Utils (`/src/utils/`)

| File | Purpose |
|------|---------|
| **edgeUtils.ts** | Helper functions for edge calculations |

---

## ⚙️ Configuration Files

**Build and environment setup**

| File | Purpose | Modify? |
|------|---------|---------|
| **package.json** | Dependencies and scripts | ✅ Yes (add packages) |
| **vite.config.ts** | Vite build configuration | ✅ Yes (build settings) |
| **tsconfig.json** | TypeScript configuration | ✅ Yes (TS settings) |
| **tsconfig.node.json** | TypeScript for Vite config | ❌ Rarely |
| **.gitignore** | Files to exclude from Git | ✅ Yes (add exclusions) |
| **LICENSE** | MIT License | ❌ No |
| **index.html** | HTML entry point | ❌ Rarely |

---

## 📚 Documentation Files

**Learn about the project**

### Getting Started

| File | Purpose | Read When |
|------|---------|-----------|
| **README.md** | Main project overview | ⭐ **First thing to read** |
| **SETUP.md** | Installation & quick start guide | Installing for first time |
| **START_HERE.md** | Quick 3-minute push guide | Ready to push to GitHub |

### Status & Planning

| File | Purpose | Read When |
|------|---------|-----------|
| **PROJECT_STATUS.md** | Detailed status (25% complete) | Want to understand progress |
| **REPOSITORY_READY.md** | What's ready for GitHub | Before pushing |
| **README_NEW_REPO.md** | New repo summary | After creating repo files |

### GitHub Instructions

| File | Purpose | Read When |
|------|---------|-----------|
| **GITHUB_SETUP.md** | Complete GitHub guide | Need step-by-step instructions |
| **FILE_GUIDE.md** | This file! | Want to understand all files |

### Technical Deep Dives

| File | Purpose | Read When |
|------|---------|-----------|
| **CRYSTAL_CLEAR_CONNECTIONS.md** | Port system documentation | Working on connections |
| **EDGE_SYSTEM_README.md** | Edge rendering guide | Working on edges |
| **SMOOTH_EDGES_GUIDE.md** | Curve customization | Adjusting edge curves |
| **Attributions.md** | Credits & acknowledgments | Checking dependencies |

### Guidelines

| File | Purpose | Read When |
|------|---------|-----------|
| **guidelines/Guidelines.md** | Development best practices | Contributing to project |

---

## 🔧 Development Files

**Old/Legacy Files (Not Currently Used)**

| File | Status | Note |
|------|--------|------|
| **/App.tsx** (root) | ❌ Old | Previous "Priya AI" workflow - NOT USED |
| **/components/** (root) | ❌ Old | Old custom canvas components - NOT USED |
| **/styles/globals.css** (root) | ❌ Duplicate | Real one is `/src/styles/globals.css` |

**The working app is in `/src/` directory!**

---

## 📊 File Organization Chart

```
ComfyUI-Premium-Frontend/
│
├── 📍 START HERE ──────────────────────────────
│   ├── START_HERE.md           ⭐ Your entry point
│   ├── README.md               ⭐ Project overview
│   └── SETUP.md                ⭐ Quick start
│
├── 🚀 GITHUB PUSH ─────────────────────────────
│   ├── QUICK_START.sh          Automated (Mac/Linux)
│   ├── QUICK_START.bat         Automated (Windows)
│   ├── GITHUB_SETUP.md         Detailed guide
│   ├── REPOSITORY_READY.md     Readiness check
│   └── README_NEW_REPO.md      What's ready
│
├── 💻 APPLICATION ─────────────────────────────
│   ├── index.html              Entry point
│   └── src/                    ← ALL working code here!
│       ├── App.tsx
│       ├── main.tsx
│       ├── components/
│       ├── edges/
│       ├── nodes/
│       ├── stores/
│       ├── styles/
│       └── utils/
│
├── ⚙️ CONFIG ──────────────────────────────────
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .gitignore
│   └── LICENSE
│
├── 📚 DOCS ────────────────────────────────────
│   ├── PROJECT_STATUS.md       Status report
│   ├── FILE_GUIDE.md           This file
│   ├── CRYSTAL_CLEAR_*.md      Tech guides
│   ├── EDGE_SYSTEM_*.md
│   ├── SMOOTH_EDGES_*.md
│   ├── Attributions.md
│   └── guidelines/
│
└── ❌ OLD/UNUSED ──────────────────────────────
    ├── App.tsx (root)          Previous project
    ├── components/ (root)      Old components
    └── styles/globals.css      Duplicate
```

---

## 🎯 Common Use Cases

### "I want to push to GitHub"
```
1. Read: START_HERE.md
2. Run: ./QUICK_START.sh (or .bat)
3. Done!
```

### "I want to run the app locally"
```
1. Read: SETUP.md
2. Run: npm install && npm run dev
3. Visit: http://localhost:5173
```

### "I want to understand what's done"
```
1. Read: README.md
2. Read: PROJECT_STATUS.md
3. Check: /src/ directory
```

### "I want to develop new features"
```
1. Read: PROJECT_STATUS.md (see roadmap)
2. Read: guidelines/Guidelines.md
3. Edit: /src/ files
```

### "I want to fix connections/edges"
```
1. Read: CRYSTAL_CLEAR_CONNECTIONS.md
2. Read: EDGE_SYSTEM_README.md
3. Edit: /src/edges/CustomEdge.tsx
```

### "I want to add new nodes"
```
1. Read: /src/nodes/ComfyNodes.tsx (examples)
2. Add node definition
3. Register in nodeRegistry.ts
```

---

## 📏 File Size Overview

| Category | File Count | Total Size |
|----------|------------|------------|
| **Application Code** | ~15 files | ~50 KB |
| **Configuration** | 5 files | ~2 KB |
| **Documentation** | 15 files | ~150 KB |
| **Scripts** | 2 files | ~10 KB |
| **Total** | ~37 files | ~212 KB |

*(Excluding node_modules and build artifacts)*

---

## 🔍 File Dependencies

### What Depends on What?

```
index.html
  └── src/main.tsx
      └── src/App.tsx
          ├── src/components/Navbar.tsx
          ├── src/components/Sidebar.tsx
          │   └── src/nodes/nodeRegistry.ts
          │       └── src/nodes/ComfyNodes.tsx
          │           └── src/nodes/BaseNode.tsx
          └── src/components/Canvas.tsx
              ├── src/edges/CustomEdge.tsx
              ├── src/edges/EdgeFilters.tsx
              └── src/nodes/nodeRegistry.ts

src/styles/globals.css (imported in main.tsx)
src/stores/* (imported where needed)
```

---

## 🎨 Where to Edit for Common Tasks

### Change Node Appearance
```
/src/nodes/BaseNode.tsx         Port styles, layout
/src/styles/flow-theme.ts       Colors, themes
/src/styles/globals.css         CSS overrides
```

### Change Connection Appearance
```
/src/edges/CustomEdge.tsx       Edge rendering
/src/edges/EdgeFilters.tsx      SVG effects
/src/styles/globals.css         Edge CSS
```

### Add New Node Types
```
/src/nodes/ComfyNodes.tsx       Define node component
/src/nodes/nodeRegistry.ts      Register node type
/src/styles/flow-theme.ts       Add port types if needed
```

### Change UI Layout
```
/src/App.tsx                    Main layout
/src/components/Navbar.tsx      Top bar
/src/components/Sidebar.tsx     Left panel
/src/components/Canvas.tsx      Main workspace
```

### Change Build Settings
```
vite.config.ts                  Build configuration
tsconfig.json                   TypeScript settings
package.json                    Dependencies, scripts
```

---

## ⚠️ Files NOT to Edit

These are auto-generated or protected:

```
❌ node_modules/              (auto-installed)
❌ dist/                      (auto-built)
❌ .git/                      (auto-managed)
❌ package-lock.json          (auto-generated)
❌ LICENSE                    (legal file)
```

---

## ✅ Files Safe to Delete

If you want to clean up:

```
✅ /App.tsx (root)                Old project
✅ /components/ (root)            Old components  
✅ /styles/globals.css (root)     Duplicate
✅ QUICK_START.sh                 After pushing
✅ QUICK_START.bat                After pushing
✅ README_NEW_REPO.md             After pushing
✅ REPOSITORY_READY.md            After pushing
✅ START_HERE.md                  After pushing
✅ FILE_GUIDE.md                  After reading this!
```

**Keep everything in `/src/` and config files!**

---

## 🎯 Priority Reading Order

### If You Have 5 Minutes:
1. **START_HERE.md** (3 min)
2. **README.md** (2 min)

### If You Have 15 Minutes:
1. START_HERE.md (3 min)
2. README.md (5 min)
3. SETUP.md (3 min)
4. PROJECT_STATUS.md (4 min)

### If You Have 30 Minutes:
1. All above (15 min)
2. GITHUB_SETUP.md (5 min)
3. CRYSTAL_CLEAR_CONNECTIONS.md (5 min)
4. Browse /src/ files (5 min)

---

## 🚀 Ready to Start?

### Quickest Path to Success:

1. **Read:** [START_HERE.md](./START_HERE.md) (3 minutes)
2. **Run:** `./QUICK_START.sh` or `QUICK_START.bat`
3. **Done!** Your repo is on GitHub! 🎉

---

## 📞 Still Confused?

**Start with these 3 files in order:**

1. **[START_HERE.md](./START_HERE.md)** - What to do right now
2. **[README.md](./README.md)** - What this project is
3. **[SETUP.md](./SETUP.md)** - How to run it locally

**That's all you need to get started!**

---

**Last Updated:** February 7, 2026  
**Total Files:** 37  
**Status:** Production-Ready ✅

**Now go push to GitHub! 🚀**
