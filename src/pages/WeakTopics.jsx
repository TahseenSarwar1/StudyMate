import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProgressBar from '../components/ProgressBar';
import { subjectPerformance, weakTopics as mockWeakTopics } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, TrendingDown, Minus, Play } from 'lucide-react';

// Default color mappings for subjects
const SUBJECT_COLORS = {
  mathematics: 'from-blue-500 to-indigo-600',
  physics: 'from-purple-500 to-violet-600',
  chemistry: 'from-emerald-500 to-teal-600',
  biology: 'from-rose-500 to-pink-600',
  english: 'from-amber-500 to-orange-600',
  'social science': 'from-cyan-500 to-blue-600',
};

function WeakTopicSkeleton() {
  return (
    <div className="glass-card p-5 bg-white border border-slate-100 flex flex-col justify-between space-y-6 animate-pulse h-48">
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="w-20 h-4 bg-slate-200 rounded-full" />
          <div className="w-16 h-4 bg-slate-100 rounded" />
        </div>
        <div className="w-3/4 h-4 bg-slate-200 rounded" />
        <div className="w-1/2 h-3 bg-slate-100 rounded" />
      </div>
      <div className="space-y-3 pt-4 border-t border-slate-50">
        <div className="w-full h-2 bg-slate-100 rounded-full" />
        <div className="w-full h-8 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

export default function WeakTopics() {
  const { user } = useApp();
  const [weakTopics, setWeakTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    if (!isSupabaseConfigured) {
      setWeakTopics(mockWeakTopics);
      setLoading(false);
      return;
    }

    async function fetchWeakTopics() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('weak_topics')
          .select(`
            id,
            topic_name,
            mastery_percentage,
            attempts,
            last_attempted_at,
            trend,
            subjects(name)
          `)
          .eq('user_id', user.id)
          .order('mastery_percentage', { ascending: true })
          .limit(6);

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map(row => ({
            id: row.id,
            subject: row.subjects?.name || 'Unknown',
            topic: row.topic_name,
            mastery: row.mastery_percentage ?? 0,
            attempts: row.attempts ?? 0,
            lastAttempt: row.last_attempted_at ? row.last_attempted_at.split('T')[0] : 'N/A',
            trend: row.trend || 'stable',
            color: SUBJECT_COLORS[(row.subjects?.name || '').toLowerCase()] || 'from-blue-500 to-indigo-600',
          }));
          setWeakTopics(mapped);
        } else {
          // New user — show empty state (not mock data)
          setWeakTopics([]);
        }
      } catch (err) {
        console.error('WeakTopics fetch error:', err.message);
        setWeakTopics(mockWeakTopics);
      } finally {
        setLoading(false);
      }
    }

    fetchWeakTopics();
  }, [user?.id]);

  const getTrendIcon = (tr) => {
    if (tr === 'improving') return <TrendingUp className="w-4 h-4 text-success-500 mr-1" />;
    if (tr === 'declining') return <TrendingDown className="w-4 h-4 text-danger-500 mr-1" />;
    return <Minus className="w-4 h-4 text-warning-500 mr-1" />;
  };

  const aiRecommendations = [
    { id: 'rec1', text: 'Practicing <strong>Quadratic Equations</strong> formulas could raise your Math grade by 12%.', action: 'Practice Now' },
    { id: 'rec2', text: 'You missed 2 questions on electromagnetism in <strong>Electricity</strong>. Try card review.', action: 'Review Cards' },
    { id: 'rec3', text: 'Chemistry <strong>Carbon Compounds</strong> concepts are dropping. Set a revision calendar.', action: 'Schedule' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar />

        {/* Analytics body */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black font-display tracking-tight text-slate-900 flex items-center space-x-2">
                <span>Weak Topics Analysis</span>
              </h1>
              <p className="text-slate-550 font-medium text-sm mt-1">Review topics where accuracy drops, and access personalized AI recommendation cards.</p>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-650 text-xs font-black border border-purple-100 animate-pulse">
              <Sparkles className="w-4 h-4 fill-purple-650" />
              <span>AI Insights active</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Subject Mastery Radar */}
            <div className="lg:col-span-5 glass-card p-6 flex flex-col items-center">
              <h4 className="text-sm font-bold text-surface-850 uppercase tracking-wider mb-6 w-full text-left">Subject Mastery Radar</h4>
              <div className="w-full h-64 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={9} />
                    <Radar name="Student" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Recommendations panel */}
            <div className="lg:col-span-7 glass-card p-6 space-y-5">
              <h4 className="text-sm font-bold text-surface-850 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500 fill-purple-200" />
                <span>AI Study Recommendations</span>
              </h4>
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="p-4 bg-purple-50/40 border border-purple-100 rounded-2xl flex justify-between items-center gap-4 hover:border-purple-200 transition-colors">
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: rec.text }} />
                    <Link to="/subjects" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl shadow-sm whitespace-nowrap">
                      {rec.action}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weak Topics Grid */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-surface-850 uppercase tracking-wider">Identified Weak Areas</h4>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <WeakTopicSkeleton key={i} />)}
              </div>
            ) : weakTopics.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400">
                <div className="text-4xl mb-3">🎉</div>
                <p className="font-black text-slate-600 text-sm">No weak topics yet!</p>
                <p className="text-xs font-medium mt-1">Complete some quizzes and we'll track your weak areas here.</p>
                <Link to="/subjects" className="mt-4 inline-block px-6 py-2.5 bg-primary-500 text-white text-xs font-black rounded-xl shadow-sm">
                  Start a Quiz
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {weakTopics.map((topic) => (
                  <div key={topic.id} className="glass-card p-5 bg-white border border-slate-100 hover:border-primary-100 transition-all flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100">
                          {topic.subject}
                        </span>
                        <div className="flex items-center text-[10px] font-black text-slate-500">
                          {getTrendIcon(topic.trend)}
                          <span className="capitalize">{topic.trend}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">{topic.topic}</h3>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">Attempts: {topic.attempts} quizzes • Last: {topic.lastAttempt}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-50">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-450">Mastery Level</span>
                        <span className="text-danger-500">{topic.mastery}%</span>
                      </div>
                      <ProgressBar value={topic.mastery} color="bg-danger-500" height="sm" animated={false} />
                      <Link to="/subjects" className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-black rounded-xl text-slate-700 transition-colors flex items-center justify-center space-x-1">
                        <Play className="w-3 h-3 fill-slate-700 text-slate-700" />
                        <span>Start Topic Drills</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
