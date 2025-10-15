'use client';

import { Icon } from '@/components/atoms';

const TABS = [
    {
        label: '한강로길',
        value: 'hangang',
    },
    {
        label: '용리단길',
        value: 'yongri',
    },
    {
        label: '아모레 / LS',
        value: 'amore-ls',
    },
    { label: '래미안', value: 'raemian' },
    { label: '아이파크몰', value: 'ipark' },
    { label: '용산철길', value: 'yongsan' },
];
export default function Tab() {
    return (
        <div className="container mx-auto flex justify-center align-middle gap-2.5 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white">
            <div className="tab w-full xl:w-1/2 ">
                <div className="grid grid-cols-3 md:grid-cols-6 w-full">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            className="tab__button px-3 py-3 md:px-4 md:py-4 flex items-center justify-center hover:bg-blue-500 hover:font-bold text-sm md:text-base cursor-pointer"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <p className="flex items-center justify-center px-2.5">
                <Icon name="art_track" className="hover:bg-blue-500" />
                <Icon name="list" />
            </p>
        </div>
    );
}
