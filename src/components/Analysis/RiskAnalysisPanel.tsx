import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Target, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface RiskAnalysisPanelProps {
  riskAssessment: {
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    suggested_position_size: number;
    stop_loss: number;
    take_profit: number;
    risk_reward_ratio: number;
  };
  currentPrice?: number;
  pair: string;
}

const RiskAnalysisPanel: React.FC<RiskAnalysisPanelProps> = ({ 
  riskAssessment, 
  currentPrice, 
  pair 
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const calculatePips = (price1: number, price2: number) => {
    const pips = Math.abs(price1 - price2) * (pair.includes('JPY') ? 100 : 10000);
    return pips.toFixed(1);
  };

  const calculateRiskReward = () => {
    if (!currentPrice) return { risk: 0, reward: 0 };
    
    const risk = Math.abs(currentPrice - riskAssessment.stop_loss);
    const reward = Math.abs(riskAssessment.take_profit - currentPrice);
    
    return { risk, reward };
  };

  const { risk, reward } = calculateRiskReward();

  return (
    <div className="space-y-6">
      {/* Risk Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg border ${getRiskColor(riskAssessment.risk_level)}`}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 mr-2" />
              <h4 className="font-medium">Risk Level</h4>
            </div>
            <p className="text-2xl font-bold">{riskAssessment.risk_level}</p>
            <p className="text-sm mt-1">
              {riskAssessment.risk_level === 'LOW' ? 'Conservative trade' :
               riskAssessment.risk_level === 'MEDIUM' ? 'Moderate risk' : 'High volatility'}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
              <h4 className="font-medium text-blue-600">Position Size</h4>
            </div>
            <p className="text-2xl font-bold text-blue-600">{riskAssessment.suggested_position_size}%</p>
            <p className="text-sm mt-1 text-blue-600">of account balance</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-purple-50 rounded-lg border border-purple-200"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 mr-2 text-purple-600" />
              <h4 className="font-medium text-purple-600">Risk:Reward</h4>
            </div>
            <p className="text-2xl font-bold text-purple-600">1:{riskAssessment.risk_reward_ratio}</p>
            <p className="text-sm mt-1 text-purple-600">Excellent ratio</p>
          </div>
        </motion.div>
      </div>

      {/* Stop Loss & Take Profit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-medium text-gray-900">Stop Loss</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price Level:</span>
              <span className="font-bold text-red-600">{riskAssessment.stop_loss}</span>
            </div>
            
            {currentPrice && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{calculatePips(currentPrice, riskAssessment.stop_loss)} pips</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk Amount:</span>
                  <span className="font-medium text-red-600">{risk.toFixed(5)}</span>
                </div>
              </>
            )}
            
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Maximum loss if trade goes against you
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Take Profit</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price Level:</span>
              <span className="font-bold text-green-600">{riskAssessment.take_profit}</span>
            </div>
            
            {currentPrice && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{calculatePips(currentPrice, riskAssessment.take_profit)} pips</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Potential:</span>
                  <span className="font-medium text-green-600">{reward.toFixed(5)}</span>
                </div>
              </>
            )}
            
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                <Target className="w-4 h-4 inline mr-1" />
                Expected profit if trade reaches target
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Management Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6"
      >
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Risk Management Guidelines
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-medium text-blue-900">Position Sizing:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Never risk more than {riskAssessment.suggested_position_size}% per trade</li>
              <li>• Adjust size based on account balance</li>
              <li>• Consider correlation with other positions</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-blue-900">Execution Tips:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Set stop loss immediately after entry</li>
              <li>• Consider trailing stops for trending moves</li>
              <li>• Monitor news events that may affect {pair}</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Trade Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 rounded-lg border border-gray-200 p-6"
      >
        <h4 className="font-medium text-gray-900 mb-4">Trade Summary</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-600">Pair</p>
            <p className="font-bold">{pair}</p>
          </div>
          
          {currentPrice && (
            <div className="text-center">
              <p className="text-gray-600">Current Price</p>
              <p className="font-bold">{currentPrice.toFixed(5)}</p>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-gray-600">Max Risk</p>
            <p className="font-bold text-red-600">{riskAssessment.suggested_position_size}%</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">Expected Return</p>
            <p className="font-bold text-green-600">{(riskAssessment.suggested_position_size * riskAssessment.risk_reward_ratio).toFixed(1)}%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RiskAnalysisPanel;
