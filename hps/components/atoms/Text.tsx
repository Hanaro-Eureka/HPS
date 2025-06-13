import { JSX, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
};
export default function Text({
  children,
  className = '',
  tag = 'p',
}: PropsWithChildren<Props>) {
  const Tag = tag;

  return <Tag className={className}>{children}</Tag>;
}
