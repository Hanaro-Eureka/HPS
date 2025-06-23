import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import {
  getLastMonthSalarySum,
  getLastYearNextMonthSalarySum,
  getLastYearSamePeriodSalarySum,
  getRecent3MonthsSalarySum,
  getRecent6MonthsSalarySum,
} from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
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
  const body = await req.json();
  const messages = body.messages;

  if (!messages || !Array.isArray(messages)) {
    return new Response('Invalid messages', { status: 400 });
  }

  // 마지막 user 메시지 찾기
  const lastIndex = messages.findLastIndex((m) => m.role === 'user');
  if (lastIndex === -1) {
    return new Response('No user message found', { status: 400 });
  }

  const lastUserMessage = messages[lastIndex];
  // 메시지 배열 복사 후 마지막 user 메시지를 수정
  //다음달 예상 소득 구하기 + 이번달 소득 구하기 + 고정비 계산하기 -> 물건이랑 가격 보내고 응답받기
  const updatedMessages = [
    ...messages.slice(0, lastIndex),
    {
      ...lastUserMessage,
      // content: `${lastUserMessage.content}.`,
      content: `내 이번달 소득은 ${lastMonthSum.toFixed(1)}원 이고 다음달엔 ${nextmonthpay.toFixed(1)}원 이야 ${lastUserMessage.content} 을 사고싶은데 언제사는게 좋을지 알려줘. "이번 달에 옷을 사면 소득 대비 부담이 커서 생활비, 저축 여유가 줄어요. 다음 달에 사면 부담이 훨씬 적고 420 만 원이 남아 여유 있게 관리 가능합니다." 이런 형식으로 답변해`, // 프롬프트 수정
    },
  ];
  console.log('Updated messages:', updatedMessages);
  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: updatedMessages,
    // maxTokens: 100,
  });
  return result.toDataStreamResponse();
}
