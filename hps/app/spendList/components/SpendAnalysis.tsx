import Title from '@/components/atoms/Title';
import SalaryBarGraph from '@/components/molcules/SalaryBarGraph';
import { consumptionData } from '@/constants/consumptionData';
import {
  calculateSpendingStatus,
  filterThisMonthData,
  getCurrentMonth,
} from '../utils/spending';

export default function SpendAnalysis() {
  const currentMonth = getCurrentMonth();
  const thisMonthData = filterThisMonthData(consumptionData, currentMonth);
  const salary = 2800000;
  const totalSpending = 2792000;
  // const totalSpending = thisMonthData.reduce(
  //   (sum, item) => sum + item.trans_amt,
  //   0
  // );
  const { isOverSpent, used, remain } = calculateSpendingStatus(
    salary,
    totalSpending
  );
  return (
    <div className='w-full mt-8 mb-24'>
      <Title tag='h2' className='text-xl font-[500] ml-1.5 pb-10'>
        내 월급 얼마나 썼을까?
      </Title>

      <div className='relative w-full mt-5'>
        <SalaryBarGraph
          data={[
            {
              name: '소비 내역',
              used,
              remain,
            },
          ]}
          height={60}
          colors={{
            used: '#56b8ab',
            remain: isOverSpent ? '#e97272' : '#E4F4F1',
          }}
        />

        <div
          className={`absolute top-full mt-1.5 text-sm text-center text-[500] ${
            (Math.min(totalSpending, salary) /
              Math.max(totalSpending, salary)) *
              100 >
            90
              ? 'translate-x-[-100%] text-right'
              : '-translate-x-1/2'
          }`}
          style={{
            left: `${
              (Math.min(totalSpending, salary) /
                Math.max(totalSpending, salary)) *
              100
            }%`,
          }}
        >
          <span className='text-gray-time font-[500]'>
            {isOverSpent ? '내 월급' : '내 소비'}
          </span>
          <br />
          <span className='whitespace-nowrap text-gray-time font-[500]'>
            {(isOverSpent ? salary : totalSpending).toLocaleString()}원
          </span>
        </div>

        <div className='absolute -top-12 right-0 text-sm text-right font-[500]'>
          <span className={isOverSpent ? 'text-spend-alert' : 'text-gray-time'}>
            {isOverSpent ? '내 소비' : '내 월급'}
          </span>
          <br />
          <span className={isOverSpent ? 'text-spend-alert' : 'text-gray-time'}>
            {(isOverSpent ? totalSpending : salary).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
