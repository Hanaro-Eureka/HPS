import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import { getFirstPensionDate, getLastSalary } from '@/lib/actions/salary';
import { getUserIsSalaryMan } from '@/lib/actions/users';
import SimulatorChartComponent from './components/SimulatorChartComponent';
import { calcPensionDate } from './utils/pensionCalc';

export default async function YearEndTaxPage() {
  const userId = 1;
  const isSalaryman = await getUserIsSalaryMan(userId);
  const lastSalary = await getLastSalary(userId);
  const lastPensionAmount = lastSalary * 0.045;

  console.log(`lastsalary: ${lastSalary}`);
  console.log(`lastPensionAmount: ${lastPensionAmount}`);
  // 직장인 여부에 따라 연금 금액 계산
  // 직장인은 마지막 월급의 4.5%, 자영업자는 9%로 계산
  const userPensionAmount = isSalaryman
    ? lastPensionAmount
    : lastPensionAmount * 2; //마지막 월급의 4.5% 직장인이 아니면 9%로 계산

  const firstPensionDateResult = await getFirstPensionDate(userId);
  const userPensiondate = firstPensionDateResult
    ? await calcPensionDate(firstPensionDateResult.depositDate)
    : 0;
  const userPensionPaid = 20; //가입기간 더미데이터
  const contents = [
    { title: '누적 납입액', value: `${userPensionAmount + 2730000}원` },
    { title: '최근 납입내역', value: `월 ${userPensionAmount}원` },
    {
      title: '가입 기간',
      value: `총 ${userPensionPaid + userPensiondate}개월`,
    },
  ];

  return (
    <div className='flex flex-col w-full items-center justify-start gap-8 px-3.5 py-12'>
      <div className='flex flex-col w-full justify-center gap-1 px-2.5'>
        <Title tag='h1' className='text-2xl font-semibold mt-4'>
          국민 연금
        </Title>
        <Text className='text-sm font-medium text-black mt-2'>
          당신의 노후, 국민연금으로 얼마나 준비됐을까요?
        </Text>
      </div>

      <div className='flex flex-row w-full items-center justify-start gap-2.5'>
        {contents.map((item, index) => (
          <section
            key={index}
            className='bg-white rounded-3xl shadow-[0_0_4px_rgba(0,0,0,0.15)] flex-1'
          >
            <Text className='text-xs font-medium text-black px-4 py-5 text-center'>
              {item.title}
              <br />
              {item.value}
            </Text>
          </section>
        ))}
      </div>
      <SimulatorChartComponent />
    </div>
  );
}
