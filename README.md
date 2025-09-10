# CUI project

> [Next.js](https://nextjs.org) 기반의 UI 프로젝트
> [바로가기](https://cui-dun.vercel.app/)

## 1. 환경 & 시작하기

**버전**

-   Node.js 22.16.0
-   npm 10.9.2 이상

**개발 서버 실행**

```bash
# turbopack
npm run dev
# dev
npm run dev:old
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 2. 프로젝트 구조

| 폴더명/파일명               | 설명                                                  |
| --------------------------- | ----------------------------------------------------- |
| **app/**                    | Next.js 앱 라우터 폴더 (루트)                         |
| ├─ (pages)/                 | 각 페이지 관련(라우팅 구조, URL에는 미표출)           |
| ├─ layout.tsx               | 전체 레이아웃 컴포넌트                                |
| └─ page.tsx                 | 메인 페이지 컴포넌트                                  |
|                             |                                                       |
| **components/**             | UI 컴포넌트                                           |
| ├─ **base/**                | 기본 UI 컴포넌트(더이상 쪼갤 수 없는 컴포넌트, atoms) |
| ├─ **common/**              | base를 조합한 공통 컴포넌트(molecules)                |
| └─ **templates/**           | common/base를 조합한 큰 UI 블록(organisms)            |
|                             |                                                       |
| **styles/**                 | 스타일                                                |
| ├─ **theme-colors.css**     | 색상 테마 변수 (@theme static/inline)                 |
| ├─ **theme-typography.css** | 타이포그래피 테마 변수                                |
| ├─ **theme-spacing.css**    | 간격 테마 변수                                        |
| ├─ **theme-effects.css**    | 그림자, 애니메이션 테마 변수                          |
| └─ **custom-utilities.css** | 커스텀 유틸리티 정의 (@utility)                       |
|                             |                                                       |

## 3. 개발 규칙

### 3.1 컴포넌트 작성

-   각 컴포넌트는 폴더 단위로 관리(TS, index.js)
-   컴포넌트 전용 스타일은 해당 컴포넌트 폴더에 작성

### 3.2. 클라이언트/서버 컴포넌트

-   useState, useEffect 등 클라이언트 훅 사용 시 파일 최상단에 "use client" 선언
-   서버 컴포넌트(기본값)는 데이터 패칭, SEO 등 서버 전용 로직에 사용
-   하이드레이션 오류 방지를 위해 Header, Footer 등 공통 컴포넌트는 클라이언트 컴포넌트로 구현
-   서버/클라이언트 컴포넌트 혼합 시 props 전달에 주의 (서버→클라이언트 O, 클라이언트→서버 X)

### 3.3. 코드 스타일

-   Prettier, ESLint 설정 준수
-   함수형 컴포넌트만 사용
-   import 경로는 절대경로(@/...) 사용
    ```json
    // tsconfig.json
    "paths": {
        "@/app/*": ["./src/app/*"],
        "@/components/*": ["./src/components/*"],
        "@/styles/*": ["./src/styles/*"]
    }
    ```

### 3.4. 네이밍 컨벤션

-   폴더/파일/컴포넌트명 : camelCase 사용 (예: searchBar)
-   변수/함수명 : camelCase
-   CSS 클래스명 : Tailwind 유틸리티 클래스 우선 사용

### 3.5. 스타일 가이드

#### 3.5.1. Tailwind CSS 사용 원칙

-   유틸리티 클래스 우선 사용 (utility-first)
-   복잡한 스타일은 컴포넌트 추출 또는 커스텀 유틸리티로 정의
-   반응형 디자인은 접두사 활용 (sm:, md:, lg:)
-   다크 모드는 dark: 접두사 활용

#### 3.5.2. 테마 변수 관리

-   테마 변수는 styles/ 폴더 내 파일에서 관리
-   정적 테마 변수는 `@theme static`으로 정의 (빌드 타임에 결정되는 값)
    ```css
    /* theme-colors.css */
    @theme static {
        --color-primary: #3b82f6;
        --color-secondary: #64748b;
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

#### 3.5.3. 커스텀 유틸리티 정의

-   재사용 가능한 스타일 패턴은 `@utility`로 정의
    ```css
    /* custom-utilities.css */
    @utility card {
        border-radius: 0.5rem;
        box-shadow: var(--shadow-md);
    }
    ```

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

### 3.6. 기타

-   README, 주석 등 문서화 신경쓰기
-   불필요한 전역 스타일 import 지양, 필요한 곳에서만 import

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

## 5. 기타 관리 규칙

### 5.1. 이미지/정적 파일

-   이미지 등 정적 파일은 public/ 폴더에 저장
-   불필요한 대용량 파일은 업로드 금지

### 5.2. 접근성 & 반응형

-   기본적인 웹 접근성(aria, alt 등) 준수
-   모바일/데스크탑 반응형 스타일 필수

### 5.3 주의사항

-   `robots.ts`, `next.config.mjs`로 검색 엔진 크롤링 방지(배포시 수정/삭제 필요)
-   하이드레이션 오류 발생 시 확인사항:
    -   클라이언트/서버 컴포넌트 구분 명확히 (`'use client'` 지시문 확인)
    -   폰트 및 CSS 변수 참조 오류 확인
    -   서버와 클라이언트 간 렌더링 차이가 없는지 확인

## 6. 배포하기

-   [Vercel Platform](https://vercel.com/)을 통한 자동 배포

## 7. 참고자료

Next.js와 Tailwind CSS에 대해 알아보려면, 아래 링크를 클릭하세요.

-   [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능과 API.
-   [Learn Next.js](https://nextjs.org/learn) - Next.js 튜토리얼.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind CSS v4 문서

<!--
## PR(Pull Request) 규칙

- PR 제목과 설명에 변경사항, 목적, 테스트 방법 명확히 작성
- 작업 단위를 작게 쪼개서 PR 생성
- 리뷰어 지정 및 코드리뷰 필수
- 관련 이슈 번호(있다면) 명시
- CI(테스트, 린트 등) 통과 후 머지

## 브랜치 구조

> GitHub 규칙 추가 : Settings > Branches > Branch protection rules

- `main`: 배포(프로덕션)용 브랜치, 항상 안정적인 코드만 유지
- `feature/…`: 기능 개발용 브랜치 (예: feature/login)
- `hotfix/…`: 긴급 수정용 브랜치 (예: hotfix/login-bug)
- 브랜치 보호 설정: main 브랜치에 직접 push 금지, PR(코드리뷰)만 merge 가능하도록 설정

## 환경 변수 관리

- 환경 변수는 .env.local 등 환경 파일로 관리
- 민감 정보는 절대 커밋하지 않기
- .env\* 파일은 .gitignore에 반드시 추가

## 패키지 관리

- 패키지 추가/삭제 시 반드시 package.json, package-lock.json 동기화
- 불필요한 패키지 설치 금지

## 테스트

- 중요 로직/컴포넌트는 테스트 코드 작성 권장
- 테스트 파일은 **tests**/ 또는 \*.test.js(또는 .ts)로 관리

## CI/CD 및 보안

- main 브랜치 보호(직접 push 금지, PR만 merge)
- Dependabot, 코드/시크릿 스캔 등 GitHub 보안 기능 활성화
- 배포 전 lint, format, test 통과 필수
-->

## 확장프로그램

-   [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
