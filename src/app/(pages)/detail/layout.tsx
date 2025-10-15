'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from '@/components/atoms/Icon';
import { sidebarCategories } from '@/routes';

export default function GuidePageLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="container mx-auto   flex flex-col md:flex-row min-h-screen">
            {/* 컨텐츠 영역 */}
            <div className="flex-grow overflow-y-auto w-full py-4 md:py-8">{children}</div>
        </div>
    );
}
