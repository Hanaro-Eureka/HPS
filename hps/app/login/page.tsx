import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';

export default function Login() {
  return (
    <form>
      <div className='flex flex-col w-full items-center justify-start gap-[4rem] px-[3rem] py-[10rem]'>
        <div className='flex flex-col w-full items-center justify-center gap-[2rem]'>
          <Text className=' text-[1.2rem]'>로그인</Text>
          <Text className=' text-center text-xl'>
            아이디와 비밀번호를
            <br />
            입력해 주세요
          </Text>
        </div>
        <div className='flex flex-col gap-[1rem] w-full'>
          <Input
            name='id'
            type='text'
            placeholder='아이디'
            className='w-full h-[3.5rem] rounded-lg border border-[#dddce1] px-4 focus:outline-none'
          />
          <Input
            name='password'
            type='password'
            placeholder='비밀번호'
            className='w-full h-[3.5rem] rounded-lg border border-[#dddce1] px-4 focus:outline-none'
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-[1rem] w-full'>
          <Button
            bgColor='bg-[#019591]'
            className='w-full h-[3.5rem] px-5 text-white text-base rounded-lg'
          >
            로그인
          </Button>
          <Text className='text-sm text-[#aab0b9]'>회원가입</Text>
        </div>
      </div>
    </form>
  );
}
