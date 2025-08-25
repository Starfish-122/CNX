# CUI project

> [Next.js](https://nextjs.org) 기반의 UI 프로젝트
> [바로가기](https://cui-dun.vercel.app/)

## 1. 환경 & 시작하기

**버전**

-   Node.js 22.16.0
-   npm 10.9.2 이상

**개발 서버 실행**

```bash
npm run dev
npm run dev:turbo
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 2. 프로젝트 구조

| 폴더명/파일명   | 설명                                                  |
| --------------- | ----------------------------------------------------- |
| **app/**        | Next.js 앱 라우터 폴더 (루트)                         |
| ├─ (pages)/     | 각 페이지 관련(라우팅 구조, URL에는 미표출)           |
| ├─ layout.js    | 전체 레이아웃 컴포넌트                                |
| └─ page.js      | 메인 페이지 컴포넌트                                  |
|                 |                                                       |
| **components/** | UI 컴포넌트                                           |
| ├─ **base/**    | 기본 UI 컴포넌트(더이상 쪼갤 수 없는 컴포넌트, atoms) |
| ├─ **common/**  | base를 조합한 공통 컴포넌트(molecules)                |
| └─ **modules/** | common/base를 조합한 큰 UI 블록(organisms)            |
|                 |                                                       |
| **styles/**     | 스타일                                                |
|                 |                                                       |

## 3. 개발 규칙

### 3.1 컴포넌트 작성

-   각 컴포넌트는 폴더 단위로 관리(TS, index.js)
-   컴포넌트 전용 스타일은 해당 컴포넌트 폴더에 작성
<!-- -   전역 스타일은 main.scss에서 import -->

### 3.2. 클라이언트/서버 컴포넌트

-   useState, useEffect 등 클라이언트 훅 사용 시 파일 최상단에 "use client" 선언
-   서버 컴포넌트(기본값)는 데이터 패칭, SEO 등 서버 전용 로직에 사용

## 3.3. 코드 스타일

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

## 3.4. 네이밍 컨벤션

-   폴더/파일/컴포넌트명 : camelCase 사용 (예: searchBar)
-   변수/함수명 : camelCase
<!-- -   SCSS 클래스명 : BEM 방식 권장 -->

## 3.5. 기타

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

## 6. 배포하기

-   [Vercel Platform](https://vercel.com/)을 통한 자동 배포

## 7. 참고자료

Next.js에 대해 알아보려면, 아래 링크를 클릭하세요.

-   [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능과 API.
-   [Learn Next.js](https://nextjs.org/learn) - Next.js 튜토리얼.

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
