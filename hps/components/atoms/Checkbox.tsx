'use client';

import React, { ChangeEvent } from 'react';

type Props = {
  id: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({ id, checked, onChange }: Props) {
  return (
    <label
      htmlFor={id}
      className='cursor-pointer block w-[2.3rem] h-[2.3rem] relative'
    >
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='absolute opacity-0 w-full h-full cursor-pointer'
      />
      <div
        className={`
          flex items-center justify-center w-full h-full rounded-[4px]
          border-2 border-[#2F9E8C]
          transition-colors duration-200
          ${checked ? 'bg-[#2F9E8C]' : 'bg-transparent'}
        `}
      >
        {checked && (
          <img
            src='check.svg'
            alt='Checked'
            className='w-[1.4rem] h-[1.4rem]'
          ></img>
        )}
      </div>
    </label>
  );
}
