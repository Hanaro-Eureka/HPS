import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';
import BubbleAnimation from './BubbleAnimation';

const floatSettings = [
  { x: 0, y: 20, duration: 2.0, delay: 0.1 },
  { x: 2, y: 24, duration: 2.3, delay: 0.2 },
  { x: -1, y: 20, duration: 2.1, delay: 0.05 },
  { x: 1, y: 18, duration: 2.4, delay: 0.3 },
  { x: 0, y: 10, duration: 2.2, delay: 0.15 },
  { x: -2, y: -20, duration: 2.5, delay: 0.25 },
  { x: 1, y: 18, duration: 2.1, delay: 0.05 },
];

export default async function CircleSalaryy() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const data = await getIncomeSourcesByUserId(1, start);

  // const colors = [
  //   '#F472B6', // pink-300
  //   '#FCD34D', // yellow-300
  //   '#86EFAC', // green-300
  //   '#93C5FD', // blue-300
  //   '#C4B5FD', // purple-300
  //   '#F87171', // red-300
  //   '#FDBA74', // orange-300
  // ];

  const colors = [
    '#FF7B72', // red-300
    '#FFD12D', // yellow-300
    '#2F9E8C', // green-300
    '#72C3F1', // blue-300
    '#C4B5FD', // purple-300
    '#F472B6', // pink-300
    '#FDBA74', // orange-300
  ];

  const circleSize = [
    'w-22 h-22',
    'w-28 h-28',
    'w-34 h-34',
    'w-40 h-40',
    'w-48 h-48',
    // 'w-50 h-50',
    // 'w-56 h-56',
  ];

  const positions = [
    { top: '5%', left: '200px' },
    { top: '25%', left: '40px' },
    { top: '22%', left: '155px' },
    { top: '43%', left: '10px' },
    { top: '45%', left: '150px' },
    { top: '65%', left: '50%' },
    { top: '75%', left: '20%' },
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
    <div className='relative w-full h-[600px]'>
      {sizedData.map((item, idx) => (
        <BubbleAnimation
          key={idx}
          category={item.category ?? ''}
          color={colors[idx % colors.length]}
          size={item.circleSize}
          anim={floatSettings[idx % floatSettings.length]}
          position={positions[idx % positions.length]}
        />
      ))}
    </div>
  );
}
