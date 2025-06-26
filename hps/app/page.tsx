import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import MainBar from './components/MainNav';
import SalaryBox from './components/SalaryBox';
import SalaryCircle from './components/SalaryCircle';

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
          <SalaryBox />
        </div>
        <SalaryCircle />
      </div>
      <BottomTabBar />
    </>
  );
}
