// src/lib/content.ts
import matter from "gray-matter";

export type ProjectMeta = {
    slug: string;
    title: string;
    summary: string;
    role: string;
    stack: string[];
    period?: string;
    priority?: number;
    thumbnail?: string;
    tags?: string[];
    links?: { demo?: string; github?: string; presentation?: string };
};

export type ProjectDoc = {
    meta: ProjectMeta;
    content: string; // markdown body
};

// Main Projects
const mainProjectFiles = import.meta.glob("../content/projects/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

// Side Projects
const sideProjectFiles = import.meta.glob("../content/sideprojects/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

function pathToSlug(path: string) {
    const filename = path.split("/").pop() ?? "";
    return filename.replace(".md", "");
}

function parseProject(path: string, raw: string): ProjectMeta {
    const slug = pathToSlug(path);
    const { data } = matter(raw);

    return {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        role: String(data.role ?? ""),
        stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
        period: data.period ? String(data.period) : undefined,
        priority: typeof data.priority === "number" ? data.priority : undefined,
        thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        links: data.links ?? {},
    } satisfies ProjectMeta;
}

export function getAllProjects(type: "main" | "side" = "main"): ProjectMeta[] {
    const files = type === "main" ? mainProjectFiles : sideProjectFiles;
    return Object.entries(files)
        .map(([path, raw]) => parseProject(path, raw))
        .sort((left, right) => {
            const priorityDiff = (left.priority ?? Number.MAX_SAFE_INTEGER) - (right.priority ?? Number.MAX_SAFE_INTEGER);
            if (priorityDiff !== 0) return priorityDiff;

            return left.title.localeCompare(right.title);
        });
}

export function getProjectBySlug(slug: string): ProjectDoc | null {
    // Search in both main and side projects
    let entry = Object.entries(mainProjectFiles).find(([path]) =>
        path.endsWith(`/${slug}.md`)
    );

    if (!entry) {
        entry = Object.entries(sideProjectFiles).find(([path]) =>
            path.endsWith(`/${slug}.md`)
        );
    }

    if (!entry) return null;

    const raw = entry[1];
    const { content } = matter(raw);

    const meta = parseProject(entry[0], raw);

    return { meta, content };
}
