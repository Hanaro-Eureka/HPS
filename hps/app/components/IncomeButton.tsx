'use client';

import Button from '@/components/atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  thisMonthIncome: number;
};
export default function IncomeButton({ thisMonthIncome }: Props) {
  const router = useRouter();
  return (
    <>
      <Button
        bgColor='bg-white'
        onClick={() => router.push('/income')}
        className='rounded-3xl w-44 h-32 [box-shadow:var(--shadow-taxbox)]
      overflow-hidden mt-6'
      >
        <div className='flex flex-col mt-6 mb-8'>
          <div className='flex justify-center text-center'>
            <div className='font-[500] w-24 h-6 text-center'>이번 달 수입</div>
            <Image
              src={'/svgs/ic_cogWheel.svg'}
              alt='최근 수입원 선택 페이지로 이동'
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                router.push('/incomeSource?from=/');
              }}
            />
          </div>
          <div className='mt-4 text-center text-xl font-[600] '>
            {thisMonthIncome.toLocaleString()}원
          </div>
        </div>
      </Button>
    </>
  );
}
