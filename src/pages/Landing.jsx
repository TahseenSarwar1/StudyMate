import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Trophy, Award, Sparkles, Clock, Compass, ArrowRight, Star, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '50K+', label: 'Happy Students' },
    { value: '1M+', label: 'Quizzes Taken' },
    { value: '95%', label: 'CBSE / ICSE Score Boost' },
    { value: '4.9★', label: 'Play Store Rating' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'NCERT Mastered',
      desc: 'Line-by-line chapter breakdown covering every crucial detail from your syllabus.',
      color: 'text-blue-500 bg-blue-50',
    },
    {
      icon: Flame,
      title: 'Daily Streak System',
      desc: 'Keep learning habits strong with streak counts, multipliers, and treasure rewards.',
      color: 'text-accent-505 bg-accent-50',
    },
    {
      icon: Trophy,
      title: 'Interactive Competitions',
      desc: 'Climb weekly leaderboards, compete with friends, and show off your badges.',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      icon: Award,
      title: 'Weak Topics Analysis',
      desc: 'Real-time detection of weak areas with smart revision schedules and card drills.',
      color: 'text-red-500 bg-red-50',
    },
    {
      icon: Sparkles,
      title: 'Smart AI Planner',
      desc: 'Let our algorithm schedule the optimal time to review chapters before exam day.',
      color: 'text-purple-500 bg-purple-50',
    },
    {
      icon: Clock,
      title: 'Speed & Accuracy Training',
      desc: 'Beat the quiz timer to earn speed bonuses and build exam confidence.',
      color: 'text-emerald-500 bg-emerald-50',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-glass border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black font-display gradient-text">
            StudyMate
          </Link>
          <div className="flex items-center space-x-6">
            <a href="#features" className="hidden sm:inline-block text-sm font-semibold text-slate-600 hover:text-primary-650 transition-colors">Features</a>
            <a href="#how-it-works" className="hidden sm:inline-block text-sm font-semibold text-slate-600 hover:text-primary-650 transition-colors">How it works</a>
            <Link to="/login" className="px-5 py-2.5 rounded-xl text-sm font-bold text-primary-600 hover:bg-primary-50 border border-primary-100 transition-all">
              Log In
            </Link>
            <Link to="/login" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all hidden xs:inline-block">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-hero text-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-300 text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 fill-yellow-400" />
                <span>CBSE & ICSE Classes 6 - 10</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-[1.1] text-balance"
              >
                Learn Smarter. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Score Higher.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-200 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance"
              >
                Master NCERT chapters line-by-line through interactive quizzes, AI-powered revision, real-time analytics, and Duolingo-style gamification.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              >
                <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-primary-750 hover:bg-yellow-300 hover:text-yellow-950 transition-all flex items-center justify-center space-x-2 shadow-lg">
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border-2 border-white/20 hover:bg-white/10 transition-all text-center">
                  See How It Works
                </a>
              </motion.div>
            </div>

            {/* Right Illustration Card Grid Mockup */}
            <div className="lg:col-span-5 relative hidden lg:block">
              {/* Floating Emojis */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 left-10 text-4xl select-none"
              >
                🎯
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-6 text-4xl select-none"
              >
                🔥
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-6 left-12 text-4xl select-none"
              >
                🏆
              </motion.div>

              {/* Overlapping Mockup Cards */}
              <div className="relative mx-auto max-w-[360px] h-[400px]">
                {/* Streak Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 6 }}
                  animate={{ opacity: 1, x: 0, rotate: 6 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-4 left-6 bg-slate-900/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl w-64 text-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-350">DAILY STREAK</span>
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="text-2xl font-black font-display mt-1">7 Days Streak!</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                  </div>
                  <p className="text-[10px] text-slate-300 mt-2 font-medium">Keep it up! Mystery chest in 3 days 🎁</p>
                </motion.div>

                {/* Score Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -6 }}
                  animate={{ opacity: 1, x: 0, rotate: -6 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-16 -left-6 bg-white p-5 rounded-2xl shadow-2xl w-64 text-slate-800 border border-slate-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">MATH QUIZ</span>
                      <h4 className="font-bold text-slate-800 leading-tight mt-0.5">Real Numbers Ch 1</h4>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded text-xs">92% ACC</span>
                  </div>
                  <div className="flex items-center space-x-1.5 mt-4 text-xs font-bold text-primary-600">
                    <Award className="w-4 h-4" />
                    <span>+120 XP earned</span>
                  </div>
                </motion.div>

                {/* Weekly Rank Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 right-2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl w-60 border border-slate-100 text-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 tracking-wider">LEADERBOARD</span>
                    <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">WEEKLY</span>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="text-xl font-bold">🥇</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                      P
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-800 truncate leading-none">Priya Patel</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">32,450 XP</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="glass-card bg-white/90 p-8 shadow-glass border border-slate-200 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black font-display text-primary-600 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900">
            A Platform Built for Exam Success
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Combining academic requirements with addictive gamification features to keep students engaged every single day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col space-y-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-800">{feat.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed flex-1">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it Works / 3 Steps */}
      <section id="how-it-works" className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900">
              Your Daily Study Habit Loop
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Three simple steps that turn regular exam prep into an engaging habit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center font-black font-display text-xl shadow-glow-primary">
                1
              </div>
              <h3 className="text-lg font-black text-slate-800">Select Subject & Ch</h3>
              <p className="text-sm font-medium text-slate-500 max-w-xs leading-relaxed">
                Choose Math, Physics, Chemistry, Biology, SST, or English based on your board.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black font-display text-xl shadow-glow-accent">
                2
              </div>
              <h3 className="text-lg font-black text-slate-800">Take Line-by-Line Quizzes</h3>
              <p className="text-sm font-medium text-slate-500 max-w-xs leading-relaxed">
                Interactive MCQs test every concept. Detailed explanations build instant comprehension.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black font-display text-xl shadow-glow-success">
                3
              </div>
              <h3 className="text-lg font-black text-slate-800">Track analytics & Streaks</h3>
              <p className="text-sm font-medium text-slate-500 max-w-xs leading-relaxed">
                Earn XP points, maintain streaks, identify weak topics, and watch your grades soar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900">
            Loved by Students & Parents
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Real stories from CBSE and ICSE board toppers who changed the way they prepare for exams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
              "The streak system is so addictive! I started studying Science daily just to keep my 25-day streak active. My mid-term score in Chemistry went from 70% to 94%!"
            </p>
            <div className="flex items-center space-x-3 mt-6 border-t border-slate-100 pt-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-xl select-none">
                🧑‍🚀
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">Rohan Das</h4>
                <p className="text-[10px] font-bold text-slate-400">Class 10 CBSE Student</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
              "The weak topics dashboard is a lifesaver. Before StudyMate, I did not know which parts of math equations I was bad at. Now it suggests exact revision cards. Recommended for all Class 9s!"
            </p>
            <div className="flex items-center space-x-3 mt-6 border-t border-slate-100 pt-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl select-none">
                👩‍🎓
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">Pooja Sharma</h4>
                <p className="text-[10px] font-bold text-slate-400">Class 9 ICSE Student</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
              "As a parent, I love the clear dashboard metrics. I can see my daughter's weekly XP levels and accuracy scores without micromanaging. It has turned studying into something she looks forward to."
            </p>
            <div className="flex items-center space-x-3 mt-6 border-t border-slate-100 pt-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl select-none">
                👩‍🏫
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">Meera Iyer</h4>
                <p className="text-[10px] font-bold text-slate-400">Parent of Class 8 Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-primary-600 to-indigo-800 p-8 sm:p-12 rounded-3xl text-center text-white space-y-6 shadow-glow-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white max-w-xl mx-auto">
            Unlock Your Academic Potential Today
          </h2>
          <p className="text-slate-200 text-sm sm:text-base font-semibold max-w-md mx-auto leading-relaxed">
            Join thousands of active students mastering Class 6-10 CBSE & ICSE syllabus on StudyMate.
          </p>
          <div className="pt-4 relative z-10">
            <Link to="/login" className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black rounded-2xl shadow-lg transition-all inline-flex items-center space-x-2">
              <span>Create Free Account</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-sm">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-xl font-bold font-display text-white">StudyMate</span>
            <p className="text-xs font-medium text-slate-500">© 2026 StudyMate Inc. All rights reserved.</p>
          </div>
          <div className="flex space-x-8 font-semibold">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="/login" className="hover:text-white transition-colors">Log In</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
