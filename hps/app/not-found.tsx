'use client';

import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center my-20'>
      <section className='w-56 h-12 mb-3 mt-32 text-center'>
        <div className='font-[600] text-4xl'>404 ERROR</div>
        <div></div>
      </section>
      <Button
        onClick={() => router.back()}
        bgColor='white'
        className='border-1 p-3 border-black'
      >
        뒤로가기
      </Button>
    </div>
  );
}
