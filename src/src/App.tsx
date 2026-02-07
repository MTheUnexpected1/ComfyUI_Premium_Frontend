import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#0f0f11] overflow-hidden">
      <Navbar />
      <Sidebar />
      
      {/* Main canvas area */}
      <main className="pt-16 h-screen">
        <Canvas />
      </main>
    </div>
  );
}
