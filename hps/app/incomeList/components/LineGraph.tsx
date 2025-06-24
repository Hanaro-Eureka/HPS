'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';
import CustomTooltip from '../../../components/molcules/CustomTooltip';

type Props = {
  data: object[]; // 차트에 그려지는 Data
  xDataKey: string; // 차트에서 x축이 그려지는 기준
  yDataKey?: string; // 차트에서 y축이 그려지는 기준
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
  width = 300,
  height = 500,
  className = 'py-5 px-1',
  lineType = 'monotone',
  lineColors,
  strokeWidth,
  strokeDasharray = '5 1',
}: Props) {
  // data별 라인차트 색상 타입 가져오기
  type ColorKeys = keyof typeof lineColors;

  // data에서 요소 종류 가져오기
  const amountCategory = Object.keys(lineColors) as ColorKeys[];

  return (
    // width는 부모요소에 맞게 설정, height는 값을 주어야 그래프가 그려짐
    <>
      <div className='flex justify-center gap-4 text-sm mb-4 mt-2'>
        <div className='flex items-center gap-1 text-year-graph1'>
          <div className='w-4 h-[2px] bg-year-graph1' />
          올해 수입 내역
        </div>
        <div className='flex items-center gap-1 text-year-graph2'>
          <div className='w-4 h-[2px] bg-year-graph2' />
          작년 수입 내역
        </div>
      </div>
      <ResponsiveContainer width='100%' height={height} className={className}>
        <LineChart
          width={width}
          data={data}
          margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
        >
          <XAxis dataKey={xDataKey} />
          <Tooltip
            content={<CustomTooltip />}
            formatter={(value) => {
              if (value === 'thisIncome') return '올해 수입 내역';
              if (value === 'lastIncome') return '작년 수입 내역';
              return value;
            }}
          />
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
    </>
  );
}
