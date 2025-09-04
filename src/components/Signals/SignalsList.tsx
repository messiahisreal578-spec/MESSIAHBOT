import React from 'react';
import { motion } from 'framer-motion';
import SignalCard from './SignalCard';
import { Signal } from '../../types';

interface SignalsListProps {
  signals: Signal[];
  isLoading: boolean;
}

const SignalsList: React.FC<SignalsListProps> = ({ signals, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-xl font-bold text-gray-900">Recent Signals</h2>
        <span className="text-sm text-gray-600">{signals.length} signals</span>
      </motion.div>
      
      <div className="space-y-3">
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
};

export default SignalsList;
