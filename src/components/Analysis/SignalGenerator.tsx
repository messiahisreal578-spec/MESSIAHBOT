import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, RefreshCw, Target } from 'lucide-react';
import CandlestickChart from './CandlestickChart';
import { CandleData, AnalysisResult } from '../../types';
import { generateCandleData, analyzeChart } from '../../utils/chartAnalysis';

const TRADING_PAIRS = [
  'EURUSD-OTC',
  'AUDUSD-OTC'
];

const TIMEFRAMES = [
  { value: 30, label: '30 seconds' },
  { value: 60, label: '1 minute' },
  { value: 120, label: '2 minutes' },
  { value: 300, label: '5 minutes' },
  { value: 900, label: '15 minutes' },
  { value: 1800, label: '30 minutes' },
  { value: 3600, label: '1 hour' }
];

const SignalGenerator: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('EURUSD-OTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState(300);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasData, setHasData] = useState(false);

  const generateChart = () => {
    setIsAnalyzing(true);
    
    // Simulate loading time
    setTimeout(() => {
      const data = generateCandleData(selectedPair, selectedTimeframe, 50);
      setCandleData(data);
      setHasData(true);
      setIsAnalyzing(false);
    }, 1500);
  };

  const analyzeSignal = () => {
    if (candleData.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      const result = analyzeChart(candleData);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Signal Generator</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <BarChart3 className="w-4 h-4" />
          <span>Interactive Analysis</span>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Pair
            </label>
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {TRADING_PAIRS.map(pair => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeframe
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {TIMEFRAMES.map(tf => (
                <option key={tf.value} value={tf.value}>{tf.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateChart}
              disabled={isAnalyzing}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <BarChart3 className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Loading...' : 'Load Chart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedPair} - {TIMEFRAMES.find(tf => tf.value === selectedTimeframe)?.label}
            </h3>
            <button
              onClick={analyzeSignal}
              disabled={isAnalyzing || !hasData}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Target className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Signal'}</span>
            </button>
          </div>
          
          <CandlestickChart data={candleData} />
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Signal Direction */}
            <div className="space-y-4">
              <div className="text-center p-6 rounded-lg bg-gray-50">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {analysis.direction === 'UP' ? (
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  )}
                  <span className={`text-2xl font-bold ${
                    analysis.direction === 'UP' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analysis.direction}
                  </span>
                </div>
                <p className={`text-lg font-semibold ${getConfidenceColor(analysis.confidence)}`}>
                  Confidence: {analysis.confidence}%
                </p>
              </div>

              {/* Technical Indicators */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Technical Indicators</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">RSI:</span>
                    <span className={`font-medium ${
                      analysis.indicators.rsi > 70 ? 'text-red-600' : 
                      analysis.indicators.rsi < 30 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {analysis.indicators.rsi}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MACD:</span>
                    <span className={`font-medium ${
                      analysis.indicators.macd > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysis.indicators.macd}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bollinger:</span>
                    <span className="font-medium text-gray-900">{analysis.indicators.bollinger}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trend:</span>
                    <span className={`font-medium ${
                      analysis.indicators.trend === 'BULLISH' ? 'text-green-600' :
                      analysis.indicators.trend === 'BEARISH' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {analysis.indicators.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Reasoning */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Analysis Reasoning</h4>
              <div className="space-y-2">
                {analysis.reasoning.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SignalGenerator;
