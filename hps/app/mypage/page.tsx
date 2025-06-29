import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getUserInfo } from '@/lib/users';
import MyPageClient from './components/MyPageClient';

export default async function MyPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const USER = await getUserInfo(Number(session.user.id));

  return (
    <SessionProvider session={session}>
      <MyPageClient {...USER.user} />
    </SessionProvider>
  );
}
