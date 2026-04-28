import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import MarkdownRenderer from "../../components/MarkdownRenderer";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
};

type ListFieldProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

type OutputPanelProps = {
  raw: string;
  preview?: string;
  mode: "markdown" | "json";
  fileName: string;
  storageHint: string;
};

export function BuilderShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-light px-5 py-6 font-display text-[#111318] dark:bg-background-dark dark:text-white lg:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-[#e3e7ee] pb-5 dark:border-gray-800 md:flex-row md:items-end md:justify-between">
          <div>
            <Link to="/md-builder" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Builder Home
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#616f89] dark:text-gray-400">{description}</p>
          </div>
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d8dee8] px-4 text-sm font-bold text-[#616f89] transition hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-300"
          >
            포트폴리오로 이동
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, value, onChange, placeholder, textarea = false }: FieldProps) {
  const className =
    "w-full rounded-lg border border-[#d8dee8] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-gray-700 dark:bg-[#151c2a]";

  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-[#616f89] dark:text-gray-400">{label}</span>
      {textarea ? (
        <textarea
          className={`${className} min-h-24 resize-y leading-6`}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={className}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

export function ListField({ label, values, onChange, placeholder }: ListFieldProps) {
  const update = (index: number, nextValue: string) => {
    onChange(values.map((value, valueIndex) => (valueIndex === index ? nextValue : value)));
  };

  const remove = (index: number) => {
    onChange(values.filter((_, valueIndex) => valueIndex !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-[#616f89] dark:text-gray-400">{label}</span>
      <div className="flex flex-col gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-lg border border-[#d8dee8] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-gray-700 dark:bg-[#151c2a]"
              value={value}
              placeholder={placeholder}
              onChange={(event) => update(index, event.target.value)}
            />
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#d8dee8] text-[#616f89] transition hover:border-red-400 hover:text-red-500 dark:border-gray-700"
              onClick={() => remove(index)}
              aria-label={`${label} 항목 삭제`}
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-1 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-dashed border-[#b9c3d3] px-3 text-sm font-bold text-[#616f89] transition hover:border-primary hover:text-primary dark:border-gray-700"
        onClick={() => onChange([...values, ""])}
      >
        <span className="material-symbols-outlined text-lg">add</span>
        항목 추가
      </button>
    </div>
  );
}

export function StackTags({
  values,
  onChange,
}: {
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const add = (value: string) => {
    const nextValue = value.trim();
    if (!nextValue || values.includes(nextValue)) return;
    onChange([...values, nextValue]);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-[#616f89] dark:text-gray-400">기술 스택</span>
      <input
        className="w-full rounded-lg border border-[#d8dee8] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-gray-700 dark:bg-[#151c2a]"
        placeholder="입력 후 Enter"
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          add(event.currentTarget.value);
          event.currentTarget.value = "";
        }}
      />
      <div className="flex min-h-10 flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary"
            onClick={() => onChange(values.filter((item) => item !== value))}
          >
            {value}
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function OutputPanel({ raw, preview, mode, fileName, storageHint }: OutputPanelProps) {
  const copy = async () => {
    await navigator.clipboard.writeText(raw);
  };

  const download = () => {
    const blob = new Blob([raw], { type: mode === "markdown" ? "text/markdown;charset=utf-8" : "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="flex min-h-[620px] flex-col overflow-hidden rounded-xl border border-[#d8dee8] bg-white dark:border-gray-800 dark:bg-[#151c2a]">
      <div className="flex flex-col gap-3 border-b border-[#edf0f5] p-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-extrabold">Output</h2>
          <p className="mt-1 text-xs text-[#616f89] dark:text-gray-400">{storageHint}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#d8dee8] px-3 text-sm font-bold transition hover:border-primary hover:text-primary dark:border-gray-700"
            onClick={copy}
          >
            <span className="material-symbols-outlined text-lg">content_copy</span>
            Copy
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-white transition hover:bg-blue-600"
            onClick={download}
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Download
          </button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        <pre className="max-h-[720px] overflow-auto border-b border-[#edf0f5] bg-[#0f172a] p-4 text-xs leading-6 text-slate-100 lg:border-b-0 lg:border-r dark:border-gray-800">
          <code>{raw}</code>
        </pre>
        <div className="max-h-[720px] overflow-auto p-5">
          {mode === "markdown" ? (
            <MarkdownRenderer content={preview ?? ""} />
          ) : (
            <pre className="whitespace-pre-wrap text-xs leading-6 text-[#111318] dark:text-gray-100">{raw}</pre>
          )}
        </div>
      </div>
    </section>
  );
}

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-[#edf0f5] pb-6 last:border-b-0 dark:border-gray-800">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {children}
    </section>
  );
}
