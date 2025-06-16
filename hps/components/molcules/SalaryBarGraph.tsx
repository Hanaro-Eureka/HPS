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
  data: { moreSpent: number; leastSpent: number; name?: string }[];
  width?: number;
  height?: number;
  className?: string;
  colors: { moreSpent: string; leastSpent: string };
};

const CustomBar = (
  props: Partial<BarProps> & { radius: [number, number, number, number] }
) => {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill = '#000',
    radius = [0, 0, 0, 0],
  } = props;

  const [tl, tr, br, bl] = radius;

  const path = `
    M${Number(x) + tl},${y}
    h${width - tl - tr}
    ${tr > 0 ? `a${tr},${tr} 0 0 1 ${tr},${tr}` : ''}
    v${height - tr - br}
    ${br > 0 ? `a${br},${br} 0 0 1 ${-br},${br}` : ''}
    h${-width + br + bl}
    ${bl > 0 ? `a${bl},${bl} 0 0 1 ${-bl},${-bl}` : ''}
    v${-height + bl + tl}
    ${tl > 0 ? `a${tl},${tl} 0 0 1 ${tl},${-tl}` : ''}
    z
  `;

  return (
    <path
      d={path}
      fill={fill}
      stroke={fill === '#FFFFFF' ? '#56B8AB' : fill}
      strokeWidth={1}
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
        <Bar
          dataKey='moreSpent'
          stackId='a'
          shape={<CustomBar radius={[10, 0, 0, 10]} />}
          fill={colors.moreSpent}
        />
        <Bar
          dataKey='leastSpent'
          stackId='a'
          shape={<CustomBar radius={[0, 10, 10, 0]} />}
          fill={colors.leastSpent}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
