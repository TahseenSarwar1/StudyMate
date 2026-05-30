import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Flame, Shield, Award, LogOut, User, LayoutDashboard, BookOpen, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        isScrolled || setIsScrolled(true);
      } else {
        isScrolled && setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-glass border-b border-surface-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-black font-display gradient-text">
              StudyMate
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold text-primary-700 bg-primary-50 rounded-full border border-primary-100">
              Class {user.class} {user.board}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-surface-600 hover:text-primary-600 hover:bg-surface-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Stats */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Streak Counter */}
            <Link to="/streak" className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 hover:bg-accent-100 transition-all duration-200 group">
              <Flame className="w-5 h-5 text-accent-500 fill-accent-400 group-hover:scale-110 transition-transform streak-fire" />
              <span className="text-sm font-bold text-accent-700">{user.streak}d</span>
            </Link>

            {/* XP Tracker */}
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-primary-500 fill-primary-200" />
                <span className="text-xs font-bold text-surface-500 uppercase tracking-wider">Level {user.level}</span>
              </div>
              <div className="text-xs font-black text-primary-600 xp-glow">{user.xp} / {user.xpToNextLevel} XP</div>
            </div>

            {/* User Dropdown Profile mock */}
            <div className="flex items-center space-x-2 border-l border-surface-200 pl-3 sm:pl-4">
              <Link to="/profile" className="relative group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md group-hover:border-primary-200 transition-all">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-yellow-400 text-yellow-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {user.level}
                </div>
              </Link>
              <button
                onClick={handleLogoutClick}
                className="hidden md:flex p-2 rounded-xl text-surface-400 hover:text-danger-500 hover:bg-danger-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-surface-600 hover:text-primary-600 hover:bg-surface-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white shadow-glass-lg z-50 p-6 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold font-display text-primary-600">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-surface-50">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-surface-50 rounded-2xl mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-surface-800 text-sm leading-tight">{user.name}</div>
                  <div className="text-xs font-semibold text-primary-500">Level {user.level} Student</div>
                </div>
              </div>

              <nav className="flex-1 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive(link.path)
                          ? 'bg-primary-500 text-white shadow-glow-primary'
                          : 'text-surface-600 hover:bg-surface-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center justify-center space-x-2 p-3 mt-auto bg-danger-50 hover:bg-danger-100 text-danger-600 rounded-xl font-bold transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
