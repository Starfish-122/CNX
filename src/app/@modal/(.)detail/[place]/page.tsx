'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DetailCard } from '@/components/organisms';
import { LoadingState, ErrorState } from '@/components/atoms';
import { usePlaceDetail } from '@/hooks/usePlaceDetail';

export default function PlaceDetailModal(): React.JSX.Element {
    const params = useParams();
    const router = useRouter();
    const placeName = params.place as string;
    const { placeData, loading, error } = usePlaceDetail(placeName);

    const handleClose = () => {
        router.back();
    };

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                router.back();
            }
        };

        document.addEventListener('keydown', handleEscape);
        // 모달이 열릴 때 body 스크롤 막기
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [router]);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
                <div className="bg-white rounded-lg p-8 animate-scale-in">
                    <LoadingState />
                </div>
            </div>
        );
    }

    if (error || !placeData) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
                {/* 배경 클릭 시 닫기 */}
                <div className="absolute inset-0" onClick={handleClose} aria-label="모달 닫기" />
                <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-scale-in">
                    <ErrorState message={error || '요청하신 맛집의 정보가 없습니다.'} />
                    <button
                        onClick={handleClose}
                        className="mt-4 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        닫기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal fixed inset-0 z-50  ">
            {/* 배경 클릭 시 닫기 */}
            <div className="absolute inset-0" onClick={handleClose} aria-label="모달 닫기" />

            <div className="modal__layout " onClick={(e) => e.stopPropagation()}>
                <DetailCard
                    data={placeData}
                    className="detail__card h-full max-h-[90vh] overflow-y-auto"
                    onClose={handleClose}
                />
            </div>
        </div>
    );
}
