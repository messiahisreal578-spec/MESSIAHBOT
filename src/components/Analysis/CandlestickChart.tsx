import React from 'react';
import ReactECharts from 'echarts-for-react';
import { CandleData } from '../../types';

interface CandlestickChartProps {
  data: CandleData[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
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

  const option = {
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
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
          // Show every 5th label to avoid crowding
          return index % 5 === 0 ? value : '';
        }
      }
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      },
      axisLabel: {
        formatter: (value: number) => value.toFixed(5)
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: (params: any) => {
        const data = params[0];
        const values = data.data;
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${data.name}</div>
            <div>Open: ${values[0].toFixed(5)}</div>
            <div>Close: ${values[1].toFixed(5)}</div>
            <div>Low: ${values[2].toFixed(5)}</div>
            <div>High: ${values[3].toFixed(5)}</div>
          </div>
        `;
      }
    },
    series: [
      {
        name: 'Price',
        type: 'candlestick',
        data: chartData,
        itemStyle: {
          color: '#ef4444',      // Red for bearish candles
          color0: '#22c55e',     // Green for bullish candles
          borderColor: '#ef4444',
          borderColor0: '#22c55e'
        },
        markPoint: {
          label: {
            formatter: (param: any) => {
              return param != null ? Math.round(param.value) + '' : '';
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              }
            ]
          ]
        }
      }
    ]
  };

  return (
    <div className="w-full h-96">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default CandlestickChart;
