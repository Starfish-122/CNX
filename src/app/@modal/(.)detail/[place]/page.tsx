'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { DetailCard } from '@/components/organisms';
import { LoadingState, ErrorState } from '@/components/atoms';
import { usePlaceDetail } from '@/hooks/usePlaceDetail';
import { useDetailLoading } from '@/contexts/DetailLoadingContext';

const PANEL_TRANSITION_MS = 350;

export default function PlaceDetailModal(): React.JSX.Element {
    const params = useParams();
    const router = useRouter();
    const placeName = params.place as string;
    const { placeData, loading, error } = usePlaceDetail(placeName);
    const { stopDetailLoading } = useDetailLoading();

    const [isVisible, setIsVisible] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClose = useCallback(() => {
        if (closeTimerRef.current) return;

        setIsVisible(false);
        closeTimerRef.current = setTimeout(() => {
            router.back();
        }, PANEL_TRANSITION_MS);
    }, [router]);

    // ESC 키로 모달 닫기 + 진입 애니메이션
    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true));

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';

            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
        };
    }, [handleClose]);

    useEffect(() => {
        if (!loading) {
            stopDetailLoading();
        }
    }, [loading, stopDetailLoading]);

    const panelClassName = clsx(
        'modal__layout relative z-10 h-full  w-full bg-white ',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    );

    const renderPanelContent = () => {
        if (loading) {
            return (
                <div className="flex h-full items-center justify-center p-8">
                    <LoadingState />
                </div>
            );
        }

        if (error || !placeData) {
            return (
                <div className="flex flex-col gap-4 p-8">
                    <ErrorState message={error || '요청하신 맛집의 정보가 없습니다.'} />
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                        닫기
                    </button>
                </div>
            );
        }

        return <DetailCard data={placeData} className="detail__card " onClose={handleClose} />;
    };

    return (
        <div className="modal fixed inset-0 z-50">
            <div className="absolute inset-0" onClick={handleClose} aria-label="모달 닫기" />

            <div className="flex h-full w-full items-stretch justify-end">
                <div className={panelClassName} onClick={(e) => e.stopPropagation()}>
                    {renderPanelContent()}
                </div>
            </div>
        </div>
    );
}
