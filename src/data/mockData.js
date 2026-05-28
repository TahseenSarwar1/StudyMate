export const mockUser = {
  id: 'usr_001',
  name: 'Aarav Sharma',
  email: 'aarav@studymate.com',
  avatar: null,
  class: 10,
  board: 'CBSE',
  level: 12,
  xp: 4850,
  xpToNextLevel: 5500,
  totalXpEarned: 24850,
  streak: 7,
  longestStreak: 23,
  coins: 1240,
  joinedDate: '2025-08-15',
  quizzesCompleted: 142,
  chaptersCompleted: 28,
  accuracy: 76,
  totalStudyMinutes: 3240,
  rank: 15,
  badges: [
    { id: 'b1', name: 'First Quiz', icon: '🎯', description: 'Complete your first quiz', earned: true, date: '2025-08-16' },
    { id: 'b2', name: '7-Day Streak', icon: '🔥', description: 'Maintain a 7-day streak', earned: true, date: '2025-09-02' },
    { id: 'b3', name: 'Perfect Score', icon: '💯', description: 'Score 100% on any quiz', earned: true, date: '2025-09-10' },
    { id: 'b4', name: 'Math Wizard', icon: '🧙', description: 'Complete all Math chapters', earned: false, date: null },
    { id: 'b5', name: 'Science Star', icon: '⭐', description: 'Score 90%+ in Science', earned: true, date: '2025-10-05' },
    { id: 'b6', name: 'Speed Demon', icon: '⚡', description: 'Finish a quiz under 2 min', earned: true, date: '2025-10-12' },
    { id: 'b7', name: '30-Day Streak', icon: '🏆', description: 'Maintain a 30-day streak', earned: false, date: null },
    { id: 'b8', name: 'Night Owl', icon: '🦉', description: 'Study after 10 PM', earned: true, date: '2025-08-20' },
    { id: 'b9', name: 'Chapter Master', icon: '📚', description: 'Complete 25 chapters', earned: true, date: '2026-01-15' },
    { id: 'b10', name: 'Quiz Marathon', icon: '🏃', description: 'Complete 10 quizzes in one day', earned: false, date: null },
    { id: 'b11', name: 'Top 10', icon: '🥇', description: 'Reach global top 10', earned: false, date: null },
    { id: 'b12', name: 'Reviser Pro', icon: '🔄', description: 'Complete 50 revision sessions', earned: false, date: null },
  ],
};

export const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    progress: 65,
    totalChapters: 15,
    completedChapters: 10,
    description: 'Algebra, Geometry, Trigonometry & more',
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    progress: 45,
    totalChapters: 14,
    completedChapters: 6,
    description: 'Motion, Forces, Energy & Electricity',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    progress: 55,
    totalChapters: 16,
    completedChapters: 9,
    description: 'Elements, Reactions & Organic Chemistry',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    progress: 38,
    totalChapters: 15,
    completedChapters: 6,
    description: 'Life Processes, Genetics & Ecology',
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    progress: 72,
    totalChapters: 12,
    completedChapters: 9,
    description: 'Grammar, Literature & Writing',
  },
  {
    id: 'sst',
    name: 'Social Science',
    icon: '🌍',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    progress: 30,
    totalChapters: 20,
    completedChapters: 6,
    description: 'History, Geography, Civics & Economics',
  },
];

