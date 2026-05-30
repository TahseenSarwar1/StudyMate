import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Trophy, Flame, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLeaderboard } from '../hooks/useLeaderboard';

function LeaderboardSkeleton() {
  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass-card px-4 py-3 flex items-center justify-between border border-slate-100 bg-white animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-4 bg-slate-200 rounded" />
            <div className="w-9 h-9 rounded-xl bg-slate-200" />
            <div className="space-y-1">
              <div className="w-24 h-3 bg-slate-200 rounded" />
              <div className="w-16 h-2 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="w-16 h-4 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global'); // global | class

  const { entries: currentLeaderboard, loading } = useLeaderboard(activeTab);

  // Podium positions sorting (ranks 1, 2, 3)
  const podium = [
    currentLeaderboard.find(p => p.rank === 2),
    currentLeaderboard.find(p => p.rank === 1),
    currentLeaderboard.find(p => p.rank === 3),
  ].filter(Boolean);

  const listData = currentLeaderboard.filter(p => p.rank > 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <Sidebar />

        {/* Leaderboard layout body */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black font-display tracking-tight text-slate-900 flex items-center space-x-2">
                <span>Weekly Competition</span>
              </h1>
              <p className="text-slate-550 font-medium text-sm mt-1">Study hard, earn XP, and climb to the next league rank!</p>
            </div>

            {/* Timer countdown */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 shadow-sm">
              <Timer className="w-4 h-4 text-primary-500" />
              <span>Ends in: 3d 14h</span>
            </div>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit text-[10px] font-black uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeTab === 'global' ? 'bg-white text-primary-650 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Global Rank
            </button>
            <button
              onClick={() => setActiveTab('class')}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeTab === 'class' ? 'bg-white text-primary-650 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              My Class
            </button>
          </div>

          {loading ? (
            <LeaderboardSkeleton />
          ) : (
            <>
              {/* Top 3 Podium Visual */}
              {podium.length >= 1 && (
                <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto items-end pt-12 select-none h-60">
                  {podium.map((pod) => {
                    const isFirst = pod.rank === 1;
                    const isSecond = pod.rank === 2;
                    const orderClass = isSecond ? 'order-1' : isFirst ? 'order-2' : 'order-3';
                    const heightClass = isFirst ? 'h-40' : isSecond ? 'h-32' : 'h-24';
                    const podiumBg = isFirst ? 'from-yellow-450 to-amber-500' : isSecond ? 'from-slate-300 to-slate-400' : 'from-amber-600 to-amber-700';

                    return (
                      <div key={pod.name} className={`flex flex-col items-center text-center ${orderClass}`}>
                        {/* Avatar bubble */}
                        <div className="relative mb-2">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-2xl sm:text-3xl relative">
                            {pod.avatar}
                            {isFirst && <span className="absolute -top-6 text-xl animate-bounce-subtle">👑</span>}
                          </div>
                          <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                            {pod.level}
                          </span>
                        </div>
                        <h4 className="text-[10px] font-black text-slate-800 truncate max-w-[80px] leading-tight">{pod.name}</h4>
                        <p className="text-[9px] font-bold text-slate-400 mt-0.5">{pod.xp.toLocaleString()} XP</p>

                        {/* Podium stand */}
                        <div className={`w-full ${heightClass} mt-3 rounded-t-2xl bg-gradient-to-b ${podiumBg} flex flex-col justify-end pb-3 text-white font-black font-display shadow-lg`}>
                          <span className="text-xl sm:text-2xl">{pod.rank}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">Rank</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Standings List */}
              <div className="space-y-2 max-w-2xl mx-auto">
                {listData.map((row) => (
                  <div
                    key={`${row.rank}-${row.name}`}
                    className={`glass-card px-4 py-3 flex items-center justify-between border ${
                      row.isCurrentUser
                        ? 'border-primary-400 bg-primary-50/20 shadow-glow-primary'
                        : 'border-slate-100 bg-white hover:bg-slate-50'
                    } transition-all`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="w-6 text-xs font-black text-slate-450 text-center">{row.rank}</span>
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg select-none">
                        {row.avatar}
                      </div>
                      <div>
                        <h5 className={`text-xs font-black leading-tight ${row.isCurrentUser ? 'text-primary-750 font-black' : 'text-slate-800'}`}>
                          {row.name}
                          {row.isCurrentUser && <span className="ml-1.5 px-1.5 py-0.5 bg-primary-100 text-primary-700 text-[8px] font-black rounded-md">YOU</span>}
                        </h5>
                        <p className="text-[9px] font-semibold text-slate-400 mt-1">Level {row.level} Student</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-xs">
                      {row.streak > 0 && (
                        <div className="flex items-center space-x-1 font-bold text-accent-600 bg-accent-50/50 px-2 py-0.5 rounded-lg border border-accent-100/50">
                          <Flame className="w-3.5 h-3.5 fill-accent-400" />
                          <span>{row.streak}d</span>
                        </div>
                      )}
                      <span className="font-black text-slate-800">{row.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                ))}

                {currentLeaderboard.length === 0 && (
                  <div className="text-center py-12 text-slate-400 font-semibold text-sm bg-white rounded-2xl border border-slate-200">
                    No entries yet. Be the first to complete a quiz!
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
