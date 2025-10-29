'use client';

import React from 'react';
import clsx from 'clsx';
import type { TabType } from '@/types/components';

interface DetailTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export default function DetailTabs({ activeTab, onTabChange }: DetailTabsProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 grid grid-cols-3 gap-1">
            <button
                onClick={() => onTabChange('info')}
                className={clsx(
                    'py-2 px-4 rounded-xl text-sm font-medium transition-all',
                    activeTab === 'info'
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                )}
            >
                정보
            </button>
            <button
                onClick={() => onTabChange('menu')}
                disabled
                className={clsx(
                    'py-2 px-4 rounded-xl text-sm font-medium transition-all',
                    'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
            >
                메뉴
            </button>
            <button
                onClick={() => onTabChange('review')}
                className={clsx(
                    'py-2 px-4 rounded-xl text-sm font-medium transition-all',
                    activeTab === 'review'
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                )}
            >
                리뷰
            </button>
        </div>
    );
}
