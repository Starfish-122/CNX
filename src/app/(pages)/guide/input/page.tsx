'use client';

import React from 'react';
import Input from '@/components/base/Input';
import GuideLayout from '@/components/guide/GuideLayout';
import GuideSection from '@/components/guide/GuideSection';
import ExampleCard from '@/components/guide/ExampleCard';
import PropsTable from '@/components/guide/PropsTable';
import CodeTag from '@/components/guide/CodeTag';

export default function InputGuide() {
  return (
    <GuideLayout
      title="⌨️ Input Component"
      description={
        <>
          <CodeTag>Text</CodeTag>는 텍스트를 일관된 스타일로 출력하는 컴포넌트입니다. <br />
          <CodeTag>element</CodeTag> 속성으로 p, span, div 태그를 지정할 수 있으며, <br />
          <CodeTag>className</CodeTag> 속성으로 추가 커스텀 클래스 또는 tailwind 클래스를 지정할 수 있습니다.
        </>
      }
    >
      <GuideSection title="기본 사용">
        <ExampleCard
          demo={`<Input>텍스트 내용</Input>`}
          code={`<Text>텍스트 내용</Text>`}
        />
      </GuideSection>

      <GuideSection title="다양한 태그 사용">
        <ExampleCard
          demo={
            <div>
              
            </div>
          }
          code={`<Text element="span">span 태그1</Text> <Text element="span">span 태그2</Text>
<Text element="div">div 태그</Text>
<Text>p 태그 (기본)</Text>`}
        />
      </GuideSection>

      <GuideSection title="다양한 예시">
        <ExampleCard
          demo={
            <div className="space-y-4">
            </div>
          }
          code={`<Text className="text-blue-600 dark:text-blue-400">색상 변경된 텍스트</Text>
<Text className="bg-blue-100 dark:bg-blue-800">텍스트 배경 색상 추가</Text>`}
        />
      </GuideSection>

      <GuideSection title="Props">
        <PropsTable
          rows={[
            { prop: 'element', type: 'React.ElementType', def: `'p'`, desc: '출력할 태그/컴포넌트' },
            { prop: 'className', type: 'string', desc: '추가 Tailwind 클래스' },
            { prop: 'children', type: 'React.ReactNode', def: '필수', desc: '표시할 내용' },
          ]}
        />
      </GuideSection>
    </GuideLayout>
  );
}