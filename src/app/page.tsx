'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Crown, TrendingUp } from 'lucide-react';
import ReclaimVerification from '@/components/ReclaimVerification';
import RoastDisplay from '@/components/RoastDisplay';
import Leaderboard from '@/components/Leaderboard';
import { RoastAnalysis, SwiggyAnalytics, LeaderboardEntry } from '@/types';

type AppStep = 'welcome' | 'verification' | 'loading' | 'roasted' | 'leaderboard';

export default function Home() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [roastAnalysis, setRoastAnalysis] = useState<RoastAnalysis | null>(null);
  const [analytics, setAnalytics] = useState<SwiggyAnalytics | null>(null);
  const [userRanking, setUserRanking] = useState<{rank: number; totalUsers: number; percentile: number} | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [, setIsLoading] = useState(false);

  const handleStartRoasting = () => {
    console.log('🔥 Starting the roasting process!');
    setStep('verification');
  };

  const handleVerificationComplete = async (verified: boolean, proofs?: unknown) => {
    if (!verified) {
      alert('🔥 Verification failed! Please try again with your Swiggy account.');
      setStep('welcome');
      return;
    }

    console.log('🔥 VERIFICATION COMPLETED - READY TO ROAST!');
    setIsLoading(true);
    setStep('loading');

    try {
      // Call roasting API
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proofs })
      });

      if (!response.ok) {
        throw new Error('Failed to generate roast');
      }

      const result = await response.json();
      
      console.log('🔥 ROAST ANALYSIS COMPLETE:', result);

      setRoastAnalysis(result.roastAnalysis);
      setAnalytics(result.analytics);
      setUserRanking(result.userRanking);
      setStep('roasted');

    } catch (error) {
      console.error('🔥 ERROR GENERATING ROAST:', error);
      alert(`Error generating your roast: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again.`);
      setStep('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLeaderboard = async () => {
    setIsLoading(true);
    try {
      const userId = analytics?.customerId;
      const response = await fetch(`/api/leaderboard?limit=10${userId ? `&userId=${userId}` : ''}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const result = await response.json();
      setLeaderboard(result.leaderboard);
      setTotalUsers(result.totalUsers);
      setStep('leaderboard');

    } catch (error) {
      console.error('📊 ERROR FETCHING LEADERBOARD:', error);
      alert('Failed to load leaderboard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoast = () => {
    setStep('roasted');
  };

  const handleStartOver = () => {
    setStep('welcome');
    setRoastAnalysis(null);
    setAnalytics(null);
    setUserRanking(null);
    setLeaderboard([]);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Welcome Screen */}
        {step === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Flame className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
            >
              Swiggy{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Roast
              </span>{' '}
              Machine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Get brutally{' '}
              <span className="text-emerald-600 font-bold">
                roasted
              </span>{' '}
              based on your Swiggy spending habits! Perfect for Indian youth who love food delivery! 🔥
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">What awaits you:</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                  >
                    <Flame className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Epic Roasting</h3>
                  <p className="text-gray-600 text-sm">Get savagely roasted based on your real spending data</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                  >
                    <Crown className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Leaderboard Fame</h3>
                  <p className="text-gray-600 text-sm">Compete for the top spender spot on our hall of shame</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
                    className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Spending Insights</h3>
                  <p className="text-gray-600 text-sm">See how your habits compare to other food delivery addicts</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartRoasting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 sm:px-12 rounded-2xl font-bold text-lg sm:text-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">🔥 Roast Me Now! 🔥</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                🔒 Secure verification via Reclaim Protocol • Your data stays private • Zero-knowledge proofs
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewLeaderboard}
                className="block mx-auto mt-6 text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-2 underline-offset-4 transition-all duration-200"
              >
                👑 View Hall of Shame Leaderboard
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Verification Screen */}
        {step === 'verification' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <ReclaimVerification onVerificationComplete={handleVerificationComplete} />
          </motion.div>
        )}

        {/* Loading Screen */}
        {step === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Flame className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Preparing Your Roast... 🔥
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Our AI is analyzing your spending habits and crafting the perfect roast!
              </p>
              
              <div className="space-y-2 text-gray-500">
                <p>📊 Analyzing spending patterns...</p>
                <p>🔥 Generating savage roasts...</p>
                <p>👑 Calculating leaderboard position...</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Roast Display */}
        {step === 'roasted' && roastAnalysis && analytics && userRanking && (
          <div>
            <div className="text-center mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewLeaderboard}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  👑 View Leaderboard
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartOver}
                  className="bg-white text-gray-700 py-3 px-8 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto"
                >
                  🔄 Roast Someone Else
                </motion.button>
              </div>
            </div>
            
            <RoastDisplay 
              roast={roastAnalysis} 
              analytics={analytics} 
              userRanking={userRanking}
            />
          </div>
        )}

        {/* Leaderboard */}
        {step === 'leaderboard' && (
          <div>
            <div className="text-center mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {roastAnalysis && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToRoast}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    🔥 Back to My Roast
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartOver}
                  className="bg-white text-gray-700 py-3 px-8 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto"
                >
                  🔄 Start Over
                </motion.button>
              </div>
            </div>
            
            <Leaderboard 
              leaderboard={leaderboard} 
              totalUsers={totalUsers}
              currentUserRank={userRanking?.rank}
            />
          </div>
        )}
      </div>
    </div>
  );
}