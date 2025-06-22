'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { changePassword } from '@/lib/actions/users';

export default function ChangePassword() {
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState('');
  const { data: session } = useSession();

  const userId = session?.user?.id;
  if (!userId) return null;

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
        setMessage(err.message); // <- 서버에서 던진 에러 메시지 사용
      } else {
        setMessage('비밀번호 변경 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className='w-full max-w-sm mt-3'>
      {isEdit ? (
        <form
          action={handleSubmit}
          onSubmit={() => {}}
          className='flex flex-col gap-2'
        >
          <input type='hidden' name='userId' value={userId} />
          <div className='flex flex-row'>
            <div className='flex flex-col gap-2 px-3'>
              <Input
                name='currentPassword'
                placeholder='*기존 비밀번호'
                type='password'
                className='border border-gray-300 rounded h-10'
                autoFocus
              />
              <Input
                name='newPassword'
                placeholder='*새 비밀번호 (6자 이상)'
                type='password'
                className='border border-gray-300 rounded h-10'
              />
            </div>

            <Button
              type='submit'
              className='text-white rounded p-2 self-end'
              bgColor='bg-hana-button'
            >
              비밀번호 변경
            </Button>
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

      {message && (
        <div className='text-sm text-center text-hana-green font-medium my-2'>
          {message}
        </div>
      )}
    </div>
  );
}
