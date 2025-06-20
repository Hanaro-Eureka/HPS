'use client';

import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import { useEffect, useState } from 'react';
import { getTaxInputs } from '@/lib/actions/getTaxInputs';
import ResultCardGroup from './components/ResultCardGroup';
import { calculateRefund } from './utils/calculateRefund';

export default function YearEndTaxPage() {
  const [salary, setSalary] = useState<number | null>(null);
  const [spending, setSpending] = useState<number | null>(null);

  useEffect(() => {
    // userId는 임시로 1로 고정
    (async () => {
      const { salary, spending } = await getTaxInputs(1);
      setSalary(salary);
      setSpending(spending);
    })();
  }, []);

  if (salary === null || spending === null) {
    return <p className='text-center mt-10 text-black-font'>로딩 중...</p>;
  }

  const result = calculateRefund({
    salary,
    spending,
    creditRate: 60, // 임시 신용카드 사용 비율
    checkRate: 40, // 임시 체크카드 사용 비율
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

      {/* 여기에 카드 비교 UI와 체크리스트가 보여집니다. */}
      <section className='my-136' />

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
