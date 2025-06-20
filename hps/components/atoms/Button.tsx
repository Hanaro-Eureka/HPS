'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  onClick?: () => void;
  bgColor: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  className,
  type,
  bgColor,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      className={cn(
        `${bgColor}
         `,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
