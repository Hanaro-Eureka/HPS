import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import HeaderLayout from '@/components/templates/HeaderLayout';
import { redirect } from 'next/navigation';
import { getIncomeByUserId } from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import IncomeSelectorSection from './components/IncomeSelectorSection';

export default async function IncomeSource() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const userId = Number(session?.user?.id);
  const rawIncome = await getIncomeByUserId(userId);

  const existingIncome = rawIncome
    .filter((s) => s.depositorName !== null)
    .map((s) => ({
      depositorName: s.depositorName as string,
      incomeSource: s.incomeSource ?? (s.depositorName as string),
      amount: s.amount,
      depositDate: s.depositDate,
    }));

  return (
    <HeaderLayout path='/' isIncome={true}>
      <Title tag='h1' className='text-2xl font-[600] text-black-font mt-8 ml-6'>
        주요 수입원을 선택하세요.
      </Title>
      <Text className='ml-6 mt-2 text-base font-[400] text-black-font'>
        내 통장 입금 내역
      </Text>

      <IncomeSelectorSection existingIncome={existingIncome} />
    </HeaderLayout>
  );
}
