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
  //사용한 금액 , 남은 금액, x축 label
  data: { used: number; remain: number; name?: string }[];
  width?: number;
  height?: number;
  className?: string;
  colors: { used: string; remain: string };
};

const CustomBar = (
  //직접 SVG 경로를 그리는 커스텀 막대
  props: Partial<BarProps> & { radius: [number, number, number, number] }
) => {
  const {
    //막대의 위치, 크기, 채울 색, 모서리 둥근 값.
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill = '#000',
    radius = [0, 0, 0, 0],
  } = props;

  //top left, top right ...
  const [tl, tr, br, bl] = radius;

  //SVG path 문자열로 둥근 사각형을 직접 그림
  //각 꼭짓점 radius 있으면 둥글게 아님 직각.
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
      //테두리 색
      stroke={fill === '#FFFFFF' ? '#56B8AB' : fill}
      strokeWidth={1}
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
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        className={className}
      >
        <XAxis type='number' hide />
        <YAxis type='category' dataKey='name' hide />
        <Tooltip formatter={(value: number) => value.toLocaleString() + '원'} />
        <Bar
          //막대그래프 왼쪽 파트
          dataKey='used'
          stackId='a'
          shape={<CustomBar radius={[10, 0, 0, 10]} />}
          fill={colors.used}
        />
        <Bar
          //오른쪽 파트
          dataKey='remain'
          stackId='a'
          shape={<CustomBar radius={[0, 10, 10, 0]} />}
          fill={colors.remain}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
