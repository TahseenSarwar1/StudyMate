import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockUser, dailyGoals as initialGoals } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dailyGoals, setDailyGoals] = useState(initialGoals);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Helper function to update user metadata in Supabase Auth and Profiles table
  const updateProfileInSupabase = useCallback(async (updatedUser) => {
    if (!isSupabaseConfigured) return;
    
    try {
      // 1. Try to update public.profiles table
      const { error: dbError } = await supabase
        .from('profiles')
        .update({
          name: updatedUser.name,
          class: updatedUser.class,
          board: updatedUser.board,
          level: updatedUser.level,
          xp: updatedUser.xp,
          xp_to_next_level: updatedUser.xpToNextLevel,
          total_xp_earned: updatedUser.totalXpEarned,
          streak: updatedUser.streak,
          longest_streak: updatedUser.longestStreak,
          coins: updatedUser.coins,
          quizzes_completed: updatedUser.quizzesCompleted,
          chapters_completed: updatedUser.chaptersCompleted,
          accuracy: updatedUser.accuracy,
          total_study_minutes: updatedUser.totalStudyMinutes,
          rank: updatedUser.rank,
          badges: updatedUser.badges,
        })
        .eq('id', updatedUser.id);
        
      if (dbError) {
        console.warn('Database profiles update failed (possibly schema not applied yet):', dbError.message);
      }

      // 2. Fallback: also keep user_metadata updated
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          name: updatedUser.name,
          grade: updatedUser.class,
          board: updatedUser.board,
          level: updatedUser.level,
          xp: updatedUser.xp,
          xpToNextLevel: updatedUser.xpToNextLevel,
          totalXpEarned: updatedUser.totalXpEarned,
          streak: updatedUser.streak,
          longestStreak: updatedUser.longestStreak,
          coins: updatedUser.coins,
          quizzesCompleted: updatedUser.quizzesCompleted,
          chaptersCompleted: updatedUser.chaptersCompleted,
          accuracy: updatedUser.accuracy,
          totalStudyMinutes: updatedUser.totalStudyMinutes,
          rank: updatedUser.rank,
          badges: updatedUser.badges,
        }
      });
      
      if (authError) {
        console.error('Error updating user metadata in Supabase:', authError.message);
      }
    } catch (err) {
      console.error('Failed to update user profile in Supabase:', err);
    }
  }, []);

  // Listen to Auth state change and load user session
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // If Supabase is not configured, we start as unauthenticated but allow mock sign-in
      setIsAuthenticated(false);
      setLoadingAuth(false);
      return;
    }

    const handleAuthSession = async (session) => {
      if (session) {
        const sbUser = session.user;
        const meta = sbUser.user_metadata || {};
        
        let profileData = null;
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sbUser.id)
            .maybeSingle();
            
          if (!error && data) {
            profileData = data;
          }
        } catch (err) {
          console.warn('Failed to query profiles table. Using user_metadata fallback.', err);
        }
        
        // Map user details, using defaults from mockUser for missing values
        const mergedUser = {
          id: sbUser.id,
          name: profileData?.name || meta.name || sbUser.email.split('@')[0],
          email: sbUser.email,
          avatar: profileData?.avatar || meta.avatar || null,
          class: parseInt(profileData?.class || meta.grade || meta.class || '10'),
          board: profileData?.board || meta.board || 'CBSE',
          level: profileData?.level || meta.level || 1,
          xp: profileData?.xp || meta.xp || 0,
          xpToNextLevel: profileData?.xp_to_next_level || meta.xpToNextLevel || 1000,
          totalXpEarned: profileData?.total_xp_earned || meta.totalXpEarned || 0,
          streak: profileData?.streak || meta.streak || 0,
          longestStreak: profileData?.longest_streak || meta.longestStreak || 0,
          coins: profileData?.coins || meta.coins || 0,
          joinedDate: profileData?.joined_date || sbUser.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          quizzesCompleted: profileData?.quizzes_completed || meta.quizzesCompleted || 0,
          chaptersCompleted: profileData?.chapters_completed || meta.chaptersCompleted || 0,
          accuracy: profileData?.accuracy || meta.accuracy || 100,
          totalStudyMinutes: profileData?.total_study_minutes || meta.totalStudyMinutes || 0,
          rank: profileData?.rank || meta.rank || 99,
          badges: profileData?.badges || meta.badges || [
            { id: 'b1', name: 'First Quiz', icon: '🎯', description: 'Complete your first quiz', earned: false, date: null },
            { id: 'b2', name: '7-Day Streak', icon: '🔥', description: 'Maintain a 7-day streak', earned: false, date: null },
            { id: 'b3', name: 'Perfect Score', icon: '💯', description: 'Score 100% on any quiz', earned: false, date: null },
            { id: 'b4', name: 'Math Wizard', icon: '🧙', description: 'Complete all Math chapters', earned: false, date: null },
            { id: 'b5', name: 'Science Star', icon: '⭐', description: 'Score 90%+ in Science', earned: false, date: null },
            { id: 'b6', name: 'Speed Demon', icon: '⚡', description: 'Finish a quiz under 2 min', earned: false, date: null },
            { id: 'b7', name: '30-Day Streak', icon: '🏆', description: 'Maintain a 30-day streak', earned: false, date: null },
            { id: 'b8', name: 'Night Owl', icon: '🦉', description: 'Study after 10 PM', earned: false, date: null },
            { id: 'b9', name: 'Chapter Master', icon: '📚', description: 'Complete 25 chapters', earned: false, date: null },
            { id: 'b10', name: 'Quiz Marathon', icon: '🏃', description: 'Complete 10 quizzes in one day', earned: false, date: null },
            { id: 'b11', name: 'Top 10', icon: '🥇', description: 'Reach global top 10', earned: false, date: null },
            { id: 'b12', name: 'Reviser Pro', icon: '🔄', description: 'Complete 50 revision sessions', earned: false, date: null },
          ]
        };
        
        setUser(mergedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoadingAuth(false);
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addXp = useCallback((amount) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        xp: prev.xp + amount,
        totalXpEarned: prev.totalXpEarned + amount,
      };
      updateProfileInSupabase(updated);
      return updated;
    });
    setXpGained(amount);
    setShowXpPopup(true);
    setTimeout(() => setShowXpPopup(false), 2500);
  }, [updateProfileInSupabase]);

  const incrementStreak = useCallback(() => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        streak: prev.streak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.streak + 1),
      };
      updateProfileInSupabase(updated);
      return updated;
    });
  }, [updateProfileInSupabase]);

  const completeQuiz = useCallback((score, xpEarned) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        xp: prev.xp + xpEarned,
        totalXpEarned: prev.totalXpEarned + xpEarned,
      };
      updateProfileInSupabase(updated);
      return updated;
    });
  }, [updateProfileInSupabase]);

  const signUp = useCallback(async (email, password, { name, grade, board }) => {
    if (!isSupabaseConfigured) {
      // Mock Sign Up Mode
      const mockNewUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 11),
        name,
        email,
        avatar: null,
        class: parseInt(grade),
        board,
        level: 1,
        xp: 0,
        xpToNextLevel: 1000,
        totalXpEarned: 0,
        streak: 1,
        longestStreak: 1,
        coins: 100,
        joinedDate: new Date().toISOString().split('T')[0],
        quizzesCompleted: 0,
        chaptersCompleted: 0,
        accuracy: 100,
        totalStudyMinutes: 0,
        rank: 99,
        badges: [
          { id: 'b1', name: 'First Quiz', icon: '🎯', description: 'Complete your first quiz', earned: false, date: null },
          { id: 'b2', name: '7-Day Streak', icon: '🔥', description: 'Maintain a 7-day streak', earned: false, date: null },
          { id: 'b3', name: 'Perfect Score', icon: '💯', description: 'Score 100% on any quiz', earned: false, date: null },
        ]
      };
      setUser(mockNewUser);
      setIsAuthenticated(true);
      return { data: { user: mockNewUser }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          grade,
          board,
          level: 1,
          xp: 0,
          xpToNextLevel: 1000,
          totalXpEarned: 0,
          streak: 1,
          longestStreak: 1,
          coins: 100,
          quizzesCompleted: 0,
          chaptersCompleted: 0,
          accuracy: 100,
          totalStudyMinutes: 0,
          rank: 99,
        }
      }
    });

    return { data, error };
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      // Mock Sign In Mode
      const userObj = {
        ...mockUser,
        email,
      };
      setUser(userObj);
      setIsAuthenticated(true);
      return { data: { user: userObj }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }, []);

  const signInWithSocial = useCallback(async (provider) => {
    if (!isSupabaseConfigured) {
      // Mock Social Mode
      const userObj = {
        ...mockUser,
        name: provider.charAt(0).toUpperCase() + provider.slice(1) + ' Student',
      };
      setUser(userObj);
      setIsAuthenticated(true);
      return { data: { user: userObj }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/dashboard',
      }
    });
    return { data, error };
  }, []);

  const logout = useCallback(async () => {
    if (!isSupabaseConfigured) {
      // Mock Sign Out Mode
      setUser(null);
      setIsAuthenticated(false);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const value = {
    user,
    setUser,
    dailyGoals,
    setDailyGoals,
    isAuthenticated,
    loadingAuth,
    isMockAuth: !isSupabaseConfigured,
    signUp,
    signIn,
    signInWithSocial,
    logout,
    addXp,
    incrementStreak,
    completeQuiz,
    showXpPopup,
    xpGained,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

