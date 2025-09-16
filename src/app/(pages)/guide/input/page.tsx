'use client';

import React from 'react';
import Input from '@/components/base/Input';
import { GuideLayout, GuideSection, ExampleCard, PropsTable, CodeTag } from '@/components/templates/guide';

export default function InputGuide() {
  return (
    <GuideLayout
      title="⌨️ Input Component"
      description={
        <>
          <CodeTag>Input</CodeTag>은 폼 입력을 위한 컴포넌트입니다. <br />
          <CodeTag>label</CodeTag>, <CodeTag>hint</CodeTag>, <CodeTag>error</CodeTag> 메시지를 포함하며, <br />
          <CodeTag>startAdornment</CodeTag>, <CodeTag>endAdornment</CodeTag>로 아이콘이나 버튼을 추가할 수 있습니다.
        </>
      }
    >
      <GuideSection title="기본 사용">
        <ExampleCard
          demo={<Input />}
          code={`<Input />`}
        />
      </GuideSection>

      <GuideSection title="사이즈 (size: sm, md, lg, full)">
        <ExampleCard
          demo={
          <div className="flex flex-col gap-4">
            <Input size="sm" />
            <Input size="md" />
            <Input size="lg" />
            <Input size="full" />
          </div>
        }
          code={`<Input size="sm" />
<Input size="md" />
<Input size="lg" />
<Input size="full" />`}
        />
      </GuideSection>

      <GuideSection title="타입 (type: text, password, email, number, tel)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Input type="text" label="텍스트" placeholder="텍스트 입력" showResetButton />
              <Input type="password" label="비밀번호" placeholder="비밀번호 입력" showPasswordToggle/>
              <Input type="email" label="이메일" placeholder="mail@mail.com" />
              <Input type="number" label="숫자" placeholder="숫자만 입력" />
              <Input type="tel" label="전화번호" placeholder="010-1234-5678" />
            </div>
          }
          code={`<Input type="text" label="텍스트" />
<Input type="password" label="비밀번호" showPasswordToggle />
<Input type="email" label="이메일" />
<Input type="number" label="숫자" />
<Input type="tel" label="전화번호" />`}
        />
      </GuideSection>

      <GuideSection title="상태 (disabled, error, hint, readonly, required)">
          <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Input disabled />
              <Input error="에러 메시지입니다" />
              <Input hint="힌트 메시지입니다" />
              <Input readOnly value="읽기 전용" />
              <Input label="필수 입력" required placeholder="필수 입력 필드" />
              <Input label="필수 입력 (값 있음)" required placeholder="필수 입력 필드" value="입력된 값" />
            </div>
          }
          code={`<Input disabled />
<Input error="에러 메시지입니다" />
<Input hint="힌트 메시지입니다" />
<Input readOnly />
<Input label="필수 입력" required />
<Input label="필수 입력 (값 있음)" required value="입력된 값" />`}
        />
      </GuideSection>

      <GuideSection title="Props">
        <PropsTable
          rows={[
            { prop: 'size', type: `'sm' | 'md' | 'lg' | 'full'`, def: `'md'`, desc: '크기' },
            { prop: 'type', type: `'text' | 'password' | 'email' | 'number' | 'tel'`, def: `'text'`, desc: '타입' },
            { prop: 'label', type: 'string', def: '—', desc: '라벨 텍스트' },
            { prop: 'hint', type: 'string', def: '—', desc: '힌트 메시지' },
            { prop: 'error', type: 'string', def: '—', desc: '에러 메시지' },
            { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화' },
            { prop: 'required', type: 'boolean', def: 'false', desc: '필수 입력' },
            { prop: 'invalid', type: 'boolean', def: 'false', desc: '에러 상태' },
            { prop: 'showPasswordToggle', type: 'boolean', def: 'false', desc: '비밀번호 토글 버튼 표시 여부' },
            { prop: 'showResetButton', type: 'boolean', def: 'false', desc: '리셋 버튼 표시 여부' },
            { prop: 'onReset', type: '() => void', def: '—', desc: '리셋 버튼 클릭 시 호출되는 콜백 (제어형 컴포넌트에서 상태 초기화용)' },
            { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
          ]}
        />
      </GuideSection>
    </GuideLayout>
  );
}