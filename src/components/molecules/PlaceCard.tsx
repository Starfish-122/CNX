'use client';

import React from 'react';
import Link from 'next/link';
import { StarRating } from '@/components/molecules';
import { TagCategory } from '@/components/atoms/categoryColors';
import { Title, Text, CategoryTag, TagList } from '@/components/atoms';

type Tag = {
  label: string;
  category: TagCategory;
}

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
}

export default function PlaceCard({ name, description, tags, rating }: PlaceCardProps) {
  return (
    <div className="place-list__card">
      <Link href={`/place/${name}`}>
        <TagList>
          {tags?.map((tag) => (
            <CategoryTag key={tag.label} category={tag.category} label={tag.label} size="sm" />
          ))}
        </TagList>
        <Title element="h3" className="text-lg">{name}</Title>
        <Text>{description}</Text>
        {rating !== undefined && (
          <StarRating value={rating} max={5} readOnly size="md" />
        )}
      </Link>
    </div>
  );
}
