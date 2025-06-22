import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';
import BubbleAnimation from './BubbleAnimation';

const floatSettings = [
  { x: 0, y: 10, duration: 5.2, delay: 0.3 },
  { x: 10, y: -6, duration: 4.8, delay: 0.5 },
  { x: -12, y: 4, duration: 5.6, delay: 0.2 },
  { x: 6, y: 10, duration: 5.1, delay: 0.6 },
  { x: -8, y: -8, duration: 5.4, delay: 0.1 },
  { x: 14, y: 2, duration: 5.9, delay: 0.4 },
  { x: -6, y: 6, duration: 5.0, delay: 0.25 },
];

export default async function SalaryCircle() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const data = await getIncomeSourcesByUserId(1, start);

  const colors = [
    'bg-pink-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',
    'bg-red-200',
    'bg-orange-200',
  ];

  const circleSize = [
    'w-28 h-28',
    'w-32 h-32',
    'w-36 h-36',
    'w-40 h-40',
    'w-44 h-44',
    'w-48 h-48',
    'w-52 h-52',
  ];

  const maxAmount = Math.max(...data.map((item) => item.amount));
  if (maxAmount === 0) return [];
  const sizedData = data.map((item) => {
    const ratio = item.amount / maxAmount;
    const index = Math.floor(ratio * (circleSize.length - 1));

    return {
      ...item,
      circleSize: circleSize[index],
    };
  });

  return (
    <div className='flex flex-wrap justify-center'>
      {sizedData.map((item, idx) => (
        <BubbleAnimation
          key={idx}
          category={item.category}
          color={colors[idx % colors.length]}
          size={item.circleSize}
          anim={floatSettings[idx % floatSettings.length]}
        />
      ))}
    </div>
  );
}
