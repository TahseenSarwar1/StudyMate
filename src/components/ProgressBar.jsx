import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, color = 'bg-primary-500', height = 'md', showLabel = false, animated = true }) {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const percentage = Math.min(Math.max(0, value), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-surface-500">
          <span>Progress</span>
          <span className="font-bold text-surface-700">{percentage}%</span>
        </div>
      )}
      <div className={`w-full ${heightClasses[height]} bg-surface-100 rounded-full overflow-hidden relative`}>
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full ${color} rounded-full relative`}
          >
            <div className="absolute inset-0 bg-white/20 shimmer-bg" style={{ mixBlendMode: 'overlay' }} />
          </motion.div>
        ) : (
          <div
            className={`h-full ${color} rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
