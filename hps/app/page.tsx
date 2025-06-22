import MainBar from './components/MainNav';
import SalaryBox from './components/SalaryBox';
import SalaryCircle from './components/SalaryCircle';

export default function Home() {
  return (
    <>
      {/* <div className='min-h-screen overflow-hidden pt-12 px-6 bg-gradient-salary'> */}
      <div className='min-h-screen overflow-hidden bg-gradient-salary '>
        <MainBar />
        <div className='flex items-center justify-center'>
          <SalaryBox />
        </div>
        <div className='flex items-center mt-10 bottom-0'>
          <SalaryCircle />
        </div>
      </div>
    </>
  );
}
