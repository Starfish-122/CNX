'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/atoms';
import { searchKakaoPlaceDetail, copyToClipboard } from '@/utils/services/kakaoMap';
import { getLikeCount, checkUserLiked, toggleLike } from '@/utils/services/firebase';
import DetailHeader from './DetailHeader';
import DetailTabs from './DetailTabs';
import InfoSection from './InfoSection';
import { Comments } from '@/components/organisms';
import type { DetailCardProps, PlaceTag, TabType } from '@/types/components';

export default function DetailCard({
    data,
    name: propName,
    description: propDescription,
    image: propImage,
    copyright: propCopyright,
    tags: propTags,
    rating: propRating,
    reviewCount = 0,
    likeCount = 0,
    className,
    onClose,
}: DetailCardProps) {
    // URL 쿼리 파라미터에서 초기 탭 설정
    const [activeTab, setActiveTab] = useState<TabType>(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get('tab');
            if (tabParam === 'review' || tabParam === 'menu' || tabParam === 'info') {
                return tabParam as TabType;
            }
        }
        return 'info';
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [place_url, setPlaceUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

    // Notion 데이터 또는 props에서 값 가져오기
    const name = data?.name || propName || '';
    const description = data?.summary || propDescription || '';
    // Notion 이미지를 우선적으로 사용 (유효한 URL인 경우)
    const notionImage = data?.image && data.image.trim() !== '' ? data.image : null;
    const image = notionImage || propImage || '';
    const copyright = data?.copyright || propCopyright || '';
    const rating = data?.score || propRating || 0;
    const location = data?.location || '';
    const website = data?.website || '';

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

    // 좋아요 상태 및 카운트 불러오기 (Firebase)
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!name) return;

            try {
                // Firebase에서 좋아요 카운트 조회
                const count = await getLikeCount(name);
                setCurrentLikeCount(count);

                // 현재 사용자의 좋아요 상태 확인
                const liked = await checkUserLiked(name);
                setIsLiked(liked);
            } catch (error) {
                console.error('좋아요 데이터 조회 실패:', error);
            }
        };

        fetchLikeData();
    }, [name]);

    // 카카오 JS SDK를 통해 주소/전화번호/URL 가져오기
    useEffect(() => {
        const fetchPlaceInfo = async () => {
            if (!name) return;

            const isOnlineStore = location === '인터넷' || location === '온라인';
            const kakaoUrl = data?.kakaomap ?? '';

            if (isOnlineStore) {
                setAddress('온라인 전용');
                setPhone('');
                setPlaceUrl(kakaoUrl);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const result = await searchKakaoPlaceDetail(name, kakaoUrl || null);
                if (result) {
                    setAddress(result.road_address_name || result.address_name || '');
                    setPhone(result.phone || '');
                    setPlaceUrl(result.place_url || kakaoUrl);
                } else {
                    setAddress('');
                    setPhone('');
                    setPlaceUrl(kakaoUrl);
                }
            } catch (error) {
                console.error('장소 정보 검색 실패:', error);
                setAddress('');
                setPhone('');
                setPlaceUrl(kakaoUrl);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaceInfo();
    }, [name, data?.kakaomap, location]);

    const handleLike = async () => {
        if (!name) return;

        try {
            // Firebase에서 좋아요 토글
            const result = await toggleLike(name);

            // 상태 업데이트
            setIsLiked(result.isLiked);
            setCurrentLikeCount(result.likeCount);

            // 실패 시 사용자에게 알림
            if (!result.success && result.error) {
                setAlertMessage({
                    type: 'error',
                    text: result.error,
                });
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    setAlertMessage(null);
                }, 3000);
            }
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
            setAlertMessage({
                type: 'error',
                text: '좋아요 처리 중 오류가 발생했습니다.',
            });
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage(null);
            }, 3000);
        }
    };

    const handleShare = async () => {
        // 장소명 기반 URL 생성
        if (!name) return;

        const shareUrl =
            typeof window !== 'undefined'
                ? `${window.location.origin}/detail/${encodeURIComponent(name)}`
                : '';

        const success = await copyToClipboard(shareUrl);
        if (success) {
            setAlertMessage({
                type: 'success',
                text: '링크가 복사되었습니다! 🔗',
            });
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setAlertMessage(null);
            }, 3000);
        }
    };

    return (
        <div className={clsx('relative h-full', className)}>
            {/* 헤더 */}
            <DetailHeader
                image={image}
                name={name}
                description={description}
                tags={tags}
                rating={rating}
                reviewCount={reviewCount}
                likeCount={currentLikeCount}
                isLiked={isLiked}
                isBest={!!data?.best}
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
                        website={website}
                    />
                )}

                {activeTab === 'menu' && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                        <p className="text-gray-500 text-center py-8">메뉴 정보 준비 중입니다.</p>
                    </div>
                )}

                {activeTab === 'review' && (
                    <div className="flex flex-col gap-3">
                        <Comments placeName={name} />
                    </div>
                )}
                {copyright && (
                    <p className="text-xs text-gray-500 text-right">사진출처 : {copyright}</p>
                )}
            </div>

            {/* 알럿 메시지 */}
            {showAlert && alertMessage && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                    <div
                        className={clsx(
                            'rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 border',
                            alertMessage.type === 'success'
                                ? 'bg-white border-gray-200'
                                : 'bg-red-50 border-red-200'
                        )}
                    >
                        <Icon
                            name={alertMessage.type === 'success' ? 'check_circle' : 'error'}
                            size="sm"
                            className={
                                alertMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                            }
                        />
                        <p
                            className={clsx(
                                'text-sm font-medium',
                                alertMessage.type === 'success' ? 'text-gray-900' : 'text-red-900'
                            )}
                        >
                            {alertMessage.text}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
