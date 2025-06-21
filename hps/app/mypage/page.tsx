import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getUserInfo } from '@/lib/actions/users';
import { auth } from '@/lib/auth';
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
