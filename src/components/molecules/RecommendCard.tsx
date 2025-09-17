import React from 'react';
import Card from './Card';
import Title from '../atoms/Title'; 
import Text from '../atoms/Text';
import TagList from '../atoms/TagList';
import CategoryTag from '../atoms/CategoryTag';
import { TagCategory } from '../atoms/categoryColors';
import clsx from 'clsx';
import Icon from '../atoms/Icon';

type Tag = {
  label: string;
  category: TagCategory;
}

interface RecommendCardProps {
  name?: string;
  description?: string;
  image?: string;
  tags?: Tag[];
  className?: string;
  rating?: number;
}

export default function RecommendCard({ name, description, image, tags, className, rating }: RecommendCardProps) {
  return (
    <Card image={image} className={clsx("relative rounded-none shadow-none", className)}>
      <div className="pt-3 pb-5 pl-4">
        <div className="flex flex-col gap-2">
          <Text className="text-indigo-900 font-light">{description}</Text>
          <Title>{name}</Title>
        </div>
        <TagList className="mt-4">
          {tags?.map((tag) => (
            <CategoryTag key={tag.label} category={tag.category} label={tag.label} />
          ))}
        </TagList>
      </div>
      <div className="absolute top-0 left-0 flex items-center justify-between p-5">
        <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
          <Icon name="star" filled size="base" className="text-black" />
          <Text className="text-black font-semibold">{rating?.toFixed(0)}</Text>
        </div>
      </div>
    </Card>
  );
}