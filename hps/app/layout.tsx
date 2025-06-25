import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '하나의 완벽한 비서',
  description: 'MZ 프리랜서를 위한 자산 관리 서비스',
};
export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={`relative antialiased bg-[var(--color-background)]`}>
        {children}
      </body>
    </html>
  );
}
