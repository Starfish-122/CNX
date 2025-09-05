import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
// import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';

import './globals.css';

// const geistSans = Geist({
//     variable: '--font-geist-sans',
//     subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//     variable: '--font-geist-mono',
//     subsets: ['latin'],
// });

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
            <body className={`${notoSansKR.className} antialiased`}>{children}</body>
        </html>
    );
}
