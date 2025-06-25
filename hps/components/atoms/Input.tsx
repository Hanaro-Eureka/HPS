'use client';

import { PropsWithChildren } from 'react';

type Props = {
  name?: string;
  placeholder?: string;
  className: string;
  type?: 'text' | 'password' | 'date';
  defaultValue?: string;
  autoFocus?: boolean;
};

export default function Input({
  name,
  placeholder,
  type = 'text',
  className,
  defaultValue,
  autoFocus = false,
}: PropsWithChildren<Props>) {
  return (
    <div className={className}>
      <input
        name={name}
        placeholder={placeholder}
        className='w-full h-full px-2 text-black-font focus:outline-none'
        type={type}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
      />
    </div>
  );
}
