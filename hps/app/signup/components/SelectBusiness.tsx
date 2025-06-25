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
  value: string;
  onChange: (code: string) => void;
  error?: string;
};

export default function SelectBusiness({ value, onChange, error }: Props) {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='w-full !h-14 border border-[#dddce1] px-6 rounded-lg text-base text-black font-[400]'>
          <SelectValue placeholder='업종을 선택하세요' />
        </SelectTrigger>
        <SelectContent className='max-h-52'>
          {businessCodeData.map(({ code, label }) => (
            <SelectItem key={code} value={code}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
