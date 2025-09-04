import React from 'react';
import ReactECharts from 'echarts-for-react';
import { CandleData, AnalysisResult } from '../../types';

interface AdvancedCandlestickChartProps {
  data: CandleData[];
  analysis?: AnalysisResult | null;
}

const AdvancedCandlestickChart: React.FC<AdvancedCandlestickChartProps> = ({ data, analysis }) => {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const chartData = data.map(candle => [
    candle.open,
    candle.close,
    candle.low,
    candle.high
  ]);

  const timestamps = data.map(candle => formatTimestamp(candle.timestamp));
  const volumes = data.map(candle => candle.volume);

  // Calculate moving averages
  const calculateMA = (period: number) => {
    const ma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        ma.push(null);
      } else {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc, candle) => acc + candle.close, 0);
        ma.push(sum / period);
      }
    }
    return ma;
  };

  const ma20 = calculateMA(20);
  const ma50 = calculateMA(50);

  // Add support/resistance lines if analysis is available
  const markLines = analysis?.patterns.support_resistance.map(level => ({
    yAxis: level.level,
    lineStyle: {
      color: level.type === 'SUPPORT' ? '#22c55e' : '#ef4444',
      type: 'dashed',
      width: 2
    },
    label: {
      formatter: `${level.type}: {c}`,
      position: 'end'
    }
  })) || [];

  const option = {
    animation: true,
    grid: [
      {
        left: '5%',
        right: '5%',
        height: '70%',
        top: '10%'
      },
      {
        left: '5%',
        right: '5%',
        top: '85%',
        height: '10%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: timestamps,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisLabel: {
          formatter: (value: string, index: number) => {
            return index % 10 === 0 ? value : '';
          }
        }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: timestamps,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        },
        axisLabel: {
          formatter: (value: number) => value.toFixed(5)
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 70,
        end: 100
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '90%',
        start: 70,
        end: 100
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: (params: any) => {
        const candle = params.find((p: any) => p.seriesName === 'Price');
        const volume = params.find((p: any) => p.seriesName === 'Volume');
        
        if (!candle) return '';
        
        const values = candle.data;
        let tooltip = `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">${candle.name}</div>
            <div style="display: grid; grid-template-columns: auto auto; gap: 8px 16px; font-size: 13px;">
              <span style="color: #6b7280;">Open:</span><span style="font-weight: 600;">${values[0].toFixed(5)}</span>
              <span style="color: #6b7280;">Close:</span><span style="font-weight: 600;">${values[1].toFixed(5)}</span>
              <span style="color: #6b7280;">High:</span><span style="font-weight: 600;">${values[3].toFixed(5)}</span>
              <span style="color: #6b7280;">Low:</span><span style="font-weight: 600;">${values[2].toFixed(5)}</span>
            </div>`;
        
        if (volume) {
          tooltip += `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <span style="color: #6b7280;">Volume:</span> <span style="font-weight: 600;">${volume.data.toLocaleString()}</span>
          </div>`;
        }
        
        tooltip += '</div>';
        return tooltip;
      }
    },
    legend: {
      data: ['Price', 'MA20', 'MA50', 'Volume'],
      top: 0
    },
    series: [
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumes,
        itemStyle: {
          color: '#94a3b8'
        }
      },
      {
        name: 'Price',
        type: 'candlestick',
        data: chartData,
        itemStyle: {
          color: '#ef4444',
          color0: '#22c55e',
          borderColor: '#dc2626',
          borderColor0: '#16a34a',
          borderWidth: 1
        },
        markLine: {
          symbol: ['none', 'none'],
          data: markLines,
          label: {
            show: true,
            position: 'end',
            fontSize: 12
          }
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: ma20,
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#3b82f6'
        },
        symbol: 'none'
      },
      {
        name: 'MA50',
        type: 'line',
        data: ma50,
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#f59e0b'
        },
        symbol: 'none'
      }
    ]
  };

  return (
    <div className="w-full h-[500px] relative">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
      
      {analysis && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              analysis.direction === 'UP' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">
              {analysis.direction} - {analysis.confidence}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCandlestickChart;
