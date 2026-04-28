# Formatter Design

이 문서는 향후 `/md-builder` 같은 작성 도구에서 사용할 메인 프로젝트, 사이드 프로젝트, 스택 데이터 포매터 설계를 정리합니다.

## 목표

랜딩 페이지에서 큰 버튼 3개로 진입합니다.

- 메인 프로젝트 작성
- 사이드 프로젝트 작성
- 기술 스택 작성

각 작성 화면은 사용자가 값을 입력하면 현재 코드베이스가 바로 읽을 수 있는 파일 포맷을 생성합니다.

- 메인 프로젝트: `src/content/projects/{slug}.md`
- 사이드 프로젝트: `src/content/sideprojects/{slug}.md`
- 기술 스택: `src/content/stacks.json`에 들어갈 JSON item 또는 전체 JSON

메인/사이드 프로젝트는 Markdown 내부에 `type: main`, `type: side` 같은 구분 키를 넣지 않습니다. 현재 앱 구조처럼 저장 위치로만 구분합니다.

## 현재 코드 기준

`src/lib/content.ts`는 두 디렉토리를 따로 읽습니다.

- `src/content/projects/*.md`
- `src/content/sideprojects/*.md`

파일명에서 `.md`를 제거한 값이 slug가 됩니다.

```text
src/content/projects/bookchain.md -> slug: bookchain
src/content/sideprojects/side-project-1.md -> slug: side-project-1
```

프로젝트 상세 페이지는 메인/사이드 구분 없이 `getProjectBySlug(slug)`로 양쪽 디렉토리를 모두 검색합니다.

## 공통 Project Frontmatter

메인 프로젝트와 사이드 프로젝트는 같은 frontmatter 구조를 사용합니다.

```yaml
---
title: Project Title
summary: 프로젝트 한 줄 요약
role: 담당 역할
stack: [React, TypeScript, Firebase]
period: 2025
priority: 1
links:
  demo: ""
  github: "https://github.com/..."
  presentation: "https://..."
thumbnail: /assets/projects/project-slug/cover.png
---
```

현재 코드에서 읽는 필드는 다음과 같습니다.

| Field | Type | Required | Usage |
| --- | --- | --- | --- |
| `title` | string | yes | 카드 제목, 상세 제목 |
| `summary` | string | yes | 카드 설명, 상세 상단 설명 |
| `role` | string | yes | 상세 정보의 역할 |
| `stack` | string[] | yes | 카드 태그, 상세 기술 스택 |
| `period` | string | no | 상세 정보의 기간 |
| `priority` | number | no | 프로젝트 카드 출력 우선순위, 낮을수록 먼저 표시 |
| `thumbnail` | string | no | 카드 이미지, 상세 커버 이미지 |
| `links.demo` | string | no | 상세 페이지 데모 버튼 |
| `links.github` | string | no | 상세 페이지 GitHub 아이콘 |
| `links.presentation` | string | no | 상세 페이지 발표 자료 아이콘 |
| `tags` | string[] | no | 타입에는 존재하지만 현재 UI 사용도 낮음 |

## 메인 프로젝트 포매터

### 저장 위치

```text
src/content/projects/{slug}.md
```

### 이미지 경로 규칙

```text
public/assets/projects/{slug}/cover.png
public/assets/projects/{slug}/ui-1.png
public/assets/projects/{slug}/ui-2.png
public/assets/projects/{slug}/ui-3.png
```

Markdown에서는 `public`을 제외하고 참조합니다.

```text
/assets/projects/{slug}/cover.png
/assets/projects/{slug}/ui-1.png
```

### 입력 모델

```ts
type MainProjectInput = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  period: string;
  links: {
    demo?: string;
    github?: string;
    presentation?: string;
  };
  intro: string;
  roleItems: string[];
  troubleshooting: {
    problem: string;
    solution: string;
    result: string;
  }[];
  features: string[];
  screenshotCount: number;
};
```

### 출력 포맷

