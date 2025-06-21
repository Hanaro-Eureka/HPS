'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Button from '../atoms/Button';

// 뒤로가기가 있어야 하는 경로
const path = [
  '/incomeSource',
  '/income',
  '/incomeList',
  '/spend',
  '/byulAssistant',
  '/mypage',
];

export default function GoBackButton({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  const isshow = path.includes(pathname);
  return (
    <>
      {isshow ? (
        <div className='pt-3 '>
          <Button
            bgColor='white'
            className='ml-5'
            onClick={() => router.back()}
          >
            <Image
              src={'/svgs/ic_goback.svg'}
              alt='goback'
              width={10}
              height={18}
            />
          </Button>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
