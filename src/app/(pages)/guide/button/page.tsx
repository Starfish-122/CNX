'use client';

import React from 'react';
import Button from '@/components/base/Button';
import GuideLayout from '@/components/templates/GuidePageLayout';
import GuideSection from '@/components/templates/GuideSection';
import ExampleCard from '@/components/molecules/ExampleCard';
import PropsTable from '@/components/molecules/PropsTable';
import CodeTag from '@/components/atoms/CodeTag';

export default function ButtonGuide() {
  return (
    <GuideLayout
      title="⬇️ Button Component"
      description={
        <>
          <CodeTag>Button</CodeTag> 컴포넌트는 다양한 크기와 스타일을 지원하며, <br />
          <CodeTag>startIcon</CodeTag>, <CodeTag>endIcon</CodeTag>로 아이콘을 추가할 수 있고, <br />
          <CodeTag>loading</CodeTag>, <CodeTag>disabled</CodeTag> 상태를 지원합니다.
        </>
      }
    >
      <GuideSection title="기본 사용">
        <ExampleCard
          demo={<Button>저장</Button>}
          code={`<Button>저장</Button>`}
        />
      </GuideSection>

      <GuideSection title="사이즈 (size: sm, md, lg, full)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="full">Full Width</Button>
            </div>
          }
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="full">Full Width</Button>`}
        />
      </GuideSection>

      <GuideSection title="변형 (variant: solid, outline, text)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="text">Text</Button>
            </div>
          }
          code={`<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="text">Text</Button>`}
        />
      </GuideSection>

      <GuideSection title="컬러 (color: primary, secondary, success, warning, error, info)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="success">Success</Button>
              </div>
              <div className="flex gap-2">
                <Button color="warning">Warning</Button>
                <Button color="error">Error</Button>
                <Button color="info">Info</Button>
              </div>
            </div>
          }
          code={`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>
<Button color="info">Info</Button>`}
        />
      </GuideSection>

      <GuideSection title="컬러 + 변형 조합">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button variant="solid" color="success">저장</Button>
                <Button variant="outline" color="success">저장</Button>
                <Button variant="text" color="success">저장</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="solid" color="error">삭제</Button>
                <Button variant="outline" color="error">삭제</Button>
                <Button variant="text" color="error">삭제</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="solid" color="warning">경고</Button>
                <Button variant="outline" color="warning">경고</Button>
                <Button variant="text" color="warning">경고</Button>
              </div>
            </div>
          }
          code={`<Button variant="solid" color="success">저장</Button>
<Button variant="outline" color="success">저장</Button>
<Button variant="text" color="success">저장</Button>

<Button variant="solid" color="error">삭제</Button>
<Button variant="outline" color="error">삭제</Button>
<Button variant="text" color="error">삭제</Button>`}
        />
      </GuideSection>

      <GuideSection title="내장 아이콘 (icon, iconPosition)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Button icon="save">저장</Button>
              <Button icon="add">추가</Button>
              <Button icon="edit" iconPosition="end">편집</Button>
              <Button icon="delete">삭제</Button>
              <Button icon="search">검색</Button>
              <Button icon="download">다운로드</Button>
            </div>
          }
          code={`<Button icon="save">저장</Button>
<Button icon="add">추가</Button>
<Button icon="edit" iconPosition="end">편집</Button>
<Button icon="delete">삭제</Button>
<Button icon="search">검색</Button>
<Button icon="download">다운로드</Button>`}
        />
      </GuideSection>

      <GuideSection title="커스텀 아이콘 (startIcon, endIcon)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Button startIcon={<span className="material-symbols-outlined">favorite</span>}>좋아요</Button>
              <Button endIcon={<span className="material-symbols-outlined">arrow_forward</span>}>다음</Button>
              <Button 
                startIcon={<span className="material-symbols-outlined">rocket_launch</span>}
                endIcon={<span className="material-symbols-outlined">trending_up</span>}
              >
                실행
              </Button>
            </div>
          }
          code={`<Button startIcon={<span className="material-symbols-outlined">favorite</span>}>좋아요</Button>
<Button endIcon={<span className="material-symbols-outlined">arrow_forward</span>}>다음</Button>
<Button 
  startIcon={<span className="material-symbols-outlined">rocket_launch</span>}
  endIcon={<span className="material-symbols-outlined">trending_up</span>}
>
  실행
</Button>`}
        />
      </GuideSection>

      <GuideSection title="상태 (disabled, loading)">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <Button disabled>비활성화</Button>
              <Button loading>로딩 중...</Button>
            </div>
          }
          code={`<Button disabled>비활성화</Button>
<Button loading>로딩 중...</Button>`}
        />
      </GuideSection>

      <GuideSection title="조합 예제">
        <ExampleCard
          demo={
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button variant="solid" size="sm">작은 버튼</Button>
                <Button variant="outline" size="sm">작은 아웃라인</Button>
                <Button variant="text" size="sm">작은 텍스트</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="solid" color="success" icon="add">추가</Button>
                <Button variant="outline" color="info" icon="edit" iconPosition="end">편집</Button>
                <Button variant="text" color="error" icon="delete">삭제</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="solid" color="info" icon="search" size="sm">검색</Button>
                <Button variant="outline" color="success" icon="save" size="md">저장</Button>
                <Button variant="text" color="primary" icon="download" size="lg">다운로드</Button>
              </div>
              <Button variant="solid" size="lg" startIcon={<span className="material-symbols-outlined">rocket_launch</span>}>
                커스텀 아이콘
              </Button>
            </div>
          }
          code={`<div className="flex gap-2">
  <Button variant="solid" size="sm">작은 버튼</Button>
  <Button variant="outline" size="sm">작은 아웃라인</Button>
  <Button variant="text" size="sm">작은 텍스트</Button>
</div>
<div className="flex gap-2">
  <Button variant="solid" icon="add">추가</Button>
  <Button variant="outline" icon="edit" iconPosition="end">편집</Button>
  <Button variant="text" icon="delete">삭제</Button>
</div>
<div className="flex gap-2">
  <Button variant="solid" icon="search" size="sm">검색</Button>
  <Button variant="outline" icon="save" size="md">저장</Button>
  <Button variant="text" icon="download" size="lg">다운로드</Button>
</div>
<Button variant="solid" size="lg" startIcon={<span className="material-symbols-outlined">rocket_launch</span>}>
  커스텀 아이콘
</Button>`}
        />
      </GuideSection>

      <GuideSection title="Props">
        <PropsTable
          rows={[
            { prop: 'variant', type: `'solid' | 'outline' | 'text'`, def: `'solid'`, desc: '버튼 스타일 변형' },
            { prop: 'color', type: `'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'`, def: `'primary'`, desc: '버튼 컬러' },
            { prop: 'size', type: `'sm' | 'md' | 'lg' | 'full'`, def: `'md'`, desc: '버튼 크기' },
            { prop: 'icon', type: `'add' | 'edit' | 'delete' | 'search' | 'save' | 'download'`, def: '—', desc: '내장 아이콘' },
            { prop: 'iconPosition', type: `'start' | 'end'`, def: `'start'`, desc: '아이콘 위치 (icon과 함께 사용)' },
            { prop: 'startIcon', type: 'React.ReactNode', def: '—', desc: '커스텀 앞쪽 아이콘' },
            { prop: 'endIcon', type: 'React.ReactNode', def: '—', desc: '커스텀 뒤쪽 아이콘' },
            { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화 상태' },
            { prop: 'loading', type: 'boolean', def: 'false', desc: '로딩 상태' },
            { prop: 'type', type: `'button' | 'submit' | 'reset'`, def: `'button'`, desc: 'HTML button type' },
            { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
            { prop: 'children', type: 'React.ReactNode', def: '—', desc: '버튼 내용' },
          ]}
        />
      </GuideSection>
    </GuideLayout> 
  );
}