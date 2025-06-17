'use client';

import Text from '@/components/atoms/Text';
import Image from 'next/image';
import { isGoodRate } from '../utils/calculrateRate';

export default function Card() {
  return (
    <>
      {isGoodRate() ? (
        <div className='flex mt-6 justify-center gap-18 items-end'>
          <span className='flex flex-col items-center gap-2'>
            <Image
              src='/Img_CreditCard(Small).svg'
              alt='smallCreditCard'
              width={52}
              height={52}
              className='rounded-full'
            />
            <Text className='text-gray-font text-sm font-[400] text-center'>
              신용카드
            </Text>
          </span>
          <span className='flex flex-col items-center'>
            <Image
              src='/Img_CheckCard(Big).svg'
              alt='bigCheckCard'
              width={90}
              height={91}
              className='rounded-full'
            />
            <Text className='text-gray-font text-sm font-[400] text-center'>
              체크카드
            </Text>
          </span>
        </div>
      ) : (
        <div className='flex mt-6 justify-center gap-18 items-end'>
          <span className='flex flex-col items-center'>
            <Image
              src='/Img_CreditCard(Big).svg'
              alt='bigCreditCard'
              width={90}
              height={91}
              className='rounded-full'
            />
            <Text className='text-gray-font text-sm font-[400] text-center'>
              신용카드
            </Text>
          </span>
          <span className='flex flex-col items-center gap-2'>
            <Image
              src='/Img_CheckCard(Small).svg'
              alt='smallCheckCard'
              width={52}
              height={52}
              className='rounded-full'
            />
            <Text className='text-gray-font text-sm font-[400] text-center'>
              체크카드
            </Text>
          </span>
        </div>
      )}
    </>
  );
}
