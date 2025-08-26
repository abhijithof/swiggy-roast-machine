import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function getRoastEmoji(level: string): string {
  switch (level.toLowerCase()) {
    case 'mild': return '🔥';
    case 'medium': return '🔥🔥';
    case 'savage': return '🔥🔥🔥';
    case 'nuclear': return '💀🔥💀';
    default: return '🔥';
  }
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
}

export function generateRoastableInsults(): string[] {
  return [
    "Your delivery boy probably knows your house better than your own family! 🏠📦",
    "You've single-handedly kept Swiggy in business! 💰",
    "Your kitchen is probably just a storage room at this point! 🧹",
    "The delivery app notification sound is your Pavlovian dinner bell! 🔔",
    "You've spent enough to feed a small village... or one very hungry you! 🍽️",
    "Your credit card statement looks like a food delivery receipt compilation! 💳",
    "You're basically paying rent to Swiggy at this point! 🏠💸",
    "The delivery fees alone could have bought you a cooking course! 👨‍🍳",
    "Your neighbors probably think you run a restaurant from how many deliveries you get! 🏪",
    "You've mastered the art of ordering food but not cooking it! 🎭"
  ];
}

export function calculateSpendingPercentile(userSpend: number, allSpends: number[]): number {
  if (allSpends.length === 0) return 50;
  
  const sortedSpends = allSpends.sort((a, b) => a - b);
  const rank = sortedSpends.filter(spend => spend <= userSpend).length;
  
  return Math.round((rank / sortedSpends.length) * 100);
}

export function getSpendingCategory(amount: number): {
  category: string;
  color: string;
  description: string;
} {
  if (amount < 1500) {
    return {
      category: 'Mild Spender',
      color: 'text-green-600 bg-green-100',
      description: 'You show restraint... sometimes'
    };
  } else if (amount < 3000) {
    return {
      category: 'Regular Burner',
      color: 'text-yellow-600 bg-yellow-100',
      description: 'You know how to treat yourself'
    };
  } else if (amount < 5000) {
    return {
      category: 'Savage Spender',
      color: 'text-orange-600 bg-orange-100',
      description: 'Money burns a hole in your pocket'
    };
  } else {
    return {
      category: 'Nuclear Wallet',
      color: 'text-red-600 bg-red-100',
      description: 'Swiggy executives personally thank you'
    };
  }
}

export function generateShareText(analytics: unknown, roast: unknown): string {
  const analyticsObj = analytics as Record<string, unknown>;
  const roastObj = roast as Record<string, unknown>;
  
  return `🔥 I just got ROASTED by the Swiggy Roast Machine! 🔥

💰 Total Damage: ₹${Number(analyticsObj.totalSpend || 0).toLocaleString()}
📦 Orders: ${Number(analyticsObj.totalOrders || 0)}
🎯 Roast Level: ${String(roastObj.roastLevel || 'MILD').toUpperCase()}
🔥 Burn Score: ${Number(roastObj.roastScore || 0)}/100

"${String(roastObj.overallRoast || 'You got roasted!')}"

Think you can handle the heat? Get roasted too! 
#SwiggyRoastMachine #FoodDeliveryShame #GotRoasted`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

