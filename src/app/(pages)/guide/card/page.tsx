'use client';
import React from 'react';
import Text from '@/components/atoms/Text';
import Card from '@/components/molecules/Card';
import GuideLayout from '@/components/templates/GuidePageLayout';
import GuideSection from '@/components/templates/GuideSection';
import ExampleCard from '@/components/molecules/ExampleCard';
import CodeTag from '@/components/atoms/CodeTag';
import PropsTable from '@/components/molecules/PropsTable';
import RecommendCard from '@/components/molecules/RecommendCard';
import Title from '@/components/atoms/Title';

export default function IconGuidePage() {
  return (
    <GuideLayout title="🃏 Card Component" description={
      <>
        <CodeTag>Card</CodeTag> 컴포넌트는 카드를 표시하며, 갤러리형, 리스트형 두 가지 스타일을 지원합니다.
      </>
    }>
      {/* 기본 카드 */}
      <GuideSection title="기본 카드 (Card)">
        <Text className="mb-4">
          image 속성에 이미지 경로를 전달하고, 카드 내부에 원하는 컴포넌트를 자유롭게 배치할 수 있습니다.
        </Text>
        <ExampleCard
          demo={
            <div className="flex items-start gap-4">
              <Card image="/images/image1.png">
                <div>
                  <h3>Card Title</h3>
                  <p>Card Description</p>
                </div>
              </Card>
              <Card image="/images/image2.png">
                <div>
                  <h3>Card Title</h3>
                  <p>Card Description</p>
                </div>
              </Card>
              <Card>
                <div>
                  <h3>Card Title</h3>
                  <p>Card Description</p>
                </div>
              </Card>
              <Card image="/images/image2.png"/>
            </div>
          }
          code={`<Card image="/images/image1.png">
  <div>
    <h3>Card Title</h3>
    <p>Card Description</p>
  </div>
</Card> 
<Card image="/images/image2.png">
  <div>
    <h3>Card Title</h3>
    <p>Card Description</p>
  </div>
</Card>
<Card>
  <div>
    <h3>Card Title</h3>
    <p>Card Description</p>
  </div>
</Card>
<Card image="/images/image2.png"/>`}
        />
      </GuideSection>

      {/* 추천 맛집 영역 카드 */}
      <GuideSection title="추천 맛집 카드 (RecommendCard)">
        <Text className="mb-4">
          기본 카드 컴포넌트의 변형으로, 추천 맛집 영역에서 사용되는 카드 컴포넌트입니다. <br />
          맛집 이름(name), 설명(description), 태그(tags), 평점(rating), 이미지(image)을 전달받아 표시하며, 평점에서 소수점 자리는 버립니다.<br />
        </Text>
        <ExampleCard
          demo={
            <div className="flex items-start gap-4">
              <RecommendCard image="/images/image1.png"
                name="더벤티 신용산역점"
                description="가성비 내리는 카페"
                tags={[{ label: "카페", category: "Status" }, { label: "테이크아웃", category: "Service" }, { label: "래미안", category: "Location" }]}
                rating={4}
              />
              <RecommendCard image="/images/image2.png"
                name="티하우스레몬"
                description="상큼한 느낌의 티와 비타민음료를 판매하는 사무실 지하 카페"
                tags={[{ label: "카페", category: "Status" }, { label: "테이크아웃", category: "Service" }, { label: "조용한", category: "Mood" }, { label: "래미안", category: "Location" }]}
                rating={4.5}
              />
            </div>
          }
          code={`<RecommendCard image="/images/image1.png"
  name="더벤티 신용산역점"
  description="가성비 내리는 카페"
  tags={[{ label: "카페", category: "Status" }, { label: "테이크아웃", category: "Service" }, { label: "래미안", category: "Location" }]}
  rating={4}
/>
<RecommendCard image="/images/image2.png"
  name="티하우스레몬"
  description="상큼한 느낌의 티와 비타민음료를 판매하는 사무실 지하 카페"
  tags={[{ label: "카페", category: "Status" }, { label: "테이크아웃", category: "Service" }, { label: "조용한", category: "Mood" }, { label: "래미안", category: "Location" }]}
  rating={4.5}
/>`}  
        />
      </GuideSection>

      {/* Props 섹션 */}
      <GuideSection title="Props">
        <Title element="h3" className="text-md mb-3">
            Card
        </Title>
        <PropsTable rows={[
          { prop: 'image', type: 'string', def: '필수', desc: '카드 이미지' },
          { prop: 'className', type: 'string', def: '-', desc: '추가 CSS 클래스' },
          { prop: 'children', type: 'React.ReactNode', def: '-', desc: '카드 내용' },
        ]} />

        <div className="h-6" />
        
        <Title element="h3" className="text-md mb-3">
            RecommendCard
        </Title>
        <PropsTable rows={[
          { prop: 'name', type: 'string', def: '필수', desc: '맛집 이름' },
          { prop: 'description', type: 'string', def: '필수', desc: '맛집 설명' },
          { prop: 'image', type: 'string', def: '필수', desc: '맛집 이미지' },
          { prop: 'tags', type: 'Tag[]', def: '필수', desc: '맛집 태그' },
          { prop: 'rating', type: 'number', def: '필수', desc: '맛집 평점' },
          { prop: 'className', type: 'string', def: '-', desc: '추가 CSS 클래스' }
        ]} />
      </GuideSection>
    </GuideLayout>
  );
}