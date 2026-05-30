import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motivationalMessages } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useQuestions } from '../hooks/useQuestions';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, ArrowRight, HelpCircle } from 'lucide-react';

export default function Quiz() {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const { addXp, user } = useApp();

  const { questions, loading } = useQuestions(chapterId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [answersState, setAnswersState] = useState([]);

  // Timer setup (15 mins)
  const [timeLeft, setTimeLeft] = useState(900);
  const [streakCount, setStreakCount] = useState(0);
  const [motivationText, setMotivationText] = useState('');
  const quizFinishedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (loading || questions.length === 0) return;
    if (timeLeft <= 0) {
      handleFinishQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, questions.length]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionSelect = (optionIdx) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionIdx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswerChecked) return;

    const isCorrect = selectedOption === currentQuestion.correct;
    setIsAnswerChecked(true);

    setAnswersState(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: selectedOption,
      correct: currentQuestion.correct,
      isCorrect,
    }]);

    if (isCorrect) {
      const nextStreak = streakCount + 1;
      setStreakCount(nextStreak);
      const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setMotivationText(randomMsg);
      const baseXP = 10;
      const multiplier = nextStreak >= 3 ? 2 : 1;
      addXp(baseXP * multiplier);
    } else {
      setStreakCount(0);
      setMotivationText('');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setMotivationText('');

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    if (quizFinishedRef.current) return;
    quizFinishedRef.current = true;

    const allAnswers = answersState;
    const correctCount = allAnswers.filter(a => a.isCorrect).length;
    const totalQ = questions.length;
    const scorePercentage = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const timeTaken = 900 - timeLeft;
    const xpEarned = Math.round((scorePercentage / 100) * 150);

    // Save to Supabase if configured
    if (isSupabaseConfigured && user?.id) {
      try {
        // a) Insert quiz attempt
        await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          chapter_id: chapterId,
          score: scorePercentage,
          total_questions: totalQ,
          correct_answers: correctCount,
          time_taken_seconds: timeTaken,
          xp_earned: xpEarned,
          answers: allAnswers,
        });

        // b) Upsert student chapter progress
        await supabase.from('student_chapter_progress').upsert({
          user_id: user.id,
          chapter_id: chapterId,
          progress: 100,
          best_score: scorePercentage,
          last_attempted_at: new Date().toISOString(),
        }, { onConflict: 'user_id,chapter_id' });

      } catch (err) {
        console.error('Failed to save quiz results:', err.message);
      }
    }

    // c) Give XP via context (also persists to Supabase auth metadata)
    addXp(xpEarned);

    navigate('/quiz-result', {
      state: {
        score: scorePercentage,
        correctCount,
        wrongCount: totalQ - correctCount,
        totalQuestions: totalQ,
        timeTaken,
        xpEarned,
        answers: allAnswers,
        subjectId,
        chapterId,
      }
    });
  };

  const currentProgress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // Loading spinner while questions are being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="relative w-14 h-14 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <p className="text-lg font-black text-slate-300">No questions found for this chapter.</p>
          <button
            onClick={() => navigate(`/subjects/${subjectId}`)}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-xl font-bold text-sm transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans">
      {/* Quiz Top Header */}
      <header className="bg-slate-950 px-4 py-4 sm:px-6 flex justify-between items-center border-b border-slate-800">
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
              navigate(`/subjects/${subjectId}`);
            }
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Tracker */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1">
            <span>Progress: Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round(currentProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full"
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-800 text-sm font-black font-display tracking-wider ${timeLeft < 120 ? 'text-danger-500 border-danger-500/20 bg-danger-500/5 animate-pulse' : 'text-slate-300 bg-slate-900'}`}>
          <span className="w-2 h-2 rounded-full bg-current" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </header>

      {/* Main MCQ body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Question Text Box */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-xs font-bold">
              <span className="px-2 py-0.5 bg-primary-950 text-primary-400 border border-primary-900/50 rounded-full">
                {currentQuestion.topic}
              </span>
              <span className={`px-2 py-0.5 rounded-full uppercase tracking-wider ${
                currentQuestion.difficulty === 'Easy' ? 'bg-success-950/20 text-success-400 border border-success-900/30' : 'bg-warning-950/20 text-warning-400 border border-warning-900/30'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-100">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Option Grid */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correct;
              const isWrong = isSelected && !isCorrect;

              let cardStyle = 'bg-slate-800 border-slate-700 hover:border-slate-600';
              if (isSelected && !isAnswerChecked) cardStyle = 'bg-primary-950/30 border-primary-500 text-primary-200';
              if (isAnswerChecked) {
                if (isCorrect) cardStyle = 'bg-success-950/30 border-success-500 text-success-200';
                else if (isWrong) cardStyle = 'bg-danger-950/30 border-danger-500 text-danger-200';
                else cardStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswerChecked}
                  className={`p-4 rounded-2xl border text-left flex items-center space-x-4 transition-all ${cardStyle}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black font-display text-sm ${
                    isSelected ? 'bg-primary-500 text-white shadow-glow-primary' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {letter}
                  </span>
                  <span className="font-semibold text-sm sm:text-base leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation reveal */}
          <AnimatePresence>
            {isAnswerChecked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border text-xs font-semibold leading-relaxed ${
                  selectedOption === currentQuestion.correct
                    ? 'bg-success-950/10 border-success-900/50 text-success-350'
                    : 'bg-danger-950/10 border-danger-900/50 text-danger-350'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2 font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>Explanation:</span>
                </div>
                <p>{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Interactive Bottom Feedback Panel */}
      <footer className={`p-4 sm:p-6 border-t ${
        isAnswerChecked
          ? selectedOption === currentQuestion.correct
            ? 'bg-success-950/20 border-success-900/40 text-success-200'
            : 'bg-danger-950/20 border-danger-900/40 text-danger-200'
          : 'bg-slate-950 border-slate-800'
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            {streakCount >= 3 && (
              <span className="flex items-center space-x-1.5 px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-black rounded-lg animate-bounce-subtle">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{streakCount}x Streak!</span>
              </span>
            )}
            {motivationText && (
              <p className="text-xs font-black text-yellow-400 tracking-wide uppercase italic">
                {motivationText}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {!isAnswerChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none text-white font-black rounded-xl text-sm transition-all shadow-md self-end"
              >
                CHECK ANSWER
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-success-600 to-emerald-500 hover:from-success-500 text-white font-black rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 self-end"
              >
                <span>{currentIndex === questions.length - 1 ? 'FINISH QUIZ' : 'NEXT QUESTION'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
