import SalaryBarGraph from '@/components/molcules/SalaryBarGraph';
import { consumptionData } from '@/constants/consumptionData';
import {
  calculateSpendingStatus,
  filterThisMonthData,
  getCurrentMonth,
} from '@/utils/spending';

type Props = {
  salary: number;
};

export default function ConsumptionGraph({ salary }: Props) {
  const currentMonth = getCurrentMonth();
  const thisMonthData = filterThisMonthData(
    consumptionData,
    currentMonth,
    'trans_date'
  );

  const totalSpending = thisMonthData.reduce(
    (sum, item) => sum + item.trans_amt,
    0
  );

  const { isOverSpent, used, remain } = calculateSpendingStatus(
    salary,
    totalSpending
  );

  const referencePercentage =
    (Math.min(totalSpending, salary) / Math.max(totalSpending, salary)) * 100;

  return (
    <div className='relative w-full px-12'>
      <SalaryBarGraph
        data={[
          {
            name: '소비 내역',
            used,
            remain,
          },
        ]}
        height={50}
        colors={{
          used: '#56b8ab',
          remain: isOverSpent ? '#e97272' : '#E4F4F1',
        }}
      />

      <div
        className={`absolute top-full text-sm text-center font-[400] ${
          referencePercentage > 90
            ? 'translate-x-[-100%] text-right'
            : '-translate-x-1/2'
        }`}
        style={{
          left: `${referencePercentage}%`,
        }}
      >
        <span className='text-black-font'>
          {isOverSpent ? '지난 달 수입' : '이번 달 소비'}
        </span>
        <br />
        <span className='whitespace-nowrap text-black-font'>
          {(isOverSpent ? salary : totalSpending).toLocaleString()}원
        </span>
      </div>

      <div className='absolute -top-10 right-10 text-sm text-right font-[400]'>
        <span className={isOverSpent ? 'text-spend-alert' : 'text-black-font'}>
          {isOverSpent ? '이번 달 소비' : '지난 달 수입'}
        </span>
        <br />
        <span className={isOverSpent ? 'text-spend-alert' : 'text-black-font'}>
          {(isOverSpent ? totalSpending : salary).toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
