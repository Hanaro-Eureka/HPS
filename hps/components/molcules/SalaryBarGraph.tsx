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
  data: { used: number; remain: number; name?: string }[];
  width?: number;
  height?: number;
  className?: string;
  colors: { used: string; remain: string; lStroke: string; rStroke: string };
};

const CustomBar = (
  props: Partial<BarProps> & {
    radius: [number, number, number, number];
    stroke?: string;
  }
) => {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill = '#000',
    stroke,
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
      stroke={stroke ?? 'none'}
      strokeWidth={stroke ? 2 : 0}
    />
  );
};

export default function SalaryBarChart({
  data,
  className = '',
  width = 600,
  height = 40,
  colors,
}: Props) {
  return (
    <ResponsiveContainer width='100%' height={height}>
      <BarChart
        layout='vertical'
        width={width}
        data={data}
        margin={{ top: 0, right: 2, left: 2, bottom: 0 }}
        className={className}
      >
        <XAxis type='number' hide />
        <YAxis type='category' dataKey='name' hide />
        <Tooltip formatter={(value: number) => value.toLocaleString() + '원'} />
        <Bar
          dataKey='used'
          stackId='a'
          shape={
            <CustomBar
              radius={[10, 0, 0, 10]}
              fill={colors.used}
              stroke={colors.lStroke} // 왼쪽 테두리 색상
            />
          }
          fill={colors.used}
        />
        <Bar
          dataKey='remain'
          stackId='a'
          shape={
            <CustomBar
              radius={[0, 10, 10, 0]}
              fill={colors.remain}
              stroke={colors.rStroke}
            />
          }
          fill={colors.remain}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