export const chapters = {
  math: [
    { id: 'ch1', name: 'Real Numbers', topics: 8, progress: 100, quizScore: 92, difficulty: 'Easy', estimatedTime: '45 min' },
    { id: 'ch2', name: 'Polynomials', topics: 6, progress: 100, quizScore: 88, difficulty: 'Medium', estimatedTime: '50 min' },
    { id: 'ch3', name: 'Pair of Linear Equations', topics: 10, progress: 100, quizScore: 75, difficulty: 'Medium', estimatedTime: '60 min' },
    { id: 'ch4', name: 'Quadratic Equations', topics: 7, progress: 80, quizScore: 70, difficulty: 'Hard', estimatedTime: '55 min' },
    { id: 'ch5', name: 'Arithmetic Progressions', topics: 6, progress: 60, quizScore: null, difficulty: 'Medium', estimatedTime: '45 min' },
    { id: 'ch6', name: 'Triangles', topics: 9, progress: 45, quizScore: null, difficulty: 'Medium', estimatedTime: '50 min' },
    { id: 'ch7', name: 'Coordinate Geometry', topics: 5, progress: 30, quizScore: null, difficulty: 'Easy', estimatedTime: '40 min' },
    { id: 'ch8', name: 'Trigonometry', topics: 8, progress: 20, quizScore: null, difficulty: 'Hard', estimatedTime: '60 min' },
    { id: 'ch9', name: 'Circles', topics: 6, progress: 0, quizScore: null, difficulty: 'Medium', estimatedTime: '45 min' },
    { id: 'ch10', name: 'Areas Related to Circles', topics: 5, progress: 0, quizScore: null, difficulty: 'Easy', estimatedTime: '35 min' },
    { id: 'ch11', name: 'Surface Areas & Volumes', topics: 7, progress: 0, quizScore: null, difficulty: 'Medium', estimatedTime: '50 min' },
    { id: 'ch12', name: 'Statistics', topics: 6, progress: 0, quizScore: null, difficulty: 'Easy', estimatedTime: '40 min' },
    { id: 'ch13', name: 'Probability', topics: 5, progress: 0, quizScore: null, difficulty: 'Easy', estimatedTime: '35 min' },
  ],
  physics: [
    { id: 'ch1', name: 'Light – Reflection & Refraction', topics: 10, progress: 100, quizScore: 85, difficulty: 'Medium', estimatedTime: '55 min' },
    { id: 'ch2', name: 'Human Eye & Colourful World', topics: 6, progress: 100, quizScore: 90, difficulty: 'Easy', estimatedTime: '40 min' },
    { id: 'ch3', name: 'Electricity', topics: 8, progress: 75, quizScore: 68, difficulty: 'Hard', estimatedTime: '60 min' },
    { id: 'ch4', name: 'Magnetic Effects of Current', topics: 7, progress: 40, quizScore: null, difficulty: 'Hard', estimatedTime: '55 min' },
    { id: 'ch5', name: 'Sources of Energy', topics: 5, progress: 0, quizScore: null, difficulty: 'Easy', estimatedTime: '35 min' },
  ],
  chemistry: [
    { id: 'ch1', name: 'Chemical Reactions & Equations', topics: 8, progress: 100, quizScore: 95, difficulty: 'Easy', estimatedTime: '45 min' },
    { id: 'ch2', name: 'Acids, Bases & Salts', topics: 10, progress: 100, quizScore: 82, difficulty: 'Medium', estimatedTime: '55 min' },
    { id: 'ch3', name: 'Metals & Non-metals', topics: 9, progress: 80, quizScore: 78, difficulty: 'Medium', estimatedTime: '50 min' },
    { id: 'ch4', name: 'Carbon & its Compounds', topics: 12, progress: 50, quizScore: null, difficulty: 'Hard', estimatedTime: '65 min' },
    { id: 'ch5', name: 'Periodic Classification', topics: 6, progress: 20, quizScore: null, difficulty: 'Medium', estimatedTime: '45 min' },
  ],
  biology: [
    { id: 'ch1', name: 'Life Processes', topics: 12, progress: 100, quizScore: 88, difficulty: 'Hard', estimatedTime: '65 min' },
    { id: 'ch2', name: 'Control & Coordination', topics: 8, progress: 70, quizScore: 72, difficulty: 'Hard', estimatedTime: '55 min' },
    { id: 'ch3', name: 'How Organisms Reproduce', topics: 7, progress: 40, quizScore: null, difficulty: 'Medium', estimatedTime: '50 min' },
    { id: 'ch4', name: 'Heredity & Evolution', topics: 9, progress: 15, quizScore: null, difficulty: 'Hard', estimatedTime: '60 min' },
    { id: 'ch5', name: 'Our Environment', topics: 5, progress: 0, quizScore: null, difficulty: 'Easy', estimatedTime: '35 min' },
  ],
  english: [
    { id: 'ch1', name: 'A Letter to God', topics: 5, progress: 100, quizScore: 94, difficulty: 'Easy', estimatedTime: '30 min' },
    { id: 'ch2', name: 'Nelson Mandela', topics: 6, progress: 100, quizScore: 88, difficulty: 'Medium', estimatedTime: '40 min' },
    { id: 'ch3', name: 'Two Stories about Flying', topics: 5, progress: 80, quizScore: 80, difficulty: 'Easy', estimatedTime: '35 min' },
    { id: 'ch4', name: 'From the Diary of Anne Frank', topics: 6, progress: 50, quizScore: null, difficulty: 'Medium', estimatedTime: '40 min' },
  ],
  sst: [
    { id: 'ch1', name: 'Rise of Nationalism in Europe', topics: 8, progress: 100, quizScore: 78, difficulty: 'Medium', estimatedTime: '55 min' },
    { id: 'ch2', name: 'Resources & Development', topics: 7, progress: 60, quizScore: null, difficulty: 'Easy', estimatedTime: '45 min' },
    { id: 'ch3', name: 'Power Sharing', topics: 5, progress: 30, quizScore: null, difficulty: 'Easy', estimatedTime: '35 min' },
    { id: 'ch4', name: 'Development', topics: 6, progress: 0, quizScore: null, difficulty: 'Medium', estimatedTime: '40 min' },
  ],
};

