import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import MainBar from './components/MainNav';
import SalaryBox from './components/SalaryBox';
import SalaryCircle from './components/SalaryCircle';

export default function Home() {
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
