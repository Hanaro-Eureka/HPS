'use client';

import Button from '@/components/atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  lastSalary: number;
};
export default function SalarySpendButton({ lastSalary }: Props) {
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
              src={'/cogwheel.svg'}
              alt='최근 수입원 선택 페이지로 이동'
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation(); // 👈 부모(Button) 클릭 방지
                router.push('/incomeSource?from=/');
              }}
            />
          </div>
          <div className='mt-4 text-center text-xl font-[600] '>
            {lastSalary.toLocaleString()}원
          </div>
        </div>
      </Button>
    </>
  );
}
