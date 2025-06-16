import List from '@/components/molcules/List';
import icons from '@/constants/categoryIcons';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

const meta: Meta<typeof List> = {
  title: 'Molecules/List',
  component: List,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    date: '6월 5일',
    data: [
      {
        id: 1,
        icon: <Image src={icons.cafe} alt='카페' className='w-9 h-9' />,
        label: '카페',
        time: '14:21',
        amount: -18000,
      },
      {
        id: 2,
        icon: <Image src={icons.pub} alt='술집' className='w-9 h-9' />,
        label: '술집',
        time: '18:30',
        amount: -32000,
      },
    ],
  },
};
