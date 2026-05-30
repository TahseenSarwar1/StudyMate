import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { quizQuestions as mockQuestions } from '../data/mockData';

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Map Supabase row → shape the Quiz UI expects
const toUIQuestion = (row) => ({
  id: row.id,
  question: row.question_text,
  options: [row.option_a, row.option_b, row.option_c, row.option_d],
  correct: row.correct_index,          // 0-indexed integer
  explanation: row.explanation || '',
  topic: row.topic || '',
  difficulty: row.difficulty || 'Medium',
});

export function useQuestions(chapterId) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chapterId) return;

    if (!isSupabaseConfigured) {
      setQuestions(shuffleArray(mockQuestions));
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchQuestions() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('questions')
          .select('id, question_text, option_a, option_b, option_c, option_d, correct_index, explanation, topic, difficulty')
          .eq('chapter_id', chapterId);

        if (dbError) throw dbError;

        if (!cancelled) {
          const mapped = (data || []).map(toUIQuestion);
          setQuestions(mapped.length > 0 ? shuffleArray(mapped) : shuffleArray(mockQuestions));
        }
      } catch (err) {
        if (!cancelled) {
          console.error('useQuestions error:', err.message);
          setError(err.message);
          setQuestions(shuffleArray(mockQuestions));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchQuestions();
    return () => { cancelled = true; };
  }, [chapterId]);

  return { questions, loading, error };
}
