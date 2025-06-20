import { use } from 'react';
import { getSumOfThisMonthSalaries } from '../utils/salary';
// import HanaMonWithCard from './HanaMonWithCard';
import SalarySpendButton from './SalarySpendButton';

export default function SalaryBox() {
  const sumOfSalaries = use(getSumOfThisMonthSalaries(1));

  // TODO : 저번달 소득과 이번달 소비 총합 비교해서 하나몬스터 카드 색을 HanaMonWithCard의 Props로 넘겨주세요.
  return (
    <>
      <div className='flex ml-10'>
        <SalarySpendButton lastSalary={sumOfSalaries} />
        {/* <HanaMonWithCard hanaMonColor={color}/> */}
      </div>
    </>
  );
}
