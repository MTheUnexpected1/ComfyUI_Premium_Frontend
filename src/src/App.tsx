import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';

function InspectorPanel() {
  return (
    <aside className="inspector-panel">
      <h2>Workflow Inspector</h2>
      <div className="inspector-card">
        <p>Drop nodes from the library, then connect ports to build your pipeline.</p>
      </div>
      <div className="inspector-card">
        <h3>Quick Actions</h3>
        <ul>
          <li>• Drag nodes from left library</li>
          <li>• Connect output ➜ input handles</li>
          <li>• Use “Add all nodes” for full catalog preview</li>
        </ul>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Sidebar />
      <main className="workspace-main">
        <Canvas />
      </main>
      <InspectorPanel />
    </div>
  );
}
