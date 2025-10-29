'use client';

import React from 'react';
import Icon from './Icon';
import Title from './Title';
import Text from './Text';

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

/**
 * 에러 상태 표시 컴포넌트
 * @description 오류 발생 시 표시하는 컴포넌트
 */
export default function ErrorState({
    title = '오류가 발생했습니다',
    message,
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                    <Icon name="error" size="lg" className="text-red-600" />
                </div>
                <Title
                    element="h1"
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                >
                    {title}
                </Title>
                <Text className="text-gray-600 dark:text-gray-400 mb-6">{message}</Text>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        <Icon name="refresh" size="sm" />
                        다시 시도
                    </button>
                )}
            </div>
        </div>
    );
}
