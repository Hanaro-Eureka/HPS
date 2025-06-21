import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { SignUp } from '@/lib/actions/signup';

export default function SignUpPage() {
  return (
    <form action={SignUp}>
      <div className='flex flex-col w-full items-center justify-start gap-10 px-8 py-20'>
        <div className='flex flex-col w-full items-center justify-center gap-8'>
          <Text className=' text-xl font-[300] text-black-font'>회원가입</Text>
          <Text className=' text-center text-black-font font-[500]'>
            아이디와 비밀번호를
            <br />
            입력해 주세요
          </Text>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <Input
            name='name'
            type='text'
            placeholder='이름'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
          />
          <Input
            name='id'
            type='text'
            placeholder='아이디'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
          />
          <Input
            name='password'
            type='password'
            placeholder='비밀번호'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none text-gray-login font-[400]'
          />
          <Input
            name='birth'
            type='date'
            placeholder='생년월일'
            className='w-full h-14 rounded-lg border border-[#dddce1] px-4 focus:outline-none font-[400] text-gray-login'
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-4 w-full'>
          <Button
            type='submit'
            bgColor='bg-hana-button'
            className='w-full h-14 px-5 text-white rounded-lg font-[500] text-base'
          >
            회원가입
          </Button>
        </div>
      </div>
    </form>
  );
}
