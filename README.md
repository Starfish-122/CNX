# CUI project

> [Next.js](https://nextjs.org) 기반의 UI 프로젝트
>
> [바로가기](https://cui-dun.vercel.app/)

## 1. 환경 & 시작하기

### 1.1. 시스템 요구사항

-   Node.js 22.16.0
-   npm 10.9.2 이상

### 1.2. 기술 스택

#### 핵심 프레임워크

-   **Next.js 15.5.0**: React 기반 풀스택 프레임워크
-   **React 19.1.0**: UI 라이브러리
-   **TypeScript 5**: 정적 타입 검사

#### 스타일링

-   **Tailwind CSS 4**: 유틸리티 우선 CSS 프레임워크
-   **Material Icons**: Google의 아이콘 라이브러리 (material-symbols-outlined)
-   **tailwind-merge 3.3.1**: Tailwind 클래스 병합 유틸리티
-   **styled-normalize 8.1.1**: CSS 정규화
-   **styled-reset 4.5.2**: CSS 리셋

#### 유틸리티

-   **clsx 2.1.1**: 조건부 클래스명 유틸리티
-   **react-syntax-highlighter 15.6.6**: 코드 하이라이팅

#### 개발 도구

-   **ESLint 9**: 코드 품질 검사
-   **Prettier**: 코드 포맷팅

### 1.3. 개발 서버 실행

```bash
# turbopack
npm run dev
# dev
npm run dev:old
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 2. 프로젝트 구조

```
src/
├── app/                          # Next.js 앱 라우터
│   ├── (pages)/                  # 페이지 그룹
│   │   ├── guide/                # 컴포넌트 가이드
│   │   │   ├── [component]/      # 동적 라우팅
│   │   │   │   └── page.tsx      # 컴포넌트 상세 페이지
│   │   │   ├── layout.tsx        # 가이드 레이아웃
│   │   │   └── page.tsx          # 가이드 메인 페이지
│   │   ├── map/                  # 지도 페이지
│   │   │   └── page.tsx
│   │   └── layout.tsx            # 페이지 그룹 레이아웃
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 홈페이지
│
├── components/                   # UI 컴포넌트 (Atomic Design)
│   ├── atoms/                    # 기본 UI 컴포넌트 (더이상 분해 불가)
│   │   ├── Button.tsx           # 버튼 컴포넌트
│   │   ├── Icon.tsx             # 아이콘 컴포넌트
│   │   ├── Input.tsx            # 입력 필드 컴포넌트
│   │   ├── Text.tsx             # 텍스트 컴포넌트
│   │   ├── Title.tsx            # 타이틀 컴포넌트
│   │   ├── Textarea.tsx         # 텍스트 영역 컴포넌트
│   │   ├── Tag.tsx              # 태그 컴포넌트
│   │   ├── TagList.tsx          # 태그 리스트 컴포넌트
│   │   ├── CategoryTag.tsx      # 카테고리 태그 컴포넌트
│   │   ├── CodeTag.tsx          # 코드 태그 컴포넌트
│   │   ├── buttonStyle.ts       # 버튼 스타일 정의
│   │   └── categoryColors.ts    # 카테고리 색상 정의
│   │
│   ├── molecules/                # atoms를 조합한 복합 컴포넌트
│   │   ├── Card.tsx             # 카드 컴포넌트
│   │   ├── CodeBlock.tsx        # 코드 블록 컴포넌트
│   │   ├── ExampleCard.tsx      # 예제 카드 컴포넌트
│   │   ├── PropsTable.tsx       # Props 테이블 컴포넌트
│   │   ├── StarRating.tsx       # 별점 컴포넌트
│   │   ├── Tab.tsx              # 탭 컴포넌트
│   │   ├── Slide.tsx            # 슬라이드 컴포넌트
│   │   └── RecommendCard.tsx    # 추천 카드 컴포넌트
│   │
│   ├── organisms/                # molecules/atoms를 조합한 큰 UI 블록
│   │   ├── Header.tsx           # 헤더 컴포넌트
│   │   └── Footer.tsx           # 푸터 컴포넌트
│   │
│   ├── templates/                # 페이지 레이아웃 템플릿
│   │   ├── GuidePageLayout.tsx  # 가이드 페이지 레이아웃
│   │   └── GuideSection.tsx     # 가이드 섹션 컴포넌트
│   │
│   └── pages/                    # 페이지 컴포넌트 (재사용 가능)
│       ├── HomePage.tsx         # 홈페이지 컴포넌트
│       ├── GuidePage.tsx        # 가이드 페이지 컴포넌트
│       └── MapPage.tsx          # 지도 페이지 컴포넌트
│
├── data/                         # 데이터 관리
│   └── componentData.tsx        # 컴포넌트 데이터 (중앙화)
│
├── routes/                       # 라우팅 설정
│   ├── config.ts                # 라우팅 설정 (자동 분류)
│   ├── hooks.ts                 # 라우팅 훅
│   └── index.ts                 # 라우팅 유틸리티
│
├── styles/                       # 스타일 시스템
│   ├── globals.css              # 전역 스타일
│   ├── theme-colors.css         # 색상 테마
│   ├── theme-typography.css     # 타이포그래피 테마
│   ├── theme-spacing.css        # 간격 테마
│   ├── theme-effects.css        # 효과 테마
│   └── custom-utilities.css     # 커스텀 유틸리티
│
└── utils/                        # 유틸리티 함수
    ├── constants.ts             # 상수 정의
    ├── formatters.ts            # 데이터 포맷팅
    ├── helpers.ts               # 헬퍼 함수
    ├── types.ts                 # 공통 타입 정의
    └── validators.ts            # 검증 함수
```

## 3. 핵심 기능

### 3.1. 중앙화된 컴포넌트 데이터 관리

-   **componentData.tsx**: 모든 컴포넌트 정보를 중앙에서 관리
-   **자동 분류**: 컴포넌트 이름에 따라 atoms/molecules 자동 분류
-   **동적 라우팅**: `[component]` 동적 세그먼트로 자동 페이지 생성

### 3.2. Atomic Design 패턴

-   **atoms**: 기본 UI 컴포넌트 (Button, Input, Text 등)
-   **molecules**: 복합 컴포넌트 (Card, StarRating, CodeBlock 등)
-   **organisms**: 큰 UI 블록 (Header, Footer)
-   **templates**: 페이지 레이아웃 (GuidePageLayout)
-   **pages**: 페이지 컴포넌트 (HomePage, GuidePage, MapPage)

### 3.3. 자동화된 가이드 시스템

-   **자동 네비게이션**: componentData 기반 사이드바 자동 생성
-   **동적 페이지**: 새 컴포넌트 추가 시 자동으로 가이드 페이지 생성
-   **일관된 구조**: 모든 컴포넌트가 동일한 가이드 구조 사용

## 4. 개발 규칙

### 4.1. 컴포넌트 작성

-   TypeScript 사용, 함수형 컴포넌트만 사용
-   `'use client'` 지시문으로 클라이언트 컴포넌트 명시
-   절대경로 import 사용 (`@/components/...`)

### 4.2. 스타일링

-   Tailwind CSS 유틸리티 클래스 우선 사용 (복잡한 스타일 등)
-   `tailwind-merge`로 클래스 충돌 방지
-   반응형 디자인: `sm:`, `md:`, `lg:` 접두사 활용
-   다크 모드: `dark:` 접두사 활용
-   클래스명 충돌 방지를 위해 tailwind-merge 사용

    ```tsx
    import { twMerge } from 'tailwind-merge';

    // 클래스 병합 (충돌 시 나중에 선언된 값 우선)
    <div className={twMerge('text-red-500', className)}>{children}</div>;
    ```

#### 4.2.1. 테마 변수 관리

-   테마 변수는 styles/ 폴더 내 파일에서 관리
-   정적 테마 변수는 `@theme static`으로 정의 (빌드 타임에 결정되는 값)
    ```css
    /* theme-colors.css */
    @theme static {
        --color-primary: #3b82f6;
        --color-secondary: #64748b;
        --color-success: #10b981;
        --color-warning: #f59e0b;
        --color-error: #ef4444;
    }
    ```
-   동적 테마 변수는 `@theme inline`으로 정의 (런타임에 변경 가능한 값)
    ```css
    /* globals.css */
    @theme inline {
        --color-background: var(--background);
        --color-foreground: var(--foreground);
    }
    ```

#### 4.2.2. 커스텀 유틸리티 정의

-   재사용 가능한 스타일 패턴은 `@utility`로 정의
    ```css
    /* custom-utilities.css */
    @utility card {
        border-radius: 0.5rem;
        box-shadow: var(--shadow-md);
    }
    ```

### 4.3. 데이터 관리

-   **중앙화**: 모든 컴포넌트 데이터는 `componentData.tsx`에서 관리
-   **자동화**: 새 컴포넌트 추가 시 자동으로 네비게이션에 반영
-   **일관성**: 모든 컴포넌트가 동일한 데이터 구조 사용

### 4.4. 기타 관리 규칙

#### 4.4.1. 이미지/정적 파일

-   이미지 등 정적 파일은 public/ 폴더에 저장
-   불필요한 대용량 파일은 업로드 금지

#### 4.4.2. 접근성 & 반응형

-   기본적인 웹 접근성(aria, alt 등) 준수
-   모바일/데스크탑 반응형 스타일 필수

#### 4.4.3. 주의사항

-   `robots.ts`, `next.config.mjs`로 검색 엔진 크롤링 방지(배포시 수정/삭제 필요)
-   하이드레이션 오류 발생 시 확인사항:
    -   클라이언트/서버 컴포넌트 구분 명확히 (`'use client'` 지시문 확인)
    -   폰트 및 CSS 변수 참조 오류 확인
    -   서버와 클라이언트 간 렌더링 차이가 없는지 확인

## 5. 새 컴포넌트 추가 방법

1. **componentData.tsx에 데이터 추가**

```typescript
newComponent: {
    title: '새 컴포넌트',
    description: '새 컴포넌트 설명',
    componentName: 'NewComponent',
    examples: [...],
    props: [...],
    usage: '사용법 설명',
    usageCode: '코드 예시',
    notes: ['주의사항']
}
```

2. **자동으로 처리되는 것들**

-   사이드바에 자동 추가
-   `/guide/[컴포넌트명]` 경로 자동 생성
-   가이드 페이지 자동 생성

## 6. 배포

-   [Vercel Platform](https://vercel.com/)을 통한 자동 배포

## 7. 참고자료

Next.js와 Tailwind CSS에 대해 알아보려면, 아래 링크를 클릭하세요.

-   [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능과 API.
-   [Learn Next.js](https://nextjs.org/learn) - Next.js 튜토리얼.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind CSS 문서
-   [Material Icons](https://fonts.google.com/icons) - Google Material Icons 라이브러리
-   [Material Symbols](https://fonts.google.com/icons?icon.style=Outlined) - Material Symbols 아이콘 스타일
-   [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - 코드 하이라이팅 라이브러리
-   [clsx](https://github.com/lukeed/clsx) - 조건부 클래스명 유틸리티

## 8. 확장프로그램

### 8.1. Tailwind CSS IntelliSense

-   **설치 링크**: [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
-   **장점**: Tailwind 클래스명 자동완성 및 제안
-   **사용방법**:
    -   HTML/JSX 파일에서 `className` 속성에 마우스 커서를 올리면 미리보기 표시
    -   `Ctrl + Space`로 자동완성 목록 확인

### 8.2. Tailwind Documentation

-   **설치 링크**: [Tailwind Documentation](https://marketplace.visualstudio.com/items?itemName=alfredbirk.tailwind-documentation)
-   **장점**:
    -   Tailwind 클래스에 대한 공식 문서 빠른 접근
    -   사용 중인 Tailwind 버전에 맞는 문서 제공
-   **사용방법**: `Ctrl + Shift + P`로 명령 팔레트 열고 "Tailwind: Open Documentation" 실행

### 8.3. ES7+ React/Redux/React-Native snippets

-   **설치 링크**: [ES7+ React/Redux/React-Native snippets](https://open-vsx.org/extension/dsznajder/es7-react-js-snippets)
-   **장점**: 빠른 컴포넌트 생성: 자주 사용하는 React 패턴을 단축키로 생성
-   **주요 스니펫**:
    -   `rafce`: React Arrow Function Component Export
    -   `rafc`: React Arrow Function Component
    -   `rfc`: React Function Component
    -   `useState`: useState Hook 생성
    -   `useEffect`: useEffect Hook 생성
    -   `usf`: useState with function
    -   `usf`: useEffect with function
-   **사용방법**:
    1.  `.jsx` 또는 `.tsx` 파일에서 스니펫 입력
    2.  `Tab` 키로 자동완성 실행

### 8.4. Bracket Pair Colorizer

-   **설치 링크**: [Bracket Pair Colorizer](https://open-vsx.org/extension/CoenraadS/bracket-pair-colorizer)
-   **장점**: 중괄호, 대괄호, 소괄호를 색상으로 구분되어 중첩 구조 파악
-   **사용방법**: 자동 적용

## 9. 설치 패키지
### 9.1. Notion API
-   **설치**: [npm i @notionhq/client] (https://www.npmjs.com/package/@notionhq/client)
-   **역할**: Notion 데이터베이스를 코드에서 조회/생성/수정할 수 있는 공식 SDK
-   **환경변수**: .env.local
    `NOTION_KEY`=ntn_xxxxxxxxxxxxxxxxxxxxxxxxx
    : Notion Internal Integration Secret
    `NOTION_DATABASE_ID`=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    : 원본 데이터베이스 페이지 → 링크 복사 시 URL 중간 32자 해시
-   **사전준비**: 
    - 1. Notion 내부 통합(Internal Integration) 생성 → Secret 발급
    - 2. 대상 DB 페이지 ▸ 공유 ▸ 연결(Connections) 에서 통합 초대(Can read)
        (연결 탭이 안 보이면 DB를 내 워크스페이스로 Move to 후 다시 시도)

### 9.2. EmailJS
-   **설치**: [npm i @emailjs/browser] (https://www.npmjs.com/package/@emailjs/browser)
-   **사이트**: [메일 템플릿 작성 등] (https://www.emailjs.com/)
-   **역할**: 백엔드 없이 클라이언트에서 이메일 전송
-   **환경변수**: .env.local
    `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`=*****************
    `EMAILJS_TEMPLATE_ID`=***************
    `EMAILJS_SERVICE_ID`=***************
---
