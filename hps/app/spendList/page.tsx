'use client';

import Button from '@/components/atoms/Button';
import Title from '@/components/atoms/Title';
import Image from 'next/image';
import SpendAnalysis from './components/SpendAnalysis';
import SpendList from './components/SpendList';

export default function SpendListPage() {
  return (
    <div className='flex flex-col h-screen w-full pt-15 px-5 py-5'>
      <div className='flex items-center justify-between'>
        <Button
          aria-label='뒤로 가기'
          className='text-base'
          bgColor='bg-white'
          onClick={() => alert('뒤로가기!')}
        >
          <Image
            src='/svgs/ic_goback.svg'
            alt='뒤로가기'
            width={10}
            height={18}
          />
        </Button>
        <div />
      </div>

      <Title tag='h1' className='text-2xl font-[600] w-full mt-10 ml-1.5'>
        이번달 소비 내역
      </Title>

      <SpendList />
      <SpendAnalysis />
    </div>
  );
}
