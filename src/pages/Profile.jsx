import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProgressBar from '../components/ProgressBar';
import AchievementBadge from '../components/AchievementBadge';
import Heatmap from '../components/Heatmap';
import { useApp } from '../context/AppContext';
import { subjects, performanceData, studyHeatmapData } from '../data/mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Calendar, Award, CheckCircle2, Star, Flame, Trophy, Percent, Clock } from 'lucide-react';

export default function Profile() {
  const { user } = useApp();

  // Custom charts mock radar data
  const subjectRadarData = subjects.map(s => ({
    subject: s.name.substring(0, 4), // abbreviate
    mastery: s.progress,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar />

        {/* Profile Content Body */}
        <main className="flex-1 space-y-8 min-w-0">
          
          {/* User profile header card */}
          <div className="glass-card p-6 sm:p-8 bg-white border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary-400 to-indigo-650 flex items-center justify-center text-white font-black text-3xl shadow-glow-primary border-4 border-white">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-450 text-yellow-950 text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce-subtle">
                  {user.level}
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-slate-900 leading-tight">{user.name}</h1>
                <p className="text-xs font-bold text-slate-400">{user.board} Board • Class {user.class} Student</p>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold pt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined StudyMate: {user.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Profile Level Bar */}
            <div className="w-full md:w-64 space-y-2 text-xs font-bold">
              <div className="flex justify-between text-slate-550">
                <span className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-450 fill-yellow-400" />
                  <span>Level {user.level} Progress</span>
                </span>
                <span className="text-primary-650">{user.xp} / {user.xpToNextLevel} XP</span>
              </div>
              <ProgressBar value={(user.xp / user.xpToNextLevel) * 100} color="bg-primary-500" height="sm" animated={false} />
            </div>
          </div>

          {/* Stats breakdown grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 bg-white border border-slate-100 flex items-center space-x-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Streak</span>
                <p className="text-sm font-black text-slate-800 leading-tight mt-0.5">{user.streak}d</p>
              </div>
            </div>
            <div className="glass-card p-4 bg-white border border-slate-100 flex items-center space-x-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total XP</span>
                <p className="text-sm font-black text-slate-800 leading-tight mt-0.5">{user.totalXpEarned.toLocaleString()}</p>
              </div>
            </div>
            <div className="glass-card p-4 bg-white border border-slate-100 flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quizzes</span>
                <p className="text-sm font-black text-slate-800 leading-tight mt-0.5">{user.quizzesCompleted}</p>
              </div>
            </div>
            <div className="glass-card p-4 bg-white border border-slate-100 flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
                <p className="text-sm font-black text-slate-800 leading-tight mt-0.5">{user.accuracy}%</p>
              </div>
            </div>
          </div>

          {/* Charts grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Subject Mastery Spiderweb */}
            <div className="lg:col-span-5 glass-card p-6 flex flex-col items-center">
              <h4 className="text-sm font-bold text-surface-850 uppercase tracking-wider mb-6 w-full text-left">Subject Mastery Spider</h4>
              <div className="w-full h-64 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={8} />
                    <Radar name="Student" dataKey="mastery" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance curve */}
            <div className="lg:col-span-7 glass-card p-6">
              <h4 className="text-sm font-bold text-surface-850 uppercase tracking-wider mb-6">Learning Curve (Monthly)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity Map */}
          <Heatmap data={studyHeatmapData} />

          {/* Badges Box Grid */}
          <div className="glass-card p-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-surface-850 uppercase tracking-wider">Badge Showcase</h4>
              <p className="text-xs text-slate-400 mt-0.5">Collect milestones and build the ultimate profile badgecase.</p>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {user.badges.map((badge) => (
                <AchievementBadge key={badge.id} {...badge} />
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
