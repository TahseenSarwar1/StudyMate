import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

const BOARDS = ['CBSE', 'ICSE'];
const CLASSES = [6, 7, 8, 9, 10];

export default function Onboarding() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [board, setBoard] = useState('');
  const [classNo, setClassNo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!board || !classNo) return;
    setLoading(true);

    // Save to Supabase auth metadata
    await supabase.auth.updateUser({
      data: {
        board: board,
        grade: classNo,
        onboarding_complete: true,
      }
    });

    // Update local user state immediately
    setUser(prev => ({
      ...prev,
      board: board,
      class: parseInt(classNo),
      onboarding_complete: true,
    }));

    setLoading(false);
    navigate('/subjects');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to StudyMate! 🎓</h1>
        <p className="text-gray-500 mb-8">Tell us about yourself so we can show you the right content.</p>

        {/* Board Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select your Board</label>
          <div className="flex gap-3">
            {BOARDS.map(b => (
              <button
                key={b}
                onClick={() => setBoard(b)}
                className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${
                  board === b
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Class Selection */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select your Class</label>
          <div className="flex gap-2 flex-wrap">
            {CLASSES.map(c => (
              <button
                key={c}
                onClick={() => setClassNo(String(c))}
                className={`w-16 py-3 rounded-xl border-2 font-semibold transition-all ${
                  classNo === String(c)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!board || !classNo || loading}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all"
        >
          {loading ? 'Saving...' : "Let's Go! 🚀"}
        </button>
      </div>
    </div>
  );
}