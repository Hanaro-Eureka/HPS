import SalaryBarChart from '@/components/molcules/SalaryBarGraph';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof SalaryBarChart> = {
  title: 'SalaryBarChart',
  component: SalaryBarChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '급여 대비 소비',
      table: {
        type: {
          summary: 'Array<{ moreSpent : number; leastSpent : number; }>',
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SalaryBarChart>;

export const Default: Story = {
  args: {
    data: [
      {
        used: 2800000,
        remain: 330000,
        name: '',
      },
    ],
    colors: {
      used: '#56B8AB',
      remain: '#E97272',
    },
  },
};
export const SpentMoreThanIncome: Story = {
  args: {
    data: [
      {
        used: 3330000,
        remain: 2800000,
        name: '',
      },
    ],
    colors: {
      used: '#56B8AB',
      remain: '#E97272',
    },
  },
};
