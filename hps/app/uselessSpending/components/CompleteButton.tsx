'use client';

import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

type Props = {
  selectedIds: (string | number)[];
};

export default function CompleteButton({ selectedIds }: Props) {
  const router = useRouter();

  return (
    <Button
      bgColor='bg-button-lightgray'
      className='w-35 py-3 text-black-font rounded-3xl font-[500] text-base hover:bg-button-gray'
      onClick={() => router.push('/hanaChallenge')}
    >
      완료
    </Button>
  );
}
