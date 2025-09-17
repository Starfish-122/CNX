'use client';

import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="flex flex-col gap-[32px] items-center sm:items-start p-8 pb-20 sm:p-20">
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
                <li className="mb-2 tracking-[-.01em]">
                    Get started by editing{' '}
                    <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                        src/app/page.tsx
                    </code>
                    .
                </li>
                <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
                <a className="button button--dark" href="/map" rel="noopener noreferrer">
                    <Image
                        className="dark:invert"
                        src="/vercel.svg"
                        alt="Vercel logomark"
                        width={20}
                        height={20}
                    />
                    Map
                </a>
                <a
                    className="button"
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read our docs
                </a>
            </div>
        </div>
    );
}
