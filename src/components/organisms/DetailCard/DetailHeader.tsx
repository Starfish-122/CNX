'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Icon, type TagCategory } from '@/components/atoms';
import { StarRating } from '@/components/molecules';
import type { PlaceTag } from '@/types/components';

interface DetailHeaderProps {
    image: string;
    name: string;
    description: string;
    tags: PlaceTag[];
    rating: number;
    reviewCount: number;
    likeCount: number;
    onClose?: () => void;
    onShare: () => void;
    onLike: () => void;
}

export default function DetailHeader({
    image,
    name,
    description,
    tags,
    rating,
    reviewCount,
    likeCount,
    onClose,
    onShare,
    onLike,
}: DetailHeaderProps) {
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
                        <StarRating value={rating} size="sm" readOnly />
                        <span className="text-white text-sm font-medium">{rating.toFixed(1)}</span>
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
                        onClick={onShare}
                        className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <Icon name="share" size="xs" className="text-white" />
                        <span className="text-white text-sm">공유</span>
                    </button>

                    {/* 좋아요 버튼 */}
                    <button
                        onClick={onLike}
                        className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <Icon name="favorite" size="xs" className="text-white" />
                        <span className="text-white text-sm">{likeCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
