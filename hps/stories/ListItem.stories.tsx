import ListItem from '@/components/molcules/ListItem';
import icons from '@/constants/categoryIcons';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Cafe: Story = {
  args: {
    icon: <Image src={icons.cafe} alt='카페' className='w-9 h-9' />,
    label: '카페',
    time: '14:21',
    amount: -18000,
  },
};

export const Pub: Story = {
  args: {
    icon: <Image src={icons.pub} alt='술집' className='w-9 h-9' />,
    label: '술집',
    time: '18:30',
    amount: -32000,
  },
};

export const HairSalon: Story = {
  args: {
    icon: <Image src={icons.hair} alt='미용실' className='w-9 h-9' />,
    label: '미용실',
    time: '11:00',
    amount: -25000,
  },
};
