import React from 'react';
import clsx from 'clsx';
import { Title, Text, TagList, CategoryTag, Icon, type TagCategory } from '@/components/atoms';

type Tag = {
    label: string;
    category: TagCategory;
};

interface DetailCardProps {
    name?: string;
    description?: string;
    image?: string;
    tags?: Tag[];
    className?: string;
    rating?: number;
}

export default function DetailCard({
    name,
    description,
    image,
    tags,
    className,
    rating,
}: DetailCardProps) {
    return (
        <figure className={clsx('card bg-white overflow-hidden w-full', className)}>
            {image && (
                <div className="card-header relative">
                    <img src={image} alt={name} />

                    <div className="absolute top-0 left-0 flex items-center justify-between p-5">
                        <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
                            <Icon name="star" filled size="base" className="text-black" />
                            <Text className="text-black font-semibold">{rating?.toFixed(0)}</Text>
                        </div>
                    </div>
                </div>
            )}
            <figcaption className="card-body p-4">
                <div className="pt-3 pb-5 pl-4">
                    <div className="flex flex-col gap-2">
                        <Text className="text-indigo-900 font-light">{description}</Text>
                        <Title>{name}</Title>
                    </div>
                    <TagList className="mt-4">
                        {tags?.map((tag) => (
                            <CategoryTag
                                key={tag.label}
                                category={tag.category}
                                label={tag.label}
                            />
                        ))}
                    </TagList>
                </div>
            </figcaption>
        </figure>
    );
}
