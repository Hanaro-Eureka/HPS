'use client';

import icons from '@/constants/bottomTabIcons';
import { usePathname, useRouter } from 'next/navigation';
import TabBarItem from './TabBarItem';

const tabItems = [
  { label: '시간 관리', icon: icons.time, href: '/timeLog' },
  { label: '수입 관리', icon: icons.income, href: '/income' },
  { label: '홈', icon: icons.home, href: '/' },
  { label: '소비 관리', icon: icons.spend, href: '/consumption' },
  { label: '별비서', icon: icons.assistant, href: '/chat' },
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
