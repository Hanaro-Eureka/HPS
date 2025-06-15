import LineGraph from '@/components/molcules/LineGraph';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof LineGraph> = {
  title: 'LineGraph',
  component: LineGraph,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '월별 수입, 지출, 국민연금 납입 데이터',
      table: {
        type: {
          summary:
            'Array<{ month: string; income: number; spend: number; nps: number }>',
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
    lineType: {
      control: 'text',
    },
    lineColors: {
      control: 'object',
    },
    strokeWidth: {
      control: 'number',
    },
    strokeDasharray: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof LineGraph>;

export const Default: Story = {
  args: {
    data: [
      {
        month: '1월',
        income: 2800000,
        spend: 2000000,
        nps: 200000,
      },
      {
        month: '2월',
        income: 2800000,
        spend: 2500000,
        nps: 200000,
      },
      {
        month: '3월',
        income: 2800000,
        spend: 2300000,
        nps: 200000,
      },
      {
        month: '4월',
        income: 3000000,
        spend: 2000000,
        nps: 220000,
      },
      {
        month: '5월',
        income: 3000000,
        spend: 2200000,
        nps: 220000,
      },
      {
        month: '6월',
        income: 3200000,
        spend: 3000000,
        nps: 240000,
      },
      {
        month: '7월',
        income: 3200000,
        spend: 2500000,
        nps: 240000,
      },
    ],
    xDataKey: 'month',
    yDataKey: 'income',
    width: 300,
    height: 500,
    className: 'p-5',
    lineType: 'monotone',
    lineColors: {
      income: '#8884d8',
      spend: '#019591',
      nps: '#EBC4C4',
    },
    strokeWidth: 2,
    strokeDasharray: '5 1',
  },
};
