'use client';

import React from 'react';

interface LoadingStateProps {
    message?: string;
}

/**
 * 로딩 상태 표시 컴포넌트
 * @description 데이터를 불러오는 중일 때 표시하는 스피너와 메시지
 */
export default function LoadingState({ message = '데이터를 불러오는 중...' }: LoadingStateProps) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </div>
        </div>
    );
}
