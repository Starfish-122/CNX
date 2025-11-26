import { useMemo, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Icon } from '@/components/atoms';
import { getEffectiveRating } from '@/utils/helpers';
import type { NotionPlace } from '@/types';

interface OnlineListProps {
    places: NotionPlace[];
    className?: string;
}

export default function OnlineList({ places, className }: OnlineListProps) {
    const [isOpen, setIsOpen] = useState(false);
    const items = useMemo(() => {
        return [...places]
            .sort((a, b) => {
                const aScore = getEffectiveRating(a) ?? 0;
                const bScore = getEffectiveRating(b) ?? 0;
                if (bScore !== aScore) return bScore - aScore;
                return (a.name || '').localeCompare(b.name || '');
            })
            .slice(0, 6);
    }, [places]);

    if (items.length === 0) return null;

    const containerClass = clsx(
        'online-cloud rounded-[32px] rounded-br-none rounded-bl-none bg-white/80 px-5 shadow-[0_-25px_60px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-[max-height] duration-500 ease-out',
        isOpen ? 'py-6 max-h-auto' : 'py-3 max-h-[76px] cursor-pointer',
        className
    );

    const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleContainerClick = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    return (
        <div className={containerClass} onClick={handleContainerClick}>
            <div className="relative">
                <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-inner shadow-white/50 transition hover:bg-white"
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                >
                    <span>온라인 리스트</span>
                    <Icon name={isOpen ? 'expand_less' : 'expand_more'} size="sm" />
                </button>
                <div
                    className={clsx(
                        'flex flex-col gap-3 overflow-hidden transition-all duration-500 ease-out',
                        isOpen
                            ? 'mt-3 max-h-auto opacity-100 translate-y-0'
                            : 'mt-0 max-h-0 opacity-0 translate-y-4 pointer-events-none'
                    )}
                >
                    {items.map((place) => {
                        const rating = getEffectiveRating(place);
                        return (
                            <Link
                                key={place.id}
                                href={`/detail/${encodeURIComponent(place.name || '')}`}
                                className="flex items-center gap-3 rounded-[999px] bg-white/90 px-4 py-2 shadow-inner shadow-white/40 ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:bg-white"
                            >
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                                        {place.name || '이름 없음'}
                                    </p>
                                    {place.summary && (
                                        <p className="text-xs text-slate-500 line-clamp-1">
                                            {place.summary}
                                        </p>
                                    )}
                                </div>
                                {rating !== null && rating !== undefined && (
                                    <span className="text-xs font-bold text-blue-600">
                                        {rating.toFixed(1)}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

