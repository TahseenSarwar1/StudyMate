import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import ProgressBar from '../components/ProgressBar';
import Heatmap from '../components/Heatmap';
import AchievementBadge from '../components/AchievementBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Trophy, Percent, Clock, ChevronRight, Play, BookOpen, AlertTriangle, RefreshCw } from 'lucide-react';
import {
  recentQuizzes,
  weakTopics,
  performanceData,
  studyHeatmapData,
  revisionTasks
} from '../data/mockData';

export default function Dashboard() {
  const { user, dailyGoals } = useApp();

  // Performance calculations
  const totalXpEarned = user.totalXpEarned;
  const recentScoreAvg = recentQuizzes.reduce((acc, curr) => acc + curr.score, 0) / recentQuizzes.length;
  
  // Custom Recharts tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700 shadow-lg text-xs">
          <p className="font-black mb-1">{payload[0].payload.month}</p>
          <p className="font-bold text-primary-400">Score: {payload[0].value}%</p>
          <p className="text-slate-400">Quizzes: {payload[0].payload.quizzes}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar />

        {/* Dashboard Main Content */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Welcome banner */}
          <div className="glass-card bg-gradient-to-r from-primary-600 to-indigo-700 p-6 sm:p-8 text-white relative overflow-hidden rounded-3xl shadow-glow-primary">
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-black font-display tracking-tight leading-tight">Good evening, {user.name}! 🚀</h1>
                <p className="text-indigo-100 text-sm font-semibold max-w-md">"You do not find a happy life. You make it." Complete today's quizzes to secure your multiplier!</p>
              </div>
              <Link to="/subjects" className="px-6 py-3 bg-yellow-400 hover:bg-yellow-350 text-yellow-950 font-black rounded-xl text-sm transition-all shadow-md self-start md:self-auto flex items-center space-x-2">
                <span>Start Practice Quiz</span>
                <Play className="w-4 h-4 fill-yellow-950 text-yellow-950" />
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="Daily Streak" value={`${user.streak} Days`} icon={Flame} color="text-orange-500" trend="up" trendValue="+1d" />
            <StatsCard title="Total XP" value={totalXpEarned.toLocaleString()} icon={Trophy} color="text-yellow-600" trend="up" trendValue="+350" />
            <StatsCard title="Quizzes Done" value={user.quizzesCompleted} icon={BookOpen} color="text-blue-500" trend="up" trendValue="+8" />
            <StatsCard title="Avg Accuracy" value={`${recentScoreAvg.toFixed(0)}%`} icon={Percent} color="text-emerald-500" trend="same" />
          </div>

          {/* Goals & Heatmap Section */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Daily Goals */}
            <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-surface-800 uppercase tracking-wider mb-6">Today's Challenges</h4>
                <div className="space-y-5">
                  {dailyGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="flex items-center space-x-2 text-surface-700">
                          <span>{goal.icon}</span>
                          <span>{goal.title}</span>
                        </span>
                        <span className="font-bold text-primary-600">{goal.current} / {goal.target}</span>
                      </div>
                      <ProgressBar value={(goal.current / goal.target) * 100} color="bg-primary-500" height="sm" animated={false} />
                      <div className="text-[10px] font-bold text-surface-400 mt-1">Reward: +{goal.xpReward} XP</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/streak" className="text-xs font-black text-primary-500 hover:text-primary-600 flex items-center space-x-1 mt-6 border-t border-slate-100 pt-4 self-start">
                <span>View all streak rewards</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Performance Over Time Chart */}
            <div className="lg:col-span-7 glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-surface-800 uppercase tracking-wider">Performance Trend</h4>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Accuracy %</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity Heatmap Grid */}
          <Heatmap data={studyHeatmapData} />

          {/* Quick list details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Quizzes Taken */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-surface-800 uppercase tracking-wider">Recent Quizzes</h4>
                <Link to="/subjects" className="text-xs font-black text-primary-500 hover:text-primary-600 flex items-center space-x-1">
                  <span>See Chapters</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex justify-between items-center p-3 hover:bg-slate-55 bg-slate-50 border border-slate-100 rounded-xl transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                        {quiz.subject === 'Mathematics' ? '📐' : quiz.subject === 'Physics' ? '⚡' : quiz.subject === 'Chemistry' ? '🧪' : '🧬'}
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-surface-850 leading-tight">{quiz.chapter}</h5>
                        <p className="text-[10px] font-semibold text-slate-400 mt-1">{quiz.date} • {quiz.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                        quiz.score >= 80 ? 'bg-success-50 text-success-600' : quiz.score >= 60 ? 'bg-warning-50 text-warning-600' : 'bg-danger-50 text-danger-600'
                      }`}>
                        {quiz.score}%
                      </span>
                      <p className="text-[9px] font-bold text-slate-400 mt-1">+{quiz.xpEarned} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics Analysis Snapshot */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-surface-800 uppercase tracking-wider">Weak Topics Snapshot</h4>
                <Link to="/weak-topics" className="text-xs font-black text-primary-500 hover:text-primary-600 flex items-center space-x-1">
                  <span>Full Analytics</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {weakTopics.slice(0, 3).map((topic) => (
                  <div key={topic.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-black text-primary-500 uppercase bg-primary-50 border border-primary-100 px-1.5 py-0.5 rounded-full">{topic.subject}</span>
                        <h5 className="text-xs font-black text-surface-850 mt-1">{topic.topic}</h5>
                      </div>
                      <span className="text-xs font-black text-danger-500 bg-danger-50 border border-danger-100 px-2 py-0.5 rounded-lg">{topic.mastery}% mastery</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400">Last attempted: {topic.lastAttempt}</span>
                      <Link to={`/subjects`} className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-black rounded-lg text-slate-700 transition-colors flex items-center space-x-1">
                        <span>Solve drills</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievement Badges Case */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-bold text-surface-800 uppercase tracking-wider">Unlocked Achievements</h4>
              <Link to="/profile" className="text-xs font-black text-primary-500 hover:text-primary-600 flex items-center space-x-1">
                <span>View Badgecase</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex overflow-x-auto scrollbar-thin gap-4 pb-2">
              {user.badges.filter(b => b.earned).slice(0, 5).map((badge) => (
                <AchievementBadge key={badge.id} {...badge} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
