'use client';

import * as Slider from '@radix-ui/react-slider';
import React from 'react';

type Props = {
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
};

export default function RadixSlider({
  value,
  onChange,
  min = 60,
  max = 70,
  step = 1,
  label = '수령 시작 나이',
}: Props) {
  return (
    <div className='w-full max-w-md'>
      <label className='block text-[#212121] text-md mb-2'>{label}</label>

      <Slider.Root
        className='relative flex h-5 w-full touch-none select-none items-center'
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className='relative h-[5px] grow rounded-full bg-[#ccc]'></Slider.Track>
        <Slider.Thumb
          className='block size-[20px] rounded-full bg-white border-[0.2px] border-[#212121] shadow-sm hover:bg-gray-100 focus:outline-none'
          aria-label='Age'
        />
      </Slider.Root>

      <div className='flex justify-between text-xs text-[#212121] mt-1'>
        <span>만 {min}세</span>
        <span>만 {max}세</span>
      </div>
    </div>
  );
}
