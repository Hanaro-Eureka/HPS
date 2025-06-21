import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import { getSalaryByUserId } from '@/lib/actions/salary-select-actions';
import IncomeSelectorSection from './components/IncomeSelectorSection';

export default async function IncomeSource() {
  const rawSalary = await getSalaryByUserId(1);

  const existingSalary = rawSalary
    .filter((s) => s.depositorName !== null)
    .map((s) => ({
      depositorName: s.depositorName as string,
      incomeSource: s.incomeSource ?? (s.depositorName as string),
      amount: s.amount,
      depositDate: s.depositDate,
    }));

  return (
    <>
      <Title tag='h1' className='text-2xl font-[600] text-black-font m-4'>
        주요 수입원을 선택하세요.
      </Title>
      <Text className='ml-4 mt-2 text-base font-[400] text-black-font'>
        내 통장 입금 내역
      </Text>

      <IncomeSelectorSection existingSalary={existingSalary} />
    </>
  );
}
