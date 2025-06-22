import React from 'react';

type Props = {
  currentAmount: number;
  predictedAmount: number;
};

const MAX_AMOUNT = 10_000_000;
const GRAPH_HEIGHT_PX = 200;
const MIN_BAR_HEIGHT_PX = 10;

function Bar({
  label,
  amount,
  color = '#CCCCCC',
  textColor = 'text-black',
}: {
  label: string;
  amount: number;
  color?: string;
  textColor?: string;
}) {
  const proportionalHeight = Math.max(
    (amount / MAX_AMOUNT) * GRAPH_HEIGHT_PX,
    MIN_BAR_HEIGHT_PX
  );

  const textColorStyle = textColor.startsWith('#')
    ? { color: textColor }
    : undefined;
  const textColorClass = textColor.startsWith('#') ? '' : textColor;

  return (
    <div className='flex flex-col items-center'>
      <span className={`text-sm mb-2 ${textColorClass}`} style={textColorStyle}>
        {Math.floor(amount / 10_000).toLocaleString()}만원
      </span>
      <div
        className='w-12 rounded-2xl'
        style={{
          height: proportionalHeight,
          backgroundColor: color,
          transition: 'height 0.3s ease',
        }}
      />
      <span className='text-sm mt-2 text-center whitespace-pre-line'>
        {label}
      </span>
    </div>
  );
}

export default function ProportionalBarGraph({
  currentAmount,
  predictedAmount,
}: Props) {
  const diffRate =
    currentAmount > 0 ? (predictedAmount - currentAmount) / currentAmount : 0;

  let rightColor = '#FFDD3A';
  if (diffRate > 0.1) {
    rightColor = '#2F9E8C';
  } else if (diffRate < -0.1) {
    rightColor = '#E97272';
  }

  return (
    <div
      className='flex justify-center gap-8 items-end mt-10'
      style={{ height: GRAPH_HEIGHT_PX + 20 }}
    >
      <Bar
        label='이번 달 소득'
        amount={currentAmount}
        color='#E4E8EB'
        textColor='text-gray-500'
      />
      <Bar
        label='다음 달 예측 소득
'
        amount={predictedAmount}
        color={rightColor}
        textColor={rightColor}
      />
    </div>
  );
}
