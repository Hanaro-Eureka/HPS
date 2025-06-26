'use client';

import Text from '@/components/atoms/Text';
import { X } from 'lucide-react';
import {
  calculateDiffRate,
  getIncomeColor,
  getNextMonthLabel,
} from '../utils/incomeGraph';
import Bar from './Bar';
import Modal from './Modal';

type Props = {
  averageAmount: number;
  predictedAmount: number;
  onClose: () => void;
};

export default function IncomePredictionModal({
  averageAmount,
  predictedAmount,
  onClose,
}: Props) {
  const nextMonthLabel = getNextMonthLabel();

  const diffRate = calculateDiffRate(averageAmount, predictedAmount);
  const { barColor, textColor } = getIncomeColor(diffRate);
  return (
    <Modal>
      <div className='relative h-full flex flex-col justify-between'>
        <button
          className='absolute -top-10 -right-10 text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='닫기'
        >
          <X size={24} />
        </button>

        <Text className='text-center text-base font-[500] text-black-font mt-2'>
          다음 달 수입은
          <br />
          아래처럼 예측됩니다.
        </Text>

        <div className='flex justify-between mb-4'>
          <Bar
            label={'평균\n수입'}
            amount={averageAmount}
            color='#E4E8EB'
            textColor='#909090'
          />
          <Bar
            label={`올해 ${nextMonthLabel}\n예측 수입`}
            amount={predictedAmount}
            color={barColor}
            textColor={textColor}
          />
        </div>
      </div>
    </Modal>
  );
}
