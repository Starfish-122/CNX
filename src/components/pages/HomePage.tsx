'use client';

import Image from 'next/image';
import { Tab } from '@/components/molecules';

export default function HomePage() {
    return (
        <>
            <h2 className="flex items-center justify-center bg-amber-50 my-5 py-5 rounded-lg">
                카드
            </h2>
            <div className="min-h-[100vh]">
                <div className="relative">
                    <Image
                        src="/sample-map.jpg"
                        alt="지도 이미지"
                        width={1000}
                        height={700}
                        className="w-full h-[80vh] md:h-[70vh] lg:h-[60vh] object-cover"
                        priority
                    />
                    <Tab />
                </div>
            </div>
            <h2 className="flex items-center justify-center bg-amber-50 my-5 py-5 rounded-lg">
                리스트
            </h2>
        </>
    );
}
