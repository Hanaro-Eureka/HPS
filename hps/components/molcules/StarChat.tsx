import Image from 'next/image';

export default function StarChat() {
  return (
    // <div className='flex flex-col gap-4 items-start'>
    //   <div className='flex items-start gap-2'>
    //     <Image
    //       src='/svgs/ic_secretary.svg'
    //       alt='별비서'
    //       width={33}
    //       height={33}
    //     />
    //     <div className='bg-hana-chartchatstar px-4 py-2 rounded-t-3xl rounded-br-3xl text-black-modal text-sm font-[500]'>
    //       Hello, I’m SLML 입니다.
    //     </div>
    //   </div>
    // </div>
    <div className='flex'>
      <Image src='/svgs/ic_secretary.svg' alt='별비서' width={33} height={33} />
      <div className='bg-hana-ai p-4 rounded-t-3xl rounded-br-3xl w-48'>
        <h3 className='text-sm font-[500] text-black'>
          Hello,i’m SLML 입니다.
        </h3>
      </div>
    </div>
  );
}
