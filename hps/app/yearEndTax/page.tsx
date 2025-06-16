'use client';

import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import ResultCardGroup from './components/ResultCardGroup';
import { calculateRefund } from './utils/calculateRefund';

export default function YearEndTaxPage() {
  const result = calculateRefund({
    salary: 60000000, // 월급 500 기준
    spending: 18000000,
    creditRate: 60,
    checkRate: 40,
    irpAmount: 5000000,
  });

  return (
    <main className='max-w-md mx-auto p-6 space-y-6 rounded-4xl'>
      <Title tag='h1' className='text-2xl font-bold mt-4'>
        연말 정산
      </Title>
      <Text className='text-sm text-gray-500 mt-2'>
        당신이 놓치고 있는 절세 혜택을 알려드릴게요
      </Text>

      <ResultCardGroup
        deduction={result.totalCardDeduction}
        refund={result.refund}
        comment='신용카드 사용 비율이 높아서, 절세효율이 낮아요!'
      />

      {/* 하단에 보여줄 내용 */}
      <Text className='text-xs text-gray-400'>
        ※ 이 계산은 신용/체크카드 소비와 IRP 기준으로 단순화된 결과이며, <br />
        실제 연말정산 결과와 차이가 날 수 있습니다.
      </Text>
    </main>
  );
}
