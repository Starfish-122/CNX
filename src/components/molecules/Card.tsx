import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface CardProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    image?: string;
    className?: string;
}

export default function Card({ children, image, className }: CardProps) {
    return (
        <div
            className={clsx('card bg-white rounded-lg shadow-md overflow-hidden w-full', className)}
        >
            {image && (
                <div className="card-header">
                    <Image src={image} alt={title || '카드 이미지'} />
                </div>
            )}
            {children && <div className="card-body p-4">{children}</div>}
        </div>
    );
}
