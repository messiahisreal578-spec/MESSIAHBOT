import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Target, BarChart } from 'lucide-react';
import { PerformanceMetrics as PerformanceMetricsType } from '../../types';

interface PerformanceMetricsProps {
  metrics: PerformanceMetricsType | null;
  isLoading: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics, isLoading }) => {
  if (isLoading || !metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Trades',
      value: metrics.totalTrades.toLocaleString(),
      icon: BarChart,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-600'
    },
    {
      title: 'Win Rate',
      value: `${metrics.winRate}%`,
      icon: Target,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-600'
    },
    {
      title: 'Total Profit',
      value: `$${metrics.totalProfit.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-50 text-purple-600',
      bgColor: 'bg-purple-600'
    },
    {
      title: 'Daily Profit',
      value: `${metrics.dailyProfit >= 0 ? '+' : ''}$${metrics.dailyProfit}`,
      icon: TrendingUp,
      color: metrics.dailyProfit >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600',
      bgColor: metrics.dailyProfit >= 0 ? 'bg-green-600' : 'bg-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Profit</h3>
          <p className={`text-2xl font-bold ${
            metrics.weeklyProfit >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.weeklyProfit >= 0 ? '+' : ''}${metrics.weeklyProfit}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Profit</h3>
          <p className={`text-2xl font-bold ${
            metrics.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.monthlyProfit >= 0 ? '+' : ''}${metrics.monthlyProfit}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg. Trade</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${(metrics.totalProfit / metrics.totalTrades).toFixed(2)}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
