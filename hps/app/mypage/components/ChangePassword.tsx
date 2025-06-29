'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import ToastMsg from '@/components/molcules/ToastMsg';
import Image from 'next/image';
import { useState } from 'react';
import { changePassword } from '@/lib/users';

type Props = {
  userId: number;
};

export default function ChangePassword({ userId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: 'error' | 'success';
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const newPassword = formData.get('newPassword')?.toString() || '';
    const currentPassword = formData.get('currentPassword')?.toString() || '';

    if (newPassword.length < 6) {
      setToast({
        message: '새 비밀번호는 6자 이상이어야 합니다!',
        type: 'error',
      });
      return;
    }

    if (newPassword === currentPassword) {
      setToast({
        message: '새 비밀번호는 기존 비밀번호와 달라야 합니다!',
        type: 'error',
      });
      return;
    }

    const result = await changePassword(formData);

    if (!result.success) {
      setToast({
        message: result.message || '비밀번호 변경에 실패했습니다.',
        type: 'error',
      });
      return;
    }

    setToast({
      message: '비밀번호가 성공적으로 변경되었습니다!',
      type: 'success',
    });
    setIsEdit(false);
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
      </div>
    </>
  );
}
