'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // 유지 기간 (ms)
  onClose?: () => void;
};

export default function ToastMsg({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) return null;

  const baseStyle =
    'fixed bottom-45 left-0 right-0 mx-2  h-14 py-2 rounded-lg shadow-lg  z-50 whitespace-nowrap flex items-center text-white';

  //text-center max-w-sm sm:mx-auto justify-center

  const typeStyles: Record<typeof type, string> = {
    success: 'bg-toast-message',
    error: 'bg-toast-message',
    info: 'bg-toast-message',
  };

  return (
    <div className={cn(baseStyle, typeStyles[type])}>
      <Image
        src={'/svgs/ic_toastWarning.svg'}
        alt='토스트메세지'
        width={20}
        height={20}
        className='ml-3'
      />{' '}
      <div className='text-sm font-[500] ml-2'>{message}</div>
    </div>
  );
}
