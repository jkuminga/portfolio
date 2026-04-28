import { getAllProjects } from "../lib/content";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import ScrollReveal from "../components/ScrollReveal";
import { Link } from "react-router-dom";

export default function SideProjects() {
    const sideProjects = getAllProjects("side");

    return (
        <div className="relative flex min-h-screen w-full flex-col lg:flex-row max-w-[1440px] mx-auto bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 w-full p-6 lg:p-12 xl:p-20 overflow-y-auto">
                <div className="max-w-[1000px]">
                    <div className="mb-12">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-bold mb-6"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            홈으로 돌아가기
                        </Link>

                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111318] dark:text-white mb-4">
                            Side Projects & Practice
                        </h1>
                        <p className="text-lg text-[#61드f89] dark:text-gray-400 max-w-2xl leading-relaxed">
                            실생활의 불편함을 해결하거나, 새롭게 배운 기술을 직접 적용해보기 위해 진행한 개인 프로젝트들입니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sideProjects.map((project, idx) => (
                            <ScrollReveal key={project.slug} delay={idx * 100}>
                                <ProjectCard project={project} />
                            </ScrollReveal>
                        ))}
                    </div>

                    {sideProjects.length === 0 && (
                        <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
                            <p className="text-gray-500">아직 등록된 프로젝트가 없습니다.</p>
                        </div>
                    )}

                    <footer className="mt-24 pb-8 text-sm text-[#616f89] dark:text-gray-500">
                        <p>
                            © 2025 DoHyeonjik. All rights reserved.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
