diff --git a/src/components/Sidebar.tsx b/src/components/Sidebar.tsx
index 146a56f447ef473325222e1a9ec3e2f40d6c0257..e4a374dc0341f1f90830612ede857903cb7c82a5 100644
--- a/src/components/Sidebar.tsx
+++ b/src/components/Sidebar.tsx
@@ -1,99 +1,86 @@
-import { useState } from 'react';
-import { motion, AnimatePresence } from 'motion/react';
-import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
+import { useMemo, useState, type CSSProperties } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
+import { Search, ChevronRight, ChevronLeft, Boxes } from 'lucide-react';
 import { nodeLibrary } from '../nodes/nodeRegistry';
 import { nodeCategories } from '../styles/flow-theme';
 
 export function Sidebar() {
   const [isOpen, setIsOpen] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
 
-  const filteredNodes = nodeLibrary.filter((node) =>
-    node.label.toLowerCase().includes(searchTerm.toLowerCase())
+  const filteredNodes = useMemo(
+    () => nodeLibrary.filter((node) => node.label.toLowerCase().includes(searchTerm.toLowerCase())),
+    [searchTerm]
   );
 
   return (
     <>
-      {/* Toggle button */}
       <motion.button
-        className="fixed left-4 top-20 z-50 p-2 glass rounded-lg"
+        className="sidebar-toggle"
         onClick={() => setIsOpen(!isOpen)}
-        whileHover={{ scale: 1.1 }}
-        whileTap={{ scale: 0.9 }}
+        whileHover={{ scale: 1.05 }}
+        whileTap={{ scale: 0.95 }}
       >
-        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
+        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
       </motion.button>
 
-      {/* Sidebar panel */}
       <AnimatePresence>
         {isOpen && (
           <motion.aside
-            className="fixed left-0 top-16 bottom-0 w-80 glass-strong border-r border-white/10 z-40"
-            initial={{ x: -320 }}
-            animate={{ x: 0 }}
-            exit={{ x: -320 }}
-            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
+            className="sidebar"
+            initial={{ x: -340, opacity: 0 }}
+            animate={{ x: 0, opacity: 1 }}
+            exit={{ x: -340, opacity: 0 }}
+            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
           >
-            <div className="h-full flex flex-col p-4">
-              {/* Search */}
-              <div className="relative mb-4">
-                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
-                <input
-                  type="text"
-                  placeholder="Search nodes..."
-                  value={searchTerm}
-                  onChange={(e) => setSearchTerm(e.target.value)}
-                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-white/30 transition-colors"
-                />
+            <div className="sidebar-header">
+              <div>
+                <h2>Node Library</h2>
+                <p>{filteredNodes.length.toLocaleString()} available nodes</p>
               </div>
+              <Boxes size={16} />
+            </div>
 
-              {/* Node list */}
-              <div className="flex-1 overflow-y-auto space-y-2">
-                {filteredNodes.map((node) => {
-                  const category = nodeCategories[node.category as keyof typeof nodeCategories];
-                  
-                  return (
-                    <motion.div
-                      key={node.type}
-                      className="p-3 rounded-lg cursor-grab active:cursor-grabbing transition-all"
-                      style={{
-                        background: 'rgba(0, 0, 0, 0.3)',
-                        border: `1px solid ${category.borderColor}`,
-                      }}
-                      whileHover={{
-                        scale: 1.02,
-                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
-                        borderColor: category.color,
-                      }}
-                      whileTap={{ scale: 0.98 }}
-                      draggable
-                      onDragStart={(e) => {
-                        e.dataTransfer.setData('application/reactflow', node.type);
-                        e.dataTransfer.effectAllowed = 'move';
-                      }}
-                    >
-                      <div className="flex items-start gap-2">
-                        <div
-                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
-                          style={{ background: category.color }}
-                        />
-                        <div className="flex-1 min-w-0">
-                          <h3 className="font-medium text-sm text-white/90">
-                            {node.label}
-                          </h3>
-                          <p className="text-xs text-white/50 mt-0.5">
-                            {node.description}
-                          </p>
-                        </div>
-                      </div>
-                    </motion.div>
-                  );
-                })}
-              </div>
+            <label className="search-wrap">
+              <Search size={16} />
+              <input
+                type="text"
+                placeholder="Search node name..."
+                value={searchTerm}
+                onChange={(e) => setSearchTerm(e.target.value)}
+              />
+            </label>
+
+            <div className="node-list">
+              {filteredNodes.map((node) => {
+                const category = nodeCategories[node.category as keyof typeof nodeCategories] || nodeCategories.advanced;
+
+                return (
+                  <motion.div
+                    key={`${node.type}-${node.className || node.label}`}
+                    className="node-item"
+                    style={{ '--node-accent': category.color } as CSSProperties}
+                    whileHover={{ y: -1 }}
+                    whileTap={{ scale: 0.99 }}
+                    draggable
+                    onDragStart={(e) => {
+                      e.dataTransfer.setData('application/reactflow', node.type);
+                      e.dataTransfer.setData(
+                        'application/comfy-node',
+                        JSON.stringify({ type: node.type, className: node.className })
+                      );
+                      e.dataTransfer.effectAllowed = 'move';
+                    }}
+                  >
+                    <h3>{node.label}</h3>
+                    <p>{node.description}</p>
+                  </motion.div>
+                );
+              })}
             </div>
           </motion.aside>
         )}
       </AnimatePresence>
     </>
   );
 }
