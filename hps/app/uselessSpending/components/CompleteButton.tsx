import Button from '@/components/atoms/Button';
import { saveUselessSpending } from '../utils/saveUselessSpending';

type Props = {
  selectedIds: (string | number)[];
};

export default function CompleteButton({ selectedIds }: Props) {
  const handleClick = async () => {
    await saveUselessSpending(selectedIds);
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
