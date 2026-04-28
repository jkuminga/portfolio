# Project Markdown Template

아래 템플릿을 복사해서 `src/content/projects/{slug}.md` 또는 `src/content/sideprojects/{slug}.md`로 생성하면 됩니다.

- 파일명 `{slug}.md`가 상세 페이지 URL의 slug가 됩니다.
- 예: `bookchain.md` -> `/projects/bookchain`
- `thumbnail`은 `public` 기준 경로를 사용합니다. 예: `/assets/projects/{slug}/cover.png`
- 빈 링크는 `""`로 두거나, 자동화 스크립트에서 해당 필드를 생략해도 됩니다.

```md
---
title: "{PROJECT_TITLE}"
summary: "{PROJECT_SUMMARY}"
role: "{PROJECT_ROLE}"
stack: [{STACK_1}, {STACK_2}, {STACK_3}]
period: "{PROJECT_PERIOD}"
priority: 1
links:
  demo: "{DEMO_URL}"
  github: "{GITHUB_URL}"
  presentation: "{PRESENTATION_URL}"
thumbnail: /assets/projects/{PROJECT_SLUG}/cover.png
---

## 한 줄 소개
{ONE_LINE_INTRO}

## 내가 맡은 역할
- {ROLE_ITEM_1}
- {ROLE_ITEM_2}
- {ROLE_ITEM_3}

## 트러블 슈팅
### 트러블 슈팅 1
- 문제 : {PROBLEM_1}
- 해결 : {SOLUTION_1}
- 결과 : {RESULT_1}

### 트러블 슈팅 2
- 문제 : {PROBLEM_2}
- 해결 : {SOLUTION_2}
- 결과 : {RESULT_2}

## 핵심 기능
- {FEATURE_1}
- {FEATURE_2}
- {FEATURE_3}

## 이미지
![](/assets/projects/{PROJECT_SLUG}/ui-1.png)
![](/assets/projects/{PROJECT_SLUG}/ui-2.png)
![](/assets/projects/{PROJECT_SLUG}/ui-3.png)
```

## Side Project Variant

사이드 프로젝트는 필요하면 더 짧은 본문 구조를 써도 됩니다. 현재 코드에서는 frontmatter만 동일하면 카드와 상세 페이지 렌더링이 동작합니다.

```md
---
title: "{PROJECT_TITLE}"
summary: "{PROJECT_SUMMARY}"
role: "{PROJECT_ROLE}"
stack: [{STACK_1}, {STACK_2}, {STACK_3}]
period: "{PROJECT_PERIOD}"
priority: 999
links:
  github: "{GITHUB_URL}"
thumbnail: /assets/sideProjects/{PROJECT_SLUG}/cover.png
---

## 한 줄 소개
{ONE_LINE_INTRO}

## 주요 기능
- {FEATURE_1}
- {FEATURE_2}
- {FEATURE_3}

## 기술적 도전
- {CHALLENGE_1}
- {CHALLENGE_2}
```

## Frontmatter Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `title` | Yes | 프로젝트 카드와 상세 페이지 제목 |
| `summary` | Yes | 카드 설명과 상세 페이지 상단 요약 |
| `role` | Yes | 담당 역할 |
| `stack` | Yes | 기술 스택 배열 |
| `period` | No | 진행 기간 |
| `links.demo` | No | 데모 링크 |
| `links.github` | No | GitHub 저장소 링크 |
| `links.presentation` | No | 발표 자료 링크 |
| `thumbnail` | No | 카드와 상세 상단 커버 이미지 |
| `tags` | No | 현재 타입에는 있지만 UI에서는 적극 사용하지 않음 |

## Automation Notes

자동화 스크립트에서 최소한 아래 값은 채우는 것을 권장합니다.

```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "summary": "Short project summary",
  "role": "Full Stack",
  "stack": ["React", "TypeScript"],
  "period": "2025",
  "thumbnail": "/assets/projects/project-slug/cover.png"
}
```
