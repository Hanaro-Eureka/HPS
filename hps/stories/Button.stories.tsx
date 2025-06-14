import Button from '@/components/atoms/Button';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export default meta;

export const CompleteButton: Story = {
  args: {
    children: '완료',
    bgColor: 'bg-[#F3F4F6]',
    className:
      'w-36 h-9 text-neutral-800 text-base relative text-center justify-center rounded-lg',
  },
};

export const NowGaipButton: Story = {
  args: {
    children: '지금 가입하기',
    bgColor: 'bg-[#fff]',
    className: 'w-32 h-10 relative text-center justify-center rounded-lg',
  },
};

export const SigninButton: Story = {
  args: {
    children: '회원가입',
    bgColor: 'bg-[#019591]',
    className:
      'w-72 h-12 text-white text-base relative text-center justify-center rounded-lg',
  },
};

export const LoginButton: Story = {
  args: {
    children: '로그인',
    bgColor: 'bg-[#019591]',
    className:
      'w-72 h-12 text-white text-base relative text-center justify-center rounded-lg',
  },
};
