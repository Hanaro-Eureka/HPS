import BubbleAnimation from './BubbleAnimation';

const floatSettings = [{ x: 1, y: 18, duration: 2.4, delay: 0.3 }];

export default async function IncomeCircle() {
  const colors = ['#B4D9F9'];

  const positions = [{ top: '30%', left: '70px' }];

  return (
    <div className='relative h-130'>
      <BubbleAnimation
        href={'/incomeSource'}
        category={'여기를 눌러 수입을 추가하세요!'}
        color={colors[0]}
        size={'w-50 h-50'}
        anim={floatSettings[0]}
        position={positions[0]}
      />
    </div>
  );
}
