import { createContext, useContext, useState, useCallback } from 'react';
import { mockUser, dailyGoals as initialGoals } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(mockUser);
  const [dailyGoals, setDailyGoals] = useState(initialGoals);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const addXp = useCallback((amount) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + amount,
      totalXpEarned: prev.totalXpEarned + amount,
    }));
    setXpGained(amount);
    setShowXpPopup(true);
    setTimeout(() => setShowXpPopup(false), 2500);
  }, []);

  const incrementStreak = useCallback(() => {
    setUser(prev => ({
      ...prev,
      streak: prev.streak + 1,
      longestStreak: Math.max(prev.longestStreak, prev.streak + 1),
    }));
  }, []);

  const completeQuiz = useCallback((score, xpEarned) => {
    setUser(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      xp: prev.xp + xpEarned,
      totalXpEarned: prev.totalXpEarned + xpEarned,
    }));
  }, []);

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    setUser,
    dailyGoals,
    setDailyGoals,
    isAuthenticated,
    login,
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