export const quizQuestions = [
  {
    id: 'q1',
    question: 'If the HCF of 65 and 117 is expressible in the form 65m – 117, then the value of m is:',
    options: ['4', '2', '1', '3'],
    correct: 1,
    explanation: 'HCF(65, 117) = 13. So, 65m – 117 = 13 → 65m = 130 → m = 2.',
    topic: 'Real Numbers',
    difficulty: 'Medium',
  },
  {
    id: 'q2',
    question: 'The zeroes of the polynomial x² – 3 are:',
    options: ['2 and –2', '√3 and –√3', '3 and –3', '√2 and –√2'],
    correct: 1,
    explanation: 'x² – 3 = 0 → x² = 3 → x = ±√3.',
    topic: 'Polynomials',
    difficulty: 'Easy',
  },
  {
    id: 'q3',
    question: 'The pair of equations x + 2y = 5 and 3x + 6y = 15 has:',
    options: ['Unique solution', 'No solution', 'Infinitely many solutions', 'Exactly two solutions'],
    correct: 2,
    explanation: 'The second equation is 3 times the first. They represent the same line, so infinitely many solutions.',
    topic: 'Linear Equations',
    difficulty: 'Medium',
  },
  {
    id: 'q4',
    question: 'Which of the following is a quadratic equation?',
    options: ['x² + 2x + 1 = (4 – x)² + 3', '–2x² = (5 – x)(2x – 2/5)', 'x³ – x² = (x – 1)³', '(k + 1)x² + 3x = 7 where k = –1'],
    correct: 1,
    explanation: 'Expanding –2x² = (5 – x)(2x – 2/5) gives a quadratic equation in standard form.',
    topic: 'Quadratic Equations',
    difficulty: 'Hard',
  },
  {
    id: 'q5',
    question: 'The first term of an AP is 5 and the common difference is 2. The 10th term is:',
    options: ['21', '23', '25', '19'],
    correct: 1,
    explanation: 'a₁₀ = 5 + (10-1)×2 = 5 + 18 = 23.',
    topic: 'Arithmetic Progressions',
    difficulty: 'Easy',
  },
  {
    id: 'q6',
    question: 'In a triangle ABC, if AB = 6, BC = 8 and AC = 10, then angle B is:',
    options: ['45°', '60°', '90°', '120°'],
    correct: 2,
    explanation: '6² + 8² = 36 + 64 = 100 = 10². By Pythagoras theorem, angle B = 90°.',
    topic: 'Triangles',
    difficulty: 'Medium',
  },
  {
    id: 'q7',
    question: 'The pH of a solution is 3. What is the H⁺ ion concentration?',
    options: ['10⁻¹ M', '10⁻² M', '10⁻³ M', '10⁻⁴ M'],
    correct: 2,
    explanation: 'pH = -log[H⁺], so [H⁺] = 10⁻ᵖᴴ = 10⁻³ M.',
    topic: 'Acids, Bases & Salts',
    difficulty: 'Easy',
  },
  {
    id: 'q8',
    question: 'Which part of the brain maintains posture and equilibrium of the body?',
    options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Pons'],
    correct: 1,
    explanation: 'The cerebellum is responsible for coordination of voluntary movements, balance and posture.',
    topic: 'Control & Coordination',
    difficulty: 'Medium',
  },
  {
    id: 'q9',
    question: 'The image formed by a convex mirror is always:',
    options: ['Real and inverted', 'Virtual and erect', 'Real and erect', 'Virtual and inverted'],
    correct: 1,
    explanation: 'A convex mirror always forms a virtual, erect and diminished image.',
    topic: 'Light',
    difficulty: 'Easy',
  },
  {
    id: 'q10',
    question: 'The SI unit of electric current is:',
    options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
    correct: 2,
    explanation: 'Electric current is measured in Amperes (A).',
    topic: 'Electricity',
    difficulty: 'Easy',
  },
];

