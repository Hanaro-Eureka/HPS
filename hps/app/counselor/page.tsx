import Title from '@/components/atoms/Title';
import HeaderLayout from '@/components/templates/HeaderLayout';

export default function CounselorPage() {
  return (
    <HeaderLayout>
      <div className='flex flex-col justify-center items-center mt-80'>
        <Title tag='h1' className='text-2xl text-center'>
          당신의 업종 전문가에게{' '}
        </Title>
        <Title tag='h1' className='text-2xl text-center'>
          연결됩니다.
        </Title>
        <Title tag='h1' className='text-2xl text-center'>
          ...
        </Title>
      </div>
    </HeaderLayout>
  );
}
