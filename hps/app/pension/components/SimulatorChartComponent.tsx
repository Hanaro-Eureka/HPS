'use client';

import Text from '@/components/atoms/Text';
import BarGraph from '@/components/molcules/BarGraph';
import { useState } from 'react';
import RadixSlider from './Slider';

export default function SimulatorChartComponent() {
  const [value, setValue] = useState([65]);

  const data = [
    { age: '60세', predictedNps: 980000, barColor: '#F9CC52' },
    {
      age: `${value}세`,
      predictedNps: 1050000,
      barColor: '#FEB8B3',
    },
    {
      age: '70세',
      predictedNps: 1300000,
      barColor: '#62CFE5',
    },
  ];

  return (
    <>
      <div className='flex flex-col w-full items-center justify-start gap-5 px-2.5'>
        <div className='flex flex-row w-full items-center justify-between'>
          <Text className='text-2xl font-medium text-black'>
            예상 연금 시뮬레이터
          </Text>
        </div>

        <RadixSlider value={value} onChange={setValue} />
        <div className='flex flex-row w-full items-center justify-between'>
          <Text className='text-sm mt-2 text-black-font font-[300]'>
            선택된 나이 : {value[0]}세
          </Text>
        </div>
      </div>
      <div className='flex flex-col w-full items-center justify-start pt-10'>
        <BarGraph
          xDataKey='predictedNps'
          yDataKey='age'
          data={data}
          height={150}
        ></BarGraph>
      </div>
    </>
  );
}
