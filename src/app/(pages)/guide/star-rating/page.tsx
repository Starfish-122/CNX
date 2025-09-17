'use client';

import React from 'react';
import Text from '@/components/atoms/Text';
import StarRating from '@/components/molecules/StarRating';
import GuideLayout from '@/components/templates/GuidePageLayout';
import GuideSection from '@/components/templates/GuideSection';
import ExampleCard from '@/components/molecules/ExampleCard';
import PropsTable from '@/components/molecules/PropsTable';
import CodeTag from '@/components/atoms/CodeTag';

export default function StarRatingGuide(): React.JSX.Element {
    const [ratingDefault, setRatingDefault] = React.useState(3.5);
    const [ratingInteger, setRatingInteger] = React.useState(4);
    const [ratingSm, setRatingSm] = React.useState(4);
    const [ratingMd, setRatingMd] = React.useState(4);
    const [ratingLg, setRatingLg] = React.useState(4);

    return (
        <GuideLayout
            title="⭐ StarRating Component"
            description={
                <>
                    <CodeTag>StarRating</CodeTag>은 0.5 단위 선택을 지원하는 별점 컴포넌트입니다.
                    키보드 및 마우스(호버/클릭) 인터랙션을 지원하며,&nbsp;
                    <CodeTag>className</CodeTag>으로 Tailwind 스타일을 오버라이드할 수 있습니다.
                </>
            }
        >
            {/* 섹션 1: 기본 사용 */}
            <GuideSection title="기본 사용">
                <ExampleCard
                    demo={
                        <div className="flex items-center gap-4">
                            <StarRating value={ratingDefault} onChange={setRatingDefault} />
                            <Text className="text-sm text-gray-600 dark:text-gray-400">
                                현재 값: {ratingDefault}
                            </Text>
                        </div>
                    }
                    code={`const [rating, setRating] = useState(3.5);
<StarRating value={rating} onChange={setRating} />`}
                />
            </GuideSection>

            {/* 섹션 2: 정수 단위만 */}
            <GuideSection title="정수 단위만 (allowHalf = false)">
                <ExampleCard
                    demo={
                        <div className="flex items-center gap-4">
                            <StarRating
                                value={ratingInteger}
                                onChange={setRatingInteger}
                                allowHalf={false}
                            />
                            <Text className="text-sm text-gray-600 dark:text-gray-400">
                                현재 값: {ratingInteger}
                            </Text>
                        </div>
                    }
                    code={`<StarRating value={rating} onChange={setRating} allowHalf={false} />`}
                />
            </GuideSection>

            {/* 섹션 3: 읽기 전용 */}
            <GuideSection title="읽기 전용 (readOnly)">
                <ExampleCard
                    demo={<StarRating value={2.5} readOnly />}
                    code={`<StarRating value={2.5} readOnly />`}
                />
            </GuideSection>

            {/* 섹션 4: 사이즈 */}
            <GuideSection title="사이즈 (size: sm, md, lg)">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <StarRating value={ratingSm} size="sm" onChange={setRatingSm} />
                            <StarRating value={ratingMd} size="md" onChange={setRatingMd} />
                            <StarRating value={ratingLg} size="lg" onChange={setRatingLg} />
                        </div>
                    }
                    code={`<StarRating value={rating} size="lg" onChange={setRating} />`}
                />
            </GuideSection>

            {/* 섹션 5: 비활성화 */}
            <GuideSection title="비활성화 (disabled)">
                <ExampleCard
                    demo={<StarRating value={4} disabled />}
                    code={`<StarRating value={4} disabled />`}
                />
            </GuideSection>

            {/* 섹션 6: 스타일 오버라이드 */}
            <GuideSection title="스타일 오버라이드 (간격/정렬)">
                <ExampleCard
                    demo={<StarRating value={4.5} className="gap-1.5" />}
                    code={`<StarRating value={4.5} className="gap-1.5" />`}
                />
            </GuideSection>

            {/* 섹션 7: 접근성 팁 */}
            <GuideSection title="접근성 팁">
                <ExampleCard
                    demo={
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                키보드: <CodeTag>←/→/↑/↓</CodeTag>로 증감, <CodeTag>Home</CodeTag>
                                =0, <CodeTag>End</CodeTag>=max
                            </li>
                            <li>마우스: 호버 시 임시 반영(프리뷰), 클릭으로 확정</li>
                        </ul>
                    }
                />
            </GuideSection>

            {/* 섹션 8: Props 표 */}
            <GuideSection title="Props">
                <PropsTable
                    rows={[
                        {
                            prop: 'value',
                            type: 'number',
                            def: '—',
                            desc: '현재 별점 (0 ~ max), 0.5 단위 지원',
                        },
                        { prop: 'max', type: 'number', def: '5', desc: '최대 별 개수' },
                        {
                            prop: 'readOnly',
                            type: 'boolean',
                            def: 'false',
                            desc: '읽기 전용 (입력 비활성화)',
                        },
                        { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화' },
                        {
                            prop: 'size',
                            type: `'sm' | 'md' | 'lg'`,
                            def: `'md'`,
                            desc: '아이콘 크기 프리셋',
                        },
                        {
                            prop: 'allowHalf',
                            type: 'boolean',
                            def: 'true',
                            desc: '반개 단위 허용 여부부',
                        },
                        {
                            prop: 'onChange',
                            type: '(nextValue: number) => void',
                            def: '—',
                            desc: '값 변경 시 호출되는 콜백함수',
                        },
                        { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
                        {
                            prop: 'ariaLabel',
                            type: 'string',
                            def: `'별점'`,
                            desc: '스크린 리더용 레이블',
                        },
                    ]}
                />
            </GuideSection>
        </GuideLayout>
    );
}