```md
---
title: {title}
summary: {summary}
role: {role}
stack: [{stack}]
period: {period}
priority: 999
links:
  demo: "{demo}"
  github: "{github}"
  presentation: "{presentation}"
thumbnail: /assets/projects/{slug}/cover.png
---

## 한 줄 소개
{intro}

## 내가 맡은 역할
- {roleItem}

## 트러블 슈팅
### 트러블 슈팅 1
- 문제 : {problem}
- 해결 : {solution}
- 결과 : {result}

## 핵심 기능
- {feature}

## 이미지
![](/assets/projects/{slug}/ui-1.png)
![](/assets/projects/{slug}/ui-2.png)
```

### 생성 규칙

- `slug`는 파일명과 이미지 폴더명에 함께 사용합니다.
- `stack`은 `stack: [A, B, C]` 형태로 출력합니다.
- `priority`는 프로젝트 카드 출력 순서이며 낮을수록 먼저 표시합니다.
- `screenshotCount`만큼 `ui-{n}.png` 라인을 생성합니다.
- `demo`, `github`, `presentation`은 값이 없으면 `""`로 출력하거나 해당 라인을 생략할 수 있습니다.
- 현재 프로젝트 파일들이 빈 링크를 `""`로 유지하고 있으므로 1차 구현에서는 빈 문자열 유지가 더 일관적입니다.

## 사이드 프로젝트 포매터

### 저장 위치

```text
src/content/sideprojects/{slug}.md
```

### 이미지 경로 규칙

사이드 프로젝트는 현재 외부 이미지 URL도 사용하고 있습니다. 따라서 thumbnail 입력은 두 방식을 모두 허용합니다.

```text
https://images.unsplash.com/...
/assets/sideProjects/{slug}/cover.png
```

로컬 파일을 쓸 경우 권장 위치는 다음과 같습니다.

```text
public/assets/sideProjects/{slug}/cover.png
```

### 입력 모델

```ts
type SideProjectInput = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  period: string;
  links: {
    demo?: string;
    github?: string;
    presentation?: string;
  };
  thumbnail: string;
  intro: string;
  features: string[];
  challenges: string[];
};
```

### 출력 포맷

```md
---
title: {title}
summary: {summary}
role: {role}
stack: [{stack}]
period: {period}
links:
  demo: "{demo}"
  github: "{github}"
  presentation: "{presentation}"
thumbnail: {thumbnail}
---

## 한 줄 소개
{intro}

## 주요 기능
- {feature}

## 기술적 도전
- {challenge}
```

### 생성 규칙

- 메인 프로젝트와 동일한 frontmatter를 사용합니다.
- 본문은 더 짧게 유지합니다.
- `thumbnail`은 자동 기본값을 제공하되, 사용자가 외부 URL로 덮어쓸 수 있어야 합니다.
- 사이드 프로젝트도 상세 페이지로 들어가면 같은 `ProjectDetail`을 사용하므로 frontmatter 품질은 메인과 동일하게 관리합니다.

## 스택 포매터

스택 데이터는 Markdown이 아니라 `src/content/stacks.json` 배열입니다.

### 현재 데이터 구조

```json
{
  "name": "Node.js",
  "icon": "/assets/stacks/nodejs.svg",
  "proficiency": 3,
  "descriptions": [
    "Node.js 문법에 익숙합니다",
    "다수의 프로젝트를 Node.js를 이용하여 진행했습니다.",
    "비동기 이벤트 기반 구조를 이해하고 있습니다."
  ]
}
```

### 저장 위치

```text
src/content/stacks.json
```

### 아이콘 경로 규칙

```text
public/assets/stacks/{iconSlug}.svg
```

JSON에서는 `public`을 제외합니다.

```text
/assets/stacks/{iconSlug}.svg
```

### 입력 모델

```ts
type StackInput = {
  name: string;
  iconSlug: string;
  iconPath?: string;
  proficiency: 1 | 2 | 3;
  descriptions: string[];
};
```

### 출력 포맷

```json
{
  "name": "{name}",
  "icon": "/assets/stacks/{iconSlug}.svg",
  "proficiency": 2,
  "descriptions": [
    "{description}"
  ]
}
```

### 생성 규칙

