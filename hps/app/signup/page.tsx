'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleSignUp } from '@/lib/actions/signup';
import SelectBusiness from './components/SelectBusiness';

export default function SignUpPage() {
  const [selectedBusinessCode, setSelectedBusinessCode] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
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
      setErrors({ businessCode: '업종을 선택해주세요.' });
      return;
    }

    if (!result.success) {
      if (!result.field) {
        return;
      }
      setErrors({ [result.field]: result?.message });
      return;
    }

    router.push('/login');
  }
  return (
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
          {errors.name && (
            <Text className='text-xs font-[300] text-red-500'>
              {errors.name}
            </Text>
          )}

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

          <Input
            name='birth'
            type='date'
            placeholder='생년월일'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
          />
          {errors.birth && (
            <Text className='text-xs font-[300] text-red-500'>
              {errors.birth}
            </Text>
          )}

          <SelectBusiness
            value={selectedBusinessCode}
            onChange={setSelectedBusinessCode}
            error={errors.businessCode}
          />
        </div>

        <div className='flex flex-col items-center justify-center gap-4 w-full mt-24'>
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
  );
}
