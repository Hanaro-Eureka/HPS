'use client';

import CheckBoxText from '@/components/molcules/CheckBoxText';
import { useState } from 'react';
import { isGoodRate } from '../utils/calculrateRate';

export default function CheckList() {
  const [checkedItems, setCheckedItems] = useState({
    betterCheckCard: true,
    cashReceipt: false,
    cultureLife: false,
    marketGift: false,
  });

  const handleChange = (key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {isGoodRate() ? (
        <div className='space-y-8'>
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
        <div className='space-y-8'>
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
      )}
    </>
  );
}
