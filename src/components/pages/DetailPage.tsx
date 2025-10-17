'use client';

import  { CustomDetailCard, PlaceList } from '@/components/molecules';

export default function DetailPage(): React.JSX.Element {
    return (
        <div className="detail min-h-[100vh]">
            <PlaceList />
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
