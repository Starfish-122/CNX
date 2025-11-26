'use client';

import { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { RecommandCard, SkeletonCard } from '@/components/molecules';
import { Title, type TagCategory } from '@/components/atoms';
import { type LocationKey } from '@/utils/constants';
import type { NotionPlace } from '@/types';
import { getLikeCount, getCommentCount } from '@/utils/services/firebase';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Tag 타입 정의
type Tag = {
    label: string;
    category: TagCategory;
};

// 평점 필터링 함수

interface NotionItemWithDistance extends NotionPlace {
    distance?: number;
    likeCount?: number;
    commentCount?: number;
}

interface PlaceListProps {
    className?: string;
    sortByDistance?: boolean;
    sortByRating?: boolean;
    selectedLocation?: LocationKey | null;
}

export default function PlaceList({
    className,
}: PlaceListProps): React.JSX.Element {
    const [notionData, setNotionData] = useState<NotionItemWithDistance[]>([]);

    // 좋아요 수 기준 상위 10개 선택
    const topLikedPlaces = useMemo(() => {
        return [...notionData]
            .sort((a, b) => {
                const likeCountA = a.likeCount ?? 0;
                const likeCountB = b.likeCount ?? 0;
                return likeCountB - likeCountA; // 좋아요 많은 순으로 내림차순 정렬
            })
            .slice(0, 10); // 상위 10개만 선택
    }, [notionData]);


    useEffect(() => {
        const fetchNotionDataWithLikes = async () => {
            try {
                const response = await fetch('/api/notion?pageSize=100');
                const data = await response.json();
                console.log('[RECOMMAND LIST - NOTION DATA]', data);
                
                if (data.ok) {
                    // 각 장소의 좋아요 수와 댓글 수를 가져오기
                    const itemsWithLikesAndComments = await Promise.all(
                        data.items.map(async (item: NotionPlace) => {
                            const [likeCount, commentCount] = await Promise.all([
                                getLikeCount(item.name),
                                getCommentCount(item.name),
                            ]);
                            return {
                                ...item,
                                likeCount,
                                commentCount,
                            };
                        })
                    );
                    
                    console.log('[RECOMMAND LIST - ITEMS WITH LIKES AND COMMENTS]', itemsWithLikesAndComments);
                    setNotionData(itemsWithLikesAndComments);
                } else {
                    console.error('[NOTION API ERROR]', data.error || data);
                }
            } catch (error) {
                console.error('Failed to fetch notion data:', error);
            }
        };
        
        fetchNotionDataWithLikes();
    }, []);

    return (
        <div className={`place-list container mx-auto my-12 px-4 ${className || ''}`}>
            <Title element="h2" className="mb-6">
              추천 맛집
            </Title>
            
            <div className="relative">
                {/* 커스텀 네비게이션 버튼 */}
                <button
                    className="swiper-button-prev-custom absolute -top-10 right-12 z-10 w-10 h-10 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="이전 페이지"
                    tabIndex={0}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button
                    className="swiper-button-next-custom absolute -top-10 right-0 z-10 w-10 h-10 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="다음 페이지"
                    tabIndex={0}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{
                        type: 'progressbar',
                        clickable: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1536: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="recommand-swiper"
                    style={{ alignItems: 'stretch' }}
                >
                    {topLikedPlaces.map((item) => {
                        const tags: Tag[] = [];
                        if (item.location) {
                            // '인터넷' → '온라인'으로 표시
                            const displayLocation =
                                item.location === '인터넷' ? '온라인' : item.location;
                            tags.push({ label: displayLocation, category: 'location' });
                        }
                        if (item.status) {
                            tags.push({ label: item.status, category: 'status' });
                        }
                        if (item.partySize) {
                            tags.push({ label: item.partySize, category: 'mood' });
                        }
                        if (item.partnered) {
                            tags.push({ label: '임직원 할인', category: 'service' });
                        }
                        const image = item.image || '';
                        return (
                            <SwiperSlide key={item.id} className={'h-full'}>
                                <RecommandCard
                                    name={item.name || '이름 없음'}
                                    description={item.summary || ''}
                                    tags={tags}
                                    rating={item.score ?? undefined}
                                    image={image}
                                    likeCount={item.likeCount ?? 0}
                                    commentCount={item.commentCount ?? 0}
                                    isBest={!!item.best}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}
