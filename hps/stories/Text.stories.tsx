import Text from '@/components/atoms/Text';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'select',
      options: ['p', 'div', 'span', 'u', 'ol', 'ul', 'li'],
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    tag: 'p',
    className: 'text-xl font-bold text-black',
    children: '수고하셨습니다',
  },
};

export const Accamount: Story = {
  args: {
    tag: 'div',
    className: 'text-lg font-semibold text-center text-black',
    children: '누적 납입액 ',
  },
};
export const money: Story = {
  args: {
    tag: 'div',
    className: 'text-lg font-semibold text-center text-black',
    children: '15,430,000원',
  },
};

export const Subtitle: Story = {
  args: {
    tag: 'div',
    className: 'text-xl text-center text-[color:#10AB9F]',
    children: '실적 달성!',
  },
};
