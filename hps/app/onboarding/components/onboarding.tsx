'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Onboarding() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='flex flex-col items-center'>
        <Image
          src='/svgs/ic_onboarding.svg'
          alt='별비서 온보딩'
          width={173}
          height={260}
          className='mb-2'
          priority
        />
        <div className='text-center'>
          <p className='text-3xl font-[600]'>
            <span className='text-hana-logo'>하나의 </span>
            <span className='text-black-font'>완벽한 </span>
            <span className='text-hana-logo'>비서</span>
          </p>
          <p className='font-[500] text-black-font mt-1'>
            MZ 프리랜서를 위한 자산 관리 도우미
          </p>
        </div>
      </div>
    </div>
  );
}
