'use client';

import Button from '@/components/atoms/Button';
import Title from '@/components/atoms/Title';
import Image from 'next/image';
import ProfileItem from './components/ProfileItem';

const user = {
  name: '별도리',
  birth: '2002.09.08',
  email: 'byeoldori@hana.com',
  job: '직장인',
};

export default function MyPage() {
  return (
    <div className='flex flex-col w-full items-center pt-15 px-5 py-5'>
      <div className='flex grow w-full items-center justify-between'>
        <Button
          aria-label='뒤로 가기'
          className='text-base '
          bgColor='bg-background'
          onClick={() => alert('뒤로가기!')}
        >
          <Image src='/goback.svg' alt='뒤로가기' width={10} height={18} />
        </Button>

        <Title
          className='text-base justify-center text-black-font font-[500]'
          tag={'h1'}
        >
          {user.name}님의 정보
        </Title>
        <div />
      </div>

      <div className='w-full flex justify-center mt-32 mb-10'>
        <Image
          src='/profile.svg'
          alt='Profile'
          width={90}
          height={90}
          className='rounded-full'
        />
      </div>

      <div className='w-full flex flex-col'>
        <ProfileItem
          label='이름'
          value={user.name}
          onClick={() => alert('이름 수정 버튼')}
        />
        <ProfileItem
          label='생년월일'
          value={user.birth}
          onClick={() => alert('생년월일 수정 버튼')}
        />
        <ProfileItem
          label='이메일 주소'
          value={user.email}
          onClick={() => alert('이메일 수정 버튼')}
        />
        <ProfileItem
          label='직업'
          value={user.job}
          onClick={() => alert('직업 수정 버튼')}
        />

        <Button
          bgColor='bg-hana-button'
          className='w-full h-14 px-5 mt-10 text-white text-base rounded-lg font-[500]'
          onClick={() => alert('로그아웃 버튼 클릭')}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
