import Title from '@/components/atoms/Title';
import Image from 'next/image';
import ProfileItem from './ProfileItem';

type Props = {
  name: string;
  loginId: string;
  birthDate: string;
  id: number;
};

export default function MyPageClient({ id, name, loginId, birthDate }: Props) {
  return (
    <div className='w-full flex flex-col items-center pt-10 px-5 py-5'>
      <Title tag='h1' className='text-lg font-semibold'>
        {name}님의 정보
      </Title>

      <div className='w-full flex justify-center mt-10 mb-6'>
        <Image
          src='/svgs/ic_profile.svg'
          alt='Profile'
          width={90}
          height={90}
          className='rounded-full'
        />
      </div>

      <div className='w-full flex flex-col'>
        <ProfileItem label='이름' fname='name' value={name} id={id} />
        <ProfileItem label='아이디' fname='loginId' value={loginId} id={id} />
        <ProfileItem
          label='생년월일'
          fname='birthDate'
          value={birthDate}
          id={id}
        />
      </div>
      <div className='w-full flex flex-col mt-10'>로그아웃버튼넣자</div>
      <div className='w-full flex flex-col'>비밀번호 변경도 해볼까</div>
    </div>
  );
}
