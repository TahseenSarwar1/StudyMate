import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Plus, Sparkles, ChevronDown, Check, X, AlertCircle,
  Loader2, Database, FileQuestion, Bot
} from 'lucide-react';

// Hardcoded admin email list
const ADMIN_EMAILS = [
  'tahseensarwar115@gmail.com',
  // Add more admin emails here
];

const BOARDS = ['cbse', 'icse'];
const CLASSES = [6, 7, 8, 9, 10];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Toast notification component
function Toast({ toast, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-bold border ${
        toast.type === 'success'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-red-50 text-red-700 border-red-200'
      }`}
    >
      {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span>{toast.message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Section wrapper card
function AdminSection({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center space-x-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary-600" />
        </div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// Reusable field components
function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all";
const selectCls = inputCls + " appearance-none cursor-pointer";

export default function Admin() {
  const { user } = useApp();
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => setToast({ message, type });

  // ── Access guard ──────────────────────────────────────────────
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    if (user && !isAdmin) navigate('/', { replace: true });
  }, [user, isAdmin]);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-black text-slate-800">Access Denied</h1>
          <p className="text-sm font-medium text-slate-500">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-none">StudyMate Admin</h1>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Content Management Panel</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-xs font-black text-slate-600 hover:text-primary-600 bg-slate-100 hover:bg-primary-50 rounded-xl border border-slate-200 transition-all"
          >
            ← Back to App
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <AddSubjectSection showToast={showToast} />
        <AddChapterSection showToast={showToast} />
        <AddQuestionSection showToast={showToast} />
        <AIGenerateSection showToast={showToast} />
      </main>

      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ── Section A: Add Subject ────────────────────────────────────────
function AddSubjectSection({ showToast }) {
  const [form, setForm] = useState({
    board: 'cbse', class_no: 10, subject_key: '', name: '',
    icon: '📚', description: '',
    color: 'from-blue-500 to-indigo-600',
    bg_color: 'bg-blue-50', text_color: 'text-blue-700',
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject_key || !form.name) return showToast('Subject key and name are required', 'error');
    setLoading(true);
    try {
      const { error } = await supabase.from('subjects').insert({
        board: form.board,
        class_no: Number(form.class_no),
        subject_key: form.subject_key.toLowerCase().trim(),
        name: form.name.trim(),
        icon: form.icon,
        description: form.description.trim(),
        color: form.color,
        bg_color: form.bg_color,
        text_color: form.text_color,
      });
      if (error) throw error;
      showToast(`Subject "${form.name}" added successfully!`);
      setForm(p => ({ ...p, subject_key: '', name: '', description: '' }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminSection icon={BookOpen} title="Add Subject">
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <Field label="Board">
          <select className={selectCls} value={form.board} onChange={e => set('board', e.target.value)}>
            {BOARDS.map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
          </select>
        </Field>
        <Field label="Class">
          <select className={selectCls} value={form.class_no} onChange={e => set('class_no', e.target.value)}>
            {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
        </Field>
        <Field label="Subject Key (unique slug, e.g. 'math')">
          <input className={inputCls} value={form.subject_key} onChange={e => set('subject_key', e.target.value)} placeholder="math" required />
        </Field>
        <Field label="Display Name">
          <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Mathematics" required />
        </Field>
        <Field label="Icon (emoji)">
          <input className={inputCls} value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📐" />
        </Field>
        <Field label="Description">
          <input className={inputCls} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Algebra, Geometry & more" />
        </Field>
        <div className="sm:col-span-2 flex justify-end pt-2">
          <SubmitButton loading={loading} label="Add Subject" />
        </div>
      </form>
    </AdminSection>
  );
}

// ── Section B: Add Chapter ────────────────────────────────────────
function AddChapterSection({ showToast }) {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    subject_id: '', chapter_no: 1, name: '', difficulty: 'Medium', estimated_time: '45 min', topic_count: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from('subjects').select('id, name, board, class_no').order('name').then(({ data }) => {
      setSubjects(data || []);
      if (data && data.length > 0) setForm(p => ({ ...p, subject_id: data[0].id }));
    });
  }, []);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject_id || !form.name) return showToast('Subject and chapter name are required', 'error');
    setLoading(true);
    try {
      const { error } = await supabase.from('chapters').insert({
        subject_id: form.subject_id,
        chapter_no: Number(form.chapter_no),
        name: form.name.trim(),
        difficulty: form.difficulty,
        estimated_time: form.estimated_time,
        topic_count: Number(form.topic_count),
      });
      if (error) throw error;
      showToast(`Chapter "${form.name}" added!`);
      setForm(p => ({ ...p, name: '', chapter_no: p.chapter_no + 1 }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminSection icon={BookOpen} title="Add Chapter">
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <Field label="Subject">
          <select className={selectCls} value={form.subject_id} onChange={e => set('subject_id', e.target.value)}>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name} (Class {s.class_no} · {s.board?.toUpperCase()})</option>
            ))}
          </select>
        </Field>
        <Field label="Chapter No.">
          <input type="number" className={inputCls} value={form.chapter_no} min={1} onChange={e => set('chapter_no', e.target.value)} />
        </Field>
        <Field label="Chapter Name">
          <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Real Numbers" required />
        </Field>
        <Field label="Difficulty">
          <select className={selectCls} value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Estimated Time">
          <input className={inputCls} value={form.estimated_time} onChange={e => set('estimated_time', e.target.value)} placeholder="45 min" />
        </Field>
        <Field label="Topic Count">
          <input type="number" className={inputCls} value={form.topic_count} min={1} onChange={e => set('topic_count', e.target.value)} />
        </Field>
        <div className="sm:col-span-2 flex justify-end pt-2">
          <SubmitButton loading={loading} label="Add Chapter" />
        </div>
      </form>
    </AdminSection>
  );
}

// ── Section C: Add Question (manual) ─────────────────────────────
function AddQuestionSection({ showToast }) {
  const [chapters, setChapters] = useState([]);
  const [form, setForm] = useState({
    chapter_id: '',
    question_text: '',
    option_a: '', option_b: '', option_c: '', option_d: '',
    correct_index: 0,
    explanation: '',
    topic: '',
    difficulty: 'Medium',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from('chapters')
      .select('id, name, subjects(name)')
      .order('name')
      .then(({ data }) => {
        setChapters(data || []);
        if (data && data.length > 0) setForm(p => ({ ...p, chapter_id: data[0].id }));
      });
  }, []);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.chapter_id || !form.question_text || !form.option_a || !form.option_b) {
      return showToast('Chapter, question, and at least 2 options are required', 'error');
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('questions').insert({
        chapter_id: form.chapter_id,
        question_text: form.question_text.trim(),
        option_a: form.option_a.trim(),
        option_b: form.option_b.trim(),
        option_c: form.option_c.trim(),
        option_d: form.option_d.trim(),
        correct_index: Number(form.correct_index),
        explanation: form.explanation.trim(),
        topic: form.topic.trim(),
        difficulty: form.difficulty,
        source: 'manual',
      });
      if (error) throw error;
      showToast('Question added successfully!');
      setForm(p => ({ ...p, question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', explanation: '', topic: '' }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminSection icon={FileQuestion} title="Add Question (Manual)">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Chapter">
            <select className={selectCls} value={form.chapter_id} onChange={e => set('chapter_id', e.target.value)}>
              {chapters.map(c => (
                <option key={c.id} value={c.id}>{c.subjects?.name} — {c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Difficulty">
            <select className={selectCls} value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
              {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Topic">
          <input className={inputCls} value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="Real Numbers" />
        </Field>
        <Field label="Question Text">
          <textarea className={inputCls + ' resize-none h-24'} value={form.question_text} onChange={e => set('question_text', e.target.value)} placeholder="Enter the question..." required />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          {['option_a', 'option_b', 'option_c', 'option_d'].map((opt, idx) => (
            <Field key={opt} label={`Option ${String.fromCharCode(65 + idx)}`}>
              <input className={inputCls} value={form[opt]} onChange={e => set(opt, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + idx)}`} />
            </Field>
          ))}
        </div>
        <Field label="Correct Answer">
          <select className={selectCls} value={form.correct_index} onChange={e => set('correct_index', e.target.value)}>
            {['Option A', 'Option B', 'Option C', 'Option D'].map((label, idx) => (
              <option key={idx} value={idx}>{label}</option>
            ))}
          </select>
        </Field>
        <Field label="Explanation">
          <textarea className={inputCls + ' resize-none h-20'} value={form.explanation} onChange={e => set('explanation', e.target.value)} placeholder="Explain why the answer is correct..." />
        </Field>
        <div className="flex justify-end pt-2">
          <SubmitButton loading={loading} label="Add Question" />
        </div>
      </form>
    </AdminSection>
  );
}

