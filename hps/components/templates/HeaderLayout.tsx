'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Title from '../atoms/Title';

// 뒤로가기 버튼이 있는 페이지 경로
const goBackPaths = [
  '/incomeSource',
  '/income',
  '/incomeList',
  '/consumption',
  '/spendList',
  '/chat',
  '/mypage',
];

type Props = {
  title?: string;
  path?: string;
  isIncome?: boolean;
};

export default function HeaderLayout({
  children,
  title,
  path = '/',
  isIncome,
}: PropsWithChildren<Props>) {
  const pathname = usePathname();
  const router = useRouter();
  const shouldShowBack = goBackPaths.includes(pathname);

  return (
    <div className='bg-background'>
      {shouldShowBack && (
        <div className='relative flex items-center px-4 mt-6'>
          {isIncome ? (
            <button
              onClick={() => router.back()}
              className='p-2'
              aria-label='뒤로가기'
            >
              <Image
                src='/svgs/ic_goback.svg'
                alt='뒤로가기'
                width={10}
                height={18}
              />
            </button>
          ) : (
            <button
              onClick={() => router.push(path)}
              className='p-2'
              aria-label='뒤로가기'
            >
              <Image
                src='/svgs/ic_goback.svg'
                alt='뒤로가기'
                width={10}
                height={18}
              />
            </button>
          )}
          {title && (
            <Title
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-[600] text-black-font'
              tag='h1'
            >
              {title}
            </Title>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
