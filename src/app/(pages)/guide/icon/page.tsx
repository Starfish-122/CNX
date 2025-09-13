'use client';
import React from 'react';
import Icon from '@/components/base/Icon';
import Title from '@/components/base/Title';
import Text from '@/components/base/Text';

export default function IconGuidePage() {
  return (
    <div className="guide-layout">
      {/* 가이드 헤더 */}
      <Title className="guide-layout-title">🔣 Icon Component</Title>
      <Text className="guide-layout-description">
        <code className="guide-code">Icon</code> 컴포넌트는 Google Material Icons/Symbols를 사용하여 아이콘을 표시합니다.<br />
        다양한 크기와 색상, 스타일을 지원하며 클릭 이벤트도 처리할 수 있습니다.
      </Text>

      {/* 기본 사용법 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">기본 사용법</h2>
        <p className="mb-4">
          Google Material Symbols/Icons를 사용한 아이콘 컴포넌트입니다. name 속성에 원하는 아이콘 이름을 전달하여 사용합니다.
        </p>
        <div>
          <div className="guide-example-demo">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Icon name="search" showName />
              </div>
              <div className="flex flex-col items-center">
                <Icon name="home" showName />
              </div>
              <div className="flex flex-col items-center">
                <Icon name="favorite" showName />
              </div>
              <div className="flex flex-col items-center">
                <Icon name="settings" showName />
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search_off" showName />
              </div>
            </div>
          </div>
          <pre className="guide-example-code">{`<Icon name="search" showName />
<Icon name="home" showName />
<Icon name="favorite" showName />
<Icon name="settings" showName />
<Icon name="search_off" showName />`}</pre>
        </div>
      </section>

      {/* 크기 설정 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">크기 설정</h2>
        <p className="mb-4">size 속성을 통해 아이콘 크기를 설정할 수 있습니다. (&apos;xs&apos;, &apos;sm&apos;, &apos;md&apos;, &apos;lg&apos;, &apos;xl&apos;, &apos;xxl&apos;)</p>
        <div>
          <div className="guide-example-demo">
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center">
                <Icon name="search" size="xs" />
                <p className="mt-2 text-sm text-gray-700">xs</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search" size="sm" />
                <p className="mt-2 text-sm text-gray-700">sm</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search" size="md" />
                <p className="mt-2 text-sm text-gray-700">md (기본)</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search" size="lg" />
                <p className="mt-2 text-sm text-gray-700">lg</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search" size="xl" />
                <p className="mt-2 text-sm text-gray-700">xl</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search" size="xxl" />
                <p className="mt-2 text-sm text-gray-700">xxl</p>
              </div>
            </div>
          </div>
          <pre className="guide-example-code">{`<Icon name="search" size="xs" />
<Icon name="search" size="sm" />
<Icon name="search" size="md" />
<Icon name="search" size="lg" />
<Icon name="search" size="xl" />
<Icon name="search" size="xxl" />`}</pre>
        </div>
      </section>

      {/* 색상 설정 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">색상 설정</h2>
        <p className="mb-4">color 속성을 통해 아이콘 색상을 설정할 수 있습니다.</p>
        <div>
          <div className="guide-example-demo">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Icon name="favorite" size="lg" color="text-red-500" />
                <p className="mt-2 text-sm text-gray-700">빨간색</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="favorite" size="lg" color="text-green-500" />
                <p className="mt-2 text-sm text-gray-700">초록색</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="favorite" size="lg" color="text-blue-500" />
                <p className="mt-2 text-sm text-gray-700">파란색</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="search_off" size="lg" color="text-white" />
                <p className="mt-2 text-sm text-gray-700">흰색</p>
              </div>
            </div>
          </div>
          <pre className="guide-example-code">{`<Icon name="favorite" size="lg" color="text-red-500" />
<Icon name="favorite" size="lg" color="text-green-500" />
<Icon name="favorite" size="lg" color="text-blue-500" />
<Icon name="search_off" size="lg" color="text-white" />`}</pre>
        </div>
      </section>

      {/* 채워진 스타일 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">채워진 스타일</h2>
        <p className="mb-4">filled 속성을 통해 채워진 스타일의 아이콘을 사용할 수 있습니다.</p>
        <div>
          <div className="guide-example-demo">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Icon name="favorite" size="lg" />
                <p className="mt-2 text-sm text-gray-700">기본</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="favorite" size="lg" filled />
                <p className="mt-2 text-sm text-gray-700">채워짐</p>
              </div>
            </div>
          </div>
          <pre className="guide-example-code">{`<Icon name="favorite" size="lg" />
<Icon name="favorite" size="lg" filled />`}</pre>
        </div>
      </section>

      {/* 클릭 가능한 아이콘 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">클릭 가능한 아이콘</h2>
        <p className="mb-4">clickable과 onClick 속성을 통해 클릭 이벤트를 설정할 수 있습니다.</p>
        <div>
          <div className="guide-example-demo">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Icon 
                  name="thumb_up" 
                  size="lg" 
                  clickable 
                  onClick={() => alert('좋아요!')}  
                />
                <p className="mt-2 text-sm text-gray-700">클릭 해보세요</p>
              </div>
            </div>
          </div>
          <pre className="guide-example-code">{`<Icon 
  name="thumb_up" 
  size="lg" 
  clickable 
  onClick={() => alert('좋아요!')} 
/>`}</pre>
        </div>
      </section>

      {/* 아이콘 이름 표시 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">아이콘 이름 표시</h2>
        <p className="mb-4">showName 속성을 통해 아이콘 아래에 이름을 표시할 수 있습니다. 색상은 아이콘과 동일하게 적용됩니다.</p>
        <div>
          <div className="guide-example-demo">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Icon name="home" size="lg" />
                <p className="mt-2 text-sm text-gray-700">기본 (이름 숨김)</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="home" size="lg" showName />
                <p className="mt-2 text-sm text-gray-700">이름 표시</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="favorite" size="lg" color="text-red-500" showName />
                <p className="mt-2 text-sm text-gray-700">색상 적용</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="star" size="lg" color="#FFD700" showName />
                <p className="mt-2 text-sm text-gray-700">CSS 색상값</p>
              </div>
            </div>
          </div>
          <pre className="guide-example-code">{`<Icon name="home" size="lg" />
<Icon name="home" size="lg" showName />
<Icon name="favorite" size="lg" color="text-red-500" showName />
<Icon name="star" size="lg" color="#FFD700" showName />`}</pre>
        </div>
      </section>

      {/* Props 섹션 */}
      <section className="guide-section">
        <h2 className="guide-section-title">Props</h2>
        <div className="guide-props-table" style={{containerType: "inline-size"}}>
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono">name</td>
                <td className="font-mono">string</td>
                <td>필수</td>
                <td>Google Material Icons/Symbols 아이콘 이름</td>
              </tr>
              <tr>
                <td className="font-mono">size</td>
                <td className="font-mono">&apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;xxl&apos;</td>
                <td>&apos;md&apos;</td>
                <td>아이콘 크기</td>
              </tr>
              <tr>
                <td className="font-mono">filled</td>
                <td className="font-mono">boolean</td>
                <td>false</td>
                <td>채워진 스타일 여부</td>
              </tr>
              <tr>
                <td className="font-mono">color</td>
                <td className="font-mono">string</td>
                <td>-</td>
                <td>테일윈드 색상 클래스(text-red-500) 또는 CSS 색상값</td>
              </tr>
              <tr>
                <td className="font-mono">showName</td>
                <td className="font-mono">boolean</td>
                <td>false</td>
                <td>아이콘 이름 표시 여부</td>
              </tr>
              <tr>
                <td className="font-mono">clickable</td>
                <td className="font-mono">boolean</td>
                <td>false</td>
                <td>클릭 가능 여부</td>
              </tr>
              <tr>
                <td className="font-mono">onClick</td>
                <td className="font-mono">(event: React.MouseEvent&lt;HTMLSpanElement&gt;) {'=>'} void</td>
                <td>-</td>
                <td>클릭 이벤트 핸들러</td>
              </tr>
              <tr>
                <td className="font-mono">className</td>
                <td className="font-mono">string</td>
                <td>-</td>
                <td>추가 CSS 클래스</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}