'use client';

import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export default function GoToIncomeListButton() {
  const router = useRouter();

  return (
    <Button
      aria-label='수입내역 보러가기'
      className='text-base font-[500] px-13 py-3 rounded-2xl'
      bgColor='bg-button-lightgray'
      onClick={() => router.push('/incomeList')}
    >
      수입내역 보러가기
    </Button>
  );
}
