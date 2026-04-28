import type { MainProjectInput, ProjectLinks, SideProjectInput } from "../../types/formatter";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function compactLines(lines: string[]) {
  return lines.filter((line) => line.trim().length > 0);
}

function quoted(value: string) {
  return JSON.stringify(value.trim());
}

function formatStack(stack: string[]) {
  return `[${stack.map((item) => quoted(item)).join(", ")}]`;
}

function formatLinks(links: ProjectLinks) {
  return [
    "links:",
    `  demo: ${quoted(links.demo ?? "")}`,
    `  github: ${quoted(links.github ?? "")}`,
    `  presentation: ${quoted(links.presentation ?? "")}`,
  ].join("\n");
}

function formatList(items: string[]) {
  return compactLines(items).map((item) => `- ${item.trim()}`).join("\n");
}

function formatTroubleshooting(input: MainProjectInput) {
  const sections = input.troubleshooting
    .map(({ problem, solution, result }) => ({
      problem: problem.trim(),
      solution: solution.trim(),
      result: result.trim(),
    }))
    .filter(({ problem, solution, result }) => problem || solution || result);

  if (sections.length === 0) {
    return "";
  }

  return [
    "## 트러블 슈팅",
    sections
      .map(({ problem, solution, result }, index) =>
        [
          `### 트러블 슈팅 ${index + 1}`,
          problem ? `- 문제 : ${problem}` : "",
          solution ? `- 해결 : ${solution}` : "",
          result ? `- 결과 : ${result}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n\n"),
  ].join("\n");
}

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function isValidProjectSlug(value: string) {
  return SLUG_PATTERN.test(value);
}

export function getMainProjectSavePath(slug: string) {
  return `src/content/projects/${slug || "{slug}"}.md`;
}

export function getSideProjectSavePath(slug: string) {
  return `src/content/sideprojects/${slug || "{slug}"}.md`;
}

export function getMainProjectAssetPath(slug: string) {
  return `public/assets/projects/${slug || "{slug}"}`;
}

export function getSideProjectAssetPath(slug: string) {
  return `public/assets/sideProjects/${slug || "{slug}"}`;
}

export function defaultMainThumbnail(slug: string) {
  return `/assets/projects/${slug || "{slug}"}/cover.png`;
}

export function defaultSideThumbnail(slug: string) {
  return `/assets/sideProjects/${slug || "{slug}"}/cover.png`;
}

export function getMarkdownBody(markdown: string) {
  return markdown.replace(/^---[\s\S]*?---\n?/, "").trim();
}

export function formatMainProject(input: MainProjectInput) {
  const slug = input.slug.trim();
  const screenshots = Array.from({ length: Math.max(0, input.screenshotCount) }, (_, index) => {
    return `![](/assets/projects/${slug || "{slug}"}/ui-${index + 1}.png)`;
  });

  const sections = [
    "## 한 줄 소개",
    input.intro.trim(),
    "## 내가 맡은 역할",
    formatList(input.roleItems),
    formatTroubleshooting(input),
    "## 핵심 기능",
    formatList(input.features),
    screenshots.length > 0 ? ["## 이미지", screenshots.join("\n")].join("\n") : "",
  ];

  return [
    "---",
    `title: ${quoted(input.title)}`,
    `summary: ${quoted(input.summary)}`,
    `role: ${quoted(input.role)}`,
    `stack: ${formatStack(input.stack)}`,
    `period: ${quoted(input.period)}`,
    `priority: ${Number.isFinite(input.priority) ? Math.max(0, input.priority) : 999}`,
    formatLinks(input.links),
    `thumbnail: ${defaultMainThumbnail(slug)}`,
    "---",
    "",
    compactLines(sections).join("\n\n"),
    "",
  ].join("\n");
}

export function formatSideProject(input: SideProjectInput) {
  const sections = [
    "## 한 줄 소개",
    input.intro.trim(),
    "## 주요 기능",
    formatList(input.features),
    compactLines(input.challenges).length > 0
      ? ["## 기술적 도전", formatList(input.challenges)].join("\n")
      : "",
  ];

  return [
    "---",
    `title: ${quoted(input.title)}`,
    `summary: ${quoted(input.summary)}`,
    `role: ${quoted(input.role)}`,
    `stack: ${formatStack(input.stack)}`,
    `period: ${quoted(input.period)}`,
    formatLinks(input.links),
    `thumbnail: ${input.thumbnail.trim() || defaultSideThumbnail(input.slug.trim())}`,
    "---",
    "",
    compactLines(sections).join("\n\n"),
    "",
  ].join("\n");
}
