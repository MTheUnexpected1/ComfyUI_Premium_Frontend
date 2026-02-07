import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

// Premium animated theme toggle - smooth spring physics
export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full glass-strong flex items-center px-1 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sliding toggle background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Sliding circle */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
        initial={false}
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-purple-600" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
