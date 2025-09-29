import React from 'react';
import { componentData } from '@/data/componentData';
import Title from '@/components/atoms/Title';
import Text from '@/components/atoms/Text';
import ExampleCard from '@/components/molecules/ExampleCard';
import CodeBlock from '@/components/molecules/CodeBlock';
import PropsTable from '@/components/molecules/PropsTable';
import GuidePageLayout from '@/components/templates/GuidePageLayout';

interface PageProps {
    params: {
        component: string;
    };
}

export default async function ComponentGuidePage({
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
        <GuidePageLayout title={data.title} description={data.description}>
            <div className="space-y-8">
                {/* 헤더 섹션 */}
                {/* <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <Title element="h1" className="mb-2">
                        {data.componentName}
                    </Title>
                    <Text className="text-lg text-gray-600 dark:text-gray-400">
                        {data.description}
                    </Text>
                </div> */}

                {/* 사용법 섹션 */}
                <div className="space-y-4">
                    <Title element="h2" className="text-xl">
                        사용법
                    </Title>
                    <Text className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {data.usage}
                    </Text>
                    {data.usageCode && <CodeBlock code={data.usageCode} title="Code" />}
                </div>

                {/* 예제 섹션 */}
                <div className="space-y-4">
                    <Title element="h2" className="text-xl">
                        예제
                    </Title>
                    <div className="space-y-6">
                        {data.examples.map((example, index) => (
                            <ExampleCard key={index} demo={example.preview} code={example.code} />
                        ))}
                    </div>
                </div>

                {/* Props 섹션 */}
                <div className="space-y-4">
                    <Title element="h2" className="text-xl">
                        Props
                    </Title>
                    <PropsTable props={data.props} />
                </div>

                {/* 주의사항 섹션 */}
                {data.notes && data.notes.length > 0 && (
                    <div className="space-y-4">
                        <Title element="h2" className="text-xl">
                            주의사항
                        </Title>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                            <ul className="space-y-2">
                                {data.notes.map((note, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                                            ⚠️
                                        </span>
                                        <span className="text-amber-800 dark:text-amber-200">
                                            {note}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </GuidePageLayout>
    );
}
