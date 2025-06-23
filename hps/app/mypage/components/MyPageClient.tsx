'use client';

import Button from '@/components/atoms/Button';
import Title from '@/components/atoms/Title';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import ChangePassword from './ChangePassword';
import ProfileItem from './ProfileItem';

type Props = {
  name: string;
  loginId: string;
  birthDate: string;
  id: number;
};

export default function MyPageClient({ id, name, loginId, birthDate }: Props) {
  return (
    <div className='w-full flex flex-col items-center text-black-font pt-10 px-5 py-5'>
      <Title tag='h1' className='text-lg font-[500] '>
        {name}님의 정보
      </Title>

      <div className='w-full flex justify-center mt-10 mb-6'>
        <Image
          src='/svgs/ic_profile.svg'
          alt='Profile'
          width={90}
          height={90}
          className='rounded-full'
        />
      </div>

      <div className='w-full flex flex-col mb-5 font-[400]'>
        <ProfileItem label='이름' fname='name' value={name} id={id} />
        <ProfileItem label='아이디' fname='loginId' value={loginId} id={id} />
        <ProfileItem
          label='생년월일'
          fname='birthDate'
          value={birthDate}
          id={id}
        />
      </div>
      <div className='pb-5'>
        <ChangePassword />
      </div>
      <Button
        bgColor='bg-hana-button'
        className='w-full h-14 px-5 text-white rounded-lg font-[500] text-base'
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        로그아웃
      </Button>
    </div>
  );
}
