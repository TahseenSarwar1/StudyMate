import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import { subjects } from '../data/mockData';
import { BookOpen, GraduationCap, ChevronRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubjectSelection() {
  const navigate = useNavigate();

  // Aggregate stats
  const totalChapters = subjects.reduce((sum, s) => sum + s.totalChapters, 0);
  const completedChapters = subjects.reduce((sum, s) => sum + s.completedChapters, 0);
  const averageProgress = Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page header & top aggregation stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black font-display tracking-tight text-slate-900">Choose Your Subject</h1>
            <p className="text-slate-550 font-medium text-sm mt-1">Select a subject to start practicing chapters and quizzes.</p>
          </div>

          <div className="flex items-center space-x-4 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
            <div>
              <span className="text-slate-400">Total chapters:</span>
              <span className="font-bold text-slate-800 ml-1.5">{completedChapters} / {totalChapters}</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-slate-400">Average completion:</span>
              <span className="font-bold text-primary-600 ml-1.5">{averageProgress}%</span>
            </div>
          </div>
        </div>

        {/* Subjects cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {subjects.map((subj) => (
            <motion.div
              key={subj.id}
              variants={item}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/subjects/${subj.id}`)}
              className="bg-white rounded-3xl shadow-card hover:shadow-card-hover border border-slate-100 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden group"
            >
              {/* Colored ribbon strip at top */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subj.color}`} />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-4xl select-none">{subj.icon}</span>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    NCERT syllabus
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
                    {subj.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">{subj.description}</p>
                </div>
              </div>

              <div className="space-y-3 mt-8 pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Chapter completion</span>
                  <span className="text-slate-800 font-bold">{subj.completedChapters} / {subj.totalChapters}</span>
                </div>
                <ProgressBar value={subj.progress} color={`bg-gradient-to-r ${subj.color}`} height="sm" animated={false} />
                <div className="flex justify-between items-center pt-2 text-xs font-black text-primary-500 group-hover:text-primary-600 transition-colors">
                  <span>Open chapter list</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
