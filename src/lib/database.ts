import { LeaderboardEntry, UserSpendingRecord, SwiggyAnalytics } from '../types';
import fs from 'fs/promises';
import path from 'path';

// Simple JSON-based database (can be upgraded to PostgreSQL/MongoDB later)
class LeaderboardDatabase {
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'data', 'leaderboard.json');
  }

  private async ensureDbFile(): Promise<void> {
    try {
      const dataDir = path.dirname(this.dbPath);
      await fs.mkdir(dataDir, { recursive: true });
      
      try {
        await fs.access(this.dbPath);
      } catch {
        // File doesn't exist, create it
        await fs.writeFile(this.dbPath, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error('Error ensuring database file:', error);
    }
  }

  private async readDatabase(): Promise<UserSpendingRecord[]> {
    try {
      await this.ensureDbFile();
      const data = await fs.readFile(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return [];
    }
  }

  private async writeDatabase(records: UserSpendingRecord[]): Promise<void> {
    try {
      await this.ensureDbFile();
      await fs.writeFile(this.dbPath, JSON.stringify(records, null, 2));
    } catch (error) {
      console.error('Error writing database:', error);
    }
  }

  async addOrUpdateUser(analytics: SwiggyAnalytics): Promise<UserSpendingRecord> {
    const records = await this.readDatabase();
    
    const existingIndex = records.findIndex(r => r.customerId === analytics.customerId);
    
    const userRecord: UserSpendingRecord = {
      id: existingIndex >= 0 ? records[existingIndex].id : `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customerName: analytics.customerName,
      customerId: analytics.customerId,
      email: analytics.email,
      totalSpend: analytics.totalSpend,
      totalOrders: analytics.totalOrders,
      averageOrderValue: analytics.averageOrderValue,
      monthlySpend: analytics.monthlySpend,
      orderFrequency: analytics.orderFrequency,
      cancellationRate: analytics.cancellationRate,
      lastUpdated: new Date().toISOString(),
      verifiedBy: 'reclaim'
    };

    if (existingIndex >= 0) {
      records[existingIndex] = userRecord;
    } else {
      records.push(userRecord);
    }

    await this.writeDatabase(records);
    return userRecord;
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const records = await this.readDatabase();
    
    // Sort by total spend (descending)
    const sortedRecords = records
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, limit);

    return sortedRecords.map((record, index) => ({
      id: record.id,
      customerName: record.customerName,
      customerId: record.customerId,
      totalSpend: record.totalSpend,
      totalOrders: record.totalOrders,
      averageOrderValue: record.averageOrderValue,
      monthlySpend: record.monthlySpend,
      rank: index + 1,
      roastLevel: this.getRoastLevel(record.totalSpend),
      createdAt: record.lastUpdated
    }));
  }

  async getUserRank(customerId: string): Promise<{ rank: number; totalUsers: number; percentile: number } | null> {
    const records = await this.readDatabase();
    const sortedRecords = records.sort((a, b) => b.totalSpend - a.totalSpend);
    
    const userIndex = sortedRecords.findIndex(r => r.customerId === customerId);
    if (userIndex === -1) return null;

    const rank = userIndex + 1;
    const totalUsers = records.length;
    const percentile = Math.round(((totalUsers - rank + 1) / totalUsers) * 100);

    return { rank, totalUsers, percentile };
  }

  async getTopSpenders(limit: number = 5): Promise<LeaderboardEntry[]> {
    return this.getLeaderboard(limit);
  }

  async getTotalUsers(): Promise<number> {
    const records = await this.readDatabase();
    return records.length;
  }

  async getSpendingStats(): Promise<{
    totalSpent: number;
    totalOrders: number;
    averageSpending: number;
    topSpender: UserSpendingRecord | null;
  }> {
    const records = await this.readDatabase();
    
    if (records.length === 0) {
      return {
        totalSpent: 0,
        totalOrders: 0,
        averageSpending: 0,
        topSpender: null
      };
    }

    const totalSpent = records.reduce((sum, r) => sum + r.totalSpend, 0);
    const totalOrders = records.reduce((sum, r) => sum + r.totalOrders, 0);
    const averageSpending = totalSpent / records.length;
    const topSpender = records.sort((a, b) => b.totalSpend - a.totalSpend)[0];

    return {
      totalSpent,
      totalOrders,
      averageSpending,
      topSpender
    };
  }

  private getRoastLevel(totalSpend: number): string {
    if (totalSpend < 1500) return 'Mild Spender';
    if (totalSpend < 3000) return 'Regular Burner';
    if (totalSpend < 5000) return 'Savage Spender';
    return 'Nuclear Wallet';
  }
}

// Singleton instance
export const leaderboardDB = new LeaderboardDatabase();
