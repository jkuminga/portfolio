# Project Overview

이 문서는 현재 포트폴리오 코드베이스의 구조와 사용 스택을 빠르게 파악하기 위한 정리 파일입니다.

## 한 줄 요약

React, TypeScript, Vite, Tailwind CSS로 만든 정적 포트폴리오 웹앱입니다. 프로젝트 소개 콘텐츠는 `src/content` 아래의 Markdown 파일과 JSON 파일로 관리하고, Velog RSS를 클라이언트에서 가져와 최신 글을 보여줍니다.

## 사용 스택

- Core: React 19, TypeScript
- Build tool: Vite 7
- Routing: React Router DOM 7
- Styling: Tailwind CSS 4, PostCSS, Autoprefixer
- Markdown: `gray-matter`, `react-markdown`, `remark-gfm`, `rehype-raw`, `@tailwindcss/typography`
- External feed: Velog RSS, AllOrigins CORS proxy
- Lint: ESLint 9, TypeScript ESLint, React Hooks, React Refresh

## 실행 명령

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

- `npm run dev`: Vite 개발 서버 실행
- `npm run build`: TypeScript 빌드 확인 후 Vite 프로덕션 빌드
- `npm run lint`: ESLint 검사
- `npm run preview`: 빌드 결과 미리보기

## 라우팅 구조

라우팅은 `src/App.tsx`에서 관리합니다.

- `/`: 메인 포트폴리오 홈
- `/projects/:id`: 프로젝트 상세 페이지
- `/side-projects`: 사이드/연구 프로젝트 목록

## 주요 디렉토리

```text
src/
  App.tsx
  main.tsx
  index.css
  pages/
    Home.tsx
    ProjectDetail.tsx
    SideProjects.tsx
  components/
    MarkdownRenderer.tsx
    ProjectCard.tsx
    ScrollReveal.tsx
    Sidebar.tsx
  lib/
    content.ts
    velogReader.tsx
  content/
    about.md
    stacks.json
    projects/
    sideprojects/
public/
  assets/
    stacks/
```

## 핵심 파일 역할

- `src/main.tsx`: React 앱을 `#root`에 마운트합니다.
- `src/App.tsx`: `BrowserRouter`, `Routes`, `Route`를 사용해 페이지 라우팅을 설정합니다.
- `src/pages/Home.tsx`: 메인 화면입니다. 프로젝트 캐러셀, 기술 스택, Velog 최신 글, 소개, 연락처 섹션을 구성합니다.
- `src/pages/ProjectDetail.tsx`: Markdown 프로젝트 상세 본문과 frontmatter 메타데이터를 렌더링합니다.
- `src/pages/SideProjects.tsx`: `src/content/sideprojects`의 프로젝트들을 카드 그리드로 보여줍니다.
- `src/lib/content.ts`: Vite의 `import.meta.glob`으로 Markdown 파일을 eager import하고, `gray-matter`로 frontmatter를 파싱합니다.
- `src/lib/velogReader.tsx`: Velog RSS를 AllOrigins 프록시로 가져와 최신 글 4개를 표시합니다.
- `src/components/MarkdownRenderer.tsx`: Markdown 본문을 GitHub Flavored Markdown과 raw HTML 지원 형태로 렌더링합니다.
- `src/components/ProjectCard.tsx`: 프로젝트 목록에서 사용하는 카드 UI입니다.
- `src/components/Sidebar.tsx`: 프로필, 섹션 내비게이션, 외부 링크를 담은 공통 사이드바입니다.
- `src/components/ScrollReveal.tsx`: IntersectionObserver 기반 스크롤 등장 애니메이션 래퍼입니다.
- `src/index.css`: Tailwind CSS v4 import, typography plugin, theme token, 스크롤바 스타일을 정의합니다.

## 콘텐츠 관리 방식

프로젝트 데이터는 별도 API나 백엔드 없이 Markdown 파일로 관리됩니다.

- 메인 프로젝트: `src/content/projects/*.md`
- 사이드/연구 프로젝트: `src/content/sideprojects/*.md`
- 소개글: `src/content/about.md`
- 기술 스택: `src/content/stacks.json`

프로젝트 Markdown 파일은 frontmatter를 사용합니다. 현재 코드에서 읽는 주요 필드는 다음과 같습니다.

```yaml
---
title: "프로젝트명"
summary: "카드와 상세 상단에 표시될 요약"
role: "담당 역할"
stack:
  - React
  - TypeScript
period: "2025.01 - 2025.03"
thumbnail: "/assets/example.png"
tags:
  - Portfolio
links:
  demo: "https://..."
  github: "https://..."
  presentation: "https://..."
---
```

파일명에서 `.md`를 제거한 값이 slug가 됩니다. 예를 들어 `bookchain.md`는 `/projects/bookchain` 상세 URL로 연결됩니다.

## 정적 자산

정적 이미지는 `public/assets` 아래에 두고 `/assets/...` 경로로 참조합니다.

- 로고: `/assets/logo.jpeg`
- 프로필 이미지: `/assets/profile.png`
- 기술 스택 아이콘: `/assets/stacks/*.svg`

## 스타일링 특징

- Tailwind CSS v4의 CSS-first 설정 방식을 사용합니다.
- `src/index.css`의 `@theme`에서 `primary`, background 색상, display font, radius token을 정의합니다.
- 전체 레이아웃은 `max-w-[1440px]` 중앙 정렬, 데스크톱에서는 sticky sidebar와 content main의 2단 구조입니다.
- 다크 모드 클래스가 코드에 포함되어 있지만, 현재 별도 토글 구현은 확인되지 않습니다.
- 아이콘은 Google Material Symbols와 일부 SVG 파일을 함께 사용합니다.

## 외부 연동

Velog 글 목록은 `src/lib/velogReader.tsx`에서 가져옵니다.

- RSS URL: `https://v2.velog.io/rss/@jkuminga`
- CORS 우회: `https://api.allorigins.win/raw?url=...`
- 클라이언트 런타임 fetch 방식이므로 네트워크 또는 프록시 장애 시 fallback UI가 표시됩니다.

## 빌드/설정 파일

- `vite.config.ts`: React plugin과 Node polyfills plugin을 사용합니다.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript 빌드 설정입니다.
- `eslint.config.js`: flat config 기반 ESLint 설정입니다.
- `postcss.config.js`: Tailwind CSS PostCSS plugin과 Autoprefixer 설정입니다.
- `index.html`: 앱 root, favicon, Google fonts, Material Symbols stylesheet를 정의합니다.

## 유지보수 메모

- 새 메인 프로젝트를 추가하려면 `src/content/projects`에 Markdown 파일을 추가합니다.
- 새 사이드 프로젝트를 추가하려면 `src/content/sideprojects`에 Markdown 파일을 추가합니다.
- 상세 페이지와 카드 모두 같은 frontmatter를 사용하므로 필드 누락 시 UI에 빈 값이 보일 수 있습니다.
- `MarkdownRenderer`는 `rehype-raw`를 사용하므로 Markdown 내부 HTML도 렌더링됩니다. 신뢰하지 않는 외부 입력을 넣는 구조로 확장할 경우 sanitization 검토가 필요합니다.
- `velogReader.tsx`에는 디버깅용 `console.log(xml)`이 남아 있습니다.
- 현재 `README.md`는 Vite 기본 템플릿 설명에 가깝습니다. 프로젝트 설명 문서로 쓰려면 별도 업데이트가 필요합니다.
