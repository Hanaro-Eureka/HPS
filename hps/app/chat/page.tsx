'use client';

import StarChat from '@/app/chat/components/StarChat';
import UserChat from '@/app/chat/components/UserChat';
import HeaderLayout from '@/components/templates/HeaderLayout';
import { useChat } from '@ai-sdk/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner';

type InputRecord = {
  item: string;
  price: string;
};

export default function Chat() {
  const { data: session, status } = useSession();
  console.log('Session:', session, 'Status:', status);
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputs, setInputs] = useState<InputRecord[]>([
    { item: '', price: '' },
  ]);
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return null;
  }

  const assistantMessages = messages.filter((m) => m.role !== 'user');

  const handleCustomSubmit = async (
    e: React.FormEvent,
    idx: number
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitted(true);

    const { item, price } = inputs[idx];

    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, price }),
      });

      if (!res.ok) {
        console.error('프롬프트 생성 실패');
        setIsSubmitted(false);
        return;
      }

      const { prompt } = await res.json();
      await append({ role: 'user', content: prompt });

      setInputs((prev) => [...prev, { item: '', price: '' }]);
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleChange = (
    idx: number,
    field: 'item' | 'price',
    value: string
  ) => {
    setInputs((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  return (
    <HeaderLayout title='별비서'>
      <div className='flex flex-col w-full max-w-md py-5 mx-auto gap-6 first:border-t first:border-gray-300'>
        {isSubmitted && <Spinner />}

        <div className='flex flex-col gap-6 mb-4 pl-4'>
          {assistantMessages.map((message, idx) => {
            const isLast = idx === assistantMessages.length - 1;

            return (
              <div key={message.id} className='flex flex-col gap-6'>
                <StarChat text={message.content.replaceAll('*', '')} />

                <div className='flex items-end justify-end pr-4'>
                  <UserChat
                    item={inputs[idx]?.item || ''}
                    price={inputs[idx]?.price || ''}
                    isSubmitted={isLast ? isSubmitted : false}
                    onSubmit={
                      isLast ? (e) => handleCustomSubmit(e, idx) : undefined
                    }
                    onChangeItem={
                      isLast
                        ? (val) => handleChange(idx, 'item', val)
                        : undefined
                    }
                    onChangePrice={
                      isLast
                        ? (val) => handleChange(idx, 'price', val)
                        : undefined
                    }
                    disabled={!isLast}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HeaderLayout>
  );
}
