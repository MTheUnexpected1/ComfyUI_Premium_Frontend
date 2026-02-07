import { motion } from 'motion/react';
import { Play, Download, FolderOpen, Zap } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-16 glass-strong border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-5 h-5 text-white" />
          </motion.div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ComfyUI Premium
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <NavButton icon={<FolderOpen size={18} />} label="Open" />
          <NavButton icon={<Download size={18} />} label="Export" />
          
          <motion.button
            className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={16} />
            Queue Prompt
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

function NavButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={label}
    >
      {icon}
    </motion.button>
  );
}
