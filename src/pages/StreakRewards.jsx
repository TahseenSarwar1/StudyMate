import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Coins, Calendar, Gift, Lock, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { streakRewards as initialRewards } from '../data/mockData';

export default function StreakRewards() {
  const { user, addXp } = useApp();
  const [rewards, setRewards] = useState(initialRewards);
  const [chestOpenModal, setChestOpenModal] = useState(false);
  const [claimingDay, setClaimingDay] = useState(null);
  const [chestState, setChestState] = useState('closed'); // 'closed', 'shaking', 'opened'
  const [chestReward, setChestReward] = useState(null);

  // Determine if a specific day is claimed, claimable, or locked.
  // The current streak is user.streak (default 7).
  const getDayStatus = (day) => {
    const rewardObj = rewards.find(r => r.day === day);
    
    // If it's a defined special reward
    if (rewardObj) {
      if (rewardObj.claimed) return 'claimed';
      if (day <= user.streak) return 'claimable';
      return 'locked';
    }

    // Default status for general days (not in streakRewards array)
    if (day < user.streak) return 'claimed';
    if (day === user.streak) return 'claimable';
    return 'locked';
  };

  const getDayRewardInfo = (day) => {
    const rewardObj = rewards.find(r => r.day === day);
    if (rewardObj) {
      return { label: rewardObj.reward, icon: rewardObj.icon, isSpecial: rewardObj.special };
    }
    // Generic day reward
    return { label: `+${day * 5} XP`, icon: '⚡', isSpecial: false };
  };

  const handleClaimReward = (day) => {
    const status = getDayStatus(day);
    if (status !== 'claimable') return;

    setClaimingDay(day);
    const rewardInfo = getDayRewardInfo(day);

    if (rewardInfo.label === 'Mystery Box' || rewardInfo.isSpecial) {
      // Trigger mystery box opening game!
      setChestState('closed');
      setChestReward(rewardInfo);
      setChestOpenModal(true);
    } else {
      // Direct claim
      const xpValue = parseInt(rewardInfo.label) || day * 5;
      addXp(xpValue);
      setRewards(prev =>
        prev.map(r => (r.day === day ? { ...r, claimed: true } : r))
      );
      setClaimingDay(null);
    }
  };

  const handleOpenChest = () => {
    setChestState('shaking');
    setTimeout(() => {
      setChestState('opened');
      // Grant XP
      let bonusXp = 150;
      if (claimingDay === 14) bonusXp = 250;
      if (claimingDay === 21) bonusXp = 500;
      if (claimingDay === 30) bonusXp = 1000;

      addXp(bonusXp);
      
      // Update claim status
      setRewards(prev =>
        prev.map(r => (r.day === claimingDay ? { ...r, claimed: true } : r))
      );
    }, 1500);
  };

  const handleCloseChestModal = () => {
    setChestOpenModal(false);
    setClaimingDay(null);
    setChestState('closed');
    setChestReward(null);
  };

  // Generate 30 days grid data
  const daysGrid = Array.from({ length: 30 }, (_, i) => i + 1);

  // Sparkle floating flame particles generator
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 16 + 8,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar />

        <main className="flex-1 space-y-8 min-w-0">
          {/* Header Banner with animated fire particles */}
          <div className="relative glass-card bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 p-8 text-white rounded-3xl overflow-hidden shadow-glow-accent">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map(p => (
                <motion.div
                  key={p.id}
                  className="absolute bg-yellow-400 rounded-full opacity-20 filter blur-[2px]"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                  }}
                  animate={{
                    y: [0, -60, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-sm">
                  <Flame className="w-4 h-4 text-yellow-300 animate-pulse fill-yellow-300" />
                  <span>Streak Multiplier: 1.5x XP</span>
                </div>
                <h1 className="text-4xl font-black font-display tracking-tight leading-none">Streaks & Mystery Rewards</h1>
                <p className="text-orange-100 max-w-lg text-sm font-semibold">
                  Complete quizzes daily to maintain your learning streak. Reaching milestones unlocks locked mystery chests loaded with rewards!
                </p>
              </div>

              {/* Huge Fire Streak Counter */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center space-x-4 shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl shadow-glow-accent">
                  🔥
                </div>
                <div>
                  <div className="text-3xl font-black font-display tracking-tight leading-none">{user.streak} Days</div>
                  <div className="text-[10px] uppercase font-bold text-orange-200 tracking-wider mt-1">Current Study Streak</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 flex items-center space-x-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <Flame className="w-6 h-6 fill-orange-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Longest Streak</p>
                <h3 className="text-lg font-black text-slate-800">{user.longestStreak} Days</h3>
              </div>
            </div>

            <div className="glass-card p-4 flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                <Trophy className="w-6 h-6 fill-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Next Milestone</p>
                <h3 className="text-lg font-black text-slate-800">Day 14 (Rare Chest)</h3>
              </div>
            </div>

            <div className="glass-card p-4 flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Study Coins Balance</p>
                <h3 className="text-lg font-black text-slate-800">{user.coins} Coins</h3>
              </div>
            </div>
          </div>

          {/* Special Chest Milestones */}
          <div>
            <h2 className="text-xl font-black font-display text-slate-800 mb-4 flex items-center space-x-2">
              <Gift className="w-6 h-6 text-primary-500" />
              <span>Streak Milestones</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.filter(r => r.special).map((m) => {
                const status = getDayStatus(m.day);
                return (
                  <motion.div
                    key={m.day}
                    whileHover={status === 'claimable' ? { scale: 1.03 } : {}}
                    className={`glass-card p-6 border relative overflow-hidden flex flex-col justify-between h-48 transition-all duration-300 ${
                      status === 'claimable'
                        ? 'border-yellow-400 bg-gradient-to-b from-yellow-50/50 to-amber-50/50 shadow-glow-accent'
                        : status === 'claimed'
                        ? 'border-emerald-100 bg-emerald-50/20'
                        : 'border-slate-200 opacity-75'
                    }`}
                  >
                    {/* Status corner flag */}
                    <div className="absolute top-4 right-4 text-xs font-black">
                      {status === 'claimed' && <span className="text-emerald-500 flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                        <span>Claimed</span>
                      </span>}
                      {status === 'claimable' && <span className="text-orange-500 animate-pulse flex items-center space-x-1 bg-orange-100 px-2 py-0.5 rounded-full">
                        <span>Claim Now!</span>
                      </span>}
                      {status === 'locked' && <span className="text-slate-400 flex items-center space-x-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </span>}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-primary-500 uppercase bg-primary-50 px-2 py-0.5 rounded-full">Day {m.day} Reward</span>
                      <h4 className="text-base font-black text-slate-800 pt-1">{m.reward}</h4>
                      <p className="text-xs text-slate-400">Unlock at day {m.day} of continuous studying.</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-3xl filter drop-shadow">
                        {m.day === 7 && (status === 'claimed' ? '📦' : '🎁')}
                        {m.day === 14 && '🎖️'}
                        {m.day === 21 && '💎'}
                        {m.day === 30 && '👑'}
                      </div>

                      {status === 'claimable' ? (
                        <button
                          onClick={() => handleClaimReward(m.day)}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-xs font-black rounded-xl transition-all shadow-md"
                        >
                          Claim Reward
                        </button>
                      ) : (
                        <div className="text-xs font-semibold text-slate-400">
                          {status === 'claimed' ? 'Completed' : 'Requires Day ' + m.day}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 30-Day Streak Track Calendar */}
          <div className="glass-card p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black font-display text-slate-800">30-Day Learning Path</h3>
                <p className="text-xs text-slate-400">Claim your rewards to advance your learning track. Days reset if a streak is lost.</p>
              </div>
              <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center space-x-1">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block" />
                  <span>Claimed</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3.5 h-3.5 rounded border border-orange-400 bg-orange-50 inline-block animate-pulse" />
                  <span>Active / Claimable</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 inline-block" />
                  <span>Locked</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
              {daysGrid.map((day) => {
                const status = getDayStatus(day);
                const rInfo = getDayRewardInfo(day);
                
                return (
                  <motion.div
                    key={day}
                    whileHover={status === 'claimable' ? { scale: 1.05 } : {}}
                    onClick={() => status === 'claimable' && handleClaimReward(day)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between h-24 cursor-pointer transition-all ${
                      status === 'claimed'
                        ? 'bg-emerald-500/10 border-emerald-200 text-emerald-800'
                        : status === 'claimable'
                        ? 'bg-orange-50 border-orange-400 shadow-glow-accent text-orange-950 ring-2 ring-orange-200 animate-pulse'
                        : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-black uppercase">Day {day}</span>
                      {status === 'claimed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />}
                    </div>

                    <div className="text-2xl my-1 select-none">
                      {status === 'claimed' ? '🔥' : status === 'claimable' ? rInfo.icon : rInfo.icon}
                    </div>

                    <div className="text-[9px] font-black truncate max-w-full leading-tight">
                      {status === 'claimed' ? 'Done' : rInfo.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Streak Tip Alert */}
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800 font-semibold space-y-1">
              <p className="font-bold text-blue-900">How do Streaks work?</p>
              <p>Solve at least 1 quiz or complete 1 revision module daily. Your multiplier starts at 1.0x and grows to 1.5x at Day 7, giving you extra XP for every question solved! If you miss a day, you can restore your streak using 50 Coins or start a new streak.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Gamified Mystery Chest Claiming Modal */}
      <AnimatePresence>
        {chestOpenModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 relative overflow-hidden"
            >
              {/* Special background effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-black font-display text-yellow-400 tracking-tight leading-tight">
                {chestState === 'closed' && 'You Found a Mystery Box! 🎁'}
                {chestState === 'shaking' && 'Unlocking Box... ⚡'}
                {chestState === 'opened' && 'Wow! Reward Unlocked! 🌟'}
              </h3>

              <p className="text-slate-300 text-xs font-semibold">
                {chestState === 'closed' && `Open this chest to claim your Day ${claimingDay} reward!`}
                {chestState === 'shaking' && 'Brace yourself for awesome rewards...'}
                {chestState === 'opened' && 'The chest contained special high-level rewards for you!'}
              </p>

              {/* Chest animation view */}
              <div className="h-48 flex items-center justify-center relative">
                {chestState === 'closed' && (
                  <motion.div
                    className="text-7xl cursor-pointer select-none filter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    onClick={handleOpenChest}
                  >
                    🎁
                  </motion.div>
                )}

                {chestState === 'shaking' && (
                  <motion.div
                    className="text-7xl select-none"
                    animate={{
                      rotate: [0, -10, 10, -10, 10, -5, 5, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    📦
                  </motion.div>
                )}

                {chestState === 'opened' && (
                  <motion.div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.2 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="text-7xl select-none filter drop-shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                    >
                      👑
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-1"
                    >
                      <h4 className="text-lg font-black text-yellow-400">
                        {claimingDay === 7 && '+150 XP & Streak Master Badge!'}
                        {claimingDay === 14 && '+250 XP & Rare Scholar Badge!'}
                        {claimingDay === 21 && '+500 XP & Diamond Rank!'}
                        {claimingDay === 30 && '+1,000 XP & Legendary Champion!'}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400">Added directly to your study profile</p>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-4">
                {chestState === 'closed' && (
                  <button
                    onClick={handleOpenChest}
                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-yellow-950 font-black rounded-xl text-sm transition-all shadow-glow-accent w-full"
                  >
                    Open Chest
                  </button>
                )}

                {chestState === 'opened' && (
                  <button
                    onClick={handleCloseChestModal}
                    className="px-8 py-3 bg-slate-800 hover:bg-slate-750 text-white font-black border border-slate-700 rounded-xl text-sm transition-all w-full flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                    <span>Awesome, thanks!</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
