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
  bgColor,
  onClick,
  children,
  type = 'button',
}: PropsWithChildren<Props>) {
  return (
    <button className={cn(bgColor, className)} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
