import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

type Props = {
  label: string;
  icon: StaticImageData;
  active?: boolean;
  onClick: () => void;
};

export default function TabBarItem({
  label,
  icon,
  active = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className='flex flex-1 flex-col items-center justify-center py-4 gap-1'
    >
      <Image
        src={icon}
        alt={label}
        width={24}
        height={24}
        className={clsx('transition-all', active && 'scale-110')}
      />
      <span
        className={clsx(
          'text-xs transition-colors',
          active ? 'text-black font-medium' : 'text-gray-400'
        )}
      >
        {label}
      </span>
    </button>
  );
}
