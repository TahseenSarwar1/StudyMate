import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, BookOpen, Trophy, AlertTriangle, Calendar, Flame, User } from 'lucide-react';

export default function Sidebar() {
  const { user } = useApp();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Weak Topics', path: '/weak-topics', icon: AlertTriangle },
    { name: 'Revision Planner', path: '/revision', icon: Calendar },
    { name: 'Streak & Rewards', path: '/streak', icon: Flame },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-surface-100 min-h-[calc(100vh-5rem)] sticky top-20 p-4">
      <div className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white shadow-glow-primary'
                    : 'text-surface-600 hover:text-primary-600 hover:bg-surface-50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Mini Profile at bottom */}
      <div className="border-t border-surface-100 pt-4 mt-auto">
        <div className="flex items-center space-x-3 p-2 bg-surface-50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            {user.avatar || user.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-surface-800 truncate leading-tight">{user.name}</p>
            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-wider mt-0.5">Level {user.level} Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
