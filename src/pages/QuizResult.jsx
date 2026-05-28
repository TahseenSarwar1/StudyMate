import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import { quizQuestions } from '../data/mockData';
import { motion } from 'framer-motion';
import { Award, RefreshCw, ChevronRight, HelpCircle, ChevronDown, ChevronUp, Check, X, AlertTriangle } from 'lucide-react';

export default function QuizResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Fallback data if page is accessed directly
  const results = state || {
    score: 80,
    correctCount: 8,
    wrongCount: 2,
    totalQuestions: 10,
    timeTaken: 142,
    xpEarned: 130,
    answers: [
      { questionId: 'q1', selected: 1, correct: 1, isCorrect: true },
      { questionId: 'q2', selected: 2, correct: 1, isCorrect: false },
    ],
    subjectId: 'math',
    chapterId: 'ch1',
  };

  const getScoreColor = (sc) => {
    if (sc >= 80) return 'text-success-500 border-success-200 bg-success-50';
    if (sc >= 60) return 'text-warning-500 border-warning-200 bg-warning-50';
    return 'text-danger-500 border-danger-200 bg-danger-50';
  };

  const getScoreMessage = (sc) => {
    if (sc >= 90) return 'Perfect Score! You are a master! 🏆';
    if (sc >= 80) return 'Excellent Work! Keep it up! 🌟';
    if (sc >= 60) return 'Good Effort! Try revising missed concepts. 💪';
    return 'Keep Practicing! Revision will help you improve. 🔄';
  };

  const toggleExpand = (idx) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Score circular badge display */}
        <div className="glass-card p-8 bg-white text-center flex flex-col items-center space-y-4">
          <div className="relative flex items-center justify-center">
            {/* Styled Circular boundary */}
            <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center font-display ${getScoreColor(results.score)}`}>
              <span className="text-3xl font-black">{results.score}%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Accuracy</span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-950 p-2 rounded-full shadow-md text-xl"
            >
              🎉
            </motion.div>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-black text-slate-900">{getScoreMessage(results.score)}</h1>
            <p className="text-xs text-slate-500 font-semibold">Quiz completed in {Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s</p>
          </div>
        </div>

        {/* Stats breakdown grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 bg-white text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct</span>
            <p className="text-lg font-black text-success-600 flex items-center justify-center space-x-1">
              <Check className="w-4 h-4" />
              <span>{results.correctCount}</span>
            </p>
          </div>
          <div className="glass-card p-4 bg-white text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Incorrect</span>
            <p className="text-lg font-black text-danger-600 flex items-center justify-center space-x-1">
              <X className="w-4 h-4" />
              <span>{results.wrongCount}</span>
            </p>
          </div>
          <div className="glass-card p-4 bg-white text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">XP Earned</span>
            <p className="text-lg font-black text-yellow-600 flex items-center justify-center space-x-1">
              <Award className="w-4 h-4" />
              <span>+{results.xpEarned}</span>
            </p>
          </div>
        </div>

        {/* Action button triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => navigate(`/quiz/${results.subjectId}/${results.chapterId}`)}
            className="w-full sm:flex-1 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-black rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
          <Link
            to={`/subjects/${results.subjectId}`}
            className="w-full sm:flex-1 py-3 btn-primary text-white font-black rounded-xl text-sm transition-all flex items-center justify-center space-x-2 text-center"
          >
            <span>Back to Chapters</span>
          </Link>
        </div>

        {/* Missed topics warnings */}
        {results.wrongCount > 0 && (
          <div className="glass-card p-5 bg-danger-50/50 border-danger-100 flex items-start space-x-4">
            <AlertTriangle className="w-5 h-5 text-danger-500 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-danger-600">Weak Areas Detected!</h4>
              <p className="text-[10px] text-danger-500 font-semibold leading-relaxed">
                You missed questions on some topics. We have automatically flagged these in your **Weak Topics Analysis** panel and created revision tasks.
              </p>
              <Link to="/weak-topics" className="inline-flex items-center space-x-1 text-[10px] font-black text-danger-600 hover:underline pt-2">
                <span>View weak topic recommendations</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Question-by-question review container */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-surface-800 uppercase tracking-wider">Question Review</h3>
          <div className="space-y-2">
            {quizQuestions.slice(0, results.totalQuestions).map((q, idx) => {
              const userAttempt = results.answers.find(a => a.questionId === q.id);
              const isUserCorrect = userAttempt ? userAttempt.isCorrect : false;
              const isExpanded = expandedQuestion === idx;

              return (
                <div key={q.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 pr-4">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isUserCorrect ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{q.question}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-3 overflow-hidden text-xs"
                      >
                        <p className="font-semibold text-slate-800 leading-relaxed">{q.question}</p>
                        
                        <div className="grid gap-2">
                          {q.options.map((opt, oIdx) => {
                            const isCorrectOpt = oIdx === q.correct;
                            const isSelectedOpt = userAttempt ? userAttempt.selected === oIdx : false;

                            let optStyle = 'border-slate-200 text-slate-600 bg-white';
                            if (isCorrectOpt) optStyle = 'border-success-300 text-success-700 bg-success-50';
                            else if (isSelectedOpt && !isCorrectOpt) optStyle = 'border-danger-300 text-danger-700 bg-danger-50';

                            return (
                              <div key={oIdx} className={`p-2.5 rounded-xl border text-[11px] font-semibold flex items-center space-x-2 ${optStyle}`}>
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                  isCorrectOpt ? 'bg-success-500 text-white' : isSelectedOpt ? 'bg-danger-500 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-[10px] font-semibold text-slate-550 mt-2 leading-relaxed">
                          <span className="font-black text-slate-700 block mb-1">Explanation:</span>
                          {q.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
