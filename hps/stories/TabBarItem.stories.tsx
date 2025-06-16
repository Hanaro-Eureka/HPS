import TabBarItem from '@/components/organisms/BottomTab/TabBarItem';
import icons from '@/constants/bottomTabIcons';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof TabBarItem> = {
  title: 'Organisms/BottomTab/TabBarItem',
  component: TabBarItem,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TabBarItem>;

export const Default: Story = {
  args: {
    label: '홈',
    icon: icons.home,
    active: false,
  },
};

export const Active: Story = {
  args: {
    label: '홈',
    icon: icons.home,
    active: true,
  },
};

export const Card: Story = {
  args: {
    label: '내 카드 실적',
    icon: icons.mycard,
    active: false,
  },
};

export const PensionActive: Story = {
  args: {
    label: '국민연금',
    icon: icons.pension,
    active: true,
  },
};
