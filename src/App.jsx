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

function App() {
  return (
    <AppProvider>
      <Router>
        <XpPopup />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<SubjectSelection />} />
          <Route path="/subjects/:subjectId" element={<ChapterList />} />
          <Route path="/quiz/:subjectId/:chapterId" element={<Quiz />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/weak-topics" element={<WeakTopics />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/streak" element={<StreakRewards />} />
          <Route path="/revision" element={<RevisionPlanner />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
