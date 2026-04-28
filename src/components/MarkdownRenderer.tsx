import { Fragment, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type MarkdownRendererProps = {
    content: string;
};

type TroubleshootingItem = {
    title: string;
    problem: string;
    solution: string;
    result: string;
};

type ScreenshotItem = {
    alt: string;
    src: string;
};

type ListSectionType = "features" | "roles";
type SpecialSection = "screenshots" | "troubleshooting" | ListSectionType;

const SECTION_HEADINGS: { type: SpecialSection; pattern: RegExp }[] = [
    { type: "roles", pattern: /^##\s+내가\s+맡은\s+역할\s*$/m },
    { type: "troubleshooting", pattern: /^##\s+트러블\s*슈팅\s*$/m },
    { type: "features", pattern: /^##\s+핵심\s+기능\s*$/m },
    { type: "screenshots", pattern: /^##\s+(?:이미지|스크린샷)\s*$/m },
];
const NEXT_H2 = /^##\s+/m;

function MarkdownBlock({ content }: { content: string }) {
    if (!content.trim()) return null;

    return (
        <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:shadow-lg prose-headings:font-bold prose-a:text-primary hover:prose-a:text-blue-600 prose-a:transition-colors">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}

function parseTroubleshooting(markdown: string) {
    const items: TroubleshootingItem[] = [];
    let current: TroubleshootingItem | null = null;

    const pushCurrent = () => {
        if (!current) return;
        if (current.problem || current.solution || current.result) {
            items.push(current);
        }
        current = null;
    };

    markdown.split("\n").forEach((line) => {
        const heading = line.match(/^###\s+(.+?)\s*$/);
        if (heading) {
            pushCurrent();
            current = {
                title: heading[1],
                problem: "",
                solution: "",
                result: "",
            };
            return;
        }

        const field = line.match(/^-\s*(문제|해결|결과)\s*[:：]\s*(.*)$/);
        if (!field) return;

        const [, label, value] = field;
        if (!current || (label === "문제" && (current.problem || current.solution || current.result))) {
            pushCurrent();
            current = {
                title: `트러블 슈팅 ${items.length + 1}`,
                problem: "",
                solution: "",
                result: "",
            };
        }

        if (label === "문제") current.problem = value.trim();
        if (label === "해결") current.solution = value.trim();
        if (label === "결과") current.result = value.trim();
    });

    pushCurrent();

    return items;
}

function splitSpecialSection(content: string) {
    const matches = SECTION_HEADINGS.map(({ type, pattern }) => {
        const match = content.match(pattern);
        return match && match.index !== undefined ? { type, match, index: match.index } : null;
    }).filter((match) => match !== null);

    const firstMatch = matches.sort((left, right) => left.index - right.index)[0];
    if (!firstMatch) return null;

    const start = firstMatch.index;
    const sectionStart = start + firstMatch.match[0].length;
    const rest = content.slice(sectionStart);
    const nextHeadingMatch = rest.match(NEXT_H2);
    const end = nextHeadingMatch?.index === undefined ? content.length : sectionStart + nextHeadingMatch.index;

    return {
        before: content.slice(0, start).trim(),
        type: firstMatch.type,
        body: content.slice(sectionStart, end).trim(),
        after: content.slice(end).trim(),
    };
}

function TroubleshootingSection({ markdown }: { markdown: string }) {
    const items = parseTroubleshooting(markdown);

    if (items.length === 0) {
        return <MarkdownBlock content={`## 트러블 슈팅\n${markdown}`} />;
    }

    return (
        <section className="not-prose my-12">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-[#111318] dark:text-white">트러블 슈팅</h2>
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <article
                        key={`${item.title}-${index}`}
                        className="rounded-lg border border-[#e3e7ee] bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#151c2a]"
                    >
                        <h3 className="mb-4 text-lg font-extrabold text-[#111318] dark:text-white">{item.title}</h3>
                        <div className="grid gap-3">
                            {[
                                ["문제", item.problem],
                                ["해결", item.solution],
                                ["결과", item.result],
                            ].map(([label, value]) =>
                                value ? (
                                    <div key={label} className="grid gap-1 rounded-lg bg-[#f8fafc] p-4 dark:bg-[#101827] sm:grid-cols-[72px_1fr] sm:gap-4">
                                        <strong className="text-sm font-extrabold text-primary">{label}</strong>
                                        <div className="prose prose-sm max-w-none text-[#394150] dark:prose-invert dark:text-gray-300">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                {value}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ) : null,
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function parseScreenshots(markdown: string) {
    const images: ScreenshotItem[] = [];

    markdown.split("\n").forEach((line) => {
        const image = line.trim().match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
        if (!image) return;

        images.push({
            alt: image[1].trim(),
            src: image[2].trim(),
        });
    });

    return images;
}

function getImageLabel(src: string) {
    const filename = decodeURIComponent(src.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? src);
    return (filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || filename).toUpperCase();
}

function parseListItems(markdown: string) {
    return markdown
        .split("\n")
        .map((line) => line.trim().match(/^[-*]\s+(.+)$/)?.[1]?.trim() ?? "")
        .filter(Boolean);
}

function HighlightListSection({ markdown, type }: { markdown: string; type: ListSectionType }) {
    const items = parseListItems(markdown);
    const title = type === "roles" ? "내가 맡은 역할" : "핵심 기능";

    if (items.length === 0) {
        return <MarkdownBlock content={`## ${title}\n${markdown}`} />;
    }

    return (
        <section className="not-prose my-12">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-[#111318] dark:text-white">{title}</h2>
            <div className="grid gap-3">
                {items.map((item, index) => (
                    <div
                        key={`${type}-${index}-${item}`}
                        className="rounded-lg border border-[#e3e7ee] bg-white p-4 transition hover:border-primary/40 hover:shadow-sm dark:border-gray-800 dark:bg-[#151c2a]"
                    >
                        <div className="min-w-0">
                            <div className="mb-1 text-xs font-extrabold uppercase tracking-widest text-[#8b98ad] dark:text-gray-500">
                                {type === "roles" ? "Role" : `Feature ${index + 1}`}
                            </div>
                            <div className="prose prose-sm max-w-none text-base leading-7 text-[#394150] dark:prose-invert dark:text-gray-300">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {item}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ScreenshotCarousel({ markdown }: { markdown: string }) {
    const screenshots = parseScreenshots(markdown);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

    if (screenshots.length === 0) {
        return <MarkdownBlock content={`## 이미지\n${markdown}`} />;
    }

    const hasMultiple = screenshots.length > 1;
    const currentScreenshot = screenshots[currentIndex];
    const currentLabel = getImageLabel(currentScreenshot.src);
    const currentRatio = imageRatios[currentScreenshot.src];
    const frameRatio = currentRatio ? Math.min(Math.max(currentRatio, 0.9), 1.78) : 1.6;
    const goToPrevious = () => setCurrentIndex((index) => (index === 0 ? screenshots.length - 1 : index - 1));
    const goToNext = () => setCurrentIndex((index) => (index === screenshots.length - 1 ? 0 : index + 1));
    const updateImageRatio = (src: string, width: number, height: number) => {
        if (!width || !height) return;
        setImageRatios((ratios) => (ratios[src] ? ratios : { ...ratios, [src]: width / height }));
    };

    return (
        <section className="not-prose my-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#111318] dark:text-white">이미지</h2>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary dark:border-primary/30 dark:bg-primary/15">
                        {currentLabel}
                    </span>
                    {hasMultiple ? (
                        <div className="text-sm font-bold text-[#616f89] dark:text-gray-400">
                            {currentIndex + 1} / {screenshots.length}
                        </div>
                    ) : null}
                </div>
            </div>
            <div
                className="relative overflow-hidden rounded-lg border border-[#e3e7ee] bg-[#f8fafc] transition-[aspect-ratio] dark:border-gray-800 dark:bg-[#101827]"
                style={{ aspectRatio: frameRatio }}
            >
                <div
                    className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {screenshots.map((screenshot, index) => (
                        <div
                            key={`${screenshot.src}-${index}`}
                            className="flex h-full w-full shrink-0 items-center justify-center"
                        >
                            <img
                                src={screenshot.src}
                                alt={screenshot.alt || `이미지 ${index + 1}`}
                                className="block h-full w-full object-contain"
                                draggable={false}
                                onLoad={(event) => updateImageRatio(screenshot.src, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)}
                            />
                        </div>
                    ))}
                </div>
                {hasMultiple ? (
                    <>
                        <button
                            type="button"
                            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#111318] shadow-lg transition hover:border-primary hover:text-primary dark:border-gray-700 dark:bg-[#151c2a]/90 dark:text-white"
                            onClick={goToPrevious}
                            aria-label="이전 이미지"
                        >
                            <span className="material-symbols-outlined text-xl">chevron_left</span>
                        </button>
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#111318] shadow-lg transition hover:border-primary hover:text-primary dark:border-gray-700 dark:bg-[#151c2a]/90 dark:text-white"
                            onClick={goToNext}
                            aria-label="다음 이미지"
                        >
                            <span className="material-symbols-outlined text-xl">chevron_right</span>
                        </button>
                    </>
                ) : null}
            </div>
            {hasMultiple ? (
                <div className="mt-4 flex justify-center gap-2">
                    {screenshots.map((screenshot, index) => (
                        <button
                            key={`${screenshot.src}-${index}`}
                            type="button"
                            className={`h-2.5 rounded-full transition-all ${
                                index === currentIndex ? "w-8 bg-primary" : "w-2.5 bg-[#c7d0df] hover:bg-[#8b98ad] dark:bg-gray-700 dark:hover:bg-gray-500"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`${getImageLabel(screenshot.src)} 이미지 보기`}
                            aria-current={index === currentIndex}
                            title={screenshot.src}
                        />
                    ))}
                </div>
            ) : null}
        </section>
    );
}

function EnhancedMarkdown({ content }: { content: string }) {
    const splitContent = splitSpecialSection(content);

    if (splitContent) {
        return (
            <>
                <MarkdownBlock content={splitContent.before} />
                {splitContent.type === "troubleshooting" ? (
                    <TroubleshootingSection markdown={splitContent.body} />
                ) : splitContent.type === "screenshots" ? (
                    <ScreenshotCarousel markdown={splitContent.body} />
                ) : (
                    <HighlightListSection markdown={splitContent.body} type={splitContent.type} />
                )}
                <EnhancedMarkdown content={splitContent.after} />
            </>
        );
    }

    return (
        <MarkdownBlock content={content} />
    );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <Fragment>
            <EnhancedMarkdown content={content} />
        </Fragment>
    );
}
