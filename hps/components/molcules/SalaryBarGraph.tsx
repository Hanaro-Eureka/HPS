'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarProps,
} from 'recharts';

type Props = {
  data: { moreSpent: number; leastSpent: number }[];
  width?: number;
  height?: number;
  className?: string;
  colors: { moreSpent: string; leastSpent: string };
};

const CustomBar = (props: Partial<BarProps>) => {
  const { x, y, width, height, fill } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke='#000000' // border 색상
      strokeWidth={1} // border 두께
    />
  );
};

export default function SalaryBarChart({
  data,
  className = 'p-5',
  width = 500,
  height = 100,
  colors,
}: Props) {
  type propertyKey = keyof (typeof data)[0];
  const property = Object.keys(data[0]) as propertyKey[];

  return (
    <ResponsiveContainer width='100%' height={height}>
      <BarChart
        layout='vertical'
        width={width}
        data={data}
        className={className}
      >
        <XAxis type='number' hide />
        <YAxis type='category' dataKey='name' hide />
        <Tooltip formatter={(value: number) => value.toLocaleString() + '원'} />
        {property.map((p) => (
          <Bar
            key={p}
            dataKey={p}
            stackId='a'
            radius={p === property[0] ? [10, 0, 0, 10] : [0, 10, 10, 0]}
            fill={colors[p]}
            shape={<CustomBar />}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
