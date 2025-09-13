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
        <html lang="ko">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0"
                    rel="stylesheet"
                />
                <link 
                    href="https://fonts.googleapis.com/icon?family=Material+Icons" 
                    rel="stylesheet"
                />
            </head>
            <body className={`${notoSansKR.className} antialiased flex flex-col min-h-screen`}>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
