'use client';

import React from 'react';
import Image from 'next/image';
import { Icon, CategoryTag, TagList, ActionButton } from '@/components/atoms';
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
    isLiked?: boolean;
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
    isLiked = false,
    onClose,
    onShare,
    onLike,
}: DetailHeaderProps) {
    return (
        <div className="relative h-72 w-full overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" priority />
            {/* 대각선 스트라이프 딤 오버레이 */}
            <div
                className="absolute inset-0 z-0 pointer-events-none bg-[repeating-linear-gradient(135deg,_rgba(0,0,0,0.3)_0px,_rgba(0,0,0,0.3)_1px,_transparent_1px,_transparent_3px)]"
            />

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
            <TagList gap="sm" wrap className="absolute top-6 left-4 max-w-[calc(100%-8rem)]">
                {tags.slice(0, 3).map((tag, index) => (
                    <CategoryTag
                        key={index}
                        label={tag.label}
                        category={tag.category}
                        size="sm"
                        className="shadow-sm"
                    />
                ))}
            </TagList>

            {/* 하단 정보 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
                {/* 설명 */}
                <p className="text-sm text-gray-200 font-light">{description}</p>

                {/* 제목 */}
                <h2 className="text-3xl font-bold text-white leading-tight">{name}</h2>

                {/* 평점 및 액션 버튼 */}
                <div className="flex gap-2 items-center flex-wrap">
                    {/* 평점 */}
                    <ActionButton variant="info">
                        <StarRating value={rating} size="sm" readOnly theme="dark" />
                        <span className="font-medium">{rating.toFixed(1)}</span>
                    </ActionButton>

                    {/* 리뷰 수 */}
                    {reviewCount > 0 && (
                        <ActionButton variant="info" icon="chat" label={reviewCount} />
                    )}

                    {/* 공유 버튼 */}
                    <ActionButton variant="button" icon="share" label="공유" onClick={onShare} />

                    {/* 좋아요 버튼 */}
                    <ActionButton
                        variant="button"
                        icon="favorite"
                        label={likeCount}
                        onClick={onLike}
                        isActive={isLiked}
                    />
                </div>
            </div>
        </div>
    );
}
