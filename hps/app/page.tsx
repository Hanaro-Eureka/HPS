import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import IncomeBox from './components/IncomeBox';
import IncomeCircle from './components/IncomeCircle';
import MainBar from './components/MainNav';

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <div className='relative min-h-screen p-7 flex flex-col'>
        <MainBar />
        <div className='flex items-center justify-center '>
          <IncomeBox />
        </div>
        <IncomeCircle />
      </div>
      <BottomTabBar />
    </>
  );
}
