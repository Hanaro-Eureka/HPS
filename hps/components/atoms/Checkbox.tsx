'use client';

import React, { ChangeEvent } from 'react';

type Props = {
  id: string;
  checked: boolean;
  bgColor?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({ id, checked, bgColor, onChange }: Props) {
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
        className={`
          flex items-center justify-center w-full h-full rounded-lg
          border-2 
          transition-colors duration-200
          ${checked ? '' : 'bg-transparent'}
        `}
        style={{
          borderColor: bgColor,
          backgroundColor: checked ? bgColor : 'transparent',
        }}
      >
        {checked && (
          <img src='check.svg' alt='Checked' className='w-6 h-6'></img>
        )}
      </div>
    </label>
  );
}
