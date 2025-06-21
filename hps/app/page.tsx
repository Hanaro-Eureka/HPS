import MainBar from './components/MainNav';
import SalaryBox from './components/SalaryBox';

export default function Home() {
  return (
    <>
      <div className='min-h-screen overflow-hidden px-6 '>
        <MainBar />
        <div className='flex items-center justify-center'>
          <SalaryBox />
        </div>
      </div>
    </>
  );
}
