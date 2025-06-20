import Title from '@/components/atoms/Title';
import IncomeSelectorSection from './components/IncomeSelectorSection';

export default function IncomeSource() {
  return (
    <>
      <Title tag='h1' className='text-2xl font-[600] m-4'>
        주요 수입원을 선택하세요.
      </Title>

      <IncomeSelectorSection />
    </>
  );
}
