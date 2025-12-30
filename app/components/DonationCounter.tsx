'use client';

import { useEffect, useState } from 'react';

/**
 * Dynamic donation counter component
 * Displays total collected amount with animated counting effect
 */
export default function DonationCounter() {
  const [displayAmount, setDisplayAmount] = useState(125000000);
  
  // In a real app, this would fetch from an API
  const targetAmount = 125000000;
  
  useEffect(() => {
    // Simulate real-time updates (in production, this would come from an API/WebSocket)
    const interval = setInterval(() => {
      // Random small increment to simulate live donations
      setDisplayAmount((prev) => prev + Math.floor(Math.random() * 100));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-red-900 text-white py-2 px-4 overflow-hidden relative">
      <div className="whitespace-nowrap">
        <div className="inline-block animate-scroll">
          <span className="text-sm md:text-base font-medium">
            TOTAL COLLECTED: <span className="font-bold">{formatAmount(displayAmount)}</span>
          </span>
          <span className="mx-8">•</span>
          <span className="text-sm md:text-base font-medium">
            TOTAL COLLECTED: <span className="font-bold">{formatAmount(displayAmount)}</span>
          </span>
          <span className="mx-8">•</span>
          <span className="text-sm md:text-base font-medium">
            TOTAL COLLECTED: <span className="font-bold">{formatAmount(displayAmount)}</span>
          </span>
          <span className="mx-8">•</span>
          <span className="text-sm md:text-base font-medium">
            TOTAL COLLECTED: <span className="font-bold">{formatAmount(displayAmount)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

