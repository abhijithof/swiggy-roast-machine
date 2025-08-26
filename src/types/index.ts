// User spending data from Swiggy via Reclaim
export interface SwiggyAnalytics {
  customerName: string;
  customerId: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  averageOrderValue: number;
  monthlySpend: number;
  orderFrequency: number; // orders per month
  cancellationRate: number;
  lastOrderAge: string;
  addresses: Record<string, string>;
}

// Roasting response from AI
export interface RoastAnalysis {
  overallRoast: string; // Main roasting message
  spendingShame: string; // Specific to their spending
  roastLevel: 'mild' | 'medium' | 'savage' | 'nuclear'; // Intensity level
  roastScore: number; // 0-100 how roastable they are
  roastCategories: {
    spendingHabits: string;
    orderFrequency: string;
    foodChoices: string;
    lifestyle: string;
  };
  funFacts: string[];
  burnDegree: 'first' | 'second' | 'third' | 'fourth'; // How badly they got roasted
  roastEmojis: string[];
}

// Leaderboard entry
export interface LeaderboardEntry {
  id: string;
  customerName: string;
  customerId: string;
  totalSpend: number;
  totalOrders: number;
  averageOrderValue: number;
  monthlySpend: number;
  rank: number;
  roastLevel: string;
  createdAt: string;
  isCurrentUser?: boolean;
}

// Database models
export interface UserSpendingRecord {
  id: string;
  customerName: string;
  customerId: string;
  email: string;
  totalSpend: number;
  totalOrders: number;
  averageOrderValue: number;
  monthlySpend: number;
  orderFrequency: number;
  cancellationRate: number;
  lastUpdated: string;
  verifiedBy: 'reclaim';
}

// API Response types
export interface RoastResponse {
  success: boolean;
  roastAnalysis: RoastAnalysis;
  userRanking: {
    spendingRank: number;
    totalUsers: number;
    percentile: number;
  };
  leaderboardEntry: LeaderboardEntry;
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardEntry[];
  totalUsers: number;
  userRank?: number;
}

