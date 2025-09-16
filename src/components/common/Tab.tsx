'use client';

import Icon from '../base/Icon';

const TABS = [
    {
        label: '한강로길',
        value: '',
    },
    {
        label: '용리단길',
        value: '',
    },
    {
        label: '아모레 / LS',
        value: '',
    },
    { label: '래미안', value: '' },
    { label: '아이파크몰', value: '' },
    { label: '용산철길', value: '' },
];
export default function Tab() {
    return (
        <div className="container mx-auto flex justify-center align-middle gap-2.5 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white">
            <div className="tab flex w-full md:w-1/2">
                {TABS.map((tab) => (
                    <button
                        key={tab.value}
                        className="tab__button px-5 py-5 flex items-center justify-center flex-1/6 hover:bg-blue-500 hover:font-bold"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <p className="flex items-center justify-center px-2.5">
                <Icon name="art_track" className="hover:bg-blue-500" />
                <Icon name="list" />
            </p>
        </div>
    );
}
