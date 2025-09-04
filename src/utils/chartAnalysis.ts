import { CandleData, AnalysisResult } from '../types';

export const generateCandleData = (pair: string, timeframe: number, periods: number = 50): CandleData[] => {
  const data: CandleData[] = [];
  const now = Date.now();
  const timeframeMs = timeframe * 1000;
  
  // Base price for the pair
  const basePrice = pair.includes('JPY') ? 110 : 1.2;
  let currentPrice = basePrice + (Math.random() - 0.5) * 0.1;
  
  // Generate trend direction
  const trendDirection = Math.random() > 0.5 ? 1 : -1;
  const trendStrength = 0.0001 + Math.random() * 0.0005;
  
  for (let i = periods - 1; i >= 0; i--) {
    const timestamp = now - (i * timeframeMs);
    
    // Add trend component
    currentPrice += trendDirection * trendStrength * (Math.random() > 0.3 ? 1 : -0.5);
    
    // Generate OHLC
    const volatility = 0.001 + Math.random() * 0.002;
    const open = currentPrice;
    const high = open + (Math.random() * volatility);
    const low = open - (Math.random() * volatility);
    const close = low + Math.random() * (high - low);
    const volume = 1000 + Math.random() * 5000;
    
    data.push({
      timestamp,
      open: Number(open.toFixed(5)),
      high: Number(high.toFixed(5)),
      low: Number(low.toFixed(5)),
      close: Number(close.toFixed(5)),
      volume: Math.floor(volume)
    });
    
    currentPrice = close;
  }
  
  return data;
};

export const analyzeChart = (candleData: CandleData[]): AnalysisResult => {
  if (candleData.length < 14) {
    return {
      direction: 'UP',
      confidence: 50,
      reasoning: ['Insufficient data for analysis'],
      indicators: {
        rsi: 50,
        macd: 0,
        bollinger: 'MIDDLE',
        trend: 'SIDEWAYS'
      }
    };
  }

  const closes = candleData.map(c => c.close);
  const highs = candleData.map(c => c.high);
  const lows = candleData.map(c => c.low);
  
  // Calculate RSI
  const rsi = calculateRSI(closes, 14);
  
  // Calculate MACD
  const macd = calculateMACD(closes);
  
  // Calculate Bollinger Bands
  const bollinger = calculateBollingerPosition(closes, 20);
  
  // Determine trend
  const trend = calculateTrend(closes);
  
  // Generate analysis
  const reasoning: string[] = [];
  let bullishSignals = 0;
  let bearishSignals = 0;
  
  // RSI Analysis
  if (rsi < 30) {
    reasoning.push('RSI indicates oversold conditions (potential reversal up)');
    bullishSignals++;
  } else if (rsi > 70) {
    reasoning.push('RSI indicates overbought conditions (potential reversal down)');
    bearishSignals++;
  } else if (rsi > 50) {
    reasoning.push('RSI shows bullish momentum');
    bullishSignals++;
  } else {
    reasoning.push('RSI shows bearish momentum');
    bearishSignals++;
  }
  
  // MACD Analysis
  if (macd > 0) {
    reasoning.push('MACD above signal line (bullish momentum)');
    bullishSignals++;
  } else {
    reasoning.push('MACD below signal line (bearish momentum)');
    bearishSignals++;
  }
  
  // Bollinger Analysis
  if (bollinger === 'LOWER') {
    reasoning.push('Price near lower Bollinger band (potential bounce up)');
    bullishSignals++;
  } else if (bollinger === 'UPPER') {
    reasoning.push('Price near upper Bollinger band (potential pullback down)');
    bearishSignals++;
  }
  
  // Trend Analysis
  if (trend === 'BULLISH') {
    reasoning.push('Overall trend is bullish');
    bullishSignals++;
  } else if (trend === 'BEARISH') {
    reasoning.push('Overall trend is bearish');
    bearishSignals++;
  } else {
    reasoning.push('Price is in sideways consolidation');
  }
  
  // Price Action
  const recentCandles = candleData.slice(-3);
  const lastClose = recentCandles[recentCandles.length - 1].close;
  const prevClose = recentCandles[recentCandles.length - 2].close;
  
  if (lastClose > prevClose) {
    reasoning.push('Recent price action shows upward movement');
    bullishSignals++;
  } else {
    reasoning.push('Recent price action shows downward movement');
    bearishSignals++;
  }
  
  const direction = bullishSignals > bearishSignals ? 'UP' : 'DOWN';
  const totalSignals = bullishSignals + bearishSignals;
  const strongerSignals = Math.max(bullishSignals, bearishSignals);
  const confidence = Math.min(95, Math.max(55, 50 + (strongerSignals / totalSignals) * 40));
  
  return {
    direction,
    confidence: Number(confidence.toFixed(1)),
    reasoning,
    indicators: {
      rsi: Number(rsi.toFixed(1)),
      macd: Number(macd.toFixed(4)),
      bollinger,
      trend
    }
  };
};

const calculateRSI = (prices: number[], period: number = 14): number => {
  if (prices.length < period + 1) return 50;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = 1; i <= period; i++) {
    const change = prices[prices.length - i] - prices[prices.length - i - 1];
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }
  
  const avgGain = gains / period;
  const avgLoss = losses / period;
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

const calculateMACD = (prices: number[]): number => {
  if (prices.length < 26) return 0;
  
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  
  return ema12 - ema26;
};

const calculateEMA = (prices: number[], period: number): number => {
  if (prices.length < period) return prices[prices.length - 1];
  
  const multiplier = 2 / (period + 1);
  let ema = prices.slice(-period).reduce((sum, price) => sum + price, 0) / period;
  
  for (let i = prices.length - period + 1; i < prices.length; i++) {
    ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
  }
  
  return ema;
};

const calculateBollingerPosition = (prices: number[], period: number = 20): 'UPPER' | 'MIDDLE' | 'LOWER' => {
  if (prices.length < period) return 'MIDDLE';
  
  const recentPrices = prices.slice(-period);
  const sma = recentPrices.reduce((sum, price) => sum + price, 0) / period;
  
  const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
  const stdDev = Math.sqrt(variance);
  
  const upperBand = sma + (2 * stdDev);
  const lowerBand = sma - (2 * stdDev);
  const currentPrice = prices[prices.length - 1];
  
  if (currentPrice > upperBand * 0.95) return 'UPPER';
  if (currentPrice < lowerBand * 1.05) return 'LOWER';
  return 'MIDDLE';
};

const calculateTrend = (prices: number[]): 'BULLISH' | 'BEARISH' | 'SIDEWAYS' => {
  if (prices.length < 20) return 'SIDEWAYS';
  
  const recentPrices = prices.slice(-20);
  const firstHalf = recentPrices.slice(0, 10).reduce((sum, price) => sum + price, 0) / 10;
  const secondHalf = recentPrices.slice(10).reduce((sum, price) => sum + price, 0) / 10;
  
  const change = (secondHalf - firstHalf) / firstHalf;
  
  if (change > 0.002) return 'BULLISH';
  if (change < -0.002) return 'BEARISH';
  return 'SIDEWAYS';
};
