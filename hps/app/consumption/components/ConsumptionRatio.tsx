'use client';

import { consumptionData } from '@/constants/consumptionData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { tagRecurringExpenses } from '../utils/recurring';

export default function ConsumptionRatio() {
  const tagged = tagRecurringExpenses(consumptionData);

  const fixedTotal = tagged
    .filter((item) => item.isFixed)
    .reduce((sum, item) => sum + item.trans_amt, 0);

  const flexibleTotal = tagged
    .filter((item) => !item.isFixed)
    .reduce((sum, item) => sum + item.trans_amt, 0);

  const total = fixedTotal + flexibleTotal;
  if (total === 0) return null;

  const data = [
    {
      flexible: (flexibleTotal / total) * 100,
      fixed: (fixedTotal / total) * 100,
    },
  ];

  return (
    <div className='w-full px-12 mt-10'>
      <ResponsiveContainer width='100%' height={50}>
        <BarChart
          layout='vertical'
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barCategoryGap={0}
        >
          <XAxis type='number' domain={[0, 100]} hide />
          <YAxis type='category' dataKey='name' hide />

          <Bar
            dataKey='flexible'
            stackId='a'
            fill='#FEB8B3'
            radius={[10, 0, 0, 10]}
            barSize={32}
          >
            <LabelList
              dataKey='flexible'
              position='insideLeft'
              content={({ x, y, width, height, value }) =>
                typeof value === 'number' && value > 5 ? (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) + Number(height) / 2}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fill='#000'
                    fontSize={12}
                  >
                    유지비
                  </text>
                ) : null
              }
            />
          </Bar>
          <Bar
            dataKey='fixed'
            stackId='a'
            fill='#FF6C8B'
            radius={[0, 10, 10, 0]}
            barSize={32}
          >
            <LabelList
              dataKey='fixed'
              position='insideRight'
              content={({ x, y, width, height, value }) =>
                typeof value === 'number' && value > 5 ? (
                  <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) + Number(height) / 2}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fill='#000'
                    fontSize={12}
                  >
                    고정비
                  </text>
                ) : null
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
