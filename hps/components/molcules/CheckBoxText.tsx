'use client';

import { ChangeEvent } from 'react';
import Checkbox from '../atoms/Checkbox';

type Props = {
  id: string;
  checked: boolean;
  bgColor: string;
  borderColor: string;
  text: string;
  description?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBoxText({
  id,
  checked,
  bgColor,
  borderColor,
  text,
  description,
  onChange,
}: Props) {
  return (
    <label htmlFor={id} className='flex items-center gap-5.5 cursor-pointer'>
      <Checkbox
        id={id}
        checked={checked}
        bgColor={bgColor}
        borderColor={borderColor}
        onChange={onChange}
      />
      <div className='flex flex-col'>
        <span className='text-base font-bold text-black-font'>{text}</span>
        <span className='text-xs mt-3 text-hana-green'>{description}</span>
      </div>
    </label>
  );
}
