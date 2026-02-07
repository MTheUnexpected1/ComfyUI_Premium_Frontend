import { motion } from 'framer-motion';
import { Play, Download, FolderOpen, Zap } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav
      className="topbar"
      initial={{ y: -36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
    >
      <div className="brand-block">
        <motion.div
          className="brand-icon"
          whileHover={{ rotate: 20, scale: 1.08 }}
          transition={{ duration: 0.25 }}
        >
          <Zap size={16} />
        </motion.div>
        <div>
          <p className="brand-title">ComfyUI Premium</p>
          <p className="brand-subtitle">Modern node workspace</p>
        </div>
      </div>

      <div className="topbar-actions">
        <NavButton icon={<FolderOpen size={16} />} label="Open" />
        <NavButton icon={<Download size={16} />} label="Export" />
        <motion.button className="primary-action" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          <Play size={14} /> Queue Prompt
        </motion.button>
      </div>
    </motion.nav>
  );
}

function NavButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      className="topbar-button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      title={label}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
