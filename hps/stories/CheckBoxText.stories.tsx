import CheckBoxText from '@/components/molcules/CheckBoxText';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

const meta: Meta<typeof CheckBoxText> = {
  title: 'Components/CheckBoxText',
  component: CheckBoxText,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CheckBoxText>;

export const First: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckBoxText
        id='agree'
        checked={checked}
        bgColor='bg-[#2F9E8C]'
        borderColor='border-[#2F9E8C]'
        text='체크카드 사용 비중 높이기'
        description='신용카드 대비 공제율이 2배!'
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const Second: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckBoxText
        id='agree'
        checked={checked}
        bgColor='bg-[#2F9E8C]'
        borderColor='border-[#2F9E8C]'
        text='현금영수증 발급하기'
        description=' 현금영수증 발급시 30% 공제!'
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};
