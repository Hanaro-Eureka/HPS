import Title from '@/components/atoms/Title';
import { cardData } from '@/constants/cardData';
import CardItem from './components/CardItem';

export default function CardPage() {
  return (
    <main className='items-center justify-start max-w-md mx-auto p-6 space-y-6'>
      <Title
        tag='h1'
        className='text-2xl text-black-font font-[600] text-center pb-14'
      >
        나의 카드 실적 현황
      </Title>
      {cardData.map((card, idx) => (
        <CardItem
          key={card.card_id}
          idx={idx}
          cardName={card.card_name}
          cardAmount={card.performance_amt}
        />
      ))}
    </main>
  );
}
