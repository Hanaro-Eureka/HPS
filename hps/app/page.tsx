'use client';

import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';

export default function HomePage() {
  return (
    <div className='min-h-screen pb-16 bg-gray-50'>
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4'>메인 페이지</h1>
        <p>여기에 메인 페이지 콘텐츠가 들어갑니다.</p>
      </div>
      <BottomTabBar />
    </div>
  );
}
