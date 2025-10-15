import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/atoms';
import { TagCategory } from '@/components/atoms/categoryColors';
import clsx from 'clsx';

type Tag = {
    label: string;
    category: TagCategory;
};

interface CustomDetailCardProps {
    name?: string;
    description?: string;
    image?: string;
    tags?: Tag[];
    className?: string;
    rating?: number;
}

export default function CustomDetailCard({
    name,
    description,
    image,
    tags,
    className,
    rating,
}: CustomDetailCardProps) {
    return (
        <div
            className={clsx(
                'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
                className
            )}
        >
            {image && (
                <div className="relative">
                    <Image
                        src={image}
                        alt={name || ''}
                        width={400}
                        height={192}
                        className="w-full h-50 object-cover"
                    />

                    {rating && (
                        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                            <Icon name="star" filled size="sm" className="text-yellow-500" />
                            <span className="text-xs font-semibold text-gray-900">
                                {rating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className="p-4">
                <div className="space-y-2">
                    <p className="text-gray-500 text-sm font-light">{description}</p>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{name}</h3>
                </div>

                {tags && tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag.label} className="text-gray-600 text-sm">
                                #{tag.label}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
