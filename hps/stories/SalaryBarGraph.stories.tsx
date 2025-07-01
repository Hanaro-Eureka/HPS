import IncomeBarChart from '@/components/molcules/IncomeBarGraph';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof IncomeBarChart> = {
  title: 'Molecules/IncomeBarChart',
  component: IncomeBarChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '급여 대비 소비 데이터',
      table: {
        type: {
          summary: 'Array<{ name: string; used: number; remain: number; }>',
        },
      },
    },
    height: {
      control: { type: 'number' },
      defaultValue: 40,
    },
    colors: {
      description: '사용된 금액과 남은 금액의 색상',
      table: {
        type: {
          summary: '{ used: string; remain: string }',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IncomeBarChart>;

export const Default: Story = {
  args: {
    data: [
      {
        name: '이번 달',
        used: 2800000,
        remain: 330000,
      },
    ],
    height: 40,
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
        name: '이번 달',
        used: 3330000,
        remain: 2800000,
      },
    ],
    height: 40,
    colors: {
      used: '#56B8AB',
      remain: '#E97272',
    },
  },
};
