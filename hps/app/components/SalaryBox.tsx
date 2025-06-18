import Image from 'next/image';
import { getSalaryWithUserId } from '@/lib/actions/salary-actions';

function getNextPayday(date?: Date): Date {
  if (!date) return new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 2).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return new Date(`${year}-${month}-${day}`);
}

export default async function SalaryBox() {
  const lastSalary = await getSalaryWithUserId(2);
  const nextPayday = getNextPayday(lastSalary?.depositDate);
  const now = new Date();

  const diffInMs = nextPayday.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return (
    <>
      <div
        className='w-80 h-52 pt-8 bg-white rounded-3xl px-6 flex [box-shadow:var(--shadow-taxbox)]
      overflow-hidden'
      >
        <div className='flex flex-col w-40'>
          <div className='border border-hana-smallText rounded-md text-hana-smallText text-xs font-[500] leading-none py-1 px-2.5 text-center items-center'>
            다음 월급까지 D-{diffInDays}
          </div>
          <div className='flex justify-center mt-2'>
            <Image
              src={'/ic_pig.svg'}
              alt='pig'
              width={97}
              height={123}
              className='items-center'
            />
          </div>
        </div>
        <div className='flex flex-col  w-40 pl-6'>
          <div className='font-[500] h-6 text-center'>최근 나의 월급</div>
          <div className='mt-14 text-center text-xl font-[600] '>
            {lastSalary?.amount}원
          </div>
        </div>
      </div>
    </>
  );
}
