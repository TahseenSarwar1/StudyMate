import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { leaderboardData as mockGlobal, friendsLeaderboard as mockClass } from '../data/mockData';

// Map Supabase leaderboard row → UI shape
const toUIEntry = (row, currentUserId, rank) => ({
  rank,
  name: row.name || 'Student',
  xp: row.total_xp ?? 0,
  streak: row.streak ?? 0,
  level: row.level ?? 1,
  avatar: row.avatar || '🧑‍🎓',
  badge: rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🔹',
  trend: 'same',
  isCurrentUser: row.user_id === currentUserId,
});

export function useLeaderboard(filter = 'global') {
  const { user } = useApp();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (!isSupabaseConfigured) {
      setEntries(filter === 'global' ? mockGlobal : mockClass);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchLeaderboard() {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from('leaderboard')
          .select('user_id, name, total_xp, streak, level, avatar, board, class_no')
          .order('total_xp', { ascending: false })
          .limit(50);

        if (filter === 'class') {
          query = query
            .eq('board', user.board.toLowerCase())
            .eq('class_no', user.class);
        }

        const { data, error: dbError } = await query;
        if (dbError) throw dbError;

        if (!cancelled) {
          const mapped = (data || []).map((row, idx) => toUIEntry(row, user.id, idx + 1));
          setEntries(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('useLeaderboard error:', err.message);
          setError(err.message);
          setEntries(filter === 'global' ? mockGlobal : mockClass);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLeaderboard();
    return () => { cancelled = true; };
  }, [user?.id, user?.board, user?.class, filter]);

  return { entries, loading, error };
}
