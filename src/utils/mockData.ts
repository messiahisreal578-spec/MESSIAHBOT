import { faker } from '@faker-js/faker';
import { Signal, TradingPair, PerformanceMetrics } from '../types';

const TRADING_PAIRS = ['EURUSD-OTC'];
const TIMEFRAMES = [30, 60, 120, 300, 900];

export const generateMockSignal = (): Signal => {
  const pair = faker.helpers.arrayElement(TRADING_PAIRS);
  const direction = faker.helpers.arrayElement(['UP', 'DOWN'] as const);
  const timeframe = faker.helpers.arrayElement(TIMEFRAMES);
  const status = faker.helpers.arrayElement(['PENDING', 'EXECUTED', 'EXPIRED'] as const);
  const confidence = Number(faker.number.float({ min: 75, max: 98 }).toFixed(1));
  
  const basePrice = 1.2;
  const entryPrice = status !== 'PENDING' ? Number((basePrice + (Math.random() - 0.5) * 0.02).toFixed(5)) : undefined;
  const exitPrice = status === 'EXECUTED' ? Number((entryPrice! + (direction === 'UP' ? 1 : -1) * Math.random() * 0.01).toFixed(5)) : undefined;
  
  let profit: number | undefined;
  if (status === 'EXECUTED' && entryPrice && exitPrice) {
    const priceDiff = direction === 'UP' ? exitPrice - entryPrice : entryPrice - exitPrice;
    profit = Number(((priceDiff / entryPrice) * 100).toFixed(2));
  }
  
  return {
    id: faker.string.uuid(),
    pair,
    direction,
    timeframe,
    timestamp: faker.date.recent({ days: 1 }),
    confidence,
    status,
    entry_price: entryPrice,
    exit_price: exitPrice,
    profit,
    risk_reward_ratio: 2.0,
    stop_loss: entryPrice ? Number((entryPrice - (direction === 'UP' ? 1 : -1) * 0.003).toFixed(5)) : undefined,
    take_profit: entryPrice ? Number((entryPrice + (direction === 'UP' ? 1 : -1) * 0.006).toFixed(5)) : undefined
  };
};

export const generateMockTradingPairs = (): TradingPair[] => {
  return TRADING_PAIRS.map(symbol => {
    const basePrice = 1.2;
    const price = Number((basePrice + (Math.random() - 0.5) * 0.05).toFixed(5));
    
    return {
      symbol,
      name: symbol.replace('-OTC', ''),
      price,
      change24h: Number(faker.number.float({ min: -2, max: 2 }).toFixed(2)),
      volume: Number(faker.number.int({ min: 1000000, max: 10000000 }).toFixed(0)),
      isActive: faker.datatype.boolean(),
      volatility: Number(faker.number.float({ min: 0.001, max: 0.005 }).toFixed(4)),
      correlation: Number(faker.number.float({ min: -1, max: 1 }).toFixed(2))
    };
  });
};

export const generateMockPerformanceMetrics = (): PerformanceMetrics => {
  const totalTrades = faker.number.int({ min: 1000, max: 5000 });
  const winRate = Number(faker.number.float({ min: 72, max: 89 }).toFixed(1));
  const winningTrades = Math.floor(totalTrades * (winRate / 100));
  const losingTrades = totalTrades - winningTrades;
  
  const avgWin = Number(faker.number.float({ min: 50, max: 150 }).toFixed(2));
  const avgLoss = Number(faker.number.float({ min: 25, max: 75 }).toFixed(2));
  
  const totalProfit = Number(((winningTrades * avgWin) - (losingTrades * avgLoss)).toFixed(2));
  const profitFactor = Number((avgWin / avgLoss).toFixed(2));
  
  return {
    totalTrades,
    winRate,
    totalProfit,
    dailyProfit: Number(faker.number.float({ min: -50, max: 300 }).toFixed(2)),
    weeklyProfit: Number(faker.number.float({ min: -200, max: 1200 }).toFixed(2)),
    monthlyProfit: Number(faker.number.float({ min: -500, max: 4000 }).toFixed(2)),
    maxDrawdown: Number(faker.number.float({ min: 5, max: 15 }).toFixed(2)),
    sharpeRatio: Number(faker.number.float({ min: 1.5, max: 3.2 }).toFixed(2)),
    profitFactor,
    avgWin,
    avgLoss
  };
};
