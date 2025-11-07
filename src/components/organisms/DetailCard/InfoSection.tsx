'use client';

import React from 'react';
import InfoRow from '@/components/molecules/InfoRow';

interface InfoSectionProps {
    address: string;
    phone: string;
    place_url: string;
    location: string;
    isLoading: boolean;
}

function isOnlineStore(location: string): boolean {
    return location === '인터넷' || location === '온라인';
}

export default function InfoSection({
    address,
    phone,
    place_url,
    location,
    isLoading,
}: InfoSectionProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col gap-4">
            {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2" />
                    <p className="text-sm">정보를 불러오는 중...</p>
                </div>
            ) : (
                <>
                    {/* 주소 */}
                    <InfoRow
                        icon="location_on"
                        iconColor="text-indigo-600"
                        iconBg="bg-indigo-50"
                        label="주소"
                        value={address || location || '주소 정보 없음'}
                    />

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* 전화번호 */}
                    <InfoRow
                        icon="call"
                        iconColor="text-blue-600"
                        iconBg="bg-blue-50"
                        label="전화번호"
                        value={phone || '전화번호 정보 없음'}
                    />

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* 카카오맵 URL */}
                    <InfoRow
                        icon="link"
                        iconColor="text-blue-600"
                        iconBg="bg-blue-50"
                        label="카카오맵"
                        value={
                            isOnlineStore(location) ? (
                                <span className="text-gray-600">온라인 전용 가게입니다</span>
                            ) : place_url ? (
                                <a
                                    href={place_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline break-all"
                                >
                                    {place_url}
                                </a>
                            ) : (
                                '카카오맵 정보 없음'
                            )
                        }
                    />
                </>
            )}
        </div>
    );
}