export const leaderboardData = [
  { rank: 1, name: 'Priya Patel', xp: 32450, avatar: '👩‍🎓', streak: 45, level: 24, badge: '🏆', trend: 'up' },
  { rank: 2, name: 'Rohan Kumar', xp: 31200, avatar: '👨‍🎓', streak: 38, level: 23, badge: '🥈', trend: 'up' },
  { rank: 3, name: 'Ananya Singh', xp: 29800, avatar: '👩‍💻', streak: 30, level: 22, badge: '🥉', trend: 'down' },
  { rank: 4, name: 'Vikram Reddy', xp: 28500, avatar: '🧑‍🔬', streak: 28, level: 21, badge: '⭐', trend: 'up' },
  { rank: 5, name: 'Meera Iyer', xp: 27900, avatar: '👩‍🏫', streak: 25, level: 20, badge: '⭐', trend: 'same' },
  { rank: 6, name: 'Arjun Nair', xp: 27100, avatar: '🧑‍💻', streak: 22, level: 20, badge: '⭐', trend: 'up' },
  { rank: 7, name: 'Kavya Menon', xp: 26500, avatar: '👩‍🎤', streak: 20, level: 19, badge: '⭐', trend: 'down' },
  { rank: 8, name: 'Aditya Joshi', xp: 26000, avatar: '🧑‍🎓', streak: 19, level: 19, badge: '⭐', trend: 'up' },
  { rank: 9, name: 'Ishaan Gupta', xp: 25600, avatar: '👨‍💼', streak: 18, level: 18, badge: '⭐', trend: 'same' },
  { rank: 10, name: 'Shreya Das', xp: 25200, avatar: '👩‍💼', streak: 17, level: 18, badge: '⭐', trend: 'down' },
  { rank: 11, name: 'Rahul Verma', xp: 25000, avatar: '🧑‍🔧', streak: 16, level: 18, badge: '🔹', trend: 'up' },
  { rank: 12, name: 'Neha Sharma', xp: 24900, avatar: '👩‍🔬', streak: 15, level: 17, badge: '🔹', trend: 'up' },
  { rank: 13, name: 'Karthik Rao', xp: 24800, avatar: '🧑‍🎨', streak: 14, level: 17, badge: '🔹', trend: 'same' },
  { rank: 14, name: 'Divya Mishra', xp: 24700, avatar: '👩‍⚕️', streak: 12, level: 17, badge: '🔹', trend: 'down' },
  { rank: 15, name: 'Aarav Sharma', xp: 24850, avatar: '🧑‍🚀', streak: 7, level: 12, badge: '🔹', trend: 'up', isCurrentUser: true },
  { rank: 16, name: 'Tanvi Kapoor', xp: 24200, avatar: '👩‍🎓', streak: 10, level: 16, badge: '🔹', trend: 'up' },
  { rank: 17, name: 'Siddharth Bansal', xp: 23800, avatar: '🧑‍💼', streak: 9, level: 16, badge: '🔹', trend: 'down' },
  { rank: 18, name: 'Pooja Agarwal', xp: 23500, avatar: '👩‍🏫', streak: 8, level: 15, badge: '🔹', trend: 'same' },
  { rank: 19, name: 'Varun Saxena', xp: 23200, avatar: '🧑‍🔬', streak: 7, level: 15, badge: '🔹', trend: 'up' },
  { rank: 20, name: 'Riya Choudhary', xp: 22900, avatar: '👩‍💻', streak: 6, level: 14, badge: '🔹', trend: 'down' },
];

