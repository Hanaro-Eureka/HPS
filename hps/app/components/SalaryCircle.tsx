import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';
import { cn } from '@/lib/utils';

export default async function SalaryCircle() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const data = await getIncomeSourcesByUserId(1, start);
  const maxAmount = Math.max(...data.map((item) => item.amount));
  const delays = [
    'delay-[0ms]',
    'delay-[200ms]',
    'delay-[400ms]',
    'delay-[600ms]',
    'delay-[800ms]',
    'delay-[1000ms]',
    'delay-[1200ms]',
  ];

  const durations = [
    'duration-[3s]',
    'duration-[3.5s]',
    'duration-[4s]',
    'duration-[4.5s]',
    'duration-[5s]',
  ];
  const colors = [
    'bg-pink-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',
    'bg-red-200',
    'bg-orange-200',
  ];

  const sizedData = data.map((item) => {
    const ratio = item.amount / maxAmount;
    const size = 80 + ratio * 100;

    const tailwindSize =
      size >= 180
        ? 'w-44 h-44'
        : size >= 160
          ? 'w-40 h-40'
          : size >= 140
            ? 'w-36 h-36'
            : size >= 120
              ? 'w-32 h-32'
              : size >= 100
                ? 'w-28 h-28'
                : 'w-24 h-24';

    return {
      ...item,
      tailwindSize,
    };
  });

  return (
    <div className='flex flex-wrap gap-4 mt-6'>
      {sizedData.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            item.tailwindSize,
            colors[idx % colors.length],
            'rounded-full flex items-center justify-center flex-col text-center text-sm font-semibold shadow',
            'animate-float',
            delays[idx % delays.length],
            durations[idx % durations.length]
          )}
        >
          <span>{item.category}</span>
          <span className='text-xs'>{item.amount.toLocaleString()}원</span>
        </div>
      ))}
    </div>
  );
}
