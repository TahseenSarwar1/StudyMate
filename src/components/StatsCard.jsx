import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatsCard({ title, value, icon: Icon, trend = 'same', trendValue = '', color = 'text-primary-600', subtitle = '' }) {
  const trendConfig = {
    up: {
      color: 'bg-success-50 text-success-600',
      icon: ArrowUpRight,
    },
    down: {
      color: 'bg-danger-50 text-danger-600',
      icon: ArrowDownRight,
    },
    same: {
      color: 'bg-surface-50 text-surface-400',
      icon: Minus,
    },
  };

  const TrendIcon = trendConfig[trend].icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 relative overflow-hidden card-hover"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-surface-800 mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-surface-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-surface-50 ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(trendValue || trend !== 'same') && (
        <div className="flex items-center space-x-1.5 mt-4">
          <span className={`flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-black ${trendConfig[trend].color}`}>
            <TrendIcon className="w-3 h-3 mr-0.5" />
            {trendValue || (trend === 'up' ? 'Increase' : trend === 'down' ? 'Decrease' : 'Stable')}
          </span>
          <span className="text-[10px] font-bold text-surface-400">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}
