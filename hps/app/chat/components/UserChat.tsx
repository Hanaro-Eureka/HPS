import Image from 'next/image';

type Props = {
  item: string;
  price: string;
  isSubmitted?: boolean;
  onChangeItem?: (value: string) => void;
  onChangePrice?: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
};

export default function UserChat({
  item,
  price,
  isSubmitted,
  disabled = false,
  onChangeItem,
  onChangePrice,
  onSubmit,
}: Props) {
  return (
    <div className='bg-hana-chartchat p-4 rounded-tl-3xl rounded-b-3xl w-48'>
      <p className='text-sm font-[500] text-white pb-2.5'>언제 살까?</p>
      <form onSubmit={onSubmit} className='flex flex-col gap-2.5'>
        <input
          placeholder='구매할 물건'
          className='w-full rounded-lg px-1.5 py-1.5 border border-input-border bg-white text-xs font-[400]'
          value={item}
          disabled={disabled}
          onChange={(e) => onChangeItem && onChangeItem(e.target.value)}
        />
        <input
          placeholder='가격'
          disabled={disabled}
          className='w-full rounded-lg px-1.5 py-1.5 border border-input-border bg-white text-xs font-[400]'
          value={price}
          onChange={(e) => onChangePrice && onChangePrice(e.target.value)}
        />
        {!isSubmitted && ( // 전송 중이면 버튼 숨김
          <div className='flex justify-end'>
            <button type='submit'>
              <Image
                src='/svgs/ic_sending.svg'
                alt='전송'
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
