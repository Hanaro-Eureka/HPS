'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import ToastMsg from '@/components/molcules/ToastMsg';
import Image from 'next/image';
import { useState } from 'react';
import { updateUserField } from '@/lib/actions/users';

type Props = {
  id: number;
  label: string;
  fname: 'name' | 'loginId' | 'password' | 'birthDate';
  value: string;
};

export default function ProfileItem({ id, label, fname, value }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [toast, setToast] = useState<{
    message: string;
    type?: 'error' | 'success';
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const newValue = formData.get('value')?.toString() ?? '';
    const result = await updateUserField(formData);

    if (!result.success) {
      setToast({
        message: result.message || '업데이트에 실패했습니다.',
        type: 'error',
      });
      return;
    }

    setCurrentValue(newValue);
    setIsEdit(false);
    setToast({ message: '성공적으로 저장되었습니다.', type: 'success' });
  };

  const isName = fname === 'name';
  const isBirthDate = fname === 'birthDate';

  const formatBirthDate = (raw: string) => {
    const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      const [, yyyy, mm, dd] = isoMatch;
      return `${yyyy}. ${mm}. ${dd}`;
    }

    const compactMatch = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compactMatch) {
      const [, yyyy, mm, dd] = compactMatch;
      return `${yyyy}. ${mm}. ${dd}`;
    }

    return raw;
  };

  return (
    <>
      {toast && (
        <ToastMsg
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className='w-full flex flex-col px-7 py-3'>
        <div className='flex justify-between items-center'>
          <Text
            className='text-base text-black-font font-[400] shrink-0'
            tag='span'
          >
            {label}
          </Text>

          {isEdit && !isName ? (
            <form
              action={handleSubmit}
              className='flex justify-end items-center w-full'
            >
              <input type='hidden' name='id' value={id} />
              <input type='hidden' name='field' value={fname} />
              {isBirthDate ? (
                <Input
                  type='date'
                  name='value'
                  defaultValue={currentValue}
                  autoFocus
                  className='w-full text-base text-black-font font-[400] border border-gray-300 rounded mx-4 text-right'
                />
              ) : (
                <Input
                  name='value'
                  defaultValue={currentValue}
                  autoFocus
                  className='w-full text-base text-black-font font-[400] border border-gray-300 rounded mx-4 text-right'
                />
              )}
              <Button
                bgColor='bg-hana-button'
                className='text-white rounded p-0.5 shrink-0 font-[400]'
                type='submit'
              >
                저장
              </Button>
            </form>
          ) : (
            <div
              onClick={() => {
                if (!isName) setIsEdit(true);
              }}
              className='flex justify-end items-center cursor-pointer w-full'
            >
              <Text className='text-base text-black-font font-[400]' tag='p'>
                {isBirthDate
                  ? formatBirthDate(currentValue)
                  : currentValue || '-'}
              </Text>
              {!isName && (
                <Image
                  src='/svgs/ic_profile_change.svg'
                  alt='수정'
                  width={6}
                  height={11}
                  className='ml-3'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
