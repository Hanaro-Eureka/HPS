'use client';

import Text from '@/components/atoms/Text';
import Image from 'next/image';

type Props = {
  label: string;
  value: string;
  onClick: () => void;
};

export default function ProfileItem({ label, value, onClick }: Props) {
  return (
    <div className='w-full grid grid-cols-[max-content_1fr_auto] items-center pl-8 my-1.5 pt-3 pb-4'>
      <Text className='text-base' tag='span'>
        {label}
      </Text>
      <div
        onClick={onClick}
        className='flex justify-end items-center gap-1 pr-5 cursor-pointer'
      >
        <Text className='text-base pr-4' tag='p'>
          {value}
        </Text>
        <Image src='/profile_change.svg' alt='수정' width={6} height={11} />
      </div>
      <div className='w-fit' />
    </div>
  );
}
