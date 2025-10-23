'use client';

import { CustomDetailCard } from '@/components/molecules';

export default function DetailPage(): React.JSX.Element {
    return (
        <div className="detail min-h-[100vh]">
            <CustomDetailCard
                className="detail__card"
                name="카드 제목"
                description="카드 내용입니다."
                image="/images/image1.png"
                tags={[
                    { label: '태그1', category: 'mood' },
                    { label: '태그2', category: 'location' },
                ]}
                rating={4.5}
            />
        </div>
    );
}
