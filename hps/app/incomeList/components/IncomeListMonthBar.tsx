'use client';

import Button from '@/components/atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MonthToggle } from './month-toggle';

export default function IncomeListMonthBar() {
  const router = useRouter();
  return (
    <>
      <div className='flex'>
        <div className='w-24 h-8 flex items-center justify-center'>
          <MonthToggle />
        </div>
        <span className='text-2xl font-[600]'>수입 내역</span>
        <Button
          bgColor='white'
          onClick={() => router.push('/incomeSource?from=/incomeList')}
          className='px-2'
        >
          <Image
            src='/svgs/ic_cogWheel.svg'
            alt='주요 수입원 선택 페이지로 이동'
            width={20}
            height={20}
          />
        </Button>
      </div>
    </>
  );
}
