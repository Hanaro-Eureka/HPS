import { JSX, PropsWithChildren } from 'react';

type Props = {
  className: string;
  tag?: keyof JSX.IntrinsicElements;
};
export default function Title({
  children,
  className,
  tag = 'h1',
}: PropsWithChildren<Props>) {
  const Tag = tag;
  return <Tag className={className}>{children}</Tag>;
}
