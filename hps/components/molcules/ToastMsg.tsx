'use client';

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
    'fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl text-white shadow-lg z-50 text-sm';

  const typeStyles: Record<typeof type, string> = {
    success: 'bg-hana-chartchat',
    error: 'bg-chart-overflow',
    info: 'bg-hana-hanaman',
  };

  return <div className={cn(baseStyle, typeStyles[type])}>{message}</div>;
}
