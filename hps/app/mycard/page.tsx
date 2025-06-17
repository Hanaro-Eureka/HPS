'use client';

import Title from '@/components/atoms/Title';
import CardItem from './components/CardItem';

export default function CardPage() {
  return (
    <main className='items-center justify-start max-w-md mx-auto p-6 space-y-6 rounded-4xl'>
      <Title tag='h1' className='text-2xl font-[600] text-center'>
        나의 카드 실적 현황
      </Title>
      <CardItem label={''} amount={0} type={'deduction'}></CardItem>
    </main>
  );
}
