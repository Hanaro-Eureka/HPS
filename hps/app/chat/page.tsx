'use client';

import StarChat from '@/app/chat/componets/StarChat';
import UserChat from '@/app/chat/componets/UserChat';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { messages, append } = useChat({
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
    setIsSubmitted(true);

    const content =
      '내가 이번달 소득은 300만원이고 다음달엔 500만원이야 80만원짜리 신발을 사야하는데 언제사는게 좋을지 알려줘. "이번 달에 옷을 사면 소득 대비 부담이 커서 생활비, 저축 여유가 줄어요. 다음 달에 사면 부담이 훨씬 적고 420 만 원이 남아 여유 있게 관리 가능합니다." 이런 형식으로 답변해';
    await append({ role: 'user', content });

    setItem('');
    setPrice('');
    setIsSubmitted(false);
  };

  return (
    <div className='flex flex-col w-full max-w-md py-30 mx-auto gap-6'>
      <div>{/* <Text className='text-2xl font-[600]'>didi</Text> */}</div>
      <div className='flex flex-col gap-6 mb-4 pl-4'>
        {messages
          .filter((message) => message.role !== 'user')
          .map((message) => (
            <div key={`${message.id}`} className='flex flex-col gap-6'>
              <StarChat text={message.content.replaceAll('*', '')} />
              <div className='flex items-end justify-end pr-4'>
                <UserChat
                  item={item}
                  price={price}
                  isSubmitted={isSubmitted}
                  onSubmit={handleCustomSubmit}
                  onChangeItem={(value) => setItem(value)}
                  onChangePrice={(value) => setPrice(value)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
