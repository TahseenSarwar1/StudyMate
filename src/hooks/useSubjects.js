import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { subjects as mockSubjects } from '../data/mockData';

// Map raw Supabase row → shape the UI expects
const toUISubject = (row) => ({
  id: row.subject_key,
  name: row.name,
  icon: row.icon || '📚',
  color: row.color || 'from-blue-500 to-indigo-600',
  bgColor: row.bg_color || 'bg-blue-50',
  textColor: row.text_color || 'text-blue-700',
  description: row.description || '',
  progress: row.progress ?? 0,
  totalChapters: row.total_chapters ?? 0,
  completedChapters: row.completed_chapters ?? 0,
});

export function useSubjects() {
  const { user } = useApp();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (!isSupabaseConfigured) {
      setSubjects(mockSubjects);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchSubjects() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('subjects')
          .select('*')
          .eq('board_id', user.board.toLowerCase())
          .eq('class_no', user.class)
          .order('name');

        if (dbError) throw dbError;
        if (!cancelled) {
          setSubjects((data || []).map(toUISubject));
        }
      } catch (err) {
        if (!cancelled) {
          console.error('useSubjects error:', err.message);
          setError(err.message);
          // Graceful fallback to mockData
          setSubjects(mockSubjects);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSubjects();
    return () => { cancelled = true; };
  }, [user?.id, user?.board, user?.class]);

  return { subjects, loading, error };
}
