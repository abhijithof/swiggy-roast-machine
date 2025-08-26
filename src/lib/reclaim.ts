import { SwiggyAnalytics } from '../types';

export class ReclaimSwiggyClient {
  private appId: string;
  private appSecret: string;
  private providerId: string;

  constructor() {
    this.appId = process.env.NEXT_PUBLIC_RECLAIM_APP_ID || '0x053e0EeddA7B73e9ec5bFD487e7c291fFb7fc5C7';
    this.appSecret = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET || '0x6fc8a6fc1ac7f8eb4f0ab8efb8c428df7473cbfced0499b42a570a8982d7a3b4';
    this.providerId = process.env.NEXT_PUBLIC_RECLAIM_PROVIDER_ID || 'e7da584e-7353-4b88-a51d-3fc8abc332f0';
  }

  /**
   * Parse real Swiggy analytics from Reclaim proof
   */
  parseSwiggyAnalytics(proofs: unknown): SwiggyAnalytics | null {
    try {
      console.log('🔥 PARSING REAL SWIGGY DATA FOR ROASTING:', proofs);

      // Check if we have publicData with actual analytics
      let publicData = null;
      const proofsObj = proofs as Record<string, unknown>;
      if (proofsObj?.publicData && typeof proofsObj.publicData === 'object' && proofsObj.publicData !== null) {
        const publicDataObj = proofsObj.publicData as Record<string, unknown>;
        if (publicDataObj.data) {
          publicData = publicDataObj.data;
        }
      } else if (Array.isArray(proofs) && proofs[0] && typeof proofs[0] === 'object' && proofs[0] !== null) {
        const firstProof = proofs[0] as Record<string, unknown>;
        if (firstProof.publicData && typeof firstProof.publicData === 'object' && firstProof.publicData !== null) {
          const publicDataObj = firstProof.publicData as Record<string, unknown>;
          if (publicDataObj.data) {
            publicData = publicDataObj.data;
          }
        }
      }

      if (publicData && typeof publicData === 'object' && publicData !== null) {
        const publicDataObj = publicData as Record<string, unknown>;
        if (publicDataObj.analysis && typeof publicDataObj.analysis === 'object' && publicDataObj.analysis !== null) {
          const analysisObj = publicDataObj.analysis as Record<string, unknown>;
          if (analysisObj.last12MonthOrders) {
            const analytics = analysisObj.last12MonthOrders as Record<string, unknown>;
            const addressAnalysis = analysisObj.address as Record<string, unknown>;

        console.log('🎯 REAL ANALYTICS FOUND FOR ROASTING!');
        console.log(`💰 Spent ₹${analytics.totalSpend} on ${analytics.totalOrders} orders`);

            return {
              customerName: String(publicDataObj.name || 'Anonymous'),
              customerId: String(publicDataObj.customer_id || Date.now()),
              email: String(publicDataObj.email || 'user@example.com'),
              totalOrders: Number(analytics.totalOrders || 0),
              totalSpend: parseFloat(String(analytics.totalSpend || 0)),
              averageOrderValue: parseFloat(String(analytics.averageOrderValue || 0)),
              monthlySpend: parseFloat(String(analytics.averageMonthlySpend || 0)),
              orderFrequency: Math.round(Number(analytics.totalOrders || 0) / 12 * 10) / 10, // orders per month
              cancellationRate: Number(analytics.cancellationRatio || 0),
              lastOrderAge: String(addressAnalysis?.lastDeliveryAge || 'Unknown'),
              addresses: (addressAnalysis?.allAddresses as Record<string, string>) || {}
            };
          }
        }
      }

      console.log('⚠️ No analytics data found in proof');
      return null;
    } catch (error) {
      console.error('❌ Error parsing Swiggy analytics:', error);
      return null;
    }
  }

  /**
   * Generate mock analytics for testing (when real data isn't available)
   */
  generateMockAnalytics(customerName: string = 'Demo User'): SwiggyAnalytics {
    const mockSpend = Math.round(Math.random() * 5000 + 1000); // ₹1000-6000
    const mockOrders = Math.round(Math.random() * 30 + 10); // 10-40 orders
    
    return {
      customerName,
      customerId: `mock-${Date.now()}`,
      email: 'demo@example.com',
      totalOrders: mockOrders,
      totalSpend: mockSpend,
      averageOrderValue: Math.round(mockSpend / mockOrders),
      monthlySpend: Math.round(mockSpend / 12),
      orderFrequency: Math.round(mockOrders / 12 * 10) / 10,
      cancellationRate: Math.random() * 0.1, // 0-10% cancellation
      lastOrderAge: `${Math.floor(Math.random() * 30)} days ago`,
      addresses: {
        'Home': 'Demo Address, Demo City',
        'Work': 'Demo Office, Demo Area'
      }
    };
  }
}

