const MAX_AMOUNT = 10_000_000;
const GRAPH_HEIGHT_PX = 200;
const MIN_BAR_HEIGHT_PX = 10;

type Props = {
  label: string;
  amount: number;
  color?: string;
  textColor?: string;
};

export default function Bar({
  label,
  amount,
  color = '#CCCCCC',
  textColor = '#212121',
}: Props) {
  const proportionalHeight = Math.max(
    (amount / MAX_AMOUNT) * GRAPH_HEIGHT_PX,
    MIN_BAR_HEIGHT_PX
  );
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  const displayAmount = Math.floor(safeAmount / 10_000).toLocaleString();

  return (
    <div className='flex flex-col items-center justify-end w-18'>
      <span
        className={`text-base font-[500] mb-2`}
        style={{ color: textColor }}
      >
        {displayAmount}만원
      </span>

      <div
        className='w-14 rounded-2xl'
        style={{ height: proportionalHeight, backgroundColor: color }}
      />
      <span className='text-sm mt-2 text-center whitespace-pre-line text-black-font'>
        {label}
      </span>
    </div>
  );
}
