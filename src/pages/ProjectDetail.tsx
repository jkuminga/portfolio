import { useParams, useNavigate } from "react-router-dom";
import { getProjectBySlug } from "../lib/content";
import Sidebar from "../components/Sidebar";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = id ? getProjectBySlug(id) : null;

    if (!project) {
        return (
            <div className="relative flex min-h-screen w-full flex-col lg:flex-row max-w-[1440px] mx-auto bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white">
                <Sidebar />
                <main className="flex-1 w-full p-6 lg:p-12 xl:p-20 overflow-y-auto flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">프로젝트를 찾을 수 없습니다</h1>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-primary hover:underline cursor-pointer"
                        >
                            돌아가기
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const { meta, content } = project;

    return (
        <div className="relative flex min-h-screen w-full flex-col lg:flex-row max-w-[1440px] mx-auto bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 w-full overflow-y-auto">
                {/* Project Cover Image (Bleed to edges) */}
                {meta.thumbnail && (
                    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                        <img
                            src={meta.thumbnail}
                            alt={`${meta.title} cover`}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-light dark:to-background-dark"></div>
                    </div>
                )}

                <div className="p-6 lg:p-12 xl:p-20 pt-8 lg:pt-10 xl:pt-12">
                    <div className="max-w-[900px]">
                        {/* Header */}
                        <div className="mb-12">
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-8 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    arrow_back
                                </span>
                                돌아가기
                            </button>

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                                    {meta.title}
                                </h1>
                                <div className="flex gap-3">
                                    {meta.links?.presentation && (
                                        <a
                                            href={meta.links.presentation}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-primary hover:border-primary transition-all shadow-sm flex items-center justify-center w-10 h-10"
                                            aria-label="Presentation"
                                        >
                                            <img src="/assets/stacks/canva.svg" alt="Presentation" className="w-6 h-6" />
                                        </a>
                                    )}
                                    {meta.links?.github && (
                                        <a
                                            href={meta.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-primary hover:border-primary transition-all shadow-sm flex items-center justify-center w-10 h-10"
                                            aria-label="GitHub Repository"
                                        >
                                            <img src="/assets/stacks/github.svg" alt="GitHub" className="w-6 h-6 dark:invert" />
                                        </a>
                                    )}
                                    {meta.links?.demo && (
                                        <a
                                            href={meta.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-lg hover:bg-blue-600 hover:shadow-primary/30 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                rocket_launch
                                            </span>
                                            데모 보기
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-xl text-[#616f89] dark:text-gray-300 leading-relaxed mb-8">
                                {meta.summary}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#151c2a] p-6 rounded-xl border border-[#f0f2f4] dark:border-gray-800">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        역할
                                    </h3>
                                    <p className="font-medium text-[#111318] dark:text-white">
                                        {meta.role}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        기간
                                    </h3>
                                    <p className="font-medium text-[#111318] dark:text-white">
                                        {meta.period}
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                        사용 기술
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {meta.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Markdown Content */}
                        <div className="border-t border-[#f0f2f4] dark:border-gray-800 pt-12">
                            <MarkdownRenderer content={content} />
                        </div>

                        <footer className="mt-24 pb-8 text-center text-sm text-[#616f89] dark:text-gray-500">
                            <p>
                                Designed in Figma and coded in Google Antigravity. Built with
                                Tailwind CSS and Plus Jakarta Sans.
                                <br />© 2025 DoHyeonjik. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}
