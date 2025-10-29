'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/atoms';
import { searchKakaoPlace, copyToClipboard } from '@/utils/services/kakaoMap';
import DetailHeader from './DetailHeader';
import DetailTabs from './DetailTabs';
import InfoSection from './InfoSection';
import { CommentList } from '@/components/molecules';
import type { DetailCardProps, PlaceTag, TabType } from '@/types/components';

export default function DetailCard({
    data,
    name: propName,
    description: propDescription,
    image: propImage,
    tags: propTags,
    rating: propRating,
    reviewCount = 0,
    likeCount = 0,
    className,
    onClose,
}: DetailCardProps) {
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [showAlert, setShowAlert] = useState(false);
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [place_url, setPlaceUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    // Notion 데이터 또는 props에서 값 가져오기
    const name = data?.name || propName || '';
    const description = data?.summary || propDescription || '';
    const image = data?.image || propImage || '/images/image1.png';
    const rating = data?.score || propRating || 0;
    const location = data?.location || '';

    // 태그 생성
    const tags: PlaceTag[] = propTags || [];
    if (data) {
        if (data.status) tags.push({ label: data.status, category: 'status' });
        if (data.mood) {
            data.mood.split(', ').forEach((m: string) => {
                if (m) tags.push({ label: m, category: 'mood' });
            });
        }
        if (data.location) tags.push({ label: data.location, category: 'location' });
    }

    // 카카오맵에서 주소/전화번호/URL 가져오기
    useEffect(() => {
        const fetchPlaceInfo = async () => {
            // 온라인 가게인지 확인
            const isOnlineStore = location === '인터넷' || location === '온라인';

            // Notion에 이미 정보가 있으면 사용
            if (data?.address || data?.phone) {
                setAddress(data.address || '');
                setPhone(data.phone || '');
                // 카카오맵 URL은 Notion에 있으면 사용
                if (data?.kakaomap) {
                    setPlaceUrl(data.kakaomap);
                }
                return;
            }

            // 온라인 가게는 카카오맵 검색 스킵
            if (isOnlineStore) {
                setAddress('온라인 전용');
                console.log('온라인 가게 - 카카오맵 검색 스킵:', name);
                return;
            }

            // 없으면 카카오맵 API로 검색
            if (name && typeof window !== 'undefined') {
                setIsLoading(true);
                try {
                    const result = await searchKakaoPlace(name);
                    if (result) {
                        setAddress(result.road_address_name || result.address_name);
                        setPhone(result.phone);
                        setPlaceUrl(result.place_url);
                    }
                } catch (error) {
                    console.error('장소 정보 검색 실패:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPlaceInfo();
    }, [name, data, location]);

    const handleLike = async () => {
        const url = data?.url || window.location.href;
        const success = await copyToClipboard(url);
        if (success) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleShare = async () => {
        const url = data?.url || window.location.href;
        const success = await copyToClipboard(url);
        if (success) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <div className={clsx('relative bg-white h-full overflow-hidden shadow-2xl', className)}>
            {/* 헤더 */}
            <DetailHeader
                image={image}
                name={name}
                description={description}
                tags={tags}
                rating={rating}
                reviewCount={reviewCount}
                likeCount={likeCount}
                onClose={onClose}
                onShare={handleShare}
                onLike={handleLike}
            />

            {/* 컨텐츠 영역 */}
            <div className="p-6 flex flex-col gap-7">
                {/* 탭 */}
                <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* 탭 컨텐츠 */}
                {activeTab === 'info' && (
                    <InfoSection
                        address={address}
                        phone={phone}
                        place_url={place_url}
                        location={location}
                        isLoading={isLoading}
                    />
                )}

                {activeTab === 'menu' && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                        <p className="text-gray-500 text-center py-8">메뉴 정보 준비 중입니다.</p>
                    </div>
                )}

                {activeTab === 'review' && (
                    <div className="flex flex-col gap-3">
                        <CommentList placeName={name} />
                    </div>
                )}
            </div>

            {/* 링크 복사 알럿 */}
            {showAlert && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-xl px-4 py-3 flex items-center gap-3">
                        <Icon name="check_circle" size="sm" className="text-green-500" />
                        <p className="text-sm text-gray-900 font-medium">
                            링크가 복사되었습니다! 🔗
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
