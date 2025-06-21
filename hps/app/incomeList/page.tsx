import LineGraph from '@/app/incomeList/components/LineGraph';
import Image from 'next/image';
import { getSixMonthIncome } from './utils/salary';

export default async function incomePage() {
  const sixMonthIncomes = await getSixMonthIncome(1);
  console.log(sixMonthIncomes);
  return (
    <>
      <div className='mt-8'>
        <div className='flex'>
          <div className='w-24 h-8'></div>
          <div className='flex items-center justify-center'>
            <span className='mr-2 text-2xl font-[600]'>수입 내역</span>
            <Image
              src='/svgs/ic_cogWheel.svg'
              alt='주요 수입원 선택 페이지로 이동'
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className='border p-1 rounded-3xl [box-shadow:var(--shadow-taxbox)] mt-10'>
          <LineGraph
            data={sixMonthIncomes}
            xDataKey='month'
            width={343}
            height={223}
            lineColors={{
              thisIncome: '#7E9CF4',
              lastIncome: '#CBD5E0',
            }}
          />
        </div>
      </div>
    </>
  );
}
