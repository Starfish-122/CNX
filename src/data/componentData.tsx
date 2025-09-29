import React from 'react';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import StarRating from '@/components/molecules/StarRating';
import Tag from '@/components/atoms/Tag';
import TagList from '@/components/atoms/TagList';
import CategoryTag from '@/components/atoms/CategoryTag';
import Text from '@/components/atoms/Text';

export const componentData = {
    button: {
        title: 'Button 컴포넌트',
        description: '다양한 스타일과 크기의 버튼 컴포넌트입니다.',
        componentName: 'Button',
        examples: [
            {
                title: '기본 버튼',
                description: '가장 기본적인 버튼 스타일입니다.',
                code: `<Button>기본 버튼</Button>`,
                preview: <Button>기본 버튼</Button>,
            },
            {
                title: '색상별 버튼',
                description: '다양한 색상의 버튼들입니다.',
                code: `<div className="flex gap-2">
  <Button color="primary">Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Button color="success">Success</Button>
  <Button color="error">Error</Button>
</div>`,
                preview: (
                    <div className="flex gap-2">
                        <Button color="primary">Primary</Button>
                        <Button color="secondary">Secondary</Button>
                        <Button color="success">Success</Button>
                        <Button color="error">Error</Button>
                    </div>
                ),
            },
            {
                title: '크기별 버튼',
                description: '다양한 크기의 버튼들입니다.',
                code: `<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
                preview: (
                    <div className="flex items-center gap-2">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                    </div>
                ),
            },
        ],
        props: [
            {
                name: 'children',
                type: 'React.ReactNode',
                required: true,
                description: '버튼 내부에 표시될 내용',
            },
            {
                name: 'color',
                type: "'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'",
                required: false,
                defaultValue: "'primary'",
                description: '버튼의 색상 테마',
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                required: false,
                defaultValue: "'md'",
                description: '버튼의 크기',
            },
            {
                name: 'disabled',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '버튼 비활성화 여부',
            },
            {
                name: 'onClick',
                type: '() => void',
                required: false,
                description: '클릭 이벤트 핸들러',
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: '추가 CSS 클래스',
            },
        ],
        usage: `Button 컴포넌트는 사용자 인터랙션을 위한 기본적인 UI 요소입니다. 
다양한 색상, 크기, 상태를 지원하며 접근성을 고려하여 설계되었습니다.`,
        usageCode: `import Button from '@/components/atoms/Button';

// 기본 사용법
<Button onClick={() => console.log('클릭됨')}>
  클릭하세요
</Button>

// 색상과 크기 지정
<Button color="success" size="lg">
  저장하기
</Button>`,
        notes: [
            '버튼은 항상 명확한 액션을 나타내는 텍스트를 포함해야 합니다.',
            'disabled 상태일 때는 시각적으로 비활성화된 것을 명확히 표시합니다.',
            '색상 선택 시 브랜드 가이드라인을 준수하세요.',
        ],
    },
    card: {
        title: 'Card 컴포넌트',
        description: '콘텐츠를 그룹화하여 표시하는 카드 컴포넌트입니다.',
        componentName: 'Card',
        examples: [
            {
                title: '기본 카드',
                description: '가장 기본적인 카드 스타일입니다.',
                code: `<Card>
  <h3 className="text-lg font-semibold mb-2">카드 제목</h3>
  <p className="text-gray-600">카드 내용입니다.</p>
</Card>`,
                preview: (
                    <Card>
                        <h3 className="text-lg font-semibold mb-2">카드 제목</h3>
                        <p className="text-gray-600">카드 내용입니다.</p>
                    </Card>
                ),
            },
        ],
        props: [
            {
                name: 'children',
                type: 'React.ReactNode',
                required: true,
                description: '카드 내부에 표시될 내용',
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: '추가 CSS 클래스',
            },
        ],
        usage: `Card 컴포넌트는 관련된 콘텐츠를 그룹화하여 표시할 때 사용합니다.
그림자와 테두리를 통해 콘텐츠를 시각적으로 분리합니다.`,
        usageCode: `import Card from '@/components/molecules/Card';

// 기본 사용법
<Card>
  <h3>제목</h3>
  <p>내용</p>
</Card>

// 커스텀 스타일링
<Card className="max-w-md">
  <div className="p-6">
    <h3 className="text-xl font-bold">커스텀 카드</h3>
    <p className="mt-2">내용</p>
  </div>
</Card>`,
        notes: [
            '카드 내부 콘텐츠는 논리적으로 관련된 정보여야 합니다.',
            '너무 많은 정보를 한 카드에 넣지 마세요.',
        ],
    },
    icon: {
        title: 'Icon 컴포넌트',
        description:
            'Google Material Icons/Symbols를 사용하여 아이콘을 표시합니다. 다양한 크기와 색상, 스타일을 지원하며 클릭 이벤트도 처리할 수 있습니다.',
        componentName: 'Icon',
        examples: [
            {
                title: '기본 사용',
                description: '가장 기본적인 아이콘 사용법입니다.',
                code: `<Icon name="search" />
<Icon name="favorite" size="lg" filled />`,
                preview: (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <Icon name="search" text="기본" showText />
                        </div>
                        <div className="flex flex-col items-center">
                            <Icon name="favorite" text="채워짐" filled showText />
                        </div>
                    </div>
                ),
            },
            {
                title: '크기별 아이콘',
                description: '다양한 크기의 아이콘들입니다.',
                code: `<Icon name="search" size="xs" />
<Icon name="search" size="sm" />
<Icon name="search" size="md" />
<Icon name="search" size="lg" />
<Icon name="search" size="xl" />
<Icon name="search" size="xxl" />`,
                preview: (
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
                ),
            },
            {
                title: '텍스트와 색상',
                description: '아이콘에 텍스트와 색상을 적용한 예제입니다.',
                code: `<Icon name="favorite" color="text-red-500" text="색상 적용" showText />
<Icon name="favorite" color="text-teal-500" text="텍스트 색상 적용" textColor="text-indigo-500" showText />
<Icon name="favorite" text="가로 정렬" horizontal showText />`,
                preview: (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <Icon name="favorite" color="text-red-500" text="색상 적용" showText />
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
                ),
            },
            {
                title: '클릭 가능한 아이콘',
                description: '클릭 이벤트를 처리하는 아이콘입니다.',
                code: `<Icon 
  name="thumb_up" 
  clickable 
  onClick={() => alert('좋아요!')} 
/>`,
                preview: (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <Icon name="thumb_up" clickable />
                            <p className="mt-2 text-sm text-gray-700">클릭 가능한 아이콘</p>
                        </div>
                    </div>
                ),
            },
        ],
        props: [
            {
                name: 'name',
                type: 'string',
                required: true,
                description: '아이콘 이름 (Google Material Icons)',
            },
            {
                name: 'size',
                type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'",
                required: false,
                defaultValue: "'md'",
                description: '아이콘 크기',
            },
            {
                name: 'filled',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '채워진 스타일 여부',
            },
            {
                name: 'color',
                type: 'string',
                required: false,
                defaultValue: 'text-gray-700',
                description: '테일윈드 텍스트 색상 클래스 또는 CSS 색상 값',
            },
            {
                name: 'clickable',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '클릭 가능 여부',
            },
            {
                name: 'showText',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '아이콘 이름 표시 여부',
            },
            {
                name: 'horizontal',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '텍스트와 아이콘의 가로 정렬 여부',
            },
            {
                name: 'onClick',
                type: '(event: React.MouseEvent<HTMLSpanElement>) => void',
                required: false,
                description: '클릭 이벤트 핸들러',
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: '추가 CSS 클래스',
            },
            {
                name: 'text',
                type: 'string',
                required: false,
                description: '아이콘과 함께 표시할 텍스트',
            },
            {
                name: 'textColor',
                type: 'string',
                required: false,
                description:
                    '테일윈드 텍스트 색상 클래스 또는 CSS 색상 값(아이콘 색상과 다르게 설정할 경우)',
            },
        ],
        usage: `Icon 컴포넌트는 Google Material Icons/Symbols를 사용하여 아이콘을 표시합니다.
다양한 크기와 색상, 스타일을 지원하며 클릭 이벤트도 처리할 수 있습니다.`,
        usageCode: `import Icon from '@/components/atoms/Icon';

// 기본 사용법
<Icon name="search" />

// 크기와 색상 지정
<Icon name="favorite" size="lg" color="text-red-500" />

// 텍스트와 함께 사용
<Icon name="home" text="홈" showText />

// 클릭 이벤트
<Icon name="thumb_up" clickable onClick={() => console.log('좋아요!')} />`,
        notes: [
            '아이콘 이름은 Google Material Icons에서 제공하는 이름을 사용해야 합니다.',
            '색상은 Tailwind CSS 클래스나 CSS 색상 값을 사용할 수 있습니다.',
            '클릭 가능한 아이콘은 접근성을 위해 적절한 aria-label을 제공하세요.',
        ],
    },
    input: {
        title: 'Input 컴포넌트',
        description:
            '폼 입력을 위한 컴포넌트입니다. label, hint, error 메시지를 포함하며, startAdornment, endAdornment로 아이콘이나 버튼을 추가할 수 있습니다.',
        componentName: 'Input',
        examples: [
            {
                title: '기본 사용',
                description: '가장 기본적인 입력 필드입니다.',
                code: `<Input />`,
                preview: <Input />,
            },
            {
                title: '사이즈 (size: sm, md, lg, full)',
                description: '다양한 크기의 입력 필드들입니다.',
                code: `<Input size="sm" />
<Input size="md" />
<Input size="lg" />
<Input size="full" />`,
                preview: (
                    <div className="flex flex-col gap-4">
                        <Input size="sm" />
                        <Input size="md" />
                        <Input size="lg" />
                        <Input size="full" />
                    </div>
                ),
            },
            {
                title: '타입 (type: text, password, email, number, tel)',
                description: '다양한 타입의 입력 필드들입니다.',
                code: `<Input type="text" label="텍스트" placeholder="텍스트 입력" showResetButton />
<Input type="password" label="비밀번호" placeholder="비밀번호 입력" showPasswordToggle />
<Input type="email" label="이메일" placeholder="mail@mail.com" />
<Input type="number" label="숫자" placeholder="숫자만 입력" />
<Input type="tel" label="전화번호" placeholder="010-1234-5678" />`,
                preview: (
                    <div className="flex flex-col gap-4">
                        <Input
                            type="text"
                            label="텍스트"
                            placeholder="텍스트 입력"
                            showResetButton
                        />
                        <Input
                            type="password"
                            label="비밀번호"
                            placeholder="비밀번호 입력"
                            showPasswordToggle
                        />
                        <Input type="email" label="이메일" placeholder="mail@mail.com" />
                        <Input type="number" label="숫자" placeholder="숫자만 입력" />
                        <Input type="tel" label="전화번호" placeholder="010-1234-5678" />
                    </div>
                ),
            },
            {
                title: '상태 (disabled, error, hint, readonly, required)',
                description: '다양한 상태의 입력 필드들입니다.',
                code: `<Input disabled />
<Input error="에러 메시지입니다" />
<Input hint="힌트 메시지입니다" />
<Input readOnly value="읽기 전용" />
<Input label="필수 입력" required placeholder="필수 입력 필드" />
<Input label="필수 입력 (값 있음)" required placeholder="필수 입력 필드" value="입력된 값" />`,
                preview: (
                    <div className="flex flex-col gap-4">
                        <Input disabled />
                        <Input error="에러 메시지입니다" />
                        <Input hint="힌트 메시지입니다" />
                        <Input readOnly value="읽기 전용" />
                        <Input label="필수 입력" required placeholder="필수 입력 필드" />
                        <Input
                            label="필수 입력 (값 있음)"
                            required
                            placeholder="필수 입력 필드"
                            value="입력된 값"
                        />
                    </div>
                ),
            },
        ],
        props: [
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg' | 'full'",
                required: false,
                defaultValue: "'md'",
                description: '크기',
            },
            {
                name: 'type',
                type: "'text' | 'password' | 'email' | 'number' | 'tel'",
                required: false,
                defaultValue: "'text'",
                description: '타입',
            },
            {
                name: 'label',
                type: 'string',
                required: false,
                description: '라벨 텍스트',
            },
            {
                name: 'hint',
                type: 'string',
                required: false,
                description: '힌트 메시지',
            },
            {
                name: 'error',
                type: 'string',
                required: false,
                description: '에러 메시지',
            },
            {
                name: 'disabled',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '비활성화',
            },
            {
                name: 'required',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '필수 입력',
            },
            {
                name: 'invalid',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '에러 상태',
            },
            {
                name: 'showPasswordToggle',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '비밀번호 토글 버튼 표시 여부',
            },
            {
                name: 'showResetButton',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '리셋 버튼 표시 여부',
            },
            {
                name: 'onReset',
                type: '() => void',
                required: false,
                description: '리셋 버튼 클릭 시 호출되는 콜백 (제어형 컴포넌트에서 상태 초기화용)',
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: '커스텀 클래스',
            },
        ],
        usage: `Input 컴포넌트는 폼 입력을 위한 컴포넌트입니다.
label, hint, error 메시지를 포함하며, startAdornment, endAdornment로 아이콘이나 버튼을 추가할 수 있습니다.`,
        usageCode: `import Input from '@/components/atoms/Input';

// 기본 사용법
<Input />

// 라벨과 힌트
<Input label="이름" hint="성과 이름을 입력하세요" />

// 에러 상태
<Input label="이메일" error="올바른 이메일을 입력하세요" />

// 비밀번호 필드
<Input type="password" label="비밀번호" showPasswordToggle />`,
        notes: [
            '필수 입력 필드는 required prop을 사용하여 표시하세요.',
            '에러 메시지는 사용자에게 명확한 안내를 제공해야 합니다.',
            '비밀번호 필드는 showPasswordToggle을 사용하여 사용자 편의성을 높이세요.',
        ],
    },
    'star-rating': {
        title: 'StarRating 컴포넌트',
        description:
            '0.5 단위 선택을 지원하는 별점 컴포넌트입니다. 키보드 및 마우스(호버/클릭) 인터랙션을 지원하며, className으로 Tailwind 스타일을 오버라이드할 수 있습니다.',
        componentName: 'StarRating',
        examples: [
            {
                title: '기본 사용',
                description: '가장 기본적인 별점 컴포넌트입니다.',
                code: `const [rating, setRating] = useState(3.5);
<StarRating value={rating} onChange={setRating} />`,
                preview: (
                    <div className="flex items-center gap-4">
                        <StarRating value={3.5} />
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                            현재 값: 3.5
                        </Text>
                    </div>
                ),
            },
            {
                title: '정수 단위만 (allowHalf = false)',
                description: '정수 단위만 선택 가능한 별점입니다.',
                code: `<StarRating value={rating} onChange={setRating} allowHalf={false} />`,
                preview: (
                    <div className="flex items-center gap-4">
                        <StarRating value={4} allowHalf={false} />
                        <Text className="text-sm text-gray-600 dark:text-gray-400">현재 값: 4</Text>
                    </div>
                ),
            },
            {
                title: '읽기 전용 (readOnly)',
                description: '읽기 전용 별점입니다.',
                code: `<StarRating value={2.5} readOnly />`,
                preview: <StarRating value={2.5} readOnly />,
            },
            {
                title: '사이즈 (size: sm, md, lg)',
                description: '다양한 크기의 별점들입니다.',
                code: `<StarRating value={rating} size="lg" onChange={setRating} />`,
                preview: (
                    <div className="flex flex-col gap-4">
                        <StarRating value={4} size="sm" />
                        <StarRating value={4} size="md" />
                        <StarRating value={4} size="lg" />
                    </div>
                ),
            },
            {
                title: '비활성화 (disabled)',
                description: '비활성화된 별점입니다.',
                code: `<StarRating value={4} disabled />`,
                preview: <StarRating value={4} disabled />,
            },
            {
                title: '스타일 오버라이드 (간격/정렬)',
                description: '커스텀 스타일을 적용한 별점입니다.',
                code: `<StarRating value={4.5} className="gap-1.5" />`,
                preview: <StarRating value={4.5} className="gap-1.5" />,
            },
        ],
        props: [
            {
                name: 'value',
                type: 'number',
                required: true,
                description: '현재 별점 (0 ~ max), 0.5 단위 지원',
            },
            {
                name: 'max',
                type: 'number',
                required: false,
                defaultValue: '5',
                description: '최대 별 개수',
            },
            {
                name: 'readOnly',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '읽기 전용 (입력 비활성화)',
            },
            {
                name: 'disabled',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '비활성화',
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                required: false,
                defaultValue: "'md'",
                description: '아이콘 크기 프리셋',
            },
            {
                name: 'allowHalf',
                type: 'boolean',
                required: false,
                defaultValue: 'true',
                description: '반개 단위 허용 여부',
            },
            {
                name: 'onChange',
                type: '(nextValue: number) => void',
                required: false,
                description: '값 변경 시 호출되는 콜백함수',
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: '커스텀 클래스',
            },
            {
                name: 'ariaLabel',
                type: 'string',
                required: false,
                defaultValue: "'별점'",
                description: '스크린 리더용 레이블',
            },
        ],
        usage: `StarRating 컴포넌트는 0.5 단위 선택을 지원하는 별점 컴포넌트입니다.
키보드 및 마우스(호버/클릭) 인터랙션을 지원하며, className으로 Tailwind 스타일을 오버라이드할 수 있습니다.`,
        usageCode: `import StarRating from '@/components/molecules/StarRating';

// 기본 사용법
const [rating, setRating] = useState(3.5);
<StarRating value={rating} onChange={setRating} />

// 읽기 전용
<StarRating value={4.5} readOnly />

// 정수 단위만
<StarRating value={rating} onChange={setRating} allowHalf={false} />`,
        notes: [
            '키보드: ←/→/↑/↓로 증감, Home=0, End=max',
            '마우스: 호버 시 임시 반영(프리뷰), 클릭으로 확정',
            '접근성을 위해 적절한 aria-label을 제공하세요.',
        ],
    },
    tag: {
        title: 'Tag / TagList / CategoryTag 컴포넌트',
        description:
            'Tag는 팔레트를 받아 렌더링하는 단순한 프레젠테이션 전용 컴포넌트, CategoryTag는 카테고리 → 색상 매핑 컴포넌트입니다. TagList로 여러 태그들을 묶어 간격/줄바꿈을 제어할 수 있습니다.',
        componentName: 'Tag',
        examples: [
            {
                title: 'Tag : 기본 사용',
                description: '기본적인 태그 컴포넌트입니다.',
                code: `<Tag label="임시 태그" />
<Tag label="Draft" palette={NEUTRAL} />
<Tag label="비활성" disabled />`,
                preview: (
                    <TagList>
                        <Tag label="임시 태그" />
                        <Tag label="Draft" />
                        <Tag label="비활성" disabled />
                    </TagList>
                ),
            },
            {
                title: 'CategoryTag : 카테고리별 색상 매핑',
                description: '카테고리에 따라 색상이 자동으로 매핑되는 태그입니다.',
                code: `<CategoryTag label="카페" category="Status" />
<CategoryTag label="한강로길" category="Location" />
<CategoryTag label="데이트" category="PartySize" />
<CategoryTag label="감성" category="Mood" />
<CategoryTag label="테이크아웃" category="Service" />
<CategoryTag label="자유 태그" />`,
                preview: (
                    <TagList>
                        <CategoryTag label="카페" category="Status" />
                        <CategoryTag label="한강로길" category="Location" />
                        <CategoryTag label="데이트" category="PartySize" />
                        <CategoryTag label="감성" category="Mood" />
                        <CategoryTag label="테이크아웃" category="Service" />
                        <CategoryTag label="자유 태그" />
                    </TagList>
                ),
            },
            {
                title: '사이즈 (size: sm, md)',
                description: '다양한 크기의 태그들입니다.',
                code: `<CategoryTag label="작음(sm)" category="Mood" size="sm" />
<CategoryTag label="기본(md)" category="Mood" size="md" />`,
                preview: (
                    <div className="space-y-6">
                        <div>
                            <TagList>
                                <CategoryTag label="작음(sm)" category="Mood" size="sm" />
                                <CategoryTag label="기본(md)" category="Mood" size="md" />
                            </TagList>
                        </div>
                    </div>
                ),
            },
            {
                title: '리스트 레이아웃 (gap, wrap)',
                description: '여러 태그를 리스트로 배치하는 예제입니다.',
                code: `<TagList gap="lg" wrap>
  {Array.from({ length: 8 }).map((_, i) => (
    <CategoryTag key={i} label={\`태그 \${i + 1}\`} category="Status" />
  ))}
</TagList>`,
                preview: (
                    <div className="space-y-6">
                        <div>
                            <TagList gap="lg" wrap className="max-w-xs border rounded p-3">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <CategoryTag
                                        key={i}
                                        label={`태그 ${i + 1}`}
                                        category="Status"
                                    />
                                ))}
                            </TagList>
                        </div>
                    </div>
                ),
            },
        ],
        props: [
            {
                name: 'label',
                type: 'string',
                required: true,
                description: '표시할 텍스트',
            },
            {
                name: 'palette',
                type: '{ base: string; hover?: string }',
                required: false,
                description: '색상 팔레트 (Tag만)',
            },
            {
                name: 'category',
                type: "'Status' | 'Location' | 'PartySize' | 'Mood' | 'Service'",
                required: false,
                description: '카테고리 (CategoryTag만)',
            },
            {
                name: 'disabled',
                type: 'boolean',
                required: false,
                defaultValue: 'false',
                description: '비활성화',
            },
            {
                name: 'size',
                type: "'sm' | 'md'",
                required: false,
                defaultValue: "'md'",
                description: '크기',
            },
            {
                name: 'gap',
                type: "'sm' | 'md' | 'lg'",
                required: false,
                defaultValue: "'md'",
                description: '간격 (TagList만)',
            },
            {
                name: 'wrap',
                type: 'boolean',
                required: false,
                defaultValue: 'true',
                description: '줄바꿈 허용 (TagList만)',
            },
            {
                name: 'className',
                type: 'string',
                required: false,
                description: '커스텀 클래스',
            },
        ],
        usage: `Tag는 팔레트를 받아 렌더링하는 단순한 프레젠테이션 전용 컴포넌트입니다.
CategoryTag는 카테고리 → 색상 매핑 컴포넌트이고, TagList로 여러 태그들을 묶어 간격/줄바꿈을 제어할 수 있습니다.`,
        usageCode: `import Tag from '@/components/atoms/Tag';
import TagList from '@/components/atoms/TagList';
import CategoryTag from '@/components/atoms/CategoryTag';

// 기본 태그
<Tag label="태그명" />

// 카테고리 태그
<CategoryTag label="카페" category="Status" />

// 태그 리스트
<TagList gap="lg" wrap>
  <CategoryTag label="태그1" category="Mood" />
  <CategoryTag label="태그2" category="Location" />
</TagList>`,
        notes: [
            'Tag는 프레젠테이션 전용 컴포넌트입니다.',
            'CategoryTag는 카테고리에 따라 자동으로 색상이 매핑됩니다.',
            'TagList로 여러 태그의 간격과 줄바꿈을 제어할 수 있습니다.',
        ],
    },
};
