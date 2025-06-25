'use client';

import Button from '@/components/atoms/Button';
import HeaderLayout from '@/components/templates/HeaderLayout';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import BusinessCode from './BusinessCode';
import ChangePassword from './ChangePassword';
import ProfileItem from './ProfileItem';

type Props = {
  name: string;
  loginId: string;
  birthDate: string;
  id: number;
  businessCode: string | null;
};

export default function MyPageClient({
  id,
  name,
  loginId,
  birthDate,
  businessCode,
}: Props) {
  return (
    <HeaderLayout title='마이페이지'>
      <div className='w-full flex flex-col items-center text-black-font pt-10 px-5 py-5'>
        <div className='w-full flex justify-center mt-10 mb-10'>
          <Image
            src='/svgs/ic_profile.svg'
            alt='Profile'
            width={90}
            height={90}
            className='rounded-full'
          />
        </div>

        <div className='w-full flex flex-col gap-3 font-[400]'>
          <ProfileItem label='이름' fname='name' value={name} id={id} />
          <ProfileItem label='아이디' fname='loginId' value={loginId} id={id} />
          <ChangePassword userId={id} />

          <ProfileItem
            label='생년월일'
            fname='birthDate'
            value={birthDate}
            id={id}
          />
          <BusinessCode
            label='업종'
            fname='businessCode'
            value={businessCode}
            id={id}
          />
        </div>
        <Button
          bgColor='bg-hana-button'
          className='w-full h-12 px-5 mt-31 text-white rounded-lg font-[500] text-base'
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          로그아웃
        </Button>
      </div>
    </HeaderLayout>
  );
}
