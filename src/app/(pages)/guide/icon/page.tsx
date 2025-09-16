'use client';
import React from 'react';
import Icon from '@/components/base/Icon';
import { GuideLayout, GuideSection, ExampleCard, PropsTable, CodeTag } from '@/components/templates/guide';

export default function IconGuidePage() {
    return (
        <>
            <GuideLayout
                title="Icon Component"
                description={
                    <>
                        <CodeTag>Icon</CodeTag> 컴포넌트는 Google Material Icons/Symbols를 사용하여
                        아이콘을 표시합니다.
                        <br />
                        다양한 크기와 색상, 스타일을 지원하며 클릭 이벤트도 처리할 수 있습니다.
                    </>
                }
            >
                <GuideSection title="기본 사용">
                    <ExampleCard
                        demo={
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                    <Icon name="search" text="기본" showText />
                                </div>
                                <div className="flex flex-col items-center">
                                    <Icon name="favorite" text="채워짐" filled showText />
                                </div>
                            </div>
                        }
                        code={`<Icon name="search" />
<Icon name="favorite" size="lg" filled />
`}
                    />
                </GuideSection>

                <GuideSection title="크기">
                    <ExampleCard
                        demo={
                            <div className="flex items-center gap-4">
                                <div className="flex items-end gap-4">
                                    <div className="flex flex-col items-center">
                                        <Icon name="search" size="xs" text="xs" showText />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Icon name="search" size="sm" text="sm" showText />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Icon name="search" size="md" text="md (기본)" showText />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Icon name="search" size="lg" text="lg" showText />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Icon name="search" size="xl" text="xl" showText />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Icon name="search" size="xxl" text="xxl" showText />
                                    </div>
                                </div>
                            </div>
                        }
                        code={`<Icon name="search" size="xs" />`}
                    />
                </GuideSection>

                <GuideSection title="텍스트 사용">
                    <ExampleCard
                        demo={
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                    <Icon
                                        name="favorite"
                                        color="text-red-500"
                                        text="색상 적용"
                                        showText
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <Icon
                                        name="favorite"
                                        color="text-teal-500"
                                        text="텍스트 색상 적용"
                                        textColor="text-indigo-500"
                                        showText
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <Icon name="favorite" text="가로 정렬" horizontal showText />
                                </div>
                            </div>
                        }
                        code={`<Icon name="favorite" color="text-red-500" text="색상 적용" showText />
<Icon name="favorite" color="text-teal-500" text="텍스트 색상 적용" textColor="text-indigo-500" showText />
<Icon name="favorite" text="가로 정렬" horizontal showText />`}
                    />
                </GuideSection>

                <GuideSection title="클릭 가능한 아이콘">
                    <ExampleCard
                        demo={
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center">
                                    <Icon
                                        name="thumb_up"
                                        clickable
                                        onClick={() => alert('좋아요!')}
                                    />
                                    <p className="mt-2 text-sm text-gray-700">클릭 해보세요</p>
                                </div>
                            </div>
                        }
                        code={`<Icon 
  name="thumb_up" 
  clickable 
  onClick={() => alert('좋아요!')} 
/>`}
                    />
                </GuideSection>

                <PropsTable
                    rows={[
                        {
                            prop: 'name',
                            type: 'string',
                            def: '—',
                            desc: '아이콘 이름 (Google Material Icons)',
                        },
                        {
                            prop: 'size',
                            type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`,
                            def: `'md'`,
                            desc: '아이콘 크기',
                        },
                        {
                            prop: 'filled',
                            type: 'boolean',
                            def: 'false',
                            desc: '채워진 스타일 여부',
                        },
                        {
                            prop: 'color',
                            type: 'string',
                            def: 'text-gray-700',
                            desc: '테일윈드 텍스트 색상 클래스 또는 CSS 색상 값',
                        },
                        {
                            prop: 'clickable',
                            type: 'boolean',
                            def: 'false',
                            desc: '클릭 가능 여부',
                        },
                        {
                            prop: 'showText',
                            type: 'boolean',
                            def: 'false',
                            desc: '아이콘 이름 표시 여부',
                        },
                        {
                            prop: 'horizontal',
                            type: 'boolean',
                            def: 'false',
                            desc: '텍스트와 아이콘의 가로 정렬 여부',
                        },
                        {
                            prop: 'onClick',
                            type: '(event: React.MouseEvent<HTMLSpanElement>) => void',
                            def: '—',
                            desc: '클릭 이벤트 핸들러',
                        },
                        { prop: 'className', type: 'string', def: '—', desc: '추가 CSS 클래스' },
                        {
                            prop: 'text',
                            type: 'string',
                            def: '—',
                            desc: '아이콘과 함께 표시할 텍스트',
                        },
                        {
                            prop: 'textColor',
                            type: 'string',
                            def: '—',
                            desc: '테일윈드 텍스트 색상 클래스 또는 CSS 색상 값(아이콘 색상과 다르게 설정할 경우)',
                        },
                    ]}
                />
            </GuideLayout>
        </>
    );
}
