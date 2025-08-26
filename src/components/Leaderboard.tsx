'use client';
import { motion } from 'framer-motion';
import { Crown, Trophy, Medal, Flame, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { LeaderboardEntry } from '@/types';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  totalUsers: number;
  currentUserRank?: number;
}

export default function Leaderboard({ leaderboard, totalUsers, currentUserRank }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-600" />;
      case 2: return <Trophy className="w-8 h-8 text-gray-500" />;
      case 3: return <Medal className="w-8 h-8 text-amber-600" />;
      default: return <span className="text-2xl font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoastLevelColor = (roastLevel: string) => {
    switch (roastLevel.toLowerCase()) {
      case 'mild spender': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'regular burner': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'savage spender': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'nuclear wallet': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 bg-white min-h-screen py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-lg relative overflow-hidden"
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-300 rounded-full translate-x-12 translate-y-12"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mr-3"
            >
              <Flame className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-5xl font-black text-center leading-tight"
            >
              Spending Hall of{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Shame
              </span>
            </motion.h1>
            
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="ml-3"
            >
              <Flame className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl opacity-90 mb-6"
          >
            The biggest spenders get the biggest roasts! 🔥
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-4 inline-block border border-white/30"
          >
            <p className="text-base sm:text-lg font-bold">
              {totalUsers} brave souls have been roasted so far!
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-center text-gray-900 mb-6 sm:mb-8"
        >
          🏆 Top Spenders Podium 🏆
        </motion.h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* 2nd Place */}
          {leaderboard[1] && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center order-2 sm:order-1"
            >
              <div className="bg-gray-100 rounded-t-2xl p-4 sm:p-6 h-28 sm:h-32 flex flex-col justify-end border border-gray-200 shadow-sm">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Trophy className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-2" />
                </motion.div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{leaderboard[1].customerName}</h3>
                <p className="text-lg sm:text-2xl font-bold text-gray-700">₹{leaderboard[1].totalSpend.toLocaleString()}</p>
              </div>
              <div className="bg-gray-200 text-gray-800 py-2 px-4 rounded-b-2xl font-bold shadow-sm">
                🥈 2nd Place
              </div>
            </motion.div>
          )}

          {/* 1st Place */}
          {leaderboard[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="text-center order-1 sm:order-2 relative"
            >
              {/* Crown glow effect */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-500"></div>
              
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-t-2xl p-4 sm:p-6 h-32 sm:h-40 flex flex-col justify-end border-2 border-yellow-400 shadow-lg relative overflow-hidden">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity, delay: 1 }
                  }}
                  className="relative z-10"
                >
                  <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-700 mx-auto mb-2 filter drop-shadow-sm" />
                </motion.div>
                
                <h3 className="font-black text-yellow-900 text-base sm:text-lg relative z-10">{leaderboard[0].customerName}</h3>
                <p className="text-2xl sm:text-3xl font-black text-yellow-800 relative z-10">₹{leaderboard[0].totalSpend.toLocaleString()}</p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 py-3 px-4 sm:px-6 rounded-b-2xl font-black text-base sm:text-lg shadow-lg">
                👑 KING OF SPENDING 👑
              </div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {leaderboard[2] && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center order-3"
            >
              <div className="bg-amber-100 rounded-t-2xl p-4 sm:p-6 h-28 sm:h-32 flex flex-col justify-end border border-amber-200 shadow-sm">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  <Medal className="w-8 h-8 sm:w-12 sm:h-12 text-amber-600 mx-auto mb-2" />
                </motion.div>
                <h3 className="font-bold text-amber-900 text-sm sm:text-base">{leaderboard[2].customerName}</h3>
                <p className="text-lg sm:text-2xl font-bold text-amber-800">₹{leaderboard[2].totalSpend.toLocaleString()}</p>
              </div>
              <div className="bg-amber-200 text-amber-900 py-2 px-4 rounded-b-2xl font-bold shadow-sm">
                🥉 3rd Place
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 text-white"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-center">Complete Leaderboard</h2>
        </motion.div>

        <div className="divide-y divide-gray-100">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                delay: 1.2 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.02, x: 10 }}
              className={`p-4 sm:p-6 hover:bg-gray-50 transition-all duration-300 relative group ${
                entry.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' : ''
              }`}
            >
              {entry.isCurrentUser && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent"></div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-sm ${entry.rank <= 3 ? getRankBadge(entry.rank) : 'bg-gray-100 text-gray-700'}`}
                  >
                    {entry.rank <= 3 ? getRankIcon(entry.rank) : (
                      <span className="text-lg sm:text-2xl font-black">#{entry.rank}</span>
                    )}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {entry.customerName}
                      {entry.isCurrentUser && (
                        <motion.span 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-sm"
                        >
                          You! 👑
                        </motion.span>
                      )}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-sm border ${getRoastLevelColor(entry.roastLevel)}`}>
                        {entry.roastLevel}
                      </span>
                      
                      <span className="text-gray-500 text-xs sm:text-sm">
                        Joined {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-2 w-full sm:w-auto">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-start sm:justify-end bg-emerald-50 rounded-lg p-2 border border-emerald-100"
                  >
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-emerald-600" />
                    <span className="text-lg sm:text-2xl font-black text-emerald-700">₹{entry.totalSpend.toLocaleString()}</span>
                  </motion.div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-end gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-600" />
                      <span>{entry.totalOrders} orders</span>
                    </div>
                    <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-indigo-600" />
                      <span>₹{entry.averageOrderValue}/order</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current User Rank (if not in top 10) */}
        {currentUserRank && currentUserRank > 10 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-blue-50 border-t border-blue-100 p-4 sm:p-6"
          >
            <div className="text-center text-blue-700">
              <motion.p 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-bold text-lg mb-2"
              >
                Your Current Rank: #{currentUserRank}
              </motion.p>
              <p className="text-sm text-blue-600">Keep spending to climb the leaderboard! 💸</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-lg relative overflow-hidden"
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 rounded-full -translate-x-16 translate-y-16"></div>
        </div>
        
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-center mb-6 sm:mb-8"
          >
            Spending Statistics
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/30 shadow-sm"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
                ₹{leaderboard.reduce((sum, entry) => sum + entry.totalSpend, 0).toLocaleString()}
              </p>
              <p className="text-sm sm:text-lg font-semibold opacity-90">Total Money Wasted</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/30 shadow-sm"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
                {leaderboard.reduce((sum, entry) => sum + entry.totalOrders, 0).toLocaleString()}
              </p>
              <p className="text-sm sm:text-lg font-semibold opacity-90">Total Orders</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/30 shadow-sm sm:col-span-2 lg:col-span-1"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
                ₹{Math.round(leaderboard.reduce((sum, entry) => sum + entry.averageOrderValue, 0) / leaderboard.length)}
              </p>
              <p className="text-sm sm:text-lg font-semibold opacity-90">Avg Order Value</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}