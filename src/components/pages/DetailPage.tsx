'use client';

import Card from '@/components/molecules/Card';
import Tag from '@/components/atoms/Tag';
import TagList from '@/components/atoms/TagList';
import CategoryTag from '@/components/atoms/CategoryTag';
import CustomDetailCard from '@/components/molecules/CustomDetailCard';

export default function DetailPage(): React.JSX.Element {
    return (
        <div className="detail min-h-[100vh]">
            <CustomDetailCard
                className="detail__card"
                name="카드 제목"
                description="카드 내용입니다."
                image="/images/image1.png"
                tags={[
                    { label: '태그1', category: 'Mood' },
                    { label: '태그2', category: 'Location' },
                ]}
                rating={4.5}
            />
        </div>
    );
}
