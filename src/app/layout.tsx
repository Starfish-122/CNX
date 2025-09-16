import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/templates/Header';
import Footer from '@/components/templates/Footer';

import '@/styles/globals.css';

const notoSansKR = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
});

const materialIconsCSS = `
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200');
  
`;

export const metadata: Metadata = {
    title: 'React Team Project',
    description: '용산 센터  가이드 사이트 만들기',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <head>
                {/* dangerouslySetInnerHTML : React에서 HTML 문자열을 직접 삽입할 때 사용하는 prop
                Next.js App Router에서는 <link> 태그로 폰트를 로드하면 경고가 발생
                대신 CSS @import를 사용해서 폰트를 로드
                dangerouslySetInnerHTML로 CSS 문자열을 <style> 태그 안에 삽입
                 */}
                <style dangerouslySetInnerHTML={{ __html: materialIconsCSS }} />
            </head>
            <body suppressHydrationWarning className={`${notoSansKR.className} antialiased flex flex-col min-h-screen`}>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
