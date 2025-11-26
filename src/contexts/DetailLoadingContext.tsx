'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface DetailLoadingContextValue {
    isDetailLoading: boolean;
    startDetailLoading: () => void;
    stopDetailLoading: () => void;
}

const DetailLoadingContext = createContext<DetailLoadingContextValue | null>(null);

export function DetailLoadingProvider({ children }: { children: React.ReactNode }) {
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    const startDetailLoading = useCallback(() => setIsDetailLoading(true), []);
    const stopDetailLoading = useCallback(() => setIsDetailLoading(false), []);

    const value = useMemo(
        () => ({
            isDetailLoading,
            startDetailLoading,
            stopDetailLoading,
        }),
        [isDetailLoading, startDetailLoading, stopDetailLoading]
    );

    return <DetailLoadingContext.Provider value={value}>{children}</DetailLoadingContext.Provider>;
}

export function useDetailLoading() {
    const context = useContext(DetailLoadingContext);
    if (!context) {
        throw new Error('useDetailLoading는 DetailLoadingProvider 내에서만 사용할 수 있습니다.');
    }
    return context;
}
