import { useState, useEffect } from 'react';
import { Signal } from '../types';
import { generateMockSignal } from '../utils/mockData';

export const useSignals = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate initial mock signals
    const initialSignals = Array.from({ length: 5 }, () => generateMockSignal());
    setSignals(initialSignals);
    setIsLoading(false);

    // Simulate real-time signal updates
    const interval = setInterval(() => {
      const newSignal = generateMockSignal();
      setSignals(prev => [newSignal, ...prev.slice(0, 9)]);
    }, 15000); // New signal every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return { signals, isLoading };
};
