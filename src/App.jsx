import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Landing from './pages/Landing';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import SubjectSelection from './pages/SubjectSelection';
import ChapterList from './pages/ChapterList';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';
import WeakTopics from './pages/WeakTopics';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import StreakRewards from './pages/StreakRewards';
import RevisionPlanner from './pages/RevisionPlanner';
import XpPopup from './components/XpPopup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <Router>
        <XpPopup />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><SubjectSelection /></ProtectedRoute>} />
          <Route path="/subjects/:subjectId" element={<ProtectedRoute><ChapterList /></ProtectedRoute>} />
          <Route path="/quiz/:subjectId/:chapterId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/quiz-result" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
          <Route path="/weak-topics" element={<ProtectedRoute><WeakTopics /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/streak" element={<ProtectedRoute><StreakRewards /></ProtectedRoute>} />
          <Route path="/revision" element={<ProtectedRoute><RevisionPlanner /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
