import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProgressBar from '../components/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Sparkles, CheckCircle2, Clock, Play, Plus, X, AlertTriangle, Filter, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { revisionTasks as initialTasks, weakTopics } from '../data/mockData';

export default function RevisionPlanner() {
  const { addXp } = useApp();
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'overdue'
  const [selectedDay, setSelectedDay] = useState(null); // Filter by calendar day, e.g. '2026-05-23'
  const [isAddingTask, setIsAddingTask] = useState(false);

  // New task form states
  const [newChapter, setNewChapter] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newType, setNewType] = useState('Practice Quiz');
  const [newPriority, setNewPriority] = useState('medium');
  const [newTime, setNewTime] = useState('20 min');
  const [newDate, setNewDate] = useState('2026-05-23');

  // Subjects configuration
  const subjectConfig = {
    Mathematics: { emoji: '📐', border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', rawColor: 'blue' },
    Physics: { emoji: '⚡', border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700', rawColor: 'purple' },
    Chemistry: { emoji: '🧪', border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-700', rawColor: 'emerald' },
    Biology: { emoji: '🧬', border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-700', rawColor: 'rose' },
    English: { emoji: '📖', border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-700', rawColor: 'amber' },
    'Social Science': { emoji: '🌍', border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-700', rawColor: 'cyan' },
  };

  // Calendar dates (Mon May 18 to Sun May 24, 2026)
  const calendarWeek = [
    { dayName: 'Mon', dateStr: '2026-05-18', displayDate: '18' },
    { dayName: 'Tue', dateStr: '2026-05-19', displayDate: '19' },
    { dayName: 'Wed', dateStr: '2026-05-20', displayDate: '20' },
    { dayName: 'Thu', dateStr: '2026-05-21', displayDate: '21' },
    { dayName: 'Fri', dateStr: '2026-05-22', displayDate: '22', isToday: true },
    { dayName: 'Sat', dateStr: '2026-05-23', displayDate: '23' },
    { dayName: 'Sun', dateStr: '2026-05-24', displayDate: '24' },
  ];

  // Helper to count pending tasks for each calendar day
  const getTasksCountForDate = (dateStr) => {
    return tasks.filter(t => t.dueDate === dateStr && t.status !== 'completed').length;
  };

  // Filter tasks based on status filter and selected day
  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (selectedDay) {
      result = result.filter(t => t.dueDate === selectedDay);
    }

    if (filter === 'pending') {
      result = result.filter(t => t.status === 'pending');
    } else if (filter === 'completed') {
      result = result.filter(t => t.status === 'completed');
    } else if (filter === 'overdue') {
      result = result.filter(t => t.status === 'overdue');
    }

    return result;
  }, [tasks, filter, selectedDay]);

  const handleToggleTaskStatus = (id) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return;

    const currentTask = tasks[taskIndex];
    const isNowCompleted = currentTask.status !== 'completed';
    
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          return {
            ...t,
            status: isNowCompleted ? 'completed' : 'pending',
          };
        }
        return t;
      })
    );

    if (isNowCompleted) {
      // Award XP for completing revision!
      addXp(40);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newChapter.trim()) return;

    const newTask = {
      id: `rt_${Date.now()}`,
      subject: newSubject,
      chapter: newChapter,
      type: newType,
      status: 'pending',
      dueDate: newDate,
      priority: newPriority,
      estimatedTime: newTime,
    };

    setTasks(prev => [newTask, ...prev]);
    setNewChapter('');
    setIsAddingTask(false);
  };

  const handleQuickAddRecommendation = (topic) => {
    // Add revision task from smart recommendation
    const newTask = {
      id: `rt_${Date.now()}`,
      subject: topic.subject,
      chapter: topic.topic,
      type: 'Concept Review',
      status: 'pending',
      dueDate: '2026-05-23', // tomorrow
      priority: 'high',
      estimatedTime: '25 min',
    };

    setTasks(prev => [newTask, ...prev]);
    addXp(15); // small reward for planning revision
  };

  // Top weak topic for AI recommendation
  const topWeakTopic = weakTopics[2]; // Carbon Compounds Chemistry, 28% mastery

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 space-y-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black font-display tracking-tight text-slate-900 flex items-center space-x-2">
                <span>Smart Revision Planner</span>
              </h1>
              <p className="text-slate-500 font-medium text-sm mt-1">
                Schedule study sessions and review weak topics dynamically to score higher.
              </p>
            </div>
            <button
              onClick={() => setIsAddingTask(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-black rounded-xl text-sm transition-all shadow-md flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Revision</span>
            </button>
          </div>

          {/* AI Smart Recommendation Box */}
          {topWeakTopic && (
            <div className="glass-card bg-gradient-to-r from-purple-50/50 via-indigo-50/30 to-white p-6 border border-purple-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl shrink-0">
                  <Sparkles className="w-6 h-6 fill-purple-200" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-purple-600 uppercase bg-purple-100 px-2 py-0.5 rounded-full">AI Recommendation</span>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    Review {topWeakTopic.topic} ({topWeakTopic.subject})
                  </h3>
                  <p className="text-xs text-slate-555">
                    Your mastery is currently at <span className="text-danger-500 font-black">{topWeakTopic.mastery}%</span>. Revision can boost your exam score by up to 15%.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 w-full md:w-auto">
                <button
                  onClick={() => handleQuickAddRecommendation(topWeakTopic)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-755 text-white text-xs font-black rounded-xl transition-all shadow-sm flex-1 md:flex-none whitespace-nowrap"
                >
                  Add to Planner (+15 XP)
                </button>
              </div>
            </div>
          )}

          {/* Revision Weekly Calendar Grid Selector */}
          <div>
            <h3 className="text-sm font-bold text-surface-850 uppercase tracking-wider mb-4">Revision Calendar Schedule</h3>
            <div className="grid grid-cols-7 gap-3">
              {calendarWeek.map((day) => {
                const isSelected = selectedDay === day.dateStr;
                const count = getTasksCountForDate(day.dateStr);

                return (
                  <div
                    key={day.dateStr}
                    onClick={() => setSelectedDay(isSelected ? null : day.dateStr)}
                    className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-primary-500 to-indigo-600 text-white border-primary-500 shadow-glow-primary'
                        : day.isToday
                        ? 'bg-orange-50 border-orange-200 text-orange-850'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-primary-300'
                    }`}
                  >
                    <div className={`text-[10px] font-black uppercase ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {day.dayName}
                    </div>
                    <div className="text-lg font-black mt-1 font-display leading-none">
                      {day.displayDate}
                    </div>
                    
                    {/* Tasks count tag */}
                    <div className="mt-2 flex justify-center">
                      {count > 0 ? (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                          isSelected ? 'bg-white text-primary-600' : 'bg-primary-50 text-primary-600'
                        }`}>
                          {count} {count === 1 ? 'task' : 'tasks'}
                        </span>
                      ) : (
                        <span className={`text-[9px] font-semibold ${isSelected ? 'text-indigo-200' : 'text-slate-350'}`}>
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks Container */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black font-display text-slate-800">
                  {selectedDay ? `Tasks for ${selectedDay}` : 'All Revision Tasks'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Filter, track, and complete your custom scheduled sessions.</p>
              </div>

              {/* Filters */}
              <div className="flex overflow-x-auto gap-2 pb-1 sm:pb-0">
                {['all', 'pending', 'overdue', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black capitalize transition-all shrink-0 ${
                      filter === f
                        ? 'bg-slate-850 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks list */}
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => {
                    const subj = subjectConfig[task.subject] || { emoji: '📚', border: 'border-slate-200', bg: 'bg-slate-50', text: 'text-slate-700', rawColor: 'slate' };
                    
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 border rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 ${
                          task.status === 'completed'
                            ? 'bg-emerald-50/10 border-emerald-100 opacity-75'
                            : task.status === 'overdue'
                            ? 'bg-red-50/10 border-red-200'
                            : 'bg-white border-slate-200 hover:border-primary-100'
                        }`}
                      >
                        {/* Task information */}
                        <div className="flex items-center space-x-4 w-full md:w-auto">
                          <button
                            onClick={() => handleToggleTaskStatus(task.id)}
                            className={`p-1 rounded-lg transition-colors ${
                              task.status === 'completed' ? 'text-emerald-500' : 'text-slate-400 hover:text-primary-500'
                            }`}
                          >
                            {task.status === 'completed' ? (
                              <CheckSquare className="w-5 h-5 fill-emerald-50" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-base">{subj.emoji}</span>
                              <span className={`text-[10px] font-black uppercase ${subj.text}`}>
                                {task.subject}
                              </span>
                              <span className="text-slate-300 font-bold">•</span>
                              <span className="text-[10px] font-semibold text-slate-400">
                                {task.type}
                              </span>
                            </div>
                            <h4 className={`text-sm font-black text-slate-850 mt-1 ${
                              task.status === 'completed' ? 'line-through text-slate-400 font-medium' : ''
                            }`}>
                              {task.chapter}
                            </h4>
                          </div>
                        </div>

                        {/* Badges & Actions */}
                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 pt-3 md:pt-0 border-t border-slate-100 md:border-none">
                          <div className="flex items-center space-x-2 text-xs">
                            {/* Priority tag */}
                            <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                              task.priority === 'high'
                                ? 'bg-danger-50 text-danger-600 border border-danger-100'
                                : task.priority === 'medium'
                                ? 'bg-warning-50 text-warning-600 border border-warning-100'
                                : 'bg-blue-50 text-blue-600 border border-blue-100'
                            }`}>
                              {task.priority}
                            </span>

                            {/* Estimated time */}
                            <span className="text-slate-400 flex items-center space-x-1 font-semibold">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{task.estimatedTime}</span>
                            </span>

                            {/* Status or Due Date tag */}
                            {task.status === 'overdue' && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[9px] font-black uppercase flex items-center space-x-0.5">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Overdue</span>
                              </span>
                            )}
                            
                            <span className="text-slate-400 font-bold text-[10px]">Due {task.dueDate}</span>
                          </div>

                          {/* Quick Study Play Action */}
                          {task.status !== 'completed' && (
                            <button
                              onClick={() => handleToggleTaskStatus(task.id)}
                              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap"
                            >
                              <Play className="w-3.5 h-3.5 fill-slate-700 text-slate-700" />
                              <span>Review Now</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-slate-400 space-y-2">
                    <CalendarIcon className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="font-bold text-slate-500">No scheduled tasks found</p>
                    <p className="text-xs">Try selecting a different filter or schedule a new revision task.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      {/* Task Creation Modal */}
      <AnimatePresence>
        {isAddingTask && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-150">
                <h3 className="text-lg font-black font-display text-slate-900">Schedule Revision Task</h3>
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4">
                {/* Chapter Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-650 uppercase">Chapter/Topic Name</label>
                  <input
                    type="text"
                    required
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="e.g., Quadratic Equations, Electric Charge"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Subject selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650 uppercase">Subject</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                    >
                      {Object.keys(subjectConfig).map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Task Type selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650 uppercase">Task Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                    >
                      <option value="Practice Quiz">Practice Quiz</option>
                      <option value="Concept Review">Concept Review</option>
                      <option value="Flashcards">Flashcards</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Priority selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650 uppercase">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Est Time */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650 uppercase">Est. Duration</label>
                    <select
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                    >
                      <option value="15 min">15 min</option>
                      <option value="20 min">20 min</option>
                      <option value="25 min">25 min</option>
                      <option value="30 min">30 min</option>
                      <option value="45 min">45 min</option>
                    </select>
                  </div>

                  {/* Due Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650 uppercase">Due Date</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-black rounded-xl text-sm transition-all shadow-md"
                  >
                    Schedule Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
