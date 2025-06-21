'use client';

import CheckBoxText from '@/components/molcules/CheckBoxText';
import { useEffect, useState } from 'react';
import {
  getCheckBoxByUserId,
  updateCheckBoxField,
} from '@/lib/actions/checkbox-action';
import { isGoodRate } from '../utils/calculateRate';

const fieldMap = {
  betterCheckCard: 'upCheckRatilo',
  cashReceipt: 'cashRcpIssue',
  cultureLife: 'upCultureSpend',
  marketGift: 'voucherUsed',
} as const;

type LocalCheckState = Record<keyof typeof fieldMap, boolean>;

export default function CheckList() {
  const [checkedItems, setCheckedItems] = useState<LocalCheckState | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const data = await getCheckBoxByUserId(1); // userId 고정
      setCheckedItems({
        betterCheckCard: !!data?.upCheckRatilo,
        cashReceipt: !!data?.cashRcpIssue,
        cultureLife: !!data?.upCultureSpend,
        marketGift: !!data?.voucherUsed,
      });
    })();
  }, []);

  const handleChange = async (key: keyof typeof fieldMap) => {
    await updateCheckBoxField(fieldMap[key]);
    setCheckedItems((prev) => (prev ? { ...prev, [key]: !prev[key] } : prev));
  };

  if (!checkedItems) {
    return (
      <div className='text-sm text-gray-500 text-center'>불러오는 중...</div>
    );
  }

  return (
    <div>
      {isGoodRate() ? (
        <div className='space-y-6 '>
          <CheckBoxText
            id='cashReceipt'
            checked={checkedItems.cashReceipt}
            bgColor='bg-hana-green'
            borderColor='border-hana-green'
            text='현금영수증 발급하기'
            description='현금영수증 발급시 30% 공제!'
            onChange={() => handleChange('cashReceipt')}
          />
          <CheckBoxText
            id='cultureLife'
            checked={checkedItems.cultureLife}
            bgColor='bg-hana-green'
            borderColor='border-hana-green'
            text='문화생활(도서, 영화, 공연) 즐기기'
            description='총 급여 7천만원 이하 근로자만 해당'
            onChange={() => handleChange('cultureLife')}
          />
          <CheckBoxText
            id='marketGift'
            checked={checkedItems.marketGift}
            bgColor='bg-hana-green'
            borderColor='border-hana-green'
            text='전통시장 | 온누리 상품권 이용'
            description='지역경제 살리며 공제율 최대로 받기!'
            onChange={() => handleChange('marketGift')}
          />
        </div>
      ) : (
        <div className='space-y-6'>
          <CheckBoxText
            id='betterCheckCard'
            checked={checkedItems.betterCheckCard}
            bgColor='bg-hana-green'
            borderColor='border-hana-green'
            text='체크카드 사용 비중 높이기'
            description='신용카드 대비 공제율이 2배!'
            onChange={() => handleChange('betterCheckCard')}
          />
          <CheckBoxText
            id='cashReceipt'
            checked={checkedItems.cashReceipt}
            bgColor='bg-hana-green'
            borderColor='border-hana-green'
            text='현금영수증 발급하기'
            description='현금영수증 발급시 30% 공제!'
            onChange={() => handleChange('cashReceipt')}
          />
          <CheckBoxText
            id='marketGift'
            checked={checkedItems.marketGift}
            bgColor='bg-hana-green'
            borderColor='border-hana-green'
            text='전통시장 | 온누리 상품권 이용'
            description='지역경제 살리며 공제율 최대로 받기!'
            onChange={() => handleChange('marketGift')}
          />
        </div>
      )}
    </div>
  );
}
