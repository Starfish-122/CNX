'use client';
import React from 'react';
import CodeBlock from '../utils/CodeBlock';

export default function ExampleCard({ demo, code }: { demo?: React.ReactNode; code?: string }) {
    return (
        <>
            {demo && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                    {demo}
                </div>
            )}

            {code && <CodeBlock className="mt-4" code={code || ''} language="tsx" />}
        </>
    );
}
