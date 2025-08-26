import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swiggy Roast Machine 🔥',
  description: 'Get brutally roasted based on your Swiggy spending habits! Connect your account and discover how much money you\'ve burned on food delivery.',
  keywords: 'Swiggy, roast, spending, food delivery, funny, leaderboard, AI roasting',
  authors: [{ name: 'Swiggy Roast Machine' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#f97316',
  openGraph: {
    title: 'Swiggy Roast Machine 🔥',
    description: 'Get brutally roasted based on your Swiggy spending habits!',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiggy Roast Machine 🔥',
    description: 'Get brutally roasted based on your Swiggy spending habits!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>" />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-2">🔥</span>
              <h3 className="text-2xl font-bold">Swiggy Roast Machine</h3>
              <span className="text-3xl ml-2">🔥</span>
            </div>
            
            <p className="text-gray-400 mb-4">
              Brutally honest roasting powered by AI and Reclaim Protocol
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>🔒 Secure verification via Reclaim Protocol</span>
              <span>•</span>
              <span>🧠 AI-powered roasting</span>
              <span>•</span>
              <span>👑 Leaderboard competition</span>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-500">
              <p>Made with 🔥 and savage humor • Your data stays private and secure</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}