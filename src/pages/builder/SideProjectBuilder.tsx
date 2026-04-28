import { useMemo, useState } from "react";
import type { SideProjectInput } from "../../types/formatter";
import {
  createSlug,
  defaultSideThumbnail,
  formatSideProject,
  getMarkdownBody,
  getSideProjectAssetPath,
  getSideProjectSavePath,
} from "../../lib/formatters/projectFormatter";
import { BuilderShell, Field, FormSection, ListField, OutputPanel, StackTags } from "./BuilderShared";

const initialDraft: SideProjectInput = {
  slug: "",
  title: "",
  summary: "",
  role: "개인 프로젝트",
  stack: [],
  period: "2025",
  links: {
    demo: "",
    github: "",
    presentation: "",
  },
  thumbnail: "",
  intro: "",
  features: [""],
  challenges: [""],
};

export default function SideProjectBuilder() {
  const [draft, setDraft] = useState<SideProjectInput>(initialDraft);
  const [slugTouched, setSlugTouched] = useState(false);
  const markdown = useMemo(() => formatSideProject(draft), [draft]);

  const update = <K extends keyof SideProjectInput>(key: K, value: SideProjectInput[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateTitle = (title: string) => {
    setDraft((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : createSlug(title),
    }));
  };

  return (
    <BuilderShell title="사이드 프로젝트 작성" description="사이드/연구 프로젝트용 Markdown을 생성합니다. 저장 위치는 sideprojects 디렉토리입니다.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(360px,0.9fr)_minmax(560px,1.1fr)]">
        <form className="flex flex-col gap-6 rounded-xl border border-[#d8dee8] bg-white p-5 dark:border-gray-800 dark:bg-[#151c2a]">
          <FormSection title="기본 정보">
            <Field label="Title" value={draft.title} onChange={updateTitle} placeholder="AI 가계부 서비스" />
            <Field
              label="Slug"
              value={draft.slug}
              onChange={(value) => {
                setSlugTouched(true);
                update("slug", createSlug(value));
              }}
              placeholder="ai-ledger"
            />
            <Field label="Summary" value={draft.summary} onChange={(value) => update("summary", value)} textarea />
            <Field label="Role" value={draft.role} onChange={(value) => update("role", value)} />
            <Field label="Period" value={draft.period} onChange={(value) => update("period", value)} />
            <Field
              label="Thumbnail"
              value={draft.thumbnail}
              onChange={(value) => update("thumbnail", value)}
              placeholder={defaultSideThumbnail(draft.slug)}
            />
            <StackTags values={draft.stack} onChange={(value) => update("stack", value)} />
          </FormSection>
          <FormSection title="링크">
            <Field label="Demo" value={draft.links.demo ?? ""} onChange={(value) => update("links", { ...draft.links, demo: value })} />
            <Field label="GitHub" value={draft.links.github ?? ""} onChange={(value) => update("links", { ...draft.links, github: value })} />
            <Field
              label="Presentation"
              value={draft.links.presentation ?? ""}
              onChange={(value) => update("links", { ...draft.links, presentation: value })}
            />
          </FormSection>
          <FormSection title="본문">
            <Field label="한 줄 소개" value={draft.intro} onChange={(value) => update("intro", value)} textarea />
            <ListField label="주요 기능" values={draft.features} onChange={(value) => update("features", value)} />
            <ListField label="기술적 도전" values={draft.challenges} onChange={(value) => update("challenges", value)} />
          </FormSection>
        </form>
        <OutputPanel
          raw={markdown}
          preview={getMarkdownBody(markdown)}
          mode="markdown"
          fileName={`${draft.slug || "side-project"}.md`}
          storageHint={`${getSideProjectSavePath(draft.slug)} / ${getSideProjectAssetPath(draft.slug)}`}
        />
      </div>
    </BuilderShell>
  );
}
