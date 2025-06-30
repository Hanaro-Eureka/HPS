'use client';

type RateResult = {
  rate: number | null;
  colorClass: string;
  imagePath: string | null;
  textMess: string | null;
};

export function getConsumptionRateText(
  predictedSalary: number, // 다음 달 예측 수입
  spendingList: { trans_date: string; trans_amt: number }[]
): RateResult {
  const now = new Date();

  // 이번 달 소비
  const thisMonth = now.getMonth() + 1;
  const thisMonthSpending = spendingList
    .filter((item) => +item.trans_date.slice(4, 6) === thisMonth)
    .reduce((sum, item) => sum + item.trans_amt, 0);

  if (!predictedSalary || predictedSalary === 0) {
    return {
      rate: null,
      colorClass: 'text-gray-time',
      imagePath: null,
      textMess: null,
    };
  }

  const consumptionRate = Math.round(
    (thisMonthSpending / predictedSalary) * 100
  );

  let colorClass = '';
  let imagePath = '';
  let textMess = '';

  if (consumptionRate > 60) {
    colorClass = 'text-consumption-red';
    imagePath = '/images/img_hanaMonWithRedCard.svg';
    textMess = `이번 달 소비가 다음 달\n 예측 수입 대비 ${consumptionRate}% 입니다.\n 지금부터 초절약 모드 ON!`;
  } else if (consumptionRate >= 30) {
    colorClass = 'text-consumption-yellow';
    imagePath = '/images/img_hanaMonWithYellowCard.svg';
    textMess = `이번 달 소비가 다음 달\n 예측 수입 대비 ${consumptionRate}% 입니다.\n 다음 달을 위해\n 소비를 줄여보세요!`;
  } else {
    colorClass = 'text-consumption-green';
    imagePath = '/images/img_hanaMonWithGreenCard.svg';
    textMess = `이번 달 소비가 다음 달\n 예측 수입 대비 ${consumptionRate}% 입니다.\n 현명한 소비를 하고 계시네요!`;
  }

  return {
    rate: consumptionRate,
    colorClass,
    imagePath,
    textMess,
  };
}
