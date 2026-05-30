import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, GraduationCap, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const { signUp, signIn, signInWithSocial, isAuthenticated } = useApp();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: '10',
    board: 'CBSE',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBoardSelect = (selectedBoard) => {
    setFormData(prev => ({ ...prev, board: selectedBoard }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // Quick validation
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await signIn(formData.email, formData.password);
        if (signInError) {
          setError(signInError.message || 'Failed to log in');
          setLoading(false);
        }
      } else {
        const { data, error: signUpError } = await signUp(formData.email, formData.password, {
          name: formData.name,
          grade: formData.grade,
          board: formData.board,
        });

        if (signUpError) {
          setError(signUpError.message || 'Failed to create account');
          setLoading(false);
        } else {
          setLoading(false);
          if (data?.session) {
            // Auto logged in
            navigate('/dashboard', { replace: true });
          } else {
            // Needs email verification
            setSuccessMessage('Account created! Please check your email for a verification link to complete sign up.');
          }
        }
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch font-sans overflow-hidden">
      {/* Left Column - Hero Marketing Showcase (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl" />
        
        {/* Top Header */}
        <Link to="/" className="text-2xl font-black font-display tracking-tight text-white relative z-10">
          StudyMate
        </Link>

        {/* Center content */}
        <div className="my-auto space-y-6 relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10"
          >
            <ShieldCheck className="w-6 h-6 text-yellow-300" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black font-display leading-[1.2]"
          >
            Start your learning adventure.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 font-semibold text-sm leading-relaxed"
          >
            Join over 50,000 students practicing daily. Level up your skills, unlock badges, and master every concept line-by-line.
          </motion.p>
        </div>

        {/* Bottom footer/stats */}
        <div className="relative z-10 flex items-center space-x-6 text-xs font-bold text-slate-350 uppercase tracking-widest border-t border-white/10 pt-6">
          <span>7-Day streak bonus active 🔥</span>
        </div>
      </div>

      {/* Right Column - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black font-display text-slate-800">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-2">
              {isLogin ? "Ready to score higher? Let's start practicing." : 'Sign up to build healthy study habits today.'}
            </p>
          </div>

          {/* Form Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                isLogin ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              LOG IN
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                !isLogin ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {error && (
            <div className="bg-danger-50 border border-danger-100 text-danger-600 px-4 py-3 rounded-xl text-xs font-bold">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl text-xs font-bold">
              {successMessage}
            </div>
          )}

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-semibold transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Class Selection & Board Toggle */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class / Grade</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-850 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-black transition-all appearance-none cursor-pointer"
                        >
                          <option value="6">Class 6</option>
                          <option value="7">Class 7</option>
                          <option value="8">Class 8</option>
                          <option value="9">Class 9</option>
                          <option value="10">Class 10</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Board</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mt-1 h-[46px]">
                        <button
                          type="button"
                          onClick={() => handleBoardSelect('CBSE')}
                          className={`flex-1 rounded-lg text-xs font-black transition-all ${
                            formData.board === 'CBSE' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'
                          }`}
                        >
                          CBSE
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBoardSelect('ICSE')}
                          className={`flex-1 rounded-lg text-xs font-black transition-all ${
                            formData.board === 'ICSE' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'
                          }`}
                        >
                          ICSE
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-semibold transition-all"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-semibold transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 mt-6 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>{loading ? 'Please wait...' : isLogin ? 'LOG IN TO STUDYMATE' : 'CREATE ACCOUNT'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Social login mock */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black text-slate-400">
              <span className="bg-slate-50 px-3">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => signInWithSocial('google')}
              className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all font-semibold text-slate-700 text-xs bg-white"
            >
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => signInWithSocial('azure')}
              className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all font-semibold text-slate-700 text-xs bg-white"
            >
              <span>Microsoft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
