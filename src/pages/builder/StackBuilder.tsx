import { useMemo, useState } from "react";
import stacksData from "../../content/stacks.json";
import type { StackInput } from "../../types/formatter";
import { createStackIconSlug, formatStackFile, formatStackItem } from "../../lib/formatters/stackFormatter";
import { BuilderShell, Field, FormSection, ListField, OutputPanel } from "./BuilderShared";

const initialDraft: StackInput = {
  name: "",
  iconSlug: "",
  iconPath: "",
  proficiency: 2,
  descriptions: [""],
};

export default function StackBuilder() {
  const [draft, setDraft] = useState<StackInput>(initialDraft);
  const [iconTouched, setIconTouched] = useState(false);
  const itemJson = useMemo(() => formatStackItem(draft), [draft]);
  const fullJson = useMemo(() => formatStackFile(stacksData, draft), [draft]);

  const update = <K extends keyof StackInput>(key: K, value: StackInput[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateName = (name: string) => {
    setDraft((current) => ({
      ...current,
      name,
      iconSlug: iconTouched ? current.iconSlug : createStackIconSlug(name),
    }));
  };

  return (
    <BuilderShell title="기술 스택 작성" description="stacks.json 배열에 추가할 JSON item과 전체 JSON 미리보기를 생성합니다.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(360px,0.85fr)_minmax(560px,1.15fr)]">
        <form className="flex flex-col gap-6 rounded-xl border border-[#d8dee8] bg-white p-5 dark:border-gray-800 dark:bg-[#151c2a]">
          <FormSection title="스택 정보">
            <Field label="Name" value={draft.name} onChange={updateName} placeholder="Node.js" />
            <Field
              label="Icon Slug"
              value={draft.iconSlug}
              onChange={(value) => {
                setIconTouched(true);
                update("iconSlug", createStackIconSlug(value));
              }}
              placeholder="nodejs"
            />
            <Field
              label="Icon Path Override"
              value={draft.iconPath ?? ""}
              onChange={(value) => update("iconPath", value)}
              placeholder="/assets/stacks/nodejs.svg"
            />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#616f89] dark:text-gray-400">Proficiency</span>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`h-10 rounded-lg border text-sm font-extrabold transition ${
                      draft.proficiency === level
                        ? "border-primary bg-primary text-white"
                        : "border-[#d8dee8] text-[#616f89] hover:border-primary hover:text-primary dark:border-gray-700"
                    }`}
                    onClick={() => update("proficiency", level as 1 | 2 | 3 | 4)}
                  >
                    Level {level}
                  </button>
                ))}
              </div>
            </div>
            <ListField label="Descriptions" values={draft.descriptions} onChange={(value) => update("descriptions", value)} />
          </FormSection>
          <div className="rounded-lg bg-primary/10 p-4 text-sm leading-6 text-primary">
            아이콘 파일은 별도로 <strong>public/assets/stacks/{draft.iconSlug || "{iconSlug}"}.svg</strong>에 저장해야 합니다.
          </div>
        </form>
        <div className="flex flex-col gap-6">
          <OutputPanel raw={itemJson} mode="json" fileName={`${draft.iconSlug || "stack-item"}.json`} storageHint="stacks.json 배열에 추가할 단일 item" />
          <OutputPanel raw={fullJson} mode="json" fileName="stacks.json" storageHint="현재 stacks.json 뒤에 새 item을 append한 전체 파일 미리보기" />
        </div>
      </div>
    </BuilderShell>
  );
}
