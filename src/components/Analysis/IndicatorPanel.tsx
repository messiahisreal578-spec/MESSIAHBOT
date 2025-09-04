import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AdvancedIndicators } from '../../types';

interface IndicatorPanelProps {
  indicators: AdvancedIndicators;
}

const IndicatorPanel: React.FC<IndicatorPanelProps> = ({ indicators }) => {
  const getIndicatorColor = (value: number, type: 'rsi' | 'williams' | 'cci' | 'stochastic') => {
    switch (type) {
      case 'rsi':
        if (value > 70) return 'text-red-600 bg-red-50';
        if (value < 30) return 'text-green-600 bg-green-50';
        return 'text-gray-600 bg-gray-50';
      case 'williams':
        if (value > -20) return 'text-red-600 bg-red-50';
        if (value < -80) return 'text-green-600 bg-green-50';
        return 'text-gray-600 bg-gray-50';
      case 'cci':
        if (value > 100) return 'text-red-600 bg-red-50';
        if (value < -100) return 'text-green-600 bg-green-50';
        return 'text-gray-600 bg-gray-50';
      case 'stochastic':
        if (value > 80) return 'text-red-600 bg-red-50';
        if (value < 20) return 'text-green-600 bg-green-50';
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'BULLISH':
      case 'STRONG':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'BEARISH':
      case 'WEAK':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Momentum Indicators */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Momentum Indicators</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg border ${getIndicatorColor(indicators.rsi, 'rsi')}`}
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-1">RSI (14)</h5>
              <p className="text-2xl font-bold">{indicators.rsi}</p>
              <p className="text-xs mt-1">
                {indicators.rsi > 70 ? 'Overbought' : indicators.rsi < 30 ? 'Oversold' : 'Neutral'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-lg border ${getIndicatorColor(indicators.stochastic.k, 'stochastic')}`}
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-1">Stochastic</h5>
              <p className="text-lg font-bold">
                {indicators.stochastic.k} / {indicators.stochastic.d}
              </p>
              <p className="text-xs mt-1">
                {indicators.stochastic.k > 80 ? 'Overbought' : indicators.stochastic.k < 20 ? 'Oversold' : 'Neutral'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`p-4 rounded-lg border ${getIndicatorColor(indicators.williams, 'williams')}`}
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-1">Williams %R</h5>
              <p className="text-2xl font-bold">{indicators.williams}</p>
              <p className="text-xs mt-1">
                {indicators.williams > -20 ? 'Overbought' : indicators.williams < -80 ? 'Oversold' : 'Neutral'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-lg border ${getIndicatorColor(indicators.cci, 'cci')}`}
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-1">CCI (20)</h5>
              <p className="text-2xl font-bold">{indicators.cci}</p>
              <p className="text-xs mt-1">
                {indicators.cci > 100 ? 'Overbought' : indicators.cci < -100 ? 'Oversold' : 'Neutral'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trend Indicators */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Trend & Volatility</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-gray-50 rounded-lg border"
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-2">MACD</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>MACD:</span>
                  <span className={`font-medium ${indicators.macd.macd > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {indicators.macd.macd}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Signal:</span>
                  <span className="font-medium">{indicators.macd.signal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Histogram:</span>
                  <span className={`font-medium ${indicators.macd.histogram > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {indicators.macd.histogram}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-gray-50 rounded-lg border"
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-2">ADX</h5>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {getTrendIcon(indicators.adx.trend)}
                <span className="text-2xl font-bold">{indicators.adx.adx}</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>+DI:</span>
                  <span className="font-medium text-green-600">{indicators.adx.pdi}</span>
                </div>
                <div className="flex justify-between">
                  <span>-DI:</span>
                  <span className="font-medium text-red-600">{indicators.adx.mdi}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 bg-gray-50 rounded-lg border"
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-2">ATR</h5>
              <p className="text-2xl font-bold text-blue-600">{indicators.atr}</p>
              <p className="text-xs mt-1 text-gray-600">Average True Range</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Support & Resistance */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Key Levels</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="p-4 bg-gray-50 rounded-lg border"
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-2">Bollinger Bands</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Upper:</span>
                  <span className="font-medium text-red-600">{indicators.bollinger.upper}</span>
                </div>
                <div className="flex justify-between">
                  <span>Middle:</span>
                  <span className="font-medium text-blue-600">{indicators.bollinger.middle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lower:</span>
                  <span className="font-medium text-green-600">{indicators.bollinger.lower}</span>
                </div>
                <div className="text-center mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    indicators.bollinger.position === 'UPPER' ? 'bg-red-100 text-red-800' :
                    indicators.bollinger.position === 'LOWER' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {indicators.bollinger.position}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="p-4 bg-gray-50 rounded-lg border"
          >
            <div className="text-center">
              <h5 className="text-sm font-medium mb-2">Fibonacci Levels</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Resistance (61.8%):</span>
                  <span className="font-medium text-red-600">{indicators.fibonacci.resistance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Support (38.2%):</span>
                  <span className="font-medium text-green-600">{indicators.fibonacci.support}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ichimoku */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Ichimoku Cloud</h4>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="p-4 bg-gray-50 rounded-lg border"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Tenkan-sen</p>
              <p className="font-medium">{indicators.ichimoku.tenkan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kijun-sen</p>
              <p className="font-medium">{indicators.ichimoku.kijun}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chikou Span</p>
              <p className="font-medium">{indicators.ichimoku.chikou}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cloud</p>
              <div className="flex items-center justify-center space-x-1">
                {getTrendIcon(indicators.ichimoku.cloud)}
                <span className={`font-medium ${
                  indicators.ichimoku.cloud === 'BULLISH' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {indicators.ichimoku.cloud}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IndicatorPanel;
