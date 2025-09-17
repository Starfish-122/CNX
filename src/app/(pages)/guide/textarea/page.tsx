'use client';

import React from 'react';
import Textarea from '@/components/atoms/Textarea';
import GuideLayout from '@/components/templates/GuidePageLayout';
import GuideSection from '@/components/templates/GuideSection';
import ExampleCard from '@/components/molecules/ExampleCard';
import PropsTable from '@/components/molecules/PropsTable';
import CodeTag from '@/components/atoms/CodeTag';

export default function TextareaGuide() {
    return (
        <GuideLayout
            title="📝 Textarea Component"
            description={
                <>
                    <CodeTag>Textarea</CodeTag>은 여러 줄 텍스트 입력을 위한 컴포넌트입니다. <br />
                    <CodeTag>label</CodeTag>, <CodeTag>showResetButton</CodeTag>,{' '}
                    <CodeTag>showCharCount</CodeTag> 기능을 포함하며, <br />
                    필수 입력 유효성 검사와 글자 수 제한 기능을 지원합니다.
                </>
            }
        >
            <GuideSection title="기본 사용">
                <ExampleCard demo={<Textarea />} code={`<Textarea />`} />
            </GuideSection>

            <GuideSection title="사이즈 (size: sm, md, lg, full)">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <Textarea size="sm" placeholder="작은 텍스트 영역" />
                            <Textarea size="md" placeholder="중간 텍스트 영역" />
                            <Textarea size="lg" placeholder="큰 텍스트 영역" />
                            <Textarea size="full" placeholder="전체 너비 텍스트 영역" />
                        </div>
                    }
                    code={`<Textarea size="sm" />
<Textarea size="md" />
<Textarea size="lg" />
<Textarea size="full" />`}
                />
            </GuideSection>

            <GuideSection title="속성 (label, placeholder, rows)">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <Textarea label="메시지" placeholder="메시지를 입력하세요" rows={3} />
                            <Textarea label="설명" placeholder="상세 설명을 입력하세요" rows={5} />
                        </div>
                    }
                    code={`<Textarea label="메시지" placeholder="메시지를 입력하세요" rows={3} />
<Textarea label="설명" placeholder="상세 설명을 입력하세요" rows={5} />`}
                />
            </GuideSection>

            <GuideSection title="상태 (disabled, readonly, required)">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <Textarea disabled placeholder="비활성화된 텍스트 영역" />
                            <Textarea readOnly value="읽기 전용 텍스트 영역입니다" />
                            <Textarea label="필수 입력" required placeholder="필수 입력 필드" />
                            <Textarea
                                label="필수 입력 (값 있음)"
                                required
                                placeholder="필수 입력 필드"
                                value="입력된 값"
                            />
                        </div>
                    }
                    code={`<Textarea disabled />
<Textarea readOnly />
<Textarea label="필수 입력" required />
<Textarea label="필수 입력 (값 있음)" required value="입력된 값" />`}
                />
            </GuideSection>

            <GuideSection title="리셋 버튼">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <Textarea
                                label="리셋 가능"
                                placeholder="입력해보세요"
                                showResetButton
                            />
                        </div>
                    }
                    code={`<Textarea showResetButton />`}
                />
            </GuideSection>

            <GuideSection title="글자 수 표시">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <Textarea
                                label="글자 수 표시"
                                placeholder="입력해보세요"
                                showCharCount
                            />
                            <Textarea
                                label="최대 100자"
                                placeholder="최대 100자까지 입력 가능"
                                maxLength={100}
                                showCharCount
                            />
                        </div>
                    }
                    code={`<Textarea showCharCount />
<Textarea maxLength={100} showCharCount />`}
                />
            </GuideSection>

            <GuideSection title="리사이즈 (resize: none, both, horizontal, vertical)">
                <ExampleCard
                    demo={
                        <div className="flex flex-col gap-4">
                            <Textarea
                                label="리사이즈 없음"
                                placeholder="크기 조절 불가"
                                resize="none"
                            />
                            <Textarea
                                label="양방향 리사이즈"
                                placeholder="가로/세로 모두 조절 가능"
                                resize="both"
                            />
                            <Textarea
                                label="가로만 리사이즈"
                                placeholder="가로만 조절 가능"
                                resize="horizontal"
                            />
                            <Textarea
                                label="세로만 리사이즈"
                                placeholder="세로만 조절 가능"
                                resize="vertical"
                            />
                        </div>
                    }
                    code={`<Textarea resize="none" />
<Textarea resize="both" />
<Textarea resize="horizontal" />
<Textarea resize="vertical" />`}
                />
            </GuideSection>

            <GuideSection title="Props">
                <PropsTable
                    rows={[
                        {
                            prop: 'size',
                            type: `'sm' | 'md' | 'lg' | 'full'`,
                            def: `'md'`,
                            desc: '크기',
                        },
                        { prop: 'label', type: 'string', def: '—', desc: '라벨 텍스트' },
                        { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화' },
                        { prop: 'required', type: 'boolean', def: 'false', desc: '필수 입력' },
                        {
                            prop: 'showResetButton',
                            type: 'boolean',
                            def: 'false',
                            desc: '리셋 버튼 표시 여부',
                        },
                        {
                            prop: 'onReset',
                            type: '() => void',
                            def: '—',
                            desc: '리셋 버튼 클릭 시 호출되는 콜백 (제어형 컴포넌트에서 상태 초기화용)',
                        },
                        {
                            prop: 'showCharCount',
                            type: 'boolean',
                            def: 'false',
                            desc: '글자 수 표시 여부',
                        },
                        {
                            prop: 'resize',
                            type: `'none' | 'both' | 'horizontal' | 'vertical'`,
                            def: `'none'`,
                            desc: '리사이즈 가능 여부',
                        },
                        { prop: 'maxLength', type: 'number', def: '—', desc: '최대 글자 수' },
                        { prop: 'rows', type: 'number', def: '3', desc: '행 수' },
                        { prop: 'cols', type: 'number', def: '—', desc: '열 수' },
                        { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
                    ]}
                />
            </GuideSection>
        </GuideLayout>
    );
}
