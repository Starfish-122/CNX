'use client';

import React from 'react';
import { Icon } from '@/components/atoms';

interface InfoRowProps {
    icon: string;
    iconColor: string;
    iconBg: string;
    label: string;
    value: string | React.ReactNode;
}

export default function InfoRow({ icon, iconColor, iconBg, label, value }: InfoRowProps) {
    return (
        <div className="flex gap-3">
            <div className={`${iconBg} rounded-2xl p-2.5 shrink-0`}>
                <Icon name={icon} size="sm" className={iconColor} />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
                <p className="text-gray-500 text-sm">{label}</p>
                {typeof value === 'string' ? (
                    <p className="text-gray-900 font-medium break-words">{value}</p>
                ) : (
                    value
                )}
            </div>
        </div>
    );
}
