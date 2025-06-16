'use client';

import { PropsWithChildren } from 'react';

type Props = {
  name?: string; //form 사용 위한 name입니다.
  placeholder: string;
  className: string;
  type?: 'text' | 'password' | 'date';
};

export default function Input({
  name,
  placeholder,
  type = 'text',
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={className}>
      <input
        name={name}
        placeholder={placeholder}
        className='w-full h-full px-2 text-[#979797] focus:outline-none'
        type={type}
      />
    </div>
  );
}
