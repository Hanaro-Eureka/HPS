'use client';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import Image from 'next/image';

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
          className='text-base'
          bgColor='bg-white'
          onClick={() => alert('뒤로가기!')}
        >
          <Image src='/goback.svg' alt='뒤로가기' width={10} height={18} />
        </Button>

        <Title className='text-base justify-center'>{user.name}님의 정보</Title>
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
        <div className='w-full grid grid-cols-[max-content_1fr_auto] items-center pl-8 my-1.5 pt-3 pb-4'>
          <Text className='text-base' tag='span'>
            이름
          </Text>
          <div
            onClick={() => alert('이름 수정 버튼')}
            className='flex justify-end items-center gap-1 pr-5 cursor-pointer'
          >
            <Text className='text-base pr-4' tag='p'>
              {user.name}
            </Text>
            <Image src='/profile_change.svg' alt='수정' width={6} height={11} />
          </div>
          <div className='w-fit' />
        </div>

        <div className='w-full grid grid-cols-[max-content_1fr_auto] items-center pl-8 my-1.5 pt-3 pb-4'>
          <Text className='text-base' tag='span'>
            생년월일
          </Text>
          <div
            onClick={() => alert('생년월일 수정 버튼')}
            className='flex justify-end items-center gap-1 pr-5 cursor-pointer'
          >
            <Text className='text-base pr-4' tag='p'>
              {user.birth}
            </Text>
            <Image src='/profile_change.svg' alt='수정' width={6} height={11} />
          </div>
          <div className='w-fit' />
        </div>

        <div className='w-full grid grid-cols-[max-content_1fr_auto] items-center pl-8 my-1.5 pt-3 pb-4'>
          <Text className='text-base' tag='span'>
            이메일 주소
          </Text>
          <div
            onClick={() => alert('이메일 수정 버튼')}
            className='flex justify-end items-center gap-1 pr-5 cursor-pointer'
          >
            <Text className='text-base pr-4' tag='p'>
              {user.email}
            </Text>
            <Image src='/profile_change.svg' alt='수정' width={6} height={11} />
          </div>
          <div className='w-fit' />
        </div>

        <div className='w-full grid grid-cols-[max-content_1fr_auto] items-center pl-8 my-1.5 pt-3 pb-4'>
          <Text className='text-base' tag='span'>
            직업
          </Text>
          <div
            onClick={() => alert('직업 수정 버튼')}
            className='flex justify-end items-center gap-1 pr-5 cursor-pointer'
          >
            <Text className='text-base pr-4' tag='p'>
              {user.job}
            </Text>
            <Image src='/profile_change.svg' alt='수정' width={6} height={11} />
          </div>
          <div className='w-fit' />
        </div>
        <Button
          bgColor='bg-[#019591]'
          className='w-full h-14 px-5 mt-10 text-white text-base rounded-lg'
          onClick={() => alert('로그아웃 버튼 클릭')}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
