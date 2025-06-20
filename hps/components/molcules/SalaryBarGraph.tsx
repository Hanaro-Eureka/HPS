'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type Props = {
  data: {
    name?: string;
    used: number;
    remain: number;
  }[];
  height: number;
  colors: {
    used: string;
    remain: string;
  };
};
export default function SalaryBarGraph({ data, colors, height }: Props) {
  const { used, remain } = colors;
  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          layout='vertical'
          data={data}
          barCategoryGap={0}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type='number' hide />
          <YAxis type='category' dataKey='name' hide />
          <Tooltip
            formatter={(value: number) => value.toLocaleString() + '원'}
          />
          <Bar
            dataKey='used'
            stackId='a'
            fill={used}
            radius={[10, 0, 0, 10]}
            barSize={height - 20}
          />
          <Bar
            dataKey='remain'
            stackId='a'
            fill={remain}
            strokeWidth={2}
            radius={[0, 10, 10, 0]}
            barSize={height - 20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
