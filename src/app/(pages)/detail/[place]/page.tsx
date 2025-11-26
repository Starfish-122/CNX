'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DetailCard } from '@/components/organisms';
import { LoadingState, ErrorState } from '@/components/atoms';
import { usePlaceDetail } from '@/hooks/usePlaceDetail';
import { useDetailLoading } from '@/contexts/DetailLoadingContext';

export default function PlaceDetailPage(): React.JSX.Element {
    const params = useParams();
    const placeName = params.place as string;
    const { placeData, loading, error } = usePlaceDetail(placeName);
    const { stopDetailLoading } = useDetailLoading();

    useEffect(() => {
        if (!loading) {
            stopDetailLoading();
        }
    }, [loading, stopDetailLoading]);

    if (loading) {
        return <LoadingState />;
    }

    if (error || !placeData) {
        return <ErrorState message={error || '요청하신 맛집의 정보가 없습니다.'} />;
    }

    return (
        <div className="detail min-h-[100vh] p-6">
            <DetailCard data={placeData} className="detail__card" />
        </div>
    );
}
