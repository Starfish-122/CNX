'use client';

import React from 'react';
import Textarea from '@/components/base/Textarea';
import { GuideLayout, GuideSection, ExampleCard, PropsTable, CodeTag } from '@/components/templates/guide';

export default function TextareaGuide() {
  return (
    <GuideLayout
      title="📝 Textarea Component"
      description={
        <>
          <CodeTag>Textarea</CodeTag>은 여러 줄 텍스트 입력을 위한 컴포넌트입니다. <br />
          <CodeTag>label</CodeTag>, <CodeTag>hint</CodeTag>, <CodeTag>error</CodeTag> 메시지를 포함하며, <br />
          <CodeTag>showResetButton</CodeTag>으로 리셋 버튼을 추가할 수 있습니다.
        </>
      }
    >
      <GuideSection title="기본 사용">
        <ExampleCard
          demo={<Textarea />}
          code={`<Textarea />`}
        />
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

      <GuideSection title="상태 (disabled, error, hint, readonly)">
          <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Textarea disabled placeholder="비활성화된 텍스트 영역" />
              <Textarea error="에러 메시지입니다" placeholder="에러가 있는 텍스트 영역" />
              <Textarea hint="힌트 메시지입니다" placeholder="힌트가 있는 텍스트 영역" />
              <Textarea readOnly value="읽기 전용 텍스트 영역입니다" />
            </div>
          }
          code={`<Textarea disabled />
<Textarea error="에러 메시지입니다" />
<Textarea hint="힌트 메시지입니다" />
<Textarea readOnly />`}
        />
      </GuideSection>

      <GuideSection title="리셋 버튼">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Textarea label="리셋 가능" placeholder="입력해보세요" showResetButton />
            </div>
          }
          code={`<Textarea showResetButton />`}
        />
      </GuideSection>

      <GuideSection title="Props">
        <PropsTable
          rows={[
            { prop: 'size', type: `'sm' | 'md' | 'lg' | 'full'`, def: `'md'`, desc: '크기' },
            { prop: 'label', type: 'string', def: '—', desc: '라벨 텍스트' },
            { prop: 'hint', type: 'string', def: '—', desc: '힌트 메시지' },
            { prop: 'error', type: 'string', def: '—', desc: '에러 메시지' },
            { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화' },
            { prop: 'required', type: 'boolean', def: 'false', desc: '필수 입력' },
            { prop: 'invalid', type: 'boolean', def: 'false', desc: '에러 상태' },
            { prop: 'showResetButton', type: 'boolean', def: 'false', desc: '리셋 버튼 표시 여부' },
            { prop: 'onReset', type: '() => void', def: '—', desc: '리셋 버튼 클릭 핸들러' },
            { prop: 'rows', type: 'number', def: '3', desc: '행 수' },
            { prop: 'cols', type: 'number', def: '—', desc: '열 수' },
          ]}
        />
      </GuideSection>
    </GuideLayout>
  );
}
