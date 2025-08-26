import { NextRequest, NextResponse } from 'next/server';
import { SwiggyRoastingEngine } from '@/lib/roasting-engine';
import { ReclaimSwiggyClient } from '@/lib/reclaim';
import { leaderboardDB } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { proofs } = await request.json();

    if (!proofs) {
      return NextResponse.json({ error: 'No proof data provided' }, { status: 400 });
    }

    console.log('🔥 ROASTING API: Processing proof data...');

    // Parse Swiggy analytics from proof
    const reclaimClient = new ReclaimSwiggyClient();
    let analytics = reclaimClient.parseSwiggyAnalytics(proofs);

    if (!analytics) {
      console.log('⚠️ No real analytics found, using mock data for demo');
      // Use demo data if real analytics not available
      const customerName = proofs.claimData?.parameters ? 
        JSON.parse(proofs.claimData.parameters).paramValues?.customerName || 'Demo User' : 
        'Demo User';
      analytics = reclaimClient.generateMockAnalytics(customerName);
    }

    console.log('📊 Analytics for roasting:', analytics);

    // Generate the roast
    const roastingEngine = new SwiggyRoastingEngine();
    const roastAnalysis = await roastingEngine.generateRoast(analytics);

    console.log('🔥 Roast generated:', roastAnalysis);

    // Add/update user in leaderboard database
    const userRecord = await leaderboardDB.addOrUpdateUser(analytics);
    console.log('💾 User added to leaderboard:', userRecord);

    // Get user ranking
    const userRanking = await leaderboardDB.getUserRank(analytics.customerId);
    
    if (!userRanking) {
      throw new Error('Failed to get user ranking');
    }

    // Create leaderboard entry
    const leaderboardEntry = {
      id: userRecord.id,
      customerName: analytics.customerName,
      customerId: analytics.customerId,
      totalSpend: analytics.totalSpend,
      totalOrders: analytics.totalOrders,
      averageOrderValue: analytics.averageOrderValue,
      monthlySpend: analytics.monthlySpend,
      rank: userRanking.rank,
      roastLevel: roastAnalysis.roastLevel,
      createdAt: userRecord.lastUpdated,
      isCurrentUser: true
    };

    return NextResponse.json({
      success: true,
      roastAnalysis,
      analytics,
      userRanking,
      leaderboardEntry
    });

  } catch (error) {
    console.error('🔥 ROASTING API ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to generate roast', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Swiggy Roasting API 🔥 - Use POST with proof data to get roasted!' },
    { status: 200 }
  );
}
