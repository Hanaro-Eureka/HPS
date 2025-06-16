'use client';

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  data: {
    age: string;
    predictedNps: number;
    barColor: string;
  }[]; // 차트에 그려지는 Data
  xDataKey: string; // x축 기준 (가로일 경우 값)
  yDataKey: string; // y축 기준 (가로일 경우 항목)
  width?: number; // 차트 너비
  height?: number; // 차트 높이
  className?: string; // CSS 클래스
};

export default function BarGraph({
  data,
  xDataKey,
  yDataKey,
  width = 500,
  height = 300,
  className = 'p-5',
}: Props) {
  return (
    <ResponsiveContainer width='100%' height={height}>
      <BarChart
        layout='vertical'
        width={width}
        height={height}
        data={data}
        className={className}
      >
        <XAxis type='number' dataKey={xDataKey} hide />
        <YAxis type='category' dataKey={yDataKey} />
        <Tooltip />
        <Bar
          dataKey='predictedNps'
          label={({ x, y, width, height, value }) => (
            <text
              x={x + width + 8}
              y={y! + height / 2}
              fill='#999'
              fontSize={16}
              dominantBaseline='middle'
            >
              월 {(value / 10000).toLocaleString()} 만원
            </text>
          )}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.barColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
