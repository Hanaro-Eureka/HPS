import Input from '../atoms/Input';

export default function UserChat() {
  return (
    <div className='bg-hana-chartchat p-4 rounded-tl-3xl rounded-b-3xl w-48'>
      <p className='text-sm font-[500] text-white pb-2.5'>언제 살까?</p>
      <form className='flex flex-col gap-2.5'>
        <Input
          placeholder='구매할 물건'
          className='w-full rounded-lg px-2 py-1.5 border-gray-100 bg-white text-xs font-[400]'
        ></Input>
        <Input
          placeholder='가격'
          className='w-full rounded-lg px-2 py-1.5 bg-white text-xs font-[400]'
        ></Input>
      </form>
      {/* <Input
          placeholder='가격'
          className='w-full mb-2 px-2 py-2 rounded-lg bg-white font-[400]'
        ></Input> */}
    </div>
  );
}