export const friendsLeaderboard = [
  { rank: 1, name: 'Rohan Kumar', xp: 31200, avatar: '👨‍🎓', streak: 38, level: 23, trend: 'up' },
  { rank: 2, name: 'Ananya Singh', xp: 29800, avatar: '👩‍💻', streak: 30, level: 22, trend: 'up' },
  { rank: 3, name: 'Aarav Sharma', xp: 24850, avatar: '🧑‍🚀', streak: 7, level: 12, trend: 'up', isCurrentUser: true },
  { rank: 4, name: 'Kavya Menon', xp: 22100, avatar: '👩‍🎤', streak: 14, level: 16, trend: 'down' },
  { rank: 5, name: 'Ishaan Gupta', xp: 19600, avatar: '👨‍💼', streak: 11, level: 14, trend: 'same' },
];

export const weakTopics = [
  { id: 'wt1', subject: 'Mathematics', topic: 'Quadratic Equations', mastery: 35, attempts: 8, lastAttempt: '2026-05-20', trend: 'improving', color: 'from-blue-500 to-indigo-600' },
  { id: 'wt2', subject: 'Physics', topic: 'Electricity', mastery: 42, attempts: 6, lastAttempt: '2026-05-18', trend: 'stable', color: 'from-purple-500 to-violet-600' },
  { id: 'wt3', subject: 'Chemistry', topic: 'Carbon Compounds', mastery: 28, attempts: 4, lastAttempt: '2026-05-19', trend: 'declining', color: 'from-emerald-500 to-teal-600' },
  { id: 'wt4', subject: 'Biology', topic: 'Heredity & Evolution', mastery: 50, attempts: 5, lastAttempt: '2026-05-21', trend: 'improving', color: 'from-rose-500 to-pink-600' },
  { id: 'wt5', subject: 'Mathematics', topic: 'Trigonometry', mastery: 38, attempts: 7, lastAttempt: '2026-05-17', trend: 'stable', color: 'from-blue-500 to-indigo-600' },
  { id: 'wt6', subject: 'Physics', topic: 'Magnetic Effects', mastery: 45, attempts: 3, lastAttempt: '2026-05-16', trend: 'improving', color: 'from-purple-500 to-violet-600' },
];

export const recentQuizzes = [
  { id: 'rq1', subject: 'Mathematics', chapter: 'Real Numbers', score: 92, totalQuestions: 10, date: '2026-05-22', xpEarned: 120 },
  { id: 'rq2', subject: 'Physics', chapter: 'Light', score: 85, totalQuestions: 10, date: '2026-05-21', xpEarned: 100 },
  { id: 'rq3', subject: 'Chemistry', chapter: 'Chemical Reactions', score: 95, totalQuestions: 10, date: '2026-05-20', xpEarned: 130 },
  { id: 'rq4', subject: 'Biology', chapter: 'Life Processes', score: 78, totalQuestions: 10, date: '2026-05-19', xpEarned: 90 },
  { id: 'rq5', subject: 'Mathematics', chapter: 'Polynomials', score: 88, totalQuestions: 10, date: '2026-05-18', xpEarned: 110 },
];

export const performanceData = [
  { month: 'Jan', score: 65, quizzes: 12 },
  { month: 'Feb', score: 70, quizzes: 15 },
  { month: 'Mar', score: 68, quizzes: 18 },
  { month: 'Apr', score: 75, quizzes: 22 },
  { month: 'May', score: 82, quizzes: 20 },
  { month: 'Jun', score: 78, quizzes: 16 },
  { month: 'Jul', score: 85, quizzes: 25 },
  { month: 'Aug', score: 80, quizzes: 19 },
  { month: 'Sep', score: 88, quizzes: 24 },
  { month: 'Oct', score: 84, quizzes: 21 },
  { month: 'Nov', score: 90, quizzes: 28 },
  { month: 'Dec', score: 76, quizzes: 14 },
];

export const subjectPerformance = [
  { subject: 'Math', score: 78, fullMark: 100 },
  { subject: 'Physics', score: 72, fullMark: 100 },
  { subject: 'Chemistry', score: 85, fullMark: 100 },
  { subject: 'Biology', score: 68, fullMark: 100 },
  { subject: 'English', score: 88, fullMark: 100 },
  { subject: 'SST', score: 65, fullMark: 100 },
];

