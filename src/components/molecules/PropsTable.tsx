'use client';
import React from 'react';
import { Text } from '@/components/atoms';

interface Prop {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description: string;
}

interface PropsTableProps {
    props: Prop[];
}

export default function PropsTable({ props }: PropsTableProps): React.JSX.Element {
    if (!props || props.length === 0) {
        return (
            <div className="space-y-4">
                <Text className="text-gray-500 dark:text-gray-400">
                    이 컴포넌트는 props를 받지 않습니다.
                </Text>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            속성
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            타입
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            필수
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            기본값
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            설명
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {props.map((prop, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-4 py-3">
                                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    {prop.name}
                                </code>
                            </td>
                            <td className="px-4 py-3">
                                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                                    {prop.type}
                                </code>
                            </td>
                            <td className="px-4 py-3">
                                {prop.required ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                        필수
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        선택
                                    </span>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                {prop.defaultValue ? (
                                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {prop.defaultValue}
                                    </code>
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500">-</span>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <Text className="text-sm text-gray-700 dark:text-gray-300">
                                    {prop.description}
                                </Text>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
