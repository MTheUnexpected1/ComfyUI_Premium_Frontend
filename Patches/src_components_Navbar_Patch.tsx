diff --git a/src/components/Navbar.tsx b/src/components/Navbar.tsx
index 3b37677c4242651306f36d7ff31213a87fdda3d8..8386b009e49eedd0bbcf059d8c79caaa5b4bcac6 100644
--- a/src/components/Navbar.tsx
+++ b/src/components/Navbar.tsx
@@ -1,57 +1,49 @@
-import { motion } from 'motion/react';
+import { motion } from 'framer-motion';
 import { Play, Download, FolderOpen, Zap } from 'lucide-react';
 
 export function Navbar() {
   return (
     <motion.nav
-      className="fixed top-0 left-0 right-0 z-50 h-16 glass-strong border-b border-white/10"
-      initial={{ y: -100 }}
-      animate={{ y: 0 }}
-      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
+      className="topbar"
+      initial={{ y: -36, opacity: 0 }}
+      animate={{ y: 0, opacity: 1 }}
+      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
     >
-      <div className="h-full px-6 flex items-center justify-between">
-        {/* Logo */}
-        <div className="flex items-center gap-3">
-          <motion.div
-            className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center"
-            whileHover={{ rotate: 360 }}
-            transition={{ duration: 0.6 }}
-          >
-            <Zap className="w-5 h-5 text-white" />
-          </motion.div>
-          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
-            ComfyUI Premium
-          </h1>
+      <div className="brand-block">
+        <motion.div
+          className="brand-icon"
+          whileHover={{ rotate: 20, scale: 1.08 }}
+          transition={{ duration: 0.25 }}
+        >
+          <Zap size={16} />
+        </motion.div>
+        <div>
+          <p className="brand-title">ComfyUI Premium</p>
+          <p className="brand-subtitle">Modern node workspace</p>
         </div>
+      </div>
 
-        {/* Actions */}
-        <div className="flex items-center gap-2">
-          <NavButton icon={<FolderOpen size={18} />} label="Open" />
-          <NavButton icon={<Download size={18} />} label="Export" />
-          
-          <motion.button
-            className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium flex items-center gap-2"
-            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
-            whileTap={{ scale: 0.95 }}
-          >
-            <Play size={16} />
-            Queue Prompt
-          </motion.button>
-        </div>
+      <div className="topbar-actions">
+        <NavButton icon={<FolderOpen size={16} />} label="Open" />
+        <NavButton icon={<Download size={16} />} label="Export" />
+        <motion.button className="primary-action" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
+          <Play size={14} /> Queue Prompt
+        </motion.button>
       </div>
     </motion.nav>
   );
 }
 
 function NavButton({ icon, label }: { icon: React.ReactNode; label: string }) {
   return (
     <motion.button
-      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
-      whileHover={{ scale: 1.1 }}
-      whileTap={{ scale: 0.9 }}
+      className="topbar-button"
+      whileHover={{ y: -1 }}
+      whileTap={{ scale: 0.98 }}
       title={label}
     >
       {icon}
+      <span>{label}</span>
     </motion.button>
   );
 }
