import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import { redirect } from 'next/navigation';
import { getThisMonthUntilTodayIncomeSum } from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import FirstIncomeCircle from './components/FirstIncomeCircle';
import IncomeBox from './components/IncomeBox';
import IncomeCircle from './components/IncomeCircle';
import MainBar from './components/MainNav';

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const noIncome =
    (await getThisMonthUntilTodayIncomeSum(Number(session.user?.id))) === 0;

  return (
    <>
      <div className='relative min-h-screen p-7 flex flex-col'>
        <MainBar />
        <div className='flex items-center justify-center '>
          <IncomeBox />
        </div>
        {noIncome ? <FirstIncomeCircle /> : <IncomeCircle />}
      </div>
      <BottomTabBar />
    </>
  );
}
