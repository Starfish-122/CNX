/**
 * 공통 컴포넌트 타입 정의
 */

import type { TagCategory } from '@/components/atoms/categoryColors';
import type { NotionPlace } from './notion';

// ============ Tag Types ============
export type PlaceTag = {
    label: string;
    category: TagCategory;
};

export type Tag = {
    label: string;
    category: TagCategory;
};

// ============ Tab Types ============
export type TabType = 'info' | 'menu' | 'review';

// ============ DetailCard Types ============
export interface DetailCardProps {
    data?: NotionPlace | null;
    name?: string;
    description?: string;
    image?: string;
    copyright?: string;
    tags?: PlaceTag[];
    rating?: number;
    reviewCount?: number;
    likeCount?: number;
    className?: string;
    onClose?: () => void;
}

// ============ Comment Types ============
export interface Comment {
    id: string;
    author: string;
    date: string;
    content: string;
    password: string;
    createdAt?: Date;
}
