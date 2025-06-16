'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';

type Props = {
  data: object[]; // 차트에 그려지는 Data
  xDataKey: string; // 차트에서 x축이 그려지는 기준
  yDataKey: string; // 차트에서 y축이 그려지는 기준
  width?: number; // 차트의 너비
  height?: number; // 차트의 높이
  className?: string; // 차트 css
  lineType?: CurveType; // 그래프 종류
  lineColors: object; // 그래프 색
  strokeWidth?: number; // 점의 반지름
  strokeDasharray?: string; // 차트 격자선
};

export default function LineGraph({
  data,
  xDataKey,
  yDataKey,
  width = 300,
  height = 500,
  className = 'p-5',
  lineType = 'monotone',
  lineColors,
  strokeWidth,
  strokeDasharray = '5 1',
}: Props) {
  // data별 라인차트 색상 타입 가져오기
  type ColorKeys = keyof typeof lineColors;

  // data에서 요소 종류 가져오기
  // ex) ['income', 'spned', 'nps']
  const amountCategory = Object.keys(lineColors) as ColorKeys[];

  return (
    // width는 부모요소에 맞게 설정, height는 값을 주어야 그래프가 그려짐
    <ResponsiveContainer width='100%' height={height} className={className}>
      <LineChart width={width} data={data}>
        <XAxis dataKey={xDataKey} />
        <YAxis dataKey={yDataKey} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray={strokeDasharray} />
        {amountCategory.map((c) => (
          <Line
            key={c}
            type={lineType}
            dataKey={c}
            stroke={lineColors[c]}
            strokeWidth={strokeWidth}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
