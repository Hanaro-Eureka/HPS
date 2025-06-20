import Image from 'next/image';

type Props = {
  hanaMonColor: string;
};
export default function HanaMonWithCard({ hanaMonColor }: Props) {
  return (
    <>
      <div className='mt-5'>
        <Image
          src={`/HanaMonWith${hanaMonColor}Card.svg`}
          alt='hanaMonWithCard'
          width={168}
          height={205}
        />
      </div>
    </>
  );
}
