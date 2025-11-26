'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
    isBest?: boolean;
}

export default function RecommandCard({ image, name, description, tags, rating, likeCount = 0, commentCount = 0, isBest = false }: RecommandCardProps) {
    const router = useRouter();

    const handleCommentClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/detail/${encodeURIComponent(name || '')}?tab=review`);
    };

    return (
        <div className="place-list__card border-1 border-gray-200 rounded-xl overflow-hidden mb-4">
            <Link href={`/detail/${encodeURIComponent(name || '')}`} className="flex flex-col gap-4">
                <div className="relative w-full h-72 overflow-hidden">
                    <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 flex items-center justify-center font-medium text-xs w-7.5 h-7.5">
                        <Icon name="star" size="sm" className="text-black -ml-0.5" filled={true} />
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
                  <div className="flex flex-col gap-1.5 pb-6 px-4 relative">
                    {isBest && <span className="best-badge" style={{ top: '-16px' }}>
                        <Icon name="Crown" size="md" color="white"/>
                    </span>}
                    <Text className="font-light text-sm text-gray-500 dark:text-gray-400 text-ellipsis overflow-hidden line-clamp-2">
                        {description}
                    </Text>
                    <Title element="h3" className="text-xl mb-2 text-ellipsis overflow-hidden line-clamp-2">
                        {name}
                    </Title>
                    {/* {rating !== undefined && <StarRating value={rating} max={5} readOnly size="md" />} */}
                    <div className="flex items-center gap-4">
                        <Text className="font-light text-sm text-gray-500 dark:text-gray-400">
                            ❤️ {likeCount}
                        </Text>
                        <span
                            onClick={handleCommentClick}
                            className="cursor-pointer transition-colors"
                        >
                            <Text className="font-light text-sm text-gray-500 dark:text-gray-400">
                                💬 {commentCount}
                            </Text>
                        </span>
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