- `name`은 UI에 그대로 표시됩니다.
- `iconSlug`는 기본적으로 `name`에서 자동 추천합니다.
- 예: `Node.js` -> `nodejs`, `Socket.IO` -> `socketio`, `Oracle Cloud` -> `oracle-cloud`
- 사용자가 직접 `iconPath`를 입력하면 그 값을 우선합니다.
- `proficiency`는 현재 UI가 3칸 막대로 표시하므로 `1`, `2`, `3`만 허용합니다.
- `descriptions`는 최소 1개 이상을 권장합니다.
- 기존 `stacks.json`에 추가할 때는 배열 끝에 새 객체를 append합니다.
- 같은 `name`이 이미 있으면 신규 추가 대신 수정 모드로 전환하는 UX가 좋습니다.

## 랜딩 페이지 설계

### 라우트

```text
/md-builder
/md-builder/main-project
/md-builder/side-project
/md-builder/stack
```

### 랜딩 화면

```text
Markdown Builder

[ 메인 프로젝트 ]
정식 포트폴리오 프로젝트 Markdown 생성

[ 사이드 프로젝트 ]
개인 실험/연구 프로젝트 Markdown 생성

[ 기술 스택 ]
stacks.json에 넣을 기술 스택 JSON 생성
```

### 공통 액션

각 작성 화면은 다음 액션을 제공합니다.

- Raw 출력 보기
- Preview 보기
- 클립보드 복사
- 파일 다운로드
- 저장 위치 안내

스택 작성 화면은 Markdown 다운로드 대신 다음 옵션을 제공합니다.

- JSON item 복사
- 전체 `stacks.json` 형태 미리보기
- `stacks.json`에 붙여넣을 위치 안내

## 공통 유틸 설계

```text
src/types/formatter.ts
src/lib/formatters/projectFormatter.ts
src/lib/formatters/stackFormatter.ts
src/pages/builder/BuilderLanding.tsx
src/pages/builder/MainProjectBuilder.tsx
src/pages/builder/SideProjectBuilder.tsx
src/pages/builder/StackBuilder.tsx
```

### 추천 함수

```ts
formatMainProject(input: MainProjectInput): string
formatSideProject(input: SideProjectInput): string
formatStackItem(input: StackInput): string
formatStackFile(items: StackInput[]): string
createSlug(value: string): string
createStackIconSlug(value: string): string
```

## 검증 규칙

### 프로젝트 공통

- `slug`는 필수입니다.
- `slug`는 `^[a-z0-9]+(?:-[a-z0-9]+)*$` 형태를 권장합니다.
- `title`, `summary`, `role`은 필수입니다.
- `stack`은 1개 이상을 권장합니다.
- `period`는 문자열로 관리합니다.
- `thumbnail`은 없으면 자동 기본값을 사용합니다.

### 메인 프로젝트

- `intro`는 필수에 가깝게 취급합니다.
- `roleItems`, `features`는 1개 이상을 권장합니다.
- `troubleshooting`은 문제-해결-결과 세트 배열이며, 모든 세트가 비어 있으면 섹션 전체를 생략할 수 있습니다.
- `screenshotCount`는 `0` 이상 정수입니다.

### 사이드 프로젝트

- `features`는 1개 이상을 권장합니다.
- `challenges`는 비어 있으면 `## 기술적 도전` 섹션을 생략할 수 있습니다.

### 스택

- `name`은 필수입니다.
- `proficiency`는 `1`, `2`, `3` 중 하나입니다.
- `descriptions`는 1개 이상을 권장합니다.
- `icon`은 `/assets/stacks/*.svg` 또는 직접 입력한 path를 사용합니다.

## 1차 구현 범위

1차 구현에서는 브라우저가 레포 파일을 직접 저장하지 않습니다.

```text
입력 폼
-> 포매터 함수
-> Raw 출력
-> Preview
-> Copy 또는 Download
-> 사용자가 레포에 직접 저장
```

직접 파일 저장은 이후 확장으로 둡니다.

- File System Access API
- 로컬 Node writer API
- GitHub API 기반 commit 생성

## 설계 결정

- 메인/사이드 구분은 Markdown frontmatter가 아니라 디렉토리로 한다.
- 프로젝트 frontmatter는 메인/사이드 공통 구조를 유지한다.
- 본문 섹션만 메인/사이드별로 다르게 생성한다.
- 스택은 별도 JSON 포매터로 분리한다.
- 자동화의 중심은 LLM이 아니라 결정론적 포매터 함수로 둔다.
- 향후 AI 초안 생성이 필요해도 최종 출력 전에는 동일한 입력 모델로 정규화한다.
