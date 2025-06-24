import BottomTabBar from '@/components/organisms/BottomTab/BottomTabBar';
import MainBar from '../components/MainNav';
import SalaryBox from '../components/SalaryBox';
import CircleSalaryy from './components/circleSalary';

export default function Home() {
  return (
    <>
      <div className='h-screen p-7 flex flex-col'>
        <MainBar />
        <div className='flex items-center justify-center'>
          <SalaryBox />
        </div>
        <div className='flex pt-3 pb-24'>
          <div className='flex h-[calc(100vh-400px)]'>
            <CircleSalaryy />
          </div>
        </div>
      </div>
      <BottomTabBar />
    </>
  );
}
