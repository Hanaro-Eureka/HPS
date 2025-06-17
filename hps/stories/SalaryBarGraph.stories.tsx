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

    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    className: {
      control: 'text',
    },
    colors: { control: 'object' },
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
      },
    ],
    width: 300,
    height: 100,
    className: 'p-5',
    colors: {
      used: '#56B8AB',
      remain: '#E97272',
      lStroke: '',
      rStroke: '',
    },
  },
};
export const SpentMoreThanIncome: Story = {
  args: {
    data: [
      {
        used: 3330000,
        remain: 2800000,
      },
    ],
    width: 300,
    height: 100,
    className: 'p-5',
    colors: {
      used: '#56B8AB',
      remain: '#E97272',
      lStroke: '',
      rStroke: '',
    },
  },
};
