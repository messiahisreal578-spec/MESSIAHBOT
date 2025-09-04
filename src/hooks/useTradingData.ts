import { useState, useEffect } from 'react';
import { TradingPair, PerformanceMetrics } from '../types';
import { generateMockTradingPairs, generateMockPerformanceMetrics } from '../utils/mockData';

export const useTradingData = () => {
  const [pairs, setPairs] = useState<TradingPair[]>([]);
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate mock data
    setPairs(generateMockTradingPairs());
    setPerformance(generateMockPerformanceMetrics());
    setIsLoading(false);

    // Simulate price updates
    const interval = setInterval(() => {
      setPairs(prev => prev.map(pair => ({
        ...pair,
        price: pair.price * (1 + (Math.random() - 0.5) * 0.02),
        change24h: pair.change24h + (Math.random() - 0.5) * 0.5
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { pairs, performance, isLoading };
};
