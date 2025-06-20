import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';

export default async function SalaryCircle() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const data = await getIncomeSourcesByUserId(1, start);
  const maxAmount = Math.max(...data.map((item) => item.amount));

  const colors = [
    'bg-pink-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',
    'bg-red-200',
    'bg-orange-200',
  ];

  return (
    <div className='flex flex-wrap gap-4 mt-6'>
      {data.map((item, idx) => {
        const ratio = item.amount / maxAmount;
        const size = 80 + ratio * 100;

        //     return (
        //       <div
        //         key={idx}
        //         style={{ width: `${size}px`, height: `${size}px` }}
        //         className={`${colors[idx % colors.length]} rounded-full flex items-center justify-center flex-col text-center text-xl`}
        //       >
        //         <div className='font-[600] text-sm'>{item.category}</div>
        //       </div>
        //     );
        //   })}
        return (
          <div
            key={idx}
            style={{ width: `${size}px`, height: `${size}px` }}
            className={`${colors[idx % colors.length]} w-${size} h-${size} rounded-full flex items-center justify-center flex-col text-center text-xl font-600`}
          >
            {item.category}
          </div>
        );
      })}
    </div>
  );
}
