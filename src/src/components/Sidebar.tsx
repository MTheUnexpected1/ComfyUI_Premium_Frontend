import { useMemo, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, ChevronLeft, Boxes } from 'lucide-react';
import { nodeLibrary } from '../nodes/nodeRegistry';
import { nodeCategories } from '../styles/flow-theme';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNodes = useMemo(
    () => nodeLibrary.filter((node) => node.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  return (
    <>
      <motion.button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: -340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -340, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="sidebar-header">
              <div>
                <h2>Node Library</h2>
                <p>{filteredNodes.length.toLocaleString()} available nodes</p>
              </div>
              <Boxes size={16} />
            </div>

            <label className="search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search node name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <div className="node-list">
              {filteredNodes.map((node) => {
                const category = nodeCategories[node.category as keyof typeof nodeCategories] || nodeCategories.advanced;

                return (
                  <motion.div
                    key={`${node.type}-${node.className || node.label}`}
                    className="node-item"
                    style={{ '--node-accent': category.color } as CSSProperties}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', node.type);
                      e.dataTransfer.setData(
                        'application/comfy-node',
                        JSON.stringify({ type: node.type, className: node.className })
                      );
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                  >
                    <h3>{node.label}</h3>
                    <p>{node.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
