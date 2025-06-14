import Input from '@/components/atoms/Input';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export default meta;

export const NameInput: Story = {
  args: {
    className:
      'w-full left-5 absolute justify-start text-lg focus:outline-none',
    placeholder: '이름',
    name: 'name',
  },
};

export const IdInput: Story = {
  args: {
    className:
      'w-full left-5 absolute justify-start text-lg focus:outline-none',
    name: 'id',
    placeholder: '아이디',
    type: 'text',
  },
};

export const PasswordI: Story = {
  args: {
    className:
      'w-full left-5 absolute justify-start text-lg focus:outline-none',
    placeholder: '비밀번호',
    name: 'password',
    type: 'password',
  },
};

export const BirthInput: Story = {
  args: {
    className:
      'left-5 absolute justify-start text-lg focus:outline-none min-w-[15rem]',
    placeholder: '생년월일',
    name: 'birth',
    type: 'date',
  },
};
