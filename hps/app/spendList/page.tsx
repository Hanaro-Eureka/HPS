import Title from '@/components/atoms/Title';
import HeaderLayout from '@/components/templates/HeaderLayout';
import SpendList from './components/SpendList';

export default function SpendListPage() {
  return (
    <HeaderLayout>
      <Title tag='h1' className='text-2xl font-[600] text-black-font mt-8 ml-6'>
        이번달 소비 내역
      </Title>

      <SpendList />
    </HeaderLayout>
  );
}
