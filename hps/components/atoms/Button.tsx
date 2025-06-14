'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  onClick: () => void;
  bgColor: string;
};

export default function Button({
  className,
  bgColor,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        `${bgColor}
         `,
        className
      )}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  );
}
