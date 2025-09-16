'use client';
import Image from 'next/image';
import Tab from '@/components/common/Tab';

export default function MapPage(): React.JSX.Element {
    return (
        <div className="relative">
            <Image src="/sample-map.jpg" alt="map" width={1000} height={700} className="w-full" />
            <Tab />
        </div>
    );
}
