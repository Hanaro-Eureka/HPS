import Image from 'next/image';

export default function StarChat({ text }: { text: string }) {
  return (
    <div className='flex gap-4 items-end'>
      <div className='flex items-center'>
        <Image
          src='/svgs/ic_secretary.svg'
          alt='별비서'
          width={33}
          height={33}
        />
      </div>
      <div className='bg-hana-ai p-4 rounded-t-3xl rounded-br-3xl w-58'>
        <p className='text-sm font-[500] text-black'>{text}</p>
      </div>
    </div>
  );
}
