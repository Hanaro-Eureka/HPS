'use client';

import StarChat from '@/app/chat/componets/StarChat';
import UserChat from '@/app/chat/componets/UserChat';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
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

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, price }),
      });

      if (!res.ok) {
        console.error('❌ 프롬프트 생성 실패');
        setIsSubmitted(false);
        return;
      }

      const { prompt } = await res.json();
      await append({ role: 'user', content: prompt });

      setItem('');
      setPrice('');
    } catch (error) {
      console.error('🚨 에러 발생:', error);
    } finally {
      setIsSubmitted(false);
    }
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
