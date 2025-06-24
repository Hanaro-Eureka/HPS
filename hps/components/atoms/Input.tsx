'use client';

import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  name?: string;
  placeholder?: string;
  className: string;
  type?: 'text' | 'password' | 'date';
  defaultValue?: string;
  autoFocus?: boolean;
  children?: ReactNode;
};

export default function Input({
  name,
  placeholder,
  type = 'text',
  className,
  defaultValue,
  autoFocus = false,
  children,
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
