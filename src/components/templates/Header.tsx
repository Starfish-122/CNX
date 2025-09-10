'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="border-b border-gray-200 w-full py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="font-bold text-xl">
                    CNX
                </Link>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/map" className="hover:text-blue-500 transition-colors">
                                Map
                            </Link>
                        </li>
                        <li>
                            <Link href="/guide" className="hover:text-blue-500 transition-colors">
                                Guide
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
