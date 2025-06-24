// app/api/prompt/route.ts
import {
  getLastMonthSalarySum,
  getLastYearNextMonthSalarySum,
  getLastYearSamePeriodSalarySum,
  getRecent3MonthsSalarySum,
  getRecent6MonthsSalarySum,
} from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { item, price } = await req.json();
  const userId = Number(session.user?.id);

  const [lastMonthSum, lastYearMonthSum, recent3MonthsSum, lastYear3MonthsSum] =
    await Promise.all([
      getLastMonthSalarySum(userId),
      getLastYearNextMonthSalarySum(userId),
      getRecent3MonthsSalarySum(userId),
      getLastYearSamePeriodSalarySum(userId),
      getRecent6MonthsSalarySum(userId),
    ]);

  const growthRate = recent3MonthsSum / lastYear3MonthsSum;
  const nextmonthpay = lastYearMonthSum * growthRate + 2000000;

  const prompt = `다음 정보를 기반으로, 해당 물건을 언제 구매하는 것이 좋을지 조언해줘.

- 이번 달 소득: ${lastMonthSum.toFixed(1)}원
- 다음 달 예상 소득: ${nextmonthpay.toFixed(1)}원
- 사고 싶은 물건: "${item}"
- 물건 가격: "${price}"

아래와 같은 형식으로 판단 근거와 함께 설명해줘:

"이번 달에 사면 소득 대비 부담이 커서 생활비나 저축 여유가 줄어들어요.
다음 달에 사면 훨씬 여유롭게 관리할 수 있어요."

답변은 위와 비슷한 문장 구조와 말투로 부탁해.
반드시 이 형식을 지켜줘.`;

  return Response.json({ prompt });
}
