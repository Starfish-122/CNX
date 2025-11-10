'use client';

import React from 'react';
import { Title, Text, TagList } from '@/components/atoms';

interface PlaceCardProps {
  description?: string;
  className?: string;
  location?: string;
  status?: string;
  partySize?: string;
  partnered?: boolean;
}

export default function PlaceCard({ description }: PlaceCardProps) {
  return (    
    <div className="place-list__card px-6 py-6 border-1 animate-pulse border-gray-100 rounded-lg">
      <div className="flex flex-col gap-4">
        <TagList gap="sm">
          <div className="h-6 w-16 bg-gray-500 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-500 rounded-full"></div>
        </TagList>
        <div>
          <div className="flex items-center gap-2">
            <Title element="h3" className="text-lg w-[30%] h-[1.75rem] bg-gray-500"> </Title>
            <Text className="font-light text-sm text-gray-500 dark:text-gray-400">{description}</Text>
          </div>
          <Text className="w-[50%] h-[1.25rem] mt-1 bg-gray-500">{description}</Text>
        </div>
        <div>
          <div className="w-[10%] h-[1.25rem] bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
}
