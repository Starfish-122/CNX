'use client';
import React from 'react';
import clsx from 'clsx';
import Title from '@/components/atoms/Title';
import Text from '@/components/atoms/Text';

export default function GuideLayout({
    title,
    description,
    children,
    className,
}: {
    title: string;
    description?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={clsx('max-w-3xl mx-auto px-6 py-10', className)}>
            <Title className="mb-3">{title}</Title>
            {description && (
                <Text className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                    {description}
                </Text>
            )}
            {children}
        </div>
    );
}
