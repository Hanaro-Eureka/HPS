'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const { messages, append, isLoading } = useChat({
    sendExtraMessageFields: true,
    initialMessages: [
      {
        id: 'first message',
        role: 'assistant',
        content: '별비서가 언제살지 알려줄게요!',
      },
    ],
  });

  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const content = `구매할 물건은 ${item}이고 가격은 ${price}원 이야`; //여기 구매할 물건은 item, 가격은 price 이야~ 라고 말하고 route.ts 에서 고정비, 다음달 월급 계산
    const content =
      '내가 이번달 소득은 300만원이고 다음달엔 500만원이야 80만원짜리 신발을 사야하는데 언제사는게 좋을지 알려줘. "이번 달에 옷을 사면 소득 대비 부담이 커서 생활비, 저축 여유가 줄어요. 다음 달에 사면 부담이 훨씬 적고 420 만 원이 남아 여유 있게 관리 가능합니다." 이런 형식으로 답변해';
    await append({ role: 'user', content });
    setItem('');
    setPrice('');
  };

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto'>
      <div className='flex flex-col gap-2 mb-4'>
        {messages
          .filter((message) => message.role !== 'user')
          .map((message) => (
            <div key={message.id} className='whitespace-pre-wrap'>
              {'문교수'}
              {message.parts.map((part, i) => (
                <div key={`${message.id}-${i}`}>
                  {part.type === 'text' ? part.text.replaceAll('*', '') : null}
                </div>
              ))}
            </div>
          ))}
      </div>

      <form onSubmit={handleCustomSubmit} className='flex flex-col gap-3'>
        <input
          className='rounded-lg px-4 py-2 border text-black'
          placeholder='구매할 물건'
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          className='rounded-lg px-4 py-2 border text-black'
          placeholder='가격'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          type='submit'
          className='mt-2 py-2 px-4 rounded bg-black text-white disabled:opacity-50'
          disabled={isLoading}
        >
          전송
        </button>
      </form>
    </div>
  );
}
