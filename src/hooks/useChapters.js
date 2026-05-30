import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { chapters as mockChapters } from '../data/mockData';

// Map Supabase row + optional progress row → UI shape
const toUIChapter = (row, progressRow) => ({
  id: row.id,
  name: row.name,
  topics: row.topic_count ?? 5,
  difficulty: row.difficulty || 'Medium',
  estimatedTime: row.estimated_time || '45 min',
  progress: progressRow?.progress ?? 0,
  quizScore: progressRow?.best_score ?? null,
});

export function useChapters(subjectKey) {
  const { user } = useApp();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !subjectKey) return;

    if (!isSupabaseConfigured) {
      setChapters(mockChapters[subjectKey] || []);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchChapters() {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch chapters for this subject key
        const { data: chapterRows, error: chapErr } = await supabase
          .from('chapters')
          .select(`
            id,
            chapter_no,
            name,
            topic_count,
            difficulty,
            estimated_time,
            subjects!inner(subject_key)
          `)
          .eq('subjects.subject_key', subjectKey)
          .order('chapter_no');

        if (chapErr) throw chapErr;

        if (!chapterRows || chapterRows.length === 0) {
          if (!cancelled) {
            setChapters(mockChapters[subjectKey] || []);
            setLoading(false);
          }
          return;
        }

        const chapterIds = chapterRows.map((c) => c.id);

        // 2. Fetch student progress for these chapters
        const { data: progressRows, error: progErr } = await supabase
          .from('student_chapter_progress')
          .select('chapter_id, progress, best_score, last_attempted_at')
          .eq('user_id', user.id)
          .in('chapter_id', chapterIds);

        if (progErr) {
          console.warn('Progress fetch failed, defaulting to 0:', progErr.message);
        }

        const progressMap = {};
        (progressRows || []).forEach((p) => {
          progressMap[p.chapter_id] = p;
        });

        if (!cancelled) {
          setChapters(chapterRows.map((row) => toUIChapter(row, progressMap[row.id])));
        }
      } catch (err) {
        if (!cancelled) {
          console.error('useChapters error:', err.message);
          setError(err.message);
          setChapters(mockChapters[subjectKey] || []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchChapters();
    return () => { cancelled = true; };
  }, [user?.id, subjectKey]);

  return { chapters, loading, error };
}