export const studyHeatmapData = (() => {
  const data = [];
  const today = new Date(2026, 4, 22);
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    let intensity = 0;
    if (i < 7) {
      intensity = Math.floor(Math.random() * 3) + 2;
    } else if (dayOfWeek !== 0) {
      intensity = Math.floor(Math.random() * 5);
    }
    data.push({
      date: date.toISOString().split('T')[0],
      count: intensity,
    });
  }
  return data;
})();

export const revisionTasks = [
  { id: 'rt1', subject: 'Mathematics', chapter: 'Quadratic Equations', type: 'Practice Quiz', status: 'pending', dueDate: '2026-05-23', priority: 'high', estimatedTime: '20 min' },
  { id: 'rt2', subject: 'Physics', chapter: 'Electricity', type: 'Concept Review', status: 'pending', dueDate: '2026-05-23', priority: 'high', estimatedTime: '30 min' },
  { id: 'rt3', subject: 'Chemistry', chapter: 'Carbon Compounds', type: 'Practice Quiz', status: 'completed', dueDate: '2026-05-22', priority: 'medium', estimatedTime: '25 min' },
  { id: 'rt4', subject: 'Biology', chapter: 'Heredity & Evolution', type: 'Flashcards', status: 'pending', dueDate: '2026-05-24', priority: 'medium', estimatedTime: '15 min' },
  { id: 'rt5', subject: 'Mathematics', chapter: 'Trigonometry', type: 'Practice Quiz', status: 'pending', dueDate: '2026-05-24', priority: 'low', estimatedTime: '20 min' },
  { id: 'rt6', subject: 'Physics', chapter: 'Magnetic Effects', type: 'Concept Review', status: 'overdue', dueDate: '2026-05-21', priority: 'high', estimatedTime: '30 min' },
  { id: 'rt7', subject: 'Chemistry', chapter: 'Periodic Classification', type: 'Practice Quiz', status: 'pending', dueDate: '2026-05-25', priority: 'low', estimatedTime: '20 min' },
  { id: 'rt8', subject: 'Mathematics', chapter: 'Coordinate Geometry', type: 'Concept Review', status: 'completed', dueDate: '2026-05-20', priority: 'medium', estimatedTime: '25 min' },
];

export const dailyGoals = [
  { id: 'dg1', title: 'Complete 3 quizzes', current: 2, target: 3, xpReward: 50, icon: '🎯' },
  { id: 'dg2', title: 'Study for 30 minutes', current: 22, target: 30, xpReward: 30, icon: '⏱️' },
  { id: 'dg3', title: 'Review 2 weak topics', current: 1, target: 2, xpReward: 40, icon: '🔄' },
  { id: 'dg4', title: 'Earn 200 XP', current: 150, target: 200, xpReward: 25, icon: '⚡' },
];

export const streakRewards = [
  { day: 1, reward: '10 XP', claimed: true, icon: '⭐' },
  { day: 2, reward: '20 XP', claimed: true, icon: '⭐' },
  { day: 3, reward: '30 XP', claimed: true, icon: '🌟' },
  { day: 4, reward: '50 XP', claimed: true, icon: '🌟' },
  { day: 5, reward: '75 XP', claimed: true, icon: '💫' },
  { day: 6, reward: '100 XP', claimed: true, icon: '💫' },
  { day: 7, reward: 'Mystery Box', claimed: false, icon: '🎁', special: true },
  { day: 14, reward: 'Rare Badge', claimed: false, icon: '🏅', special: true },
  { day: 21, reward: '500 XP', claimed: false, icon: '💎', special: true },
  { day: 30, reward: 'Legendary Badge', claimed: false, icon: '🏆', special: true },
];

export const motivationalMessages = [
  "You're on fire! 🔥 Keep going!",
  "Amazing streak! You're unstoppable! 💪",
  "Learning machine! 🤖 One more?",
  "Brilliant answer! You've got this! 🌟",
  "Perfect score incoming! ⚡",
  "Your brain is growing stronger! 🧠",
  "Champions never quit! 🏆",
  "You just leveled up your knowledge! 📚",
];
