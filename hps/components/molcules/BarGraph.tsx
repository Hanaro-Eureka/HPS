'use client';

import {
  Bar,
  BarChart,
  Cell,
  Legend,
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
        <XAxis type='number' dataKey={xDataKey} />
        <YAxis type='category' dataKey={yDataKey} />
        <Tooltip />
        <Legend />
        <Bar dataKey='predictedNps'>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.barColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
