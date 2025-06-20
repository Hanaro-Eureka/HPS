import {
  domesticTransactions,
  foreignTransactions,
} from '@/constants/cardAprroval';
import { cardData } from '@/constants/cardData';

type Props = {
  idx: number;
};

export function getTotalSpent({ idx }: Props) {
  let domesticTotal = 0;
  for (const domestic of domesticTransactions[idx]) {
    if (domestic.status === '01' && domestic.approved_amt > 0) {
      domesticTotal += domestic.approved_amt;
    }
  }

  let foreignTotal = 0;
  for (const foreign of foreignTransactions[idx]) {
    if (foreign.status === '01' && foreign.approved_amt > 0) {
      foreignTotal += foreign.approved_amt;
    }
  }

  return domesticTotal + foreignTotal;
}
