'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { businessCodeData } from '@/constants/businessCodeData';

type Props = {
  value: string | null;
  onChange: (code: string) => void;
};

export default function SelectBusinessEdit({ value, onChange }: Props) {
  return (
    <Select value={value ?? ''} onValueChange={onChange}>
      <SelectTrigger className='w-full !h-6.5 border border-gray-300 rounded mx-4 text-base'>
        <SelectValue placeholder='업종을 선택하세요' />
      </SelectTrigger>
      <SelectContent className='max-h-52'>
        {businessCodeData.map(({ code, label }) => (
          <SelectItem key={code} value={code} className='text-sm h-10'>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
