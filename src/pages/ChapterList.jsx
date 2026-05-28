import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import { subjects, chapters } from '../data/mockData';
import { BookOpen, ChevronLeft, Play, CheckCircle2, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChapterList() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const subject = subjects.find(s => s.id === subjectId) || subjects[0];
  const chapterList = chapters[subjectId] || [];

  // Filter logic
  const filteredChapters = chapterList.filter(ch => {
    if (filter === 'completed') return ch.progress === 100;
    if (filter === 'in-progress') return ch.progress > 0 && ch.progress < 100;
    if (filter === 'not-started') return ch.progress === 0;
    return true;
  });

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return 'bg-success-50 text-success-600 border-success-100';
    if (diff === 'Medium') return 'bg-warning-50 text-warning-600 border-warning-100';
    return 'bg-danger-50 text-danger-600 border-danger-100';
  };

  const getStatusIcon = (ch, index) => {
    if (ch.progress === 100) return <CheckCircle2 className="w-5 h-5 text-success-500 fill-success-100" />;
    if (ch.progress > 0) return <span className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />;
    
    // First uncompleted item is unlocked, rest are locked for simulated progression
    const isLocked = index > 0 && chapterList[index - 1].progress < 100;
    if (isLocked) return <Lock className="w-5 h-5 text-slate-400" />;
    return <span className="w-5 h-5 rounded-full border-2 border-slate-300" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Link */}
        <Link to="/subjects" className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-550 hover:text-primary-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Subjects</span>
        </Link>

        {/* Subject Detail Header Card */}
        <div className="glass-card p-6 bg-white relative overflow-hidden">
          <div className={`absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b ${subject.color}`} />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pl-2">
            <div className="flex items-center space-x-4">
              <span className="text-5xl select-none">{subject.icon}</span>
              <div>
                <h1 className="text-2xl font-black font-display text-slate-900 leading-none">{subject.name}</h1>
                <p className="text-xs font-semibold text-slate-400 mt-2">{subject.completedChapters} / {subject.totalChapters} chapters completed</p>
              </div>
            </div>
            <div className="w-full sm:w-48 space-y-1 text-xs">
              <div className="flex justify-between font-bold text-slate-550">
                <span>Completion progress</span>
                <span>{subject.progress}%</span>
              </div>
              <ProgressBar value={subject.progress} color={`bg-gradient-to-r ${subject.color}`} height="sm" animated={false} />
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit text-[10px] font-black uppercase tracking-wider">
          {['all', 'completed', 'in-progress', 'not-started'].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === btn ? 'bg-white text-primary-650 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {btn.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Chapters list */}
        <div className="space-y-3">
          {filteredChapters.map((ch, idx) => {
            const isLocked = idx > 0 && filteredChapters[idx - 1].progress < 100 && ch.progress === 0;
            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-card p-5 bg-white border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden ${
                  isLocked ? 'opacity-60 bg-slate-50/50' : 'hover:shadow-card-hover hover:border-primary-100 transition-all'
                }`}
              >
                <div className="flex items-start space-x-4 pl-1">
                  <div className="mt-1">{getStatusIcon(ch, idx)}</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      Ch {idx + 1}: {ch.name}
                    </h4>
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-400">
                      <span>{ch.topics} topics</span>
                      <span>•</span>
                      <span>{ch.estimatedTime}</span>
                      <span>•</span>
                      <span className={`px-2 py-0.5 rounded border text-[8px] font-bold ${getDifficultyColor(ch.difficulty)}`}>
                        {ch.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-auto">
                  {ch.quizScore !== null && (
                    <div className="text-right">
                      <span className="text-xs font-black text-success-600 bg-success-50 px-2 py-1 rounded-lg border border-success-100">
                        {ch.quizScore}% score
                      </span>
                    </div>
                  )}

                  {!isLocked ? (
                    <button
                      onClick={() => navigate(`/quiz/${subjectId}/${ch.id}`)}
                      className={`btn-primary px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-sm`}
                    >
                      <span>{ch.progress === 100 ? 'Retake Quiz' : ch.progress > 0 ? 'Continue' : 'Start Quiz'}</span>
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 rounded-xl text-xs font-black bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center space-x-1.5"
                    >
                      <span>Chapter Locked</span>
                      <Lock className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {filteredChapters.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-semibold text-sm bg-white rounded-2xl border border-slate-200">
              No chapters match this filter.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
