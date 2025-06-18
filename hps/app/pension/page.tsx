'use client';

import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import BarGraph from '@/components/molcules/BarGraph';
import { useState } from 'react';
import RadixSlider from './components/Slider';

export default function YearEndTaxPage() {
  const contents = [
    { title: '누적 납입액', value: '2,730,000원' },
    { title: '최근 납입내역', value: '월 135,000원' },
    { title: '가입 기간', value: '총 20개월' },
  ];

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
    <div className='flex flex-col w-full items-center justify-start gap-8 px-3.5 py-12'>
      <div className='flex flex-col w-full justify-center gap-1 px-2.5'>
        <Title tag='h1' className='text-2xl font-[600] mt-4'>
          국민 연금
        </Title>
        <Text className='text-sm font-[500] text-black-font mt-2'>
          당신의 노후, 국민연금으로 얼마나 준비됐을까요?
        </Text>
      </div>

      <div className='flex flex-row w-full items-center justify-start gap-2.5'>
        {contents.map((item, index) => (
          <section
            key={index}
            className='bg-white rounded-3xl shadow-[0_0_4px_rgba(0,0,0,0.15)] flex-1'
          >
            <Text className='text-xs font-[500] text-black-font px-4 py-5 text-center'>
              {item.title}
              <br />
              {item.value}
            </Text>
          </section>
        ))}
      </div>

      <div className='flex flex-col w-full items-center justify-start gap-5 px-2.5'>
        <div className='flex flex-row w-full items-center justify-between'>
          <Text className='text-2xl font-[500] text-black-font'>
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
    </div>
  );
}
