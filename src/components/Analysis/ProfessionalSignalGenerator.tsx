import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, BarChart3, RefreshCw, Target, Shield, 
  Brain, Activity, Zap, AlertTriangle, CheckCircle, Wind, ChevronsRight
} from 'lucide-react';
import AdvancedCandlestickChart from './AdvancedCandlestickChart';
import RiskAnalysisPanel from './RiskAnalysisPanel';
import IndicatorPanel from './IndicatorPanel';
import { CandleData, AnalysisResult } from '../../types';
import { generateAdvancedCandleData, performAdvancedAnalysis } from '../../utils/advancedAnalysis';

const TRADING_PAIRS = [
  'EURUSD-OTC'
];

const TIMEFRAMES = [
  { value: 5, label: '5 seconds' },
  { value: 15, label: '15 seconds' },
  { value: 30, label: '30 seconds' },
  { value: 60, label: '1 minute' },
  { value: 300, label: '5 minutes' },
  { value: 900, label: '15 minutes' }
];

const ProfessionalSignalGenerator: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('EURUSD-OTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState(15);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');

  const generateChart = () => {
    setIsAnalyzing(true);
    setAnalysis(null);
    
    setTimeout(() => {
      const data = generateAdvancedCandleData(selectedPair, selectedTimeframe, 100);
      setCandleData(data);
      setHasData(true);
      setIsAnalyzing(false);
    }, 1000); // Faster for scalping
  };

  const analyzeSignal = () => {
    if (candleData.length === 0) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = performAdvancedAnalysis(candleData);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500); // Faster for scalping
  };

  const getAccuracyColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-blue-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">High-Frequency Scalping Bot</h2>
            <p className="text-gray-600">AI analysis for 5s/15s signals with high accuracy</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Activity className="w-4 h-4 text-green-500" />
          <span>Live Market Analysis</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Pair
            </label>
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <BarChart3 className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Loading...' : 'Load Chart'}</span>
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={analyzeSignal}
              disabled={isAnalyzing || !hasData}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'AI Analyze'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedPair} - {TIMEFRAMES.find(tf => tf.value === selectedTimeframe)?.label}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time Data</span>
            </div>
          </div>
          
          <AdvancedCandlestickChart data={candleData} analysis={analysis} />
        </motion.div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Main Signal Card */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Signal Direction */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    {analysis.direction === 'UP' ? (
                      <div className="p-3 bg-green-100 rounded-full">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    ) : (
                      <div className="p-3 bg-red-100 rounded-full">
                        <TrendingDown className="w-8 h-8 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">Signal Direction</p>
                      <p className={`text-3xl font-bold ${
                        analysis.direction === 'UP' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {analysis.direction}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p className={`text-3xl font-bold ${getConfidenceColor(analysis.confidence)}`}>
                        {analysis.confidence}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accuracy Score */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Brain className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">AI Accuracy</p>
                      <p className={`text-3xl font-bold ${getAccuracyColor(analysis.accuracy_score).split(' ')[0]}`}>
                        {analysis.accuracy_score}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Analysis Details */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'analysis', label: 'Scalping Analysis', icon: Brain },
                    { id: 'indicators', label: 'Indicators', icon: BarChart3 },
                    { id: 'risk', label: 'Risk Management', icon: Shield }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'analysis' && (
                  <div className="space-y-6">
                    {/* Reasoning */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">AI Analysis Reasoning</h4>
                      <div className="space-y-2">
                        {analysis.reasoning.map((reason, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Market Sentiment */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Market Sentiment</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 flex items-center"><Wind className="w-3 h-3 mr-1" />Velocity</p>
                          <p className="font-medium">{analysis.sentiment.price_velocity}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 flex items-center"><ChevronsRight className="w-3 h-3 mr-1" />Volume Spike</p>
                          <p className={`font-medium ${
                            analysis.sentiment.volume_spike === 'BUY' ? 'text-green-600' :
                            analysis.sentiment.volume_spike === 'SELL' ? 'text-red-600' : 'text-gray-600'
                          }`}>{analysis.sentiment.volume_spike}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Overall</p>
                          <p className={`font-medium ${
                            analysis.sentiment.overall === 'BULLISH' ? 'text-green-600' :
                            analysis.sentiment.overall === 'BEARISH' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {analysis.sentiment.overall}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Strength</p>
                          <p className="font-medium">{analysis.sentiment.strength}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'indicators' && (
                  <IndicatorPanel indicators={analysis.indicators} />
                )}

                {activeTab === 'risk' && (
                  <RiskAnalysisPanel 
                    riskAssessment={analysis.risk_assessment}
                    currentPrice={candleData[candleData.length - 1]?.close}
                    pair={selectedPair}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalSignalGenerator;
