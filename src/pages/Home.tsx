import { useState } from "react";
import { getAllProjects } from "../lib/content";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import stacksData from "../content/stacks.json";
import MarkdownRenderer from "../components/MarkdownRenderer";
import aboutContent from "../content/about.md?raw";
import VelogPosts from "../lib/velogReader";
import ScrollReveal from "../components/ScrollReveal";
import { Link } from "react-router-dom";

interface Stack {
    name: string;
    icon: string;
    proficiency: number;
    descriptions: string[];
}

export default function Home() {
    const projects = getAllProjects();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const email = "dhj1318@gmail.com";
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollCarousel = (direction: "left" | "right") => {
        const carousel = document.getElementById("project-carousel");
        if (carousel) {
            const scrollAmount = direction === "left" ? -350 : 350;
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col lg:flex-row max-w-[1440px] mx-auto bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 w-full p-6 lg:p-12 xl:p-20 overflow-y-auto">
                <div className="max-w-[900px]">
                    <ScrollReveal>
                        <section id="projects" className="pt-4">
                            <div
                                className="flex items-center justify-between mb-8"
                            >
                                <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">
                                    Projects
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer"
                                        onClick={() => scrollCarousel("left")}
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                    </button>
                                    <button
                                        className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer"
                                        onClick={() => scrollCarousel("right")}
                                    >
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>

                            <div className="relative -mx-6 px-6 lg:-mx-12 lg:px-12 xl:-mx-20 xl:px-20 overflow-hidden">
                                <div
                                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
                                    id="project-carousel"
                                >
                                    {projects.map((project) => (
                                        <ProjectCard key={project.slug} project={project} />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Link
                                    to="/side-projects"
                                    className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#151c2a] border border-[#f0f2f4] dark:border-gray-800 rounded-2xl text-[#111318] dark:text-white font-bold hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                                >
                                    <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">Auto_stories</span>
                                    사이드/연구 프로젝트 더보기
                                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Tech Stacks Section */}
                    <ScrollReveal>
                        <section className="mt-20 pt-12 border-t border-[#f0f2f4] dark:border-gray-800" id="stacks">
                            <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight mb-10">
                                Tech Stacks
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(stacksData as Stack[]).map((stack) => (
                                    <div
                                        key={stack.name}
                                        className="p-5 bg-white dark:bg-[#151c2a] rounded-xl border border-[#f0f2f4] dark:border-gray-800 hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                                    <img
                                                        src={stack.icon}
                                                        alt={stack.name}
                                                        className="w-full h-full object-contain dark:invert-0 grayscale group-hover:grayscale-0 transition-all"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-gray-400">code</span>';
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-[#111318] dark:text-white">{stack.name}</h3>
                                                    <div className="flex gap-1 mt-1">
                                                        {[1, 2, 3].map((level) => (
                                                            <div
                                                                key={level}
                                                                className={`h-1.5 w-6 rounded-full ${level <= stack.proficiency
                                                                    ? 'bg-primary'
                                                                    : 'bg-gray-200 dark:bg-gray-700'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="space-y-2">
                                            {stack.descriptions.map((desc: string, idx: number) => (
                                                <li key={idx} className="text-sm text-[#616f89] dark:text-gray-400 flex items-center gap-2">
                                                    <span className="text-primary leading-none">•</span>
                                                    <span>{desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Blog Section */}
                    <ScrollReveal>
                        <section className="mt-20 pt-12 border-t border-[#f0f2f4] dark:border-gray-800" id="blog">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">
                                    Latest Posts
                                </h2>
                                <a
                                    href="https://velog.io/@jkuminga"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                                >
                                    전체 보기
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </a>
                            </div>
                            <VelogPosts />
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section className="mt-20 pt-12 border-t border-[#f0f2f4] dark:border-gray-800" id="about">
                            <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight mb-8">
                                About me
                            </h2>
                            <div className="max-w-2xl">
                                <MarkdownRenderer content={aboutContent} />
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <section
                            className="mt-20 pt-12 border-t border-[#f0f2f4] dark:border-gray-800 pb-20"
                            id="contact"
                        >
                            <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight mb-8">
                                Contact
                            </h2>

                            <div className="flex flex-col gap-6">
                                {/* <p className="text-[#616f89] dark:text-gray-400 max-w-lg leading-relaxed">
                                    새로운 기회를 찾고 있습니다. 궁금한 점이 있으시면 언제든지 연락주세요!
                                </p> */}

                                <div className="flex items-center gap-3 text-[#111318] dark:text-white">
                                    <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                                    <span className="text-xl font-bold tracking-tight">dhj1318@gmail.com</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary/20 text-gray-300 hover:text-primary transition-all relative flex items-center justify-center"
                                        title="Copy to clipboard"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {copied ? "check" : "content_copy"}
                                        </span>
                                        {copied && (
                                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap border border-gray-800 animate-in fade-in zoom-in duration-300">
                                                복사되었습니다!
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal>
                        <footer className="mt-24 pb-8 text-sm text-[#616f89] dark:text-gray-500">
                            <p>
                                Designed in Figma and coded in Google Antigravity. Built with
                                Tailwind CSS and Plus Jakarta Sans.
                                <br />© 2025 DoHyeonjik. All rights reserved.
                            </p>
                        </footer>
                    </ScrollReveal>
                </div>
            </main>
        </div>
    );
}
