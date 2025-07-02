import Image from 'next/image';

export default function CounselorPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image
        src='/svgs/expertchat.svg'
        alt='전문가상담'
        width={390}
        height={844}
      />
    </div>
  );
}
