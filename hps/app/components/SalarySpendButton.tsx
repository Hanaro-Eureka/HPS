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
        onClick={() => router.push('/spendList')}
        className='rounded-3xl'
      >
        <div
          className='w-80 h-52 pt-8 rounded-3xl px-6 flex [box-shadow:var(--shadow-taxbox)]
      overflow-hidden'
        >
          <div className='flex flex-col w-40'>
            <div className='flex justify-center mt-2'>
              <Image
                src={'/ic_pig.svg'}
                alt='pig'
                width={97}
                height={123}
                className='items-center'
              />
            </div>
          </div>
          <div className='flex flex-col  w-40 pl-6'>
            <div className='font-[500] h-6 text-center'>최근 나의 월급</div>
            <div className='mt-14 text-center text-xl font-[600] '>
              {lastSalary.toLocaleString()}원
            </div>
          </div>
        </div>
      </Button>
    </>
  );
}
