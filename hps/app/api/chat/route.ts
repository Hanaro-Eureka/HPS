import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  // const session = await auth();
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
      content: `${lastUserMessage.content}.`,
      // content: `${lastUserMessage.content}. 이번달 소득은 300만원 이고 그중 고정비는 100만원 썼어. 다음달 예상소득은 200만원이고 고정비는 100만원 나갈 예정이야. 이번달에 살까 다음달에 살까 정해줘.`, // 프롬프트 수정
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
