'use client';

import React from 'react';
import Link from 'next/link';
import { StarRating } from '@/components/molecules';
import { Title, Text, CategoryTag, TagList, type TagCategory } from '@/components/atoms';
import {
    formatDistance,
    estimateWalkingTime,
    estimateDrivingTime,
    formatWalkingTime,
    formatDrivingTime,
} from '@/utils/helpers';

type Tag = {
    label: string;
    category: TagCategory;
};

interface PlaceCardProps {
    name?: string;
    description?: string;
    tags?: Tag[];
    className?: string;
    rating?: number;
    location?: string;
    status?: string;
    partySize?: string;
    partnered?: boolean;
    distance?: number; // 회사로부터의 거리 (미터)
}

export default function PlaceCard({ name, description, tags, rating, distance }: PlaceCardProps) {
    return (
        <div className="place-list__card px-6 py-6 border-1 border-gray-100 rounded-lg">
            <Link
                href={`/detail/${encodeURIComponent(name || '')}`}
                className="flex flex-col gap-4"
            >
                <TagList gap="sm">
                    {tags?.map((tag) => (
                        <CategoryTag
                            key={tag.label}
                            category={tag.category}
                            label={tag.label}
                            size="sm"
                        />
                    ))}
                </TagList>
                <div>
                    <div className="flex items-center gap-2">
                        <Title element="h3" className="text-lg">
                            {name}
                        </Title>
                        {distance !== undefined &&
                            (() => {
                                const walkingTime = estimateWalkingTime(distance);
                                const isDriving = walkingTime > 30;

                                return (
                                    <Text className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                        {isDriving ? (
                                            <>
                                                🚗 {formatDistance(distance)} · 차량{' '}
                                                {formatDrivingTime(estimateDrivingTime(distance))}
                                            </>
                                        ) : (
                                            <>
                                                🚶 {formatDistance(distance)} · 도보{' '}
                                                {formatWalkingTime(walkingTime)}
                                            </>
                                        )}
                                    </Text>
                                );
                            })()}
                    </div>
                    <Text className="font-light text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </Text>
                </div>
                {rating !== undefined && <StarRating value={rating} max={5} readOnly size="md" />}
            </Link>
        </div>
    );
}
