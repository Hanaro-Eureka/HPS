'use client';

import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export default function GoSpendButton() {
  const router = useRouter();

  return (
    <Button
      aria-label='소비 내역 가기'
      className='text-base font-[500] px-9 py-3 rounded-2xl'
      bgColor='bg-button-lightgray'
      onClick={() => router.push('/spendList')}
    >
      소비내역 보러가기
    </Button>
  );
}
