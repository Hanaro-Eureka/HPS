import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

export default function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) return null;

  const thisIncome = payload.find((p) => p.dataKey === 'thisIncome');
  const lastIncome = payload.find((p) => p.dataKey === 'lastIncome');

  return (
    <div className='bg-white borer p-3 border-1 border-solid'>
      <p className='text-base'>{label}</p>
      {thisIncome && (
        <p className='text-year-graph1'>
          올해 수입 : {Number(thisIncome.value).toLocaleString()}원
        </p>
      )}
      {lastIncome && (
        <p className='text-year-graph2'>
          작년 수입 : {Number(lastIncome.value).toLocaleString()}원
        </p>
      )}
    </div>
  );
}
