import Checkbox from '@/components/atoms/Checkbox';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Checkbox>;

export default meta;

export const CheckedBox: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(true);
    return (
      <Checkbox
        id='checked-story'
        checked={isChecked}
        bgColor='#2F9E8C'
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
};

export const NoneCheckedBox: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Checkbox
        id='none-checked-story'
        checked={isChecked}
        bgColor='#2F9E8C'
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
};
