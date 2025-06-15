import BarGraph from '@/components/molcules/BarGraph';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof BarGraph> = {
  title: 'BarGraph',
  component: BarGraph,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '연령별 국민연금 수령액',
      table: {
        type: {
          summary:
            'Array<{ age: string; predictedNps: number; barColor: string; }>',
        },
      },
    },
    xDataKey: {
      control: 'text',
    },
    yDataKey: {
      control: 'text',
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
  },
};
export default meta;

type Story = StoryObj<typeof BarGraph>;

export const Default: Story = {
  args: {
    data: [
      {
        age: '60세',
        predictedNps: 980000,
        barColor: '#8884d8',
      },
      {
        age: '65세',
        predictedNps: 1050000,
        barColor: '#1a1a1a',
      },
      {
        age: '70세',
        predictedNps: 1300000,
        barColor: '#2F9E8C',
      },
    ],
    xDataKey: 'predictedNps',
    yDataKey: 'age',
    width: 300,
    height: 500,
    className: 'p-5',
  },
};
