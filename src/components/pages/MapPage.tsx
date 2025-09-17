'use client';

import Image from 'next/image';
import Tab from '@/components/molecules/Tab';

export default function MapPage(): React.JSX.Element {
    return (
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
    );
}
