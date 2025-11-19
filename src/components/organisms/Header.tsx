'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="border-b border-gray-200 w-full py-4 font-sans">
            <div className="container mx-auto px-4 flex justify-between items-center relative">
                <Link href="/">
                    <Image
                        className="dark:invert"
                        src="/cnx-logo.svg"
                        alt="CNX logo"
                        width={82}
                        height={30}
                        priority
                    />
                </Link>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link
                                href="/guide"
                                className="hover:text-blue-500 transition-colors text-lg"
                            >
                                Guide
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                href="/detail"
                                className="hover:text-blue-500 transition-colors text-lg"
                            >
                                Detail
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
