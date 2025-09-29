'use client';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    className?: string;
}

export default function CodeBlock({
    code,
    language = 'tsx',
    title = 'Code',
    className = '',
}: CodeBlockProps) {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('복사 실패!:', err);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">{title}</span>
                    <button
                        className="bg-blue-500 text-white text-xs p-2 rounded-md cursor-pointer hover:bg-blue-600"
                        onClick={handleCopy}
                    >
                        {copied ? '복사됨!' : '복사'}
                    </button>
                </div>
                <SyntaxHighlighter
                    language={language}
                    style={tomorrow}
                    customStyle={{
                        padding: '1rem',
                        margin: 0,
                        fontSize: '0.875rem',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
