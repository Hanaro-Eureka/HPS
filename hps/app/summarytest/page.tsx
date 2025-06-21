import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import MainBar from '../components/MainNav';
import SalaryBox from '../components/SalaryBox';
import SalaryCircle from '../components/SalaryCircle';

export default async function SummaryTestPage() {
  return (
    <div className='min-h-screen overflow-hidden bg-gradient-salary flex flex-col '>
      <MainBar />
      <div className='flex items-center justify-center'>
        <SalaryBox />
      </div>
      <div className='flex items-center justify-center pb-24'>
        <SalaryCircle />
        <BottomTabBar />
      </div>
    </div>
  );
}
