import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import { cardData } from '@/constants/cardData';
import { getTaxInputs } from '@/lib/actions/getTaxInputs';
import Card from './components/Card';
import CheckList from './components/CheckList';
import ResultCardGroup from './components/ResultCardGroup';
import { calculateRefund } from './utils/calculateRefund';

export default async function YearEndTaxPage() {
  const { salary, spending } = await getTaxInputs(1);

  if (salary === null || spending === null) {
    return <p className='text-center mt-10 text-black-font'>로딩 중...</p>;
  }
  const creditAmt = cardData
    .filter((card) => card.card_type === '01' || card.card_type === '03')
    .reduce((sum, card) => sum + card.performance_amt, 0);

  const checkAmt = cardData
    .filter((card) => card.card_type === '02')
    .reduce((sum, card) => sum + card.performance_amt, 0);

  const totalAmt = creditAmt + checkAmt;
  const creditRate = totalAmt ? Math.round((creditAmt / totalAmt) * 100) : 0;
  const checkRate = totalAmt ? Math.round((checkAmt / totalAmt) * 100) : 0;
  // const isGoodRate: boolean = creditAmt > checkAmt;

  const result = calculateRefund({
    salary,
    spending,
    creditRate,
    checkRate,
    irpAmount: 5000000, // IRP+연금저축 납입액은 일단 고정
  });

  return (
    <main className='max-w-md mx-auto p-6 space-y-6  bg-white'>
      <Title tag='h1' className='text-2xl font-[600] text-black-font mt-4'>
        연말 정산
      </Title>
      <Text className='text-xs font-[400] text-black-font mt-2'>
        이번달 당신이 놓치고 있는 절세 혜택을 알려드릴게요
      </Text>

      <Card />
      <CheckList />

      <ResultCardGroup
        deduction={result.totalCardDeduction}
        refund={result.refund}
      />
      <Text className='text-sm font-[500] text-black-modal text-center'>
        추가 혜택 받는 방법 알아보기
      </Text>

      <Text className='text-xs font-[400] text-gray-login mt-10'>
        ※ 현재까지의 소비 내역과 누적 소득을 기준으로 계산한 <br />
        &nbsp;&nbsp;&nbsp; 연말정산 시뮬레이션 결과입니다.
      </Text>
      <Text className='text-xs font-[400] text-gray-login mt-2'>
        ※ 이 계산은 신용/체크카드 소비와 IRP 기준으로 단순화된 결과이며, <br />
        &nbsp;&nbsp;&nbsp; 실제 연말정산 결과와 차이가 날 수 있습니다.
      </Text>
    </main>
  );
}
