// import SalaryCircle from '../components/SalaryCircle';
// export default async function SummaryTestPage() {
//   return (
//     <div className='p-6'>
//       <SalaryCircle></SalaryCircle>
//     </div>
//   );
// }
// import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';
// export default async function SummaryTestPage() {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), now.getMonth(), 1);
//   const data = await getIncomeSourcesByUserId(1, start);
//   return (
//     <div className='p-6'>
//       <h1 className='text-xl font-bold mb-4'>이번 달 수입 구조</h1>
//       {/* <SalaryBubbleChart data={data} /> */}
//     </div>
//   );
// }
import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';
import SalaryCircle from '../components/SalaryCircle';

export default async function SummaryTestPage() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const data = await getIncomeSourcesByUserId(1, start);

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>이번 달 수입 구조</h1>
      <SalaryCircle data={data} />
    </div>
  );
}
