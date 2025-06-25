import Image from 'next/image';

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
    <div className='flex flex-col items-center w-18'>
      <span
        className={`text-base font-[500] mb-2 ${textColorClass}`}
        style={textColorStyle}
      >
        {Math.floor(amount / 10_000).toLocaleString()}만원
      </span>
      <div
        className='w-14 rounded-2xl'
        style={{
          height: proportionalHeight,
          backgroundColor: color,
          transition: 'height 0.3s ease',
        }}
      />
      <span className='text-sm mt-2 text-center whitespace-pre-line text-black-font'>
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
  if (diffRate > 0.05) {
    rightColor = '#2F9E8C'; // 수입 상승
  } else if (diffRate < -0.05) {
    rightColor = '#E97272'; // 수입 하락
  }

  return (
    <div className='flex justify-center gap-8 items-end w-full mt-10 mb-15'>
      <div className='flex justify-center'>
        <Bar
          label={'현재\n수입'}
          amount={currentAmount}
          color='#E4E8EB'
          textColor='text-gray-400'
        />
      </div>
      <div className='flex justify-center'>
        <Bar
          label={'이번 달\n예측 수입'}
          amount={predictedAmount}
          color={rightColor}
          textColor={rightColor}
        />
      </div>
      <div className='flex flex-col items-center justify-center w-18'>
        <Image
          src={'/svgs/ic_question.svg'}
          alt='다음 달 예측 수입 보기 버튼'
          width={30}
          height={50}
        />
        <span className='text-sm mt-2 text-center whitespace-pre-line text-black-font'>
          {'다음 달\n예측 수입'}
        </span>
      </div>
    </div>
  );
}
