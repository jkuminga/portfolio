// src/lib/content.ts
import matter from "gray-matter";

export type ProjectMeta = {
    slug: string;
    title: string;
    summary: string;
    role: string;
    stack: string[];
    period?: string;
    thumbnail?: string;
    tags?: string[];
    links?: { demo?: string; github?: string };
};

export type ProjectDoc = {
    meta: ProjectMeta;
    content: string; // markdown body
};

// Vite: ?raw 로 파일 내용을 문자열로 불러옴
const projectFiles = import.meta.glob("../content/projects/*.md", {
    query: "?raw",
    import: "default",
    eager: true, // 앱 실행 시점에 한 번에 전부 미리 로드
}) as Record<string, string>; // ts 문법; 파일의 경로를 키로, 파일 내용을 값으로 하는 객체

function pathToSlug(path: string) {
    // ../content/projects/vcm.md -> vcm
    const filename = path.split("/").pop() ?? ""; // "../content/projects/vcm.md"을 / 로 나눈 배열에서 마지막 꺼만 추출(pop) 
    return filename.replace(".md", "");
}

// 모든 프로젝트의 메타데이터를 가져옴
export function getAllProjects(): ProjectMeta[] {
    return Object.entries(projectFiles) // projectFiles의 각 키-값 쌍을 배열로 변환
        // 개별 배열은 ["../content/projects/vcm.md", "내부 파일 내용"] 으로 구성됨 
        .map(([path, raw]) => { // 개별 배열을 처리
            const slug = pathToSlug(path); // 경로를 slug으로 변환
            const { data } = matter(raw); // 파일의 메타데이터 추출

            return {
                slug,
                title: String(data.title ?? slug),
                summary: String(data.summary ?? ""),
                role: String(data.role ?? ""),
                stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
                period: data.period ? String(data.period) : undefined,
                thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
                tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
                links: data.links ?? {},
            } satisfies ProjectMeta; // TS용 검증 문법, 해당 객체가 ProjectMeta 타입을 만족하는지 확인
        })
    // 최신이 위로 오게 하고 싶으면 여기서 정렬 규칙 추가
    // .sort((a, b) => (a.title > b.title ? 1 : -1));
}

export function getProjectBySlug(slug: string): ProjectDoc | null {
    const entry = Object.entries(projectFiles).find(([path]) =>
        path.endsWith(`/${slug}.md`)
    );
    if (!entry) return null;

    // entry 는 ["../content/projects/vcm.md", "내부 파일 내용"] 구조임을 다시 기억하자
    const raw = entry[1];
    const { data, content } = matter(raw);

    const meta: ProjectMeta = {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        role: String(data.role ?? ""),
        stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
        period: data.period ? String(data.period) : undefined,
        thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        links: data.links ?? {},
    };

    return { meta, content };
}
