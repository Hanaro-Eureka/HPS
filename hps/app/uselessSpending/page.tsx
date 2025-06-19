import Title from '@/components/atoms/Title';
import SpendSelectorSection from './components/SpendSelectorSection';

export default function UselessSpending() {
  return (
    <>
      <Title tag='h1' className='text-2xl font-[600] m-4'>
        의미없는 소비 고르기
      </Title>

      <SpendSelectorSection />
    </>
  );
}
