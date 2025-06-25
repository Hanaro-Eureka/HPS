'use client';

import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { saveIncomeSource } from '../utils/saveIncomeSource';

type Props = {
  selectedIds: (string | number)[];
  from: string;
};

export default function CompleteButton({ selectedIds, from }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    await saveIncomeSource(selectedIds);
    // router.back();
    router.replace(`${from}?refresh=true`);
  };

  return (
    <Button
      bgColor='bg-button-lightgray'
      className='w-35 py-3 text-black-font rounded-3xl font-[500] text-base hover:bg-button-gray'
      onClick={handleClick}
    >
      완료
    </Button>
  );
}
