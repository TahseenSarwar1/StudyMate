import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function XpPopup() {
  const { showXpPopup, xpGained } = useApp();

  return (
    <AnimatePresence>
      {showXpPopup && (
        <div className="fixed top-24 left-0 right-0 flex justify-center items-center z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-950 font-black shadow-glow-accent border border-yellow-300"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-lg font-display uppercase tracking-wider">+{xpGained} XP Earned!</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
