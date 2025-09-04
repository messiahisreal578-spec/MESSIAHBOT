import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Signal } from '../../types';

interface SignalCardProps {
  signal: Signal;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const getStatusIcon = () => {
    switch (signal.status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'EXECUTED':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'EXPIRED':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (signal.status) {
      case 'PENDING':
        return 'bg-yellow-50 border-yellow-200';
      case 'EXECUTED':
        return 'bg-green-50 border-green-200';
      case 'EXPIRED':
        return 'bg-red-50 border-red-200';
    }
  };

  const formatTimeframe = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-4 ${getStatusColor()}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">{signal.pair}</span>
          {getStatusIcon()}
        </div>
        <span className="text-sm text-gray-600">
          {signal.timestamp.toLocaleTimeString()}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {signal.direction === 'UP' ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-medium ${
            signal.direction === 'UP' ? 'text-green-600' : 'text-red-600'
          }`}>
            {signal.direction}
          </span>
        </div>
        <span className="text-sm bg-gray-200 px-2 py-1 rounded">
          {formatTimeframe(signal.timeframe)}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Confidence: <span className="font-medium">{signal.confidence}%</span>
        </span>
        {signal.profit !== undefined && (
          <span className={`font-medium ${
            signal.profit >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {signal.profit >= 0 ? '+' : ''}{signal.profit}%
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default SignalCard;
