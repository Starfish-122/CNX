'use client';

import React from 'react';
import Title from '@/components/base/Title';
import GuideLayout from '@/components/guide/GuideLayout';
import GuideSection from '@/components/guide/GuideSection';
import ExampleCard from '@/components/guide/ExampleCard';
import PropsTable from '@/components/guide/PropsTable';
import CodeTag from '@/components/guide/CodeTag';

export default function TitleGuide() {
  return (
    <GuideLayout
      title="📑 Title Component"
      description={
        <>
          <CodeTag>Title</CodeTag>은 페이지/섹션 타이틀을 일관된 스타일로 출력하는 컴포넌트입니다. <br />
          <CodeTag>element</CodeTag> 속성으로 HTML 태그/커스텀 컴포넌트를 지정할 수 있으며, <br />
          <CodeTag>className</CodeTag> 속성으로 추가 커스텀 클래스 또는 tailwind 클래스를 지정할 수 있습니다.
        </>
      }
    >
      <GuideSection title="기본 사용">
        <ExampleCard
          demo={<Title>섹션 제목</Title>}
          code={`<Title>섹션 제목</Title>`}
        />
      </GuideSection>

      <GuideSection title="다양한 예시">
        <ExampleCard
          demo={
            <div className="space-y-4">
              <Title element="h1">메인 타이틀</Title>
              <Title element="a" href="https://example.com" target="_blank">
                외부 링크 타이틀
              </Title>
              <Title className="text-red-500">강조된 타이틀</Title>
            </div>
          }
          code={`<Title element="h1">메인 타이틀</Title>

<Title element="a" href="https://example.com" target="_blank">외부 링크 타이틀</Title>

<Title className="text-red-500">강조된 타이틀</Title>`}
        />
      </GuideSection>

      <GuideSection title="Props">
        <PropsTable
          rows={[
            { prop: 'element', type: 'React.ElementType', def: `'strong'`, desc: '출력할 태그/컴포넌트' },
            { prop: 'href', type: 'string', desc: `element='a'일 때 링크 주소` },
            { prop: 'target', type: 'string', desc: `element='a'일 때 링크 target` },
            { prop: 'className', type: 'string', desc: '추가 Tailwind 클래스' },
            { prop: 'children', type: 'React.ReactNode', def: '필수', desc: '표시할 내용' },
          ]}
        />
      </GuideSection>
    </GuideLayout>
  );
}