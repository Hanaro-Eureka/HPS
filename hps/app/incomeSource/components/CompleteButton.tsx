import Button from '@/components/atoms/Button';
import { saveIncomeSource } from '../utils/saveIncomeSource';

type Props = {
  selectedIds: (string | number)[];
};

export default function CompleteButton({ selectedIds }: Props) {
  const handleClick = async () => {
    await saveIncomeSource(selectedIds);
  };

  return (
    <Button
      bgColor='bg-button-lightgray'
      className='w-35 py-3 text-black-font rounded-3xl font-[500] text-base hover:bg-button-gray'
      onClick={handleClick}
    >
      완료
    </Button>
  );
}
