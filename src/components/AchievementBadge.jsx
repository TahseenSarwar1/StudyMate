import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AchievementBadge({ name, icon, description, earned, date }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 w-36 ${
        earned
          ? 'bg-white shadow-card border-primary-100 hover:shadow-card-hover'
          : 'bg-surface-50/50 border-surface-100 text-surface-400 opacity-60'
      }`}
    >
      {/* Icon Circle */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 relative ${
          earned
            ? 'bg-gradient-to-tr from-primary-50 to-primary-100/50 border border-primary-200'
            : 'bg-surface-100 border border-surface-200'
        }`}
      >
        <span>{icon}</span>
        {!earned && (
          <div className="absolute -bottom-1 -right-1 bg-surface-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
            <Lock className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Badge Name */}
      <h4 className={`text-xs font-black truncate w-full ${earned ? 'text-surface-850' : 'text-surface-500'}`}>
        {name}
      </h4>

      {/* Hover Description Tooltip */}
      <p className="text-[10px] text-surface-400 mt-1 font-medium leading-snug line-clamp-2">
        {description}
      </p>

      {/* Date Earned */}
      {earned && date && (
        <span className="text-[8px] font-bold uppercase tracking-wider text-primary-500 bg-primary-50 px-1.5 py-0.5 rounded-full mt-2">
          {new Date(date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
        </span>
      )}
    </motion.div>
  );
}
