import {
  getIncomeSumByPeriod,
  getLastYearNextMonthIncomeSum,
} from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import { getLastYearSamePeriodIncomeSum } from '@/lib/income';

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { item, price } = await req.json();
  const userId = Number(session.user?.id);

  const now = new Date();
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const threeMonthAgoStart = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const sixMonthAgoStart = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const [lastMonthSum, lastYearMonthSum, recent3MonthsSum, lastYear3MonthsSum] =
    await Promise.all([
      getIncomeSumByPeriod(userId, lastMonthStart, end),
      getLastYearNextMonthIncomeSum(userId),
      getIncomeSumByPeriod(userId, threeMonthAgoStart, end),
      getLastYearSamePeriodIncomeSum(userId),
      getIncomeSumByPeriod(userId, sixMonthAgoStart, end),
    ]);

  const growthRate = recent3MonthsSum / lastYear3MonthsSum;
  const nextmonthpay = lastYearMonthSum * growthRate;

  const prompt = `다음 정보를 기반으로, 해당 물건을 언제 구매하는 것이 좋을지 조언해줘.

- 이번 달 수입: ${lastMonthSum.toFixed(1)}원
- 다음 달 예상 수입: ${nextmonthpay.toFixed(1)}원
- 사고 싶은 물건: "${item}"
- 물건 가격: "${price}"

아래와 같은 형식으로 판단 근거와 함께 설명해줘:

나는 평소 수입의 20% 정도를 내가 사고싶은 물건에 사용하는 소비습관을 가지고 부족하다면 이번 달엔 아끼고 다음달에 보태서 사는편이야.
내가 사려는 물건이 수입의 몇 퍼센트 인지 말해주고 너무 과하다면 저축했다가 다음달 소득의 20%도 고려하여 살지말지 대답해줘 
친근한 말투로 300자 정도로 요약해서 말해줘`;

  return Response.json({ prompt });
}
