'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarRating } from '@/components/molecules';
import { Title, Text, CategoryTag, TagList, type TagCategory, Icon } from '@/components/atoms';

type Tag = {
    label: string;
    category: TagCategory;
};

interface RecommandCardProps {
    name?: string;
    description?: string;
    tags?: Tag[];
    className?: string;
    rating?: number;
    image?: string;
    likeCount?: number;
    commentCount?: number;
}

export default function RecommandCard({ image, name, description, tags, rating, likeCount = 0, commentCount = 0 }: RecommandCardProps) {
    return (
        <div className="place-list__card border-1 border-gray-100 rounded-xl overflow-hidden shadow-lg shadow-gray-100 mb-4">
            <Link href={`/detail/${encodeURIComponent(name || '')}`} className="flex flex-col gap-3">
                <div className="relative w-full h-42 overflow-hidden">
                    <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 flex items-center justify-center font-medium text-sm w-7 h-7">
                        <Icon name="star" size="xs" className="text-black -ml-0.5 mt-0.5" filled={true} />
                        {rating?.toFixed(0)}
                    </div>
                    <Image
                        src={image || ''}
                        alt={name || ''}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div>
                  <div className="flex flex-col gap-1 pb-5 px-4">
                    <Text className="font-light text-xs text-gray-500 dark:text-gray-400 text-ellipsis overflow-hidden line-clamp-2">
                        {description}
                    </Text>
                    <Title element="h3" className="text-lg mb-2 text-ellipsis overflow-hidden line-clamp-2">
                        {name}
                    </Title>
                    {/* {rating !== undefined && <StarRating value={rating} max={5} readOnly size="md" />} */}
                    <div className="flex items-center gap-4">
                        <Text className="font-light text-sm text-gray-500 dark:text-gray-400">
                            ❤️ {likeCount}
                        </Text>
                        <Text className="font-light text-sm text-gray-500 dark:text-gray-400">
                            💬 {commentCount}
                        </Text>
                    </div>
                    {tags && tags.length > 0 && (
                        <TagList gap="sm" className="flex flex-wrap mt-2">
                            {tags.map((tag) => (
                                <CategoryTag
                                    key={tag.label}
                                    category={tag.category}
                                    label={tag.label}
                                    size="sm"
                                />
                            ))}
                        </TagList>
                    )}
                  </div>
                </div>
            </Link>
        </div>
    );
}
