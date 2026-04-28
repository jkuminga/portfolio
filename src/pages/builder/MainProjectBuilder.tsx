import { useMemo, useState } from "react";
import type { MainProjectInput } from "../../types/formatter";
import {
  createSlug,
  formatMainProject,
  getMainProjectAssetPath,
  getMainProjectSavePath,
  getMarkdownBody,
} from "../../lib/formatters/projectFormatter";
import { BuilderShell, Field, FormSection, ListField, OutputPanel, StackTags } from "./BuilderShared";

const initialDraft: MainProjectInput = {
  slug: "",
  title: "",
  summary: "",
  role: "",
  stack: [],
  period: "2025",
  priority: 999,
  links: {
    demo: "",
    github: "",
    presentation: "",
  },
  intro: "",
  roleItems: [""],
  troubleshooting: [{ problem: "", solution: "", result: "" }],
  features: [""],
  screenshotCount: 3,
};

export default function MainProjectBuilder() {
  const [draft, setDraft] = useState<MainProjectInput>(initialDraft);
  const [slugTouched, setSlugTouched] = useState(false);
  const markdown = useMemo(() => formatMainProject(draft), [draft]);

  const update = <K extends keyof MainProjectInput>(key: K, value: MainProjectInput[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateTitle = (title: string) => {
    setDraft((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : createSlug(title),
    }));
  };

  const updateTroubleshooting = (
    index: number,
    value: MainProjectInput["troubleshooting"][number],
  ) => {
    update(
      "troubleshooting",
      draft.troubleshooting.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const removeTroubleshooting = (index: number) => {
    update(
      "troubleshooting",
      draft.troubleshooting.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  return (
    <BuilderShell title="메인 프로젝트 작성" description="정식 포트폴리오 프로젝트용 Markdown을 생성합니다. 저장 위치는 projects 디렉토리입니다.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(360px,0.9fr)_minmax(560px,1.1fr)]">
        <form className="flex flex-col gap-6 rounded-xl border border-[#d8dee8] bg-white p-5 dark:border-gray-800 dark:bg-[#151c2a]">
          <FormSection title="기본 정보">
            <Field label="Title" value={draft.title} onChange={updateTitle} placeholder="BookChain" />
            <Field
              label="Slug"
              value={draft.slug}
              onChange={(value) => {
                setSlugTouched(true);
                update("slug", createSlug(value));
              }}
              placeholder="bookchain"
            />
            <Field label="Summary" value={draft.summary} onChange={(value) => update("summary", value)} textarea />
            <Field label="Role" value={draft.role} onChange={(value) => update("role", value)} placeholder="백엔드 · 통합 · 배포" />
            <Field label="Period" value={draft.period} onChange={(value) => update("period", value)} placeholder="2025" />
            <Field
              label="Priority"
              value={String(draft.priority)}
              onChange={(value) => update("priority", Math.max(0, Number(value) || 0))}
              placeholder="낮을수록 먼저 표시"
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
            <ListField label="내가 맡은 역할" values={draft.roleItems} onChange={(value) => update("roleItems", value)} />
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#616f89] dark:text-gray-400">트러블 슈팅</span>
              {draft.troubleshooting.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-lg border border-[#d8dee8] bg-[#f8fafc] p-3 dark:border-gray-700 dark:bg-[#101827]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-extrabold">트러블 슈팅 {index + 1}</h3>
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d8dee8] text-[#616f89] transition hover:border-red-400 hover:text-red-500 dark:border-gray-700"
                      onClick={() => removeTroubleshooting(index)}
                      aria-label={`트러블 슈팅 ${index + 1} 삭제`}
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                  <Field
                    label="문제"
                    value={item.problem}
                    onChange={(value) => updateTroubleshooting(index, { ...item, problem: value })}
                    textarea
                  />
                  <Field
                    label="해결"
                    value={item.solution}
                    onChange={(value) => updateTroubleshooting(index, { ...item, solution: value })}
                    textarea
                  />
                  <Field
                    label="결과"
                    value={item.result}
                    onChange={(value) => updateTroubleshooting(index, { ...item, result: value })}
                    textarea
                  />
                </div>
              ))}
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-[#b9c3d3] px-3 text-sm font-bold text-[#616f89] transition hover:border-primary hover:text-primary dark:border-gray-700"
                onClick={() => update("troubleshooting", [...draft.troubleshooting, { problem: "", solution: "", result: "" }])}
              >
                <span className="material-symbols-outlined text-lg">add</span>
                트러블 슈팅 추가
              </button>
            </div>
            <ListField label="핵심 기능" values={draft.features} onChange={(value) => update("features", value)} />
            <Field
              label="이미지 개수"
              value={String(draft.screenshotCount)}
              onChange={(value) => update("screenshotCount", Math.max(0, Number(value) || 0))}
              placeholder="3"
            />
          </FormSection>
        </form>
        <OutputPanel
          raw={markdown}
          preview={getMarkdownBody(markdown)}
          mode="markdown"
          fileName={`${draft.slug || "main-project"}.md`}
          storageHint={`${getMainProjectSavePath(draft.slug)} / ${getMainProjectAssetPath(draft.slug)}`}
        />
      </div>
    </BuilderShell>
  );
}
