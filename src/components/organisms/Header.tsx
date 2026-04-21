'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="header">
            <div className="header__container container">
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
                                href="/user-guide"
                                className="hover:text-blue-500 transition-colors text-lg"
                            >
                                User Guide
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
