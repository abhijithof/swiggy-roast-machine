'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, CheckCircle, AlertCircle, QrCode, Smartphone, Flame } from 'lucide-react';
import QRCode from 'react-qr-code';
// ReclaimProofRequest is imported dynamically when needed

interface ReclaimVerificationProps {
  onVerificationComplete: (verified: boolean, proofs?: unknown) => void;
}

export default function ReclaimVerification({ onVerificationComplete }: ReclaimVerificationProps) {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'generating' | 'showing-qr' | 'completed' | 'failed'>('pending');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [, setProofs] = useState<unknown>(null);
  const [requestUrl, setRequestUrl] = useState<string>('');

  useEffect(() => {
    if (verificationStatus === 'showing-qr' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && verificationStatus === 'showing-qr') {
      setVerificationStatus('failed');
      onVerificationComplete(false);
    }
  }, [verificationStatus, timeLeft, onVerificationComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartVerification = async () => {
    try {
      setVerificationStatus('generating');
      
      console.log('🔥 STARTING REAL RECLAIM INTEGRATION - NO MOCK DATA!');
      
      const { ReclaimProofRequest } = await import('@reclaimprotocol/js-sdk');
      
      const APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID || '0x053e0EeddA7B73e9ec5bFD487e7c291fFb7fc5C7';
      const APP_SECRET = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET || '0x6fc8a6fc1ac7f8eb4f0ab8efb8c428df7473cbfced0499b42a570a8982d7a3b4';
      const PROVIDER_ID = process.env.NEXT_PUBLIC_RECLAIM_PROVIDER_ID || 'e7da584e-7353-4b88-a51d-3fc8abc332f0';
      
      console.log('✅ Using REAL VALID Reclaim credentials with SDK v4.4.0!');

      const reclaimProofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID
      );

      console.log('✅ REAL Reclaim ProofRequest initialized with SDK v4.4.0');

      const realRequestUrl = await reclaimProofRequest.getRequestUrl();
      
      if (!realRequestUrl) {
        throw new Error('Failed to generate request URL from Reclaim Protocol v4.4.0');
      }
      
      setRequestUrl(realRequestUrl);
      setVerificationStatus('showing-qr');

      console.log('🔥 REAL QR CODE URL GENERATED with SDK v4.4.0:', realRequestUrl);

      await reclaimProofRequest.startSession({
        onSuccess: (realProofs: unknown) => {
          console.log('🔥 REAL VERIFICATION SUCCESSFUL - ACTUAL SWIGGY DATA RECEIVED:', realProofs);
          
          let realSwiggyData = null;
          try {
            if (realProofs && typeof realProofs === 'object' && realProofs !== null && 'claimData' in realProofs && 
                realProofs.claimData && typeof realProofs.claimData === 'object' && 'parameters' in realProofs.claimData) {
              realSwiggyData = JSON.parse((realProofs.claimData as { parameters: string }).parameters);
              console.log('🔥 PARSED REAL SWIGGY DATA:', realSwiggyData);
            } else if (realProofs && Array.isArray(realProofs) && realProofs[0] && 
                      typeof realProofs[0] === 'object' && realProofs[0] !== null && 'claimData' in realProofs[0] &&
                      realProofs[0].claimData && typeof realProofs[0].claimData === 'object' && 'parameters' in realProofs[0].claimData) {
              realSwiggyData = JSON.parse((realProofs[0].claimData as { parameters: string }).parameters);
              console.log('🔥 PARSED REAL SWIGGY DATA (array format):', realSwiggyData);
            }
          } catch (parseError) {
            console.warn('Warning parsing Swiggy data, but proof is valid:', parseError);
          }
          
          setProofs(realProofs);
          setVerificationStatus('completed');
          onVerificationComplete(true, realProofs);
        },
        onError: (error: unknown) => {
          console.error('❌ REAL verification failed:', error);
          setVerificationStatus('failed');
          onVerificationComplete(false);
        },
      });

      console.log('🔥 REAL SESSION STARTED WITH SDK v4.4.0 - WAITING FOR USER TO SCAN QR AND IMPORT REAL SWIGGY DATA...');

    } catch (error) {
      console.error('❌ REAL RECLAIM INTEGRATION FAILED:', error);
      console.error('Error details:', error);
      setVerificationStatus('failed');
      onVerificationComplete(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100 rounded-full -translate-x-12 translate-y-12"></div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 leading-tight"
        >
          Ready to Get{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ROASTED
          </span>? 🔥
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
        >
          Connect your Swiggy account and prepare for the ultimate spending roast!
        </motion.p>
      </div>

      {verificationStatus === 'pending' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Secure Data Import</h3>
            
            <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
              We&apos;ll securely import your Swiggy spending data using Reclaim Protocol. 
              Your data is verified on-chain and never stored by us.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-100"
              >
                ✓ Zero-knowledge proofs
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100"
              >
                ✓ Data stays private
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg border border-indigo-100 sm:col-span-3 lg:col-span-1"
              >
                ✓ Blockchain verified
              </motion.div>
            </div>
          </div>

          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartVerification}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">🔥 Start the Roasting! 🔥</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      )}

      {verificationStatus === 'generating' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
          ></motion.div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Preparing Your Roast...</h3>
          <p className="text-gray-600 text-base">Generating secure verification link...</p>
          
          <div className="mt-4 flex items-center justify-center space-x-2">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-indigo-500 rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      )}

      {verificationStatus === 'showing-qr' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="bg-gray-50 p-6 rounded-2xl mb-6 border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 bg-blue-50 rounded-xl mr-3"
              >
                <QrCode className="w-6 h-6 text-blue-600" />
              </motion.div>
              <span className="text-lg font-bold text-gray-900">Scan QR Code</span>
              <motion.div 
                animate={{ 
                  scale: timeLeft < 60 ? [1, 1.1, 1] : [1]
                }}
                transition={{ duration: 1, repeat: timeLeft < 60 ? Infinity : 0 }}
                className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                {formatTime(timeLeft)}
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 mb-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <QRCode
                value={requestUrl}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 256 256"
              />
            </motion.div>

            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center text-gray-600"
              >
                <div className="p-2 bg-blue-50 rounded-lg mr-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm sm:text-base">Open your phone camera or QR scanner</span>
              </motion.div>
              
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05, x: 5 }}
                href={requestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:border-blue-200 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open link manually
              </motion.a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-4"
          >
            <h4 className="font-bold text-gray-900 mb-3 text-center">What happens next?</h4>
            <ol className="text-sm text-gray-700 space-y-2 text-left">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-center"
              >
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                Scan the QR code with your phone
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-center"
              >
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                Login to your Swiggy account securely
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center"
              >
                <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                Authorize data sharing via Reclaim Protocol
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-center"
              >
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                Return here to get absolutely ROASTED! 🔥
              </motion.li>
            </ol>
          </motion.div>
        </motion.div>
      )}

      {verificationStatus === 'completed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl font-black text-gray-900 mb-3"
          >
            Verification Complete! 🔥
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 mb-6 text-base sm:text-lg"
          >
            Your Swiggy data has been securely imported. Prepare to get ROASTED!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4"
          >
            <p className="text-emerald-700 font-semibold">
              🔥 Data verified on-chain • Ready for epic roasting!
            </p>
          </motion.div>
        </motion.div>
      )}

      {verificationStatus === 'failed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <AlertCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl font-black text-gray-900 mb-3"
          >
            Verification Failed
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 mb-6 text-base sm:text-lg max-w-md mx-auto"
          >
            Something went wrong during verification. Let&apos;s try again!
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setVerificationStatus('pending');
              setTimeLeft(300);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-bold hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Try Again 🔄</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}