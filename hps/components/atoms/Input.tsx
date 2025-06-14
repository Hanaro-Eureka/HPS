'use client';

import { PropsWithChildren } from 'react';

type Props = {
  name?: string; //form 사용 위한 name입니다.
  placeholder: string;
  className?: string;
  type?: 'text' | 'password' | 'date';
};

export default function Input({
  name,
  placeholder,
  type = 'text',
  className = 'w-full left-5 absolute justify-start text-lg focus:outline-none',
}: PropsWithChildren<Props>) {
  return (
    <div className='w-80 h-14 left-0 top-0 absolute bg-white rounded-lg outline-1 flex items-center outline-offset-[-1px] outline-zinc-200 overflow-hidden'>
      <input
        name={name}
        placeholder={placeholder}
        className={className}
        type={type}
      />
    </div>
  );
}
