'use client';

import Text from '@/components/atoms/Text';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { updateIncome } from '@/lib/actions/salary-actions';
import { cn } from '@/lib/utils';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

type Props = {
  icon: React.ReactNode;
  id?: string | number;
  label: string;
  time: string;
  amount: number;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
};

export default function ListItem({
  icon,
  id,
  label,
  time,
  amount,
  onClick,
  isSelected = false,
  className,
}: Props) {
  const pathName = usePathname();
  const [isEdited, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(label);

  const handleSubmit = async (formData: FormData) => {
    const value = formData.get('value')?.toString();
    await updateIncome(formData);
    setEdit(false);
    setNewValue(value === '' ? newValue : String(value));
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-between py-4 px-6',
        isSelected && 'bg-black-checked',
        className
      )}
    >
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full flex items-center justify-center'>
          {icon}
        </div>
        <div className='flex flex-col gap-1'>
          {pathName === '/incomeList' ? (
            <div>
              {isEdited ? (
                <>
                  <form action={handleSubmit}>
                    <input type='hidden' name='id' value={id} />
                    <Input
                      placeholder={newValue}
                      className='border-1 w-36'
                      name='value'
                    ></Input>
                  </form>
                </>
              ) : (
                <div className='flex'>
                  <Text
                    tag='strong'
                    className='text-black-font text-base font-[500]'
                  >
                    {newValue}
                  </Text>
                  <Button bgColor='white' onClick={() => setEdit(!isEdited)}>
                    <Image
                      src={'/svgs/ic_pencil.svg'}
                      alt='수입 내역 수정하기'
                      width={16}
                      height={16}
                    />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex'>
              <Text
                tag='strong'
                className='text-black-font text-base font-[500]'
              >
                {label}
              </Text>
            </div>
          )}

          <Text tag='span' className='text-xs text-gray-time font-[500]'>
            {time}
          </Text>
        </div>
      </div>

      <div className='flex'>
        <Text
          tag='span'
          className='text-right text-base text-hana-green font-[500]'
        >
          {amount.toLocaleString()}원
        </Text>
      </div>
    </div>
  );
}
