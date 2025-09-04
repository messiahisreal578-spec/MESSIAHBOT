export interface Signal {
  id: string;
  pair: string;
  direction: 'UP' | 'DOWN';
  timeframe: number;
  timestamp: Date;
  confidence: number;
  status: 'PENDING' | 'EXECUTED' | 'EXPIRED';
  entry_price?: number;
  exit_price?: number;
  profit?: number;
  risk_reward_ratio?: number;
  stop_loss?: number;
  take_profit?: number;
}

export interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  isActive: boolean;
  volatility?: number;
  correlation?: number;
}

export interface BotConfig {
  id: string;
  name: string;
  pairs: string[];
  timeframes: number[];
  isActive: boolean;
  strategy: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  maxDailyTrades: number;
  maxRiskPerTrade: number;
  stopLossPercentage: number;
  takeProfitPercentage: number;
}

export interface PerformanceMetrics {
  totalTrades: number;
  winRate: number;
  totalProfit: number;
  dailyProfit: number;
  weeklyProfit: number;
  monthlyProfit: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
}

export interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface AdvancedIndicators {
  rsi: number;
  macd: { signal: number; histogram: number; macd: number };
  bollinger: { upper: number; middle: number; lower: number; position: 'UPPER' | 'MIDDLE' | 'LOWER' };
  stochastic: { k: number; d: number };
  williams: number;
  cci: number;
  atr: number;
  adx: { adx: number; pdi: number; mdi: number; trend: 'STRONG' | 'WEAK' };
  ichimoku: { tenkan: number; kijun: number; chikou: number; cloud: 'BULLISH' | 'BEARISH' };
  fibonacci: { support: number; resistance: number };
}

export interface MarketSentiment {
  overall: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  strength: number;
  volume_profile: 'INCREASING' | 'DECREASING' | 'STABLE';
  momentum: 'ACCELERATING' | 'DECELERATING' | 'STABLE';
  volatility: 'HIGH' | 'MEDIUM' | 'LOW';
  price_velocity: 'HIGH' | 'NORMAL' | 'LOW';
  volume_spike: 'BUY' | 'SELL' | 'NONE';
}

export interface PatternRecognition {
  patterns: Array<{
    name: string;
    type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    confidence: number;
    timeframe: string;
  }>;
  support_resistance: Array<{
    level: number;
    type: 'SUPPORT' | 'RESISTANCE';
    strength: number;
  }>;
}

export interface AnalysisResult {
  direction: 'UP' | 'DOWN';
  confidence: number;
  reasoning: string[];
  indicators: AdvancedIndicators;
  sentiment: MarketSentiment;
  patterns: PatternRecognition;
  risk_assessment: {
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    suggested_position_size: number;
    stop_loss: number;
    take_profit: number;
    risk_reward_ratio: number;
  };
  multi_timeframe: {
    short_term: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    medium_term: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    long_term: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  };
  accuracy_score: number;
}

export interface BacktestResult {
  period: string;
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  total_profit: number;
  max_drawdown: number;
  sharpe_ratio: number;
  profit_factor: number;
  monthly_returns: Array<{
    month: string;
    return: number;
  }>;
}
