import { cardData } from '@/constants/cardData';

export function isGoodRate(): boolean {
  const creditAmt = cardData
    .filter((card) => card.card_type === '01' || card.card_type === '03')
    .reduce((sum, card) => sum + card.performance_amt, 0);

  const checkAmt = cardData
    .filter((card) => card.card_type === '02')
    .reduce((sum, card) => sum + card.performance_amt, 0);

  const isGoodRate: boolean = creditAmt < checkAmt;
  return isGoodRate;
}
