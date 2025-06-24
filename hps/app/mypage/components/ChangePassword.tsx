'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ToastMsg from '@/components/molcules/ToastMsg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { changePassword } from '@/lib/actions/users';

export default function ChangePassword() {
  const [isEdit, setIsEdit] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: 'error' | 'success';
  } | null>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  if (!userId) return null;

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
    <div className='w-full max-w-sm mt-3'>
      {toast && (
        <ToastMsg
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {isEdit ? (
        <form action={handleSubmit} className='flex flex-col gap-2'>
          <input type='hidden' name='userId' value={userId} />
          <div className='flex flex-row'>
            <div className='flex flex-col gap-2 px-3'>
              <Input
                name='currentPassword'
                placeholder='*기존 비밀번호'
                type='password'
                className='text-base text-black-font font-[400] border border-gray-300 rounded'
                autoFocus
              />
              <Input
                name='newPassword'
                placeholder='*새 비밀번호 (6자 이상)'
                type='password'
                className='text-base text-black-font font-[400] border border-gray-300 rounded'
              />
            </div>
            <div className='flex flex-col gap-2 px-3'>
              <Button
                type='reset'
                className='text-base text-white rounded font-[400] px-5 border border-hana-buttom'
                bgColor='bg-hana-button'
                onClick={() => setIsEdit(false)}
              >
                취소
              </Button>
              <Button
                type='submit'
                className='text-base text-white rounded font-[400] px-5 border border-hana-button'
                bgColor='bg-hana-button'
              >
                변경
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => setIsEdit(true)}
        >
          <span className='text-sm text-black-font font-medium'>
            비밀번호 변경
          </span>
          <Image
            src='/svgs/ic_profile_change.svg'
            alt='수정'
            width={6}
            height={11}
          />
        </div>
      )}
    </div>
  );
}
