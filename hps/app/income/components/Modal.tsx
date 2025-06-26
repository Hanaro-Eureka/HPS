'use client';

import { useRef, MouseEventHandler } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onClick: MouseEventHandler = (e) => {
    if (e.target === overlay.current || e.target === wrapper.current) {
    }
  };

  return (
    <div
      ref={overlay}
      className='fixed z-10 left-0 right-0 top-0 bottom-0 bg-modal-shadow'
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 h-96 p-14 bg-white rounded-xl'
      >
        {children}
      </div>
    </div>
  );
}
