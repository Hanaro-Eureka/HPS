import Title from '@/components/atoms/Title';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Title> = {
  title: 'Atoms/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
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

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    tag: 'h1',
    className: 'text-3xl font-bold text-hana-green',
    children: '하나의 완벽한 비서',
  },
};

export const Subtitle: Story = {
  args: {
    tag: 'h2',
    className: 'text-xl text-black',
    children: '연말 정산',
  },
};

export const Paragraph: Story = {
  args: {
    tag: 'p',
    className: 'text-base text-black',
    children: '추천 상품',
  },
};
