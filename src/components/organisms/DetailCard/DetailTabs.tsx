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
        <div className="detail-tabs bg-white rounded-2xl shadow-sm border border-gray-100 p-1 grid grid-cols-2 gap-1">
            <button
                onClick={() => onTabChange('info')}
                className={clsx('detail-tabs__button', activeTab === 'info' && 'active')}
            >
                정보
            </button>

            <button
                onClick={() => onTabChange('review')}
                className={clsx('detail-tabs__button', activeTab === 'review' && 'active')}
            >
                리뷰
            </button>
        </div>
    );
}
