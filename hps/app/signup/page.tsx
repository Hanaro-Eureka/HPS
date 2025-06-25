'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import ToastMsg from '@/components/molcules/ToastMsg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleSignUp } from '@/lib/actions/signup';
import SelectBusiness from './components/SelectBusiness';

export default function SignUpPage() {
  const [selectedBusinessCode, setSelectedBusinessCode] = useState('');

  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type?: 'error' | 'success' | 'info';
  } | null>(null);

  async function SignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const raw = {
      name: formData.get('name')?.toString() ?? '',
      id: formData.get('id')?.toString() ?? '',
      birth: formData.get('birth')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      businessCode: selectedBusinessCode,
    };

    const result = await handleSignUp(raw);

    if (!selectedBusinessCode) {
      setToast({ message: '업종을 선택해주세요.', type: 'error' });
      return;
    }

    if (!result.success) {
      if (!result.message) return;
      setToast({ message: result.message, type: 'error' });
      return;
    }

    setToast({ message: '회원가입에 성공했습니다!', type: 'success' });

    setTimeout(() => {
      router.push('/login');
    }, 1000); // 성공 토스트 띄워서 보여주고 push
  }

  return (
    <div>
      {toast && (
        <ToastMsg
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <form onSubmit={SignUp}>
        <div className='flex flex-col w-full items-center justify-start gap-10 px-8 py-20'>
          <div className='flex flex-col w-full items-center justify-center gap-8'>
            <Text className='text-xl font-[300] text-black-font'>회원가입</Text>
            <Text className='text-center text-black-font font-[500]'>
              정보를 입력해 주세요
            </Text>
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <Input
              name='name'
              type='text'
              placeholder='이름'
              className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
            />

            <Input
              name='id'
              type='text'
              placeholder='아이디'
              className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
            />
            <Input
              name='password'
              type='password'
              placeholder='비밀번호'
              className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none text-gray-login font-[400]'
            />
            <Input
              name='birth'
              type='date'
              placeholder='생년월일'
              className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
            />

            <SelectBusiness
              value={selectedBusinessCode}
              onChange={setSelectedBusinessCode}
            />
          </div>
          <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <Button
              type='submit'
              bgColor='bg-hana-button'
              className='w-full h-14 px-5 text-white rounded-lg font-[500] text-base'
            >
              회원가입
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
