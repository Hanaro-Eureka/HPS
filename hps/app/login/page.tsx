'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { signIn } from 'next-auth/react';
import { use } from 'react';
import { loginValidator } from '@/lib/validator';

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default function Login({ searchParams }: Props) {
  const { callbackUrl } = use(searchParams);

  const login = async (formData: FormData) => {
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;

    const validator = loginValidator.safeParse({
      id,
      password,
    });
    if (!validator.success) {
      console.log('loginError');
      return;
    }

    let redirectTo = callbackUrl;
    if (!callbackUrl || callbackUrl.endsWith('signin')) redirectTo = '/';

    await signIn('credentials', {
      id,
      password,
      redirect: true,
      callbackUrl: redirectTo,
    });
  };

  return (
    <form action={login}>
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
          <Input
            name='password'
            type='password'
            placeholder='비밀번호'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none text-gray-login font-[400]'
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-4 w-full'>
          <Button
            type='submit'
            bgColor='bg-hana-button'
            className='w-full h-14 px-5 text-white rounded-lg font-[500] text-base'
          >
            로그인
          </Button>
          <Text className='text-sm text-[#aab0b9] font-[500]'>회원가입</Text>
        </div>
      </div>
    </form>
  );
}
