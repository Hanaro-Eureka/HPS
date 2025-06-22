'use client';

import icons from '@/constants/bottomTabIcons';
import { usePathname, useRouter } from 'next/navigation';
import TabBarItem from './TabBarItem';

const tabItems = [
  { label: '내 카드 실적', icon: icons.mycard, href: '/mycard' },
  { label: '하나만 챌린지', icon: icons.challenge, href: '/hanaChallenge' },
  { label: '홈', icon: icons.home, href: '/' },
  { label: '국민연금', icon: icons.pension, href: '/pension' },
  { label: '연말정산', icon: icons.endtax, href: '/yearEndTax' },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='fixed bottom-0 flex flex-row w-full items-center justify-center'>
      {tabItems.map((item) => (
        <TabBarItem
          key={item.href}
          label={item.label}
          icon={item.icon}
          active={pathname === item.href}
          onClick={() => router.push(item.href)}
        />
      ))}
    </div>
  );
}
