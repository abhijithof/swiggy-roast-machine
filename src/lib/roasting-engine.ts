import OpenAI from 'openai';
import { SwiggyAnalytics, RoastAnalysis } from '@/types';

export class SwiggyRoastingEngine {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateRoast(analytics: SwiggyAnalytics): Promise<RoastAnalysis> {
    try {
      const prompt = this.createRoastPrompt(analytics);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a WITTY Indian food delivery roast master! You understand Indian youth, their earnings (₹20k-50k/month), and food culture. You're funny and teasing but FAIR - you roast based on REALISTIC Indian spending patterns, not Western standards.

Your job is to ROAST ${analytics.customerName} based on their Swiggy spending data. Be funny but contextual to Indian lifestyle! Reference Indian food culture, delivery habits, and realistic spending for young Indians.

Roast levels (adjusted for Indian earnings):
- MILD: Light teasing (₹0-3000 total spend) - "Actually quite reasonable!"
- MEDIUM: Playful roasting (₹3000-8000 spend) - "Getting comfortable with delivery"
- SAVAGE: Serious addiction (₹8000-15000 spend) - "Swiggy is your second home"
- NUCLEAR: Absolute madness (₹15000+ spend) - "Are you funding Swiggy's IPO?"

Context: Average Indian youth salary ₹25k-40k/month. ₹1000-2000/month on food delivery is NORMAL. ₹500/month is quite conservative. Don't shame reasonable spending!

Make it FUNNY but FAIR to Indian standards! 😂🍛`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 1.1, // Maximum creativity for unique roasts
        max_tokens: 2500,
        presence_penalty: 0.6, // Avoid repetitive content
        frequency_penalty: 0.8, // Encourage variety in word choice
      });

      const roastContent = completion.choices[0]?.message?.content;
      if (!roastContent) {
        throw new Error('No roast generated from OpenAI');
      }

      return this.parseRoastResponse(roastContent, analytics);
    } catch (error) {
      console.error('Error generating roast:', error);
      return this.getFallbackRoast(analytics);
    }
  }

  private createRoastPrompt(analytics: SwiggyAnalytics): string {
    const sessionId = Date.now();
    const creativeSeed = Math.floor(Math.random() * 1000);
    
    return `
ROAST SESSION #${sessionId}-${creativeSeed}
TARGET: ${analytics.customerName} 
REAL SWIGGY SPENDING DATA:
💰 Total Spent: ₹${analytics.totalSpend}
📦 Total Orders: ${analytics.totalOrders}
💵 Average Order: ₹${analytics.averageOrderValue}
📅 Monthly Burn: ₹${analytics.monthlySpend}
🔄 Order Frequency: ${analytics.orderFrequency} orders/month
❌ Cancellation Rate: ${(analytics.cancellationRate * 100).toFixed(1)}%
🏠 Delivery Addresses: ${Object.keys(analytics.addresses).length} locations

Create a FUNNY but FAIR roast that's appropriate for Indian youth context:

1. **MAIN ROAST** (2-3 sentences): Witty observation about their spending habits
2. **SPENDING CONTEXT** (1-2 sentences): Put their spending in perspective  
3. **CATEGORY ROASTS** for:
   - Spending Habits: Gentle teasing about delivery preferences
   - Order Frequency: Fun observations about ordering patterns
   - Food Choices: Light jokes about food preferences
   - Lifestyle: Playful comments about modern Indian youth lifestyle

4. **FUN FACTS** (3-5 bullets): Interesting comparisons and observations
5. **ROAST EMOJIS** (5-7): Appropriate emojis for the roast level

Make references to:
- Indian food culture and delivery convenience  
- Reasonable spending for working youth
- Modern lifestyle vs traditional cooking
- Delivery as convenience, not laziness
- Cost comparisons to Indian context (street food, home cooking)
- College/working life balance

BE WITTY and CONTEXTUAL! Remember ₹1500-2000 total spend is REASONABLE for Indian youth! 😂🍛

IMPORTANT: Make this roast UNIQUE and CREATIVE! Don't use generic phrases. Be specific to ${analytics.customerName}'s data. Use creative analogies, current pop culture references, and unique Indian context. Every roast should feel personalized and fresh!

CREATIVE CHALLENGE: Come up with something completely original that no other user has heard before! Think outside the box!

Hey ${analytics.customerName}! Time for your personalized Swiggy roast! 🔥

You've spent ₹${analytics.totalSpend} on ${analytics.totalOrders} orders (₹${analytics.averageOrderValue} average). That's actually pretty reasonable for Indian youth! But let's have some fun with it...

Write a super creative, witty roast that's specific to these numbers. Make it feel like a clever friend is teasing them. Include:

- A funny main observation about their spending pattern
- Witty jokes about ordering ₹${analytics.averageOrderValue} worth of food per order
- Creative comparisons (like "That's enough to buy X street food plates!")
- Playful commentary on their ${analytics.orderFrequency} orders per month lifestyle
- Some amusing observations about modern Indian food delivery culture

Make it UNIQUE and PERSONAL to their actual data! Avoid generic phrases. Be clever, current, and distinctly Indian in your humor. Write like you're roasting them at a college fest - funny but not mean.

NO LABELS OR STRUCTURE - just write a flowing, conversational roast that flows naturally! 🎭
`;
  }

  private parseRoastResponse(content: string, analytics: SwiggyAnalytics): RoastAnalysis {
    try {
      console.log('🔥 RAW AI RESPONSE:', content);
      
      // Clean content by removing any field labels that might have leaked
      const cleanContent = content
        .replace(/OVERALL_ROAST:\s*/gi, '')
        .replace(/SPENDING_SHAME:\s*/gi, '')
        .replace(/SPENDING_HABITS:\s*/gi, '')
        .replace(/ORDER_FREQUENCY:\s*/gi, '')
        .replace(/FOOD_CHOICES:\s*/gi, '')
        .replace(/LIFESTYLE:\s*/gi, '')
        .replace(/FUN_FACT_\d+:\s*/gi, '')
        .replace(/EMOJIS:\s*/gi, '')
        .replace(/\d+\.\s*/g, '') // Remove numbered lists
        .trim();
      
      console.log('🧹 CLEANED CONTENT:', cleanContent);
      
      // Split into meaningful sentences/paragraphs
      const sentences = cleanContent
        .split(/[.!?]\s+/)
        .filter(sentence => sentence.trim().length > 10)
        .map(sentence => sentence.trim());
      
      const paragraphs = cleanContent
        .split('\n\n')
        .filter(para => para.trim().length > 5)
        .map(para => para.trim());
      
      console.log('📝 SENTENCES:', sentences);
      console.log('📝 PARAGRAPHS:', paragraphs);
      
      // Use the AI content creatively
      const roastLevel = this.determineRoastLevel(analytics.totalSpend);
      const roastScore = this.calculateRoastScore(analytics);
      const burnDegree = this.determineBurnDegree(roastScore);
      
      return {
        overallRoast: sentences[0] || paragraphs[0] || this.generateCustomRoast(analytics),
        spendingShame: sentences[1] || paragraphs[1] || this.generateCustomSpendingRoast(analytics),
        roastLevel,
        roastScore,
        roastCategories: {
          spendingHabits: this.generateUniqueRoast('spending', analytics, sentences),
          orderFrequency: this.generateUniqueRoast('frequency', analytics, sentences),
          foodChoices: this.generateUniqueRoast('food', analytics, sentences),
          lifestyle: this.generateUniqueRoast('lifestyle', analytics, sentences)
        },
        funFacts: this.extractFactsFromContent(cleanContent, analytics),
        burnDegree,
        roastEmojis: this.extractEmojisFromContent(cleanContent, analytics)
      };
    } catch (error) {
      console.error('Error parsing roast response:', error);
      return this.getFallbackRoast(analytics);
    }
  }

  private extractField(content: string, field: string): string | null {
    const regex = new RegExp(`${field}:\\s*(.+?)(?=\\n[A-Z_]+:|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  private cleanExtractField(content: string, field: string): string | null {
    const extracted = this.extractField(content, field);
    if (!extracted) return null;
    
    // Remove any remaining field labels that might have leaked through
    return extracted
      .replace(/^(OVERALL_ROAST|SPENDING_SHAME|SPENDING_HABITS|ORDER_FREQUENCY|FOOD_CHOICES|LIFESTYLE|FUN_FACT_\d+|EMOJIS):\s*/gi, '')
      .trim();
  }

  private determineRoastLevel(totalSpend: number): 'mild' | 'medium' | 'savage' | 'nuclear' {
    // Adjusted for Indian spending patterns - more realistic thresholds
    if (totalSpend < 3000) return 'mild';     // ₹0-3k: Actually quite reasonable
    if (totalSpend < 8000) return 'medium';   // ₹3-8k: Getting comfortable  
    if (totalSpend < 15000) return 'savage';  // ₹8-15k: Serious addiction
    return 'nuclear';                         // ₹15k+: Absolute madness
  }

  private calculateRoastScore(analytics: SwiggyAnalytics): number {
    let score = 0;
    
    // Base score from spending (0-40 points) - adjusted for Indian context
    // ₹15000+ gets max points, ₹1500 gets minimal points
    score += Math.min(40, analytics.totalSpend / 375); // More forgiving threshold
    
    // Order frequency bonus (0-20 points) - Indian context
    // 10+ orders/month is high, 2-3 orders/month is normal
    score += Math.min(20, (analytics.orderFrequency - 1) * 3);
    
    // Average order value (0-20 points) - Indian context  
    // ₹300+ is high, ₹150-200 is normal
    score += Math.min(20, Math.max(0, (analytics.averageOrderValue - 150) / 15));
    
    // Cancellation rate penalty (0-20 points)
    score += analytics.cancellationRate * 200;
    
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  private determineBurnDegree(roastScore: number): 'first' | 'second' | 'third' | 'fourth' {
    if (roastScore < 25) return 'first';
    if (roastScore < 50) return 'second';
    if (roastScore < 75) return 'third';
    return 'fourth';
  }

  private getFallbackRoast(analytics: SwiggyAnalytics): RoastAnalysis {
    const isLowSpending = analytics.totalSpend < 3000;
    
    return {
      overallRoast: isLowSpending 
        ? `${analytics.customerName}, ₹${analytics.totalSpend} on ${analytics.totalOrders} orders? That's actually quite reasonable for today's lifestyle! Your wallet and your taste buds are in perfect harmony! 😊`
        : `${analytics.customerName}, ₹${analytics.totalSpend} on food delivery! You're single-handedly keeping Swiggy's investors happy! 😂`,
      spendingShame: isLowSpending
        ? `₹${analytics.monthlySpend} per month is the kind of balanced spending your parents would be proud of!`
        : `₹${analytics.monthlySpend} every month? At this rate, you'll have your own dedicated delivery partner!`,
      roastLevel: this.determineRoastLevel(analytics.totalSpend),
      roastScore: this.calculateRoastScore(analytics),
      roastCategories: {
        spendingHabits: isLowSpending ? 'Fiscally responsible foodie!' : 'Your wallet is crying in Swiggy Orange!',
        orderFrequency: isLowSpending ? 'Balanced delivery life!' : 'The delivery app knows you better than your mom!',
        foodChoices: isLowSpending ? 'Smart food choices!' : 'Living the premium delivery lifestyle!',
        lifestyle: isLowSpending ? 'Modern yet practical!' : 'Kitchen? What kitchen? You only know delivery!'
      },
      funFacts: [
        isLowSpending 
          ? `That's like ${Math.floor(analytics.totalSpend / 20)} plates of street food - totally reasonable!`
          : `You could have bought ${Math.floor(analytics.totalSpend / 50)} packets of instant noodles!`,
        `${analytics.orderFrequency} orders per month means you're a balanced delivery user!`,
        `₹${analytics.averageOrderValue} per order is pretty standard for today's portions!`
      ],
      burnDegree: this.determineBurnDegree(this.calculateRoastScore(analytics)),
      roastEmojis: isLowSpending ? ['😊', '👍', '🍛', '💰', '✨'] : ['🔥', '😂', '💸', '🍕', '😭']
    };
  }

  private generateCustomRoast(analytics: SwiggyAnalytics): string {
    const roasts = [
      `${analytics.customerName}, with ₹${analytics.totalSpend} total spend, you're like that friend who orders biryani and then asks for extra raita packets! 😂`,
      `₹${analytics.totalSpend} on ${analytics.totalOrders} orders? You've achieved the perfect balance of treating yourself without going broke! 🎯`,
      `${analytics.customerName}, your Swiggy game is stronger than your cooking game, but at least your wallet isn't crying! 💪`,
      `With ₹${analytics.averageOrderValue} average orders, you're the type who reads the entire menu and still orders the same thing! 🤔`,
      `${analytics.totalOrders} orders and counting! You've basically become a Swiggy scholar with a PhD in food delivery! 🎓`
    ];
    return roasts[Math.floor(Math.random() * roasts.length)];
  }

  private generateCustomSpendingRoast(analytics: SwiggyAnalytics): string {
    const spendingRoasts = [
      `₹${analytics.monthlySpend} per month? That's like buying one expensive coffee every few days - totally reasonable! ☕`,
      `Your monthly ₹${analytics.monthlySpend} delivery budget shows you know how to live in 2024 without going overboard! 📱`,
      `₹${analytics.monthlySpend}/month means you're treating delivery like dessert - occasionally and guilt-free! 🍰`,
      `At ₹${analytics.monthlySpend} monthly, you're the responsible friend who splits the bill fairly! 🤝`,
      `₹${analytics.monthlySpend} per month is what some people spend on just one weekend outing! Smart priorities! 🧠`
    ];
    return spendingRoasts[Math.floor(Math.random() * spendingRoasts.length)];
  }

  private generateCategoryRoast(category: string, analytics: SwiggyAnalytics): string {
    const roasts = {
      spending: [
        `₹${analytics.totalSpend} total? That's like ${Math.floor(analytics.totalSpend / 30)} cups of chai - totally reasonable!`,
        `₹${analytics.monthlySpend}/month is what some people spend on Netflix subscriptions!`,
        `Your spending is more balanced than a perfectly loaded biryani plate!`,
        `₹${analytics.averageOrderValue} per order shows you know the value of money AND good food!`
      ],
      frequency: [
        `${analytics.orderFrequency} orders/month means you're not a delivery addict, just a smart user!`,
        `You order every ${Math.ceil(30/analytics.orderFrequency)} days - that's strategic planning!`,
        `Your ordering pattern is more consistent than Mumbai local trains!`,
        `${analytics.totalOrders} orders total? That's commitment to the delivery lifestyle!`
      ],
      food: [
        `₹${analytics.averageOrderValue} average suggests you order actual meals, not just snacks!`,
        `Your food choices are probably better than your playlist choices!`,
        `You've mastered the art of online menu browsing without breaking the bank!`,
        `Your delivery game is stronger than your cooking game (probably)!`
      ],
      lifestyle: [
        `Living that modern Indian life - convenience without the guilt!`,
        `You've embraced technology while keeping your expenses in check!`,
        `Your lifestyle screams "I've got my priorities straight!"`,
        `Balancing tradition (home food) with innovation (delivery apps) like a true millennial!`
      ]
    };
    const categoryRoasts = roasts[category as keyof typeof roasts];
    return categoryRoasts[Math.floor(Math.random() * categoryRoasts.length)];
  }

  private generateUniqueRoast(category: string, analytics: SwiggyAnalytics, sentences: string[]): string {
    // Try to find a relevant sentence from AI content first
    const relevantSentence = sentences.find(sentence => {
      const lowerSentence = sentence.toLowerCase();
      switch(category) {
        case 'spending':
          return lowerSentence.includes('₹') || lowerSentence.includes('spend') || lowerSentence.includes('money');
        case 'frequency': 
          return lowerSentence.includes('order') || lowerSentence.includes('month') || lowerSentence.includes('time');
        case 'food':
          return lowerSentence.includes('food') || lowerSentence.includes('meal') || lowerSentence.includes('delivery');
        case 'lifestyle':
          return lowerSentence.includes('life') || lowerSentence.includes('style') || lowerSentence.includes('habit');
        default:
          return false;
      }
    });

    return relevantSentence || this.generateCategoryRoast(category, analytics);
  }

  private parseFunFacts(content: string, analytics: SwiggyAnalytics): string[] {
    const extracted = [
      this.extractField(content, 'FUN_FACT_1'),
      this.extractField(content, 'FUN_FACT_2'), 
      this.extractField(content, 'FUN_FACT_3')
    ].filter(fact => fact);

    if (extracted.length >= 3) return extracted;

    // Generate creative fun facts if AI didn't provide them
    const facts = [
      `That's like ${Math.floor(analytics.totalSpend / 20)} plates of street food - totally worth it!`,
      `₹${analytics.averageOrderValue} per order is what some people spend on a single Starbucks drink!`,
      `${analytics.orderFrequency} orders/month means you're more disciplined than most gym memberships!`,
      `You've spent ₹${analytics.totalSpend} total, which is less than one month of most people's coffee addiction!`,
      `Your delivery frequency suggests you've mastered the art of balanced indulgence!`,
      `₹${analytics.monthlySpend}/month is what some people spend on unnecessary subscriptions!`
    ];
    
    return facts.slice(0, 3);
  }

  private parseEmojis(content: string, analytics: SwiggyAnalytics): string[] {
    const extracted = this.extractField(content, 'EMOJIS');
    if (extracted) {
      return extracted.split(',').map(e => e.trim());
    }

    const isLowSpending = analytics.totalSpend < 3000;
    const emojiSets = isLowSpending 
      ? [['😊', '👍', '🍛', '💰', '✨'], ['🎯', '😄', '🍕', '💚', '⭐'], ['😁', '🤗', '🍜', '💛', '🌟']]
      : [['🔥', '😂', '💸', '🍕', '😭'], ['🤑', '🍔', '😅', '💰', '🎭'], ['🍟', '😵', '💳', '🤯', '🎪']];
    
    return emojiSets[Math.floor(Math.random() * emojiSets.length)];
  }

  private extractFactsFromContent(content: string, analytics: SwiggyAnalytics): string[] {
    // Try to find facts in the content
    const factIndicators = [
      /That's like .+/gi,
      /You could have .+/gi,
      /Your .+ means .+/gi,
      /₹\d+.+/gi
    ];
    
    const foundFacts: string[] = [];
    factIndicators.forEach(regex => {
      const matches = content.match(regex);
      if (matches) {
        foundFacts.push(...matches.slice(0, 2)); // Max 2 per pattern
      }
    });

    // If we found enough facts, use them
    if (foundFacts.length >= 3) {
      return foundFacts.slice(0, 3);
    }

    // Otherwise generate creative ones
    return this.parseFunFacts(content, analytics);
  }

  private extractEmojisFromContent(content: string, analytics: SwiggyAnalytics): string[] {
    // Extract emojis from the content
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    const foundEmojis = content.match(emojiRegex);
    
    if (foundEmojis && foundEmojis.length >= 3) {
      return foundEmojis.slice(0, 7); // Max 7 emojis
    }

    // Otherwise use random appropriate ones
    return this.parseEmojis(content, analytics);
  }
}

