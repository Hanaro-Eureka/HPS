import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import RadixSlider from '../components/atoms/Slider';

const meta: Meta<typeof RadixSlider> = {
  title: 'Atoms/Slider',
  component: RadixSlider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadixSlider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([65]);

    return (
      <div className='w-[300px] p-4'>
        <RadixSlider value={value} onChange={setValue} />
        <p className='text-sm mt-2'>선택된 나이: {value[0]}세</p>
      </div>
    );
  },
};
