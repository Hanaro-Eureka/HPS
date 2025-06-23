'use client';

import { consumptionData } from '@/constants/consumptionData';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { tagRecurringExpenses } from '../utils/recurring';

const COLORS = ['#FEB8B3', '#FF6C8B'];

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
    { name: '유지비', value: flexibleTotal },
    { name: '고정비', value: fixedTotal },
  ];

  return (
    <div className='w-full mt-12'>
      <ResponsiveContainer width='100%' height={200}>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={50}
            outerRadius={80}
            paddingAngle={0}
            dataKey='value'
            label={({ name, percent }) =>
              percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
            }
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
            <Label
              value='소비 비율'
              position='center'
              fontSize={14}
              fill='#000'
              style={{ fontWeight: 500 }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