// ── Section D: AI Generate Questions ─────────────────────────────
function AIGenerateSection({ showToast }) {
  const [chapters, setChapters] = useState([]);
  const [form, setForm] = useState({ chapter_id: '', bookText: '', count: 10 });
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    supabase
      .from('chapters')
      .select('id, name, subjects(name)')
      .order('name')
      .then(({ data }) => {
        setChapters(data || []);
        if (data && data.length > 0) setForm(p => ({ ...p, chapter_id: data[0].id }));
      });
  }, []);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleGenerate = async () => {
    if (!form.chapter_id || !form.bookText.trim()) {
      return showToast('Select a chapter and paste the book text first', 'error');
    }

    const anthropicKey = import.meta.env.VITE_ANTHROPIC_KEY;
    if (!anthropicKey) {
      return showToast('VITE_ANTHROPIC_KEY is not set in .env', 'error');
    }

    setGenerating(true);
    setPreview([]);

    const prompt = `You are an expert NCERT question generator for Indian school students. 
Based on the following textbook passage, generate exactly ${form.count} multiple choice questions (MCQs).

Each question must follow this JSON format:
{
  "question_text": "...",
  "option_a": "...",
  "option_b": "...",
  "option_c": "...",
  "option_d": "...",
  "correct_index": 0,
  "explanation": "...",
  "topic": "...",
  "difficulty": "Easy|Medium|Hard"
}

Return ONLY a valid JSON array of these objects, nothing else. No markdown, no explanation text.

Textbook passage:
${form.bookText}`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.content[0]?.text || '';

      let questions;
      try {
        // Handle potential markdown code fences
        const jsonMatch = rawText.match(/\[[\s\S]*\]/);
        questions = JSON.parse(jsonMatch ? jsonMatch[0] : rawText);
      } catch {
        throw new Error('Failed to parse the AI response as JSON. Try again.');
      }

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('AI returned an empty or invalid question set.');
      }

      setPreview(questions);
      showToast(`Generated ${questions.length} questions. Review and save below.`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleBulkInsert = async () => {
    if (preview.length === 0) return;
    setGenerating(true);
    try {
      const rows = preview.map(q => ({
        chapter_id: form.chapter_id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_index: Number(q.correct_index),
        explanation: q.explanation || '',
        topic: q.topic || '',
        difficulty: q.difficulty || 'Medium',
        source: 'ai_generated',
      }));

      const { error } = await supabase.from('questions').insert(rows);
      if (error) throw error;

      showToast(`✅ ${rows.length} AI-generated questions saved to database!`);
      setPreview([]);
      setForm(p => ({ ...p, bookText: '' }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AdminSection icon={Bot} title="AI Generate Questions (Anthropic Claude)">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Chapter">
            <select className={selectCls} value={form.chapter_id} onChange={e => set('chapter_id', e.target.value)}>
              {chapters.map(c => (
                <option key={c.id} value={c.id}>{c.subjects?.name} — {c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Number of Questions to Generate">
            <input type="number" className={inputCls} value={form.count} min={1} max={30} onChange={e => set('count', e.target.value)} />
          </Field>
        </div>
        <Field label="Paste Book / Chapter Text">
          <textarea
            className={inputCls + ' resize-none h-40'}
            value={form.bookText}
            onChange={e => set('bookText', e.target.value)}
            placeholder="Paste the NCERT textbook passage here. The AI will generate MCQs based on this content..."
          />
        </Field>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating || !form.bookText.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none text-white font-black text-sm rounded-xl transition-all shadow-md"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{generating ? 'Generating...' : 'Generate with AI'}</span>
          </button>
        </div>

        {/* Preview of generated questions */}
        {preview.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-700">{preview.length} Questions Generated — Preview</h3>
              <button
                onClick={handleBulkInsert}
                disabled={generating}
                className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-black text-xs rounded-xl transition-all shadow-sm"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>Save All to Database</span>
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {preview.map((q, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-700">Q{idx + 1}: {q.question_text}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                      q.difficulty === 'Hard' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>{q.difficulty}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-slate-500">
                    {['option_a','option_b','option_c','option_d'].map((opt, i) => (
                      <span key={opt} className={`px-2 py-1 rounded-lg ${Number(q.correct_index) === i ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' : 'bg-white border border-slate-200'}`}>
                        {String.fromCharCode(65+i)}. {q[opt]}
                      </span>
                    ))}
                  </div>
                  {q.explanation && <p className="text-slate-400 italic">{q.explanation}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminSection>
  );
}

// Shared submit button
function SubmitButton({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading || !isSupabaseConfigured}
      className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:pointer-events-none text-white font-black text-sm rounded-xl transition-all shadow-md"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
      <span>{loading ? 'Saving...' : label}</span>
    </button>
  );
}
