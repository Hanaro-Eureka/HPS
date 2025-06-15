'use client';

import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  id: string;
  checked: boolean;
  bgColor: string;
  borderColor: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  checked,
  bgColor,
  borderColor,
  onChange,
}: Props) {
  return (
    <label htmlFor={id} className='cursor-pointer block w-10 h-10 relative'>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='absolute opacity-0 w-full h-full cursor-pointer'
      />
      <div
        className={cn(
          'flex items-center justify-center w-full h-full rounded-lg border-2 transition-colors duration-200',
          borderColor,
          checked ? bgColor : 'bg-transparent'
        )}
      >
        {checked && (
          <img src='check.svg' alt='Checked' className='w-6 h-6'></img>
        )}
      </div>
    </label>
  );
}
