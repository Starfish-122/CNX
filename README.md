# CUI project

> [Next.js](https://nextjs.org) 기반의 UI 프로젝트
>
> [바로가기](https://cui-dun.vercel.app/)

## 1. 환경 & 시작하기

### 1.1. 시스템 요구사항

**버전**

-   Node.js 22.16.0
-   npm 10.9.2 이상

### 1.2. 기술 스택

#### 1.2.1. 핵심 프레임워크

-   **Next.js 15.5.0**: React 기반 풀스택 프레임워크
-   **React 19.1.0**: UI 라이브러리
-   **TypeScript 5**: 정적 타입 검사

#### 1.2.2. 스타일링

-   **Tailwind CSS 4**: 유틸리티 우선 CSS 프레임워크
-   **Sass 1.90.0**: CSS 전처리기
-   **tailwind-merge 3.3.1**: Tailwind 클래스 병합 유틸리티
-   **styled-normalize 8.1.1**: CSS 정규화
-   **styled-reset 4.5.2**: CSS 리셋

#### 1.2.3. 유틸리티

-   **clsx 2.1.1**: 조건부 클래스명 유틸리티
-   **react-syntax-highlighter 15.6.6**: 코드 하이라이팅

#### 1.2.4. 개발 도구

-   **ESLint 9**: 코드 품질 검사
-   **Prettier**: 코드 포맷팅
-   **@tailwindcss/postcss 4.1.13**: PostCSS 플러그인

### 1.3. 개발 서버 실행

```bash
# turbopack
npm run dev
# dev
npm run dev:old
```

브라우저에서 [http://localhost:3002](http://localhost:3002) 접속 (포트 3000이 사용 중일 경우)

## 2. 프로젝트 구조

| 폴더명/파일명               | 설명                                 |
| --------------------------- | ------------------------------------ |
| **app/**                    | Next.js 앱 라우터 폴더 (라우팅 정의) |
| ├─ **(pages)/**             | 페이지 그룹 (URL에는 미표출)         |
| │ ├─ **guide/**             | 컴포넌트 가이드 페이지               |
| │ │ ├─ **icon/**            | 아이콘 컴포넌트 가이드               |
| │ │ ├─ **input/**           | 입력 필드 컴포넌트 가이드            |
| │ │ ├─ **star-rating/**     | 별점 컴포넌트 가이드                 |
| │ │ ├─ **tag/**             | 태그 컴포넌트 가이드                 |
| │ │ ├─ **text/**            | 텍스트 컴포넌트 가이드               |
| │ │ ├─ **textarea/**        | 텍스트 영역 컴포넌트 가이드          |
| │ │ ├─ **title/**           | 타이틀 컴포넌트 가이드               |
| │ │ ├─ layout.tsx           | 가이드 페이지 사이드바 레이아웃      |
| │ │ └─ page.tsx             | 가이드 메인 페이지 (라우팅)          |
| │ ├─ **map/**               | 지도 페이지                          |
| │ │ └─ page.tsx             | 지도 페이지 (라우팅)                 |
| │ └─ layout.tsx             | 페이지 그룹 레이아웃                 |
| ├─ layout.tsx               | 루트 레이아웃 (Header, Footer 포함)  |
| └─ page.tsx                 | 홈페이지 (라우팅)                    |
|                             |                                      |
| **components/**             | UI 컴포넌트 (Atomic Design 패턴)     |
| ├─ **atoms/**               | 기본 UI 컴포넌트 (더이상 분해 불가)  |
| │ ├─ CategoryTag.tsx        | 카테고리 태그 컴포넌트               |
| │ ├─ CodeTag.tsx            | 코드 태그 컴포넌트                   |
| │ ├─ Icon.tsx               | 아이콘 컴포넌트 (Material Icons)     |
| │ ├─ Input.tsx              | 입력 필드 컴포넌트                   |
| │ ├─ Tag.tsx                | 태그 컴포넌트                        |
| │ ├─ TagList.tsx            | 태그 리스트 컴포넌트                 |
| │ ├─ Text.tsx               | 텍스트 컴포넌트                      |
| │ ├─ Textarea.tsx           | 텍스트 영역 컴포넌트                 |
| │ ├─ Title.tsx              | 타이틀 컴포넌트                      |
| │ └─ categoryColors.ts      | 카테고리 색상 정의                   |
| ├─ **molecules/**           | atoms를 조합한 복합 컴포넌트         |
| │ ├─ CodeBlock.tsx          | 코드 블록 컴포넌트                   |
| │ ├─ ExampleCard.tsx        | 예제 카드 컴포넌트                   |
| │ ├─ PropsTable.tsx         | Props 테이블 컴포넌트                |
| │ ├─ Slide.tsx              | 슬라이드 컴포넌트                    |
| │ ├─ StarRating.tsx         | 별점 컴포넌트                        |
| │ └─ Tab.tsx                | 탭 컴포넌트                          |
| ├─ **organisms/**           | molecules/atoms를 조합한 큰 UI 블록  |
| │ ├─ Footer.tsx             | 푸터 컴포넌트                        |
| │ └─ Header.tsx             | 헤더 컴포넌트                        |
| ├─ **templates/**           | 페이지 레이아웃 템플릿               |
| │ ├─ GuidePageLayout.tsx    | 가이드 페이지 내용 레이아웃          |
| │ └─ GuideSection.tsx       | 가이드 섹션 컴포넌트                 |
| └─ **pages/**               | 페이지 컴포넌트 (재사용 가능)        |
| │ ├─ GuidePage.tsx          | 가이드 페이지 컴포넌트               |
| │ ├─ HomePage.tsx           | 홈페이지 컴포넌트                    |
| │ └─ MapPage.tsx            | 지도 페이지 컴포넌트                 |
|                             |                                      |
| **styles/**                 | 스타일 시스템 (@theme static 방식)   |
| ├─ **theme-colors.css**     | 색상 테마 변수 (@theme static)       |
| ├─ **theme-typography.css** | 타이포그래피 테마 변수               |
| ├─ **theme-spacing.css**    | 간격 테마 변수                       |
| ├─ **theme-effects.css**    | 그림자, 애니메이션 테마 변수         |
| ├─ **custom-utilities.css** | 커스텀 유틸리티 정의 (@utility)      |
| └─ **globals.css**          | 전역 스타일                          |
|                             |                                      |
| **routes/**                 | 라우팅 관련 설정 및 유틸리티         |
| ├─ config.ts                | 라우팅 설정 (사이드바 카테고리 등)   |
| ├─ hooks.ts                 | 라우팅 훅                            |
| └─ index.ts                 | 라우팅 유틸리티 내보내기             |
|                             |                                      |
| **utils/**                  | 유틸리티 함수 및 상수                |
| ├─ constants.ts             | 상수 정의                            |
| ├─ formatters.ts            | 데이터 포맷팅 함수                   |
| ├─ helpers.ts               | 헬퍼 함수                            |
| ├─ types.ts                 | 공통 타입 정의                       |
| └─ validators.ts            | 검증 함수                            |

## 3. 개발 규칙

### 3.1 컴포넌트 작성

-   각 컴포넌트는 개별 파일로 관리 (TypeScript 사용)
-   Atomic Design 패턴을 따라 atoms → molecules → organisms → templates → pages 순으로 구성
-   컴포넌트별로 JSDoc 주석을 통한 Props 인터페이스 문서화
-   `'use client'` 지시문을 사용하여 클라이언트 컴포넌트 명시

### 3.2. 클라이언트/서버 컴포넌트

-   useState, useEffect 등 클라이언트 훅 사용 시 파일 최상단에 `'use client'` 선언
-   서버 컴포넌트(기본값)는 데이터 패칭, SEO 등 서버 전용 로직에 사용
-   하이드레이션 오류 방지를 위해 Header, Footer 등 공통 컴포넌트는 클라이언트 컴포넌트로 구현
-   서버/클라이언트 컴포넌트 혼합 시 props 전달에 주의 (서버→클라이언트 O, 클라이언트→서버 X)

### 3.3. 라우팅과 컴포넌트 분리

-   **app/ 폴더**: Next.js 라우팅 정의 (URL 경로와 연결)
-   **components/pages/ 폴더**: 재사용 가능한 페이지 컴포넌트 (UI 로직)

```tsx
// app/(pages)/map/page.tsx (라우팅)
export default function MapPageRoute() {
    return <MapPage />; // components/pages/MapPage.tsx 사용
}

// components/pages/MapPage.tsx (UI 컴포넌트)
export default function MapPage() {
    // 실제 UI 로직 구현
    return <div>지도 페이지 내용</div>;
}
```

### 3.4. 코드 스타일

-   Prettier, ESLint 설정 준수
-   함수형 컴포넌트만 사용
-   import 경로는 절대경로(@/...) 사용
    ```json
    // tsconfig.json
    "paths": {
        "@/app/*": ["./src/app/*"],
        "@/components/*": ["./src/components/*"],
        "@/routes": ["./src/routes"],
        "@/styles/*": ["./src/styles/*"],
        "@/utils/*": ["./src/utils/*"],
    }
    ```
-   Props 인터페이스는 JSDoc 주석으로 설명 추가
    ```tsx
    export interface ButtonProps {
        /** 버튼 내용 */
        children: React.ReactNode;
        /** 버튼 타입 */
        variant?: 'primary' | 'secondary' | 'outline';
    }
    ```

### 3.5. 네이밍 컨벤션

-   폴더/파일/컴포넌트명 : camelCase 사용 (예: searchBar)
-   변수/함수명 : camelCase
-   CSS 클래스명 : Tailwind 유틸리티 클래스 우선 사용

### 3.6. 스타일 가이드

#### 3.6.1. Tailwind CSS 사용 원칙

-   유틸리티 클래스 우선 사용 (utility-first)
-   복잡한 스타일은 컴포넌트 추출 또는 커스텀 유틸리티로 정의
-   반응형 디자인은 접두사 활용 (sm:, md:, lg:)
-   다크 모드는 dark: 접두사 활용
-   클래스명 충돌 방지를 위해 tailwind-merge 사용

    ```tsx
    import { twMerge } from 'tailwind-merge';

    // 클래스 병합 (충돌 시 나중에 선언된 값 우선)
    <div className={twMerge('text-red-500', className)}>{children}</div>;
    ```

#### 3.6.2. 테마 변수 관리

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

#### 3.6.3. 커스텀 유틸리티 정의

-   재사용 가능한 스타일 패턴은 `@utility`로 정의
    ```css
    /* custom-utilities.css */
    @utility card {
        border-radius: 0.5rem;
        box-shadow: var(--shadow-md);
    }
    ```

### 3.7. 기타

-   README, 주석 등 문서화 신경쓰기
-   불필요한 전역 스타일 import 지양, 필요한 곳에서만 import
-   컴포넌트 가이드 페이지를 통한 실시간 컴포넌트 확인 가능

## 4. 기타 관리 규칙

### 4.1. 이미지/정적 파일

-   이미지 등 정적 파일은 public/ 폴더에 저장
-   불필요한 대용량 파일은 업로드 금지

### 4.2. 접근성 & 반응형

-   기본적인 웹 접근성(aria, alt 등) 준수
-   모바일/데스크탑 반응형 스타일 필수

### 4.3. 주의사항

-   `robots.ts`, `next.config.mjs`로 검색 엔진 크롤링 방지(배포시 수정/삭제 필요)
-   하이드레이션 오류 발생 시 확인사항:
    -   클라이언트/서버 컴포넌트 구분 명확히 (`'use client'` 지시문 확인)
    -   폰트 및 CSS 변수 참조 오류 확인
    -   서버와 클라이언트 간 렌더링 차이가 없는지 확인

## 5. 배포하기

-   [Vercel Platform](https://vercel.com/)을 통한 자동 배포

## 6. 참고자료

Next.js와 Tailwind CSS에 대해 알아보려면, 아래 링크를 클릭하세요.

-   [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능과 API.
-   [Learn Next.js](https://nextjs.org/learn) - Next.js 튜토리얼.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind CSS 문서
-   [Material Icons](https://fonts.google.com/icons) - Google Material Icons 라이브러리
-   [Material Symbols](https://fonts.google.com/icons?icon.style=Outlined) - Material Symbols 아이콘 스타일
-   [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - 코드 하이라이팅 라이브러리
-   [clsx](https://github.com/lukeed/clsx) - 조건부 클래스명 유틸리티

## 7. 확장프로그램

-   [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
-   [Tailwind Documentation](https://marketplace.visualstudio.com/items?itemName=alfredbirk.tailwind-documentation)

<!--
#### 3.5.4. 컴포넌트 스타일링

-   컴포넌트 스타일은 해당 컴포넌트 폴더에 CSS 파일로 작성
-   테마 변수 참조 시 `@reference`로 중복 방지

    ```css
    /* Button.css */
    @reference "../../styles/theme-colors.css";

    .custom-button {
        background-color: var(--color-primary);
    }
    ```

#### 3.5.5. 파일 의존성 관리

-   메인 CSS 파일에서는 `@import` 사용
-   컴포넌트 CSS 파일에서는 `@reference` 사용
-   Vue/React 컴포넌트 내 스타일에서는 `@reference` 사용
-->
<!--
## 4. 협업 규칙

### 4.1. 커밋 컨벤션 [🔗](https://www.conventionalcommits.org/ko/v1.0.0/)

-   커밋 메시지는 [타입]: [내용] 형식으로 작성 (예: feat: 검색바 컴포넌트 추가)
-   주요 커밋 타입
    -   `feat`: 새로운 기능 추가
    -   `fix`: 버그 수정
    -   `style`: 코드 포맷팅, 세미콜론 누락 등
    -   `refactor`: 코드 구조 개선 (기능 변화 X)
    -   `docs`: 문서 작성/수정

### 4.2 브랜치 구조

> GitHub 규칙 추가 : Settings > Branches > Branch protection rules

-   `main`: 배포(프로덕션)용 브랜치, 항상 안정적인 코드만 유지
-->
<!--
## 향후 확장 계획

### PR(Pull Request) 규칙
- PR 제목과 설명에 변경사항, 목적, 테스트 방법 명확히 작성
- 작업 단위를 작게 쪼개서 PR 생성
- 리뷰어 지정 및 코드리뷰 필수
- 관련 이슈 번호(있다면) 명시
- CI(테스트, 린트 등) 통과 후 머지

### 브랜치 구조
- `main`: 배포(프로덕션)용 브랜치, 항상 안정적인 코드만 유지
- `feature/…`: 기능 개발용 브랜치 (예: feature/login)
- `hotfix/…`: 긴급 수정용 브랜치 (예: hotfix/login-bug)

### 테스트
- 중요 로직/컴포넌트는 테스트 코드 작성 권장
- 테스트 파일은 **tests**/ 또는 \*.test.js(또는 .ts)로 관리

### CI/CD 및 보안
- main 브랜치 보호(직접 push 금지, PR만 merge)
- Dependabot, 코드/시크릿 스캔 등 GitHub 보안 기능 활성화
- 배포 전 lint, format, test 통과 필수
-->
