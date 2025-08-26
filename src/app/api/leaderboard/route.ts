import { NextRequest, NextResponse } from 'next/server';
import { leaderboardDB } from '../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const userId = searchParams.get('userId');

    console.log(`📊 LEADERBOARD API: Fetching top ${limit} spenders`);

    // Get leaderboard
    const leaderboard = await leaderboardDB.getLeaderboard(limit);
    
    // Get total users
    const totalUsers = await leaderboardDB.getTotalUsers();
    
    // Get current user rank if userId provided
    let userRank = undefined;
    if (userId) {
      const ranking = await leaderboardDB.getUserRank(userId);
      userRank = ranking?.rank;
    }

    // Mark current user in leaderboard
    const leaderboardWithCurrentUser = leaderboard.map(entry => ({
      ...entry,
      isCurrentUser: userId ? entry.customerId === userId : false
    }));

    console.log(`✅ Leaderboard generated: ${leaderboard.length} entries, ${totalUsers} total users`);

    return NextResponse.json({
      success: true,
      leaderboard: leaderboardWithCurrentUser,
      totalUsers,
      userRank
    });

  } catch (error) {
    console.error('📊 LEADERBOARD API ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Get spending statistics
    const stats = await leaderboardDB.getSpendingStats();
    const topSpenders = await leaderboardDB.getTopSpenders(5);

    return NextResponse.json({
      success: true,
      stats,
      topSpenders
    });

  } catch (error) {
    console.error('📊 LEADERBOARD STATS ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
