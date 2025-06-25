import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import MainBar from './components/MainNav';
import SalaryBox from './components/SalaryBox';
import SalaryCircle from './components/SalaryCircle';

export default function Home() {
  return (
    <>
      <div className='h-screen p-7 flex flex-col'>
        <MainBar />
        <div className='flex items-center justify-center'>
          <SalaryBox />
        </div>
        <div className='flex flex-1 items-end justify-center pt-3 pb-24'>
          <SalaryCircle />
        </div>
      </div>
      <BottomTabBar />
    </>
  );
}
