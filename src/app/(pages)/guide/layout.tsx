'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from '@/components/base/Icon';
import { sidebarCategories } from '@/routes';

export default function GuidePageLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="container mx-auto   flex flex-col md:flex-row min-h-screen">
            {/* 사이드바 */}
            <div className="w-full md:w-64 mt-4 md:mt-10 h-auto md:h-full flex flex-col bg-gray-50 dark:bg-gray-900 ">
                <div className="flex-grow overflow-x-auto md:overflow-x-hidden overflow-y-auto p-4">
                    <Link
                        href="/guide"
                        className={clsx(
                            'mb-4 flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors',
                            pathname === '/guide'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        )}
                    >
                        <Icon name="home" size="sm" />
                        <span>홈</span>
                    </Link>

                    {sidebarCategories.map((category) => (
                        <div key={category.id} className="mb-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                                {category.name}
                            </div>

                            <div className="space-y-1">
                                {category.items.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={clsx(
                                            'flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors',
                                            pathname === item.path
                                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        )}
                                    >
                                        {item.icon && <Icon name={item.icon} size="sm" />}
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="flex-grow overflow-y-auto w-full py-4 md:py-8">{children}</div>
        </div>
    );
}
