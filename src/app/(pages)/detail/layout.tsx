'use client';
import React from 'react';

export default function GuidePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto flex flex-col md:flex-row min-h-screen">
            {/* 컨텐츠 영역 */}
            <div className="flex-grow overflow-y-auto w-full py-4 md:py-8">{children}</div>
        </div>
    );
}
