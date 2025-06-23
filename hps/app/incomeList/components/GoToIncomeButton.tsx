'use client';

import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export default function GoToIncomeButton() {
  const router = useRouter();

  return (
    <Button
      aria-label='수입관리 페이지 가기'
      className='text-base font-[500] px-9 py-1 rounded-full'
      bgColor='bg-button-lightgray'
      onClick={() => router.push('/income')}
    >
      수입 관리하러 가기
    </Button>
  );
}
