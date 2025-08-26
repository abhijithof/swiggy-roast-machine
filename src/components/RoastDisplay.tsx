'use client';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, DollarSign, ShoppingCart, Zap, Crown, Target } from 'lucide-react';
import { RoastAnalysis, SwiggyAnalytics } from '../types';

interface RoastDisplayProps {
  roast: RoastAnalysis;
  analytics: SwiggyAnalytics;
  userRanking: {
    rank: number;
    totalUsers: number;
    percentile: number;
  };
}

export default function RoastDisplay({ roast, analytics, userRanking }: RoastDisplayProps) {
  const getRoastColor = (level: string) => {
    switch (level) {
      case 'mild': return 'from-blue-500 to-blue-600';
      case 'medium': return 'from-blue-600 to-indigo-600';
      case 'savage': return 'from-indigo-600 to-purple-600';
      case 'nuclear': return 'from-purple-600 to-pink-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getBurnDegreeText = (degree: string) => {
    switch (degree) {
      case 'first': return 'Lightly Toasted 🍞';
      case 'second': return 'Well Done 🥩';
      case 'third': return 'Extra Crispy 🔥';
      case 'fourth': return 'Completely Incinerated 💀';
      default: return 'Roasted 🔥';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 bg-white min-h-screen py-8">
      {/* Main Roast Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-100 rounded-full translate-x-12 translate-y-12"></div>
        </div>

        <div className="text-center mb-6 relative z-10">
          <div className="flex items-center justify-center mb-6 gap-2">
            {roast.roastEmojis.map((emoji, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 10
                }}
                whileHover={{ scale: 1.3, rotate: 15 }}
                className="text-3xl sm:text-4xl lg:text-5xl cursor-pointer"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight text-gray-900"
          >
            You&apos;ve Been{' '}
            <span className={`bg-gradient-to-r ${getRoastColor(roast.roastLevel)} bg-clip-text text-transparent`}>
              ROASTED!
            </span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 shadow-sm border border-gray-100"
          >
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed text-gray-700">
              {roast.overallRoast}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base lg:text-lg">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-blue-50 rounded-xl px-3 sm:px-4 py-2 border border-blue-100 w-full sm:w-auto text-center"
            >
              <span className="font-semibold text-blue-700">Roast Level: {roast.roastLevel.toUpperCase()}</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-emerald-50 rounded-xl px-3 sm:px-4 py-2 border border-emerald-100 w-full sm:w-auto text-center"
            >
              <span className="font-semibold text-emerald-700">Burn: {getBurnDegreeText(roast.burnDegree)}</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-gray-50 rounded-xl px-3 sm:px-4 py-2 border border-gray-100 w-full sm:w-auto text-center"
            >
              <span className="font-semibold text-gray-700">Score: {roast.roastScore}/100</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Spending Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Damage</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">₹{analytics.totalSpend.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed">{roast.spendingShame}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Orders</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{analytics.totalOrders}</p>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              {analytics.orderFrequency} orders/month
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl relative overflow-hidden group sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs sm:text-sm font-medium">Your Ranking</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">#{userRanking.rank}</p>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Top {userRanking.percentile}% spender
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Roast Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
      >
        <motion.h3 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 sm:mb-8 text-center"
        >
          🔥 Category Roasts 🔥
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-blue-50 rounded-2xl p-4 sm:p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-xl mr-3">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Spending Habits</h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{roast.roastCategories.spendingHabits}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-emerald-50 rounded-2xl p-4 sm:p-6 border border-emerald-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-emerald-100 rounded-xl mr-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Order Frequency</h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{roast.roastCategories.orderFrequency}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-gray-100 rounded-xl mr-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Food Choices</h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{roast.roastCategories.foodChoices}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-indigo-50 rounded-2xl p-4 sm:p-6 border border-indigo-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-xl mr-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-gray-900">Lifestyle</h4>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{roast.roastCategories.lifestyle}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Fun Facts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
      >
        <motion.h3 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 sm:mb-8 text-center"
        >
          😱 Shocking Fun Facts 😱
        </motion.h3>

        <div className="space-y-4 sm:space-y-6">
          {roast.funFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                delay: 1.0 + index * 0.15,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  className="text-2xl sm:text-3xl mr-3 inline-block"
                >
                  🤯
                </motion.span>
                {fact}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-lg relative overflow-hidden"
      >
        <div className="relative z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6"
          >
            Think you can handle more heat? 🔥
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Share your roast and challenge your friends to beat your spending score!
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Share My Roast 📱</span>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-lg text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg border border-white/30 hover:border-white/50 transition-all duration-300"
            >
              View Leaderboard 👑
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}