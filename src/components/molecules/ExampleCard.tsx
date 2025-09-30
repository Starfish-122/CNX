'use client';
import React from 'react';
import CodeBlock from '@/components/molecules/CodeBlock';
import Title from '@/components/atoms/Title';
import Text from '@/components/atoms/Text';

interface ExampleCardProps {
    demo?: React.ReactNode;
    code?: string;
    title?: string;
    description?: string;
}

export default function ExampleCard({ demo, code, title, description }: ExampleCardProps) {
    if (!demo && !code) {
        return (
            <div className="space-y-4">
                {(title || description) && (
                    <div className="space-y-2">
                        {title && (
                            <Title element="h2" className="text-lg font-semibold">
                                {title}
                            </Title>
                        )}
                        {description && (
                            <Text className="text-gray-600 dark:text-gray-400">{description}</Text>
                        )}
                    </div>
                )}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                    <Text className="text-gray-500 dark:text-gray-400 text-center">
                        이 예제의 미리보기와 코드가 아직 준비되지 않았습니다.
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {(title || description) && (
                <div className="space-y-2">
                    {title && (
                        <Title element="h2" className="text-lg font-semibold">
                            {title}
                        </Title>
                    )}
                    {description && (
                        <Text className="text-gray-600 dark:text-gray-400">{description}</Text>
                    )}
                </div>
            )}

            {demo && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                    {demo}
                </div>
            )}

            {code && <CodeBlock className="mt-4" code={code || ''} language="tsx" />}
        </div>
    );
}
