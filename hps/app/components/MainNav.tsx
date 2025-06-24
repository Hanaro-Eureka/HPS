'use client';

import Button from '@/components/atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MainBar() {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-between'>
        <div className='text-2xl font-[600]'>하나의 완벽한 비서</div>
        <Button bgColor='#E4F4F1' onClick={() => router.push('/mypage')}>
          <Image
            src='/svgs/ic_gomypage.svg'
            alt='마이페이지가기'
            width={24}
            height={24}
          />
        </Button>
      </div>
    </>
  );
}
