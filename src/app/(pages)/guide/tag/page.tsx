'use client';

import React from 'react';
import Title from '@/components/base/Title';

import Tag from '@/components/base/Tag';
import TagList from '@/components/base/TagList';
import CategoryTag from '@/components/base/CategoryTag';

import GuideLayout from '@/components/guide/GuideLayout';
import GuideSection from '@/components/guide/GuideSection';
import ExampleCard from '@/components/guide/ExampleCard';
import PropsTable from '@/components/guide/PropsTable';
import CodeTag from '@/components/guide/CodeTag';

export default function TagsGuide(): React.JSX.Element {
  return (
    <GuideLayout
      title="🏷️ Tag / TagList / CategoryTag"
      description={
        <>
          <CodeTag>Tag</CodeTag>는 팔레트를 받아 렌더링하는 단순한 <b>프레젠테이션 전용</b> 컴포넌트,<br/>
          <CodeTag>CategoryTag</CodeTag>는 카테고리 → 색상 매핑 컴포넌트입니다.<br/>
          <CodeTag>TagList</CodeTag>로 여러 태그들을 묶어 간격/줄바꿈을 제어할 수 있습니다.
        </>
      }
    >
      {/* 기본 사용: Tag (Neutral) */}
      <GuideSection title="Tag : 기본 사용">
        <ExampleCard
          demo={
            <TagList>
              <Tag label="임시 태그" />
              <Tag label="Draft" />
              <Tag label="비활성" disabled />
            </TagList>
          }
          code={`<Tag label="임시 태그" />
<Tag label="Draft" palette={NEUTRAL} />
<Tag label="비활성" disabled />`}
        />
      </GuideSection>

      {/* 카테고리 매핑: CategoryTag */}
      <GuideSection title="CategoryTag : 카테고리별 색상 매핑">
        <ExampleCard
          demo={
            <TagList>
              <CategoryTag label="카페" category="Status" />
              <CategoryTag label="한강로길" category="Location" />
              <CategoryTag label="데이트" category="PartySize" />
              <CategoryTag label="감성" category="Mood" />
              <CategoryTag label="테이크아웃" category="Service" />
              <CategoryTag label="자유 태그" /> {/* category 없음 → Neutral */}
            </TagList>
          }
          code={`<CategoryTag label="카페" category="Status" />
<CategoryTag label="한강로길" category="Location" />
<CategoryTag label="데이트" category="PartySize" />
<CategoryTag label="감성" category="Mood" />
<CategoryTag label="테이크아웃" category="Service" />
<CategoryTag label="자유 태그" />`}
        />
      </GuideSection>

      {/* 사이즈 */}
      <GuideSection title="사이즈 (size: sm, md)">
        <ExampleCard
          demo={
            <div className="space-y-6">
              <div>
                <TagList>
                  <CategoryTag label="작음(sm)" category="Mood" size="sm" />
                  <CategoryTag label="기본(md)" category="Mood" size="md" />
                </TagList>
              </div>
            </div>
          }
          code={`<CategoryTag label="작음(sm)" category="Mood" size="sm" />
<CategoryTag label="기본(md)" category="Mood" size="md" />`}
        />
      </GuideSection>

      {/* 리스트 레이아웃 */}
      <GuideSection title="리스트 레이아웃 (gap, wrap)">
        <ExampleCard
          demo={
            <div className="space-y-6">
              <div>
                <TagList gap="lg" wrap className="max-w-xs border rounded p-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <CategoryTag key={i} label={`태그 ${i + 1}`} category="Status" />
                  ))}
                </TagList>
              </div>
            </div>
          }
          code={`<TagList gap="lg" wrap>
  {Array.from({ length: 8 }).map((_, i) => (
    <CategoryTag key={i} label={\`태그 \${i + 1}\`} category="Status" />
  ))}
</TagList>`}
        />
      </GuideSection>

      {/* Props */}
      <GuideSection title="Props">
        <Title element="h3" className="text-md mb-3">Tag</Title>
        <PropsTable
          rows={[
            { prop: 'label', type: 'string', def: '—', desc: '표시할 텍스트' },
            { prop: 'palette', type: '{ base: string; hover?: string }', def: '—', desc: '색상 팔레트' },
            { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화' },
            { prop: 'size', type: `'sm' | 'md'`, def: `'md'`, desc: '크기' },
            { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
          ]}
        />

        <div className="h-6" />
        <Title element="h3" className="text-md mb-3">TagList</Title>
        <PropsTable
          rows={[
            { prop: 'children', type: 'React.ReactNode', def: '—', desc: '내부 태그들' },
            { prop: 'gap', type: `'sm' | 'md' | 'lg'`, def: `'md'`, desc: '간격' },
            { prop: 'wrap', type: 'boolean', def: 'true', desc: '줄바꿈 허용' },
            { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
          ]}
        />

        <div className="h-6" />
        <Title element="h3" className="text-md mb-3">CategoryTag</Title>
        <PropsTable
          rows={[
            { prop: 'label', type: 'string', def: '—', desc: '표시할 텍스트' },
            { prop: 'category', type: `'Status' | 'Location' | 'PartySize' | ..`, def: '(optional)', desc: '카테고리' },
            { prop: 'disabled', type: 'boolean', def: 'false', desc: '비활성화' },
            { prop: 'size', type: `'sm' | 'md'`, def: `'md'`, desc: '크기' },
            { prop: 'className', type: 'string', def: '—', desc: '커스텀 클래스' },
          ]}
        />
      </GuideSection>
    </GuideLayout>
  );
}
