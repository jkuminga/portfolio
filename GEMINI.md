# GEMINI.md - Project Overview & Analysis

## 📌 현재 프로젝트 개요 (Project Context)
현재 진입하신 프로젝트 디렉토리(`/Users/dohyeonjik/Desktop/Projects/portfolio`)는 이름과 파일 구성물을 보았을 때, 블로그 및 프로젝트 소개 목적의 **개발자 포트폴리오(Portfolio)** 입니다. 

> **참고**: 말씀하신 *'온라인 쇼핑몰'* 관련 기능이나 상품 결제 코드는 현재 작업 공간에서 확인되지 않습니다. 구조를 보아 과거 작업하셨던 여러 프로젝트(`bookchain`, `carbonscope` 등)의 내역을 소개하는 웹사이트입니다. 혹시 쇼핑몰 프로젝트 경로가 다른 곳에 있는지 다시 한 번 확인해 보시길 추천해 드립니다!

## 🛠️ 기술 스택 (Tech Stack)
- **Core**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4, `@tailwindcss/typography`
- **Markdown & Content**: `react-markdown`, `gray-matter`, `rehype-raw`, `remark-gfm` (마크다운 파싱 및 표시)

## 📁 주요 디렉토리 및 파일 구조 (Directory Structure)

### `src/` 주요 구성
- **`App.tsx`**: 애플리케이션 진입점이자 라우터 설정 (`/`, `/projects/:id`, `/side-projects`).
- **`pages/` (페이지 컴포넌트)**
  - `Home.tsx`: 기본 메인 페이지 (메인 프로젝트 목록 및 소개).
  - `SideProjects.tsx`: 사이드 프로젝트 목록 페이지.
  - `ProjectDetail.tsx`: 각 프로젝트 상세 정보(MD)를 보여주는 렌더러 페이지.
- **`components/` (재사용 UI)**
  - `MarkdownRenderer.tsx`: 전달받은 본문(Markdown)을 HTML로 안전하게 렌더링.
  - `ProjectCard.tsx`: 프로젝트 목록 UI 카드.
  - `ScrollReveal.tsx`: 스크롤에 따른 애니메이션 효과 적용.
  - `Sidebar.tsx`: 애플리케이션 공통 사이드 바 내비게이션.
- **`lib/` (유틸리티 및 데이터 처리)**
  - `content.ts`: `Vite`의 `import.meta.glob`과 `gray-matter`를 활용해 `content/` 내의 MD 파일들을 파싱하고 프로젝트 목록(Frontmatter 메타데이터)과 상세 내용(Content)을 반환하는 핵심 기능 클래스.
  - `velogReader.tsx`: 외부 블로그(Velog) 글을 연동하거나 읽어오기 위한 컴포넌트 코드로 파악됩니다.
- **`content/` (프로젝트 데이터베이스)**
  - `projects/`, `sideprojects/` 등의 폴더 안에 마크다운 형태로 각 프로젝트의 내용과 설명이 저장됩니다. (예: `bookchain.md`, `carbonscope.md`).

## 🚀 아키텍처 및 작동 원리
1. **Markdown 기반 관리**: 별도의 백엔드 없이 `content/`에 마크다운 파일을 추가하면 포트폴리오 목록에 카드가 동적으로 생성됩니다.
2. **동적 추출 (Import Meta Glob)**: 정적 파일들을 Vite의 `glob` 기능을 활용해 빌드 타임 혹은 런타임에 모두 긁어와 리스트 파싱을 달성합니다.
3. **스타일링**: Tailwind CSS 프레임워크를 기반으로 직관적이고 빠르게 UI 반응성을 챙기고 있습니다.

## ✅ 다음 단계 (Next Steps)
- 기존 원하시던 '쇼핑몰 프로젝트'를 다루길 원하신다면 올바른 폴더에서 다시 창을 열어주시거나,
- 이 '포트폴리오 프로젝트'에서 이어서 작업(이전 버그 수정, 추가 디자인 개선, MD 파일 업데이트)을 하길 원하신다면, 어떤 내용을 중점적으로 다룰지 말씀해 주세요.
