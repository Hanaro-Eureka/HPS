import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],

  // @ts-expect-error - safelist는 공식 타입 정의엔 없지만 실제 Tailwind 빌드엔 문제 없음
  safelist: [
    'text-3xl',
    'text-xl',
    'text-base',
    'font-bold',
    'font-semibold',
    'text-blue-500',
    'text-red-500',
    'text-green-500',
    'text-gray-700',
    'text-gray-600',
    'text-white',
    'text-black',
    'text-yellow-300',
    'text-[color:#10AB9F]', //color code from figma
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};

export default config;
