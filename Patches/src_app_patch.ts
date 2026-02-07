diff --git a/src/App.tsx b/src/App.tsx
index 7ac01e9b8a9ad916a02ba451f6b9e8e50cb80c40..86c4996c64b71fd041cfc003c77e2f44d2829b0c 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,17 +1,35 @@
 import { Navbar } from './components/Navbar';
 import { Sidebar } from './components/Sidebar';
 import { Canvas } from './components/Canvas';
 
+function InspectorPanel() {
+  return (
+    <aside className="inspector-panel">
+      <h2>Workflow Inspector</h2>
+      <div className="inspector-card">
+        <p>Drop nodes from the library, then connect ports to build your pipeline.</p>
+      </div>
+      <div className="inspector-card">
+        <h3>Quick Actions</h3>
+        <ul>
+          <li>• Drag nodes from left library</li>
+          <li>• Connect output ➜ input handles</li>
+          <li>• Use “Add all nodes” for full catalog preview</li>
+        </ul>
+      </div>
+    </aside>
+  );
+}
+
 export default function App() {
   return (
-    <div className="w-screen h-screen bg-[#0f0f11] overflow-hidden">
+    <div className="app-shell">
       <Navbar />
       <Sidebar />
-      
-      {/* Main canvas area */}
-      <main className="pt-16 h-screen">
+      <main className="workspace-main">
         <Canvas />
       </main>
+      <InspectorPanel />
     </div>
   );
 }
