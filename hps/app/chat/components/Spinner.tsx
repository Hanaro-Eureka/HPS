'use client';

import React from 'react';

export default function Spinner() {
  return (
    <div className='fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2'>
      <div
        className='w-24 aspect-square rounded-full animate-spin
        [background:radial-gradient(farthest-side,#10AB9F_94%,transparent)_top/8px_8px_no-repeat,conic-gradient(transparent_30%,#10AB9F)]
        [mask:radial-gradient(farthest-side,transparent_calc(100%-8px),black_0)]'
      ></div>
    </div>
  );
}
