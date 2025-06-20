import Image from 'next/image';

export default function HanaMonWithCard() {
  return (
    <>
      <div className='mt-5'>
        <Image
          src={'/HanaMonWithRedCard.svg'}
          alt='hanaMonWithCard'
          width={168}
          height={205}
        />
      </div>
    </>
  );
}
