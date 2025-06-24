'use client';

import Button from '@/components/atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center my-20'>
      <section className='mt-32 text-center'>
        <div className='font-[600] text-4xl mb-3'>404 ERROR</div>
        <div className='font-[500] mb-14'>
          죄송합니다. 페이지를 찾을 수 없습니다.
        </div>
      </section>
      <Image
        src={'/svgs/404hanaMon.svg'}
        alt='404hanaMon'
        width={207}
        height={193}
      />

      <Button
        bgColor='white'
        className='mt-16 font-[500] text-hana-logo border border-hana-logo py-3 px-8'
        onClick={() => router.push('/')}
      >
        메인으로
      </Button>
    </div>
  );
}
