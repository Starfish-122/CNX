'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Icon, type TagCategory } from '@/components/atoms';
import { searchKakaoPlace, copyToClipboard } from '@/utils/services/kakaoMap';
import type { NotionPlace } from '@/utils/types';
import { CommentList } from '@/components/molecules';

type Tag = {
    label: string;
    category: TagCategory;
};

interface CustomDetailCardProps {
    data?: NotionPlace;
    name?: string;
    description?: string;
    image?: string;
    tags?: Tag[];
    rating?: number;
    reviewCount?: number;
    likeCount?: number;
    className?: string;
    onClose?: () => void;
}

type TabType = 'info' | 'menu' | 'review';

export default function CustomDetailCard({
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
}: CustomDetailCardProps) {
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [showAlert, setShowAlert] = useState(false);
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    // Notion 데이터 또는 props에서 값 가져오기
    const name = data?.name || propName || '';
    const description = data?.summary || propDescription || '';
    const image = data?.image || propImage || '/images/image1.png';
    const rating = data?.score || propRating || 0;
    const location = data?.location || '';

    // 태그 생성
    const tags: Tag[] = propTags || [];
    if (data) {
        if (data.status) tags.push({ label: data.status, category: 'status' });
        if (data.mood) {
            data.mood.split(', ').forEach((m) => {
                if (m) tags.push({ label: m, category: 'mood' });
            });
        }
        if (data.location) tags.push({ label: data.location, category: 'location' });
    }

    // 카카오맵에서 주소/전화번호 가져오기
    useEffect(() => {
        const fetchPlaceInfo = async () => {
            // Notion에 이미 주소와 전화번호가 있으면 사용
            if (data?.address || data?.phone) {
                setAddress(data.address || '');
                setPhone(data.phone || '');
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
                    }
                } catch (error) {
                    console.error('장소 정보 검색 실패:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPlaceInfo();
    }, [name, data]);

    const handleLike = async () => {
        // 좋아요 기능 (현재는 링크 복사)
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

    // 카테고리별 배지 색상
    const getBadgeColor = (category: TagCategory) => {
        switch (category) {
            case 'status':
                return 'bg-purple-100 text-purple-600';
            case 'mood':
                return 'bg-blue-100 text-blue-600';
            case 'location':
                return 'bg-green-100 text-green-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className={clsx('relative bg-white h-full overflow-hidden shadow-2xl', className)}>
            {/* 헤더 이미지 */}
            <div className="relative h-72 w-full overflow-hidden">
                <Image src={image} alt={name} fill className="object-cover" priority />
                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* X 버튼 */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                        aria-label="닫기"
                    >
                        <Icon name="close" size="sm" className="text-gray-900" />
                    </button>
                )}

                {/* 카테고리 배지 (좌상단) */}
                <div className="absolute top-6 left-4 flex gap-2 flex-wrap max-w-[calc(100%-8rem)]">
                    {tags.slice(0, 3).map((tag, index) => (
                        <div
                            key={index}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-1.5 rounded-lg shadow-sm text-xs font-medium',
                                getBadgeColor(tag.category)
                            )}
                        >
                            <Icon name="label" size="xs" />
                            <span>{tag.label}</span>
                        </div>
                    ))}
                </div>

                {/* 하단 정보 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
                    {/* 설명 */}
                    <p className="text-sm text-gray-200 font-light">{description}</p>

                    {/* 제목 */}
                    <h2 className="text-3xl font-bold text-white leading-tight">{name}</h2>

                    {/* 평점 및 액션 버튼 */}
                    <div className="flex gap-2 items-center flex-wrap">
                        {/* 평점 */}
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Icon
                                        key={i}
                                        name="star"
                                        filled={i < Math.floor(rating)}
                                        size="xs"
                                        className="text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-white text-sm font-medium">
                                {rating.toFixed(1)}
                            </span>
                        </div>

                        {/* 리뷰 수 */}
                        {reviewCount > 0 && (
                            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                                <Icon name="chat" size="xs" className="text-white" />
                                <span className="text-white text-sm">{reviewCount}</span>
                            </div>
                        )}

                        {/* 공유 버튼 */}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <Icon name="share" size="xs" className="text-white" />
                            <span className="text-white text-sm">공유</span>
                        </button>

                        {/* 좋아요 버튼 */}
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <Icon name="favorite" size="xs" className="text-white" />
                            <span className="text-white text-sm">{likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="p-6 flex flex-col gap-7">
                {/* 탭 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 grid grid-cols-3 gap-1">
                    <button
                        onClick={() => setActiveTab('info')}
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
                        onClick={() => setActiveTab('menu')}
                        className={clsx(
                            'py-2 px-4 rounded-xl text-sm font-medium transition-all',
                            activeTab === 'menu'
                                ? 'bg-indigo-500 text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-50'
                        )}
                    >
                        메뉴
                    </button>
                    <button
                        onClick={() => setActiveTab('review')}
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

                {/* 탭 컨텐츠 */}
                {activeTab === 'info' && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col gap-4">
                        {isLoading ? (
                            <div className="text-center py-8 text-gray-500">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2" />
                                <p className="text-sm">정보를 불러오는 중...</p>
                            </div>
                        ) : (
                            <>
                                {/* 주소 */}
                                <div className="flex gap-3">
                                    <div className="bg-indigo-50 rounded-2xl p-2.5 shrink-0">
                                        <Icon
                                            name="location_on"
                                            size="sm"
                                            className="text-indigo-600"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <p className="text-gray-500 text-sm">주소</p>
                                        <p className="text-gray-900 font-medium break-words">
                                            {address || location || '주소 정보 없음'}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                                {/* 전화번호 */}
                                <div className="flex gap-3">
                                    <div className="bg-blue-50 rounded-2xl p-2.5 shrink-0">
                                        <Icon name="call" size="sm" className="text-blue-600" />
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <p className="text-gray-500 text-sm">전화번호</p>
                                        <p className="text-gray-900 font-medium">
                                            {phone || '전화번호 정보 없음'}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                        <p className="text-gray-500 text-center py-8">메뉴 정보 준비 중입니다.</p>
                    </div>
                )}

                {activeTab === 'review' && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                        <p className="text-gray-500 text-center py-8">리뷰 정보 준비 중입니다.</p>
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
            <div className="p-6">
                <CommentList placeName={name || ''} />
            </div>
        </div>
    );
}
