'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import Image from 'next/image';
import { useState } from 'react';
import { changePassword } from '@/lib/actions/users';

type Props = {
  userId: number;
};

export default function ChangePassword({ userId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const newPassword = formData.get('newPassword')?.toString() || '';
    const currentPassword = formData.get('currentPassword')?.toString() || '';

    if (newPassword.length < 6) {
      setMessage('새 비밀번호는 6자 이상이어야 합니다!');
      return;
    }
    if (newPassword === currentPassword) {
      setMessage('새 비밀번호는 기존 비밀번호와 달라야 합니다!');
      return;
    }

    try {
      await changePassword(formData);
      setMessage('비밀번호가 성공적으로 변경되었습니다!');
      setIsEdit(false);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('비밀번호 변경 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className='w-full flex flex-col px-7 py-3'>
      <div className='flex justify-between items-center gap-4'>
        <Text
          className='text-base text-black-font font-[400] shrink-0 pt-2'
          tag='span'
        >
          비밀번호
        </Text>

        {isEdit ? (
          <form action={handleSubmit} className='flex flex-col gap-2 w-full'>
            <input type='hidden' name='userId' value={userId} />

            <div className='flex gap-4 w-full h-6.5'>
              <Input
                name='currentPassword'
                placeholder='기존 비밀번호'
                type='password'
                className='text-base w-full text-black-font font-[400] border border-gray-300 rounded'
                autoFocus
              />
              <Button
                type='reset'
                className='font-[400] text-white rounded px-1 min-w-[36.9px]'
                bgColor='bg-gray-login'
                onClick={() => setIsEdit(false)}
              >
                취소
              </Button>
            </div>

            <div className='flex gap-4 w-full h-6.5'>
              <Input
                name='newPassword'
                placeholder='새로운 비밀번호'
                type='password'
                className='text-base w-full text-black-font font-[400] border border-gray-300 rounded'
              />
              <Button
                type='submit'
                className='font-[400] text-white rounded px-1 min-w-[36.9px]'
                bgColor='bg-hana-button'
              >
                변경
              </Button>
            </div>
          </form>
        ) : (
          <div
            className='flex justify-end items-center cursor-pointer w-full'
            onClick={() => setIsEdit(true)}
          >
            <Text className='text-base text-black-font font-[400]' tag='p'>
              ******
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

      {message && (
        <Text className='text-xs text-center text-hana-green font-[400] mt-2'>
          {message}
        </Text>
      )}
    </div>
  );
}
