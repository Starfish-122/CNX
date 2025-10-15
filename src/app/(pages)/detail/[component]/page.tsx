import React from 'react';
import { componentData } from '@/data/componentData';
import DetailPageLayout from '@/components/templates/DetailPageLayout';

interface PageProps {
    params: Promise<{
        component: string;
    }>;
}

export default async function ComponentDetailPage({
    params,
}: PageProps): Promise<React.JSX.Element> {
    const { component: componentName } = await params;
    const data = componentData[componentName as keyof typeof componentData];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        컴포넌트를 찾을 수 없습니다
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        요청하신 컴포넌트의 상세 정보가 없습니다.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <DetailPageLayout title={data.title} description={data.description}>
            <div className="space-y-8">
                <h2 className="text-xl font-semibold mb-3">{data.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                    {data.description}
                </p>
            </div>
        </DetailPageLayout>
    );
}
