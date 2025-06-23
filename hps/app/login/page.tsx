'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { handleLogin } from '@/lib/actions/login';

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function Login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const raw = {
      id: formData.get('id')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    };

    const result = await handleLogin(raw);
    if (!result.success) {
      if (!result.field) {
        return;
      }
      setErrors({ [result.field]: result?.message });
      return;
    }

    await signIn('credentials', {
      id: raw.id,
      password: raw.password,
      redirect: true,
      callbackUrl: '/',
    });
  }

  return (
    <form onSubmit={Login}>
      <div className='flex flex-col w-full items-center justify-start gap-16 px-8 py-40'>
        <div className='flex flex-col w-full items-center justify-center gap-8'>
          <Text className=' text-xl font-[300] text-black-font'>로그인</Text>
          <Text className=' text-center text-black-font font-[500]'>
            아이디와 비밀번호를
            <br />
            입력해 주세요
          </Text>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <Input
            name='id'
            type='text'
            placeholder='아이디'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
          />
          {errors.id && (
            <Text className='text-xs font-[300] text-red-500'>{errors.id}</Text>
          )}
          <Input
            name='password'
            type='password'
            placeholder='비밀번호'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none text-gray-login font-[400]'
          />
          {errors.password && (
            <Text className='text-xs font-[300] text-red-500'>
              {errors.password}
            </Text>
          )}
          {errors.idpass && (
            <Text className='text-xs font-[300] text-red-500'>
              {errors.idpass}
            </Text>
          )}
        </div>
        <div className='flex flex-col items-center justify-center gap-4 w-full'>
          <Button
            type='submit'
            bgColor='bg-hana-button'
            className='w-full h-14 px-5 text-white rounded-lg font-[500] text-base'
          >
            로그인
          </Button>
          <Link href='/signup' className='text-sm text-[#aab0b9] font-[500]'>
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}
