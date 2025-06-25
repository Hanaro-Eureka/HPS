'use client';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { businessCodeData } from '@/constants/businessCodeData';
import Image from 'next/image';
import { useState } from 'react';
import { updateUserField } from '@/lib/actions/users';
import SelectBusinessEdit from './SelectBusinessEdit';

type Props = {
  id: number;
  label: string;
  fname: 'businessCode';
  value: string | null;
};

export default function BusinessCode({ id, label, fname, value }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      setErrorMessage('');
      const newValue = formData.get('value')?.toString() ?? '';
      await updateUserField(formData);
      setCurrentValue(newValue);
      setIsEdit(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('업데이트에 실패했습니다.');
      }
    }
  };

  const getLabelByCode = (code: string | null) => {
    return businessCodeData.find((item) => item.code === code)?.label || '-';
  };

  return (
    <div className='w-full flex flex-col px-7 py-3'>
      <div className='flex justify-between items-center'>
        <Text
          className='text-base text-black-font font-[400] shrink-0'
          tag='span'
        >
          {label}
        </Text>

        {isEdit ? (
          <form
            action={handleSubmit}
            className='flex justify-end items-center w-full'
          >
            <input type='hidden' name='id' value={id} />
            <input type='hidden' name='field' value={fname} />

            <input type='hidden' name='value' value={currentValue ?? ''} />
            <SelectBusinessEdit
              value={currentValue}
              onChange={(val) => setCurrentValue(val)}
            />

            <Button
              bgColor='bg-hana-button'
              className='text-white rounded px-1 shrink-0 font-[400]'
              type='submit'
            >
              저장
            </Button>
          </form>
        ) : (
          <div
            onClick={() => {
              setIsEdit(true);
            }}
            className='flex justify-end items-center cursor-pointer w-full'
          >
            <Text className='text-base text-black-font font-[400]' tag='p'>
              {getLabelByCode(currentValue)}
            </Text>

            <Image
              src='/svgs/ic_profile_change.svg'
              alt='수정'
              width={6}
              height={11}
              className='ml-3'
            />
          </div>
        )}
      </div>

      {errorMessage && (
        <Text className='text-xs text-spend-alert pl-1' tag='p'>
          {errorMessage}
        </Text>
      )}
    </div>
  );
}
