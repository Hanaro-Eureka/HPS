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
    name: string;
    used: number;
    remain: number;
  }[];
  colors: {
    used: string;
    remain: string;
    lStroke: string;
    rStroke: string;
  };
};
export default function SalaryBarGraph({ data, colors }: Props) {
  const { used, remain, lStroke, rStroke } = colors;
  return (
    <div style={{ width: '100%', height: 60 }}>
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
            // stroke={lStroke}
            radius={[10, 0, 0, 10]}
            barSize={40}
          />
          <Bar
            dataKey='remain'
            stackId='a'
            fill={remain}
            // stroke={rStroke}
            strokeWidth={2}
            radius={[0, 10, 10, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
